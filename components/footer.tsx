import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { Brand } from "./brand";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-cta">
        <p className="eyebrow">An idea worth pursuing?</p>
        <Link href="/contact" className="footer-main-link">
          Let&apos;s make it <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="container footer-bottom">
        <Brand />
        <p>From Odisha, building for everywhere.</p>
        <div className="footer-links">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Haraprasad on GitHub"
          >
            <Github size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email Haraprasad">
            <Mail size={17} />
          </a>
        </div>
        <small>© {new Date().getFullYear()} Haraprasad Hota</small>
      </div>
      <nav className="container footer-legal" aria-label="Legal information">
        <Link href="/privacy">Privacy & cookies</Link>
        <Link href="/terms">Terms of use</Link>
      </nav>
    </footer>
  );
}
