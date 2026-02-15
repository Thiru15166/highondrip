import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

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

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Browse Collection
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-border rounded-lg p-4 bg-card"
            >
              <div>
                <p className="font-semibold text-card-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium text-card-foreground">₹{item.price}</p>
                <button
                  onClick={() => removeItem(index)}
                  className="text-sm text-destructive hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
          <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
