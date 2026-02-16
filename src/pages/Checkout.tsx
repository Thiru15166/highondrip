import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import FadeInSection from "@/components/FadeInSection";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
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

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async () => {
    if (!name || !phone || !address) {
      setError("Please fill all fields");
      return;
    }
    try {
      setSubmitting(true);
      await addDoc(collection(db, "orders"), {
        customerName: name,
        phone,
        address,
        items: cartItems,
        total,
        createdAt: new Date(),
      });
      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <FadeInSection>
        <section className="max-w-2xl mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
          <p className="text-label text-muted-foreground mb-4">Complete Your</p>
          <h1 className="text-display-l text-foreground mb-16">Order</h1>

          {/* Order summary */}
          <div className="mb-16">
            <p className="text-label text-muted-foreground mb-6">Summary</p>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-border">
                <span className="text-body text-foreground">
                  {item.name} — {item.size}
                </span>
                <span className="text-sm font-sans text-foreground">${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between pt-6">
              <span className="font-display text-xl text-foreground">Total</span>
              <span className="font-display text-xl text-foreground">${total}</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="text-label text-muted-foreground mb-2 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 text-body text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
              />
            </div>
            <div>
              <label className="text-label text-muted-foreground mb-2 block">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 text-body text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
              />
            </div>
            <div>
              <label className="text-label text-muted-foreground mb-2 block">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full bg-transparent border-b border-border py-3 text-body text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full mt-8 py-4 bg-foreground text-primary-foreground text-label tracking-[0.3em] transition-all duration-500 hover:opacity-90 disabled:opacity-40"
            >
              {submitting ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Checkout;
