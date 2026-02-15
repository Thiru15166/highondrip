import { useState } from "react";

type Props = {
  product: any;
  onAddToCart: (product: any, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const sizes = ["S", "M", "L", "XL", "2XL"];
  const [selectedSize, setSelectedSize] = useState("S");

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-1">₹{product.price}</p>

        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="mt-3 w-full border p-2 rounded"
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
