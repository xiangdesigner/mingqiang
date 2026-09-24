# 茗強地政與土管 — Ming Chiang Land Economics & Land Management

Redesign of the existing 茗強地政與土管 website, implemented from the Figma handoff board (茗強官網｜Dev Handoff). The mockup is the visual source of truth; the existing site (https://www.594mcreaf594.com/) is the source of truth for all pages, navigation, links and text.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- CSS custom properties + CSS Modules (no utility framework)
- GSAP for the page transition, Lenis for smooth scrolling (both off under `prefers-reduced-motion`)
- Font: Noto Sans TC via `next/font`

## Run

```bash
npm install
npm run dev -- --port 3100   # http://localhost:3100
npm run build                # static export to out/ — see Deployment below
```

## What the design specifies

From the Figma board's notes (all applied):

- **Homepage only keeps the hero banner.** Inner pages start with the page title directly below the shared header, with consistent top spacing (`components/ui/PageTitle`).
- **Hero copy is real text**, not a baked-in image: kicker, two-line headline, description, top-right tagline, and the small English label. The background is the supplied text-free image. The hero is carousel-ready — dots and auto-advance appear once more than one slide exists in `components/home/HeroBanner.tsx`.
- **Service cards keep a photo strip at the bottom; the Academy section keeps the large image on the left.**
- **Nothing was removed because the mockup omits it.** The header menu mirrors the existing site exactly, including the 服務項目 / 茗強學院 dropdowns, and every existing page has a route (see Routes).

## Content

Everything textual lives in `content/`. Text was transcribed from the live site; nothing was invented.

| File | Holds | Source |
| --- | --- | --- |
| `content/site.ts` | name, address, phone, fax, email, LINE, copyright, navigation; `mockup` = copy that exists only in the Figma mockup | existing site + mockup |
| `content/news.ts` | the four 最新消息 items with full detail bodies and forum photo galleries | existing site |
| `content/services.ts` | six services: names, card taglines (mockup), full page bodies | existing site + mockup |
| `content/about.ts` | 關於我們 sections 01–06 (incl. the timeline transcribed from the old graphic), founder CV, 人才招募, contact parking info | existing site |
| `content/academy.ts` | 學院簡介 text, 電子刊物 placeholders (as on the existing site), 20 相關連結 with descriptions | existing site |
| `content/track.ts` | 服務實績: 16 accordion items, ~260 table rows | generated from the live page |
| `content/courses.ts` | 茗強課程: 55 entries with dates, blurbs and their original Google Drive links | generated from the live pages |

### Items flagged for the client (per the Figma note "請先標註給我")

- **Mockup-only copy** in `content/site.ts → mockup`: hero kicker/tagline/label, the three section subtitles, the Academy overlay lines, footer slogan/blurb/lead, and the six service-card taglines in `content/services.ts`. These were transcribed from the mockup image and should be confirmed or replaced.
- **Service-card photos**: 城鄉規劃 uses the existing site's aerial photo; the other five cards use placeholder photography because the existing site has no suitable images at usable resolution (`services/appraisal.webp`, `asset.webp`, `financial.webp`, `process.webp`, `brokerage.webp`). Swap files in `public/images/services/` when real photos arrive.
- **Footer address**: the mockup shows a different (Taiwan Blvd) address; the site uses the existing site's address (民權路). Confirm which is current.
- **Search**: the mockup's header shows a search icon. Implemented as a client-side search over the site's own pages, services, news, courses and links (`components/site/SearchOverlay.tsx`).
- **Contact form captcha**: the existing site's image captcha is a server feature and can't run on static hosting; see Inquiry form below.

## Routes

```
/                         首頁
/about                    關於茗強
/news, /news/[id]         最新消息 (4 items)
/track-record             服務實績 (accordion; deep-linkable via #item-NN)
/services, /services/[slug]   不動產估價 · 城鄉規劃 · 仲介＆代書業務 · 資產評估 · 不動產理財規劃 · 估價委任流程
/academy                  學院簡介
/academy/courses, /academy/courses/[id]        茗強課程 (55)
/academy/publications, /academy/publications/[id]   電子刊物
/academy/links            相關連結
/contact                  聯絡我們 (map, parking info, feedback form)
/careers                  人才招募
/privacy, /terms          minimal legal placeholders
```

## Deployment

Configured for **GitHub Pages** via `.github/workflows/deploy.yml`: every push to `main` runs `npm run build` and publishes `out/`. GitHub Pages is static-only, so `next.config.ts` sets `output: "export"` and uses a custom `image-loader.ts` so `next/image` respects the `/<repo>` basePath.

The workflow sets two build-time values from the repo itself:

- `PAGES_BASE_PATH=/<repo-name>` → `basePath`/`assetPrefix`
- `SITE_URL=https://<owner>.github.io/<repo-name>` → canonical, Open Graph, sitemap

Locally both are unset, so the site runs at the domain root.

## Inquiry form

`components/contact/InquiryForm.tsx` reproduces the existing site's 聯絡我們 fields and validates client-side. It posts to `NEXT_PUBLIC_INQUIRY_ENDPOINT` if set at build time; on GitHub Pages it is unset, so the form says plainly that online submission isn't available and shows phone/email instead. To make it deliver, host on a Node-capable platform, add a route handler at `app/api/inquiry/route.ts` that forwards to your intake (`INQUIRY_WEBHOOK_URL`), and set `NEXT_PUBLIC_INQUIRY_ENDPOINT=/api/inquiry`.

## Structure

```
app/                  routes, metadata, sitemap, robots
.github/workflows     GitHub Pages deploy workflow
components/site       header (+dropdowns, search), footer, smooth scroll, page transition
components/home       HeroBanner, NewsSection, ServicesSection, AcademySection
components/news       NewsList
components/services   ServiceCard / ServicesGrid
components/academy    AcademyNav
components/ui         SectionTitle, PageTitle, ServiceIcon, Accordion
components/contact    InquiryForm
content/              data (see Content)
lib/                  GSAP registration, media-query hooks, Lenis store
public/images         hero, service photos, about/news/academy imagery, brand marks
```

## Accessibility

- Header dropdowns open on hover and keyboard focus; the mobile menu locks scroll, closes on Escape and returns focus.
- Academy tabs and the 服務實績 accordion use proper `tab`/`tabpanel` and `button[aria-expanded]` + `region` semantics.
- `prefers-reduced-motion` disables Lenis and the page transition; the hero carousel never auto-advances under it.
