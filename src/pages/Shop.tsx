import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">
            Shop
          </h1>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans">
            The full collection
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
