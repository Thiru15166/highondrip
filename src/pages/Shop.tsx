import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: { [key: string]: number };
  images: string[];
  sleeveType?: string;
  description?: string;
}

interface CardItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  sizes: { [key: string]: number };
  sleeveType?: string;
  description?: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

export default function Shop() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const tempCards: CardItem[] = [];

      snap.forEach((doc) => {
        const data = doc.data() as Product;

        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img, index) => {
            tempCards.push({
              productId: doc.id + "-" + index,
              name: data.name,
              price: data.price,
              image: img,
              sizes: data.sizes,
              sleeveType: data.sleeveType,
              description: data.description,
            });
          });
        }
      });

      setCards(tempCards);
    };

    fetchProducts();
  }, []);

  const handleSizeChange = (id: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAddToCart = (card: CardItem) => {
    const selectedSize = selectedSizes[card.productId];
    if (!selectedSize) return;

    const existing = [...cartItems];
    const index = existing.findIndex((item) => item.productId === card.productId && item.selectedSize === selectedSize);

    if (index > -1) {
      existing[index].quantity += 1;
    } else {
      existing.push({
        productId: card.productId,
        name: card.name,
        price: card.price,
        image: card.image,
        selectedSize,
        quantity: 1,
      });
    }

    setCartItems(existing);
    localStorage.setItem("cart", JSON.stringify(existing));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {cards.map((card) => (
        <div key={card.productId} className="space-y-3 border p-4">
          {/* Image */}
          <img src={card.image} alt={card.name} className="w-full aspect-[3/4] object-cover" />

          {/* Name + Price */}
          <div className="flex justify-between">
            <h2 className="text-sm font-medium">{card.name}</h2>
            <p className="text-sm">₹{card.price}</p>
          </div>

          {/* Sleeve Type */}
          <p className="text-xs text-gray-500">
            {card.sleeveType?.toLowerCase() === "full" && "Full Sleeve Shirt"}
            {card.sleeveType?.toLowerCase() === "half" && "Half Sleeve Shirt"}
          </p>

          {/* Description */}
          {card.description && <p className="text-xs text-gray-600">{card.description}</p>}

          {/* Size Selection */}
          <div className="flex gap-2 flex-wrap">
            {Object.keys(card.sizes || {}).map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(card.productId, size)}
                className={`border px-3 py-1 text-xs ${
                  selectedSizes[card.productId] === size ? "bg-black text-white" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add To Cart */}
          <button
            onClick={() => handleAddToCart(card)}
            disabled={!selectedSizes[card.productId]}
            className="w-full bg-black text-white text-xs py-2 disabled:bg-gray-400"
          >
            {selectedSizes[card.productId] ? "Add To Cart" : "Select Size"}
          </button>
        </div>
      ))}
    </div>
  );
}
