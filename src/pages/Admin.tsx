import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImages, setNewImages] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newType, setNewType] = useState("");

  /* ---------------- ADMIN AUTH CHECK ---------------- */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        // 🔥 Change this email to your real admin email
        if (user.email !== "muthuraajaa1111@gmail.com") {
          navigate("/");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px" }}>Checking access...</div>;
  }

  /* ---------------- FETCH DATA ---------------- */

  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));
    setProducts(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const fetchOrders = async () => {
    const data = await getDocs(collection(db, "orders"));
    setOrders(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  /* ---------------- ADD PRODUCT ---------------- */

  const handleAddProduct = async () => {
    if (!newName || !newPrice || !newImages) {
      alert("Please fill required fields");
      return;
    }

    await addDoc(collection(db, "products"), {
      name: newName,
      price: Number(newPrice),
      images: newImages.split(","),
      description: newDescription,
      size: newSize,
      type: newType,
      createdAt: new Date(),
    });

    setNewName("");
    setNewPrice("");
    setNewImages("");
    setNewDescription("");
    setNewSize("");
    setNewType("");

    fetchProducts();
  };

  /* ---------------- DELETE PRODUCT ---------------- */

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <hr />

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("products")}>Products</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div>
          <h3>Add Product</h3>

          <input
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <br />

          <input
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <br />

          <input
            placeholder="Image URLs (comma separated)"
            value={newImages}
            onChange={(e) => setNewImages(e.target.value)}
          />
          <br />

          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <br />

          <input
            placeholder="Size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
          <br />

          <input
            placeholder="Type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <br />

          <button onClick={handleAddProduct}>Add Product</button>

          <hr />

          <h3>Product List</h3>

          {products.map((product) => (
            <div key={product.id} style={{ marginBottom: "15px" }}>
              <b>{product.name}</b> - ₹{product.price}
              <br />
              <button onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div>
          <h3>Orders</h3>

          {orders.map((order) => (
            <div key={order.id} style={{ marginBottom: "20px" }}>
              <p><b>Name:</b> {order.name}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Total:</b> ₹{order.total}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
