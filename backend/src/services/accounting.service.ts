import { prisma } from "../core/prisma.js";

export const accountingService = {
  async listAccounts() {
    const dbAccounts = await prisma.account.findMany({
      orderBy: { code: "asc" }
    });

    // To get the true balance, we sum the debits and credits from journal entry lines
    // This could be optimized with a groupBy query later, but works fine for the prototype
    const aggregatedLines = await prisma.journalEntryLine.groupBy({
      by: ['accountId'],
      _sum: {
        debitAmount: true,
        creditAmount: true
      }
    });

    return dbAccounts.map((account) => {
      const agg = aggregatedLines.find(l => l.accountId === account.id);
      const debits = agg?._sum.debitAmount || 0;
      const credits = agg?._sum.creditAmount || 0;
      
      // Typical balance logic (simplified): 
      // Assets / Expenses increase with Debit
      // Liabilities / Equity / Revenue increase with Credit
      // For prototype display, we can just show Debit - Credit or similar
      const balance = ['Asset', 'Expense'].includes(account.category) 
        ? debits - credits 
        : credits - debits;

      return {
        ...account,
        balance
      };
    });
  },

  async listTransactions() {
    return await prisma.journalEntry.findMany({
      include: {
        lines: {
          include: { account: true },
          orderBy: { debitAmount: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  },

  async getDashboardSummary() {
    // Calculate Receivables (Sum of unpaid portions of customer invoices)
    const customerInvoices = await prisma.customerInvoice.findMany({
      where: { status: { in: ["unpaid", "partial"] } }
    });
    const receivables = customerInvoices.reduce(
      (sum, inv) => sum + (inv.totalAmount - inv.receivedAmount),
      0
    );

    // Calculate Payables (Sum of unpaid portions of vendor invoices)
    const vendorInvoices = await prisma.vendorInvoice.findMany({
      where: { status: { in: ["unpaid", "partial"] } }
    });
    const payables = vendorInvoices.reduce(
      (sum, inv) => sum + (inv.totalAmount - inv.paidAmount),
      0
    );

    // Calculate Cash (Sum of current balances of all active bank accounts)
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { status: "active" }
    });
    const cashBalance = bankAccounts.reduce((sum, bank) => sum + bank.currentBalance, 0);

    const totalTransactions = await prisma.journalEntry.count();

    const recentTransactions = await prisma.journalEntry.findMany({
      include: {
        lines: { include: { account: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    return {
      receivables,
      payables,
      cashBalance,
      totalTransactions,
      recentTransactions
    };
  }
};

