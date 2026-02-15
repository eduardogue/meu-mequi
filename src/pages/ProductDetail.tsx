import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, AlertCircle } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <div className="p-4">Produto não encontrado</div>;

  const handleAdd = () => {
    addItem(product, quantity);
    navigate("/confirm");
  };

  return (
    <div className="min-h-screen bg-background max-w-[390px] mx-auto flex flex-col">
      {/* Top bar */}
      <div className="flex items-center px-4 pt-4 pb-2 relative">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center z-10">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <span className="absolute left-0 right-0 text-center text-sm font-medium text-foreground">{product.name}</span>
      </div>

      {/* Product name + points badge */}
      <div className="px-4 mt-4">
        <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
        <div className="mt-2 inline-flex items-center gap-1.5 bg-secondary text-foreground text-sm font-bold px-3 py-1.5 rounded-full">
          <span className="text-xs">Ⓜ</span>
          {product.points.toLocaleString("pt-BR")}
        </div>
      </div>

      {/* Product image with ring */}
      <div className="flex items-center justify-center py-8 flex-1">
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="95" fill="none" stroke="#f0f0f0" strokeWidth="8" />
            <circle
              cx="110" cy="110" r="95"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 95 * 0.75} ${2 * Math.PI * 95 * 0.25}`}
              style={{ stroke: "url(#detailRingGradient)" }}
            />
            <defs>
              <linearGradient id="detailRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DA291C" />
                <stop offset="50%" stopColor="#FFC72C" />
                <stop offset="100%" stopColor="#FFC72C" />
              </linearGradient>
            </defs>
          </svg>
          <img src={product.image} alt={product.name} className="w-32 h-32 object-contain z-10" />
        </div>
      </div>

      {/* Description */}
      <div className="px-6 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      {/* Quantity selector */}
      <div className="flex items-center justify-center gap-0 mt-6">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-10 h-10 flex items-center justify-center border border-border rounded-l-full"
        >
          <Minus size={16} className="text-muted-foreground" />
        </button>
        <div className="w-12 h-10 flex items-center justify-center border-t border-b border-border">
          <span className="text-lg font-bold text-foreground">{quantity}</span>
        </div>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-10 h-10 flex items-center justify-center border border-border rounded-r-full"
        >
          <Plus size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Notice */}
      <div className="mx-4 mt-6 mb-4 bg-muted rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={20} className="text-foreground flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground leading-relaxed">
          Serviço No estacionamento, Na mesa, Por Drive-Thru não disponível para este produto
        </p>
      </div>

      {/* Add to cart button */}
      <div className="px-4 pb-0 mt-auto">
        <button
          onClick={handleAdd}
          className="w-full h-14 bg-secondary text-foreground font-bold text-base rounded-none"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
