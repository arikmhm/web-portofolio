"use client";

import dynamic from "next/dynamic";
import { FaFileDownload } from "react-icons/fa";
import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const GitHubCalendar = dynamic<React.ComponentProps<typeof import("react-github-calendar").GitHubCalendar>>(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar) as never,
  { ssr: false }
);

const { techStack, socialLinks } = portfolioData;

const categories = [
  techStack.languages,
  techStack.frameworks,
  techStack.tools,
  techStack.databases,
];

export default function AboutSection() {
  const { locale, t } = useLocale();

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Technologies */}
        <div className="mb-24">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-light tracking-tight text-black">
              {locale === "en" ? "Technologies" : "Teknologi"}
            </h2>
            <div className="mx-auto mb-4 h-px w-16 bg-black" />
            <p className="font-light text-gray-600">
              {locale === "en"
                ? "Tools and technologies I work with"
                : "Tools dan teknologi yang saya gunakan"}
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={t(category.label)} className="text-center">
                <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400">
                  {t(category.label)}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="border border-gray-200 px-3 py-1.5 text-sm font-light text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download CV */}
        <div className="mb-24 text-center">
          <a
            href={socialLinks.cvUrl}
            download
            className="inline-flex items-center border border-black px-6 py-3 text-sm uppercase tracking-wider transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <FaFileDownload className="mr-2" />
            Download CV
          </a>
        </div>

        {/* GitHub Activity */}
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-sm uppercase tracking-wider text-gray-500">
            {locale === "en" ? "GitHub Activity" : "Aktivitas GitHub"}
          </h3>
          <div className="overflow-x-auto border border-gray-100 p-8">
            <GitHubCalendar
              username="arikmhm"
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              colorScheme="light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
