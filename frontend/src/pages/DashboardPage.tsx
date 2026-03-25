import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import { api, DashboardSummary } from "../api";

const cashFlowBars = [62, 74, 82, 68, 88, 79];
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

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
        title="Portfolio Summary"
        description="Financial snapshot for current accounts and associated construction activity."
      />

      <div className="dashboard-meta">
        <div>
          <p className="section-kicker">Last reconciled</p>
          <strong>Today, 09:42 AM</strong>
        </div>
        <Badge variant="neutral">Quarterly view</Badge>
      </div>

      <section className="dashboard-highlight-row">
        <article className="featured-card">
          <p className="card-kicker">Total cash balance</p>
          <h2>{cashBalance}</h2>
          <p className="card-note">Updated from bank and receipt postings.</p>
          <span className="card-trend">+12.4% from last month</span>
        </article>

        <div className="mini-card-stack">
          <article className="mini-card">
            <p className="card-kicker">Receivables</p>
            <strong>{receivables}</strong>
            <div className="progress-line">
              <span style={{ width: "74%" }} />
            </div>
            <small>75% collected</small>
          </article>
          <article className="mini-card">
            <p className="card-kicker">Payables</p>
            <strong>{payables}</strong>
            <div className="progress-line muted">
              <span style={{ width: "38%" }} />
            </div>
            <small>Due in 30 days</small>
          </article>
        </div>
      </section>

      <section className="dashboard-content-grid">
        <article className="chart-card">
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Cash flow</p>
              <h2 className="section-title">Monthly movement</h2>
            </div>
            <span className="section-microcopy">Past 6 months</span>
          </div>

          <div className="bar-chart" aria-label="Cash flow chart">
            {cashFlowBars.map((height, index) => (
              <div key={labels[index]} className="bar-column">
                <div className="bar-track">
                  <div className="bar-fill" style={{ height: `${height}%` }} />
                  <div className="bar-cap" style={{ height: `${Math.max(18, 100 - height)}%` }} />
                </div>
                <span>{labels[index]}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="alerts-column">
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Critical alerts</p>
              <h2 className="section-title">Watch list</h2>
            </div>
          </div>

          <article className="alert-card alert-card-danger">
            <div className="alert-card-meta">
              <span className="alert-dot" />
              <small>32 days overdue</small>
            </div>
            <h3>Lumina Steel Structures</h3>
            <strong>$14,200.00</strong>
            <button className="ghost-button alert-action" type="button">Contact vendor</button>
          </article>

          <article className="alert-card alert-card-neutral">
            <div className="alert-card-meta">
              <span className="alert-dot subtle" />
              <small>Approaching limit</small>
            </div>
            <h3>Oakwood Framing Co.</h3>
            <strong>$2,150.40</strong>
            <p>System alert: Net-30 payment window closing in 48 hours.</p>
          </article>
        </aside>
      </section>

      <div className="section-header">
        <div>
          <p className="section-kicker">Recent activity</p>
          <h2 className="section-title">Ledger entries</h2>
        </div>
        <button className="ghost-button" type="button">View comprehensive ledger -&gt;</button>
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
    </div>
  );
};

export default DashboardPage;
