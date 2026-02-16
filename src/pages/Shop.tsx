import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes?: string[];
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Firebase
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

  // Add to cart function
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
          {products.map((product) => {
            const sizes = product.sizes || ["S", "M", "L", "XL"];
            const [selectedSize, setSelectedSize] = useState(sizes[0]);

            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Product Image */}
                <img src={product.images?.[0]} alt={product.name} className="w-full h-80 object-cover" />

                {/* Product Details */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>

                  <p className="text-gray-600 mt-1">₹ {product.price}</p>

                  {/* Size Selection */}
                  <div className="flex gap-2 mt-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded ${
                          selectedSize === size ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product, selectedSize)}
                    className="mt-4 w-full bg-black text-white py-2 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
