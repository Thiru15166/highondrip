import Layout from "@/components/layout/Layout";
import LookbookSlide from "@/components/LookbookSlide";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(list);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      {/* Title Section */}
      <section className="h-screen flex flex-col items-center justify-center bg-foreground">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-background">Collection</h1>

        <p className="text-[10px] tracking-[0.4em] uppercase text-background/60 font-sans">
          {products.length} Pieces · Scroll to explore
        </p>
      </section>

      {/* Products Section */}
      <section>
        {loading ? (
          <div className="text-center py-20 text-white">Loading...</div>
        ) : (
          products.map((product, index) => <LookbookSlide key={product.id} product={product} index={index} />)
        )}
      </section>
    </Layout>
  );
};

export default Shop;
