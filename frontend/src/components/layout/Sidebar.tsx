import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sections = [
  {
    label: "Overview",
    items: [{ path: "/", label: "Dashboard", shortcut: "01", icon: "📊" }],
  },
  {
    label: "Masters",
    items: [
      { path: "/accounts", label: "Chart of Accounts", shortcut: "02", icon: "📒" },
      { path: "/bank", label: "Bank & Cash", shortcut: "03", icon: "🏦" },
      { path: "/vendors", label: "Vendors", shortcut: "04", icon: "🏭" },
      { path: "/customers", label: "Customers", shortcut: "05", icon: "👥" },
    ],
  },
  {
    label: "Transactions",
    items: [
      { path: "/vendor-invoices", label: "Bills / Payables", shortcut: "06", icon: "📤" },
      { path: "/customer-invoices", label: "Invoices / Receivables", shortcut: "07", icon: "📥" },
      { path: "/payments", label: "Payments", shortcut: "08", icon: "💳" },
      { path: "/receipts", label: "Receipts", shortcut: "09", icon: "🧾" },
    ],
  },
  {
    label: "Accounting",
    items: [{ path: "/journal-entries", label: "Journal Entries", shortcut: "10", icon: "📖" }],
  },
  {
    label: "Coming Soon",
    muted: true,
    items: [
      { path: "/job-orders", label: "Job Orders", shortcut: "11", icon: "🔨" },
      { path: "/equipment", label: "Equipment", shortcut: "12", icon: "🚜" },
      { path: "/reports", label: "Reports", shortcut: "13", icon: "📈" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    navigate("/landing");
  };

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">CL</div>
        {!collapsed && (
          <div>
            <p className="brand-name">ConstructLedger</p>
            <p className="brand-tag">Accounting workspace</p>
          </div>
        )}
      </div>

      <div className="sidebar-panel">
        {sections.map((section) => (
          <div key={section.label} className={`sidebar-section ${section.muted ? "sidebar-section-muted" : ""}`}>
            {!collapsed && <p className="sidebar-panel-label">{section.label}</p>}
            <nav className="sidebar-nav">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${section.muted ? "nav-link-muted" : ""} ${location.pathname === item.path ? "active" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  {collapsed ? (
                    <span className="nav-icon">{item.icon}</span>
                  ) : (
                    <>
                      <span className="nav-shortcut">{item.shortcut}</span>
                      <span className="nav-label">{item.label}</span>
                    </>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-toggle" type="button" onClick={onToggle} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? "→" : "← Collapse"}
        </button>
        <button className="sidebar-logout" type="button" onClick={handleLogout}>
          {collapsed ? "⏻" : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
