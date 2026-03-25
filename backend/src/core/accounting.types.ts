export type AccountCategory =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export type AccountStatus = "active" | "inactive";

export interface Account {
  id: string;
  code: string;
  name: string;
  category: AccountCategory;
  status: AccountStatus;
  balance?: number; // Calculated on the fly, not in DB
}

export interface Vendor {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  status: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  status: string;
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string | null;
  currentBalance: number;
  status: string;
}

export interface VendorInvoice {
  id: string;
  vendorId: string;
  expenseAccountId: string;
  invoiceNumber: string;
  invoiceDate: string; // ISO date
  totalAmount: number;
  paidAmount: number;
  status: string; // "unpaid", "partial", "paid"
  jobReference: string | null;
  equipmentReference: string | null;
}

export interface CustomerInvoice {
  id: string;
  customerId: string;
  revenueAccountId: string;
  invoiceNumber: string;
  invoiceDate: string; // ISO date
  totalAmount: number;
  receivedAmount: number;
  status: string; // "unpaid", "partial", "paid"
  jobReference: string | null;
  equipmentReference: string | null;
}

export interface Payment {
  id: string;
  vendorInvoiceId: string;
  bankAccountId: string;
  paymentDate: string; // ISO date
  amount: number;
  reference: string | null;
}

export interface Receipt {
  id: string;
  customerInvoiceId: string;
  bankAccountId: string;
  receiptDate: string; // ISO date
  amount: number;
  reference: string | null;
}

export interface JournalEntry {
  id: string;
  entryDate: string; // ISO date
  referenceType: string;
  referenceId: string | null;
  memo: string;
  lines?: JournalEntryLine[]; // Included when full entry is fetched
}

export interface JournalEntryLine {
  id: string;
  journalEntryId: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
}

export interface DashboardSummary {
  receivables: number;
  payables: number;
  cashBalance: number;
  totalTransactions: number;
  recentTransactions: any[];
}

export interface Transaction {
  id: string;
  createdAt: string;
  description: string;
  referenceNumber: string;
  lines?: JournalEntryLine[]; // Compatibility for the initial prototype format
}

export interface HealthResponse {
  status: "ok";
  service: string;
  timestamp: string;
}
