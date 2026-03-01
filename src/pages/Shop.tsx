import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { X, ChevronLeft, ChevronRight, Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/FadeInSection";
import MiniCart from "@/components/MiniCart";
import ProductSizeSheet from "@/components/ProductSizeSheet";

interface Product {
  name: string;
  price: number;
  sizes: string[];
  images: string[];
  sleeveType?: string;
  description?: string;
}

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
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [sizeSheetOpen, setSizeSheetOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<CardItem | null>(null);

  // Load cart
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Fetch products
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
    setTimeout(() => setMiniCartOpen(true), 800);
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback((dir: 1 | -1) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0 || next >= cards.length) return prev;
      return next;
    });
  }, [cards.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header Section */}
      <div className="pt-28 md:pt-52 pb-14 md:pb-28 text-center px-4">
        <p className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase text-muted-foreground mb-3 md:mb-5">
          Current Drop
        </p>
        <h1 className="font-serif font-black text-3xl md:text-6xl lg:text-7xl tracking-[0.12em] uppercase">
          Releases
        </h1>
        <div className="w-8 h-px bg-foreground/20 mx-auto mt-6 md:mt-10" />
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-16 pb-24 md:pb-40">

        <div className={`grid ${
          gridCols === 2
            ? "grid-cols-2 gap-10"
            : gridCols === 3
            ? "grid-cols-2 lg:grid-cols-3 gap-10"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        }`}>

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

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-[13px] uppercase font-medium">
                      {card.name}
                    </h2>
                    <p className="text-[13px] font-serif">
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
      </div>

      <Footer />

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

      <ProductSizeSheet
        open={sizeSheetOpen}
        onOpenChange={setSizeSheetOpen}
        product={activeProduct}
        onAddToCart={handleAddFromSheet}
      />

      <MiniCart
        open={miniCartOpen}
        onOpenChange={setMiniCartOpen}
        items={cartItems}
        onUpdateItems={setCartItems}
      />
    </div>
  );
}
