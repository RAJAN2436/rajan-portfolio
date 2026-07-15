"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Mail, Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const headerHeight = 80;
      let current = "home";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - headerHeight - 20;
        if (window.scrollY >= top) {
          current = section.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-void/80 backdrop-blur-md border-b border-line" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="#home"
          className="font-display text-lg tracking-tight text-ink"
        >
          <span className="text-muted font-normal">Mr</span> {profile.name}
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                active === item.href.slice(1)
                  ? "text-comet"
                  : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-starlight transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-starlight transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-starlight transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-muted hover:text-starlight transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-void/95 backdrop-blur-md border-t border-line px-6 py-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-widest text-muted hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-2">
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="text-muted">
              <Github size={18} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="text-muted">
              <Linkedin size={18} />
            </a>
            <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="text-muted">
              <Instagram size={18} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-muted">
              <Mail size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
