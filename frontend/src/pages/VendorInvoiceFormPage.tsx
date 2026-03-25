import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import FormField from "../components/ui/FormField";
import { api, Vendor, Account } from "../api";

const VendorInvoiceFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [vendorId, setVendorId] = useState("");
  const [expenseAccountId, setExpenseAccountId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalAmount, setTotalAmount] = useState("");
  const [jobReference, setJobReference] = useState("");

  useEffect(() => {
    Promise.all([api.getVendors(), api.getAccounts()])
      .then(([v, a]) => {
        setVendors(v);
        setAccounts(a.filter(acc => acc.category === "expense"));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await api.createVendorInvoice({
        vendorId,
        expenseAccountId,
        invoiceNumber,
        invoiceDate: new Date(invoiceDate).toISOString(),
        totalAmount: parseFloat(totalAmount),
        jobReference
      });
      navigate("/vendor-invoices");
    } catch (err: any) {
      setError(err.message || "Failed to create invoice");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="invoice-form-page">
      <PageHeader title="Record Vendor Bill" backPath="/vendor-invoices" />
      
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert-danger">{error}</div>}
          
          <FormField label="Vendor" required>
            <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} required>
              <option value="">Select Vendor...</option>
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </FormField>

          <FormField label="Expense Account" required>
            <select value={expenseAccountId} onChange={(e) => setExpenseAccountId(e.target.value)} required>
              <option value="">Select Account...</option>
              {accounts.map(a => <option key={a.id} value={a.id}>{a.code} - {a.name}</option>)}
            </select>
          </FormField>

          <div className="form-grid-2">
            <FormField label="Bill / Invoice #" required>
              <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} required />
            </FormField>

            <FormField label="Invoice Date" required>
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} required />
            </FormField>
          </div>

          <FormField label="Total Amount" required>
            <input type="number" step="0.01" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required placeholder="0.00" />
          </FormField>

          <FormField label="Job Reference (Optional)">
            <input value={jobReference} onChange={(e) => setJobReference(e.target.value)} placeholder="e.g. JOB-101" />
          </FormField>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Posting..." : "Post Bill to Ledger"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorInvoiceFormPage;
