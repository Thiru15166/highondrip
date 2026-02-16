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
  image: string;
  onAddToCart: (product: Product, size: string) => void;
};

const ProductCard = ({ product, image, onAddToCart }: Props) => {
  // Default Sizes
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 p-4">
      {/* Product Image */}
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
        <img src={image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h2 className="text-lg font-medium tracking-wide">{product.name}</h2>

        <p className="text-gray-600 mt-1 mb-3">₹ {product.price}</p>

        {/* Size Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-sm border rounded-md transition ${
                selectedSize === size ? "bg-black text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add To Cart */}
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
