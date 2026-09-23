# 茗強地政與土管 — Ming Chiang Land Economics & Land Management

An editorial, land-intelligence brand experience for 茗強地政與土管: five professional practices and an academy under one identity, based in Taichung since 2014.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- CSS custom properties + CSS Modules (no utility framework)
- GSAP + ScrollTrigger for pinned chapters, Lenis for smooth scrolling
- Three.js for one WebGL moment (the land field)
- Fonts: Noto Serif TC, Noto Sans TC, IBM Plex Mono via `next/font`

## Run

```bash
npm install
npm run dev -- --port 3100   # http://localhost:3100
npm run build                # static export to out/ — see Deployment below
```

## Deployment

This repo is configured for **GitHub Pages** via `.github/workflows/deploy.yml`: on every push to `main`, it runs `npm run build` and publishes the `out/` folder. GitHub Pages is static-only hosting — no Node server, no API routes, no on-demand image optimization — so `next.config.ts` sets `output: "export"` and `images.unoptimized: true` permanently, not just for this deployment target.

One-time setup after the first push: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions** (the workflow will then run automatically; the Pages UI shows the live URL once it completes).

The workflow computes two build-time values from the repo itself, so nothing needs to be hardcoded:

- `PAGES_BASE_PATH=/<repo-name>` — the site is served at `https://<owner>.github.io/<repo-name>/`, not the domain root, so every internal link and asset needs that prefix. `next.config.ts` reads it into `basePath`/`assetPrefix`.
- `SITE_URL=https://<owner>.github.io/<repo-name>` — used for canonical links, Open Graph, and the sitemap in place of the placeholder in `content/site.ts` (see **Before launch**).

Locally, both are unset, so `npm run dev`/`npm run build` behave normally at the domain root.

**Moving to a real Node host later** (Vercel, a VPS, etc.) needs two reversions: drop `output: "export"` (and `images.unoptimized`, if you want on-demand optimization back) from `next.config.ts`, and restore a `POST /api/inquiry` route handler — see **Inquiry form** below, since GitHub Pages can't run it at all.

**Trade-off to know:** with `images.unoptimized: true`, `next/image` serves each photo at its original file size instead of a resized/AVIF variant per viewport. Fine for a preview; worth revisiting on a Node host.

## Inquiry form

The form validates client-side, then posts to `NEXT_PUBLIC_INQUIRY_ENDPOINT` if one is set at build time. On GitHub Pages that variable is intentionally unset — there's no server to send it to — so the form skips the network call and tells the visitor the same thing an unreachable backend would: submission isn't available yet, use phone or email.

To make it actually deliver messages, you need a Node-capable host (Vercel, Netlify, a VPS — not GitHub Pages) and a two-part setup:

1. Restore a route handler at `app/api/inquiry/route.ts` that validates the payload and forwards it to `INQUIRY_WEBHOOK_URL` (any JSON intake: email relay, CRM, Zapier).
2. Set `NEXT_PUBLIC_INQUIRY_ENDPOINT=/api/inquiry` (or an absolute URL to a separately hosted endpoint) at build time so the form knows where to send it.

```
INQUIRY_WEBHOOK_URL=https://example.com/intake
NEXT_PUBLIC_INQUIRY_ENDPOINT=/api/inquiry
```

## Content

All copy and facts live in `content/`:

| File | Holds |
| --- | --- |
| `content/site.ts` | name, founder, founding year, city, contact fields, motto, creed, navigation |
| `content/practices.ts` | the five entities and their parcel geometry on the structure map |
| `content/expertise.ts` | the six disciplines, scope lists, illustration mapping |
| `content/academy.ts` | Academy sections; `articles` is empty until real publications exist |

Fields left as empty strings in `site.ts` (address, phone, email, hours) render as 「資訊補充中」 rather than invented data. Fill them in and the footer, contact anchor, and contact page update automatically.

## Inquiry form

`POST /api/inquiry` validates the payload and forwards it to `INQUIRY_WEBHOOK_URL` (any JSON intake: email relay, CRM, Zapier). Without that variable the endpoint answers 503 and the form shows an honest error with alternatives.

```
INQUIRY_WEBHOOK_URL=https://example.com/intake
```

## Structure

```
app/                  routes, metadata, sitemap, robots
.github/workflows     GitHub Pages deploy workflow
components/brand      Mark (vector logo)
components/site       header, footer, smooth scroll, page transition, cursor
components/home       the homepage chapters (Opening, Manifesto, LandField, ExpertiseSequence, PracticeMap, EvidenceIndex, Record, Philosophy, AcademyIndex, ContactAnchor)
components/ui         BoundaryLine (signature device), ChapterLabel, PageHead, Reveal
components/contact    InquiryForm
content/              data
lib/                  GSAP registration, media-query hooks, Lenis store
public/images         supplied photography, illustrations, logo
```

## Motion and accessibility

- `prefers-reduced-motion` disables Lenis, pinned sequences, the page transition, and the WebGL field (a static SVG composition is shown instead).
- Pinned chapters (Opening, LandField, ExpertiseSequence) revert their pins in layout-effect cleanup so React can unmount cleanly on navigation.
- The contextual cursor label appears only on fine-pointer devices and only over `[data-cursor]` elements.
- Keyboard: the mobile menu traps focus and closes on Escape; the structure map's parcels are focusable buttons.

## Before launch

- Once there's a real production domain, set `site.url` in `content/site.ts` to it (used for canonical URLs, Open Graph, sitemap whenever `SITE_URL` isn't set at build time).
- Supply verified address, telephone, email, and office hours.
- Replace the minimal privacy and terms text after legal review.
- Provide the founder's professional biography and any team members to extend the About page.
- Add real Academy articles to `content/academy.ts` (slug, title, section, date, author, type).
