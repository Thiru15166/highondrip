import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes?: string[];
};

type Props = {
  products: Product[];
  onAddToCart: (product: Product, size: string, image: string) => void;
};

const ProductCard = ({ products, onAddToCart }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) =>
        product.images.map((img, index) => (
          <VariantCard key={`${product.id}-${index}`} product={product} image={img} onAddToCart={onAddToCart} />
        )),
      )}
    </div>
  );
};

type VariantProps = {
  product: Product;
  image: string;
  onAddToCart: (product: Product, size: string, image: string) => void;
};

const VariantCard = ({ product, image, onAddToCart }: VariantProps) => {
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
      {/* MEDIUM RATIO IMAGE */}
      <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center">
        <img src={image} alt={product.name} className="max-w-full max-h-full object-contain" />
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold">{product.name}</h2>

        <p className="text-gray-700 mt-1">₹ {product.price}</p>

        {/* SIZE */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm border rounded transition ${
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
          onClick={() => onAddToCart(product, selectedSize, image)}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
