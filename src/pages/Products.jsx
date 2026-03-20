import { useState, useMemo } from "react";
import {
  Plus,
  Filter,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  DollarSign,
  Activity,
} from "lucide-react";
import { products, categories, suppliers } from "../data/mockData";

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

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [selectedSupplier, setSelectedSupplier] = useState("Tous");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "Tous") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedStatus !== "Tous") {
      result = result.filter((p) => p.status === selectedStatus);
    }
    if (selectedSupplier !== "Tous") {
      result = result.filter((p) => p.supplier === selectedSupplier);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "stock") cmp = a.stock - b.stock;
      else if (sortBy === "price") cmp = a.price - b.price;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [selectedCategory, selectedStatus, selectedSupplier, sortBy, sortDir]);

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const healthyPercentage = Math.round(
    (products.filter((p) => p.status === "in-stock").length / products.length) * 100
  );

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">
            Produits
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Gérez votre catalogue de {products.length} produits
          </p>
        </div>
        <button
          id="add-product-btn"
          className="flex items-center gap-2 bg-franprix-red hover:bg-franprix-red-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.97] shadow-sm"
        >
          <Plus size={18} />
          Ajouter un Produit
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white rounded-xl border border-border-light p-4 flex flex-wrap items-center gap-3 animate-fade-in">
        <div className="flex items-center gap-1.5 text-sm text-text-muted">
          <Filter size={16} />
          <span className="font-medium">Filtres:</span>
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-bg border border-border-light rounded-lg px-3 py-2 pr-8 text-sm text-text-primary cursor-pointer hover:border-franprix-red/30 focus:border-franprix-red/50 focus:ring-2 focus:ring-franprix-red/10 outline-none transition-all duration-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "Tous" ? "Catégorie" : cat}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            id="filter-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-bg border border-border-light rounded-lg px-3 py-2 pr-8 text-sm text-text-primary cursor-pointer hover:border-franprix-red/30 focus:border-franprix-red/50 focus:ring-2 focus:ring-franprix-red/10 outline-none transition-all duration-200"
          >
            <option value="Tous">Statut</option>
            <option value="in-stock">En Stock</option>
            <option value="low-stock">Stock Faible</option>
            <option value="out-of-stock">Rupture</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        {/* Supplier Filter */}
        <div className="relative">
          <select
            id="filter-supplier"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="appearance-none bg-bg border border-border-light rounded-lg px-3 py-2 pr-8 text-sm text-text-primary cursor-pointer hover:border-franprix-red/30 focus:border-franprix-red/50 focus:ring-2 focus:ring-franprix-red/10 outline-none transition-all duration-200"
          >
            {suppliers.map((sup) => (
              <option key={sup} value={sup}>
                {sup === "Tous" ? "Fournisseur" : sup}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        {/* Sort buttons */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-text-muted">Trier:</span>
          {["name", "stock", "price"].map((field) => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                sortBy === field
                  ? "bg-franprix-red-light text-franprix-red"
                  : "bg-bg text-text-muted hover:text-text-primary"
              }`}
            >
              {field === "name" ? "Nom" : field === "stock" ? "Stock" : "Prix"}
              <ArrowUpDown size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light bg-bg/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Produit
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Prix
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Stock
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Mis à jour
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border-light last:border-0 hover:bg-bg/40 transition-all duration-150"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bg rounded-lg flex items-center justify-center text-xl shrink-0">
                        {product.image}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{product.name}</p>
                        <p className="text-xs text-text-muted">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-text-secondary">{product.category}</td>
                  <td className="px-6 py-3.5 text-center text-sm font-medium text-text-primary">
                    {product.price.toFixed(2)} €
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
                  <td className="px-6 py-3.5 text-center text-xs text-text-muted">
                    {product.lastUpdated}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-bg transition-colors" title="Voir">
                        <Eye size={16} className="text-text-muted" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-bg transition-colors" title="Modifier">
                        <Edit size={16} className="text-text-muted" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-critical-light transition-colors" title="Supprimer">
                        <Trash2 size={16} className="text-text-muted hover:text-critical" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-text-muted">Aucun produit ne correspond aux filtres sélectionnés.</p>
          </div>
        )}
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Inventory Value */}
        <div className="bg-white rounded-xl border border-border-light p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-franprix-red-light rounded-xl flex items-center justify-center">
              <DollarSign size={20} className="text-franprix-red" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Valeur Totale de l'Inventaire</p>
              <p className="text-2xl font-bold text-franprix-red font-heading">
                {totalValue.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </p>
            </div>
          </div>
        </div>

        {/* Stock Health */}
        <div className="bg-white rounded-xl border border-border-light p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <Activity size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Santé du Stock</p>
              <p className="text-2xl font-bold text-success font-heading">
                {healthyPercentage}%
              </p>
            </div>
          </div>
          <div className="w-full h-3 bg-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${healthyPercentage}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-2">
            {products.filter((p) => p.status === "in-stock").length} produits sur {products.length} en stock
          </p>
        </div>
      </div>
    </div>
  );
}
