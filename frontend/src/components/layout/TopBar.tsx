import React from "react";
import { useLocation } from "react-router-dom";

const titleMap: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Portfolio Summary", subtitle: "Financial snapshot for active accounts." },
  "/accounts": { title: "Chart of Accounts", subtitle: "Standardized classification of financial structure." },
  "/bank": { title: "Bank & Cash", subtitle: "Liquidity and account balances." },
  "/vendors": { title: "Vendors", subtitle: "Supplier master records." },
  "/vendors/new": { title: "New Vendor", subtitle: "Create a supplier master record." },
  "/customers": { title: "Customers", subtitle: "Customer master records." },
  "/customers/new": { title: "New Customer", subtitle: "Create a customer master record." },
  "/vendor-invoices": { title: "Bills / Payables", subtitle: "Vendor obligations and expense posting." },
  "/vendor-invoices/new": { title: "Record Vendor Bill", subtitle: "Post a payable into the ledger." },
  "/customer-invoices": { title: "Invoices / Receivables", subtitle: "Sales invoicing and collections." },
  "/customer-invoices/new": { title: "New Customer Invoice", subtitle: "Create a receivable document." },
  "/payments": { title: "Payments", subtitle: "Outgoing settlements." },
  "/receipts": { title: "Receipts", subtitle: "Incoming collections." },
  "/journal-entries": { title: "Journal Entries", subtitle: "Accounting ledger activity." },
  "/job-orders": { title: "Job Orders", subtitle: "Planned expansion area." },
  "/equipment": { title: "Equipment", subtitle: "Planned expansion area." },
  "/reports": { title: "Reports", subtitle: "Financial statements and summaries." },
};

const TopBar: React.FC = () => {
  const location = useLocation();
  const current = titleMap[location.pathname] ?? titleMap["/"];
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="topbar">
      <div className="topbar-copy">
        <p className="topbar-kicker">Workspace</p>
        <h1 className="topbar-title">{current.title}</h1>
        <p className="topbar-subtitle">{current.subtitle}</p>
      </div>

      <div className="topbar-status">
        <div className="topbar-chip">
          <span>Section</span>
          <strong>{current.title}</strong>
        </div>
        <div className="topbar-chip">
          <span>Today</span>
          <strong>{today}</strong>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
