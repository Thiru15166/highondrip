import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const [hovered, setHovered] = useState(false);

  // Safety check
  if (!product || !product.images || product.images.length === 0) {
    return null;
  }

  // Decide which image to show
  const displayImage = hovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="w-full h-72 overflow-hidden">
        <img src={displayImage} alt={product.name} className="w-full h-full object-cover transition duration-300" />
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-gray-600 mt-1">₹ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
