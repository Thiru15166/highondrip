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
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");

    if (cartData) {
      const parsed = JSON.parse(cartData);
      setCartItems(parsed);
    }
  }, []);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

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

      if (!data.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_SG1hClbl38B0a4",
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "HIGH ON DRIP",
        description: "Fashion Purchase",
        handler: function () {
          alert("Payment Successful");
          localStorage.removeItem("cart");
          window.location.reload();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Payment failed");
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
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px" }}>
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>
            </div>
          ))}

          <hr />

          <h3>Total: ₹ {totalAmount}</h3>

          <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
