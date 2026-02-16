import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: any, size: string) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.images?.[0] || product.image || "",
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-100">
        <h1 className="text-4xl font-bold">HIGH ON DRIP</h1>
        <p className="text-gray-500 mt-3">Premium Fashion Collection</p>
      </section>

      {/* Product Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              image={product.images?.[0] || product.image || ""}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
