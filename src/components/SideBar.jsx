import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const primaryLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/income", label: "Income" },
    { to: "/expense", label: "Expense" },
    { to: "/ai", label: "AI Agent" },
  ];

  const bottomLinks = [
    { to: "/settings", label: "Settings" },
  ];

  const linkClasses = ({ isActive }) =>
    `block rounded-md px-3 py-2 text-sm transition-colors ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  // Base style for non-NavLink items (like Logout button)
  const baseLinkClasses =
    "block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors";

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-900 text-white flex flex-col transition-all duration-200`}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b border-gray-800">
        <span
          className={`font-semibold tracking-wide ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Fintrack
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300 hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          {collapsed ? ">>" : "<<"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {primaryLinks.map(item => (
          <NavLink key={item.to} to={item.to} className={linkClasses}>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              {!collapsed && <span>{item.label}</span>}
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-gray-800 space-y-1">
        {bottomLinks.map(item => (
          <NavLink key={item.to} to={item.to} className={linkClasses}>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              {!collapsed && <span>{item.label}</span>}
            </div>
          </NavLink>
        ))}
        {/* Logout as a button (no navigation) */}
        <LogoutButton collapsed={collapsed} className={baseLinkClasses} />
      </div>
    </aside>
  );
}

export default SideBar;
