const Footer = () => {
  return (
    <footer className="bg-foreground">
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <p className="font-serif font-black text-3xl lg:text-4xl text-background tracking-[0.15em] uppercase mb-6">
            High on Drip
          </p>
          <p className="text-background/30 text-xs font-sans leading-relaxed max-w-sm">
            Premium essentials for those who understand that true style speaks quietly. Limited drops, unlimited confidence.
          </p>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-background/20 tracking-[0.2em] uppercase font-sans">
            © 2026 HIGH ON DRIP
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[10px] text-background/30 tracking-[0.2em] uppercase font-sans transition-opacity duration-300 hover:text-background/60"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[10px] text-background/30 tracking-[0.2em] uppercase font-sans transition-opacity duration-300 hover:text-background/60"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
