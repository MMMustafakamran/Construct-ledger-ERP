export interface DashboardSummary {
  receivables: number;
  payables: number;
  cashBalance: number;
  totalTransactions: number;
  recentTransactions: any[];
  overdueVendorInvoices: OverdueInvoice[];
  overdueCustomerInvoices: OverdueInvoice[];
  aging: AgingSummary;
  monthlyFlow: MonthlyFlow[];
}

export interface OverdueInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  outstanding: number;
  status: string;
  daysOverdue: number;
  name: string;
  type: "vendor" | "customer";
}

export interface AgingSummary {
  current: number;
  thirtyToSixty: number;
  overSixty: number;
  currentCount: number;
  thirtyToSixtyCount: number;
  overSixtyCount: number;
}

export interface MonthlyFlow {
  month: string;
  inflow: number;
  outflow: number;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  category: string;
  status: string;
  balance: number;
}

export interface Vendor {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  status: string;
  outstandingBalance?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  status: string;
  outstandingBalance?: number;
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  currentBalance: number;
  status: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  type: "inflow" | "outflow";
  description: string;
  reference?: string;
  amount: number;
}

export interface VendorInvoice {
  id: string;
  vendorId: string;
  expenseAccountId: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  paidAmount: number;
  status: string;
  jobReference?: string;
  equipmentReference?: string;
  vendor?: Vendor;
  expenseAccount?: Account;
}

export interface CustomerInvoice {
  id: string;
  customerId: string;
  revenueAccountId: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  receivedAmount: number;
  status: string;
  jobReference?: string;
  equipmentReference?: string;
  customer?: Customer;
  revenueAccount?: Account;
}

export interface JournalEntryLine {
  id: string;
  journalEntryId: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  account?: Account;
}

export interface JournalEntry {
  id: string;
  entryDate: string;
  referenceType: string;
  referenceId: string;
  memo: string;
  createdAt: string;
  lines: JournalEntryLine[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Global / Accounting
  getDashboard() {
    return fetchJson<DashboardSummary>("/dashboard");
  },
  getAccounts() {
    return fetchJson<Account[]>("/accounts");
  },
  getJournalEntries() {
    return fetchJson<JournalEntry[]>("/journal-entries");
  },
  getBankAccounts() {
    return fetchJson<BankAccount[]>("/bank-accounts");
  },
  getBankAccountTransactions(id: string) {
    return fetchJson<BankTransaction[]>(`/bank-accounts/${id}/transactions`);
  },

  // Vendors
  getVendors() {
    return fetchJson<Vendor[]>("/vendors");
  },
  createVendor(data: Partial<Vendor>) {
    return fetchJson<Vendor>("/vendors", { method: "POST", body: JSON.stringify(data) });
  },

  // Customers
  getCustomers() {
    return fetchJson<Customer[]>("/customers");
  },
  createCustomer(data: Partial<Customer>) {
    return fetchJson<Customer>("/customers", { method: "POST", body: JSON.stringify(data) });
  },

  // Invoices
  getVendorInvoices() {
    return fetchJson<VendorInvoice[]>("/vendor-invoices");
  },
  createVendorInvoice(data: any) {
    return fetchJson<VendorInvoice>("/vendor-invoices", { method: "POST", body: JSON.stringify(data) });
  },
  getCustomerInvoices() {
    return fetchJson<CustomerInvoice[]>("/customer-invoices");
  },
  createCustomerInvoice(data: any) {
    return fetchJson<CustomerInvoice>("/customer-invoices", { method: "POST", body: JSON.stringify(data) });
  },

  // Payments / Receipts
  getPayments() {
    return fetchJson<any[]>("/payments");
  },
  createPayment(data: any) {
    return fetchJson<any>("/payments", { method: "POST", body: JSON.stringify(data) });
  },
  getReceipts() {
    return fetchJson<any[]>("/receipts");
  },
  createReceipt(data: any) {
    return fetchJson<any>("/receipts", { method: "POST", body: JSON.stringify(data) });
  },
};
