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
  onAddToCart: (product: Product, size: string, image: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  if (!product || !Array.isArray(product.images)) return null;

  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL", "2XL"];

  return (
    <>
      {product.images.map((img, index) => (
        <VariantCard key={index} product={product} image={img} sizes={sizes} onAddToCart={onAddToCart} />
      ))}
    </>
  );
};

type VariantProps = {
  product: Product;
  image: string;
  sizes: string[];
  onAddToCart: (product: Product, size: string, image: string) => void;
};

const VariantCard = ({ product, image, sizes, onAddToCart }: VariantProps) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
        <img src={image} alt={product.name} className="w-full h-full object-contain" />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-gray-700 mt-1 font-medium">₹ {product.price}</p>

        <div className="mt-4">
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

        <button
          onClick={() => onAddToCart(product, selectedSize, image)}
          className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
