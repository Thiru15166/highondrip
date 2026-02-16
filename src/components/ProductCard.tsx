import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes?: any;
};

type Props = {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  // Safety check for product & images
  if (!product || !Array.isArray(product.images) || product.images.length === 0) {
    return null;
  }

  // FINAL SAFE SIZE LOGIC (with 2XL)
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Product Image */}
      <img src={product.images[0]} alt={product.name} className="w-full h-80 object-cover" />

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-gray-600 mt-1">₹ {product.price}</p>

        {/* Size Selection */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
