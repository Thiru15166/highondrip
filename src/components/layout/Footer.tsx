import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold tracking-wide mb-6">
              HIGH ON DRIP
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              A study in restraint and confidence. Premium essentials designed
              for those who understand that true style speaks quietly.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-primary-foreground/40">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/shop"
                className="text-sm text-primary-foreground/60 transition-opacity duration-300 hover:text-primary-foreground"
              >
                Shop
              </Link>
              <Link
                to="/shop"
                className="text-sm text-primary-foreground/60 transition-opacity duration-300 hover:text-primary-foreground"
              >
                Collection
              </Link>
              <Link
                to="/"
                className="text-sm text-primary-foreground/60 transition-opacity duration-300 hover:text-primary-foreground"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-primary-foreground/40">
              Connect
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="#"
                className="text-sm text-primary-foreground/60 transition-opacity duration-300 hover:text-primary-foreground"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground/60 transition-opacity duration-300 hover:text-primary-foreground"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground/60 transition-opacity duration-300 hover:text-primary-foreground"
              >
                Pinterest
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8">
          <p className="text-xs text-primary-foreground/30 tracking-wider">
            © 2026 HIGH ON DRIP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
