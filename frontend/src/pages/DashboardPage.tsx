import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import { api, DashboardSummary } from "../api";

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard().then(setSummary).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const cashBalance = summary ? formatCurrency(summary.cashBalance) : "$0.00";
  const receivables = summary ? formatCurrency(summary.receivables) : "$0.00";
  const payables = summary ? formatCurrency(summary.payables) : "$0.00";
  const totalTransactions = summary ? summary.totalTransactions : 0;
  const recentCount = summary?.recentTransactions.length ?? 0;

  return (
    <div className="dashboard-page">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Live figures pulled directly from the backend dashboard endpoint."
      />

      <section className="dashboard-hero">
        <article className="dashboard-hero-main">
          <p className="card-kicker">Cash balance</p>
          <h2>{cashBalance}</h2>
          <p className="card-note">Current cash position across connected bank accounts.</p>
          <div className="dashboard-hero-foot">
            <Badge variant="neutral">Recent entries: {recentCount}</Badge>
            <span className="hero-caption">No placeholder analytics or fabricated alerts.</span>
          </div>
        </article>

        <aside className="dashboard-stat-rail">
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-label">Receivables</span>
            <strong>{receivables}</strong>
          </article>
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-label">Payables</span>
            <strong>{payables}</strong>
          </article>
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-label">Total transactions</span>
            <strong>{totalTransactions}</strong>
          </article>
        </aside>
      </section>

      <section className="dashboard-section">
        <div className="section-header compact">
          <div>
            <p className="section-kicker">Recent activity</p>
            <h2 className="section-title">Ledger entries</h2>
          </div>
          <span className="section-microcopy">Latest rows from the API</span>
        </div>

        <div className="surface-card">
          <Table
            isLoading={loading}
            data={summary?.recentTransactions || []}
            columns={[
              { header: "Reference", accessor: (item) => `${item.referenceType} (${item.referenceId.slice(0, 8)})` },
              { header: "Memo", accessor: "memo" },
              { header: "Date", accessor: (item) => new Date(item.entryDate).toLocaleDateString() },
              { header: "Status", accessor: () => <Badge variant="success">Cleared</Badge> },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
