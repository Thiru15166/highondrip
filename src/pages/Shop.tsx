import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

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

        // 🔥 Expand multiple images into separate cards
        const expanded: any[] = [];

        list.forEach((product: any) => {
          if (product.images && Array.isArray(product.images)) {
            product.images.forEach((img: string, index: number) => {
              expanded.push({
                id: product.id + "_" + index,
                name: product.name + " - Design " + (index + 1),
                price: product.price,
                image: img,
                sizes: product.sizes || ["M", "L", "XL"],
              });
            });
          }
        });

        setProducts(expanded);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Add to cart with size
  const handleAddToCart = async (product: any, size: string) => {
    try {
      await addDoc(collection(db, "cart"), {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        createdAt: new Date(),
      });

      alert("Added to cart successfully");
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Collection</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
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
