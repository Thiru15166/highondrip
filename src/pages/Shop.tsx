import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  images: string[];
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));

      const data: Product[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSizeChange = (key: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [key]: size,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.flatMap((product) =>
          product.images.map((image, index) => {
            const uniqueKey = `${product.id}-${index}`;

            return (
              <div key={uniqueKey} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
                <div className="w-full h-72 overflow-hidden rounded-md">
                  <img src={image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <h3 className="mt-4 font-semibold text-lg">{product.name}</h3>

                <p className="text-gray-600 mb-2">₹{product.price}</p>

                <select
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) => handleSizeChange(uniqueKey, e.target.value)}
                >
                  <option>Select Size</option>
                  {product.sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>

                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Add to Cart</button>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Shop;
