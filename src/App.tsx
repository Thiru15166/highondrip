import { db } from "./main";
import { collection, addDoc } from "firebase/firestore";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

async function testFirestore() {
  try {
    await addDoc(collection(db, "test"), {
      name: "Muruga",
      createdAt: new Date(),
    });
    alert("Firestore Working!");
  } catch (error) {
    alert("Error connecting Firestore");
    console.error(error);
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 🔥 TEST BUTTON */}
<button
  onClick={testFirestore}
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  }}
>
  FIREBASE TEST
</button>      
        Test Firestore
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
