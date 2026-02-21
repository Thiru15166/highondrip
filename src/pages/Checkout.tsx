import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

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
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Remove item
  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Handle Payment
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
      key: "YOUR_RAZORPAY_PUBLIC_KEY", // 🔥 replace this
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
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* Cart Items */}
      {cartItems.map((item, index) => (
        <div key={index} className="flex items-center gap-4 border p-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
          <div className="flex-1">
            <h2 className="font-semibold">{item.name}</h2>
            <p>₹ {item.price}</p>
            <p>Size: {item.selectedSize}</p>
            <p>Sleeve: {item.sleeveType}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <button onClick={() => removeFromCart(index)} className="text-red-500">
            Remove
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="text-right font-bold text-lg">Total: ₹ {totalAmount}</div>

      {/* Customer Form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Full Address"
          className="w-full border p-3"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      {/* Pay Button */}
      <button onClick={handlePayment} disabled={loading} className="w-full bg-black text-white py-3 mt-4">
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </div>
  );
}
