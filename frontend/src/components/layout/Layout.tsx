import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="layout-main">
        <TopBar />
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
