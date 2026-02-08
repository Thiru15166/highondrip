import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import FadeInSection from "@/components/FadeInSection";
import { products } from "@/data/products";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";

const Index = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-28 lg:py-44 bg-cream">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.05]">
            Wear Intent
          </h1>
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-muted-foreground mb-14 font-sans">
            Premium essentials for the deliberate
          </p>
          <Link
            to="/shop"
            className="inline-block bg-foreground text-background px-12 py-4 text-xs tracking-[0.25em] uppercase font-sans transition-opacity duration-300 hover:opacity-80"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Editorial Block 1 */}
      <FadeInSection>
        <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-square overflow-hidden bg-secondary">
              <img
                src={editorial1}
                alt="Premium draped fabric in neutral tones"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="max-w-md">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6 leading-tight">
                Crafted with
                <br />
                Conviction
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base font-sans">
                Every piece in the HIGH ON DRIP collection is a deliberate
                choice. We strip away the unnecessary, refine what remains, and
                deliver garments that speak through quality and cut — never
                volume.
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Featured Products */}
      <FadeInSection>
        <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
              Selected Pieces
            </h2>
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans">
              Current collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-block border border-foreground text-foreground px-12 py-4 text-xs tracking-[0.25em] uppercase font-sans transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              View All
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* Brand Statement */}
      <FadeInSection>
        <section className="py-24 lg:py-40 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed max-w-3xl mx-auto italic">
              "Confidence isn't loud. It's the quiet certainty of knowing every
              detail was chosen with purpose."
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Editorial Block 2 */}
      <FadeInSection>
        <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-md md:order-1 order-2">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6 leading-tight">
                Less, But
                <br />
                Better
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base font-sans">
                We don't chase trends. HIGH ON DRIP exists in the space between
                streetwear and quiet luxury — where premium fabrics meet
                considered design, and every silhouette is earned.
              </p>
            </div>
            <div className="aspect-square overflow-hidden bg-secondary md:order-2 order-1">
              <img
                src={editorial2}
                alt="Curated fashion essentials flatlay"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Index;
