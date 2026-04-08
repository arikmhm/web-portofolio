"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { personalInfo, socialLinks } = portfolioData;

export default function HeroSection() {
  const { t } = useLocale();

  return (
    <section id="hero" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-xl text-neutral-500 sm:text-2xl">
          {t(personalInfo.tagline)}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={socialLinks.cvUrl}
            download
            className="inline-flex items-center justify-center rounded-[4px] bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-[4px] border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
