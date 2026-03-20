import { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, User, X } from "lucide-react";
import { notifications } from "../data/mockData";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border h-[72px] flex items-center px-6 gap-4">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          id="search-sku"
          type="text"
          placeholder="Rechercher par SKU, produit ou catégorie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-bg rounded-lg border border-transparent focus:border-franprix-red/30 focus:bg-white focus:ring-2 focus:ring-franprix-red/10 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-lg hover:bg-bg transition-all duration-200"
          >
            <Bell size={20} className="text-text-secondary" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-franprix-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-dot">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-xl shadow-lg border border-border animate-fade-in overflow-hidden">
              <div className="px-4 py-3 border-b border-border-light flex items-center justify-between">
                <h3 className="font-semibold text-sm text-text-primary font-heading">
                  Notifications
                </h3>
                <span className="text-xs text-franprix-red font-medium bg-franprix-red-light px-2 py-0.5 rounded-full">
                  {unreadCount} nouvelles
                </span>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 border-b border-border-light last:border-0 hover:bg-bg/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          notif.type === "critical"
                            ? "bg-critical"
                            : notif.type === "warning"
                            ? "bg-warning"
                            : "bg-blue-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary leading-snug">
                          {notif.message}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border-light">
                <button className="text-xs text-franprix-red font-medium hover:underline w-full text-center">
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          id="header-settings-btn"
          className="p-2.5 rounded-lg hover:bg-bg transition-all duration-200"
        >
          <Settings size={20} className="text-text-secondary" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-border-light mx-1" />

        {/* User Profile */}
        <button
          id="user-profile-btn"
          className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-lg hover:bg-bg transition-all duration-200"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-franprix-red to-franprix-red-dark rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-semibold text-text-primary leading-tight">
              Marie Dupont
            </p>
            <p className="text-[11px] text-text-muted">Responsable Stock</p>
          </div>
        </button>
      </div>
    </header>
  );
}
