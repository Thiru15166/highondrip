import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeInSection from "@/components/FadeInSection";
import editorialCover from "@/assets/editorial-cover.jpg";

const Index = () => {
  return (
    <Layout>
      {/* COVER — Full-bleed fashion editorial */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center -mt-[72px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${editorialCover})` }}
        />

        {/* Cinematic grain overlay */}
        <div className="absolute inset-0 bg-foreground/40" />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Corner editorial text — top left */}
        <div className="absolute top-28 left-8 md:left-12 z-10">
          <p className="text-background/50 text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-sans">
            Limited Issue
          </p>
        </div>

        {/* Corner editorial text — top right */}
        <div className="absolute top-28 right-8 md:right-12 z-10 text-right">
          <p className="text-background/50 text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-sans">
            SS &apos;26
          </p>
        </div>

        {/* Corner editorial text — bottom left */}
        <div className="absolute bottom-12 left-8 md:left-12 z-10">
          <p className="text-background/30 text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-sans">
            Curated Essentials
          </p>
        </div>

        {/* Corner editorial text — bottom right */}
        <div className="absolute bottom-12 right-8 md:right-12 z-10 text-right">
          <p className="text-background/30 text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-sans">
            Est. 2025
          </p>
        </div>

        {/* Center cover content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Drop label */}
          <p className="text-background/50 text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-sans mb-6">
            Drop 01
          </p>

          {/* Wordmark */}
          <h1 className="font-serif font-black text-background text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] uppercase leading-[0.85]">
            High
            <br />
            On Drip
          </h1>

          {/* Tagline */}
          <p className="text-background/40 text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-sans mt-8 mb-14">
            Premium Streetwear · Quiet Luxury
          </p>

          {/* CTA */}
          <Link
            to="/shop"
            className="group relative inline-block border border-background/30 text-background px-12 py-4 text-[10px] tracking-[0.35em] uppercase font-sans overflow-hidden transition-all duration-700 hover:border-background/60"
          >
            <span className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-700" />
            <span className="relative">Enter the Drop</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-8 bg-background/20 animate-pulse" />
        </div>
      </section>

      {/* Brand statement — editorial pace */}
      <FadeInSection>
        <section className="py-36 lg:py-52 bg-foreground">
          <div className="container mx-auto px-6 lg:px-10 text-center max-w-4xl">
            <p className="text-background/30 text-[9px] tracking-[0.5em] uppercase font-sans mb-12">
              The Philosophy
            </p>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-background tracking-wide leading-[1.15] uppercase">
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
        <section className="py-28 lg:py-36 bg-background">
          <div className="container mx-auto px-6 lg:px-10 text-center">
            <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground font-sans mb-4">
              Limited Quantities
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground/60 mb-10">
              Each piece, numbered. Each drop, final.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-foreground text-background px-14 py-4 text-[10px] tracking-[0.35em] uppercase font-sans transition-all duration-500 hover:bg-foreground/85"
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
