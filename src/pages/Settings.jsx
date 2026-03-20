import { useState } from "react";
import {
  Store,
  Palette,
  Bell,
  Users,
  Save,
  Trash2,
  Sun,
  Moon,
  User,
  Shield,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
} from "lucide-react";

const staffMembers = [
  { id: 1, name: "Marie Dupont", role: "Responsable Stock", email: "marie.dupont@franprix.fr", status: "active" },
  { id: 2, name: "Jean Martin", role: "Caissier", email: "jean.martin@franprix.fr", status: "active" },
  { id: 3, name: "Sophie Bernard", role: "Rayon Frais", email: "sophie.bernard@franprix.fr", status: "active" },
  { id: 4, name: "Lucas Petit", role: "Réceptionnaire", email: "lucas.petit@franprix.fr", status: "inactive" },
];

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden animate-fade-in">
      <div className="px-6 py-4 border-b border-border-light flex items-center gap-3">
        <div className="w-8 h-8 bg-franprix-red-light rounded-lg flex items-center justify-center">
          <Icon size={16} className="text-franprix-red" />
        </div>
        <h2 className="text-base font-semibold text-text-primary font-heading">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function Settings() {
  const [storeName, setStoreName] = useState("Franprix — République");
  const [storeAddress, setStoreAddress] = useState("12 Place de la République, 75011 Paris");
  const [storePhone, setStorePhone] = useState("01 43 55 67 89");
  const [storeEmail, setStoreEmail] = useState("republique@franprix.fr");
  const [darkMode, setDarkMode] = useState(false);
  const [lowStockThreshold, setLowStockThreshold] = useState(20);
  const [criticalThreshold, setCriticalThreshold] = useState(5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Paramètres
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Configurez votre système de gestion de stock
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Store Profile */}
        <SectionCard icon={Store} title="Profil du Magasin">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Nom du magasin
              </label>
              <div className="relative">
                <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg rounded-lg border border-border-light focus:border-franprix-red/30 focus:ring-2 focus:ring-franprix-red/10 text-sm outline-none transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Adresse
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg rounded-lg border border-border-light focus:border-franprix-red/30 focus:ring-2 focus:ring-franprix-red/10 text-sm outline-none transition-all duration-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="tel"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-bg rounded-lg border border-border-light focus:border-franprix-red/30 focus:ring-2 focus:ring-franprix-red/10 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-bg rounded-lg border border-border-light focus:border-franprix-red/30 focus:ring-2 focus:ring-franprix-red/10 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-franprix-red hover:bg-franprix-red-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.97]">
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </SectionCard>

        {/* Appearance */}
        <div className="space-y-6">
          <SectionCard icon={Palette} title="Apparence">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon size={20} className="text-indigo-400" />
                ) : (
                  <Sun size={20} className="text-yellow-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Mode {darkMode ? "Sombre" : "Clair"}
                  </p>
                  <p className="text-xs text-text-muted">
                    Basculer entre le thème clair et sombre
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
                  darkMode ? "bg-indigo-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${
                    darkMode ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </SectionCard>

          {/* Alert Thresholds */}
          <SectionCard icon={Bell} title="Seuils d'Alertes">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text-primary">
                    Seuil Stock Faible
                  </label>
                  <span className="text-sm font-bold text-warning bg-warning-light px-2 py-0.5 rounded-md">
                    {lowStockThreshold} unités
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-bg rounded-full appearance-none cursor-pointer accent-warning"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                  <span>5</span>
                  <span>100</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text-primary">
                    Seuil Critique
                  </label>
                  <span className="text-sm font-bold text-critical bg-critical-light px-2 py-0.5 rounded-md">
                    {criticalThreshold} unités
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={criticalThreshold}
                  onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-bg rounded-full appearance-none cursor-pointer accent-critical"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                  <span>0</span>
                  <span>50</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Staff Access */}
      <SectionCard icon={Users} title="Accès du Personnel">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Membre
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Rôle
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Email
                </th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border-light last:border-0 hover:bg-bg/40 transition-all duration-150"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-franprix-red to-franprix-red-dark rounded-full flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Shield size={14} className="text-text-muted" />
                      {member.role}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted">{member.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        member.status === "active"
                          ? "bg-success-light text-success"
                          : "bg-bg text-text-muted"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.status === "active" ? "bg-success" : "bg-text-muted"
                        }`}
                      />
                      {member.status === "active" ? "Actif" : "Inactif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-critical/20 overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-critical/10 bg-critical-light/30 flex items-center gap-3">
          <AlertTriangle size={16} className="text-critical" />
          <h2 className="text-base font-semibold text-critical font-heading">
            Zone Dangereuse
          </h2>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">
              Effacer tous les enregistrements
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Cette action est irréversible. Toutes les données seront supprimées.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-critical hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.97]">
            <Trash2 size={16} />
            Effacer Tout
          </button>
        </div>
      </div>
    </div>
  );
}
