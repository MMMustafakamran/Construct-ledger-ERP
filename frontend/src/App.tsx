import { useEffect, useState } from "react";
import { api, type Account, type DashboardSummary, type Transaction } from "./api";
import "./styles.css";

export function App() {
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFoundationData() {
      try {
        const [dashboardResponse, accountsResponse, transactionsResponse] = await Promise.all([
          api.getDashboard(),
          api.getAccounts(),
          api.getTransactions()
        ]);

        setDashboard(dashboardResponse.data);
        setAccounts(accountsResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load foundation data.");
      }
    }

    void loadFoundationData();
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>Barebones Accounting</h1>
          <p>Foundation Build</p>
        </div>
        <nav>
          <a className="active" href="#dashboard">
            Dashboard
          </a>
          <a href="#accounts">Accounts</a>
          <a href="#transactions">Transactions</a>
        </nav>
      </aside>

      <main className="content">
        <header className="hero">
          <div>
            <p className="eyebrow">Initial implementation</p>
            <h2>Accounting core foundation</h2>
            <p className="subtitle">
              This first slice wires the frontend to a simple accounting API and shows the core
              ledger concepts the client can build on next.
            </p>
          </div>
        </header>

        {error ? <div className="error-card">{error}</div> : null}

        <section id="dashboard" className="section">
          <h3>Dashboard summary</h3>
          <div className="stat-grid">
            <StatCard label="Receivables" value={dashboard?.receivables ?? 0} />
            <StatCard label="Payables" value={dashboard?.payables ?? 0} />
            <StatCard label="Cash Balance" value={dashboard?.cashBalance ?? 0} />
            <StatCard label="Transactions" value={dashboard?.totalTransactions ?? 0} plain />
          </div>
        </section>

        <section id="accounts" className="section">
          <div className="section-header">
            <h3>Chart of accounts foundation</h3>
            <span>{accounts.length} accounts</span>
          </div>
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.code}</td>
                    <td>{account.name}</td>
                    <td>{account.category}</td>
                    <td>{account.status}</td>
                    <td>{formatAmount(account.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="transactions" className="section">
          <div className="section-header">
            <h3>Recent transactions</h3>
            <span>{transactions.length} seeded</span>
          </div>
          <div className="transaction-list">
            {transactions.map((transaction) => (
              <article className="card" key={transaction.id}>
                <div className="transaction-header">
                  <div>
                    <h4>{transaction.description}</h4>
                    <p>
                      {transaction.referenceNumber} • {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Account ID</th>
                      <th>Debit</th>
                      <th>Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.lines.map((line) => (
                      <tr key={line.id}>
                        <td>{line.accountId}</td>
                        <td>{formatAmount(line.debitAmount)}</td>
                        <td>{formatAmount(line.creditAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  plain = false
}: {
  label: string;
  value: number;
  plain?: boolean;
}) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{plain ? value : formatAmount(value)}</strong>
    </div>
  );
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

