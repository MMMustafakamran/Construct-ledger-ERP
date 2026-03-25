import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import FormField from "../components/ui/FormField";
import { api, Customer, Account } from "../api";

const CustomerInvoiceFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [customerId, setCustomerId] = useState("");
  const [revenueAccountId, setRevenueAccountId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalAmount, setTotalAmount] = useState("");
  const [equipmentReference, setEquipmentReference] = useState("");

  useEffect(() => {
    Promise.all([api.getCustomers(), api.getAccounts()])
      .then(([c, a]) => {
        setCustomers(c);
        setAccounts(a.filter(acc => acc.category === "revenue"));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await api.createCustomerInvoice({
        customerId,
        revenueAccountId,
        invoiceNumber,
        invoiceDate: new Date(invoiceDate).toISOString(),
        totalAmount: parseFloat(totalAmount),
        equipmentReference
      });
      navigate("/customer-invoices");
    } catch (err: any) {
      setError(err.message || "Failed to create invoice");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="invoice-form-page">
      <PageHeader title="New Customer Invoice" backPath="/customer-invoices" />
      
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert-danger">{error}</div>}
          
          <FormField label="Customer" required>
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
              <option value="">Select Customer...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </FormField>

          <FormField label="Revenue Account" required>
            <select value={revenueAccountId} onChange={(e) => setRevenueAccountId(e.target.value)} required>
              <option value="">Select Account...</option>
              {accounts.map(a => <option key={a.id} value={a.id}>{a.code} - {a.name}</option>)}
            </select>
          </FormField>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField label="Invoice #" required>
              <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} required />
            </FormField>

            <FormField label="Invoice Date" required>
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} required />
            </FormField>
          </div>

          <FormField label="Total Amount" required>
            <input type="number" step="0.01" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required placeholder="0.00" />
          </FormField>

          <FormField label="Equipment Reference (Optional)">
            <input value={equipmentReference} onChange={(e) => setEquipmentReference(e.target.value)} placeholder="e.g. EXC-01" />
          </FormField>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Posting..." : "Generate Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInvoiceFormPage;
