import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import FormField from "../components/ui/FormField";
import { api } from "../api";

const VendorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.createVendor({ name, phone, address });
      navigate("/vendors");
    } catch (err: any) {
      setError(err.message || "Failed to create vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-form-page">
      <PageHeader title="New Vendor" backPath="/vendors" />
      
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert-danger">{error}</div>}
          
          <FormField label="Vendor Name" required>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Acme Supplies Ltd" 
              required 
            />
          </FormField>

          <FormField label="Phone Number">
            <input 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="e.g. 555-0100" 
            />
          </FormField>

          <FormField label="Full Address">
            <textarea 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="e.g. 123 Supply St, City" 
              rows={3}
            />
          </FormField>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Saving..." : "Create Vendor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorFormPage;
