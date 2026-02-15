import { useState } from "react";

type Props = {
  product: any;
  onAddToCart: (product: any, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const sizes = Array.isArray(product?.sizes) ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-1">₹{product.price}</p>

        {/* Size Dropdown */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="mt-3 w-full border p-2 rounded-lg"
        >
          {sizes.map((size: string, index: number) => (
            <option key={index} value={size}>
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
    </div>
  );
};

export default ProductCard;
