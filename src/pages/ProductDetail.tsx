import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { getProductById, products } from "@/data/products";
import FadeInSection from "@/components/FadeInSection";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    return (
      <Layout>
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="font-display text-5xl text-foreground mb-6 uppercase tracking-wider">
            Not Found
          </h1>
          <Link
            to="/shop"
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans"
          >
            Return to Collection
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  return (
    <Layout>
      {/* Hero image — full bleed */}
      <section className="relative h-screen">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Product name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 pb-12 lg:pb-20">
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans mb-4">
            {product.category}
          </p>
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.85] text-white tracking-wide uppercase">
            {product.name}
          </h1>
        </div>

        {/* Edition — top right */}
        <div className="absolute top-24 right-6 lg:right-10 text-right">
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans">
            Limited Edition
          </p>
          <p className="text-white font-display text-2xl tracking-wider">
            {product.edition} / {product.totalEdition}
          </p>
        </div>
      </section>

      {/* Product details */}
      <FadeInSection>
        <section className="container mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-3xl lg:text-4xl font-display tracking-wider text-foreground mb-2 uppercase">
                ${product.price}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base font-sans max-w-md mt-8">
                {product.description}
              </p>
            </div>

            <div>
              {/* Size Selector */}
              <div className="mb-10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">
                  Select Size
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3.5rem] py-3 px-4 text-sm tracking-wider border transition-all duration-300 font-sans ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-5 bg-foreground text-background text-[10px] tracking-[0.35em] uppercase font-sans transition-all duration-500 hover:bg-neon hover:text-foreground">
                Secure the Drip
              </button>

              <p className="text-center text-muted-foreground/50 text-[10px] tracking-[0.2em] uppercase font-sans mt-4">
                Piece {product.edition} of {product.totalEdition} · Ships in 3–5 days
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Related — minimal */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border">
          <div className="container mx-auto px-6 lg:px-10 py-20 lg:py-32">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans mb-12 text-center">
              More from the collection
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group relative h-[60vh] overflow-hidden"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                    <h3 className="font-display text-3xl lg:text-4xl text-white tracking-wide uppercase">
                      {p.name}
                    </h3>
                    <p className="text-white/50 text-sm font-sans mt-2">
                      ${p.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
