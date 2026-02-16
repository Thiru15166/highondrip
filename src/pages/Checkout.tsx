import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase";
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

  // Load cart from localStorage
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
    setError("");

    if (!name || !phone || !address) {
      setError("Please fill all fields");
      return;
    }

    if (!auth.currentUser) {
      setError("Please login to place order");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid, // 🔥 Required for rules
        customerName: name,
        phone,
        address,
        items: cartItems,
        total,
        createdAt: serverTimestamp(),
      });

      localStorage.removeItem("cart");

      alert("Order placed successfully!");

      navigate("/");
    } catch (err) {
      console.error("ORDER ERROR:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <div className="mb-6 border p-4">
          <h2 className="font-medium mb-2">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} - {item.size}
              </span>
              <span>₹{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-3 mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Full Address"
          className="w-full border p-3 mb-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-black text-white py-3 hover:opacity-90 transition"
        >
          {submitting ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </Layout>
  );
};

export default Checkout;
