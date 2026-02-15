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
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔥 Expand images into separate cards (6 images → 6 products)
        const expanded: any[] = [];

        list.forEach((product: any) => {
          if (Array.isArray(product.images)) {
            product.images.forEach((img: string, index: number) => {
              expanded.push({
                id: product.id + "_" + index,
                name: product.name + " - Design " + (index + 1),
                price: product.price,
                image: img,
                sizes: product.sizes || ["S", "M", "L", "XL", "2XL"],
              });
            });
          } else {
            expanded.push({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              sizes: product.sizes || ["S", "M", "L", "XL", "2XL"],
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

  // ✅ FINAL CART FUNCTION
  const handleAddToCart = (product: any, size: string) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    existing.push({ id: product.id, name: product.name, price: product.price, size, image: product.image });
    localStorage.setItem("cart", JSON.stringify(existing));
    alert(`Added ${product.name} (Size ${size}) to cart`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-lg">Loading products...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center">Our Collection</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
