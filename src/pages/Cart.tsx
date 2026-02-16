import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeInSection from "@/components/FadeInSection";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
          <h1 className="text-display-l text-foreground mb-6">Cart is Empty</h1>
          <Link
            to="/shop"
            className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <FadeInSection>
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
          <p className="text-label text-muted-foreground mb-4">Your</p>
          <h1 className="text-display-l text-foreground mb-16">Cart</h1>

          <div className="space-y-0">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-6 border-b border-border"
              >
                <div>
                  <p className="font-display text-lg text-foreground">{item.name}</p>
                  <p className="text-label text-muted-foreground mt-1">Size: {item.size}</p>
                </div>
                <div className="flex items-center gap-8">
                  <p className="text-sm font-sans text-foreground">${item.price}</p>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between">
            <p className="font-display text-2xl text-foreground">
              ${totalAmount}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="px-12 py-4 bg-foreground text-primary-foreground text-label tracking-[0.3em] transition-all duration-500 hover:opacity-90"
            >
              Checkout
            </button>
          </div>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Cart;
