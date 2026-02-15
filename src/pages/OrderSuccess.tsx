import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, MapPin, Clock } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setShowDetails(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background max-w-[390px] mx-auto flex flex-col">
      {/* Top green banner */}
      <div
        className="w-full py-12 flex flex-col items-center gap-3 transition-all duration-500"
        style={{
          backgroundColor: "#2E7D32",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <Check size={28} strokeWidth={3} style={{ color: "#2E7D32" }} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-white">Pedido confirmado!</h1>
        <p className="text-sm text-white/80">Seu pedido foi realizado com sucesso</p>
      </div>

      {/* Order details */}
      <div
        className="px-4 pt-6 flex-1 transition-all duration-500 delay-200"
        style={{
          opacity: showDetails ? 1 : 0,
          transform: showDetails ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Pickup info */}
        <div className="border border-border rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">Ⓜ</span>
            <p className="text-sm font-bold text-foreground">Retirar em</p>
          </div>
          <div className="flex items-start gap-2.5 mb-2">
            <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">PARQUE DOM PEDRO - PDP</p>
              <p className="text-xs text-muted-foreground mt-0.5">Av. Projetada Leste, 500 - lj. 32/33/34</p>
              <p className="text-xs text-muted-foreground">Santa Genebra · Campinas</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <Clock size={14} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Previsão de preparo: <span className="font-bold text-foreground">5-10 min</span></p>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-6">
          <p className="text-sm font-bold text-foreground mb-3">Próximos passos</p>
          <div className="space-y-3">
            <Step number={1} text="Vá até o restaurante selecionado" />
            <Step number={2} text="Retire seu pedido e aproveite!" />
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <div className="mt-auto">
        <button
          onClick={() => navigate("/")}
          className="w-full h-14 bg-secondary text-foreground font-bold text-base"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

const Step = ({ number, text }: { number: number; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-bold text-foreground">{number}</span>
    </div>
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

export default OrderSuccess;
