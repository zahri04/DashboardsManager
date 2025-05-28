import React from "react";
import { HiMenu } from "react-icons/hi";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function AdminNavbar({ collapsed, toggleCollapse }) {
  return (
    <nav
      className={`
        fixed top-0
        ${collapsed ? "left-0" : "left-64"} right-0
        z-30 bg-white/70 backdrop-blur-sm shadow-sm border-b border-gray-200
        px-6 py-3 flex items-center justify-between transition-all duration-300
      `}
    >
      {/* Left: toggle button + brand */}
      <div className="flex items-center space-x-4">
        {/* Toggle */}
        <button
          onClick={toggleCollapse}
          className="relative z-40 p-2 rounded-md hover:bg-gray-200 transition"
        >
          <HiMenu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Brand */}
        <span className="text-xl font-semibold text-blue-700 tracking-wide">
          Admin Dashboard
        </span>
      </div>

      {/* Right: user menu */}
      <div className="flex items-center">
        <UserDropdown />
      </div>
    </nav>
  );
}
