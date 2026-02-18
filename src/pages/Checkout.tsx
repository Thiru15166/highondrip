import { useEffect, useState } from "react";

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

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "High On Drip",
        description: "Order Payment",
        order_id: data.orderId,
        handler: function (response: any) {
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 && <p className="text-gray-500">Your cart is empty</p>}

      {cartItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between border p-4 mb-4 rounded">
          <div className="flex items-center gap-4">
            {/* ✅ Selected Image Show */}
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

            <div>
              <p className="font-semibold">{item.name}</p>
              <p>Size: {item.size}</p>
              <p>Price: ₹ {item.price}</p>

              <button onClick={() => removeFromCart(index)} className="text-red-500 text-sm mt-2">
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Total: ₹ {totalAmount}</h2>

          <button onClick={handlePayment} disabled={loading} className="bg-black text-white px-6 py-2 rounded">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
