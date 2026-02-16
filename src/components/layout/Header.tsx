import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] group"
            aria-label="Open menu"
          >
            <span className="w-5 h-[1px] bg-foreground transition-all duration-300 group-hover:w-6" />
            <span className="w-4 h-[1px] bg-foreground transition-all duration-300 group-hover:w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-display text-lg md:text-xl tracking-[0.05em] text-foreground">
              HIGH ON DRIP
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Cart
          </Link>
        </div>
      </header>

      {/* Full-screen nav overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 w-full flex justify-between items-center">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Close menu"
            >
              Close
            </button>
            <span className="font-display text-lg md:text-xl tracking-[0.05em] text-foreground">
              HIGH ON DRIP
            </span>
            <div className="w-10" />
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: "Collection", to: "/shop" },
              { label: "Account", to: "/login" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-display-l text-foreground hover:text-muted-foreground transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
