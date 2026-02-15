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

        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {product.sizes.map((size: string, index: number) => (
              <span key={index} className="border px-2 py-1 text-xs rounded">
                {size}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
