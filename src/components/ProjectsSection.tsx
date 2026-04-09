"use client";

import { useState, useEffect, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { projects } = portfolioData;

export default function ProjectsSection() {
  const { locale, t } = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleProjects = useMemo(
    () => (showAll ? projects : projects.slice(0, 3)),
    [showAll]
  );

  return (
    <section id="projects" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-black">
            {locale === "en" ? "Selected Projects" : "Proyek Pilihan"}
          </h2>
          <div className="mx-auto mb-4 h-px w-16 bg-black" />
          <p className="font-light text-gray-600">
            {locale === "en"
              ? "A collection of projects showcasing my expertise"
              : "Kumpulan proyek yang menunjukkan keahlian saya"}
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <div
              key={project.title}
              className="group border border-gray-100 bg-white transition-colors duration-300 hover:border-black"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    isMobile
                      ? "grayscale-50"
                      : "grayscale group-hover:grayscale-0"
                  }`}
                />
                {/* Hover overlay with action icons */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60">
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white p-3 text-white transition-colors duration-300 hover:bg-white hover:text-black"
                        aria-label={`${project.title} GitHub`}
                      >
                        <FaGithub className="text-lg" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white p-3 text-white transition-colors duration-300 hover:bg-white hover:text-black"
                        aria-label={`${project.title} Demo`}
                      >
                        <FaExternalLinkAlt className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <a
                  href={project.notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-black hover:underline"
                >
                  {project.title}
                </a>
                <p className="mt-2 text-sm leading-relaxed font-light text-gray-600">
                  {t(project.description)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-gray-200 px-3 py-1 text-xs uppercase tracking-wider text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        {projects.length > 3 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 border border-black px-8 py-3 text-sm uppercase tracking-wider transition-colors duration-300 hover:bg-black hover:text-white"
            >
              {showAll
                ? locale === "en" ? "Show Less" : "Tampilkan Sedikit"
                : locale === "en" ? "View More Projects" : "Lihat Proyek Lainnya"}
              <FaArrowRight className={`text-xs transition-transform duration-300 ${showAll ? "rotate-[-90deg]" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
