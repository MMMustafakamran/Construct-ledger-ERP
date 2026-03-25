import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import { api, BankAccount } from "../api";

const BankPage: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBankAccounts().then(setBankAccounts).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

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
            variant="primary"
          />
        ))}
      </div>

      <div className="table-card">
        <h3 className="section-title" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>Account Details</h3>
        <Table 
          isLoading={loading}
          data={bankAccounts}
          columns={[
            { header: "Account Name", accessor: "accountName" },
            { header: "Account Number", accessor: "accountNumber" },
            { header: "Current Balance", accessor: (item) => formatCurrency(item.currentBalance), align: "right" },
            { header: "Status", accessor: "status" },
          ]}
        />
      </div>
    </div>
  );
};

export default BankPage;
