"use client";

import { useLocale } from "@/lib/locale-context";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { portfolioData } from "@/data/portfolio";

const { personalInfo } = portfolioData;

export default function AboutSection() {
  const { locale, t } = useLocale();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="px-6 py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          {locale === "en" ? "About" : "Tentang"}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
          {t(personalInfo.bio)}
        </p>
      </div>
    </section>
  );
}
