import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Table from "../components/ui/Table";
import { api, Customer } from "../api";

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCustomers().then(setCustomers).finally(() => setLoading(false));
  }, []);

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
            { header: "Phone", accessor: "phone" },
            { header: "Address", accessor: "address" },
            { header: "Status", accessor: (item) => <span className="status-active">{item.status}</span> },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomersPage;
