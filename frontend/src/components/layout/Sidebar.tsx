import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/accounts", label: "Chart of Accounts", icon: "📋" },
  { path: "/bank", label: "Bank & Cash", icon: "🏦" },
  { path: "/vendors", label: "Vendors", icon: "🚚" },
  { path: "/customers", label: "Customers", icon: "👥" },
  { path: "/vendor-invoices", label: "Bills / Payables", icon: "💸" },
  { path: "/customer-invoices", label: "Invoices / Receivables", icon: "📥" },
  { path: "/payments", label: "Record Payment", icon: "💳" },
  { path: "/receipts", label: "Record Receipt", icon: "💰" },
  { path: "/journal-entries", label: "Journal Entries", icon: "📓" },
  { path: "/job-orders", label: "Job Orders", icon: "🏗️" },
  { path: "/equipment", label: "Equipment", icon: "🚜" },
  { path: "/reports", label: "Financial Reports", icon: "📈" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🏗️</span>
        <span className="logo-text">ConstructLedger</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
