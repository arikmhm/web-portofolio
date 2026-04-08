"use client";

import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { projects } = portfolioData;

export default function ProjectsSection() {
  const { locale, t } = useLocale();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          {locale === "en" ? "Projects" : "Proyek"}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-neutral-200 transition-colors hover:border-neutral-400"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-neutral-100" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {project.title}
                  </h3>

                  {/* Secondary links */}
                  <div className="flex shrink-0 gap-2">
                    {project.githubUrl && (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.githubUrl, "_blank");
                        }}
                        className="text-neutral-400 transition-colors hover:text-neutral-900"
                        aria-label={`${project.title} GitHub`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                    {project.demoUrl && (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.demoUrl, "_blank");
                        }}
                        className="text-neutral-400 transition-colors hover:text-neutral-900"
                        aria-label={`${project.title} Demo`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {t(project.description)}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-[4px] bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
