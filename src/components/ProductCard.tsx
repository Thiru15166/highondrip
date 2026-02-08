import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-square overflow-hidden bg-secondary mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
          loading="lazy"
        />
      </div>
      <h3 className="font-serif text-base lg:text-lg text-foreground mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground font-sans">
        ${product.price}
      </p>
    </Link>
  );
};

export default ProductCard;
