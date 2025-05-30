import React, { useState } from "react";
import Sidebar from "components/Sidebar/Sidebar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import FooterAdmin from "components/Footers/FooterAdmin";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-blueGray-50">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />

      {/* Navbar + Content */}
      <div
        className={`
          flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out
          ${collapsed ? "ml-0" : "ml-64"}
        `}
      >
        {/* Navbar */}
        <AdminNavbar
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
        />

        {/* Spacer so navbar doesn’t cover content */}
        <div className="h-16" />

        {/* Main content */}
        <main className="flex-1 flex flex-col p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>

        <FooterAdmin />
      </div>
    </div>
  );
}
