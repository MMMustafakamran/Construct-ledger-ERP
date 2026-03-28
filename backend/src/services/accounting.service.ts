import { prisma } from "../core/prisma.js";

export const accountingService = {
  async listAccounts() {
    const dbAccounts = await prisma.account.findMany({
      orderBy: { code: "asc" }
    });

    const aggregatedLines = await prisma.journalEntryLine.groupBy({
      by: ['accountId'],
      _sum: {
        debitAmount: true,
        creditAmount: true
      }
    });

    return dbAccounts.map((account: any) => {
      const agg = aggregatedLines.find((l: any) => l.accountId === account.id);
      const debits = agg?._sum.debitAmount || 0;
      const credits = agg?._sum.creditAmount || 0;
      
      const balance = ['asset', 'expense'].includes(account.category) 
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
      where: { status: { in: ["unpaid", "partial"] } },
      include: { customer: true }
    });
    const receivables = customerInvoices.reduce(
      (sum: number, inv: any) => sum + (inv.totalAmount - inv.receivedAmount),
      0
    );

    // Calculate Payables (Sum of unpaid portions of vendor invoices)
    const vendorInvoices = await prisma.vendorInvoice.findMany({
      where: { status: { in: ["unpaid", "partial"] } },
      include: { vendor: true }
    });
    const payables = vendorInvoices.reduce(
      (sum: number, inv: any) => sum + (inv.totalAmount - inv.paidAmount),
      0
    );

    // Calculate Cash (Sum of current balances of all active bank accounts)
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { status: "active" }
    });
    const cashBalance = bankAccounts.reduce((sum: number, bank: any) => sum + bank.currentBalance, 0);

    const totalTransactions = await prisma.journalEntry.count();

    const recentTransactions = await prisma.journalEntry.findMany({
      include: {
        lines: { include: { account: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    // Overdue invoices (invoiceDate older than 30 days, still unpaid/partial)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const overdueVendorInvoices = vendorInvoices
      .filter((inv: any) => new Date(inv.invoiceDate) < thirtyDaysAgo)
      .map((inv: any) => ({
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        invoiceDate: inv.invoiceDate,
        totalAmount: inv.totalAmount,
        paidAmount: inv.paidAmount,
        outstanding: inv.totalAmount - inv.paidAmount,
        status: inv.status,
        daysOverdue: Math.floor((Date.now() - new Date(inv.invoiceDate).getTime()) / (1000 * 60 * 60 * 24)),
        name: inv.vendor?.name ?? "Unknown",
        type: "vendor" as const
      }));

    const overdueCustomerInvoices = customerInvoices
      .filter((inv: any) => new Date(inv.invoiceDate) < thirtyDaysAgo)
      .map((inv: any) => ({
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        invoiceDate: inv.invoiceDate,
        totalAmount: inv.totalAmount,
        receivedAmount: inv.receivedAmount,
        outstanding: inv.totalAmount - inv.receivedAmount,
        status: inv.status,
        daysOverdue: Math.floor((Date.now() - new Date(inv.invoiceDate).getTime()) / (1000 * 60 * 60 * 24)),
        name: inv.customer?.name ?? "Unknown",
        type: "customer" as const
      }));

    // Aging buckets: 0–30, 31–60, 61+
    const allOutstandingInvoices = [
      ...vendorInvoices.map((inv: any) => ({
        outstanding: inv.totalAmount - inv.paidAmount,
        daysOld: Math.floor((Date.now() - new Date(inv.invoiceDate).getTime()) / (1000 * 60 * 60 * 24)),
      })),
      ...customerInvoices.map((inv: any) => ({
        outstanding: inv.totalAmount - inv.receivedAmount,
        daysOld: Math.floor((Date.now() - new Date(inv.invoiceDate).getTime()) / (1000 * 60 * 60 * 24)),
      })),
    ];

    const aging = {
      current: allOutstandingInvoices.filter((i) => i.daysOld <= 30).reduce((s, i) => s + i.outstanding, 0),
      thirtyToSixty: allOutstandingInvoices.filter((i) => i.daysOld > 30 && i.daysOld <= 60).reduce((s, i) => s + i.outstanding, 0),
      overSixty: allOutstandingInvoices.filter((i) => i.daysOld > 60).reduce((s, i) => s + i.outstanding, 0),
      currentCount: allOutstandingInvoices.filter((i) => i.daysOld <= 30).length,
      thirtyToSixtyCount: allOutstandingInvoices.filter((i) => i.daysOld > 30 && i.daysOld <= 60).length,
      overSixtyCount: allOutstandingInvoices.filter((i) => i.daysOld > 60).length,
    };

    // Monthly cash flow data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const payments = await prisma.payment.findMany({
      where: { paymentDate: { gte: sixMonthsAgo } },
      orderBy: { paymentDate: "asc" }
    });
    const receipts = await prisma.receipt.findMany({
      where: { receiptDate: { gte: sixMonthsAgo } },
      orderBy: { receiptDate: "asc" }
    });

    // Build monthly buckets
    const monthlyFlow: { month: string; inflow: number; outflow: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth();
      const label = d.toLocaleString("en-US", { month: "short" });

      const monthInflow = receipts
        .filter((r: any) => {
          const rd = new Date(r.receiptDate);
          return rd.getFullYear() === year && rd.getMonth() === month;
        })
        .reduce((s: number, r: any) => s + r.amount, 0);

      const monthOutflow = payments
        .filter((p: any) => {
          const pd = new Date(p.paymentDate);
          return pd.getFullYear() === year && pd.getMonth() === month;
        })
        .reduce((s: number, p: any) => s + p.amount, 0);

      monthlyFlow.push({ month: label, inflow: monthInflow, outflow: monthOutflow });
    }

    return {
      receivables,
      payables,
      cashBalance,
      totalTransactions,
      recentTransactions,
      overdueVendorInvoices,
      overdueCustomerInvoices,
      aging,
      monthlyFlow,
    };
  }
};
