import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          HIGH ON DRIP
        </Link>

        <nav className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/shop">Collection</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
