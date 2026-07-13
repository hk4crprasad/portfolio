"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { StarBorder } from "./star-border";
import { Magnet } from "./magnet";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <Magnet padding={50} magnetStrength={22}>
        <StarBorder as={Link} href="/work" color="#c7f46d" speed="4.5s" className="star-action" style={{ "--star-background": "var(--lime)", "--star-color": "var(--ink)", "--star-border": "rgba(16,23,45,.25)" } as CSSProperties}>
          See selected work <ArrowUpRight size={17} />
        </StarBorder>
      </Magnet>
      <Magnet padding={50} magnetStrength={22}>
        <Link href="/contact" className="button button-ghost">Start a conversation</Link>
      </Magnet>
    </div>
  );
}
