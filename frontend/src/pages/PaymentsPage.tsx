import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import FormField from "../components/ui/FormField";
import Table from "../components/ui/Table";
import { api, VendorInvoice, BankAccount } from "../api";

const PaymentsPage: React.FC = () => {
  const [invoices, setInvoices] = useState<VendorInvoice[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [vendorInvoiceId, setVendorInvoiceId] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getVendorInvoices(),
      api.getBankAccounts(),
      api.getPayments()
    ]).then(([v, b, p]) => {
      setInvoices(v.filter(inv => inv.status !== "paid"));
      setBankAccounts(b);
      setPayments(p);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createPayment({
        vendorInvoiceId,
        bankAccountId,
        amount: parseFloat(amount),
        reference,
        paymentDate: new Date(paymentDate).toISOString()
      });
      setVendorInvoiceId("");
      setAmount("");
      setReference("");
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="payments-page">
      <PageHeader title="Vendor Payments" />
      
      <div className="payments-layout">
        <div className="form-card">
          <h3 className="section-title" style={{ marginBottom: '20px' }}>Record New Payment</h3>
          <form onSubmit={handleSubmit}>
            <FormField label="Unpaid Bill / Invoice" required>
              <select value={vendorInvoiceId} onChange={(e) => setVendorInvoiceId(e.target.value)} required>
                <option value="">Select Invoice...</option>
                {invoices.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.invoiceNumber} - {inv.vendor?.name} (Rem: {formatCurrency(inv.totalAmount - inv.paidAmount)})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Pay From Bank Account" required>
              <select value={bankAccountId} onChange={(e) => setBankAccountId(e.target.value)} required>
                <option value="">Select Bank...</option>
                {bankAccounts.map(b => (
                  <option key={b.id} value={b.id}>{b.accountName} ({formatCurrency(b.currentBalance)})</option>
                ))}
              </select>
            </FormField>

            <FormField label="Payment Amount" required>
              <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </FormField>

            <FormField label="Payment Date" required>
              <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
            </FormField>

            <FormField label="Reference / Check #">
              <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g. CHK-501" />
            </FormField>

            <button type="submit" className="primary-button" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? "Processing..." : "Record Payment"}
            </button>
          </form>
        </div>

        <div className="table-card">
          <h3 className="section-title" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>Payment History</h3>
          <Table 
            isLoading={loading}
            data={payments}
            columns={[
              { header: "Date", accessor: (item) => new Date(item.paymentDate).toLocaleDateString() },
              { header: "Invoice #", accessor: (item) => item.vendorInvoice?.invoiceNumber || item.vendorInvoiceId },
              { header: "Amount", accessor: (item) => formatCurrency(item.amount), align: "right" },
              { header: "Ref", accessor: "reference" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
