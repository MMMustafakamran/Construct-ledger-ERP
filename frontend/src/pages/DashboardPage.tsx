import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import { api, DashboardSummary } from "../api";

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="dashboard-page">
      <PageHeader title="Executive Overview" />
      
      <div className="stat-grid">
        <StatCard 
          label="Total Receivables" 
          value={summary ? formatCurrency(summary.receivables) : "$0.00"} 
          icon="📥" 
          variant="success"
        />
        <StatCard 
          label="Total Payables" 
          value={summary ? formatCurrency(summary.payables) : "$0.00"} 
          icon="💸" 
          variant="danger"
        />
        <StatCard 
          label="Available Cash" 
          value={summary ? formatCurrency(summary.cashBalance) : "$0.00"} 
          icon="🏦" 
          variant="primary"
        />
        <StatCard 
          label="Total Transactions" 
          value={summary?.totalTransactions || 0} 
          icon="📓" 
          variant="neutral"
        />
      </div>

      <div className="section-header">
        <h2 className="section-title">Recent Journal Entries</h2>
      </div>

      <div className="table-card">
        <Table 
          isLoading={loading}
          data={summary?.recentTransactions || []}
          columns={[
            { header: "Date", accessor: (item) => new Date(item.entryDate).toLocaleDateString() },
            { header: "Reference", accessor: (item) => `${item.referenceType} (${item.referenceId.slice(0,8)})` },
            { header: "Memo", accessor: "memo" },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
