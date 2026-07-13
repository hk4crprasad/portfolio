"use client";

import Image from "next/image";
import { PixelTransition } from "./pixel-transition";
import { profile } from "@/data/portfolio";

type ProfilePixelTransitionProps = { variant?: "hero" | "about" };

export function ProfilePixelTransition({ variant = "hero" }: ProfilePixelTransitionProps) {
  return (
    <PixelTransition
      className={`profile-pixel-transition profile-pixel-transition-${variant}`}
      gridSize={variant === "hero" ? 14 : 16}
      pixelColor={variant === "hero" ? "#c7f46d" : "#10172d"}
      animationStepDuration={.48}
      aspectRatio={variant === "hero" ? "112%" : "118%"}
      firstContent={<Image className="profile-source-image" src={profile.avatar} alt="Haraprasad Hota" fill priority={variant === "hero"} sizes="(max-width: 800px) 88vw, 460px" />}
      secondContent={
        <div className="profile-handle-reveal">
          <span className="profile-reveal-dot" />
          <p>github identity</p>
          <strong>HK4<span>CR</span><br />PRASAD</strong>
          <small>AI Architect · Agentic Builder</small>
        </div>
      }
    />
  );
}
