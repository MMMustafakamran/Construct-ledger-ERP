import { z } from "zod";
import { prisma } from "../core/prisma.js";

export const receiptSchema = z.object({
  customerInvoiceId: z.string().uuid("Invalid Invoice ID"),
  bankAccountId: z.string().uuid("Invalid Bank Account ID"),
  receiptDate: z.string().datetime({ offset: true }).or(z.string()),
  amount: z.number().positive("Amount must be positive"),
  reference: z.string().nullable().optional(),
});

export type ReceiptInput = z.infer<typeof receiptSchema>;

export const getReceipts = async () => {
  return await prisma.receipt.findMany({
    include: { customerInvoice: { include: { customer: true } }, bankAccount: true },
    orderBy: { createdAt: "desc" },
  });
};

export const createReceipt = async (data: ReceiptInput) => {
  const validated = receiptSchema.parse(data);

  return await prisma.$transaction(async (tx) => {
    const invoice = await tx.customerInvoice.findUnique({
      where: { id: validated.customerInvoiceId },
      include: { customer: true },
    });

    if (!invoice) throw new Error("Customer Invoice not found.");

    // 1. Create Receipt
    const receipt = await tx.receipt.create({
      data: {
        customerInvoiceId: validated.customerInvoiceId,
        bankAccountId: validated.bankAccountId,
        receiptDate: new Date(validated.receiptDate),
        amount: validated.amount,
        reference: validated.reference,
      },
      include: { customerInvoice: true, bankAccount: true },
    });

    // 2. Update Invoice receivedAmount and Status
    const newReceivedAmount = invoice.receivedAmount + validated.amount;
    let newStatus = "unpaid";
    if (newReceivedAmount >= invoice.totalAmount) {
      newStatus = "paid";
    } else if (newReceivedAmount > 0) {
      newStatus = "partial";
    }

    await tx.customerInvoice.update({
      where: { id: invoice.id },
      data: { receivedAmount: newReceivedAmount, status: newStatus },
    });

    // 3. Update Bank Account Balance (Debit / Increase)
    await tx.bankAccount.update({
      where: { id: validated.bankAccountId },
      data: { currentBalance: { increment: validated.amount } },
    });

    // 4. Fetch Accounts Receivable account (Code 1100 per seed data)
    const arAccount = await tx.account.findUnique({
      where: { code: "1100" },
    });

    if (!arAccount) {
      throw new Error("Accounts Receivable account (1100) not found in Chart of Accounts.");
    }

    // 5. Fetch Cash/Bank account (Code 1000 per seed data)
    const cashAccount = await tx.account.findUnique({
      where: { code: "1000" },
    });

    if (!cashAccount) {
      throw new Error("Cash account (1000) not found in Chart of Accounts.");
    }

    // 6. Create Journal Entry (DR Bank / CR Accounts Receivable)
    const je = await tx.journalEntry.create({
      data: {
        referenceType: "Receipt",
        referenceId: receipt.id,
        memo: `Receipt for Invoice ${invoice.invoiceNumber} from ${invoice.customer.name}`,
      },
    });

    // DR Cash/Bank
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: cashAccount.id,
        debitAmount: validated.amount,
        creditAmount: 0,
      },
    });

    // CR Accounts Receivable
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: arAccount.id,
        debitAmount: 0,
        creditAmount: validated.amount,
      },
    });

    return receipt;
  });
};
