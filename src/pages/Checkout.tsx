import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 🔥 CALL YOUR RENDER BACKEND
      const response = await fetch("https://mensmass-backend.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }), // change amount dynamically later
      });

      const data = await response.json();
      console.log("Order Response:", data);

      if (!data.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_SG1hClbl38B0a4", // 🔥 your Razorpay key
        amount: data.order.amount,
        currency: "INR",
        name: "HIGH ON DRIP",
        description: "Order Payment",
        order_id: data.order.id,
        handler: function (response: any) {
          alert("Payment Successful ✅");
          console.log("Payment Response:", response);
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Checkout</h2>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "12px 30px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
