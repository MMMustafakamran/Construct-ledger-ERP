import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/ui/Badge";
import { api, Account } from "../api";

const categoryOrder = ["asset", "liability", "equity", "revenue", "expense"];
const categoryLabels: Record<string, string> = {
  asset: "Assets",
  liability: "Liabilities",
  equity: "Equity",
  revenue: "Revenue",
  expense: "Expenses",
};
const categoryIcons: Record<string, string> = {
  asset: "📈",
  liability: "📉",
  equity: "🏛️",
  revenue: "💵",
  expense: "💸",
};

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const groupedAccounts = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat] || cat,
      icon: categoryIcons[cat] || "📋",
      items: accounts.filter((a) => a.category === cat),
      total: accounts.filter((a) => a.category === cat).reduce((sum, a) => sum + a.balance, 0),
    }))
    .filter((g) => g.items.length > 0);

  if (loading) {
    return (
      <div className="accounts-page">
        <PageHeader title="Chart of Accounts" />
        <div className="table-card" style={{ padding: "28px" }}>
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line medium" />
        </div>
      </div>
    );
  }

  return (
    <div className="accounts-page">
      <PageHeader title="Chart of Accounts" />

      {groupedAccounts.map((group) => (
        <div key={group.category} className="account-group">
          <div className="account-group-header">
            <div className="account-group-title">
              <span className="account-group-icon">{group.icon}</span>
              <h3>{group.label}</h3>
            </div>
            <span className="account-group-total" style={{ color: group.total < 0 ? "var(--danger)" : "var(--ink)" }}>
              {formatCurrency(group.total)}
            </span>
          </div>
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Account Name</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((account) => (
                  <tr key={account.id}>
                    <td>
                      <span className="account-code">{account.code}</span>
                    </td>
                    <td>{account.name}</td>
                    <td>
                      <Badge variant={account.status === "active" ? "success" : "neutral"}>
                        {account.status}
                      </Badge>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        className={account.balance < 0 ? "text-danger" : ""}
                        style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}
                      >
                        {formatCurrency(account.balance)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountsPage;
