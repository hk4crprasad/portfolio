"use client";

import { useMotionEnabled } from "./motion-provider";
import TechText from "./react-bits/TechText";

export function HeroTechText() {
  const enabled = useMotionEnabled();
  return enabled ? (
    <TechText
      text="Agentic builder"
      className="hero-tech-text"
      fontSize={42}
      fontWeight={600}
      color="#17241f"
      accentColor="#435d97"
      labels={false}
      draggable={false}
      specks={6}
      speed={1.2}
    />
  ) : (
    <div className="hero-tech-text hero-tech-text-static">Agentic builder</div>
  );
}
