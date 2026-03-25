export interface DashboardSummary {
  receivables: number;
  payables: number;
  cashBalance: number;
  totalTransactions: number;
  recentTransactions: Array<{
    id: string;
    createdAt: string;
    description: string;
    referenceNumber: string;
  }>;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  category: string;
  status: string;
  balance: number;
}

export interface TransactionLine {
  id: string;
  transactionId: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
}

export interface Transaction {
  id: string;
  createdAt: string;
  description: string;
  referenceNumber: string;
  lines: TransactionLine[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getDashboard() {
    return fetchJson<{ data: DashboardSummary }>("/dashboard");
  },
  getAccounts() {
    return fetchJson<{ data: Account[] }>("/accounts");
  },
  getTransactions() {
    return fetchJson<{ data: Transaction[] }>("/transactions");
  }
};
