"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { experiences } = portfolioData;

export default function ExperienceSection() {
  const { locale, t } = useLocale();

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          {locale === "en" ? "Experience" : "Pengalaman"}
        </h2>
        <div className="mt-10 space-y-10">
          {experiences.map((exp, i) => (
            <div key={i} className="border-l-2 border-neutral-200 pl-6">
              <p className="text-sm text-neutral-400">{exp.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                {t(exp.position)}
              </h3>
              <p className="text-sm font-medium text-neutral-500">
                {exp.company}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {t(exp.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
