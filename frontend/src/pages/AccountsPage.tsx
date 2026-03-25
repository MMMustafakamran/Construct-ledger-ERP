import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { api, Account } from "../api";

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="accounts-page">
      <PageHeader title="Chart of Accounts" />
      
      <div className="table-card">
        <Table 
          isLoading={loading}
          data={accounts}
          columns={[
            { header: "Code", accessor: "code" },
            { header: "Account Name", accessor: "name" },
            { 
              header: "Category", 
              accessor: (item) => <Badge variant="neutral">{item.category.toUpperCase()}</Badge> 
            },
            { 
              header: "Balance", 
              accessor: (item) => (
                <span className={item.balance < 0 ? "text-danger" : ""}>
                  {formatCurrency(item.balance)}
                </span>
              ),
              align: "right"
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AccountsPage;
