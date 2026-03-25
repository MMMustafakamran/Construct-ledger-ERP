import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const titleMap: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Financial pulse and operational overview" },
  "/accounts": { title: "Chart of Accounts", subtitle: "Core ledger structure" },
  "/bank": { title: "Bank & Cash", subtitle: "Liquidity and account balances" },
  "/vendors": { title: "Vendors", subtitle: "Supplier master records" },
  "/customers": { title: "Customers", subtitle: "Customer master records" },
  "/vendor-invoices": { title: "Bills / Payables", subtitle: "Vendor obligations and expense posting" },
  "/customer-invoices": { title: "Invoices / Receivables", subtitle: "Sales invoicing and collections" },
  "/payments": { title: "Payments", subtitle: "Outgoing settlements" },
  "/receipts": { title: "Receipts", subtitle: "Incoming collections" },
  "/journal-entries": { title: "Journal Entries", subtitle: "Accounting ledger activity" },
  "/job-orders": { title: "Job Orders", subtitle: "Planned expansion area" },
  "/equipment": { title: "Equipment", subtitle: "Planned expansion area" },
  "/reports": { title: "Reports", subtitle: "Financial statements and summaries" },
};

const TopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = titleMap[location.pathname] ?? titleMap["/"];

  return (
    <header className="topbar">
      <div className="topbar-copy">
        <div>
          <h1 className="topbar-title">{current.title}</h1>
          <p className="topbar-subtitle">{current.subtitle}</p>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="topbar-search" aria-label="Search">
          <span className="topbar-search-icon" aria-hidden="true">⌕</span>
          <input type="search" placeholder="Search accounts, invoices, vendors..." />
        </label>
        <button className="ghost-button" type="button" onClick={() => navigate("/vendors/new")}>
          Quick add
        </button>
        <div className="topbar-user" aria-label="Current user">
          <span className="topbar-user-avatar">AR</span>
          <div>
            <strong>Admin</strong>
            <span>Owner access</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
