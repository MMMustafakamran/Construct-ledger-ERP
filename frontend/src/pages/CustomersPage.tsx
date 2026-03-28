import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import { api, Customer } from "../api";

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCustomers().then(setCustomers).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <div className="customers-page">
      <PageHeader
        title="Customers"
        actionLabel="Add Customer"
        onAction={() => navigate("/customers/new")}
      />

      <div className="table-card">
        <Table
          isLoading={loading}
          data={customers}
          columns={[
            { header: "Customer Name", accessor: "name" },
            { header: "Phone", accessor: (item) => item.phone || "—" },
            { header: "Address", accessor: (item) => item.address || "—" },
            { header: "Outstanding", accessor: (item) => {
              const balance = item.outstandingBalance ?? 0;
              return (
                <span className={balance > 0 ? "amount-inflow" : ""} style={{ fontWeight: balance > 0 ? 700 : 400 }}>
                  {formatCurrency(balance)}
                </span>
              );
            }, align: "right" },
            { header: "Status", accessor: (item) =>
              <Badge variant={item.status === "active" ? "success" : "neutral"}>{item.status}</Badge>
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomersPage;
