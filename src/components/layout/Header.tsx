import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Releases" },
    { to: "/cart", label: "Cart" },
    { to: "/checkout", label: "Order" },
    { to: "/login", label: "Account" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "py-2 bg-background/80 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border)/0.5)]"
            : "py-4 md:py-5 bg-background/0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex justify-between items-center">
          <Link
            to="/"
            className={`font-serif font-black tracking-[0.15em] uppercase transition-all duration-500 ${
              scrolled ? "text-base md:text-lg" : "text-lg md:text-2xl"
            }`}
          >
            HIGH ON DRIP
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-medium">
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

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -mr-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[280px] bg-background border-l border-border/40 p-0 flex flex-col">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          {/* Brand */}
          <div className="px-8 pt-10 pb-8 border-b border-border/30">
            <p className="font-serif font-black text-sm tracking-[0.2em] uppercase">
              HIGH ON DRIP
            </p>
            <p className="text-[8px] tracking-[0.4em] uppercase text-muted-foreground mt-2">
              Curated Essentials
            </p>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col px-8 py-10 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-4 text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300 border-b border-border/20"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-8 py-8 border-t border-border/30">
            <p className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground/50">
              © 2025 High On Drip
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
