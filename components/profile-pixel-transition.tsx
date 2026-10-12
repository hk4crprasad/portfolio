"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useMotionEnabled } from "./motion-provider";
import PixelSwap from "./react-bits/PixelSwap";
export function ProfilePixelTransition({
  variant = "hero",
}: {
  variant?: "hero" | "about";
}) {
  const enabled = useMotionEnabled();
  const [active, setActive] = useState(false);
  return (
    <div
      className={`profile-pixel-transition profile-pixel-transition-${variant}`}
    >
      <PixelSwap
        firstContent={<Image
        className="profile-source-image"
        src={profile.avatar}
        alt="Haraprasad Hota"
        fill
        priority={variant === "hero"}
        sizes="(max-width: 560px) 240px, (max-width: 950px) 340px, 460px"
        />}
        secondContent={
          <div className="portrait-profile-note">
            <span className="portrait-monogram" aria-hidden="true">HH</span>
            <span className="eyebrow">AI · Product · Systems</span>
            <strong>{profile.name}</strong>
            <span>{profile.role}<br />Based in Odisha, India.</span>
          </div>
        }
        trigger="click"
        active={active}
        onActiveChange={setActive}
        ariaLabel={active ? "Show portrait" : "Reveal profile note"}
        motionEnabled={enabled}
        aspectRatio="auto"
        className="portrait-pixel-swap"
        pixelSize={36}
        duration={850}
        pixelDuration={350}
        pattern="diagonal"
        pixelRadius={8}
      />
      <span className="portrait-swap-hint" aria-hidden="true">
        {active ? "Return to portrait" : "Reveal profile"}
        <ArrowUpRight size={12} />
      </span>
    </div>
  );
}
