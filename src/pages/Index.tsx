import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import FadeInSection from "@/components/FadeInSection";
import { products } from "@/data/products";
import editorial1 from "@/assets/editorial-1.jpg";

const featured = products.slice(0, 4);

const Index = () => {
  return (
    <Layout>
      {/* Hero Section — Typography-led */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <FadeInSection>
          <p className="text-label text-muted-foreground mb-6">
            Premium Streetwear
          </p>
          <h1 className="text-display-xl text-foreground mb-8">
            Drip with
            <br />
            Intention
          </h1>
          <Link
            to="/shop"
            className="inline-block border border-foreground px-10 py-4 text-label text-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-500"
          >
            Shop Collection
          </Link>
        </FadeInSection>
      </section>

      {/* Editorial Block — Image + Text */}
      <FadeInSection>
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="aspect-square overflow-hidden bg-secondary">
              <img
                src={editorial1}
                alt="Editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-md lg:pl-8">
              <p className="text-label text-muted-foreground mb-6">The Philosophy</p>
              <h2 className="text-display-l text-foreground mb-6">
                Less noise.
                <br />
                More drip.
              </h2>
              <p className="text-body text-muted-foreground">
                Every piece in our collection is designed with restraint and purpose.
                Premium fabrics. Limited editions. No compromises.
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Featured Products Grid */}
      <FadeInSection>
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
          <div className="flex items-center justify-between mb-12">
            <p className="text-label text-muted-foreground">Featured Drops</p>
            <Link
              to="/shop"
              className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                edition={product.edition}
                totalEdition={product.totalEdition}
              />
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Brand Statement */}
      <FadeInSection>
        <section className="py-[var(--section-gap)] px-6 text-center">
          <h2 className="text-display-l text-foreground max-w-3xl mx-auto">
            Confidence isn't loud.
            <br />
            It's intentional.
          </h2>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Index;
