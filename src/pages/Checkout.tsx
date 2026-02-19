import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Customer Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Load cart + Razorpay script
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

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price), 0);

  // Remove item
  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle payment
  const handlePayment = async () => {
    // Validate form
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all customer details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // Backend order create
      const response = await fetch("https://mensmass-backend.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: "rzp_test_SHgQ522Epryht2", // உங்கள் real test key வைங்க
        amount: data.amount,
        currency: "INR",
        name: "High On Drip",
        description: "Order Payment",
        order_id: data.orderId,

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        handler: async function () {
          // ✅ Save to Firebase
          await addDoc(collection(db, "orders"), {
            name: form.name,
            phone: form.phone,
            address: form.address,
            total: totalAmount,
            items: cartItems,
            createdAt: new Date(),
          });

          alert("Payment Success ✅");

          localStorage.removeItem("cart");
          setCartItems([]);
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout</h2>

      {cartItems.map((item, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <img src={item.image} width="80" alt="" />
          <p>{item.name}</p>
          <p>₹ {item.price}</p>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      <hr />

      <h3>Customer Details</h3>

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <br />

      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <br />
      <br />

      <textarea
        placeholder="Delivery Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <br />
      <br />

      <h3>Total: ₹ {totalAmount}</h3>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
