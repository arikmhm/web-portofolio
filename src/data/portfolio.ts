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
      items: [
        "Git & GitHub",
        "VS Code",
        "Figma",
        "Docker",
        "Vercel",
        "Postman",
      ],
    },
    databases: {
      label: { id: "Database", en: "Databases" },
      items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    },
  },

  projects: [
    {
      title: "SIPSATU",
      description: {
        id: "Sistem Informasi Pengelolaan Sampah Tugu — ekosistem aplikasi terintegrasi untuk digitalisasi bank sampah kelurahan. Mencakup mobile app petugas, admin dashboard, dan portal nasabah.",
        en: "Waste Bank Management Information System — an integrated app ecosystem for digitalizing kelurahan-level waste banks. Includes an officer mobile app, admin dashboard, and customer portal.",
      },
      techStack: [
        "Flutter",
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Supabase",
      ],
      notionUrl: "https://www.notion.so/33d30101bd8980b1a093d7a2765d2223",
      demoUrl: "",
      githubUrl: "",
      thumbnail: "/images/projects/sipsatu.png",
    },
    {
      title: "Exantara",
      description: {
        id: "Platform digital yang membantu UMKM Indonesia menembus pasar ekspor global. Fitur utama: web builder untuk membuat toko digital profesional siap ekspor dalam hitungan menit.",
        en: "A digital platform helping Indonesian SMEs break into global export markets. Key feature: a web builder to create professional export-ready digital stores in minutes.",
      },
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
      ],
      notionUrl: "https://www.notion.so/33d30101bd898082b7adf74580559d1c",
      demoUrl: "https://exantara.com",
      githubUrl: "",
      thumbnail: "/images/projects/exantara.png",
    },
    {
      title: "SENSASI 2024",
      description: {
        id: "Web profile Seminar Nasional Sistem Informasi 2024 — landing page informatif dengan info acara, profil pembicara, harga tiket, dan registrasi peserta.",
        en: "SENSASI 2024 national seminar web profile — an informative landing page featuring event details, speaker profiles, ticket pricing, and attendee registration.",
      },
      techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      notionUrl: "https://www.notion.so/33d30101bd898128904fc9e68da82bbe",
      demoUrl: "http://sensasi2024.hmsisfoudinus.org",
      githubUrl: "",
      thumbnail: "/images/projects/sensasi2024.png",
    },
    {
      title: "SENSASI 2025",
      description: {
        id: "Web profile Seminar Nasional Sistem Informasi 2025 — iterasi terbaru dengan tema Transformasi Digital dan tambahan sesi Call for Paper.",
        en: "SENSASI 2025 national seminar web profile — the latest iteration themed Digital Transformation, with an added Call for Paper session.",
      },
      techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      notionUrl: "https://www.notion.so/33d30101bd898128904fc9e68da82bbe",
      demoUrl: "http://sensasi2025.hmsisfoudinus.org",
      githubUrl: "",
      thumbnail: "/images/projects/sensasi2025.png",
    },
    {
      title: "Klasifikasi Aduan LaporGub",
      description: {
        id: "Riset NLP untuk klasifikasi otomatis aduan masyarakat pada platform e-government LaporGub Jawa Tengah. Menggunakan XLM-RoBERTa dengan class weighting pada dataset 53.877 aduan dengan 18 kategori. Tugas Akhir (Skripsi), terpublikasi di jurnal JAIC Sinta 3.",
        en: "NLP research for automatic classification of public complaints on the LaporGub Central Java e-government platform. Uses XLM-RoBERTa with class weighting on a dataset of 53,877 complaints across 18 categories. Thesis project, published in JAIC journal (Sinta 3).",
      },
      techStack: ["Python", "XLM-RoBERTa", "HuggingFace", "Scikit-learn"],
      notionUrl: "https://www.notion.so/33d30101bd898140b8f6ca669267a54e",
      demoUrl: "",
      githubUrl: "",
      thumbnail: "/images/projects/klasifikasi-laporgub.png",
    },
  ],

  experiences: [
    {
      position: {
        id: "Backend Developer Intern",
        en: "Backend Developer Intern",
      },
      company: "PT Mitra Kasih Perkasa (MKP)",
      period: "Agustus 2025 - Februari 2026",
      description: {
        id: "Mengembangkan fitur validasi ticket di salah satu produk utama perusahaan menggunakan Go dan PostgreSQL. ",
        en: "Developed ticket validation features for one of the company's main products using Go and PostgreSQL.",
      },
    },
    {
      position: {
        id: "Asisten Laboratorium - Universitas Dian Nuswantoro",
        en: "Laboratory Assistant - Universitas Dian Nuswantoro",
      },
      company: "Universitas Dian Nuswantoro",
      period: "Juni 2024 - Februari 2025",
      description: {
        id: "Membantu dosen dalam praktikum pemrograman web dasar untuk 60+ mahasiswa. Memberikan bimbingan teknis, menjawab pertanyaan, dan menilai tugas praktikum.",
        en: "Assisted professors in basic web programming labs for over 60 students. Provided technical guidance, answered questions, and evaluated lab assignments.",
      },
    },
  ],

  education: {
    university: "Universitas Dian Nuswantoro",
    major: "Sistem Informasi",
    degree: "S.Kom (Sarjana Komputer)",
    year: "2022 - 2026",
    gpa: "3.93 / 4.00",
  },

  certifications: [
    {
      name: "Introduction to Laravel for Beginners",
      issuer: "HMDTI Universitas Dian Nuswantoro",
      year: "2023",
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
