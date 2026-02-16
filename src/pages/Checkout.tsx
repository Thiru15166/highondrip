import { useEffect, useState } from "react";
import { auth } from "@/firebase";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    setError("");

    if (!name || !phone || !address) {
      setError("Please fill all details");
      return;
    }

    if (!auth.currentUser) {
      setError("Please login first");
      return;
    }

    if (cartItems.length === 0) {
      setError("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      // Create order in backend
      const response = await fetch("https://mensmass-backend.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
        }),
      });

      const data = await response.json();

      const options = {
        key: "rzp_test_SG1hClbl38B0a4",
        amount: data.amount,
        currency: "INR",
        name: "Mensmass",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response: any) {
          // Save order after success
          await fetch("https://mensmass-backend.onrender.com/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems,
              name,
              phone,
              address,
              userId: auth.currentUser?.uid,
            }),
          });

          alert("Payment Successful ✅");

          localStorage.removeItem("cart");
          window.location.href = "/";
        },
        prefill: {
          name,
          contact: phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Checkout</h2>

      {cartItems.map((item, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          {item.name} ({item.size}) - ₹{item.price}
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          padding: 12,
          background: "black",
          color: "white",
          border: "none",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
