import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { api, DashboardSummary } from "../api";

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard().then(setSummary).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const alerts = [
    { label: "Overdue invoices", value: "8", tone: "warning" },
    { label: "Open payables", value: summary ? formatCurrency(summary.payables) : "$0.00", tone: "danger" },
    { label: "Cash runway", value: "Healthy", tone: "success" },
  ] as const;

  return (
    <div className="dashboard-page">
      <PageHeader
        eyebrow="Command center"
        title="Financial overview"
        description="Track receivables, payables, cash, and ledger activity from one calm workspace."
      />

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="hero-label">Today's pulse</p>
          <h2>Built for fast scanning and confident bookkeeping.</h2>
          <p>
            This layout puts cash position, debt exposure, and transaction flow in one place so teams can work without hunting through menus.
          </p>
        </div>
        <div className="hero-alerts">
          {alerts.map((item) => (
            <div key={item.label} className={`hero-alert ${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="stat-grid">
        <StatCard label="Total Receivables" value={summary ? formatCurrency(summary.receivables) : "$0.00"} icon="AR" variant="success" />
        <StatCard label="Total Payables" value={summary ? formatCurrency(summary.payables) : "$0.00"} icon="AP" variant="danger" />
        <StatCard label="Available Cash" value={summary ? formatCurrency(summary.cashBalance) : "$0.00"} icon="CB" variant="primary" />
        <StatCard label="Total Transactions" value={summary?.totalTransactions || 0} icon="JR" variant="neutral" />
      </div>

      <div className="section-header">
        <div>
          <p className="section-kicker">Recent ledger activity</p>
          <h2 className="section-title">Journal entries</h2>
        </div>
        <Badge variant="info">Live</Badge>
      </div>

      <div className="surface-card">
        <Table
          isLoading={loading}
          data={summary?.recentTransactions || []}
          columns={[
            { header: "Date", accessor: (item) => new Date(item.entryDate).toLocaleDateString() },
            { header: "Reference", accessor: (item) => `${item.referenceType} (${item.referenceId.slice(0, 8)})` },
            { header: "Memo", accessor: "memo" },
            { header: "Status", accessor: () => <Badge variant="neutral">Posted</Badge> },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
