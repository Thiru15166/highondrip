import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Layout from "@/components/layout/Layout";

interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  total: number;
  createdAt: any;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");

  // 🔐 Admin Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().role === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📦 Fetch Products
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const list: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    setProducts(list);
  };

  // 📑 Fetch Orders
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const list: Order[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

    setOrders(list);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAdmin]);

  // ➕ Add Product
  const handleAddProduct = async () => {
    if (!newName || !newPrice || !newImage) return;

    await addDoc(collection(db, "products"), {
      name: newName,
      price: Number(newPrice),
      image: newImage,
      createdAt: new Date(),
    });

    setNewName("");
    setNewPrice("");
    setNewImage("");

    fetchProducts();
  };

  // ❌ Delete Product
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  if (loading) return <div className="p-10">Checking admin access...</div>;
  if (!isAdmin) return null;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab("products")} className="px-4 py-2 bg-black text-white rounded">
            Products
          </button>
          <button onClick={() => setActiveTab("orders")} className="px-4 py-2 bg-gray-700 text-white rounded">
            Orders
          </button>
        </div>

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Product Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="border p-2"
              />
            </div>

            <button onClick={handleAddProduct} className="bg-black text-white px-6 py-2 rounded mb-8">
              Add Product
            </button>

            <h2 className="text-xl font-semibold mb-4">Product List</h2>

            <div className="grid grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                  <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
                  <h3 className="font-bold">{product.name}</h3>
                  <p>₹{product.price}</p>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Orders List</h2>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border p-4 rounded">
                  <p>
                    <strong>Name:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.total}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
