import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  sizes?: string[];
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));

      const data: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, size: string) => {
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
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold mb-10">Collection</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) =>
            Array.isArray(product.images)
              ? product.images.map((img, index) => (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                    image={img}
                    onAddToCart={handleAddToCart}
                  />
                ))
              : null,
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
