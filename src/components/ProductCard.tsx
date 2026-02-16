import { useState } from "react";

type Props = {
  product?: any;
  onAddToCart?: (product: any, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  // 🛑 If product is undefined, stop rendering
  if (!product) return null;

  const sizes = Array.isArray(product.sizes) ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleAdd = () => {
    if (!onAddToCart) return;

    onAddToCart(product, selectedSize);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* SAFE IMAGE */}
      {product.image && (
        <img src={product.image} alt={product.name || "Product"} className="w-full h-72 object-cover" />
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name || "No Name"}</h2>

        <p className="text-gray-600 mt-1">₹{product.price || 0}</p>

        {/* Size Dropdown */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="mt-3 w-full border p-2 rounded-lg"
        >
          {sizes.map((size: string) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
