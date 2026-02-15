import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { PointsHistoryItem } from "@/data/products";

const PointsHistory = () => {
  const navigate = useNavigate();
  const { userPoints, history } = useCart();

  // Group by month
  const grouped = history.reduce<Record<string, PointsHistoryItem[]>>((acc, item) => {
    if (!acc[item.month]) acc[item.month] = [];
    acc[item.month].push(item);
    return acc;
  }, {});

  const formatPoints = (pts: number) => {
    const abs = Math.abs(pts);
    const formatted = abs.toLocaleString("pt-BR");
    if (pts > 0) return `+ ${formatted}`;
    return `- ${formatted}`;
  };

  return (
    <div className="min-h-screen bg-background max-w-[390px] mx-auto pb-8">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
      </div>

      {/* Points + Help */}
      <div className="px-4 mt-4 mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold text-primary">{userPoints.toLocaleString("pt-BR")} pts.</p>
        <button className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Tem alguma dúvida?</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* History list */}
      <div className="px-4">
        {Object.entries(grouped).map(([month, items]) => (
          <div key={month} className="mb-2">
            <p className="text-sm text-muted-foreground mb-4 mt-4">{month}</p>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-start gap-3">
                  {item.type === "earned" ? (
                    <ArrowUp size={16} className="text-primary mt-1" />
                  ) : (
                    <ArrowDown size={16} className="text-foreground mt-1" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${item.type === "earned" ? "text-primary" : "text-foreground"}`}>
                  {formatPoints(item.points)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsHistory;
