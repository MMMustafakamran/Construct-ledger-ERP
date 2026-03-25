import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import FormField from "../components/ui/FormField";
import Table from "../components/ui/Table";
import { api, CustomerInvoice, BankAccount } from "../api";

const ReceiptsPage: React.FC = () => {
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [customerInvoiceId, setCustomerInvoiceId] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [receiptDate, setReceiptDate] = useState(new Date().toISOString().split('T')[0]);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getCustomerInvoices(),
      api.getBankAccounts(),
      api.getReceipts()
    ]).then(([v, b, p]) => {
      setInvoices(v.filter(inv => inv.status !== "paid"));
      setBankAccounts(b);
      setReceipts(p);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createReceipt({
        customerInvoiceId,
        bankAccountId,
        amount: parseFloat(amount),
        reference,
        receiptDate: new Date(receiptDate).toISOString()
      });
      setCustomerInvoiceId("");
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
    <div className="receipts-page">
      <PageHeader title="Customer Receipts" />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
        <div className="form-card" style={{ maxWidth: 'none' }}>
          <h3 className="section-title" style={{ marginBottom: '20px' }}>Record New Receipt</h3>
          <form onSubmit={handleSubmit}>
            <FormField label="Unpaid Invoice" required>
              <select value={customerInvoiceId} onChange={(e) => setCustomerInvoiceId(e.target.value)} required>
                <option value="">Select Invoice...</option>
                {invoices.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.invoiceNumber} - {inv.customer?.name} (Rem: {formatCurrency(inv.totalAmount - inv.receivedAmount)})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Deposit to Bank Account" required>
              <select value={bankAccountId} onChange={(e) => setBankAccountId(e.target.value)} required>
                <option value="">Select Bank...</option>
                {bankAccounts.map(b => (
                  <option key={b.id} value={b.id}>{b.accountName} ({formatCurrency(b.currentBalance)})</option>
                ))}
              </select>
            </FormField>

            <FormField label="Receipt Amount" required>
              <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </FormField>

            <FormField label="Receipt Date" required>
              <input type="date" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} required />
            </FormField>

            <FormField label="Reference / EFT #">
              <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g. EFT-999" />
            </FormField>

            <button type="submit" className="primary-button" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? "Processing..." : "Record Receipt"}
            </button>
          </form>
        </div>

        <div className="table-card">
          <h3 className="section-title" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>Receipt History</h3>
          <Table 
            isLoading={loading}
            data={receipts}
            columns={[
              { header: "Date", accessor: (item) => new Date(item.receiptDate).toLocaleDateString() },
              { header: "Invoice #", accessor: (item) => item.customerInvoice?.invoiceNumber || item.customerInvoiceId },
              { header: "Amount", accessor: (item) => formatCurrency(item.amount), align: "right" },
              { header: "Ref", accessor: "reference" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiptsPage;
