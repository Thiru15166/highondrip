import { Link } from "react-router-dom";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";

const menuLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Collection" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-6 lg:px-10 h-16 lg:h-20">
          {/* Hamburger */}
          <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>

          {/* Wordmark */}
          <Link
            to="/"
            className="font-display text-2xl lg:text-3xl tracking-wide text-white select-none"
          >
            HIGH ON DRIP
          </Link>

          {/* Cart — minimal "+" icon */}
          <button
            className="text-white"
            aria-label="Cart"
          >
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-foreground flex flex-col items-center justify-center">
          <button
            className="absolute top-5 left-6 lg:left-10 text-background"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl md:text-7xl text-background tracking-wider transition-opacity duration-300 hover:opacity-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="absolute bottom-10 text-background/30 text-xs tracking-[0.3em] uppercase font-sans">
            © 2026 HIGH ON DRIP
          </p>
        </div>
      )}
    </>
  );
};

export default Header;
