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
}

export interface Transaction {
  id: string;
  createdAt: string;
  description: string;
  referenceNumber: string;
}

export interface JournalEntryLine {
  id: string;
  transactionId: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
}

export interface HealthResponse {
  status: "ok";
  service: string;
  timestamp: string;
}

