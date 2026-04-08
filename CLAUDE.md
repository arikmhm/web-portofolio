# Web Portfolio — Muhammad Ariyanto (arikmhm)

## Project Summary

Personal portfolio website for a fresh graduate Software Engineer (Sistem Informasi). Single-page, scroll-based, bilingual (ID/EN), minimalist monochrome design. Targets recruiters, hiring managers, and potential clients.

## Notion Data Sources

All content is sourced from Notion. Edit data in Notion, then rebuild/update the site.

- **PRD**: Page ID `33c30101-bd89-814b-82ec-f959c5dd1d0f`
- **Portfolio Data (Content Source)**: Page ID `33c30101-bd89-8178-b799-d9b5b5ea7ec1`
- **Project Case Study Pages**:
  - TaskFlow: `33c30101-bd89-8140-9168-f285b823678d`
  - EcoTrack: `33c30101-bd89-816c-89eb-f7ba37c07023`
  - WarungKu: `33c30101-bd89-81fe-87de-ff3974800ff3`
  - DevBlog: `33c30101-bd89-81ec-8fa0-eaee3f564e2e`

## Design Specifications

### Style
- **Approach**: Ultra minimal, clean, monochrome
- **Colors**: Black, gray, white only — no colored accents
- **Theme**: Light background (white/off-white base)
- **Typography**: Inter — bold & high contrast for headings, light/regular for body. Large font size in hero for premium feel
- **Whitespace**: Generous and intentional

### Layout
- Single page, scroll-based
- Fixed navbar with smooth scroll
- Mobile-first responsive

### Border Radius
- **Sharp (0px)**: Navbar, section containers, project cards — precise, engineered feel
- **Slightly rounded (4-6px)**: Buttons, tech stack tags, badges — clickable and friendly
- **Never**: Full rounded / pill-shaped

### Animations
- Subtle only: fade-in / slide-up on scroll via Intersection Observer
- Smooth hover transitions on cards and links
- No heavy animations, parallax, or effects that hurt readability

### Bilingual
- Toggle switch in navbar (ID/EN)
- All content available in both languages

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (via `next/font/google`)
- **Animations**: CSS transitions + Intersection Observer API
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

## Folder Structure

```
src/
  app/          # Next.js App Router pages and layouts
  components/   # Reusable UI components
  data/         # Static data files (portfolio content)
  lib/          # Utility functions (i18n, helpers)
  types/        # TypeScript type definitions
public/
  images/
    projects/   # Project thumbnails/screenshots
  files/        # CV PDF and other downloadable files
```

## Code Conventions

- TypeScript strict mode
- Functional components only
- Tailwind CSS for all styling — no CSS modules or styled-components
- `Bilingual` type (`{ id: string; en: string }`) for all translatable content
- `Locale` type (`"id" | "en"`) for language switching
- All types defined in `src/types/portfolio.ts`
- Component files: PascalCase (e.g., `HeroSection.tsx`)
- Utility files: camelCase (e.g., `useLocale.ts`)
- Semantic HTML with proper heading hierarchy
- Alt text on all images

## Page Sections (in order)

1. **Hero** — Name, tagline, CTA buttons (Download CV, Contact Me)
2. **About** — Short bio (3-5 sentences)
3. **Tech Stack** — Grid/icon display by category
4. **Projects** — Card grid (2-3 cols desktop), click → Notion case study page
5. **Experience** — Timeline/list (internship, freelance, org)
6. **Education & Certifications** — Degree info + cert list
7. **Contact** — Social links + contact form/mailto
8. **Footer** — Copyright + social icons

## Functional Requirements (Priority)

### Must Have
- FR-01: Bilingual toggle (ID/EN) in navbar
- FR-02: Smooth scroll navigation
- FR-03: Responsive design (mobile, tablet, desktop)
- FR-06: Download CV button (PDF)
- FR-07: Contact form / mailto integration
- FR-08: External links to GitHub & LinkedIn

### Should Have
- FR-04: Scroll-based fade-in animation
- FR-05: Project card hover interaction
- FR-09: SEO meta tags & Open Graph
- FR-10: Fast loading (Lighthouse > 90)

## Development Phases

Work must be done phase-by-phase. Do not skip or combine phases.

- **Phase 1**: Project setup, CLAUDE.md, Next.js init, Tailwind, Inter font, folder structure, TS types ← CURRENT
- **Phase 2**: Git repo, .gitignore, README, push to GitHub
- **Phase 3**: Data layer — static data files from Notion content, bilingual utility, types
- **Phase 4**: Layout & navigation — navbar (fixed, smooth scroll, language toggle, mobile hamburger) + footer
- **Phase 5**: Build sections one by one (5a–5g), each with its own commit
- **Phase 6**: Animations & polish (Intersection Observer scroll animations, hover effects)
- **Phase 7**: SEO & branding (favicon, OG image via next/og, meta tags)
- **Phase 8**: Testing & QA (responsive, bilingual, links, Lighthouse > 90)
- **Phase 9**: Deploy to Vercel

## Data Notes

- All current data in Notion is **dummy** — will be replaced with real data later
- CV PDF, professional photo, and project screenshots are not yet available
- Project cards link to Notion pages as primary destination; demo/GitHub links are optional
- Each project MUST have a Notion case study page
