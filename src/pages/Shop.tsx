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
      <div className="container mx-auto px-6 py-16">
        {loading && <p className="text-center text-lg">Loading products...</p>}

        {!loading && products.length === 0 && <p className="text-center text-lg">No products found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : ""}
                alt={product.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>

                <p className="text-gray-600 mt-2">₹{product.price}</p>

                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
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
