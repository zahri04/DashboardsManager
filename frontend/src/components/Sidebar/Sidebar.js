import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HiHome,
  HiMenu,
  HiX,
  HiUsers,
  HiViewBoards,
  HiCog,
  HiLogout,
} from "react-icons/hi";

export default function Sidebar({ collapsed, toggleCollapse }) {
  const { user, Logout } = useAuth();
  if (!user?.authorities) return null;

  const handleLogout = () => {
    Logout();
    window.location.href = '/login';
  };

  const isActive = (path) => window.location.pathname === path;

 
if(!collapsed)
  return (
    <aside className="fixed top-0 left-0 z-30 h-screen w-64 bg-white/80 backdrop-blur-lg shadow-xl rounded-r-2xl border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Sofac Sa
        </Link>

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">


          <SidebarItem to="/admin/dashboard" icon={<HiHome />} label="Dashboard" active={isActive('/admin/dashboard')} />
          {user.authorities.includes('PERM_USER_MANAGEMENT') && (
            <SidebarItem to="/admin/users" icon={<HiUsers />} label="Users" active={isActive('/admin/users')} />
          )}
          {(user.authorities.includes('PERM_GROUP_MANAGEMENT') || user.authorities.includes('PERM_DASHBOARD_MANAGEMENT')) && (
            <>
            <SidebarItem to="/admin/groups" icon={<HiUsers />} label="Groups" active={isActive('/admin/groups')} /> 
            <SidebarItem to="/admin/dashboardsList" icon={<HiViewBoards />} label="Dashboards" active={isActive('/admin/dashboardsList')} />
            <SidebarItem to="/admin/dashboardAccess" icon={<HiViewBoards />} label="DashboardAccess" active={isActive('/admin/dashboardAccess')} />
</>
          )}
        

          <li className="text-xs uppercase text-gray-400 font-semibold tracking-widest mb-3">
            My Sections
          </li>
          <SidebarItem to="/admin/dashboardView" icon={<HiCog />} label="dashboardView" active={isActive('/admin/dashboardView')} />
          <SidebarItem to="/admin/profile" icon={<HiCog />} label="Profile" active={isActive('/admin/profile')} />
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <HiLogout className="h-6 w-6 opacity-75" />
          <span className="font-medium tracking-wide">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ to, icon, label, active }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
          active
            ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 pl-3"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </Link>
    </li>
  );
}
