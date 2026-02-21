import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          HIGH ON DRIP
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-gray-500 transition">
            Home
          </Link>

          <Link to="/shop" className="hover:text-gray-500 transition">
            Releases
          </Link>

          <Link to="/cart" className="hover:text-gray-500 transition">
            Cart
          </Link>

          <Link to="/checkout" className="hover:text-gray-500 transition">
            Order
          </Link>

          <Link to="/login" className="px-4 py-2 border rounded-xl hover:bg-black hover:text-white transition">
            Join Community
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
