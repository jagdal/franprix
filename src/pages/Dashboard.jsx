import { useState } from "react";
import {
  Package,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { products } from "../data/mockData";

function StatusBadge({ status }) {
  const config = {
    "in-stock": {
      label: "En Stock",
      bg: "bg-success-light",
      text: "text-success",
      dot: "bg-success",
    },
    "low-stock": {
      label: "Stock Faible",
      bg: "bg-warning-light",
      text: "text-warning",
      dot: "bg-warning",
    },
    "out-of-stock": {
      label: "Rupture",
      bg: "bg-critical-light",
      text: "text-critical",
      dot: "bg-critical",
    },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function SummaryCard({ icon: Icon, title, value, trend, trendUp, color, bgLight }) {
  return (
    <div className="bg-white rounded-xl border border-border-light p-5 hover:shadow-md transition-all duration-300 animate-fade-in group">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 ${bgLight} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} className={color} />
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${trendUp ? "text-success" : "text-critical"}`}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-text-primary font-heading animate-count-up">
          {value}
        </p>
        <p className="text-sm text-text-muted mt-0.5">{title}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);

  const totalSKU = products.length;
  const lowStock = products.filter((p) => p.status === "low-stock").length;
  const outOfStock = products.filter((p) => p.status === "out-of-stock").length;
  const inStock = products.filter((p) => p.status === "in-stock").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Tableau de Bord
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Vue d'ensemble de votre inventaire — Mis à jour le 20 mars 2026
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          icon={Package}
          title="Total Références"
          value={totalSKU}
          trend="+3.2%"
          trendUp={true}
          color="text-blue-500"
          bgLight="bg-blue-50"
        />
        <SummaryCard
          icon={TrendingUp}
          title="En Stock"
          value={inStock}
          trend="+5.1%"
          trendUp={true}
          color="text-success"
          bgLight="bg-success-light"
        />
        <SummaryCard
          icon={AlertTriangle}
          title="Stock Faible"
          value={lowStock}
          trend="-2.4%"
          trendUp={false}
          color="text-warning"
          bgLight="bg-warning-light"
        />
        <SummaryCard
          icon={XCircle}
          title="Rupture de Stock"
          value={outOfStock}
          trend="+1.2%"
          trendUp={false}
          color="text-critical"
          bgLight="bg-critical-light"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary font-heading">
              Inventaire en Temps Réel
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              {totalSKU} produits au total
            </p>
          </div>
          <button className="text-sm text-franprix-red font-medium hover:underline transition-colors">
            Voir tout →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Produit
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Quantité
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b border-border-light last:border-0 transition-all duration-150 cursor-pointer ${
                    hoveredRow === product.id ? "bg-bg/70" : "hover:bg-bg/40"
                  }`}
                  onMouseEnter={() => setHoveredRow(product.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bg rounded-lg flex items-center justify-center text-xl shrink-0">
                        {product.image}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {product.name}
                        </p>
                        <p className="text-xs text-text-muted">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm text-text-secondary">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <span
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? "text-critical"
                          : product.stock < product.minStock
                          ? "text-warning"
                          : "text-text-primary"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="p-1.5 rounded-md hover:bg-bg transition-colors"
                        title="Voir"
                      >
                        <Eye size={16} className="text-text-muted" />
                      </button>
                      <button
                        className="p-1.5 rounded-md hover:bg-bg transition-colors"
                        title="Modifier"
                      >
                        <Edit size={16} className="text-text-muted" />
                      </button>
                      <button
                        className="p-1.5 rounded-md hover:bg-critical-light transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} className="text-text-muted hover:text-critical" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
