import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border)/0.5)]"
          : "py-5 bg-background/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className={`font-serif font-black tracking-[0.15em] uppercase transition-all duration-500 ${
            scrolled ? "text-lg" : "text-2xl"
          }`}
        >
          HIGH ON DRIP
        </Link>

        <nav className="flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-medium">
          <Link to="/" className="hover:text-muted-foreground transition-colors duration-300">
            Home
          </Link>
          <Link to="/shop" className="hover:text-muted-foreground transition-colors duration-300">
            Releases
          </Link>
          <Link to="/cart" className="hover:text-muted-foreground transition-colors duration-300">
            Cart
          </Link>
          <Link to="/checkout" className="hover:text-muted-foreground transition-colors duration-300">
            Order
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
