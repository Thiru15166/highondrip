import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import FadeInSection from "@/components/FadeInSection";
import { getProductById, products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
          <h1 className="text-display-l text-foreground mb-6">Not Found</h1>
          <Link
            to="/shop"
            className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Return to Collection
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <Layout>
      {/* Two-column product layout */}
      <FadeInSection>
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Left — Square image */}
            <div className="aspect-square overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right — Product info */}
            <div className="flex flex-col justify-center">
              <p className="text-label text-muted-foreground mb-4">
                {product.category}
              </p>
              <h1 className="text-display-l text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-label text-muted-foreground mb-8">
                Piece {product.edition} of {product.totalEdition}
              </p>

              <p className="font-display text-2xl text-foreground mb-8">
                ${product.price}
              </p>

              <p className="text-body text-muted-foreground mb-10 max-w-md">
                {product.description}
              </p>

              {/* Size selector */}
              <div className="mb-10">
                <p className="text-label text-muted-foreground mb-4">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] py-2.5 px-4 text-sm tracking-wider border transition-all duration-300 font-sans ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-primary-foreground"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full py-4 bg-foreground text-primary-foreground text-label tracking-[0.3em] transition-all duration-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedSize ? "Add to Cart" : "Select a Size"}
              </button>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
            <p className="text-label text-muted-foreground mb-12 text-center">
              More from the Collection
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  edition={p.edition}
                  totalEdition={p.totalEdition}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
