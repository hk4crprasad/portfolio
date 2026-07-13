import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { Brand } from "./brand";
import { profile } from "@/data/portfolio";
import { Magnet } from "./magnet";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-cta">
        <p className="eyebrow">An idea worth pursuing?</p>
        <Magnet padding={70} magnetStrength={26}>
          <Link href="/contact" className="footer-main-link">
            Let&apos;s make it <ArrowUpRight aria-hidden="true" />
          </Link>
        </Magnet>
      </div>
      <div className="container footer-bottom">
        <Brand />
        <p>From Odisha, building for everywhere.</p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Haraprasad on GitHub">
            <Github size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email Haraprasad">
            <Mail size={17} />
          </a>
        </div>
        <small>© {new Date().getFullYear()} Haraprasad Hota</small>
      </div>
    </footer>
  );
}
