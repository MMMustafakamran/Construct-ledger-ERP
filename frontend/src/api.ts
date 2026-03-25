export interface DashboardSummary {
  receivables: number;
  payables: number;
  cashBalance: number;
  totalTransactions: number;
  recentTransactions: any[]; // Journal entries
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
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  status: string;
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  currentBalance: number;
  status: string;
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
