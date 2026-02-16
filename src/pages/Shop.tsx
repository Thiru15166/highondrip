import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: { [key: string]: number };
}

interface CardItem {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
}

const Shop = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  // 🔥 Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));

      const allCards: CardItem[] = [];

      snap.docs.forEach((doc) => {
        const data = doc.data() as Product;

        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img, index) => {
            allCards.push({
              id: doc.id + "_" + index,
              name: data.name,
              price: data.price,
              image: img,
              sizes: Object.keys(data.sizes || {}),
            });
          });
        }
      });

      setCards(allCards);
    };

    fetchProducts();
  }, []);

  // 📏 Size select
  const handleSizeChange = (cardId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [cardId]: size,
    }));
  };

  // 🛒 Add to Cart
  const handleAddToCart = (card: CardItem) => {
    const selectedSize = selectedSizes[card.id];

    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const cartItem = {
      id: card.id,
      name: card.name,
      price: card.price,
      image: card.image,
      size: selectedSize,
    };

    const existing = localStorage.getItem("cart");
    const cart = existing ? JSON.parse(existing) : [];

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-8">Shop</h2>

      {/* 🔲 3 + 3 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            {/* 🖼 Image */}
            <div className="w-full h-72 overflow-hidden rounded-md mb-4">
              <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
            </div>

            {/* 🏷 Name */}
            <h3 className="font-semibold text-lg">{card.name}</h3>

            {/* 💰 Price */}
            <p className="text-gray-600 mb-3">₹{card.price}</p>

            {/* 📏 Size Select */}
            <select
              className="w-full border p-2 mb-3 rounded"
              value={selectedSizes[card.id] || ""}
              onChange={(e) => handleSizeChange(card.id, e.target.value)}
            >
              <option value="">Select Size</option>
              {card.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            {/* 🛒 Button */}
            <button
              onClick={() => handleAddToCart(card)}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
