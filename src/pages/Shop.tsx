import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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

        // 🔥 Convert each image into separate product card
        const expandedProducts: any[] = [];

        list.forEach((product) => {
          if (product.images && product.images.length > 0) {
            product.images.forEach((img: string, index: number) => {
              expandedProducts.push({
                id: product.id + "-" + index,
                name: product.name,
                price: product.price,
                image: img,
              });
            });
          }
        });

        setProducts(expandedProducts);
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
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Our Collection</h1>

        {loading && <p className="text-center text-lg">Loading products...</p>}

        {!loading && products.length === 0 && <p className="text-center text-lg">No products found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition">
              <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />

              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

                <p className="text-gray-600 mb-4">₹{product.price}</p>

                <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
