import obsidianTee from "@/assets/products/obsidian-tee.jpg";
import shadowHoodie from "@/assets/products/shadow-hoodie.jpg";
import cargoPants from "@/assets/products/cargo-pants.jpg";
import bomberJacket from "@/assets/products/bomber-jacket.jpg";
import linenShirt from "@/assets/products/linen-shirt.jpg";
import trackPants from "@/assets/products/track-pants.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizes: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: "obsidian-oversized-tee",
    name: "Obsidian Oversized Tee",
    price: 120,
    description:
      "Cut from heavyweight organic cotton with a relaxed, oversized silhouette. Designed to drape, not cling.",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: obsidianTee,
  },
  {
    id: "shadow-knit-hoodie",
    name: "Shadow Knit Hoodie",
    price: 185,
    description:
      "A structured knit hoodie in charcoal. Double-layered hood, ribbed cuffs, and a clean kangaroo pocket.",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    image: shadowHoodie,
  },
  {
    id: "stone-wash-cargo",
    name: "Stone Wash Cargo",
    price: 165,
    description:
      "Relaxed-fit cargo in washed khaki. Articulated knees, concealed pockets, and a tapered leg.",
    category: "Bottoms",
    sizes: ["28", "30", "32", "34", "36"],
    image: cargoPants,
  },
  {
    id: "midnight-bomber",
    name: "Midnight Bomber",
    price: 290,
    description:
      "A refined bomber jacket in matte black. Ribbed collar and cuffs, muted hardware, satin lining.",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    image: bomberJacket,
  },
  {
    id: "desert-linen-shirt",
    name: "Desert Linen Shirt",
    price: 145,
    description:
      "Washed linen in warm sand. Relaxed collar, mother-of-pearl buttons, and a slightly boxy fit.",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: linenShirt,
  },
  {
    id: "carbon-track-pants",
    name: "Carbon Track Pants",
    price: 155,
    description:
      "Technical jersey track pants with a slim, tapered silhouette. Tonal detailing and zip pockets.",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    image: trackPants,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
