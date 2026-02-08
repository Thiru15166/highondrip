import Layout from "@/components/layout/Layout";
import LookbookSlide from "@/components/LookbookSlide";
import { products } from "@/data/products";

const Shop = () => {
  return (
    <Layout>
      {/* Title strip */}
      <section className="h-screen flex flex-col items-center justify-center bg-foreground">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-background tracking-wider uppercase">
          Collection
        </h1>
        <p className="text-[10px] tracking-[0.4em] uppercase text-background/30 font-sans mt-6">
          {products.length} Pieces · Scroll to explore
        </p>
      </section>

      {/* Lookbook feed — all products */}
      <section>
        {products.map((product, index) => (
          <LookbookSlide
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Shop;
