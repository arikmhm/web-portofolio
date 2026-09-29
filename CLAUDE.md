# Web Portfolio — Muhammad Ariyanto (arikmhm)

## Project Summary

Personal portfolio website for a fresh graduate Software Engineer (Sistem Informasi). Single-page, scroll-based, English-only site that reproduces the "studio" design in `public/studio/`. Targets recruiters, hiring managers, and potential clients.

## Notion Data Sources

All content is sourced from Notion. Edit data in Notion, then rebuild/update the site.

- **PRD**: Page ID `33c30101-bd89-814b-82ec-f959c5dd1d0f`
- **Portfolio Data (Content Source)**: Page ID `33c30101-bd89-8178-b799-d9b5b5ea7ec1`
- **Project Case Study Pages**:
  - TaskFlow: `33c30101-bd89-8140-9168-f285b823678d`
  - EcoTrack: `33c30101-bd89-816c-89eb-f7ba37c07023`
  - WarungKu: `33c30101-bd89-81fe-87de-ff3974800ff3`
  - DevBlog: `33c30101-bd89-81ec-8fa0-eaee3f564e2e`

## Stack

- **Framework**: Astro (static output), TypeScript strict
- **Package manager**: pnpm — never npm/yarn
- **Styling**: plain CSS in `src/styles/global.css` — no Tailwind
- **Script**: vanilla JS in `src/scripts/main.js`, loaded from `Layout.astro`
- **Fonts**: DM Sans + IBM Plex Mono (Google Fonts, imported in CSS), Georgia for `<em>`
- **Deployment**: Vercel

## Design Reference — `public/studio/`

`public/studio/` (HTML/CSS/JS "studio" concept) is the **source of truth for the design**. The Astro site must render identically to it.

- **Never delete or modify `public/studio/`** unless explicitly asked.
- Design changes: agree whether to change the reference first, then mirror into Astro.
- Verify parity by serving both (`.claude/launch.json` has `astro` on 4321 and `studio` on 4173) and comparing layout at desktop and mobile widths.

Design summary: English-only, warm neutral palette (`--paper #f7f7f2`, `--ink #222320`) with small yellow accents (`--yellow #e3c83d`), large editorial headings with serif italic `<em>`, respects `prefers-reduced-motion`.

## Structure

```
src/
  pages/index.astro     # assembles sections
  layouts/Layout.astro  # head, SVG icon sprite, global CSS + script
  components/           # Header, Hero, Approach, About, TechStack, Work, Experience, Contact, Footer, Arrow
  styles/global.css     # copied from public/studio/styles.css
  scripts/main.js       # copied from public/studio/script.js
public/
  images/tech/          # Devicon SVG logos
  images/projects/      # project screenshots
  studio/               # design reference (do not delete)
```

## Page Sections (in order)

1. **Header** — wordmark, nav, dialog menu (appears as floating button after scroll)
2. **Hero** — "Real problems. The right solution."
3. **Approach** — five puzzle-piece stages (SVG shapes drawn by script)
4. **About** — intro + three working principles
5. **Tech Stack** — looping logo marquee
6. **Work** — portfolio grid with category filters (`web`, `system`, `ai`)
7. **Experience** — role list
8. **Contact** — mailto + copy email
9. **Footer**

## Code Conventions

- Keep markup and class names identical to the reference so `global.css` and `main.js` keep working unchanged.
- Content lists live as arrays in component frontmatter (`TechStack`, `Work`, `Experience`).
- Component files: PascalCase. Semantic HTML, alt text on all images.

## Data Notes

- Experience entries come from real data (MKP internship, UDINUS lab assistant). Do not invent roles or dates.
- Portfolio cards are placeholders until real screenshots are added (see `public/studio/README.md`).
