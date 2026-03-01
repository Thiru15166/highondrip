import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/FadeInSection";
import MiniCart from "@/components/MiniCart";
import ProductSizeSheet from "@/components/ProductSizeSheet";

interface CardItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sizeSheetOpen, setSizeSheetOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<CardItem | null>(null);

  // ✅ Load Cart safely
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setCartItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  // ✅ Fetch Products safely
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const temp: CardItem[] = [];

        snapshot.forEach((doc) => {
          const data: any = doc.data();

          // 🔥 Safe sizes handling
          let safeSizes: string[] = [];

          if (Array.isArray(data.sizes)) {
            safeSizes = data.sizes;
          } else if (typeof data.sizes === "object" && data.sizes !== null) {
            safeSizes = Object.keys(data.sizes);
          } else if (typeof data.sizes === "string") {
            safeSizes = data.sizes.split(",").map((s: string) => s.trim());
          }

          const safeImages = Array.isArray(data.images) ? data.images : [];

          safeImages.forEach((img: string, index: number) => {
            temp.push({
              productId: doc.id + "-" + index,
              name: data.name || "",
              price: Number(data.price) || 0,
              image: img,
              sizes: safeSizes,
              sleeveType: data.sleeveType || "",
              description: data.description || "",
            });
          });
        });

        setCards(temp);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenSizeSheet = (card: CardItem) => {
    setActiveProduct(card);
    setSizeSheetOpen(true);
  };

  const handleAddFromSheet = (productId: string, size: string) => {
    const card = cards.find((c) => c.productId === productId);
    if (!card) return;

    const existingIndex = cartItems.findIndex(
      (item) => item.productId === productId && item.selectedSize === size
    );

    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        productId,
        name: card.name,
        price: card.price,
        image: card.image,
        selectedSize: size,
        quantity: 1,
      });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTimeout(() => setMiniCartOpen(true), 500);
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <FadeInSection key={card.productId}>
            <div className="group">

              <div
                className="relative overflow-hidden aspect-[3/4] bg-secondary cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <h2 className="text-sm uppercase font-medium">
                    {card.name}
                  </h2>
                  <p className="font-serif text-sm">
                    ₹{card.price}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenSizeSheet(card)}
                  className="w-full py-3 bg-foreground text-background uppercase text-xs"
                >
                  Secure the Drip
                </button>
              </div>

            </div>
          </FadeInSection>
        ))}
      </div>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && cards[lightboxIndex] && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <img
            src={cards[lightboxIndex].image}
            alt={cards[lightboxIndex].name}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      {/* Size Sheet */}
      <ProductSizeSheet
        open={sizeSheetOpen}
        onOpenChange={setSizeSheetOpen}
        product={activeProduct}
        onAddToCart={handleAddFromSheet}
      />

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
