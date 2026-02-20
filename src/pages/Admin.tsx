import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Layout from "@/components/layout/Layout";

interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  createdAt: any;
  items: OrderItem[];
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
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    setProducts(list);
  };

  // 🧾 Fetch Orders
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const list = snapshot.docs.map((doc) => ({
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
          <button onClick={() => setActiveTab("products")} className="px-4 py-2 bg-black text-white">
            Products
          </button>
          <button onClick={() => setActiveTab("orders")} className="px-4 py-2 bg-gray-300">
            Orders
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>

            <div className="flex gap-3 mb-4">
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
              <button onClick={handleAddProduct} className="bg-black text-white px-4">
                Add
              </button>
            </div>

            {products.map((product) => (
              <div key={product.id} className="border p-3 mb-3 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img src={product.image} width="60" />
                  <div>
                    <p>{product.name}</p>
                    <p>₹{product.price}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(product.id!)} className="bg-red-500 text-white px-3">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Orders</h2>

            {orders.map((order) => (
              <div key={order.id} className="border-2 border-black p-4 mb-6">
                <p>
                  <b>Name:</b> {order.name}
                </p>
                <p>
                  <b>Phone:</b> {order.phone}
                </p>
                <p>
                  <b>Address:</b> {order.address}
                </p>
                <p>
                  <b>Total:</b> ₹{order.total}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {order.createdAt
                    ? new Date(
                        order.createdAt.seconds ? order.createdAt.seconds * 1000 : order.createdAt,
                      ).toLocaleString()
                    : ""}
                </p>

                {order.items?.map((item, index) => (
                  <div key={index} className="border p-3 mt-4 flex gap-4 items-center">
                    <img src={item.image} width="100" />
                    <div>
                      <p>
                        <b>Product:</b> {item.name}
                      </p>
                      <p>
                        <b>Size:</b> {item.size}
                      </p>
                      <p>
                        <b>Quantity:</b> {item.quantity}
                      </p>
                      <p>
                        <b>Price:</b> ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
