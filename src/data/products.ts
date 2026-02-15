import molhoBarbecue from "@/assets/products/molho-barbecue.png";
import molhoRanch from "@/assets/products/molho-ranch.png";
import molhoCaipira from "@/assets/products/molho-caipira.png";
import casquinha from "@/assets/products/casquinha.png";
import sundae from "@/assets/products/sundae.png";
import cappuccino from "@/assets/products/cappuccino.png";
import mccolossoChocolate from "@/assets/products/mccolosso-chocolate.png";
import mccolossoCaramelo from "@/assets/products/mccolosso-caramelo.png";
import bigMac from "@/assets/products/big-mac.png";
import mcofertaBigmac from "@/assets/products/mcoferta-bigmac.png";
import mcofertaQuarter from "@/assets/products/mcoferta-quarter.png";
import quarterao from "@/assets/products/quarterao.png";
import mcflurry from "@/assets/products/mcflurry.png";
import bigTasty from "@/assets/products/big-tasty.png";

export interface Product {
  id: number;
  name: string;
  points: number;
  category: string;
  description: string;
  image: string;
}

export const products: Product[] = [
  { id: 1, name: "Molho Barbecue", points: 4000, category: "6000", description: "Escolha seu molho favorito para se deliciar com os chicken McNuggets, ou se preferir, com as deliciosas e crocantes McFritas", image: molhoBarbecue },
  { id: 2, name: "Molho Ranch", points: 4000, category: "6000", description: "Molho cremoso Ranch perfeito para acompanhar seus McNuggets ou McFritas", image: molhoRanch },
  { id: 3, name: "Molho Caipira", points: 4000, category: "6000", description: "Molho Caipira com sabor especial para seus acompanhamentos favoritos", image: molhoCaipira },
  { id: 4, name: "McColosso Super Chocolate", points: 3000, category: "6000", description: "A clássica casquinha McDonald's com chocolate cremoso e delicioso", image: casquinha },
  { id: 5, name: "Sundae", points: 5000, category: "6000", description: "Sundae cremoso com calda à sua escolha", image: sundae },
  { id: 6, name: "Cappuccino 200ml", points: 12000, category: "18000", description: "Cappuccino quentinho de 200ml para aquecer seu dia", image: cappuccino },
  { id: 7, name: "McColosso Calda de Chocolate", points: 13000, category: "18000", description: "McColosso com calda de chocolate irresistível", image: mccolossoChocolate },
  { id: 8, name: "McColosso Caramelo", points: 13000, category: "18000", description: "McColosso com calda de caramelo cremoso", image: mccolossoCaramelo },
  { id: 9, name: "McFlurry Ovomaltime Rocks", points: 14000, category: "18000", description: "McFlurry com pedaços crocantes de Ovomaltime Rocks e calda de chocolate", image: mcflurry },
  { id: 10, name: "Big Mac", points: 15000, category: "25000", description: "O hambúrguer mais famoso do mundo com dois andares", image: bigMac },
  { id: 11, name: "Duplo Cheddar McMelt", points: 18000, category: "25000", description: "Dois hambúrgueres com cheddar derretido e pão escuro com gergelim", image: quarterao },
  { id: 12, name: "McOferta Big Mac", points: 25000, category: "25000", description: "McOferta completa com Big Mac, batata e bebida", image: mcofertaBigmac },
  { id: 13, name: "Brabíssimo Carne", points: 30000, category: "45000", description: "O sanduíche Brabíssimo com carne suculenta, queijo, bacon e molho especial", image: bigTasty },
  { id: 14, name: "McOferta Quarter", points: 40000, category: "45000", description: "McOferta completa com Quarterão, batata e bebida", image: mcofertaQuarter },
];

export const categories = ["Até 6.000 pts", "Até 18.000 pts", "Até 25.000 pts", "Até 45.000 pts"];

export interface PointsHistoryItem {
  id: number;
  description: string;
  date: string;
  month: string;
  points: number;
  type: "earned" | "spent";
}

export const pointsHistory: PointsHistoryItem[] = [
  { id: 1, description: "Acumulados", date: "07/02/2026", month: "Este mês", points: 6000, type: "earned" },
  { id: 2, description: "Resgatados", date: "06/02/2026", month: "Este mês", points: -6000, type: "spent" },
  { id: 3, description: "Acumulados", date: "23/01/2026", month: "janeiro 2026", points: 300, type: "earned" },
  { id: 4, description: "Acumulados", date: "06/01/2026", month: "janeiro 2026", points: 1, type: "earned" },
  { id: 5, description: "Resgatados", date: "06/01/2026", month: "janeiro 2026", points: -2550, type: "spent" },
  { id: 6, description: "Resgatados", date: "06/01/2026", month: "janeiro 2026", points: -17450, type: "spent" },
  { id: 7, description: "Acumulados", date: "14/12/2025", month: "dezembro 2025", points: 1800, type: "earned" },
  { id: 8, description: "Acumulados", date: "12/12/2025", month: "dezembro 2025", points: 5090, type: "earned" },
  { id: 9, description: "Acumulados", date: "25/11/2025", month: "novembro 2025", points: 790, type: "earned" },
  { id: 10, description: "Acumulados", date: "20/11/2025", month: "novembro 2025", points: 790, type: "earned" },
];
