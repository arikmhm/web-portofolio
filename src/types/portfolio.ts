export type Locale = "id" | "en";

export type Bilingual = {
  id: string;
  en: string;
};

export type PersonalInfo = {
  name: string;
  username: string;
  tagline: Bilingual;
  bio: Bilingual;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  email: string;
  cvUrl: string;
};

export type TechStackCategory = {
  label: Bilingual;
  items: string[];
};

export type TechStack = {
  languages: TechStackCategory;
  frameworks: TechStackCategory;
  tools: TechStackCategory;
  databases: TechStackCategory;
};

export type Project = {
  title: string;
  description: Bilingual;
  techStack: string[];
  notionUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  thumbnail: string;
};

export type Experience = {
  position: Bilingual;
  company: string;
  period: string;
  description: Bilingual;
};

export type Education = {
  university: string;
  major: string;
  degree: string;
  year: string;
  gpa: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export type ContactSection = {
  heading: Bilingual;
  subheading: Bilingual;
};

export type PortfolioData = {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  techStack: TechStack;
  projects: Project[];
  experiences: Experience[];
  education: Education;
  certifications: Certification[];
  contact: ContactSection;
};
