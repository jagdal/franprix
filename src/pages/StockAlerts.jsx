import {
  AlertTriangle,
  XCircle,
  ShoppingCart,
  Truck,
  RefreshCw,
  TrendingDown,
  Clock,
} from "lucide-react";
import { products } from "../data/mockData";

function HealthRing({ percentage }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  let color = "#2ECC71";
  if (percentage < 50) color = "#E74C3C";
  else if (percentage < 75) color = "#F39C12";

  return (
    <div className="relative w-[140px] h-[140px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#F0F0F0"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-text-primary font-heading">
          {percentage}%
        </span>
        <span className="text-[10px] text-text-muted uppercase tracking-wider font-medium">
          Santé
        </span>
      </div>
    </div>
  );
}

export default function StockAlerts() {
  const outOfStockProducts = products.filter((p) => p.status === "out-of-stock");
  const lowStockProducts = products.filter((p) => p.status === "low-stock");
  const healthPercentage = Math.round(
    (products.filter((p) => p.status === "in-stock").length / products.length) * 100
  );
  const totalAlerts = outOfStockProducts.length + lowStockProducts.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Alertes de Stock
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {totalAlerts} alertes actives nécessitant votre attention
        </p>
      </div>

      {/* Health Overview */}
      <div className="bg-white rounded-xl border border-border-light p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <HealthRing percentage={healthPercentage} />
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-text-primary font-heading">
                Santé de l'Inventaire
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Analyse en temps réel de la disponibilité de vos produits
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-success-light rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-success font-heading">
                  {products.filter((p) => p.status === "in-stock").length}
                </p>
                <p className="text-xs text-success font-medium mt-0.5">En Stock</p>
              </div>
              <div className="bg-warning-light rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-warning font-heading">
                  {lowStockProducts.length}
                </p>
                <p className="text-xs text-warning font-medium mt-0.5">Stock Faible</p>
              </div>
              <div className="bg-critical-light rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-critical font-heading">
                  {outOfStockProducts.length}
                </p>
                <p className="text-xs text-critical font-medium mt-0.5">Rupture</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Out of Stock - Priority Cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <XCircle size={20} className="text-critical" />
          <h2 className="text-lg font-semibold text-text-primary font-heading">
            Rupture de Stock — Action Prioritaire
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outOfStockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border-l-4 border-l-critical border border-border-light p-5 hover:shadow-md transition-all duration-300 animate-fade-in group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-critical-light rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{product.name}</h3>
                  <p className="text-xs text-text-muted mb-1">
                    SKU: {product.sku} · Fournisseur: {product.supplier}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-critical">
                    <Clock size={12} />
                    <span>Dernière MAJ: {product.lastUpdated}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-franprix-red hover:bg-franprix-red-dark text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 active:scale-[0.97]">
                  <ShoppingCart size={16} />
                  Commander
                </button>
                <button className="flex items-center justify-center gap-1.5 bg-bg hover:bg-border-light text-text-secondary text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200">
                  <Truck size={16} />
                  Vérifier Livraison
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Table */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-warning" />
          <h2 className="text-lg font-semibold text-text-primary font-heading">
            Stock Faible — À Surveiller
          </h2>
        </div>
        <div className="bg-white rounded-xl border border-border-light overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light bg-bg/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Stock Actuel
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Seuil Min
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Déficit
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border-light last:border-0 hover:bg-bg/40 transition-all duration-150"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-warning-light rounded-lg flex items-center justify-center text-xl shrink-0">
                          {product.image}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{product.name}</p>
                          <p className="text-xs text-text-muted">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="text-sm font-semibold text-warning">{product.stock}</span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="text-sm text-text-muted">{product.minStock}</span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="text-sm font-semibold text-critical flex items-center justify-center gap-1">
                        <TrendingDown size={14} />
                        -{product.minStock - product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <button className="inline-flex items-center gap-1.5 bg-warning-light hover:bg-warning/20 text-warning text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200">
                        <RefreshCw size={14} />
                        Réapprovisionner
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
