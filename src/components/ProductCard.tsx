import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  sizes?: string[];
};

type Props = {
  product: Product;
  image: string;
  onAddToCart: (product: Product, size: string) => void;
};

const ProductCard = ({ product, image, onAddToCart }: Props) => {
  const sizes = product.sizes?.length ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4">
      {/* IMAGE */}
      <div className="w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        {image ? <img src={image} alt={product.name} className="w-full h-full object-cover" /> : <span>No Image</span>}
      </div>

      {/* INFO */}
      <div className="mt-4">
        <h2 className="text-lg font-medium">{product.name}</h2>
        <p className="text-gray-600 mb-3">₹ {product.price}</p>

        {/* SIZE */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-sm border rounded ${
                selectedSize === size ? "bg-black text-white" : "bg-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
