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
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>
                {item.name} - {item.size}
              </span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="border-t mt-4 pt-4 font-semibold flex justify-between">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Customer Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Full Address"
            className="w-full border p-3 rounded-lg mb-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            {submitting ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
