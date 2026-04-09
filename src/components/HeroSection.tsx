"use client";

import Image from "next/image";
import { type IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiLaravel,
  SiExpress,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiVercel,
  SiPostman,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { personalInfo, socialLinks } = portfolioData;

type TechIcon = {
  Icon: IconType;
  color: string;
  label: string;
};

const techIcons: TechIcon[] = [
  { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  { Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  { Icon: SiPhp, color: "#777BB4", label: "PHP" },
  { Icon: SiPython, color: "#3776AB", label: "Python" },
  { Icon: SiNextdotjs, color: "#000000", label: "Next.js" },
  { Icon: SiReact, color: "#61DAFB", label: "React" },
  { Icon: SiLaravel, color: "#FF2D20", label: "Laravel" },
  { Icon: SiExpress, color: "#000000", label: "Express.js" },
  { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  { Icon: SiGit, color: "#F05032", label: "Git" },
  { Icon: SiGithub, color: "#181717", label: "GitHub" },
  { Icon: VscCode, color: "#007ACC", label: "VS Code" },
  { Icon: SiFigma, color: "#F24E1E", label: "Figma" },
  { Icon: SiDocker, color: "#2496ED", label: "Docker" },
  { Icon: SiVercel, color: "#000000", label: "Vercel" },
  { Icon: SiPostman, color: "#FF6C37", label: "Postman" },
  { Icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  { Icon: SiMysql, color: "#4479A1", label: "MySQL" },
  { Icon: SiMongodb, color: "#47A248", label: "MongoDB" },
  { Icon: SiFirebase, color: "#DD2C00", label: "Firebase" },
];

// Predefined scattered positions (top%, left%) — hand-tuned to avoid overlap
const positions: [number, number][] = [
  [4, 10],
  [6, 65],
  [18, 35],
  [14, 85],
  [30, 8],
  [26, 55],
  [38, 75],
  [36, 25],
  [48, 5],
  [44, 50],
  [52, 80],
  [56, 30],
  [66, 60],
  [62, 10],
  [72, 40],
  [70, 82],
  [82, 15],
  [78, 60],
  [88, 38],
  [90, 78],
];

export default function HeroSection() {
  const { t } = useLocale();

  return (
    <section id="hero" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        {/* Left — Photo + Info */}
        <div>
          <div className="relative mb-8 h-36 w-36 overflow-hidden rounded-full border border-gray-200">
            <Image
              src="/images/me.png"
              alt={personalInfo.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="mb-8 h-px w-16 bg-black" />
          <h1 className="mb-4 text-5xl font-light tracking-tight text-black sm:text-6xl">
            {personalInfo.name}
          </h1>
          <p className="mb-6 text-lg font-light tracking-wide text-gray-500">
            {t(personalInfo.tagline)}
          </p>
          <p className="mb-10 max-w-lg text-base leading-relaxed font-light text-gray-600">
            {t(personalInfo.bio)}
          </p>
          <div className="flex flex-wrap gap-4">
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
        </div>

        {/* Right — Scattered tech icons */}
        <div className="relative hidden aspect-square md:block">
          {techIcons.map((tech, i) => {
            const [top, left] = positions[i % positions.length];
            return (
              <span
                key={tech.label}
                className="absolute animate-pulse-slow"
                title={tech.label}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                }}
              >
                <tech.Icon className="h-7 w-7" style={{ color: tech.color }} />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
