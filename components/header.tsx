"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./brand";
import { Magnet } from "./magnet";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              className={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "is-active" : ""}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Magnet padding={35} magnetStrength={26}>
          <Link className="header-contact" href="/contact">
            Let&apos;s talk <span>↗</span>
          </Link>
        </Magnet>
        <Magnet padding={25} magnetStrength={25}>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={22} />}
          </button>
        </Magnet>
      </div>
      <div className={`mobile-nav ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link className="mobile-contact" href="/contact" onClick={() => setOpen(false)}>
            Start a conversation <span>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
