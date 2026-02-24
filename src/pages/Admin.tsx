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
import { useNavigate, Navigate } from "react-router-dom";

export default function Admin() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImages, setNewImages] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newType, setNewType] = useState("");

  // ✅ AUTH CHECK
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));
    setProducts(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  // ✅ FETCH ORDERS
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

  // ✅ ADD PRODUCT
  const handleAddProduct = async () => {
    if (!newName || !newPrice) return alert("Fill all fields");

    await addDoc(collection(db, "products"), {
      name: newName,
      price: newPrice,
      images: newImages,
      description: newDescription,
      size: newSize,
      type: newType,
    });

    alert("Product Added");
    setNewName("");
    setNewPrice("");
    setNewImages("");
    setNewDescription("");
    setNewSize("");
    setNewType("");

    fetchProducts();
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // ✅ LOADING SCREEN
  if (loading) {
    return <div style={{ padding: "40px" }}>Checking access...</div>;
  }

  // ✅ NOT LOGGED IN
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ WRONG EMAIL
  if (currentUser.email !== "muthuraajaa1111@gmail.com") {
    return <Navigate to="/" replace />;
  }

  // ✅ MAIN UI
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

      {activeTab === "products" && (
        <div>
          <h3>Add Product</h3>

          <input
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Image URL"
            value={newImages}
            onChange={(e) => setNewImages(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <br /><br />

          <button onClick={handleAddProduct}>Add Product</button>

          <hr />

          <h3>All Products</h3>

          {products.map((product) => (
            <div key={product.id} style={{ marginBottom: "20px" }}>
              <p><b>{product.name}</b></p>
              <p>₹ {product.price}</p>
              <button onClick={() => handleDelete(product.id)}>
                Delete
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h3>Orders</h3>

          {orders.map((order) => (
            <div key={order.id} style={{ marginBottom: "20px" }}>
              <p><b>Name:</b> {order.name}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Total:</b> ₹ {order.total}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
