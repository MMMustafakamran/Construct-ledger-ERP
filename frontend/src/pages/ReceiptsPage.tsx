import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import FormField from "../components/ui/FormField";
import Table from "../components/ui/Table";
import StatCard from "../components/ui/StatCard";
import Drawer from "../components/ui/Drawer";
import { api, CustomerInvoice, BankAccount } from "../api";

const ReceiptsPage: React.FC = () => {
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");
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
      setSuccessMessage("Receipt recorded successfully!");
      loadData();
      setTimeout(() => {
        setIsDrawerOpen(false);
        setSuccessMessage("");
      }, 1500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  // Calculate Metrics
  const totalReceipts = receipts.reduce((sum, r) => sum + r.amount, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.totalAmount - inv.receivedAmount), 0);
  const totalCash = bankAccounts.reduce((sum, b) => sum + b.currentBalance, 0);

  return (
    <div className="receipts-page">
      <div className="page-header">
        <div className="header-title-row">
          <h1 className="page-title">Customer Receipts</h1>
        </div>
        <div className="header-actions">
          <button className="primary-button" onClick={() => setIsDrawerOpen(true)}>
            + Record Receipt
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard 
          label="Total Receipts Recorded" 
          value={formatCurrency(totalReceipts)} 
          icon="💵" 
          variant="success" 
        />
        <StatCard 
          label="Outstanding Receivables" 
          value={formatCurrency(totalOutstanding)} 
          icon="⏳" 
          variant="warning" 
        />
        <StatCard 
          label="Total Bank Balance" 
          value={formatCurrency(totalCash)} 
          icon="🏦" 
          variant="primary" 
        />
      </div>

      <div className="table-card">
        <h3 className="section-title" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>Receipt History</h3>
        {receipts.length === 0 && !loading ? (
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧾</div>
            <h3>No receipts recorded yet</h3>
            <p style={{ marginTop: '8px' }}>When you receive payments from customers, record them here.</p>
          </div>
        ) : (
          <Table 
            isLoading={loading}
            data={receipts}
            columns={[
              { header: "Date", accessor: (item) => new Date(item.receiptDate).toLocaleDateString() },
              { header: "Invoice #", accessor: (item) => item.customerInvoice?.invoiceNumber || item.customerInvoiceId },
              { header: "Amount", accessor: (item) => <strong style={{color: "var(--success)"}}>{formatCurrency(item.amount)}</strong>, align: "right" },
              { header: "Deposit Account", accessor: (item) => `🏦 ${item.bankAccount?.accountName || "Bank"}` },
              { header: "Ref", accessor: "reference" },
            ]}
          />
        )}
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Record New Receipt"
      >
        <form onSubmit={handleSubmit}>
          {successMessage && <div className="alert-danger" style={{ background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' }}>{successMessage}</div>}
          
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

          <div className="form-grid-2">
            <FormField label="Receipt Amount" required>
              <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </FormField>

            <FormField label="Receipt Date" required>
              <input type="date" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} required />
            </FormField>
          </div>

          <FormField label="Reference / EFT #">
            <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g. EFT-999" />
          </FormField>

          <div className="form-actions">
            <button type="button" className="back-button" onClick={() => setIsDrawerOpen(false)} style={{ marginRight: '16px' }}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Processing..." : "Confirm Receipt"}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default ReceiptsPage;
