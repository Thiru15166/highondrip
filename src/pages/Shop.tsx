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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [sizeSheetOpen, setSizeSheetOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<CardItem | null>(null);

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

  // Keyboard navigation
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

      {/* Page Header */}
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
        {/* Grid Toggle */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40 font-medium">
            {cards.length} {cards.length === 1 ? "piece" : "pieces"}
          </p>
          <button
            onClick={() => setGridCols((prev) => (prev === 2 ? 3 : prev === 3 ? 4 : 2))}
            className="relative z-10 min-h-[48px] min-w-[48px] p-3 flex items-center justify-center rounded-sm text-muted-foreground/60 hover:text-foreground active:text-foreground active:scale-105 active:opacity-80 transition-all duration-200 touch-manipulation select-none"
            aria-label={`Switch to ${gridCols === 2 ? 3 : gridCols === 3 ? 4 : 2}-column view`}
          >
            {gridCols === 2 ? <Grid2X2 className="w-[18px] h-[18px] pointer-events-none transition-transform duration-300" /> : gridCols === 3 ? <Grid3X3 className="w-[18px] h-[18px] pointer-events-none transition-transform duration-300" /> : <LayoutGrid className="w-[18px] h-[18px] pointer-events-none transition-transform duration-300" />}
          </button>
        </div>

        <div className={`grid transition-all duration-500 ease-out ${
          gridCols === 2
            ? "grid-cols-2 gap-x-4 md:gap-x-10 gap-y-10 md:gap-y-20"
            : gridCols === 3
              ? "grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 lg:gap-x-10 gap-y-10 md:gap-y-20 lg:gap-y-24"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-8 md:gap-y-18"
        }`}>
          {cards.map((card, index) => {
            return (
              <FadeInSection key={card.productId}>
                <div className="group">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden aspect-[3/4] bg-secondary cursor-pointer active:scale-[0.98] transition-transform duration-300 md:active:scale-100"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h2 className="text-[13px] tracking-[0.08em] uppercase font-medium">{card.name}</h2>
                        {card.sleeveType && (
                          <p className="text-[10px] text-muted-foreground mt-1 tracking-[0.15em] uppercase">
                            {card.sleeveType.trim().toLowerCase() === "full"
                              ? "Full Sleeve"
                              : card.sleeveType.trim().toLowerCase() === "half"
                                ? "Half Sleeve"
                                : ""}
                          </p>
                        )}
                      </div>
                      <p className="text-[13px] font-serif tracking-wide text-muted-foreground">₹{card.price}</p>
                    </div>

                    {card.description && (
                      <p className="text-[11px] text-muted-foreground/70 leading-[1.7] line-clamp-2 tracking-wide">
                        {card.description}
                      </p>
                    )}

                    {/* CTA */}
                    <button
                      onClick={() => handleOpenSizeSheet(card)}
                      className="w-full py-3.5 min-h-[48px] text-[9px] tracking-[0.3em] uppercase font-medium transition-all duration-500 flex items-center justify-center bg-foreground text-background hover:bg-foreground/90"
                    >
                      Secure the Drip
                    </button>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>

      <Footer />

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && cards[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-opacity duration-300 z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-opacity duration-300 z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <img
            key={lightboxIndex}
            src={cards[lightboxIndex].image}
            alt={cards[lightboxIndex].name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain animate-scale-in touch-pinch-zoom"
          />

          {/* Next */}
          {lightboxIndex < cards.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-opacity duration-300 z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Caption */}
          <div className="absolute bottom-8 text-center">
            <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
              {cards[lightboxIndex].name}
            </p>
          </div>
        </div>
      )}

      {/* Size Selection Sheet */}
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
