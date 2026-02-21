import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const removeItem = (index: number) => {
    setRemovingIndex(index);
    setTimeout(() => {
      const updated = cartItems.filter((_, i) => i !== index);
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      setRemovingIndex(null);
    }, 400);
  };

  const increaseQty = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="relative min-h-[80vh]">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif font-black text-[12vw] tracking-[0.3em] text-foreground/[0.02] whitespace-nowrap rotate-[-90deg]">
            HIGH ON DRIP
          </span>
        </div>

        {/* Header */}
        <div className="text-center pt-32 pb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Review Your Selection
          </p>
          <h1 className="font-serif font-black text-3xl md:text-4xl tracking-[0.2em] uppercase">
            Your Cart
          </h1>
          <div className="w-8 h-[1px] bg-foreground/20 mx-auto mt-6" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-32">
          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-sm tracking-[0.15em] uppercase mb-8">
                Your cart is empty
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="font-serif text-xs tracking-[0.25em] uppercase border border-foreground/20 px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left — Cart Items */}
              <div className="lg:col-span-2 space-y-0">
                <div className="flex justify-between items-baseline mb-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                  </p>
                </div>

                {cartItems.map((item, index) => (
                  <div key={index}>
                    <div
                      className={`flex gap-6 md:gap-10 py-8 transition-all duration-400 ${
                        removingIndex === index
                          ? "opacity-0 translate-x-4"
                          : "opacity-100 translate-x-0"
                      }`}
                    >
                      {/* Image */}
                      <div className="w-28 h-36 md:w-36 md:h-44 flex-shrink-0 overflow-hidden bg-secondary">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-serif text-sm md:text-base tracking-[0.1em] uppercase leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[11px] tracking-[0.15em] text-muted-foreground mt-2 uppercase">
                            Size — {item.size}
                          </p>
                        </div>

                        <div className="flex items-end justify-between mt-6">
                          {/* Quantity */}
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => decreaseQty(index)}
                              className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-300"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-5 text-center font-serif tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQty(index)}
                              className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-300"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-serif text-base md:text-lg tracking-wide">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(index)}
                          className="self-start mt-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          Remove item
                        </button>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator className="bg-border/60" />}
                  </div>
                ))}
              </div>

              {/* Right — Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 border border-border/60 p-8 md:p-10">
                  <h2 className="font-serif text-xs tracking-[0.3em] uppercase mb-10">
                    Order Summary
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground tracking-[0.1em]">Subtotal</span>
                      <span className="font-serif">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground tracking-[0.1em]">Shipping</span>
                      <span className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                        Calculated at order
                      </span>
                    </div>
                  </div>

                  <Separator className="my-8 bg-border/60" />

                  <div className="flex justify-between items-baseline mb-10">
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      Total
                    </span>
                    <span className="font-serif font-black text-2xl tracking-wide">
                      ₹{totalAmount}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-4 bg-foreground text-background font-serif text-xs tracking-[0.25em] uppercase hover:bg-foreground/90 transition-all duration-500"
                  >
                    Secure Order
                  </button>

                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full text-center mt-4 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 py-3"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
