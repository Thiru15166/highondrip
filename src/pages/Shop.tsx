import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: { [key: string]: number }; // object from Firestore
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
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));

      const tempCards: CardItem[] = [];

      snap.docs.forEach((doc) => {
        const data = doc.data() as Product;

        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img: string, index: number) => {
            tempCards.push({
              productId: doc.id,
              name: data.name,
              price: data.price,
              image: img,
              sizes: data.sizes || {},
            });
          });
        }
      });

      setCards(tempCards);
    };

    fetchProducts();
  }, []);

  const handleSizeChange = (key: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [key]: size,
    }));
  };

  const handleAddToCart = (card: CardItem, key: string) => {
    const selectedSize = selectedSizes[key];

    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const cartItem = {
      ...card,
      size: selectedSize,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));

    alert("Added to cart");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => {
          const key = card.productId + "_" + index;

          return (
            <div key={key} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              {/* Image */}
              <img src={card.image} alt={card.name} className="w-full h-72 object-cover rounded-md mb-4" />

              {/* Name */}
              <h2 className="text-lg font-semibold">{card.name}</h2>

              {/* Price */}
              <p className="text-gray-600 mb-3">₹{card.price}</p>

              {/* Size Select */}
              <select
                className="w-full border p-2 mb-3 rounded"
                value={selectedSizes[key] || ""}
                onChange={(e) => handleSizeChange(key, e.target.value)}
              >
                <option value="">Select Size</option>
                {Object.keys(card.sizes || {}).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(card, key)}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                ADD TO CART
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
