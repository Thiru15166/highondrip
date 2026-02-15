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
      {loading && <p className="text-center mt-10">Loading...</p>}

      {!loading && products.map((product, index) => <LookbookSlide key={product.id} product={product} index={index} />)}
    </Layout>
  );
};

export default Shop;
