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
  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  if (!product || !product.images?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={product.images[0]} alt={product.name} className="w-full h-80 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-1">₹ {product.price}</p>

        <div className="flex gap-2 mt-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="mt-4 w-full bg-black text-white py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
