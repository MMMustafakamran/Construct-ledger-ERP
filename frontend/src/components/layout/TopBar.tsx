import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/accounts", label: "Ledgers" },
  { path: "/reports", label: "Reports" },
];

const titleMap: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Portfolio Summary", subtitle: "Financial snapshot for active accounts." },
  "/accounts": { title: "Chart of Accounts", subtitle: "Standardized classification of financial structure." },
  "/bank": { title: "Bank & Cash", subtitle: "Liquidity and account balances." },
  "/vendors": { title: "Vendors", subtitle: "Supplier master records." },
  "/customers": { title: "Customers", subtitle: "Customer master records." },
  "/vendor-invoices": { title: "Bills / Payables", subtitle: "Vendor obligations and expense posting." },
  "/customer-invoices": { title: "Invoices / Receivables", subtitle: "Sales invoicing and collections." },
  "/payments": { title: "Payments", subtitle: "Outgoing settlements." },
  "/receipts": { title: "Receipts", subtitle: "Incoming collections." },
  "/journal-entries": { title: "Journal Entries", subtitle: "Accounting ledger activity." },
  "/job-orders": { title: "Job Orders", subtitle: "Planned expansion area." },
  "/equipment": { title: "Equipment", subtitle: "Planned expansion area." },
  "/reports": { title: "Reports", subtitle: "Financial statements and summaries." },
};

const TopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = titleMap[location.pathname] ?? titleMap["/"];

  return (
    <header className="topbar">
      <label className="topbar-search" aria-label="Search">
        <span className="topbar-search-icon" aria-hidden="true">⌕</span>
        <input type="search" placeholder="Search ledgers, invoices, or projects..." />
      </label>

      <nav className="topbar-nav" aria-label="Top navigation">
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`topbar-link ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notifications">🔔</button>
        <button className="icon-button" type="button" aria-label="Settings">⚙</button>
        <button className="ghost-button" type="button">Switch Company</button>
        <button className="primary-button" type="button" onClick={() => navigate("/vendor-invoices/new")}>
          Create Invoice
        </button>
        <div className="topbar-user" aria-label="Current user">
          <div className="topbar-user-copy">
            <strong>Alex Mercer</strong>
            <span>Accounting Manager</span>
          </div>
          <span className="topbar-user-avatar">AM</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
