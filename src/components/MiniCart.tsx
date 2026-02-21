import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

interface MiniCartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateItems: (items: CartItem[]) => void;
}

const MiniCart = ({ open, onOpenChange, items, onUpdateItems }: MiniCartProps) => {
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQty = (index: number, delta: number) => {
    const updated = [...items];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    onUpdateItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onUpdateItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    onOpenChange(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-serif font-black tracking-[0.1em] uppercase text-base">
            Your Selection
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-12">
              Nothing here yet.
            </p>
          )}

          {items.map((item, index) => (
            <div
              key={item.productId + item.selectedSize}
              className="flex gap-4 animate-fade-in"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover bg-secondary"
              />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <p className="text-sm font-medium leading-tight">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Size: {item.selectedSize}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(index, -1)}
                      className="w-6 h-6 flex items-center justify-center border border-border text-xs hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(index, 1)}
                      className="w-6 h-6 flex items-center justify-center border border-border text-xs hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="self-start mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 px-6 pb-6 pt-4 border-t border-border mt-auto">
            <div className="flex justify-between w-full text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-serif font-black text-lg">₹{total}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full h-12 font-serif font-black tracking-[0.15em] uppercase text-xs bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              Secure Order
            </Button>
            <button
              onClick={() => onOpenChange(false)}
              className="w-full text-center text-xs text-muted-foreground tracking-[0.1em] uppercase hover:text-foreground transition-colors duration-300 py-2"
            >
              Continue Shopping
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MiniCart;
