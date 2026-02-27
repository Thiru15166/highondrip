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
import { Navigate } from "react-router-dom";

export default function Admin() {
  const auth = getAuth();

  /* ---------------- STATE ---------------- */

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

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

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

  /* ---------------- PRODUCT ACTIONS ---------------- */

  const handleAddProduct = async () => {
    if (!newName || !newPrice) {
      alert("Fill required fields");
      return;
    }

await addDoc(collection(db, "products"), {
  name: newName,
  price: Number(newPrice),
  images: newImages
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url !== ""),
  description: newDescription,
  sizes: newSize
    .split(",")
    .map(size => size.trim())
    .reduce((acc, size) => {
      acc[size] = 1;
      return acc;
    }, {} as Record<string, number>),
  type: newType,
});

    setNewName("");
    setNewPrice("");
    setNewImages("");
    setNewDescription("");
    setNewSize("");
    setNewType("");

    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  /* ---------------- PROTECTION ---------------- */

  if (loading) {
    return <div style={{ padding: "40px" }}>Checking access...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.email !== "muthuraajaa1111@gmail.com") {
    return <Navigate to="/" replace />;
  }

  /* ---------------- UI ---------------- */

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "230px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

        <button
          onClick={() => setActiveTab("products")}
          style={sidebarBtn(activeTab === "products")}
        >
          Products
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          style={sidebarBtn(activeTab === "orders")}
        >
          Orders
        </button>

        <button
          onClick={handleLogout}
          style={{ ...sidebarBtn(false), marginTop: "40px", background: "#dc2626" }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "40px",
        background: "#f3f4f6"
      }}>

        {activeTab === "products" && (
          <div>
            <h2 style={titleStyle}>Add Product</h2>

            <div style={cardStyle}>
              <input placeholder="Product Name" value={newName} onChange={(e) => setNewName(e.target.value)} style={inputStyle} />
              <input placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={inputStyle} />
              <input placeholder="Image URL" value={newImages} onChange={(e) => setNewImages(e.target.value)} style={inputStyle} />
              <input placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} style={inputStyle} />
              <input placeholder="Size" value={newSize} onChange={(e) => setNewSize(e.target.value)} style={inputStyle} />
              <input placeholder="Type" value={newType} onChange={(e) => setNewType(e.target.value)} style={inputStyle} />

              <button onClick={handleAddProduct} style={primaryBtn}>
                Add Product
              </button>
            </div>

            <h2 style={titleStyle}>All Products</h2>

            {products.map((product) => (
              <div key={product.id} style={cardStyle}>
                <h3>{product.name}</h3>
                <p>₹ {product.price}</p>
                <button onClick={() => handleDelete(product.id)} style={dangerBtn}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 style={titleStyle}>Orders</h2>

            {orders.map((order) => (
              <div key={order.id} style={cardStyle}>
                <p><b>Name:</b> {order.name}</p>
                <p><b>Phone:</b> {order.phone}</p>
                <p><b>Address:</b> {order.address}</p>
                <p><b>Total:</b> ₹ {order.total}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const sidebarBtn = (active: boolean) => ({
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  cursor: "pointer",
  background: active ? "#2563eb" : "#1f2937",
  color: "white",
  borderRadius: "6px"
});

const cardStyle = {
  background: "white",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

const primaryBtn = {
  padding: "10px 15px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const dangerBtn = {
  padding: "8px 12px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const titleStyle = {
  marginBottom: "20px"
};
