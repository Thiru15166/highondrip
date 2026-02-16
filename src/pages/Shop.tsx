import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes?: string[];
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // 🔥 Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(data);
    };

    fetchProducts();
  }, []);

  // 🔥 Add To Cart
  const handleAddToCart = (product: Product, size: string) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    existing.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.images?.[0],
    });

    localStorage.setItem("cart", JSON.stringify(existing));
    alert(`${product.name} (${size}) added to cart`);
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        {/* Title */}
        <h1 className="text-4xl font-semibold mb-12">Collection</h1>

        {/* 🔥 All Images Separate Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) =>
            product.images?.map((img, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} image={img} onAddToCart={handleAddToCart} />
            )),
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
