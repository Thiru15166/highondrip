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
}

interface CardItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  sizes: { [key: string]: number };
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

const Shop = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const tempCards: CardItem[] = [];

      snap.forEach((doc) => {
        const data = doc.data() as Product;

        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img, index) => {
            tempCards.push({
              productId: doc.id + "_" + index,
              name: data.name,
              price: data.price,
              image: img,
              sizes: data.sizes,
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

    const existingCart: CartItem[] = [...cartItems];
    const existingIndex = existingCart.findIndex(
      (item) => item.productId === card.productId && item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        productId: card.productId,
        name: card.name,
        price: card.price,
        image: card.image,
        selectedSize,
        quantity: 1,
      });
    }

    setCartItems(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show confirmation tick
    setAddedId(card.productId);
    setTimeout(() => setAddedId(null), 1200);

    // Open mini cart
    setCartOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen px-6 lg:px-10 py-12">
        <h1 className="font-serif font-black text-3xl lg:text-4xl text-center tracking-[0.1em] uppercase mb-12">
          Releases
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
          {cards.map((card) => {
            const sizeSelected = !!selectedSizes[card.productId];
            const justAdded = addedId === card.productId;

            return (
              <div key={card.productId} className="group">
                {/* Image */}
                <div className="relative overflow-hidden bg-secondary mb-4">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-sm font-medium tracking-wide">{card.name}</h2>
                    <p className="text-sm text-muted-foreground">₹{card.price}</p>
                  </div>

                  {/* Size Selection */}
                  <div className="flex gap-2">
                    {Object.keys(card.sizes || {}).map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(card.productId, size)}
                        className={`min-w-[36px] h-8 px-2 text-[11px] tracking-wider uppercase border transition-all duration-300 ${
                          selectedSizes[card.productId] === size
                            ? "bg-foreground text-background border-foreground"
                            : "border-border hover:border-foreground/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleAddToCart(card)}
                    disabled={!sizeSelected}
                    className={`w-full h-11 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      justAdded
                        ? "bg-accent text-accent-foreground"
                        : sizeSelected
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : sizeSelected ? (
                      "Secure the Drip"
                    ) : (
                      "Select Size"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MiniCart
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateItems={setCartItems}
      />
    </Layout>
  );
};

export default Shop;
