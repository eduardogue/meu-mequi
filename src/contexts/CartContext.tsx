import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { PointsHistoryItem, pointsHistory as defaultHistory } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalPoints: number;
  userPoints: number;
  history: PointsHistoryItem[];
  addItem: (product: Product, quantity: number) => void;
  clearCart: () => void;
  confirmOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getLocalDate(): { date: string; month: string } {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const date = `${day}/${m}/${year}`;

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const month =
    currentMonth === todayMonth && currentYear === todayYear
      ? "Este mês"
      : `${now.toLocaleString("pt-BR", { month: "long" })} ${year}`;

  return { date, month };
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("mcdonalds-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem("mcdonalds-points");
    return saved ? JSON.parse(saved) : 50000;
  });

  const [history, setHistory] = useState<PointsHistoryItem[]>(() => {
    const saved = localStorage.getItem("mcdonalds-history");
    return saved ? JSON.parse(saved) : defaultHistory;
  });

  useEffect(() => {
    localStorage.setItem("mcdonalds-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("mcdonalds-points", JSON.stringify(userPoints));
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem("mcdonalds-history", JSON.stringify(history));
  }, [history]);

  const totalPoints = items.reduce((sum, item) => sum + item.product.points * item.quantity, 0);

  const addItem = (product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const clearCart = () => setItems([]);

  const confirmOrder = () => {
    const { date, month } = getLocalDate();
    const itemNames = items.map((i) => i.product.name).join(", ");
    const newEntry: PointsHistoryItem = {
      id: Date.now(),
      description: `Resgatados · ${itemNames}`,
      date,
      month,
      points: -totalPoints,
      type: "spent",
    };
    setHistory((prev) => [newEntry, ...prev]);
    clearCart();
  };

  return (
    <CartContext.Provider value={{ items, totalPoints, userPoints, history, addItem, clearCart, confirmOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
