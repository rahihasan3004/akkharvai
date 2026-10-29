# akkharlabs.com

Source for the Akkhar Labs research website. Static site built with [Astro](https://astro.build), bilingual (English at `/`, Bengali at `/bn/`).

The full build plan is in `plan.md`.

## Run locally

Requires Node.js 22 or newer.

```
npm install
npm run dev       # http://localhost:4321
npm run build     # output in dist/
npm run preview   # serve the built site
```

## Where things are

| Path | What it is |
| --- | --- |
| `src/styles/tokens.css` | Design tokens: colour, type scale, spacing. Change values here only. |
| `src/styles/base.css` | Fonts, reset, base typography |
| `src/i18n/ui.ts` | Interface text in English and Bengali |
| `src/site.config.ts` | Lab facts, contact email, launch switch |
| `src/components/` | Header, Footer, Seo, PageHeader, Section, MetaRow, PubEntry, CodeBlock, Playground, figures |
| `src/views/` | Page bodies shared by `/` and `/bn/` routes |
| `src/pages/` | Routes |
| `brand/` | Logo files: full logo (SVG, PNG) and the green mark alone |
| `public/` | Favicons, logo, manifest, robots.txt |

## Pages

25 pages in each language (50 in total): home, research (2 areas), projects (7 + the playground),
publications (3), notes (2 drafts), Project Ekushey, about, people, contact, news, plus RSS feeds for
news and notes. `/specimen/` is an internal design review page and is never indexed.

## Content

| File | What it holds |
| --- | --- |
| `src/data/lab.ts` | Projects, research areas, publications, news, planned layers |
| `src/data/abstracts.ts` | Paper abstracts (English verbatim, Bengali translation) |
| `src/data/notes.ts` | Lab notes. Both are drafts: set `draft: false` after review |
| `src/projects/*.astro` | The body of each project page |
| `public/papers/` | PDFs served for Google Scholar |

## Share images

`public/og/` holds a 1200×630 image for every page. After adding or renaming a page:

```
npm run build && npm run og
```

## Nirdeshika-16 playground

`src/lib/nirdeshika.ts` is a JavaScript port of Boyon and Shimu. `scripts/verify-nirdeshika.mjs`
compares it with binaries compiled from the C repositories. With Boyon and Shimu cloned and built next
to this folder, run `npm run verify:nirdeshika`.

## Before launch

1. Set `contactEmail` in `src/site.config.ts`.
2. Set `launched: true` in `src/site.config.ts` (removes `noindex` from every page).
3. Point akkharlabs.com's nameservers (at Spaceship) to Cloudflare and connect Cloudflare Pages:
   build command `npm run build`, output directory `dist`.

## Logo

`brand/akkhar-labs-logo.svg` is a vector redraw of the supplied `log.jpeg`.
Colours: green `#006A45`, red `#E81B2C`. Do not recolour or stretch it.
