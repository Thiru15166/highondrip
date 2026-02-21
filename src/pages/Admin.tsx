import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("products");

  // Product States
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImages, setNewImages] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newType, setNewType] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch Products
  const fetchProducts = async () => {
    const data = await getDocs(collection(db, "products"));
    setProducts(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    );
  };

  // Fetch Orders
  const fetchOrders = async () => {
    const data = await getDocs(collection(db, "orders"));
    setOrders(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    );
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Add Product
  const handleAddProduct = async () => {
    if (!newName || !newPrice || !newImages) {
      alert("Please fill required fields");
      return;
    }

    const imageArray = newImages.split(",");

    await addDoc(collection(db, "products"), {
      name: newName,
      price: Number(newPrice),
      images: imageArray,
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

  // Delete Product
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* TAB BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("products")} className="bg-black text-white px-4 py-2">
          Products
        </button>

        <button onClick={() => setActiveTab("orders")} className="bg-gray-700 text-white px-4 py-2">
          Orders
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>

          <div className="flex flex-col gap-3 mb-6">
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
              placeholder="Image URLs (comma separated)"
              value={newImages}
              onChange={(e) => setNewImages(e.target.value)}
              className="border p-2"
            />

            <textarea
              placeholder="Product Description (2 lines)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border p-2"
            />

            <select value={newSize} onChange={(e) => setNewSize(e.target.value)} className="border p-2">
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            <select value={newType} onChange={(e) => setNewType(e.target.value)} className="border p-2">
              <option value="">Select Type</option>
              <option value="Half Hand">Half Hand</option>
              <option value="Full Hand">Full Hand</option>
            </select>

            <button onClick={handleAddProduct} className="bg-black text-white p-2">
              Add Product
            </button>
          </div>

          {/* PRODUCT LIST */}
          {products.map((product) => (
            <div key={product.id} className="border p-4 mb-4 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <img src={product.images?.[0]} className="w-16 h-16 object-cover" />

                <div>
                  <p className="font-bold">{product.name}</p>
                  <p>₹ {product.price}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm">Size: {product.size}</p>
                  <p className="text-sm">Type: {product.type}</p>
                </div>
              </div>

              <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1">
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
            <div key={order.id} className="border p-4 mb-6">
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
                <b>Total:</b> ₹ {order.total}
              </p>

              <div className="mt-4">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="border p-3 mt-3 flex gap-4 items-center">
                    <img src={item.image} className="w-20 h-20 object-cover" />

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p>
                        <b>Size:</b> {item.size}
                      </p>
                      <p>
                        <b>Qty:</b> {item.quantity}
                      </p>
                      <p>
                        <b>Price:</b> ₹ {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
