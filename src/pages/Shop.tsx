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

      const allCards: CardItem[] = [];

      snap.docs.forEach((doc) => {
        const data = doc.data() as Product;

        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img: string, index: number) => {
            allCards.push({
              id: doc.id + "_" + index,
              name: data.name,
              price: data.price,
              image: img,
              sizes: data.sizes,
            });
          });
        }
      });

      setCards(allCards);
    };

    fetchProducts();
  }, []);

  const handleSizeChange = (cardId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [cardId]: size,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* 3 + 3 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Image */}
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
              <img src={card.image} alt={card.name} className="h-full object-contain" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>

              <p className="text-gray-700 mb-3">₹{card.price}</p>

              {/* Size Select */}
              <select
                value={selectedSizes[card.id] || ""}
                onChange={(e) => handleSizeChange(card.id, e.target.value)}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">Select Size</option>
                {Object.keys(card.sizes || {}).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              {/* Button */}
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
