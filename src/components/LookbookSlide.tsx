import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import FadeInSection from "./FadeInSection";

interface LookbookSlideProps {
  product: Product;
  index: number;
}

const LookbookSlide = ({ product, index }: LookbookSlideProps) => {
  const isLandscape = product.layout === "landscape";

  return (
    <FadeInSection>
      <Link
        to={`/product/${product.id}`}
        className="group block relative w-full"
        style={{ minHeight: "80vh" }}
      >
        {/* Image container */}
        <div
          className={`relative w-full overflow-hidden ${
            isLandscape ? "h-[60vh] md:h-[70vh]" : "h-[80vh] md:h-[85vh]"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />

          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Oversized product name — overlapping the image */}
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 pb-8 lg:pb-12">
            <h2 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-white tracking-wide uppercase">
              {product.name}
            </h2>
          </div>

          {/* Edition badge — top right */}
          <div className="absolute top-6 right-6 lg:top-10 lg:right-10 text-right">
            <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-sans">
              Limited Edition
            </p>
            <p className="text-white font-display text-lg tracking-wider">
              {product.edition} / {product.totalEdition}
            </p>
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="flex items-center justify-between px-6 lg:px-10 py-6 bg-background">
          <div className="flex items-center gap-6">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">
              {product.category}
            </span>
            <span className="text-sm font-sans text-foreground">
              ${product.price}
            </span>
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neon font-sans transition-opacity duration-300 group-hover:opacity-70">
            Secure the Drip →
          </span>
        </div>
      </Link>
    </FadeInSection>
  );
};

export default LookbookSlide;
