import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/portfolio";
import { MotionLink } from "./motion-actions";
export function HeroActions() {
  return (
    <div className="hero-actions">
      <MotionLink href="/work" className="button button-lime">
        See selected work
        <ArrowUpRight size={17} aria-hidden="true" />
      </MotionLink>
      <Link href="/contact" className="text-link">
        Start a conversation
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
      <a href={profile.resume} download="Haraprasad-Hota-Resume.pdf" className="text-link">
        Download resume <Download size={17} aria-hidden="true" />
      </a>
    </div>
  );
}
