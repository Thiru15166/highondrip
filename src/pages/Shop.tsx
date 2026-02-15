import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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

        // Expand images into separate product cards
        const expanded: any[] = [];

        list.forEach((product) => {
          if (product.images) {
            product.images.forEach((img: string, index: number) => {
              expanded.push({
                id: product.id + "-" + index,
                name: product.name + " - Design " + (index + 1),
                price: product.price,
                image: img,
              });
            });
          }
        });

        setProducts(expanded);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product: any) => {
    try {
      await addDoc(collection(db, "cart"), {
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        createdAt: new Date(),
      });

      alert("Added to cart ✅");
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Our Collection</h1>

        {loading && <p className="text-center">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
