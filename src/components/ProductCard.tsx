import { useState } from "react";

type Props = {
  product: any;
  onAddToCart: (product: any, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-lg" />

      <h2 className="text-lg font-semibold mt-3">{product.name}</h2>

      <p className="text-gray-600 mt-1">₹{product.price}</p>

      {/* 🔥 SIZE DROPDOWN */}
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="mt-3 w-full border p-2 rounded"
      >
        {product.sizes?.map((size: string) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <button
        onClick={() => onAddToCart(product, selectedSize)}
        className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
