import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes?: string[];
};

type Props = {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  if (!product || !Array.isArray(product.images) || product.images.length === 0) {
    return null;
  }

  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
      {/* 🔥 MEDIUM PROFESSIONAL IMAGE (4:5 RATIO) */}
      <div className="bg-gray-100">
        <div className="aspect-[4/5] flex items-center justify-center">
          <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-4">
        {/* NAME */}
        <h2 className="text-lg font-semibold tracking-tight">{product.name}</h2>

        {/* PRICE */}
        <p className="text-gray-700 mt-1 font-medium">₹ {product.price}</p>

        {/* SIZE SECTION */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Select Size</p>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm border rounded-md transition ${
                  selectedSize === size ? "bg-black text-white border-black" : "bg-white text-black hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
