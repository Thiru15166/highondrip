import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-[var(--section-gap)]">
        {/* Brand statement */}
        <div className="max-w-lg">
          <p className="font-display text-2xl md:text-3xl text-foreground leading-tight mb-6">
            High on Drip
          </p>
          <p className="text-body text-muted-foreground max-w-sm">
            Premium essentials for those who understand that true style speaks quietly.
            Limited drops, unlimited confidence.
          </p>
        </div>

        {/* Divider + bottom row */}
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <nav className="flex gap-8">
            {[
              { label: "Shop", to: "/shop" },
              { label: "Collection", to: "/shop" },
              { label: "Account", to: "/login" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-label text-muted-foreground">
            © 2026 High on Drip
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
