import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LookbookSlide from "@/components/LookbookSlide";
import FadeInSection from "@/components/FadeInSection";
import { products } from "@/data/products";
import logoFull from "@/assets/logo-full.png";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero — Full bleed, logo-driven */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-foreground overflow-hidden">
        <img
          src={logoFull}
          alt="HIGH ON DRIP — Established 2025"
          className="h-32 md:h-44 lg:h-56 w-auto mb-10 brightness-0 invert"
        />
        <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-background/40 font-sans mb-16">
          Limited drops · Premium essentials
        </p>
        <Link
          to="/shop"
          className="inline-block border border-background/20 text-background px-10 py-4 text-[10px] tracking-[0.35em] uppercase font-sans transition-all duration-500 hover:bg-neon hover:text-foreground hover:border-neon"
        >
          Enter Collection
        </Link>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-background/20 animate-pulse" />
          <span className="text-background/20 text-[9px] tracking-[0.3em] uppercase font-sans">
            Scroll
          </span>
        </div>
      </section>

      {/* Lookbook feed */}
      <section>
        {featuredProducts.map((product, index) => (
          <LookbookSlide
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </section>

      {/* Brand statement */}
      <FadeInSection>
        <section className="py-32 lg:py-48 bg-foreground">
          <div className="container mx-auto px-6 lg:px-10 text-center">
            <p className="font-display text-4xl md:text-6xl lg:text-7xl text-background tracking-wide leading-tight uppercase">
              Confidence isn't loud.
              <br />
              It's the quiet certainty of
              <br />
              knowing every detail was chosen
              <br />
              with purpose.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* CTA to full collection */}
      <FadeInSection>
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-10 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans mb-8">
              {products.length} Pieces · Limited Quantities
            </p>
            <Link
              to="/shop"
              className="inline-block bg-foreground text-background px-12 py-4 text-[10px] tracking-[0.35em] uppercase font-sans transition-all duration-500 hover:bg-neon hover:text-foreground"
            >
              View Full Collection
            </Link>
          </div>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Index;
