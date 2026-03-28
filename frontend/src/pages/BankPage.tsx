import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/ui/StatCard";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import { api, BankAccount, BankTransaction } from "../api";

const BankPage: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [txLoading, setTxLoading] = useState(false);

  useEffect(() => {
    api.getBankAccounts().then(setBankAccounts).finally(() => setLoading(false));
  }, []);

  const handleAccountClick = (account: BankAccount) => {
    if (selectedAccountId === account.id) {
      setSelectedAccountId(null);
      setTransactions([]);
      return;
    }
    setSelectedAccountId(account.id);
    setTxLoading(true);
    api.getBankAccountTransactions(account.id)
      .then(setTransactions)
      .finally(() => setTxLoading(false));
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const totalBalance = bankAccounts.reduce((sum, b) => sum + b.currentBalance, 0);
  const selectedAccount = bankAccounts.find(b => b.id === selectedAccountId);

  return (
    <div className="bank-page">
      <PageHeader title="Bank & Cash" />

      <div className="stat-grid">
        {bankAccounts.map(bank => (
          <StatCard
            key={bank.id}
            label={bank.accountName}
            value={formatCurrency(bank.currentBalance)}
            icon="🏦"
            variant={selectedAccountId === bank.id ? "success" : "primary"}
          />
        ))}
        {bankAccounts.length > 1 && (
          <StatCard
            label="Total"
            value={formatCurrency(totalBalance)}
            icon="💰"
            variant="primary"
          />
        )}
      </div>

      <div className="table-card">
        <h3 className="section-title" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          Account Details — <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.9rem' }}>Click a row to view transactions</span>
        </h3>
        <Table
          isLoading={loading}
          data={bankAccounts}
          onRowClick={handleAccountClick}
          columns={[
            { header: "Account Name", accessor: "accountName" },
            { header: "Account Number", accessor: "accountNumber" },
            { header: "Current Balance", accessor: (item) => formatCurrency(item.currentBalance), align: "right" },
            { header: "Status", accessor: (item) =>
              <Badge variant={item.status === "active" ? "success" : "neutral"}>{item.status}</Badge>
            },
          ]}
        />
      </div>

      {/* Transaction History Panel */}
      {selectedAccountId && (
        <div className="transaction-history-panel">
          <div className="section-header compact" style={{ padding: "0 4px", marginBottom: "6px" }}>
            <div>
              <p className="section-kicker">Transaction History</p>
              <h2 className="section-title">{selectedAccount?.accountName ?? "Account"}</h2>
            </div>
            <button className="ghost-button" onClick={() => { setSelectedAccountId(null); setTransactions([]); }}>
              Close ✕
            </button>
          </div>

          <div className="table-card">
            <Table
              isLoading={txLoading}
              data={transactions}
              columns={[
                { header: "Date", accessor: (item) => new Date(item.date).toLocaleDateString() },
                { header: "Type", accessor: (item) =>
                  <Badge variant={item.type === "inflow" ? "success" : "danger"}>
                    {item.type === "inflow" ? "↓ Inflow" : "↑ Outflow"}
                  </Badge>
                },
                { header: "Description", accessor: "description" },
                { header: "Reference", accessor: (item) => item.reference || "—" },
                { header: "Amount", accessor: (item) =>
                  <span className={item.type === "inflow" ? "amount-inflow" : "amount-outflow"}>
                    {item.type === "inflow" ? "+" : "−"}{formatCurrency(item.amount)}
                  </span>,
                  align: "right"
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BankPage;
