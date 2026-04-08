"use client";

import { useLocale } from "@/lib/locale-context";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { portfolioData } from "@/data/portfolio";

const { techStack } = portfolioData;
const categories = [
  techStack.languages,
  techStack.frameworks,
  techStack.tools,
  techStack.databases,
];

export default function TechStackSection() {
  const { locale, t } = useLocale();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="tech-stack" className="px-6 py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          {locale === "en" ? "Tech Stack" : "Keahlian"}
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={t(category.label)}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                {t(category.label)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-[4px] border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
