import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import FadeInSection from "@/components/FadeInSection";
import { products as localProducts } from "@/data/products";

type FirebaseProduct = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  image?: string;
  sizes?: string[];
  edition?: number;
  totalEdition?: number;
};

const Shop = () => {
  const [firebaseProducts, setFirebaseProducts] = useState<FirebaseProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data: FirebaseProduct[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FirebaseProduct, "id">),
        }));
        setFirebaseProducts(data);
      } catch {
        // Firebase may not be available, fall back to local
      }
    };
    fetchProducts();
  }, []);

  // Merge: show firebase products if available, else local
  const displayProducts = firebaseProducts.length > 0
    ? firebaseProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.images?.[0] || p.image || "",
        edition: p.edition,
        totalEdition: p.totalEdition,
      }))
    : localProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        edition: p.edition,
        totalEdition: p.totalEdition,
      }));

  return (
    <Layout>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
        <FadeInSection>
          <div className="mb-16">
            <p className="text-label text-muted-foreground mb-4">Browse</p>
            <h1 className="text-display-l text-foreground">Collection</h1>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              edition={product.edition}
              totalEdition={product.totalEdition}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
