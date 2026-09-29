# Web Portfolio — Muhammad Ariyanto (arikmhm)

Personal website built with [Astro](https://astro.build). Plain CSS and vanilla JavaScript, no UI framework.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
pnpm preview
```

## Structure

```
src/
  pages/index.astro     # page: assembles the sections
  layouts/Layout.astro  # <head>, icon sprite, global CSS + script
  components/           # one component per section (Header, Hero, Approach, ...)
  styles/global.css     # all styling
  scripts/main.js       # menu, filters, email copy, logo marquee, puzzle
public/
  images/tech/          # technology logos (Devicon v2.17.0)
  images/projects/      # project screenshots
  studio/               # original static HTML/CSS/JS design — the reference
```

Editable content lists (tech logos, projects, experience) sit at the top of `TechStack.astro`, `Work.astro`, and `Experience.astro`.

## Design reference

`public/studio/` is the original static version the Astro site reproduces. Keep it; compare against it when changing the design:

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory public/studio
```

It is also served by the Astro build at `/studio/`.
