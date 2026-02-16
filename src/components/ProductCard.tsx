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
  // Safety check
  if (!product || !Array.isArray(product.images)) return null;

  // Final safe sizes logic (2XL included)
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      {/* 🔥 SHOW ALL PRODUCT IMAGES (NO LIMIT) */}
      <div className="flex flex-col gap-4 mb-5">
        {product.images.map((img: string, index: number) => (
          <img
            key={index}
            src={img}
            alt={`${product.name}-${index}`}
            className="w-full h-auto object-cover rounded-xl"
          />
        ))}
      </div>

      {/* Product Info */}
      <h2 className="text-xl font-semibold">{product.name}</h2>

      <p className="text-gray-600 mt-2">₹ {product.price}</p>

      {/* Sizes */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-1 border rounded-lg ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Add To Cart */}
      <button
        onClick={() => onAddToCart(product, selectedSize)}
        className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
