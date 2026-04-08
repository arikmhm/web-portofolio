"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

const navLinks = [
  { id: "about", label: { id: "Tentang", en: "About" } },
  { id: "tech-stack", label: { id: "Keahlian", en: "Tech Stack" } },
  { id: "projects", label: { id: "Proyek", en: "Projects" } },
  { id: "experience", label: { id: "Pengalaman", en: "Experience" } },
  { id: "education", label: { id: "Pendidikan", en: "Education" } },
  { id: "contact", label: { id: "Kontak", en: "Contact" } },
] as const;

export default function Navbar() {
  const { locale, toggleLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(sectionId: string) {
    setMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold tracking-tight text-neutral-900"
        >
          arikmhm
        </button>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {t(link.label)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: lang toggle + hamburger */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="rounded-[4px] border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
          >
            {locale === "en" ? "ID" : "EN"}
          </button>

          {/* Hamburger button (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-neutral-900 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-neutral-900 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-neutral-900 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="w-full py-3 text-left text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  {t(link.label)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
