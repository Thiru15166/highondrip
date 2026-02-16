import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: { [key: string]: number };
}

interface Props {
  product: Product;
  image: string;
}

const ProductCard = ({ product, image }: Props) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image,
      size: selectedSize,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));

    alert("Added to cart");
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <img src={image} alt={product.name} className="w-full h-64 object-cover rounded-md" />

      <h3 className="mt-3 font-semibold uppercase text-sm">{product.name}</h3>

      <p className="text-gray-600 mb-2">₹{product.price}</p>

      <select className="w-full border p-2 mb-3" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
        <option value="">Select Size</option>
        {Object.entries(product.sizes || {}).map(
          ([size, stock]) =>
            stock > 0 && (
              <option key={size} value={size}>
                {size}
              </option>
            ),
        )}
      </select>

      <button onClick={handleAddToCart} className="w-full bg-black text-white py-2">
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
