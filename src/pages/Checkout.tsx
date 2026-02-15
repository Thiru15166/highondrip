import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";

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

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = async () => {
    setError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedPhone || !trimmedAddress) {
      setError("Please fill in all fields.");
      return;
    }

    if (trimmedPhone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "orders"), {
        name: trimmedName,
        phone: trimmedPhone,
        address: trimmedAddress,
        items: cartItems,
        totalAmount,
        status: "pending",
        createdAt: new Date(),
      });

      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Order error:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        {/* Order Summary */}
        <div className="border border-border rounded-lg p-6 bg-card mb-8">
          <h2 className="text-lg font-semibold mb-4 text-card-foreground">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-card-foreground">
                  {item.name} — {item.size}
                </span>
                <span className="text-card-foreground">₹{item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full border border-input rounded-lg px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={15}
              className="w-full border border-input rounded-lg px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full border border-input rounded-lg px-4 py-2.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Enter your delivery address"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        )}

        <button
          onClick={handleConfirmOrder}
          disabled={submitting}
          className="mt-8 w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
        >
          {submitting ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </Layout>
  );
};

export default Checkout;
