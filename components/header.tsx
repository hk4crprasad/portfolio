"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  // Route-specific disclosure state closes even when navigation occurs via history.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const active = (href: string) =>
    pathname === href || (href === "/work" && pathname.startsWith("/work/"));

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = () => {
      setOpenPath(null);
      toggle.current?.focus();
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpenPath(null);
    };
    const desktop = window.matchMedia("(min-width: 951px)");
    const resize = () => {
      if (desktop.matches) {
        setOpenPath(null);
        header.current?.querySelector<HTMLAnchorElement>(".brand")?.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="header-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? "page" : undefined}
              className={active(link.href) ? "is-active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          className="header-contact"
          href="/contact"
          aria-current={active("/contact") ? "page" : undefined}
        >
          Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>
      <nav
        ref={panel}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
        onBlur={(event) => {
          if (!header.current?.contains(event.relatedTarget as Node))
            setOpenPath(null);
        }}
      >
        <div className="container">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? "page" : undefined}
              onClick={() => {
                setOpenPath(null);
                toggle.current?.focus();
              }}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
