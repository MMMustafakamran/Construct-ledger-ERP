import { prisma } from "../core/prisma.js";

export const getBankAccounts = async () => {
  return await prisma.bankAccount.findMany({
    orderBy: { accountName: "asc" },
  });
};

export const getBankAccount = async (id: string) => {
  return await prisma.bankAccount.findUnique({
    where: { id },
  });
};

export const getBankAccountTransactions = async (id: string) => {
  const payments = await prisma.payment.findMany({
    where: { bankAccountId: id },
    include: { vendorInvoice: { include: { vendor: true } } },
    orderBy: { paymentDate: "desc" },
  });

  const receipts = await prisma.receipt.findMany({
    where: { bankAccountId: id },
    include: { customerInvoice: { include: { customer: true } } },
    orderBy: { receiptDate: "desc" },
  });

  const transactions = [
    ...payments.map((p: any) => ({
      id: p.id,
      date: p.paymentDate,
      type: "outflow" as const,
      description: `Payment to ${p.vendorInvoice?.vendor?.name ?? "Unknown"} — Inv #${p.vendorInvoice?.invoiceNumber ?? "N/A"}`,
      reference: p.reference,
      amount: p.amount,
    })),
    ...receipts.map((r: any) => ({
      id: r.id,
      date: r.receiptDate,
      type: "inflow" as const,
      description: `Receipt from ${r.customerInvoice?.customer?.name ?? "Unknown"} — Inv #${r.customerInvoice?.invoiceNumber ?? "N/A"}`,
      reference: r.reference,
      amount: r.amount,
    })),
  ];

  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return transactions;
};
