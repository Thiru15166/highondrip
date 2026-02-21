import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import MiniCart from "@/components/MiniCart";
import { Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: { [key: string]: number };
  images: string[];
  description?: string;
  sleeveType?: string;
}

interface CardItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  sizes: { [key: string]: number };
  description?: string;
  sleeveType?: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  sleeveType?: string;
  selectedSize: string;
  quantity: number;
}

const Shop = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Load cart from localStorage
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
              description: data.description,
              sleeveType: data.sleeveType,
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

    const existingCart = [...cartItems];
    const existingIndex = existingCart.findIndex(
      (item) => item.productId === card.productId && item.selectedSize === selectedSize,
    );

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        productId: card.productId,
        name: card.name,
        price: card.price,
        image: card.image,
        description: card.description,
        sleeveType: card.sleeveType,
        selectedSize,
        quantity: 1,
      });
    }

    setCartItems(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setAddedId(card.productId);
    setTimeout(() => setAddedId(null), 1200);

    setCartOpen(true);
  };

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {cards.map((card) => {
          const sizeSelected = !!selectedSizes[card.productId];
          const justAdded = addedId === card.productId;

          return (
            <div key={card.productId} className="group">
              {/* Image */}
              <div className="relative overflow-hidden bg-secondary mb-4">
                <img src={card.image} alt={card.name} className="w-full aspect-[3/4] object-cover" />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-sm font-medium tracking-wide">{card.name}</h2>
                  <p className="text-sm text-muted-foreground">₹{card.price}</p>
                </div>

                {/* Sleeve Type */}
                {card.sleeveType && (
                  <p className="text-xs text-gray-500">
                    {card.sleeveType === "half" ? "Half Hand Shirt" : "Full Hand Shirt"}
                  </p>
                )}

                {/* Description */}
                {card.description && <p className="text-xs text-gray-600">{card.description}</p>}

                {/* Sizes */}
                <div className="flex gap-2 pt-2">
                  {Object.keys(card.sizes || {}).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(card.productId, size)}
                      className={`min-w-[36px] h-8 px-2 text-[11px] border ${
                        selectedSizes[card.productId] === size ? "bg-black text-white" : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => handleAddToCart(card)}
                  disabled={!sizeSelected}
                  className={`w-full h-10 text-[12px] mt-3 ${
                    sizeSelected ? "bg-black text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {justAdded ? (
                    <span className="flex items-center justify-center gap-1">
                      <Check size={16} /> Added
                    </span>
                  ) : sizeSelected ? (
                    "Secure The Drip"
                  ) : (
                    "Select Size"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <MiniCart open={cartOpen} onOpenChange={setCartOpen} items={cartItems} onUpdateItems={setCartItems} />
    </Layout>
  );
};

export default Shop;
