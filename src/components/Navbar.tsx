"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { socialLinks } = portfolioData;

const navLinks = [
  { id: "projects", label: { id: "Proyek", en: "Projects" } },
  { id: "profile", label: { id: "Profil", en: "Profile" } },
  { id: "experience", label: { id: "Pengalaman", en: "Experience" } },
  { id: "education", label: { id: "Pendidikan", en: "Education" } },
  { id: "contact", label: { id: "Kontak", en: "Contact" } },
] as const;

const socials = [
  { Icon: FaGithub, href: socialLinks.github, label: "GitHub" },
  { Icon: FaLinkedin, href: socialLinks.linkedin, label: "LinkedIn" },
];

export default function Navbar() {
  const { locale, toggleLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hamburger button — appears when scrolled or menu open */}
      <AnimatePresence>
        {(isScrolled || menuOpen) && (
          <motion.div
            className="fixed top-0 right-0 z-50 m-6"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <HamburgerButton
              isActive={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full navbar — visible at top, hides on scroll */}
      <nav
        className={`fixed top-0 z-40 w-full border-b border-gray-200 bg-white/90 p-4 backdrop-blur-sm transition-all duration-300 ${
          isScrolled || menuOpen
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="border-r border-gray-200 pr-4 font-bold text-black"
          >
            Arikmhm.
          </a>

          {/* Mobile MENU button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-black px-6 py-2 text-[12px] uppercase tracking-wider text-black transition-colors duration-300 hover:bg-black hover:text-white md:hidden"
          >
            MENU
          </button>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="group relative text-sm text-gray-500 transition-colors hover:text-black"
              >
                {t(link.label)}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side: lang toggle + social icons */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={toggleLocale}
              className="border border-black/20 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-black hover:text-black"
              aria-label={
                locale === "en"
                  ? "Switch to Bahasa Indonesia"
                  : "Switch to English"
              }
            >
              {locale === "en" ? "ID" : "EN"}
            </button>
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-black"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        locale={locale}
        toggleLocale={toggleLocale}
      />
    </>
  );
}

/* ─── Hamburger Button ─── */

function HamburgerButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md transition-all duration-300 hover:border-black/30"
      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Toggle menu"
      aria-expanded={isActive}
    >
      <div className="relative flex h-3 w-4 flex-col items-center justify-center">
        <span
          className={`absolute h-[0.5px] w-full bg-black/90 transition-all duration-300 ${
            isActive ? "rotate-45" : "-translate-y-0.75"
          }`}
        />
        <span
          className={`absolute h-[0.5px] w-full bg-black/90 transition-all duration-300 ${
            isActive ? "-rotate-45" : "translate-y-0.75"
          }`}
        />
      </div>
    </motion.button>
  );
}

/* ─── Mobile Menu ─── */

function MobileMenu({
  menuOpen,
  setMenuOpen,
  locale,
  toggleLocale,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  locale: string;
  toggleLocale: () => void;
}) {
  const { t } = useLocale();
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);

  // Click outside to close (ignore clicks on the hamburger button)
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      const hamburger = document.querySelector("[aria-label='Toggle menu']");
      if (hamburger && hamburger.contains(target)) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    },
    [setMenuOpen],
  );

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, handleClickOutside]);

  // Lock body scroll
  useEffect(() => {
    if (menuOpen) {
      scrollPosition.current = window.scrollY;
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.top = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollPosition.current);
    }
    return () => {
      document.body.style.top = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.07 },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={menuRef}
          className="fixed top-0 right-0 z-40 flex h-full w-full max-w-md flex-col border-l border-gray-800 bg-black/90 backdrop-blur-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex h-full flex-col justify-between px-8 pt-24 pb-8">
            {/* Nav items */}
            <div className="flex flex-col space-y-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  className="flex items-baseline"
                  variants={itemVariants}
                >
                  <span className="w-6 text-sm font-medium text-gray-500">
                    0{index + 1}
                  </span>
                  <a
                    href={`#${link.id}`}
                    className="text-3xl font-light tracking-tight text-white hover:text-gray-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.label)}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom section */}
            <motion.div className="mt-auto pt-12" variants={itemVariants}>
              {/* Language toggle */}
              <button
                onClick={toggleLocale}
                className="mb-8 border border-white/40 px-4 py-2 text-xs uppercase tracking-wider text-gray-300 transition-colors hover:border-white hover:text-white"
              >
                {locale === "en" ? "Bahasa Indonesia" : "English"}
              </button>

              <h3 className="mb-6 text-xs font-medium uppercase tracking-widest text-gray-400">
                Connect
              </h3>
              <div className="flex space-x-5">
                {socials.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-gray-300 transition-colors hover:text-white"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <Icon className="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
                    <span className="text-sm font-light">{label}</span>
                  </motion.a>
                ))}
              </div>

              <p className="mt-12 text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Arikmhm. All rights reserved.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
