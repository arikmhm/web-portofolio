# Arik MHM — personal website concept

Standalone HTML, CSS, and JavaScript. Run from the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public/studio
```

Preview: http://127.0.0.1:4173/. Through Next.js: `/studio/index.html`.

## Content

English-only solution-focused branding: introduction, problem-to-solution illustration, working principles, a single-row technology marquee, categorized portfolio, experience, and contact. Warm neutral colors with small yellow accents. Native menu, category filters, and email copy. Reduced-motion preferences are respected.

Experience entries are adapted from `src/data/portfolio.ts`: MKP internship and Universitas Dian Nuswantoro laboratory assistant. No roles or dates are invented.

## Add project screenshots

Portfolio cards remain placeholders. Save assets in `public/studio/images/`, then replace the contents of `.project-preview` with an image:

```html
<img src="images/project.webp" alt="Describe the actual interface shown" width="1600" height="1000" loading="lazy">
```

Images fill the frame using `object-fit: cover`. The first card is wide on desktop; check its crop. Update the heading and description inside `.project-caption`, replace “Coming soon,” and add a real project link if available. Duplicate `.project` to add work. Its `data-category` must be `web`, `system`, or `ai`. Update the count on the All work button when adding cards.

The page works without JavaScript: all projects remain visible. Fonts use Google Fonts with system fallbacks.

## Motion and technology logos

The problem-to-solution diagram is static. The compact logo row loops automatically, pauses on hover or keyboard focus, and restores color only on the individual hovered or focused logo. Reduced-motion preferences disable the loop and make the row manually scrollable. The duplicate group is hidden from assistive technology and has no keyboard stops.

Local SVG logos in `images/tech/` come from Devicon v2.17.0 (https://github.com/devicons/devicon). Technologies match the existing portfolio data. No runtime icon dependency or external image request is needed.
