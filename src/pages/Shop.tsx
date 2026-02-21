import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/FadeInSection";
import MiniCart from "@/components/MiniCart";

interface Product {
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
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const temp: CardItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Product;
        if (Array.isArray(data.images)) {
          data.images.forEach((img, index) => {
            temp.push({
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
      setCards(temp);
    };
    fetchProducts();
  }, []);

  const handleSizeSelect = (id: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAddToCart = (card: CardItem) => {
    const selectedSize = selectedSizes[card.productId];
    if (!selectedSize) return;

    const existingIndex = cartItems.findIndex(
      (item) => item.productId === card.productId && item.selectedSize === selectedSize
    );

    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        productId: card.productId,
        name: card.name,
        price: card.price,
        image: card.image,
        selectedSize,
        quantity: 1,
      });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Confirmation animation
    setAddedIds((prev) => new Set(prev).add(card.productId));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(card.productId);
        return next;
      });
      setMiniCartOpen(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page title */}
      <div className="pt-32 pb-16 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
          Current Collection
        </p>
        <h1 className="font-serif font-black text-3xl md:text-5xl tracking-[0.1em] uppercase">
          Releases
        </h1>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {cards.map((card) => {
            const sizeSelected = !!selectedSizes[card.productId];
            const justAdded = addedIds.has(card.productId);

            return (
              <FadeInSection key={card.productId}>
                <div className="group">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-secondary mb-4">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-sm font-medium tracking-wide">{card.name}</h2>
                        {card.sleeveType && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 tracking-wider uppercase">
                            {card.sleeveType.trim().toLowerCase() === "full"
                              ? "Full Sleeve"
                              : card.sleeveType.trim().toLowerCase() === "half"
                                ? "Half Sleeve"
                                : ""}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-serif font-black">₹{card.price}</p>
                    </div>

                    {card.description && (
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
                    )}

                    {/* Sizes */}
                    <div className="flex gap-2 flex-wrap">
                      {Object.keys(card.sizes || {}).map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(card.productId, size)}
                          className={`border px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                            selectedSizes[card.productId] === size
                              ? "bg-foreground text-background border-foreground"
                              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
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
                      className={`w-full py-3 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500 flex items-center justify-center gap-2 ${
                        justAdded
                          ? "bg-accent text-accent-foreground"
                          : sizeSelected
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Secured
                        </>
                      ) : (
                        "Secure the Drip"
                      )}
                    </button>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>

      <Footer />

      {/* Mini Cart */}
      <MiniCart
        open={miniCartOpen}
        onOpenChange={setMiniCartOpen}
        items={cartItems}
        onUpdateItems={setCartItems}
      />
    </div>
  );
}
