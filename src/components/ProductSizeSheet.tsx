import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check } from "lucide-react";

interface ProductSizeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    productId: string;
    name: string;
    price: number;
    image: string;
    sizes: { [key: string]: number };
    sleeveType?: string;
  } | null;
  onAddToCart: (productId: string, size: string) => void;
}

export default function ProductSizeSheet({ open, onOpenChange, product, onAddToCart }: ProductSizeSheetProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedSize("");
      setConfirmed(false);
    }
    onOpenChange(isOpen);
  };

  const handleAdd = () => {
    if (!product || !selectedSize) return;
    setConfirmed(true);
    onAddToCart(product.productId, selectedSize);
    setTimeout(() => handleOpen(false), 700);
  };

  if (!product) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="bottom" className="rounded-t-2xl px-6 pb-10 pt-6 max-h-[85vh]">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-[11px] tracking-[0.35em] uppercase font-medium text-center">
            Select Size
          </SheetTitle>
        </SheetHeader>

        {/* Product summary */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-24 bg-secondary overflow-hidden flex-shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-[13px] tracking-[0.08em] uppercase font-medium">{product.name}</h3>
            {product.sleeveType && (
              <p className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
                {product.sleeveType.trim().toLowerCase() === "full"
                  ? "Full Sleeve"
                  : product.sleeveType.trim().toLowerCase() === "half"
                    ? "Half Sleeve"
                    : ""}
              </p>
            )}
            <p className="text-[13px] font-serif tracking-wide text-muted-foreground">₹{product.price}</p>
          </div>
        </div>

        {/* Sizes */}
        <div className="grid grid-cols-4 gap-3 mb-10">
          {Object.keys(product.sizes || {}).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border py-3.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                selectedSize === size
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
          onClick={handleAdd}
          disabled={!selectedSize || confirmed}
          className={`w-full py-4 text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-500 flex items-center justify-center gap-2 ${
            confirmed
              ? "bg-accent text-accent-foreground"
              : selectedSize
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {confirmed ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Secured
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </SheetContent>
    </Sheet>
  );
}
