import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load cart from localStorage (OLD LOGIC SAME)
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

  // ✅ Calculate total (OLD LOGIC SAME)
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price), 0);

  // ✅ PAYMENT FUNCTION (SAFE VERSION)
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://mensmass-backend.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      // 🔥 Important Safety Check
      if (!response.ok) {
        const text = await response.text();
        console.log("Backend Error:", text);
        alert("Backend error - check console");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_SG1hClbl38B0a4", // Your Test Key
        amount: data.order.amount,
        currency: "INR",
        name: "HIGH ON DRIP",
        description: "Premium Fashion Purchase",
        order_id: data.order.id,
        handler: function () {
          alert("Payment Successful 🎉");
          localStorage.removeItem("cart");
          window.location.reload();
        },
        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {/* ✅ Cart Display (OLD STYLE SAME) */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <img src={item.image} alt={item.name} width="80" height="80" style={{ marginRight: "15px" }} />
          <div>
            <h4>{item.name}</h4>
            <p>Size: {item.size}</p>
            <p>₹ {item.price}</p>
          </div>
        </div>
      ))}

      <h3>Total: ₹ {totalAmount}</h3>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
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
