import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  sizes?: string[];
};

type Props = {
  products?: Product[];
  onAddToCart: (product: Product, size: string, image: string) => void;
};

const ProductCard = ({ products = [], onAddToCart }: Props) => {
  // Safety check
  if (!Array.isArray(products)) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        if (!Array.isArray(product.images)) return null;

        return product.images.map((img, index) => (
          <SingleImageCard key={`${product.id}-${index}`} product={product} image={img} onAddToCart={onAddToCart} />
        ));
      })}
    </div>
  );
};

type SingleProps = {
  product: Product;
  image: string;
  onAddToCart: (product: Product, size: string, image: string) => void;
};

const SingleImageCard = ({ product, image, onAddToCart }: SingleProps) => {
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border">
      {/* Medium Professional Ratio */}
      <div className="aspect-[4/5] bg-gray-50 flex items-center justify-center p-4">
        <img src={image} alt={product.name} className="w-full h-full object-contain" />
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

        <p className="text-gray-600 font-medium">₹ {product.price}</p>

        {/* Size Selection */}
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-sm border rounded-md transition ${
                selectedSize === size ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add To Cart */}
        <button
          onClick={() => onAddToCart(product, selectedSize, image)}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
