import React from "react";
import { Link, useLocation } from "react-router-dom";

const sections = [
  {
    label: "Overview",
    items: [{ path: "/", label: "Dashboard", shortcut: "01" }],
  },
  {
    label: "Masters",
    items: [
      { path: "/accounts", label: "Chart of Accounts", shortcut: "02" },
      { path: "/bank", label: "Bank & Cash", shortcut: "03" },
      { path: "/vendors", label: "Vendors", shortcut: "04" },
      { path: "/customers", label: "Customers", shortcut: "05" },
    ],
  },
  {
    label: "Transactions",
    items: [
      { path: "/vendor-invoices", label: "Bills / Payables", shortcut: "06" },
      { path: "/customer-invoices", label: "Invoices / Receivables", shortcut: "07" },
      { path: "/payments", label: "Payments", shortcut: "08" },
      { path: "/receipts", label: "Receipts", shortcut: "09" },
    ],
  },
  {
    label: "Accounting",
    items: [{ path: "/journal-entries", label: "Journal Entries", shortcut: "10" }],
  },
  {
    label: "Coming Soon",
    muted: true,
    items: [
      { path: "/job-orders", label: "Job Orders", shortcut: "11" },
      { path: "/equipment", label: "Equipment", shortcut: "12" },
      { path: "/reports", label: "Reports", shortcut: "13" },
    ],
  },
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
        {sections.map((section) => (
          <div key={section.label} className={`sidebar-section ${section.muted ? "sidebar-section-muted" : ""}`}>
            <p className="sidebar-panel-label">{section.label}</p>
            <nav className="sidebar-nav">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${section.muted ? "nav-link-muted" : ""} ${location.pathname === item.path ? "active" : ""}`}
                >
                  <span className="nav-shortcut">{item.shortcut}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}

        <div className="sidebar-footer">
          <button className="sidebar-cta" type="button">
            + New Entry
          </button>
          <div className="sidebar-links">
            <button className="sidebar-link" type="button">Settings</button>
            <button className="sidebar-link" type="button">Support</button>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">JD</div>
            <div>
              <strong>Admin</strong>
              <span>Senior Accountant</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
