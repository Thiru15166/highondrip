import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(list);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: any, size: string) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = [
      ...existingCart,
      {
        ...product,
        size,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Collection</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
