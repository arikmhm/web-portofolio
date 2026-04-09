"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { education, certifications } = portfolioData;

export default function EducationSection() {
  const { locale } = useLocale();

  return (
    <section id="education" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-black">
            {locale === "en"
              ? "Education & Certifications"
              : "Pendidikan & Sertifikasi"}
          </h2>
          <div className="mx-auto h-px w-16 bg-black" />
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Education */}
          <div>
            <h3 className="mb-8 text-sm uppercase tracking-wider text-gray-500">
              {locale === "en" ? "Education" : "Pendidikan"}
            </h3>
            <div className="border border-gray-100 p-6 transition-colors duration-300 hover:border-black">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                {education.year}
              </p>
              <h4 className="mt-2 text-xl font-light tracking-tight text-black">
                {education.university}
              </h4>
              <p className="mt-1 text-sm font-light text-gray-600">
                {education.major} — {education.degree}
              </p>
              <p className="mt-2 text-sm font-light text-gray-500">
                GPA: {education.gpa}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="mb-8 text-sm uppercase tracking-wider text-gray-500">
              {locale === "en" ? "Certifications" : "Sertifikasi"}
            </h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="border border-gray-100 p-6 transition-colors duration-300 hover:border-black"
                >
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    {cert.year}
                  </p>
                  <p className="mt-2 font-light text-black">{cert.name}</p>
                  <p className="mt-1 text-sm font-light text-gray-500">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
