import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load Cart From LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // ✅ Calculate Total
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price), 0);

  // ✅ Handle Payment
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Order
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
        setLoading(false);
        return;
      }

      // 2️⃣ Razorpay Options
      const options = {
        key: "rzp_test_YOUR_NEW_KEY", // 🔥 rzp_test_SHUTzTcqIZ2mIv
        amount: data.order.amount,
        currency: "INR",
        name: "Mensmass",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response: any) {
          const verifyRes = await fetch("https://mensmass-backend.onrender.com/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment Successful");

            // Clear cart after success
            localStorage.removeItem("cart");
            setCartItems([]);
          } else {
            alert("Payment Failed");
          }

          setLoading(false);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              {/* Product Image */}
              <img src={item.image} alt={item.name} style={{ width: "80px", marginRight: "15px" }} />

              <div>
                <h4>{item.name}</h4>
                <p>Size: {item.size}</p>
                <p>Price: ₹ {item.price}</p>
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
        </>
      )}
    </div>
  );
};

export default Checkout;
