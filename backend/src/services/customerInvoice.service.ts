import { z } from "zod";
import { prisma } from "../core/prisma.js";

export const customerInvoiceSchema = z.object({
  customerId: z.string().uuid("Invalid Customer ID"),
  revenueAccountId: z.string().uuid("Invalid Account ID"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().datetime({ offset: true }).or(z.string()),
  totalAmount: z.number().positive("Amount must be positive"),
  jobReference: z.string().nullable().optional(),
  equipmentReference: z.string().nullable().optional(),
});

export type CustomerInvoiceInput = z.infer<typeof customerInvoiceSchema>;

export const getCustomerInvoices = async () => {
  return await prisma.customerInvoice.findMany({
    include: { customer: true, revenueAccount: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getCustomerInvoice = async (id: string) => {
  return await prisma.customerInvoice.findUnique({
    where: { id },
    include: { customer: true, revenueAccount: true, receipts: true },
  });
};

export const createCustomerInvoice = async (data: CustomerInvoiceInput) => {
  const validated = customerInvoiceSchema.parse(data);

  return await prisma.$transaction(async (tx) => {
    // 1. Create the invoice
    const invoice = await tx.customerInvoice.create({
      data: {
        customerId: validated.customerId,
        revenueAccountId: validated.revenueAccountId,
        invoiceNumber: validated.invoiceNumber,
        invoiceDate: new Date(validated.invoiceDate),
        totalAmount: validated.totalAmount,
        receivedAmount: 0,
        status: "unpaid",
        jobReference: validated.jobReference,
        equipmentReference: validated.equipmentReference,
      },
    });

    // 2. Fetch Accounts Receivable account (Code 1100 per seed data)
    const arAccount = await tx.account.findUnique({
      where: { code: "1100" },
    });

    if (!arAccount) {
      throw new Error("Accounts Receivable account (1100) not found in Chart of Accounts.");
    }

    const customer = await tx.customer.findUnique({ where: { id: validated.customerId } });

    // 3. Create Journal Entry
    const je = await tx.journalEntry.create({
      data: {
        referenceType: "CustomerInvoice",
        referenceId: invoice.id,
        memo: `Invoice ${invoice.invoiceNumber} to ${customer?.name || 'Customer'}`,
      },
    });

    // 4. Create Journal Entry Lines
    // DR Accounts Receivable
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: arAccount.id,
        debitAmount: invoice.totalAmount,
        creditAmount: 0,
      },
    });

    // CR Revenue
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: invoice.revenueAccountId,
        debitAmount: 0,
        creditAmount: invoice.totalAmount,
      },
    });

    return invoice;
  });
};
