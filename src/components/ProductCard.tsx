type Props = {
  product: any;
  onAddToCart: (product: any) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-gray-600 mt-1">₹{product.price}</p>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
