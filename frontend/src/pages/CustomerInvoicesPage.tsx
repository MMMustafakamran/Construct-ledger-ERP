import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { api, CustomerInvoice } from "../api";

const CustomerInvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCustomerInvoices().then(setInvoices).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid": return "success";
      case "partial": return "warning";
      case "unpaid": return "danger";
      default: return "neutral";
    }
  };

  return (
    <div className="customer-invoices-page">
      <PageHeader 
        title="Customer Invoices" 
        actionLabel="Create Invoice" 
        onAction={() => navigate("/customer-invoices/new")} 
      />
      
      <div className="table-card">
        <Table 
          isLoading={loading}
          data={invoices}
          columns={[
            { header: "Invoice #", accessor: "invoiceNumber" },
            { header: "Customer", accessor: (item) => item.customer?.name || item.customerId },
            { header: "Date", accessor: (item) => new Date(item.invoiceDate).toLocaleDateString() },
            { header: "Total", accessor: (item) => formatCurrency(item.totalAmount), align: "right" },
            { header: "Received", accessor: (item) => formatCurrency(item.receivedAmount), align: "right" },
            { 
              header: "Status", 
              accessor: (item) => <Badge variant={getStatusVariant(item.status)}>{item.status.toUpperCase()}</Badge> 
            },
            { header: "Equipment Ref", accessor: "equipmentReference" },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomerInvoicesPage;
