import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function HeroActions() {
  return (
    <div className="hero-actions">
      <Link href="/work" className="button button-lime">
        See selected work
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
      <Link href="/contact" className="text-link">
        Start a conversation
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
