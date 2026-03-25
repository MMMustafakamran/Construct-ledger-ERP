import React from "react";
import { Link, useLocation } from "react-router-dom";

const coreNavItems = [
  { path: "/", label: "Dashboard", shortcut: "01" },
  { path: "/accounts", label: "Chart of Accounts", shortcut: "02" },
  { path: "/bank", label: "Bank & Cash", shortcut: "03" },
  { path: "/vendors", label: "Vendors", shortcut: "04" },
  { path: "/customers", label: "Customers", shortcut: "05" },
];

const transactionNavItems = [
  { path: "/vendor-invoices", label: "Bills / Payables", shortcut: "06" },
  { path: "/customer-invoices", label: "Invoices / Receivables", shortcut: "07" },
  { path: "/payments", label: "Payments", shortcut: "08" },
  { path: "/receipts", label: "Receipts", shortcut: "09" },
  { path: "/journal-entries", label: "Journal Entries", shortcut: "10" },
];

const comingSoonNavItems = [
  { path: "/job-orders", label: "Job Orders", shortcut: "11" },
  { path: "/equipment", label: "Equipment", shortcut: "12" },
  { path: "/reports", label: "Reports", shortcut: "13" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">CL</div>
        <div>
          <p className="brand-name">ConstructLedger</p>
          <p className="brand-tag">Accounting workspace</p>
        </div>
      </div>

      <div className="sidebar-panel">
        <div className="sidebar-section">
          <p className="sidebar-panel-label">Core</p>
          <nav className="sidebar-nav">
            {coreNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              >
                <span className="nav-shortcut">{item.shortcut}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-panel-label">Transactions</p>
          <nav className="sidebar-nav">
            {transactionNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              >
                <span className="nav-shortcut">{item.shortcut}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="sidebar-section sidebar-section-muted">
          <p className="sidebar-panel-label">Coming soon</p>
          <nav className="sidebar-nav">
            {comingSoonNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link nav-link-muted ${location.pathname === item.path ? "active" : ""}`}
              >
                <span className="nav-shortcut">{item.shortcut}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
