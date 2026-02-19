
export interface Product {
  t" | "landscape";
}

export const products: Product[] = [
  {
    init Hoodie",
    price: 185,
    description:
      "A structured knit hoodie in charcoal. Double-layered hood, ribbed cuffs, and a clean kangaroo pocket.",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    image: shadowHoodie,
    edition: 8,
    totalEdition: 30,
    layout: "landscape",
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
    edition: 22,
    totalEdition: 40,
    layout: "portrait",
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
    edition: 3,
    totalEdition: 20,
    layout: "landscape",
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
    edition: 19,
    totalEdition: 50,
    layout: "portrait",
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
    edition: 11,
    totalEdition: 35,
    layout: "landscape",
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
