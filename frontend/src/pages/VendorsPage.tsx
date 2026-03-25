import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Table from "../components/ui/Table";
import { api, Vendor } from "../api";

const VendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getVendors().then(setVendors).finally(() => setLoading(false));
  }, []);

  return (
    <div className="vendors-page">
      <PageHeader 
        title="Vendors" 
        actionLabel="Add Vendor" 
        onAction={() => navigate("/vendors/new")} 
      />
      
      <div className="table-card">
        <Table 
          isLoading={loading}
          data={vendors}
          columns={[
            { header: "Vendor Name", accessor: "name" },
            { header: "Phone", accessor: "phone" },
            { header: "Address", accessor: "address" },
            { header: "Status", accessor: (item) => <span className="status-active">{item.status}</span> },
          ]}
        />
      </div>
    </div>
  );
};

export default VendorsPage;
