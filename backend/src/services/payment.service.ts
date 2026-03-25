import { z } from "zod";
import { prisma } from "../core/prisma.js";

export const paymentSchema = z.object({
  vendorInvoiceId: z.string().uuid("Invalid Invoice ID"),
  bankAccountId: z.string().uuid("Invalid Bank Account ID"),
  paymentDate: z.string().datetime({ offset: true }).or(z.string()),
  amount: z.number().positive("Amount must be positive"),
  reference: z.string().nullable().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

export const getPayments = async () => {
  return await prisma.payment.findMany({
    include: { vendorInvoice: { include: { vendor: true } }, bankAccount: true },
    orderBy: { createdAt: "desc" },
  });
};

export const createPayment = async (data: PaymentInput) => {
  const validated = paymentSchema.parse(data);

  return await prisma.$transaction(async (tx) => {
    const invoice = await tx.vendorInvoice.findUnique({
      where: { id: validated.vendorInvoiceId },
      include: { vendor: true },
    });

    if (!invoice) throw new Error("Vendor Invoice not found.");

    // 1. Create Payment
    const payment = await tx.payment.create({
      data: {
        vendorInvoiceId: validated.vendorInvoiceId,
        bankAccountId: validated.bankAccountId,
        paymentDate: new Date(validated.paymentDate),
        amount: validated.amount,
        reference: validated.reference,
      },
      include: { vendorInvoice: true, bankAccount: true },
    });

    // 2. Update Invoice paidAmount and Status
    const newPaidAmount = invoice.paidAmount + validated.amount;
    let newStatus = "unpaid";
    if (newPaidAmount >= invoice.totalAmount) {
      newStatus = "paid";
    } else if (newPaidAmount > 0) {
      newStatus = "partial";
    }

    await tx.vendorInvoice.update({
      where: { id: invoice.id },
      data: { paidAmount: newPaidAmount, status: newStatus },
    });

    // 3. Update Bank Account Balance (Credit / Reduce)
    await tx.bankAccount.update({
      where: { id: validated.bankAccountId },
      data: { currentBalance: { decrement: validated.amount } },
    });

    // 4. Fetch Accounts Payable account (Code 2000 per seed data)
    const apAccount = await tx.account.findUnique({
      where: { code: "2000" },
    });

    if (!apAccount) {
      throw new Error("Accounts Payable account (2000) not found in Chart of Accounts.");
    }

    // 5. Fetch Cash/Bank account (Code 1000 per seed data)
    // Note: A real system associates BankAccount with an Account ID. For Prototype, hardcoded to Cash (1000)
    const cashAccount = await tx.account.findUnique({
      where: { code: "1000" },
    });

    if (!cashAccount) {
      throw new Error("Cash account (1000) not found in Chart of Accounts.");
    }

    // 6. Create Journal Entry (DR Accounts Payable / CR Bank)
    const je = await tx.journalEntry.create({
      data: {
        referenceType: "Payment",
        referenceId: payment.id,
        memo: `Payment for Invoice ${invoice.invoiceNumber} to ${invoice.vendor.name}`,
      },
    });

    // DR Accounts Payable
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: apAccount.id,
        debitAmount: validated.amount,
        creditAmount: 0,
      },
    });

    // CR Cash/Bank
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: cashAccount.id,
        debitAmount: 0,
        creditAmount: validated.amount,
      },
    });

    return payment;
  });
};
