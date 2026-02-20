import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Remove item
  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Increase quantity
  const increaseQty = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Decrease quantity
  const decreaseQty = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // Total calculation
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Your Cart</h2>

        {cartItems.length === 0 && <p>Cart is empty</p>}

        {cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <img src={item.image} width="100" alt={item.name} />

            <h4>{item.name}</h4>
            <p>Size: {item.size}</p>
            <p>Price: ₹{item.price}</p>

            <div>
              <button onClick={() => decreaseQty(index)}>-</button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button onClick={() => increaseQty(index)}>+</button>
            </div>

            <button onClick={() => removeItem(index)} style={{ marginTop: "10px", background: "red", color: "white" }}>
              Remove
            </button>
          </div>
        ))}

        <h3>Total: ₹{totalAmount}</h3>

        {cartItems.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "10px 20px",
              background: "black",
              color: "white",
            }}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
