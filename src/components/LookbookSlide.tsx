import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import FadeInSection from "./FadeInSection";

interface LookbookSlideProps {
  product: Product;
  index: number;
}

const LookbookSlide = ({ product }: LookbookSlideProps) => {
  return (
    <FadeInSection>
      <Link to={`/product/${product.id}`} className="group block w-full">
        {/* Image container */}
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </Link>
    </FadeInSection>
  );
};

export default LookbookSlide;
