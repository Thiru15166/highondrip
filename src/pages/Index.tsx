import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeInSection from "@/components/FadeInSection";
import dragonLogo from "@/assets/dragon-logo.png";
import categoryHoodies from "@/assets/category-hoodies.jpg";
import categoryTshirts from "@/assets/category-tshirts.jpg";
import categoryPants from "@/assets/category-pants.jpg";

const categories = [
  { name: "Hoodies", image: categoryHoodies },
  { name: "T-Shirts", image: categoryTshirts },
  { name: "Pants", image: categoryPants },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO — Cinematic magazine cover */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center -mt-[72px] bg-[hsl(0,0%,5%)]">
        {/* Subtle radial glow behind logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-background/[0.03] blur-[120px]" />
        </div>

        {/* Side text — left */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <p className="text-background/20 text-[9px] tracking-[0.5em] uppercase font-sans [writing-mode:vertical-lr] rotate-180">
            Upcoming Release
          </p>
        </div>

        {/* Side text — right */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <p className="text-background/20 text-[9px] tracking-[0.5em] uppercase font-sans [writing-mode:vertical-lr]">
            Drop 01 · SS '26
          </p>
        </div>

        {/* Corner labels */}
        <p className="absolute top-28 left-6 md:left-10 text-background/15 text-[8px] tracking-[0.4em] uppercase font-sans z-10">
          Limited Issue
        </p>
        <p className="absolute top-28 right-6 md:right-10 text-background/15 text-[8px] tracking-[0.4em] uppercase font-sans z-10">
          Est. 2025
        </p>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Dragon logo */}
          <div className="relative mb-10 md:mb-14">
            <img
              src={dragonLogo}
              alt="HIGH ON DRIP Dragon"
              className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]"
            />
          </div>

          {/* Wordmark */}
          <h1 className="font-serif font-black text-background text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] uppercase leading-[0.85] mb-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]">
            High
            <br />
            On Drip
          </h1>

          <p className="text-background/25 text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-sans mb-12">
            Curated Essentials
          </p>

          {/* CTA */}
          <Link
            to="/shop"
            className="group relative inline-block border border-background/20 text-background/70 px-14 py-4 text-[10px] tracking-[0.35em] uppercase font-sans overflow-hidden transition-all duration-700 hover:border-background/50 hover:text-background"
          >
            <span className="absolute inset-0 bg-background/0 group-hover:bg-background/[0.06] transition-all duration-700" />
            <span className="relative">Enter The Drop</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-10 bg-background/10 animate-pulse" />
        </div>
      </section>

      {/* CATEGORIES — Zara-style large image grid */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-10 py-24 lg:py-36">
          <FadeInSection>
            <p className="text-center text-muted-foreground text-[9px] tracking-[0.5em] uppercase font-sans mb-16 lg:mb-24">
              Coming Soon · Drop 01
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <FadeInSection key={cat.name} className={i === 1 ? "md:mt-12" : ""}>
                <Link to="/shop" className="group block">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Label */}
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-foreground/80 group-hover:text-foreground text-[11px] tracking-[0.3em] uppercase font-sans transition-colors duration-500 relative">
                      {cat.name}
                      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-foreground transition-all duration-500" />
                    </p>
                    <p className="text-muted-foreground text-[9px] tracking-[0.3em] uppercase font-sans">
                      Coming Soon
                    </p>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <FadeInSection>
        <section className="py-20 md:py-36 lg:py-52 bg-foreground">
          <div className="container mx-auto px-6 lg:px-10 text-center max-w-3xl">
            <p className="text-background/30 text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-sans mb-8 md:mb-12">
              The Philosophy
            </p>
            <p className="font-serif text-xl md:text-4xl lg:text-5xl text-background tracking-wide leading-[1.3] md:leading-[1.2] uppercase">
              Confidence isn't loud.
              <br />
              It's the quiet certainty
              <br />
              that every detail was chosen
              <br />
              with purpose.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Minimal CTA */}
      <FadeInSection>
        <section className="py-20 md:py-28 lg:py-36 bg-background">
          <div className="container mx-auto px-6 lg:px-10 text-center">
            <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground font-sans mb-4">
              Limited Quantities
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground/60 mb-10">
              Each piece, numbered. Each drop, final.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-foreground text-background px-10 md:px-14 py-4 min-h-[48px] flex items-center justify-center text-[10px] tracking-[0.35em] uppercase font-sans transition-all duration-500 hover:bg-foreground/85"
            >
              View All Releases
            </Link>
          </div>
        </section>
      </FadeInSection>
    </Layout>
  );
};

export default Index;
