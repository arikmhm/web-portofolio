"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { experiences } = portfolioData;

export default function ExperienceSection() {
  const { locale, t } = useLocale();

  return (
    <section id="experience" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-black">
            {locale === "en" ? "Experience" : "Pengalaman"}
          </h2>
          <div className="mx-auto mb-4 h-px w-16 bg-black" />
          <p className="font-light text-gray-600">
            {locale === "en"
              ? "My professional journey so far"
              : "Perjalanan profesional saya sejauh ini"}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group border-b border-gray-100 py-10 transition-colors duration-300 first:pt-0 last:border-b-0 hover:border-black"
            >
              <p className="text-xs uppercase tracking-wider text-gray-400">
                {exp.period}
              </p>
              <h3 className="mt-2 text-xl font-light tracking-tight text-black">
                {t(exp.position)}
              </h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-gray-500">
                {exp.company}
              </p>
              <p className="mt-4 text-sm leading-relaxed font-light text-gray-600">
                {t(exp.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
