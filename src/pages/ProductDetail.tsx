import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { getProductById, products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 lg:px-12 py-32 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">
            Product Not Found
          </h1>
          <Link
            to="/shop"
            className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans"
          >
            Return to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <nav className="text-xs tracking-wider text-muted-foreground font-sans">
          <Link
            to="/"
            className="hover:text-foreground transition-colors duration-300"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/shop"
            className="hover:text-foreground transition-colors duration-300"
          >
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="container mx-auto px-6 lg:px-12 pb-20 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center lg:py-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg lg:text-xl text-foreground mb-8 font-sans">
              ${product.price}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md text-sm lg:text-base font-sans">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 font-sans">
                Size
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] py-2.5 px-3 text-sm tracking-wider border transition-all duration-300 font-sans ${
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

            {/* Add to Cart */}
            <button className="w-full lg:w-auto lg:px-16 py-4 bg-foreground text-background text-xs tracking-[0.25em] uppercase font-sans transition-opacity duration-300 hover:opacity-80">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32 border-t border-border">
          <h2 className="font-serif text-2xl lg:text-3xl text-foreground text-center mb-16">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
