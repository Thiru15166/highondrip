import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-display-xl text-foreground mb-6">404</h1>
        <p className="text-body text-muted-foreground mb-8">Page not found</p>
        <Link
          to="/"
          className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
