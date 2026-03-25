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

  return (
    <div className="dashboard-page">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Live figures pulled directly from the backend dashboard endpoint."
      />

      <section className="dashboard-metric-grid">
        <article className="dashboard-metric-card dashboard-metric-card-primary">
          <p className="dashboard-metric-label">Total cash balance</p>
          <strong className="dashboard-metric-value">{cashBalance}</strong>
        </article>

        <article className="dashboard-metric-card">
          <p className="dashboard-metric-label">Receivables</p>
          <strong className="dashboard-metric-value">{receivables}</strong>
        </article>

        <article className="dashboard-metric-card">
          <p className="dashboard-metric-label">Payables</p>
          <strong className="dashboard-metric-value">{payables}</strong>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-header compact">
          <div>
            <p className="section-kicker">Recent activity</p>
            <h2 className="section-title">Ledger entries</h2>
          </div>
          <span className="section-microcopy">{summary?.recentTransactions.length ?? 0} rows</span>
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
