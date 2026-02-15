import { useState } from "react";

type Props = {
  product: any;
  onAddToCart: (product: any, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  // ✅ Safe sizes check
  const defaultSizes = ["S", "M", "L", "XL", "2XL"];

  const availableSizes = Array.isArray(product?.sizes) && product.sizes.length > 0 ? product.sizes : defaultSizes;

  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* PRODUCT IMAGE */}
      <img src={product?.image} alt={product?.name} className="w-full aspect-square object-cover" />

      <div className="p-4">
        {/* PRODUCT NAME */}
        <h2 className="text-lg font-semibold">{product?.name}</h2>

        {/* PRICE */}
        <p className="text-gray-600 mt-1">₹{product?.price}</p>

        {/* SIZE DROPDOWN */}
        <div className="mt-3">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            {availableSizes.map((size: string) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
