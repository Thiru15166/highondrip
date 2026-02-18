import { useEffect, useState } from "react";
import dragonLogo from "@/assets/logo-full.png";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<"dragon" | "text" | "fadeout">("dragon");

  useEffect(() => {
    // Phase 2: reveal text after 2s
    const textTimer = setTimeout(() => setPhase("text"), 2000);
    // Phase 3: begin fade-out after 4s
    const fadeTimer = setTimeout(() => setPhase("fadeout"), 4000);
    // Phase 4: unmount after fade completes (4s + 800ms transition)
    const doneTimer = setTimeout(() => onComplete(), 4800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`intro-overlay ${phase === "fadeout" ? "intro-fadeout" : ""}`}
      aria-hidden="true"
    >
      {/* Smoke gradient background */}
      <div className="intro-smoke" />

      {/* Fire radial glow behind dragon */}
      <div className="intro-fire-glow" />

      {/* Dragon image */}
      <div className="intro-dragon-wrap">
        <img
          src={dragonLogo}
          alt=""
          className="intro-dragon-img"
          draggable={false}
        />
      </div>

      {/* Brand text — revealed after 2s */}
      <div className={`intro-text-wrap ${phase !== "dragon" ? "intro-text-visible" : ""}`}>
        <span className="intro-text">HIGH ON DRIP</span>
      </div>
    </div>
  );
};

export default IntroScreen;
