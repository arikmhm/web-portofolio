import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Muhammad Ariyanto",
    username: "arikmhm",
    tagline: {
      id: "Software Engineer | Web Developer",
      en: "Software Engineer | Web Developer",
    },
    bio: {
      id: "Saya adalah seorang Software Engineer lulusan Sistem Informasi yang passionate dalam membangun aplikasi web modern. Dengan pengalaman di berbagai proyek akademik dan freelance, saya fokus pada pengembangan solusi digital yang clean, performant, dan user-friendly. Saya percaya bahwa kode yang baik adalah kode yang mudah dibaca dan di-maintain.",
      en: "I'm a Software Engineer with a degree in Information Systems, passionate about building modern web applications. With experience across academic and freelance projects, I focus on developing clean, performant, and user-friendly digital solutions. I believe great code is code that's easy to read and maintain.",
    },
  },

  socialLinks: {
    github: "https://github.com/arikmhm",
    linkedin: "https://linkedin.com/in/arikmhm",
    email: "mhm.ariyanto@gmail.com",
    cvUrl: "/files/arik-firmansyah-cv.pdf",
  },

  techStack: {
    languages: {
      label: { id: "Bahasa Pemrograman", en: "Languages" },
      items: ["TypeScript", "JavaScript", "PHP", "Python", "SQL"],
    },
    frameworks: {
      label: { id: "Framework", en: "Frameworks" },
      items: ["Next.js", "React", "Laravel", "Express.js", "Tailwind CSS"],
    },
    tools: {
      label: { id: "Tools & Platform", en: "Tools & Platforms" },
      items: ["Git & GitHub", "VS Code", "Figma", "Docker", "Vercel", "Postman"],
    },
    databases: {
      label: { id: "Database", en: "Databases" },
      items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    },
  },

  projects: [
    {
      title: "TaskFlow",
      description: {
        id: "Aplikasi manajemen tugas berbasis web dengan fitur real-time collaboration, drag-and-drop kanban board, dan notifikasi otomatis. Dibangun sebagai proyek skripsi.",
        en: "A web-based task management app featuring real-time collaboration, drag-and-drop kanban board, and automated notifications. Built as a thesis project.",
      },
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Socket.io"],
      notionUrl: "https://www.notion.so/33c30101bd8981409168f285b823678d",
      demoUrl: "https://taskflow-demo.vercel.app",
      githubUrl: "https://github.com/arikmhm/taskflow",
      thumbnail: "/images/projects/taskflow.png",
    },
    {
      title: "EcoTrack",
      description: {
        id: "Dashboard monitoring lingkungan yang memvisualisasikan data kualitas udara dan air secara real-time menggunakan data dari sensor IoT.",
        en: "An environmental monitoring dashboard that visualizes real-time air and water quality data from IoT sensors.",
      },
      techStack: ["React", "TypeScript", "D3.js", "Express.js", "MongoDB", "MQTT"],
      notionUrl: "https://www.notion.so/33c30101bd89816c89ebf7ba37c07023",
      demoUrl: "https://ecotrack-demo.vercel.app",
      githubUrl: "https://github.com/arikmhm/ecotrack",
      thumbnail: "/images/projects/ecotrack.png",
    },
    {
      title: "WarungKu",
      description: {
        id: "Platform e-commerce untuk UMKM lokal dengan fitur manajemen inventori, payment gateway, dan laporan penjualan otomatis.",
        en: "An e-commerce platform for local SMEs featuring inventory management, payment gateway integration, and automated sales reports.",
      },
      techStack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Midtrans API"],
      notionUrl: "https://www.notion.so/33c30101bd8981fe87deff3974800ff3",
      demoUrl: "https://warungku-demo.vercel.app",
      githubUrl: "https://github.com/arikmhm/warungku",
      thumbnail: "/images/projects/warungku.png",
    },
    {
      title: "DevBlog",
      description: {
        id: "Blog pribadi dengan CMS custom, fitur markdown editor, syntax highlighting, dan SEO optimization. Dibangun sebagai side project untuk belajar Next.js.",
        en: "A personal blog with a custom CMS, markdown editor, syntax highlighting, and SEO optimization. Built as a side project to learn Next.js.",
      },
      techStack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "Vercel"],
      notionUrl: "https://www.notion.so/33c30101bd8981ec8fa0eaee3f564e2e",
      demoUrl: "https://devblog-arik.vercel.app",
      githubUrl: "https://github.com/arikmhm/devblog",
      thumbnail: "/images/projects/devblog.png",
    },
  ],

  experiences: [
    {
      position: {
        id: "Frontend Developer Intern",
        en: "Frontend Developer Intern",
      },
      company: "PT Teknologi Nusantara",
      period: "Januari 2025 - April 2025",
      description: {
        id: "Mengembangkan komponen UI untuk dashboard internal perusahaan menggunakan React dan TypeScript. Berkolaborasi dengan tim backend untuk integrasi REST API. Meningkatkan performa halaman sebesar 30% melalui code splitting dan lazy loading.",
        en: "Developed UI components for the company's internal dashboard using React and TypeScript. Collaborated with the backend team on REST API integration. Improved page performance by 30% through code splitting and lazy loading.",
      },
    },
    {
      position: {
        id: "Freelance Web Developer",
        en: "Freelance Web Developer",
      },
      company: "Self-employed",
      period: "Mei 2024 - Desember 2024",
      description: {
        id: "Membangun 5+ website untuk klien UMKM lokal termasuk landing page, toko online, dan company profile. Mengelola proyek dari requirements gathering hingga deployment.",
        en: "Built 5+ websites for local SME clients including landing pages, online stores, and company profiles. Managed projects from requirements gathering to deployment.",
      },
    },
    {
      position: {
        id: "Ketua Divisi IT - Himpunan Mahasiswa Sistem Informasi",
        en: "Head of IT Division - Information Systems Student Association",
      },
      company: "Universitas Diponegoro",
      period: "Agustus 2023 - Juli 2024",
      description: {
        id: "Memimpin tim 8 orang dalam pengembangan website organisasi dan sistem registrasi event. Mengadakan workshop coding untuk 100+ mahasiswa.",
        en: "Led a team of 8 in developing the organization's website and event registration system. Organized coding workshops for 100+ students.",
      },
    },
  ],

  education: {
    university: "Universitas Diponegoro",
    major: "Sistem Informasi",
    degree: "S.Kom (Sarjana Komputer)",
    year: "2022 - 2026",
    gpa: "3.72 / 4.00",
  },

  certifications: [
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta (via Coursera)",
      year: "2024",
    },
    {
      name: "Google UX Design Professional Certificate",
      issuer: "Google (via Coursera)",
      year: "2024",
    },
    {
      name: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services",
      year: "2025",
    },
    {
      name: "Dicoding - Menjadi Front-End Web Developer Expert",
      issuer: "Dicoding Indonesia",
      year: "2024",
    },
  ],

  contact: {
    heading: {
      id: "Mari Bekerja Sama",
      en: "Let's Work Together",
    },
    subheading: {
      id: "Tertarik untuk berkolaborasi atau punya proyek yang ingin didiskusikan? Jangan ragu untuk menghubungi saya.",
      en: "Interested in collaborating or have a project to discuss? Don't hesitate to reach out.",
    },
  },
};
