import type { JournalEntryLine } from "../core/accounting.types.js";
import { accounts, journalEntryLines, transactions } from "../data/seed.js";

function calculateCashBalance(lines: JournalEntryLine[]) {
  return lines
    .filter((line) => line.accountId === "acc-cash")
    .reduce((sum, line) => sum + line.debitAmount - line.creditAmount, 0);
}

function calculateAccountBalance(accountId: string) {
  return journalEntryLines
    .filter((line) => line.accountId === accountId)
    .reduce((sum, line) => sum + line.debitAmount - line.creditAmount, 0);
}

export const accountingService = {
  listAccounts() {
    return accounts.map((account) => ({
      ...account,
      balance: calculateAccountBalance(account.id)
    }));
  },

  listTransactions() {
    return transactions.map((transaction) => ({
      ...transaction,
      lines: journalEntryLines.filter((line) => line.transactionId === transaction.id)
    }));
  },

  getDashboardSummary() {
    const receivables = Math.max(calculateAccountBalance("acc-ar"), 0);
    const payables = Math.abs(Math.min(calculateAccountBalance("acc-ap"), 0));

    return {
      receivables,
      payables,
      cashBalance: calculateCashBalance(journalEntryLines),
      totalTransactions: transactions.length,
      recentTransactions: transactions.slice(-5).reverse()
    };
  }
};

