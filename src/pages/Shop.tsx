import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface Product {
  name: string;
  price: number;
  sizes: { [key: string]: number };
  images: string[];
  sleeveType: string;
  description: string;
}

interface CardItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  sizes: { [key: string]: number };
  sleeveType: string;
  description: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

export default function Shop() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const temp: CardItem[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as Product;

        if (Array.isArray(data.images)) {
          data.images.forEach((img, index) => {
            temp.push({
              productId: doc.id + "-" + index,
              name: data.name,
              price: data.price,
              image: img,
              sizes: data.sizes,
              sleeveType: data.sleeveType,
              description: data.description,
            });
          });
        }
      });

      setCards(temp);
    };

    fetchProducts();
  }, []);

  const handleSizeSelect = (id: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
  };

  const handleAddToCart = (card: CardItem) => {
    const selectedSize = selectedSizes[card.productId];

    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const existingIndex = cartItems.findIndex(
      (item) => item.productId === card.productId && item.selectedSize === selectedSize,
    );

    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        productId: card.productId,
        name: card.name,
        price: card.price,
        image: card.image,
        selectedSize,
        quantity: 1,
      });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Added to Cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8">
      {cards.map((card) => (
        <div key={card.productId} className="space-y-3">
          {/* Product Image */}
          <img src={card.image} alt={card.name} className="w-full aspect-[3/4] object-cover" />

          {/* Name & Price */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium">{card.name}</h2>
            <p className="text-sm">₹{card.price}</p>
          </div>

          {/* Sleeve Type */}
          <p className="text-xs text-gray-500">
            {card.sleeveType === "full" && "Full Sleeve Shirt"}
            {card.sleeveType === "half" && "Half Sleeve Shirt"}
          </p>

          {/* Description */}
          <p className="text-xs text-gray-600">{card.description}</p>

          {/* Size Selection */}
          <div className="flex gap-2 flex-wrap">
            {Object.keys(card.sizes || {}).map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(card.productId, size)}
                className={`border px-3 py-1 text-xs ${
                  selectedSizes[card.productId] === size ? "bg-black text-white" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add To Cart */}
          <button onClick={() => handleAddToCart(card)} className="w-full bg-black text-white text-xs py-2">
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
}
