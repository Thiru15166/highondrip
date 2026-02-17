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

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price), 0);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Call Render Backend
      const response = await fetch("https://mensmass-backend.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_SG1hClbl38B0a4", // TEST KEY ID
        amount: data.order.amount,
        currency: "INR",
        name: "HIGH ON DRIP",
        description: "Premium Fashion Purchase",
        order_id: data.order.id,
        handler: function (response: any) {
          alert("Payment Successful 🎉");
          localStorage.removeItem("cart");
          window.location.reload();
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <img src={item.image} width="80" alt={item.name} />
              <h4>{item.name}</h4>
              <p>Size: {item.size}</p>
              <p>₹ {item.price}</p>
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
        </>
      )}
    </div>
  );
};

export default Checkout;
