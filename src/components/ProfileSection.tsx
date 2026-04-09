"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { type IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiNextdotjs,
  SiReact,
  SiLaravel,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiGo,
} from "react-icons/si";
import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const GitHubCalendar = dynamic<
  React.ComponentProps<typeof import("react-github-calendar").GitHubCalendar>
>(
  () =>
    import("react-github-calendar").then(
      (mod) => mod.GitHubCalendar
    ) as never,
  { ssr: false }
);

const { personalInfo, socialLinks } = portfolioData;

const technologies: { Icon: IconType; name: string }[] = [
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiLaravel, name: "Laravel" },
  { Icon: SiPhp, name: "PHP" },
  { Icon: SiExpress, name: "Express" },
  { Icon: SiTailwindcss, name: "Tailwind" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiGo, name: "Go" },
];

export default function ProfileSection() {
  const { locale, t } = useLocale();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="profile" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-8">
        {/* Profile Header */}
        <div className="mb-24">
          <div className="flex flex-col items-center">
            <div className="relative h-72 w-56 overflow-hidden sm:h-96 sm:w-72">
              <Image
                src="/images/arik-photo.webp"
                alt={personalInfo.name}
                fill
                priority
                className="object-cover object-top grayscale-50 transition-all duration-300 hover:grayscale-0"
              />
            </div>
            <div className="mt-12 text-center">
              <h1 className="mb-6 text-3xl font-light tracking-tight text-black">
                {personalInfo.name}
              </h1>
              <p className="mb-8 text-sm uppercase tracking-wider text-gray-500">
                {t(personalInfo.tagline)}
              </p>
              <div className="mb-8 flex flex-wrap justify-center gap-4">
                <a
                  href={socialLinks.cvUrl}
                  download
                  className="border border-black px-8 py-3 text-sm uppercase tracking-wider text-black transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  Download CV
                </a>
                <a
                  href="#projects"
                  className="border border-black bg-black px-8 py-3 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-transparent hover:text-black"
                >
                  View Projects
                </a>
              </div>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-600">
                {t(personalInfo.bio)}
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mx-auto mb-24 max-w-3xl">
          <h2 className="mb-12 text-center text-sm uppercase tracking-wider text-gray-500">
            {locale === "en"
              ? "Technologies I Work With"
              : "Teknologi yang Saya Gunakan"}
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {technologies.map(({ Icon, name }) => (
              <div key={name} className="text-center">
                <Icon className="mx-auto mb-3 text-3xl text-black" />
                <h3 className="text-sm font-light text-gray-600">{name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Activity */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-sm uppercase tracking-wider text-gray-500">
            {locale === "en" ? "GitHub Activity" : "Aktivitas GitHub"}
          </h2>
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
