import { z } from "zod";
import { prisma } from "../core/prisma.js";

export const vendorInvoiceSchema = z.object({
  vendorId: z.string().uuid("Invalid Vendor ID"),
  expenseAccountId: z.string().uuid("Invalid Account ID"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().datetime({ offset: true }).or(z.string()), // Accept ISO string
  totalAmount: z.number().positive("Amount must be positive"),
  jobReference: z.string().nullable().optional(),
  equipmentReference: z.string().nullable().optional(),
});

export type VendorInvoiceInput = z.infer<typeof vendorInvoiceSchema>;

export const getVendorInvoices = async () => {
  return await prisma.vendorInvoice.findMany({
    include: { vendor: true, expenseAccount: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getVendorInvoice = async (id: string) => {
  return await prisma.vendorInvoice.findUnique({
    where: { id },
    include: { vendor: true, expenseAccount: true, payments: true },
  });
};

export const createVendorInvoice = async (data: VendorInvoiceInput) => {
  const validated = vendorInvoiceSchema.parse(data);

  // Use a transaction since we are creating an invoice AND journal entries
  return await prisma.$transaction(async (tx) => {
    // 1. Create the invoice
    const invoice = await tx.vendorInvoice.create({
      data: {
        vendorId: validated.vendorId,
        expenseAccountId: validated.expenseAccountId,
        invoiceNumber: validated.invoiceNumber,
        invoiceDate: new Date(validated.invoiceDate),
        totalAmount: validated.totalAmount,
        paidAmount: 0,
        status: "unpaid",
        jobReference: validated.jobReference,
        equipmentReference: validated.equipmentReference,
      },
    });

    // 2. Fetch Accounts Payable account (Code 2000 per seed data)
    const apAccount = await tx.account.findUnique({
      where: { code: "2000" },
    });

    if (!apAccount) {
      throw new Error("Accounts Payable account (2000) not found in Chart of Accounts.");
    }

    const vendor = await tx.vendor.findUnique({ where: { id: validated.vendorId } });

    // 3. Create Journal Entry
    const je = await tx.journalEntry.create({
      data: {
        referenceType: "VendorInvoice",
        referenceId: invoice.id,
        memo: `Invoice ${invoice.invoiceNumber} from ${vendor?.name || 'Vendor'}`,
      },
    });

    // 4. Create Journal Entry Lines
    // DR Expense
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: invoice.expenseAccountId,
        debitAmount: invoice.totalAmount,
        creditAmount: 0,
      },
    });

    // CR Accounts Payable
    await tx.journalEntryLine.create({
      data: {
        journalEntryId: je.id,
        accountId: apAccount.id,
        debitAmount: 0,
        creditAmount: invoice.totalAmount,
      },
    });

    return invoice;
  });
};
