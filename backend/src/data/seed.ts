import type { Account, Transaction, JournalEntryLine } from "../core/accounting.types.js";

export const accounts: Account[] = [
  {
    id: "acc-cash",
    code: "1000",
    name: "Cash",
    category: "asset",
    status: "active"
  },
  {
    id: "acc-ar",
    code: "1100",
    name: "Accounts Receivable",
    category: "asset",
    status: "active"
  },
  {
    id: "acc-ap",
    code: "2000",
    name: "Accounts Payable",
    category: "liability",
    status: "active"
  },
  {
    id: "acc-sales",
    code: "4000",
    name: "Sales Revenue",
    category: "revenue",
    status: "active"
  },
  {
    id: "acc-expense",
    code: "5000",
    name: "Operating Expense",
    category: "expense",
    status: "active"
  }
];

export const transactions: Transaction[] = [
  {
    id: "txn-001",
    createdAt: "2026-03-25T10:00:00.000Z",
    description: "Initial sample customer invoice",
    referenceNumber: "INV-001"
  },
  {
    id: "txn-002",
    createdAt: "2026-03-25T12:00:00.000Z",
    description: "Initial sample vendor invoice",
    referenceNumber: "BILL-001"
  }
];

export const journalEntryLines: JournalEntryLine[] = [
  {
    id: "jel-001",
    transactionId: "txn-001",
    accountId: "acc-ar",
    debitAmount: 25000,
    creditAmount: 0
  },
  {
    id: "jel-002",
    transactionId: "txn-001",
    accountId: "acc-sales",
    debitAmount: 0,
    creditAmount: 25000
  },
  {
    id: "jel-003",
    transactionId: "txn-002",
    accountId: "acc-expense",
    debitAmount: 12500,
    creditAmount: 0
  },
  {
    id: "jel-004",
    transactionId: "txn-002",
    accountId: "acc-ap",
    debitAmount: 0,
    creditAmount: 12500
  }
];

