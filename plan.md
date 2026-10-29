# Akkhar Labs website — full build plan

Oct 29, 2026 · @Rahat Hasan

## 1. Goals, audience and primary tasks

akkharlabs.com launches publicly as a fully bilingual (বাংলা / English) research site. Every project and paper gets its own indexable page, and nothing on it is invented.

**Goals**

- Establish Akkhar Labs as a credible independent research lab in two areas: Bengali-native computing and efficient AI infrastructure.
- Rank for Bengali-computing and agent-context-efficiency searches in both languages.
- Get the papers indexed by Google Scholar and cited correctly.
- Turn visitors into users of the Nirdeshika SDK and readers of the papers.

**Audiences and what each comes to do**

| Audience | Primary task | Page that serves it |
| --- | --- | --- |
| Researchers and engineers (LLM inference, systems) | Read and cite HashedContext and ZRCP | Paper pages, with PDF, DOI and BibTeX |
| Bengali-speaking students and teachers | Learn what Nirdeshika is and try Bengali assembly | Project pages in বাংলা, SDK install |
| Developers | Install the SDK, find the source code | /projects/nirdeshika-sdk/, GitHub links |
| Press, funders, collaborators | Understand the mission and who is behind it | Home, Ekushey, About, Contact |
| Search engines and Scholar | Read structured metadata | JSON-LD, citation\_\* tags, sitemap |

**Out of scope:** Brud Code and Brud Prime have their own site, and Sover is dropped. Truck Pai, aura-arc and akkhar-magic stay off the lab site because they are not research.

## 2. Design rules (binding)

The Avoid / Require list is the acceptance test for every page. Any element that does not improve credibility, comprehension, navigation or research discovery is removed.

**Never on the site**

- Gradients, glow, neon, glassmorphism, orbs, blur.
- Box shadows of any kind. Separation comes from hairline rules and white space only.
- Pill shapes, badge clusters, floating panels, stacked rounded cards. Corner radius is 0 everywhere except focus outlines.
- Decorative motion, parallax, scroll-triggered reveals, auto-playing media. The only motion is a short colour change on hover and focus, and it is off under `prefers-reduced-motion`.
- Startup copy ("revolutionary", "cutting-edge", "unlock") and oversized marketing headlines.
- Stock photos, AI-generated imagery, fake figures, invented statistics, publications or collaborators.
- The same card grid repeated across sections.

**Always**

- One editorial, document-like identity on every page: home, project, paper, note, person, news, 404.
- Status is shown as plain text in a metadata row (`Status: Specification complete`), not a coloured pill.
- Measured results and analytical projections are labelled separately, as the papers themselves do.
- Missing content is labelled plainly, for example "Portrait not yet available" or "Collaborators: none to date". Placeholders are never presented as real.
- Figures are SVG redrawn from the real specs and papers (the stack layers, the HashedContext prompt layout, the Nirdeshika instruction format), with captions and sources.

## 3. Content inventory

Everything below is verified from the public repos and Zenodo records as of 29 Oct 2026. The last table lists what must be written, fixed or labelled as missing before launch.

**Publications (verified)**

| Title | Date | Identifier | Licence | Notes |
| --- | --- | --- | --- | --- |
| [Scaling GPU KV-Cache Efficiency and Inference Concurrency for Autonomous Agents with HashedContext](https://zenodo.org/records/23698048) | 27 Oct 2026 | DOI 10.5281/zenodo.23698048 (v0.2); concept DOI 10.5281/zenodo.23668957 | CC BY 4.0 | Preprint, not peer-reviewed; v0.1 26 Oct 2026 |
| [Zero-Redundancy Context Protocol (ZRCP)](https://zenodo.org/records/21955969) | 15 Aug 2026 | DOI 10.5281/zenodo.21955969 | CC BY 4.0 | Protocol spec v1.0.0 |
| [Nirdeshika-16 specification](https://github.com/akkhar-labs/Nirdeshika-16) | 2026 | No DOI yet | CC BY-NC 4.0 | Spec PDF in repo |

**Projects (verified status)**

| Project | Area | Status | Source |
| --- | --- | --- | --- |
| Nirdeshika-16 ISA | Bengali computing | Specification complete | [repo](https://github.com/akkhar-labs/Nirdeshika-16) |
| Boyon assembler (C, GPL-3.0) | Bengali computing | Working | [repo](https://github.com/akkhar-labs/Boyon) |
| Shimu simulator (C, GPL-3.0) | Bengali computing | Working | [repo](https://github.com/akkhar-labs/Shimu) |
| Nirdeshika SDK + APT repo | Bengali computing | Released | [repo](https://github.com/akkhar-labs/nirdeshika-sdk) |
| Akkhar-Hex number system | Bengali computing | Defined | [Project Ekushey](https://github.com/akkhar-labs/project-ekushey) |
| Akkhar-Lipi 7/8, Kotha, BAPS, Matrika OS, AKFS, Nirdeshika-32/64 | Bengali computing | Planned or in design | Project Ekushey |
| ZRCP | AI infrastructure | Spec v1.0.0 published | [repo](https://github.com/rahatarch/zrcp) |
| HashedContext | AI infrastructure | Preprint v0.2; reference implementation planned | [repo](https://github.com/rahatarch/hashedcontext) |
| Akkhar-Druti-1 | AI | In research | Org README only |

**People:** Rahat Hasan, founder and researcher, Bogura, Bangladesh. ORCID 0009-0003-6184-5269, GitHub @rahatarch, contact rahathasan5773@gmail.com.

**Must resolve or label before launch**

| Item | Action |
| --- | --- |
| ZRCP savings figure: README says 69,631, but 85,455 − 18,990 = 66,465 | Correct in the repo; the site uses the corrected figure |
| "Akshar-Lipi" vs "Akkhar-Lipi" spelling | Pick one; the site uses it everywhere |
| ZRCP Zenodo record has no abstract or keywords | Add them on Zenodo |
| Portrait and lab photos | None exist; profile shows a typographic monogram labelled "Portrait not yet available" |
| Collaborators, funders, affiliations | None stated; section omitted until real |
| Bengali translations of all copy | Written by a person, not machine-translated |
| Akkhar-Druti-1 details | Listed as "In research" with one line only, until there is something to publish |
| Lab notes | At least two real notes at launch (see section 10) |

## 4. Information architecture

The site has six sections and about 20 pages per language at launch. Projects and Publications, outlined in colour, are the main search entry points.

&#91;embedded content: akkharlabs.com sitemap · 6 sections, en at / and bn at /bn/\]

URL rules: lowercase, hyphenated, trailing slash, identical slugs in both languages (`/projects/boyon/` ↔ `/bn/projects/boyon/`). Main navigation: Research · Projects · Publications · Notes · Ekushey · About, plus the বাং / EN switch.

## 5. Page templates

Eight templates cover every page. All of them share one header, breadcrumb, footer and metadata-row component.

| Template | Used by | Contents, top to bottom |
| --- | --- | --- |
| Home | / and /bn/ | Mission sentence in both scripts · short lab description · two research areas as text columns · Akkhar Stack figure with plain-text status · selected publications (editorial list) · latest 3 notes and news · footer |
| Research area | /research/\<area>/ | Problem statement · approach · projects in this area (list) · related publications · open questions |
| Project | /projects/\<slug>/ | Title + one-line summary · metadata row (status, licence, language, repository, version, last updated) · overview · figure · technical detail · how to use or install · related papers and notes · cite this |
| Publication | /publications/\<slug>/ | Full title · authors with ORCID · date, version, DOI, licence · abstract · key results with measured and projected labelled · PDF download · BibTeX and APA with copy button · version history · related project |
| Publications index | /publications/ | Reverse-chronological editorial list: year heading, title, authors, type, DOI, PDF link. Filter by area and type, which still works without JavaScript |
| Note | /notes/\<slug>/ | Title · date and author · long-form text at 68ch · figures with captions · footnotes and references · related work |
| Person | /people/\<slug>/ | Name · role · location · bio · ORCID, GitHub, email · publications and projects by this person · portrait slot, labelled when missing |
| Utility | /about/, /contact/, /news/, /ekushey/, 404 | Same reading column; /news/ is a dated log table, newest first |

The **Project** page and the **Publication** page are the two representative inner pages. They are designed and approved together with Home before any other page is built.

## 6. Design system

The identity is a printed technical journal: paper, ink, one red, and Bengali type treated as the lead element. Tokens are defined first, in `tokens.css`. Components may only use tokens, never raw values.

**Typography**

| Role | Latin | Bengali | Use |
| --- | --- | --- | --- |
| Reading and headings | Source Serif 4 | Noto Serif Bengali | Titles, abstracts, notes, body |
| Display (Bengali only) | — | Tiro Bangla | Mission line, Bengali page titles |
| Interface | IBM Plex Sans | Noto Sans Bengali | Navigation, metadata, tables, buttons |
| Code | IBM Plex Mono | Noto Sans Bengali (fallback) | Assembly listings, install commands |

All fonts are OFL-licensed, self-hosted as WOFF2, subset, and loaded with `font-display: swap` and a metric-matched fallback so text does not shift.

**Type scale:** a 1.25 ratio on an 18px body, giving 14 · 16 · 18 · 22.5 · 28 · 35 · 44 px. The page title (h1) is 44px at most, so there are no oversized headlines. Latin text uses line-height 1.6 and Bengali 1.8, because its stacked vowel signs need room. The reading column is 68 characters wide.

**Colour**

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| --paper | #F7F5F0 | #141412 | Page background |
| --ink | #1A1A18 | #ECEAE4 | Body text, headings |
| --ink-2 | #55534E | #A8A59D | Metadata, captions |
| --rule | #D9D5CC | #34322E | Hairlines, table rules |
| --accent (Ekushey red) | #9E1B1B | #E07A6E | Links on hover, current nav item, figure highlights. Nothing else |
| --focus | #9E1B1B | #E07A6E | 2px solid focus outline, offset 2px |

Every text and background pair must meet WCAG AA contrast (4.5:1, or 3:1 for large text). It is checked in CI.

**Spacing and grid**

- 4px base unit; spacing scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- 12-column grid, 1200px maximum width, 24px gutters, 16px side margins on mobile.
- Breakpoints at 640, 960 and 1200px.
- Long-form pages use the reading column, with a side metadata column at 960px and wider.

**Components (the complete set)**

- Site header with a বাং / EN switch that links to the same page in the other language.
- Breadcrumb, footer, skip link.
- Metadata row: label and value pairs separated by hairlines.
- Editorial publication entry and project list entry.
- Figure with caption and source line.
- Code block with copy button.
- Citation block with BibTeX and APA.
- Dated log table, footnotes, and a search field (Pagefind).

No cards, no pills, no modals, no carousels.

## 7. SEO plan

Every project and paper gets its own page, with one main search intent, full structured data and a Bengali twin. Every SEO tag is generated from the content files, so a new page is fully optimised as soon as its Markdown file exists.

**On every page (generated)**

- A unique `<title>` of 60 characters or fewer, in the form "Page — Akkhar Labs", and a meta description of 150–160 characters.
- A self-referencing canonical URL and `hreflang` links for en, bn and x-default.
- `<html lang>` set correctly for each language.
- Open Graph and Twitter tags, with a typographic share image (1200×630) rendered at build time from the title. No imagery.
- Breadcrumb JSON-LD and a visible breadcrumb.
- One h1, with headings in order.

**Structured data (JSON-LD) by template**

| Template | Schema.org types |
| --- | --- |
| Home | `ResearchOrganization` (name, url, logo, founder, address Bogura BD, sameAs: GitHub, Zenodo, ORCID) + `WebSite` with SearchAction |
| Person | `Person` (name, jobTitle, affiliation, sameAs: ORCID, GitHub) |
| Publication | `ScholarlyArticle` (headline, author with ORCID, datePublished, identifier DOI, license, isPartOf, encoding PDF) |
| Project (software) | `SoftwareSourceCode` (codeRepository, programmingLanguage, license) or `SoftwareApplication` for the SDK |
| Project (spec) and Note | `TechArticle` |
| News | `Article` / `NewsArticle` |

**Academic indexing (Google Scholar)**

- Every paper page carries `citation_title`, `citation_author`, `citation_publication_date`, `citation_doi`, `citation_pdf_url`, `citation_publisher` and `citation_language`.
- The PDF is served from the same domain at `/papers/<slug>.pdf`. Scholar expects the PDF to sit next to the HTML page.
- Zenodo stays the DOI of record. The site's paper page is the readable landing page and links to the DOI.
- A `CITATION.cff` file and the BibTeX on each page match each other exactly.

**Bilingual setup**

- English at `/`, Bengali at `/bn/`, with identical slugs. Both are fully human-written, and every page links to its twin.
- Bengali page titles and descriptions are written for Bengali search phrasing, not translated word for word.

**Target queries (one main intent per page)**

| Page | English | বাংলা |
| --- | --- | --- |
| Nirdeshika-16 | Bengali instruction set architecture; Bangla assembly language | বাংলা প্রসেসর; বাংলা অ্যাসেম্বলি ভাষা |
| Nirdeshika SDK | Bengali programming toolchain; install Nirdeshika SDK | বাংলায় প্রোগ্রামিং |
| Boyon / Shimu | Bengali assembler; ISA simulator | বাংলা অ্যাসেম্বলার |
| Akkhar-Hex | Bengali hexadecimal number system | বাংলা হেক্সাডেসিমাল |
| Project Ekushey | Bengali computing stack; language sovereignty computing | বাংলা কম্পিউটিং; একুশে |
| HashedContext | KV-cache efficiency for coding agents; LLM context deduplication | — (English-first topic) |
| ZRCP | Redundant context transmission in AI agents | — |

These are starting hypotheses. After launch, Search Console query data replaces them.

**Technical**

- `sitemap-index.xml` with hreflang alternates, `robots.txt`, RSS feeds for notes and news, and a real 404 page that returns HTTP 404.
- Trailing-slash URLs everywhere, a 301 redirect from www to the bare domain, and HTTPS only.
- Planned layers (Kotha, BAPS, Matrika, AKFS, Akkhar-Lipi) are sections of /research/bengali-native-computing/ until they have real content, so there are no near-empty pages.
- Internal linking: area → project → paper → note and back. Every page has a "Related" block.

**Off-site, done on launch day**

- Set the website field to akkharlabs.com on the GitHub org, every repo, ORCID, Zenodo records, the VS Code publisher profile and Hugging Face.
- Add an "is documented by" related identifier on each Zenodo record, pointing to its paper page.
- Verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap, and request indexing of the 10 key pages.
- Update every repo README with a link to its project page.

## 8. Tech stack and repository

The site is a static Astro build with plain CSS tokens and Markdown content, hosted on Cloudflare Pages at akkharlabs.com. Pages ship no JavaScript except for search and copy buttons.

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Astro (current stable), TypeScript | Static HTML output; content collections with typed schemas; built-in i18n routing for en/bn |
| Content | Markdown / MDX in `src/content/` | One file per project, paper, note, person, news item. Schemas reject a page with missing title, description or DOI |
| Styling | Plain CSS: `tokens.css` + one CSS file per component | No framework look; tokens enforce the scales |
| Fonts | Self-hosted WOFF2, subset with `glyphhanger` / `pyftsubset` | Fast loading; no third-party font requests |
| SEO | `@astrojs/sitemap`, `@astrojs/rss`, own `<Seo>`, `<JsonLd>` and `<ScholarMeta>` components | All tags generated from content |
| Share images | `satori` + `resvg` at build | Typographic share images for every page |
| Search | Pagefind | Static index, supports Bengali, no server |
| Figures | Hand-made SVG, inlined | Sharp, accessible (`<title>`, `<desc>`), themeable |
| Analytics | Cloudflare Web Analytics | Cookieless, so no consent banner is needed |
| Hosting and DNS | Cloudflare Pages + Cloudflare DNS for akkharlabs.com | Free; edge locations in Dhaka and nearby; preview deploy for every branch |
| CI checks | GitHub Actions: `astro check`, html-validate, lychee (links), pa11y-ci / axe (accessibility), Lighthouse CI | Blocks any merge that breaks a rule |
| Contact | `mailto:` link and a plain address | No form is needed, so no backend |
| Later | Shimu compiled to WebAssembly with Emscripten, served at /projects/nirdeshika-16/playground/ | Lets visitors run Bengali assembly in the browser |

**Repository:** `akkhar-labs/akkharlabs.com`, working copy at `D:\akkhar-labs`.

```
akkharlabs.com/
├─ public/
│  ├─ fonts/            subset WOFF2
│  ├─ papers/           hashedcontext-2026.pdf, zrcp-2026.pdf, nirdeshika-16-spec.pdf
│  └─ robots.txt
├─ src/
│  ├─ content/
│  │  ├─ projects/{en,bn}/*.md
│  │  ├─ publications/{en,bn}/*.md
│  │  ├─ research/{en,bn}/*.md
│  │  ├─ notes/{en,bn}/*.mdx
│  │  ├─ people/{en,bn}/*.md
│  │  └─ news/{en,bn}/*.md
│  ├─ content.config.ts   schemas (zod)
│  ├─ components/         Header, Footer, Breadcrumb, MetaRow, PubEntry, Figure, Code, Cite, Seo, JsonLd, ScholarMeta
│  ├─ layouts/            Base, Reading, Index
│  ├─ pages/[...lang]/    routes for / and /bn/
│  ├─ i18n/               ui strings en.json, bn.json
│  └─ styles/             tokens.css, base.css, components/*.css
├─ astro.config.mjs
├─ CITATION.cff
└─ .github/workflows/ci.yml
```

## 9. Accessibility, performance and QA

A page ships only when it passes every item below, on desktop and on a 360px-wide phone, in both languages.

**Accessibility (WCAG 2.2 AA)**

- [ ] Semantic landmarks (`header`, `nav`, `main`, `footer`) and a skip link as the first focusable element
- [ ] Full keyboard navigation with a visible 2px focus outline on every interactive element
- [ ] Contrast checked for every token pair, in light and dark
- [ ] Every figure has alt text or `<title>`/`<desc>` describing what it shows, not "diagram"
- [ ] `lang` attribute set on the page and on any mixed-language span
- [ ] Headings in order, with no skipped levels
- [ ] Pages reflow at 320px and are usable at 200% zoom
- [ ] Reduced-motion setting respected

**Performance targets (mobile, slow 4G)**

| Metric | Target |
| --- | --- |
| Largest Contentful Paint | ≤ 1.8 s |
| Cumulative Layout Shift | ≤ 0.02 |
| Interaction to Next Paint | ≤ 100 ms |
| JavaScript per page | ≤ 15 kB, except search |
| Fonts per page | ≤ 4 files, ≤ 120 kB total |
| Lighthouse (performance, accessibility, best practices, SEO) | 100 each |

**Content and layout tests**

- [ ] The longest real title (the HashedContext paper) wraps cleanly at every width
- [ ] Bengali and English pages have matching structure and working language switches
- [ ] All links resolve, including DOIs, GitHub and PDFs (checked by lychee in CI)
- [ ] Copy buttons work and the page reads correctly with JavaScript turned off
- [ ] Print stylesheet for paper pages, with no navigation and URLs printed after links
- [ ] Rich Results Test passes for each JSON-LD type, and Scholar tags are present on every paper page

## 10. Build phases and launch

There are six phases, each ending in a review gate. Nothing moves on until its gate passes. Phases 1–3 start today.

1. **Foundation.** Set up the Astro project, en/bn routing, `tokens.css`, fonts, base layout, CI and a Cloudflare preview.
   - Gate: the token sheet and type specimen page are approved in both scripts.
2. **Home and two representative pages.** Build Home, /projects/nirdeshika-16/ and /publications/hashedcontext-2026/ with real content.
   - Gate: design review against section 2, plus mobile and keyboard testing.
3. **Remaining templates.** Build the research area, project and publication indexes, note, person, about, contact, Ekushey, news and 404 pages.
   - Gate: every template reviewed for consistency.
4. **Content.** Write all English pages, then all Bengali pages (written by a person), redraw the SVG figures and copy the PDFs.
   - Gate: every fact traced to a repo or a Zenodo record; missing items labelled.
5. **SEO and QA.** Add JSON-LD, Scholar tags, sitemap, share images and RSS, and run the full checklist in section 9.
   - Gate: all CI checks green; Lighthouse at 100.
6. **Launch.** Point akkharlabs.com DNS to Cloudflare Pages, turn on HTTPS and redirects, then do the off-site steps in section 7.

**Launch content (minimum real set)**

- [ ] Home (en, bn)
- [ ] 2 research area pages
- [ ] 7 project pages: Nirdeshika-16, Boyon, Shimu, Nirdeshika SDK, Akkhar-Hex, ZRCP, HashedContext
- [ ] 3 publication pages, plus the index
- [ ] Ekushey, About, Contact, People/Rahat Hasan, News
- [ ] 2 lab notes, drafted by Rahat. Suggested topics: why Akkhar-Hex uses consonants for 10–15, and why Bengali computing is not a translation layer
- [ ] Every page above in Bengali

**After launch**

- Nirdeshika playground (Shimu compiled to WebAssembly).
- arXiv submission of HashedContext.
- Kotha and Akkhar-Lipi pages, once their specs exist.
- Real portrait and lab photographs, once taken.

## 11. Open items

- [ ] Where akkharlabs.com is registered: DNS moves to Cloudflare, or a CNAME is added at the current registrar
- [ ] The public contact address: use rahathasan5773@gmail.com, or set up an address such as contact@akkharlabs.com
- [ ] Canonical spelling: Akkhar-Lipi or Akshar-Lipi
- [ ] Who writes or reviews the Bengali copy
- [ ] Whether Akkhar-Druti-1 appears at launch (currently one line, "In research")
- [ ] Logo: a typographic wordmark (অক্ষর + Akkhar Labs) set in Tiro Bangla and Source Serif, unless one already exists

**Sources:** [akkhar-labs on GitHub](https://github.com/akkhar-labs) · [Nirdeshika-16](https://github.com/akkhar-labs/Nirdeshika-16) · [Project Ekushey](https://github.com/akkhar-labs/project-ekushey) · [HashedContext repo](https://github.com/rahatarch/hashedcontext) · [HashedContext on Zenodo](https://zenodo.org/records/23698048) · [ZRCP repo](https://github.com/rahatarch/zrcp) · [ZRCP on Zenodo](https://zenodo.org/records/21955969)
