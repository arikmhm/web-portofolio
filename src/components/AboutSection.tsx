"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { personalInfo } = portfolioData;

export default function AboutSection() {
  const { locale, t } = useLocale();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
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
