import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  BarChart3,
  Settings,
  ScanBarcode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/products", icon: Package, label: "Produits" },
  { to: "/alerts", icon: AlertTriangle, label: "Alertes Stock" },
  { to: "/analytics", icon: BarChart3, label: "Analytiques" },
  { to: "/settings", icon: Settings, label: "Paramètres" },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-border flex flex-col z-30 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="h-[72px] flex items-center px-5 border-b border-border-light shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-franprix-red rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg font-heading">F</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-[17px] font-bold text-text-primary font-heading leading-tight">
                Franprix
              </h1>
              <p className="text-[11px] text-text-muted font-medium tracking-wide uppercase">
                Gestion de Stock
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-franprix-red-light text-franprix-red font-semibold"
                  : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                size={20}
                className={`shrink-0 transition-colors duration-200 ${
                  isActive ? "text-franprix-red" : "text-text-muted group-hover:text-text-primary"
                }`}
              />
              {!collapsed && (
                <span className="text-sm whitespace-nowrap">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-franprix-red animate-pulse-dot" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Scan Barcode Button */}
      <div className="p-3 border-t border-border-light">
        <button
          className={`w-full flex items-center justify-center gap-2 bg-franprix-red hover:bg-franprix-red-dark text-white font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] ${
            collapsed ? "p-3" : "px-4 py-3"
          }`}
          title="Scanner un code-barres"
        >
          <ScanBarcode size={20} />
          {!collapsed && <span className="text-sm">Scanner Code-barres</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-[88px] w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 z-40"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
