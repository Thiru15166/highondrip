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
  if (!product || !Array.isArray(product.images)) return null;

  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">
      {/* 🔥 IMAGE SECTION – PROFESSIONAL RATIO */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {product.images.map((img: string, index: number) => (
          <div key={index} className="aspect-square overflow-hidden rounded-xl">
            <img src={img} alt={`${product.name}-${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* PRODUCT INFO */}
      <div className="px-4 pb-5">
        <h2 className="text-lg font-semibold tracking-tight">{product.name}</h2>

        <p className="text-gray-700 mt-1 font-medium">₹ {product.price}</p>

        {/* SIZE SECTION – PROFESSIONAL STYLE */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Select Size</p>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm border rounded-md transition
                ${
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
