import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import mapLocation from "@/assets/map-location.jpeg";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { items, totalPoints, confirmOrder } = useCart();

  const handleConfirm = () => {
    confirmOrder();
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-background max-w-[390px] mx-auto flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
      </div>

      <h1 className="text-2xl font-bold text-foreground px-4 mb-4">Payment detail</h1>

      {/* Map placeholder */}
      <div className="w-full h-[160px] relative overflow-hidden">
        <img src={mapLocation} alt="Localização no mapa" className="w-full h-full object-cover" />
      </div>

      {/* Pick up at */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-lg">Ⓜ</span>
          <span className="text-sm font-bold text-foreground">Pick up at</span>
        </div>

        <div className="border border-border rounded-xl p-4 flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">PARQUE DOM PEDRO - PDP</p>
            <div className="flex items-start gap-2 mt-1.5">
              <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Av. Projetada Leste, 500 - lj. 32/33/34</p>
                <p className="text-xs text-muted-foreground">Santa Genebra · Campinas</p>
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground mt-1" />
        </div>
      </div>

      {/* Billing data */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-2">Billing data</h2>
        <p className="text-sm text-muted-foreground mb-3">Do you want to request an invoice?</p>
        <button className="border border-border rounded-lg px-4 py-2 text-sm text-foreground">
          Apply for
        </button>
      </div>

      {/* Summary */}
      <div className="px-4 mt-6 flex-1">
        <h2 className="text-lg font-bold text-foreground mb-3">Summary of your order</h2>
        <div className="bg-muted rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Consumed points</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">Ⓜ</span>
              <span className="text-sm text-foreground">-{totalPoints.toLocaleString("pt-BR")}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-foreground">Subtotal</span>
            <span className="text-sm text-foreground">R$ 0,00</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-2xl font-bold text-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">R$ 0,00</span>
          </div>
        </div>
      </div>

      {/* Redeem button */}
      <div className="mt-auto">
        <button
          onClick={handleConfirm}
          className="w-full h-14 bg-secondary text-foreground font-bold text-base"
        >
          Redeem
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
