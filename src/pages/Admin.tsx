import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/");
        }
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground tracking-wide text-sm">Checking admin access...</p>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) return null;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-12">Admin Dashboard</h1>
        <div className="w-full max-w-md flex flex-col gap-4">
          <Button
            className="w-full h-14 text-base tracking-wide"
            onClick={() => navigate("/admin/products")}
          >
            Manage Products
          </Button>
          <Button
            className="w-full h-14 text-base tracking-wide"
            onClick={() => navigate("/admin/orders")}
          >
            View Orders
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
