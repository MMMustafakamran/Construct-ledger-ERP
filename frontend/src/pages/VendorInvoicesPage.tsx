import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { api, VendorInvoice } from "../api";

const VendorInvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<VendorInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getVendorInvoices().then(setInvoices).finally(() => setLoading(false));
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
    <div className="vendor-invoices-page">
      <PageHeader 
        title="Vendor Bills" 
        actionLabel="Record Bill" 
        onAction={() => navigate("/vendor-invoices/new")} 
      />
      
      <div className="table-card">
        <Table 
          isLoading={loading}
          data={invoices}
          columns={[
            { header: "Invoice #", accessor: "invoiceNumber" },
            { header: "Vendor", accessor: (item) => item.vendor?.name || item.vendorId },
            { header: "Date", accessor: (item) => new Date(item.invoiceDate).toLocaleDateString() },
            { header: "Total", accessor: (item) => formatCurrency(item.totalAmount), align: "right" },
            { header: "Paid", accessor: (item) => formatCurrency(item.paidAmount), align: "right" },
            { 
              header: "Status", 
              accessor: (item) => <Badge variant={getStatusVariant(item.status)}>{item.status.toUpperCase()}</Badge> 
            },
            { header: "Job Reference", accessor: "jobReference" },
          ]}
        />
      </div>
    </div>
  );
};

export default VendorInvoicesPage;
