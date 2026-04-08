"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { education, certifications } = portfolioData;

export default function EducationSection() {
  const { locale } = useLocale();

  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          {locale === "en"
            ? "Education & Certifications"
            : "Pendidikan & Sertifikasi"}
        </h2>

        <div className="mt-10 grid gap-12 sm:grid-cols-2">
          {/* Education */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              {locale === "en" ? "Education" : "Pendidikan"}
            </h3>
            <div className="mt-4 border-l-2 border-neutral-200 pl-6">
              <p className="text-sm text-neutral-400">{education.year}</p>
              <h4 className="mt-1 text-lg font-semibold text-neutral-900">
                {education.university}
              </h4>
              <p className="text-sm text-neutral-600">
                {education.major} — {education.degree}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                GPA: {education.gpa}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              {locale === "en" ? "Certifications" : "Sertifikasi"}
            </h3>
            <ul className="mt-4 space-y-4">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="border-l-2 border-neutral-200 pl-6"
                >
                  <p className="text-sm text-neutral-400">{cert.year}</p>
                  <p className="mt-0.5 font-medium text-neutral-900">
                    {cert.name}
                  </p>
                  <p className="text-sm text-neutral-500">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
