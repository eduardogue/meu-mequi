import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight, Clock, PersonStanding } from "lucide-react";
import { products, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product, onClick }: { product: typeof products[0]; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex-shrink-0 w-[160px] flex flex-col items-start"
  >
    {/* Image container with circular ring */}
    <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-2">
      {/* Circular progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="68" fill="none" stroke="#f0f0f0" strokeWidth="6" />
        <circle
          cx="80" cy="80" r="68"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 68 * 0.75} ${2 * Math.PI * 68 * 0.25}`}
          className="transition-all"
          style={{
            stroke: "url(#ringGradient)",
          }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DA291C" />
            <stop offset="50%" stopColor="#FFC72C" />
            <stop offset="100%" stopColor="#FFC72C" />
          </linearGradient>
        </defs>
      </svg>
      {/* Points badge */}
      <div className="absolute top-2 left-2 bg-secondary text-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
        <span className="text-[10px]">Ⓜ</span>
        {product.points.toLocaleString("pt-BR")} pts
      </div>
      {/* Product emoji */}
      <img src={product.image} alt={product.name} className="w-16 h-16 object-contain z-10" />
    </div>
    {/* Product name */}
    <p className="text-sm text-foreground text-left leading-tight">{product.name}</p>
  </button>
);

const Home = () => {
  const navigate = useNavigate();
  const { userPoints } = useCart();
  const [activeCategory, setActiveCategory] = useState(0);

  const categoryMap: Record<number, string> = { 0: "6000", 1: "18000", 2: "25000", 3: "45000" };

  const filteredProducts = (cat: string) => products.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-background max-w-[390px] mx-auto pb-20">
      {/* Top bar */}
      <div className="mx-4 mt-3 mb-2">
        <div className="flex items-center gap-3 bg-muted rounded-full px-4 py-3">
          <span className="text-lg">Ⓜ</span>
          <span className="text-sm font-medium text-foreground">Retirar em</span>
        </div>
      </div>

      {/* Store info card */}
      <div className="mx-4 bg-muted rounded-xl p-4 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">PARQUE DOM PEDRO - PDP</p>
            <div className="flex items-start gap-2 mt-1.5">
              <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Av. Projetada Leste, 500 - lj. 32/33/34</p>
                <p className="text-xs text-muted-foreground">Santa Genebra · Campinas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <PersonStanding size={14} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground">9.0 km</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
             <Clock size={14} className="text-green-600" />
<p className="text-xs text-green-600 font-medium">Aberto</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground mt-2" />
        </div>
      </div>

      {/* Points + Extrato */}
      <div className="px-4 flex items-center justify-between mb-4">
        <p className="text-3xl font-bold text-primary">{userPoints.toLocaleString("pt-BR")} pts.</p>
        <button onClick={() => navigate("/points")} className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Extrato</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(i)}
            className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === i
                ? "border-foreground text-foreground font-medium"
                : "border-border text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products sections */}
      {Object.entries(categoryMap).map(([idx, cat]) => {
        const prods = filteredProducts(cat);
        if (prods.length === 0) return null;
        return (
          <div key={cat} className="mb-6">
            <h2 className="text-2xl font-bold text-foreground px-4 mb-4">{categories[Number(idx)]}</h2>
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {prods.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border flex justify-around py-2 z-50">
        <NavItem icon="Ⓜ" label="Home" active />
        <NavItem icon="🎟️" label="Cupons" />
        <NavItem icon="Ⓜ" label="MeuM" highlight />
        <NavItem icon="👤" label="Minha conta" />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, highlight }: { icon: string; label: string; active?: boolean; highlight?: boolean }) => (
  <div className={`flex flex-col items-center gap-0.5 px-2 py-1 ${highlight ? "bg-secondary rounded-full px-4" : ""}`}>
    <span className="text-base">{icon}</span>
    <span className={`text-[10px] ${active ? "text-foreground font-bold" : "text-muted-foreground"}`}>{label}</span>
  </div>
);

export default Home;
