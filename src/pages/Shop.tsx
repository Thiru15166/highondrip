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
        <h1 className="text-4xl font-bold mb-10">Collection</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
