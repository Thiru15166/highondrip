import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Check, X, ChevronLeft, ChevronRight, Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

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
        {/* Grid Toggle */}
        <div className="flex justify-end items-center gap-1 mb-8">
          {([2, 3, 4] as const).map((cols) => (
            <button
              key={cols}
              onClick={() => setGridCols(cols)}
              className={`p-2 transition-colors duration-300 ${
                gridCols === cols
                  ? "text-foreground"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
              }`}
              aria-label={`${cols}-column view`}
            >
              {cols === 2 ? <Grid2X2 className="w-4 h-4" /> : cols === 3 ? <Grid3X3 className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 gap-x-6 gap-y-16 transition-all duration-500 ease-out ${
          gridCols === 2 ? "md:grid-cols-2" : gridCols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
        }`}>
          {cards.map((card, index) => {
            const sizeSelected = !!selectedSizes[card.productId];
            const justAdded = addedIds.has(card.productId);

            return (
              <FadeInSection key={card.productId}>
                <div className="group">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden aspect-[3/4] bg-secondary mb-4 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.06]"
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
