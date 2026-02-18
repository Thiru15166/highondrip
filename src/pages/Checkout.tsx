import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Load Cart From LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // ✅ Calculate Total
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price), 0);

  // ✅ Remove Item
  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Handle Payment
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://mensmass-backend.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await response.json();

      const options = {
        key: "rzp_test_SHgQ522Epryht2"
        amount: data.amount,
        currency: "INR",
        name: "High On Drip",
        description: "Order Payment",
        order_id: data.orderId,
        handler: function () {
          alert("Payment Successful ✅");
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
        <div
          key={index}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "15px",
          }}
        >
          {/* ✅ Product Image */}
          <img src={item.image} alt={item.name} style={{ width: "80px", height: "100px", objectFit: "cover" }} />

          <div>
            <p>{item.name}</p>
            <p>Size: {item.size}</p>
            <p>₹ {item.price}</p>

            <button
              onClick={() => removeFromCart(index)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ₹ {totalAmount}</h3>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
