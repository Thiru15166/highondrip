import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: { [key: string]: number };
}

interface Props {
  product: Product;
  image: string;
}

const ProductCard = ({ product, image }: Props) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: image,
      size: selectedSize,
      quantity: 1,
    };

    // 🔥 Get existing cart
    const existingCart = localStorage.getItem("cart");
    let cart = [];

    if (existingCart) {
      cart = JSON.parse(existingCart);
    }

    // 🔥 Check if same product + size already exists
    const existingIndex = cart.findIndex((item: any) => item.id === cartItem.id && item.size === cartItem.size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
  };

  return (
    <div className="border p-4 rounded-lg">
      <img src={image} alt={product.name} className="w-full h-60 object-cover" />
      <h2 className="mt-2 font-semibold">{product.name}</h2>
      <p className="text-gray-500">₹ {product.price}</p>

      <div className="mt-2">
        {Object.keys(product.sizes).map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-2 py-1 border mr-2 ${selectedSize === size ? "bg-black text-white" : ""}`}
          >
            {size}
          </button>
        ))}
      </div>

      <button onClick={handleAddToCart} className="mt-3 bg-black text-white px-4 py-2 w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
