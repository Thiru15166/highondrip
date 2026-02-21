import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  sleeveType: string;
  quantity: number;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
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

  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_live_SIoNRnxink8XR9",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Mensmass",
      description: "Order Payment",
      handler: async function (response: any) {
        await addDoc(collection(db, "orders"), {
          customerName: form.name,
          phone: form.phone,
          address: form.address,
          items: cartItems,
          totalAmount,
          paymentId: response.razorpay_payment_id,
          createdAt: new Date(),
        });

        alert("Payment Successful & Order Placed");

        localStorage.removeItem("cart");
        setCartItems([]);
        setLoading(false);
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
            Complete Your Purchase
          </p>
          <h1 className="font-serif font-black text-3xl md:text-4xl tracking-[0.2em] uppercase">
            Order
          </h1>
          <div className="w-8 h-[1px] bg-foreground/20 mx-auto mt-6" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-32">
          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-sm tracking-[0.15em] uppercase mb-8">
                No items to process
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left — Shipping Details */}
              <div className="lg:col-span-2 space-y-12">
                {/* Shipping Form */}
                <div>
                  <h2 className="font-serif text-xs tracking-[0.3em] uppercase mb-10">
                    Shipping Details
                  </h2>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b border-border/60 pb-3 text-sm font-serif tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-border/60 pb-3 text-sm font-serif tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        Shipping Address
                      </label>
                      <textarea
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        rows={3}
                        className="w-full bg-transparent border-b border-border/60 pb-3 text-sm font-serif tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h2 className="font-serif text-xs tracking-[0.3em] uppercase mb-10">
                    Items
                  </h2>

                  <div className="space-y-0">
                    {cartItems.map((item, index) => (
                      <div key={index}>
                        <div className="flex gap-6 md:gap-10 py-8">
                          {/* Image */}
                          <div className="w-24 h-32 md:w-28 md:h-36 flex-shrink-0 overflow-hidden bg-secondary">
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
                              <div className="flex gap-4 mt-2">
                                <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                                  Size — {item.selectedSize}
                                </p>
                                {item.sleeveType && (
                                  <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                                    Sleeve — {item.sleeveType}
                                  </p>
                                )}
                              </div>
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
                              onClick={() => removeFromCart(index)}
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
                </div>
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
                        Free
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
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 bg-foreground text-background font-serif text-xs tracking-[0.25em] uppercase hover:bg-foreground/90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Secure Order"}
                  </button>

                  <p className="text-center mt-5 text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60">
                    Secure payment · Fast processing
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
