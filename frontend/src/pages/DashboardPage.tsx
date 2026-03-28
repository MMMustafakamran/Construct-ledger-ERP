import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import { api, DashboardSummary, OverdueInvoice } from "../api";

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
  const totalOverdue = (summary?.overdueVendorInvoices?.length ?? 0) + (summary?.overdueCustomerInvoices?.length ?? 0);

  // Cash flow chart helpers
  const maxFlowValue = summary?.monthlyFlow
    ? Math.max(...summary.monthlyFlow.flatMap(m => [m.inflow, m.outflow]), 1)
    : 1;

  return (
    <div className="dashboard-page">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Real-time financial snapshot across all accounts."
      />

      {/* ── Metric Cards ── */}
      <section className="dashboard-metric-grid-4">
        <article className="dashboard-metric-card dashboard-metric-card-primary">
          <p className="dashboard-metric-label">Cash & Bank Balance</p>
          <strong className="dashboard-metric-value">{cashBalance}</strong>
        </article>

        <article className="dashboard-metric-card">
          <p className="dashboard-metric-label">Accounts Receivable</p>
          <strong className="dashboard-metric-value">{receivables}</strong>
        </article>

        <article className="dashboard-metric-card">
          <p className="dashboard-metric-label">Accounts Payable</p>
          <strong className="dashboard-metric-value">{payables}</strong>
        </article>

        <article className={`dashboard-metric-card ${totalOverdue > 0 ? "dashboard-metric-card-danger" : ""}`}>
          <p className="dashboard-metric-label">Overdue Invoices</p>
          <strong className="dashboard-metric-value">{totalOverdue}</strong>
        </article>
      </section>

      {/* ── Cash Flow Chart ── */}
      {summary?.monthlyFlow && summary.monthlyFlow.length > 0 && (
        <section className="dashboard-section">
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Cash Flow</p>
              <h2 className="section-title">Monthly Inflow vs Outflow</h2>
            </div>
            <div className="chart-legend">
              <span className="legend-dot legend-inflow"></span> Inflow
              <span className="legend-dot legend-outflow"></span> Outflow
            </div>
          </div>
          <div className="surface-card" style={{ padding: "24px" }}>
            <div className="cashflow-chart">
              {summary.monthlyFlow.map((m, i) => (
                <div className="cashflow-bar-group" key={i}>
                  <div className="cashflow-bars">
                    <div
                      className="cashflow-bar inflow"
                      style={{ height: `${(m.inflow / maxFlowValue) * 180}px` }}
                      title={formatCurrency(m.inflow)}
                    >
                      {m.inflow > 0 && <span className="bar-value">{formatCurrency(m.inflow)}</span>}
                    </div>
                    <div
                      className="cashflow-bar outflow"
                      style={{ height: `${(m.outflow / maxFlowValue) * 180}px` }}
                      title={formatCurrency(m.outflow)}
                    >
                      {m.outflow > 0 && <span className="bar-value">{formatCurrency(m.outflow)}</span>}
                    </div>
                  </div>
                  <span className="cashflow-label">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Aging Summary ── */}
      {summary?.aging && (
        <section className="dashboard-section">
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Invoice Aging</p>
              <h2 className="section-title">Outstanding by Age</h2>
            </div>
          </div>
          <div className="aging-grid">
            <div className="aging-card aging-current">
              <div className="aging-card-header">
                <span className="aging-label">Current</span>
                <span className="aging-badge badge-success">0–30 days</span>
              </div>
              <strong className="aging-value">{formatCurrency(summary.aging.current)}</strong>
              <span className="aging-count">{summary.aging.currentCount} invoice{summary.aging.currentCount !== 1 ? "s" : ""}</span>
              <div className="aging-bar">
                <div className="aging-bar-fill aging-fill-current" style={{
                  width: `${Math.min(100, (summary.aging.current / Math.max(summary.aging.current + summary.aging.thirtyToSixty + summary.aging.overSixty, 1)) * 100)}%`
                }}></div>
              </div>
            </div>
            <div className="aging-card aging-warning">
              <div className="aging-card-header">
                <span className="aging-label">Aging</span>
                <span className="aging-badge badge-warning">31–60 days</span>
              </div>
              <strong className="aging-value">{formatCurrency(summary.aging.thirtyToSixty)}</strong>
              <span className="aging-count">{summary.aging.thirtyToSixtyCount} invoice{summary.aging.thirtyToSixtyCount !== 1 ? "s" : ""}</span>
              <div className="aging-bar">
                <div className="aging-bar-fill aging-fill-warning" style={{
                  width: `${Math.min(100, (summary.aging.thirtyToSixty / Math.max(summary.aging.current + summary.aging.thirtyToSixty + summary.aging.overSixty, 1)) * 100)}%`
                }}></div>
              </div>
            </div>
            <div className="aging-card aging-danger">
              <div className="aging-card-header">
                <span className="aging-label">Critical</span>
                <span className="aging-badge badge-danger">60+ days</span>
              </div>
              <strong className="aging-value">{formatCurrency(summary.aging.overSixty)}</strong>
              <span className="aging-count">{summary.aging.overSixtyCount} invoice{summary.aging.overSixtyCount !== 1 ? "s" : ""}</span>
              <div className="aging-bar">
                <div className="aging-bar-fill aging-fill-danger" style={{
                  width: `${Math.min(100, (summary.aging.overSixty / Math.max(summary.aging.current + summary.aging.thirtyToSixty + summary.aging.overSixty, 1)) * 100)}%`
                }}></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Receivables vs Payables Donut ── */}
      {summary && (summary.receivables > 0 || summary.payables > 0) && (
        <section className="dashboard-section">
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Balance Overview</p>
              <h2 className="section-title">Receivables vs Payables</h2>
            </div>
          </div>
          <div className="surface-card" style={{ padding: "28px" }}>
            <div className="donut-row">
              <div className="donut-container">
                <svg viewBox="0 0 120 120" className="donut-svg">
                  {(() => {
                    const total = summary.receivables + summary.payables;
                    const recPct = total > 0 ? (summary.receivables / total) * 100 : 50;
                    const payPct = total > 0 ? (summary.payables / total) * 100 : 50;
                    const circumference = 2 * Math.PI * 45;
                    const recLen = (recPct / 100) * circumference;
                    const payLen = (payPct / 100) * circumference;
                    return (
                      <>
                        <circle cx="60" cy="60" r="45" fill="none" stroke="var(--border)" strokeWidth="18" />
                        <circle
                          cx="60" cy="60" r="45" fill="none"
                          stroke="var(--success)" strokeWidth="18"
                          strokeDasharray={`${recLen} ${circumference}`}
                          strokeDashoffset="0"
                          transform="rotate(-90 60 60)"
                          className="donut-segment"
                        />
                        <circle
                          cx="60" cy="60" r="45" fill="none"
                          stroke="var(--danger)" strokeWidth="18"
                          strokeDasharray={`${payLen} ${circumference}`}
                          strokeDashoffset={`${-recLen}`}
                          transform="rotate(-90 60 60)"
                          className="donut-segment"
                        />
                        <text x="60" y="56" textAnchor="middle" className="donut-center-label">Net</text>
                        <text x="60" y="72" textAnchor="middle" className="donut-center-value">
                          {formatCurrency(summary.receivables - summary.payables)}
                        </text>
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div className="donut-legend-stack">
                <div className="donut-legend-item">
                  <span className="legend-dot legend-inflow"></span>
                  <div>
                    <span className="donut-legend-label">Receivables</span>
                    <strong className="donut-legend-value">{formatCurrency(summary.receivables)}</strong>
                  </div>
                </div>
                <div className="donut-legend-item">
                  <span className="legend-dot legend-outflow"></span>
                  <div>
                    <span className="donut-legend-label">Payables</span>
                    <strong className="donut-legend-value">{formatCurrency(summary.payables)}</strong>
                  </div>
                </div>
                <div className="donut-legend-item">
                  <span className="legend-dot legend-net"></span>
                  <div>
                    <span className="donut-legend-label">Net Position</span>
                    <strong className="donut-legend-value" style={{ color: summary.receivables >= summary.payables ? "var(--success)" : "var(--danger)" }}>
                      {formatCurrency(summary.receivables - summary.payables)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Overdue Invoices ── */}
      {totalOverdue > 0 && (
        <section className="dashboard-section">
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Attention Required</p>
              <h2 className="section-title">Overdue Invoices</h2>
            </div>
            <Badge variant="danger">{totalOverdue} overdue</Badge>
          </div>
          <div className="overdue-grid">
            {(summary?.overdueVendorInvoices?.length ?? 0) > 0 && (
              <div className="surface-card">
                <h3 className="section-title" style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
                  ⬆ Vendor Bills Overdue
                </h3>
                <Table
                  isLoading={loading}
                  data={summary!.overdueVendorInvoices}
                  columns={[
                    { header: "Invoice #", accessor: "invoiceNumber" },
                    { header: "Vendor", accessor: "name" },
                    { header: "Outstanding", accessor: (item: OverdueInvoice) => <span className="text-danger">{formatCurrency(item.outstanding)}</span>, align: "right" },
                    { header: "Days Overdue", accessor: (item: OverdueInvoice) => <Badge variant="danger">{item.daysOverdue}d</Badge> },
                  ]}
                />
              </div>
            )}
            {(summary?.overdueCustomerInvoices?.length ?? 0) > 0 && (
              <div className="surface-card">
                <h3 className="section-title" style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
                  ⬇ Customer Invoices Overdue
                </h3>
                <Table
                  isLoading={loading}
                  data={summary!.overdueCustomerInvoices}
                  columns={[
                    { header: "Invoice #", accessor: "invoiceNumber" },
                    { header: "Customer", accessor: "name" },
                    { header: "Outstanding", accessor: (item: OverdueInvoice) => <span className="text-danger">{formatCurrency(item.outstanding)}</span>, align: "right" },
                    { header: "Days Overdue", accessor: (item: OverdueInvoice) => <Badge variant="danger">{item.daysOverdue}d</Badge> },
                  ]}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Recent Transactions ── */}
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
