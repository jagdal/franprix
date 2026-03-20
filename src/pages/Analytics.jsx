import {
  TrendingUp,
  DollarSign,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  stockTrends,
  categoryDistribution,
  topSellingProducts,
} from "../data/mockData";

function StatCard({ icon: Icon, label, value, subtext, color, bgLight }) {
  return (
    <div className="bg-white rounded-xl border border-border-light p-5 animate-fade-in hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bgLight} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={20} className={color} />
        </div>
        <div>
          <p className="text-xs text-text-muted">{label}</p>
          <p className="text-xl font-bold text-text-primary font-heading">{value}</p>
          {subtext && <p className="text-[11px] text-text-muted">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-border-light p-3 text-xs">
        <p className="font-semibold text-text-primary mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: entry.color }}
            />
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Analytiques
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Insights et tendances de votre inventaire
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={RotateCcw}
          label="Taux de Rotation"
          value="4.2x"
          subtext="Mensuel"
          color="text-blue-500"
          bgLight="bg-blue-50"
        />
        <StatCard
          icon={DollarSign}
          label="Coût de Réapprovisionnement"
          value="2 450 €"
          subtext="Estimé ce mois"
          color="text-franprix-red"
          bgLight="bg-franprix-red-light"
        />
        <StatCard
          icon={TrendingUp}
          label="Croissance Stock"
          value="+8.3%"
          subtext="vs mois dernier"
          color="text-success"
          bgLight="bg-success-light"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Stock Trends - Bar/Line chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-border-light p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary font-heading">
                Tendances du Stock
              </h2>
              <p className="text-xs text-text-muted mt-0.5">6 derniers mois</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-franprix-red" /> En Stock
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-warning" /> Faible
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-critical" /> Rupture
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockTrends} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#999" }}
                  axisLine={{ stroke: "#F0F0F0" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#999" }}
                  axisLine={{ stroke: "#F0F0F0" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="inStock"
                  name="En Stock"
                  fill="#E30613"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="lowStock"
                  name="Faible"
                  fill="#F39C12"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="outOfStock"
                  name="Rupture"
                  fill="#E74C3C"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution - Donut chart */}
        <div className="bg-white rounded-xl border border-border-light p-6 animate-fade-in">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary font-heading">
              Répartition par Catégorie
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Part de chaque catégorie</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-text-secondary">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl border border-border-light p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-text-primary font-heading">
              Produits les Plus Vendus
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Classement par volume de vente</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <BarChart3 size={14} />
            <span>Ce mois</span>
          </div>
        </div>
        <div className="space-y-3">
          {topSellingProducts.map((product, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="w-7 h-7 bg-bg rounded-lg flex items-center justify-center text-xs font-bold text-text-muted shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {product.name}
                  </p>
                  <span className="text-xs font-semibold text-text-primary ml-2 shrink-0">
                    {product.quantity.toLocaleString()} unités
                  </span>
                </div>
                <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 group-hover:opacity-80"
                    style={{
                      width: `${product.percentage}%`,
                      background: `linear-gradient(90deg, #E30613 0%, ${
                        index < 3 ? "#E30613" : "#F39C12"
                      } 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
