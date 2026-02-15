import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/products";
import FadeInSection from "@/components/FadeInSection";

const Shop = () => {
  const handleAddToCart = (product: any, size: string) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    existing.push({ id: product.id, name: product.name, price: product.price, size, image: product.image });
    localStorage.setItem("cart", JSON.stringify(existing));
    alert(`${product.name} (${size}) added to cart!`);
  };

  return (
    <Layout>
      <FadeInSection>
        <section className="container mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <h1 className="font-display text-5xl lg:text-7xl text-foreground uppercase tracking-wider mb-16 text-center">
            Collection
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const sizes = product.sizes || ["S", "M", "L", "XL"];
              const [selectedSize, setSelectedSize] = useState(sizes[0]);

              return (
                <div key={product.id} className="group">
                  <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  <div className="mt-4 space-y-2">
                    <h2 className="font-display text-lg tracking-wider uppercase text-foreground">{product.name}</h2>
                    <p className="text-muted-foreground text-sm font-sans">${product.price}</p>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full border border-border bg-background text-foreground p-2 text-sm font-sans"
                    >
                      {sizes.map((size: string) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAddToCart(product, selectedSize)}
                      className="w-full py-3 bg-foreground text-background text-[10px] tracking-[0.3em] uppercase font-sans hover:bg-neon hover:text-foreground transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Shop;
