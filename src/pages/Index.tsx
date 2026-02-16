import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
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
      image: product.images?.[0] || "",
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          image={product.images?.[0] || ""}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default Index;
