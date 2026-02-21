import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: { [key: string]: number }; // Firestore object
  images: string[];
}

interface CardItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  sizes: { [key: string]: number };
}

const Shop = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  // 🔹 Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const tempCards: CardItem[] = [];

      snap.forEach((doc) => {
        const data = doc.data() as Product;

        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img, index) => {
            tempCards.push({
              productId: doc.id + "_" + index,
              name: data.name,
              price: data.price,
              image: img,
              sizes: data.sizes,
            });
          });
        }
      });

      setCards(tempCards);
    };

    fetchProducts();
  }, []);

  // 🔹 Handle size change
  const handleSizeChange = (id: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
  };

  // 🔹 Add to Cart
  const handleAddToCart = (card: CardItem) => {
    const selectedSize = selectedSizes[card.productId];

    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const cartItem = {
      ...card,
      selectedSize,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Added to cart");
  };

  return (
    <Layout>
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-semibold text-center mb-10">Releases</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.productId} className="border rounded-lg p-4 shadow-sm">
              <img src={card.image} alt={card.name} className="w-full h-80 object-cover rounded" />

              <h2 className="mt-4 text-lg font-medium">{card.name}</h2>

              <p className="text-gray-600 mb-3">₹{card.price}</p>

              {/* Sizes Dropdown */}
              <select
                className="w-full border p-2 mb-3 rounded"
                value={selectedSizes[card.productId] || ""}
                onChange={(e) => handleSizeChange(card.productId, e.target.value)}
              >
                <option value="">Select Size</option>
                {Object.keys(card.sizes || {}).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <button onClick={() => handleAddToCart(card)} className="w-full bg-black text-white py-2 rounded">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
