@AGENTS.md

# Project notes

- Dev server: `npm run dev -- --port 3100` (port 3000 is occupied on this machine).
- Design source of truth: the Figma handoff board (茗強官網｜Dev Handoff). Content source of truth: the existing site https://www.594mcreaf594.com/ — all pages, navigation items, links and text follow it; the mockup is visual reference only. Copy that exists only in the mockup lives in `content/site.ts` under `mockup` and is flagged for client confirmation.
- All facts and copy live in `content/*.ts`. `content/track.ts` and `content/courses.ts` are generated from the live site (scratchpad `gen-content.mjs`); don't hand-edit row text.
- Design system is in `app/globals.css` (tokens sampled from the mockup) plus CSS Modules per component. No utility framework. Noto Sans TC only. Light paper surfaces, navy `#142830` for footer/tabs, logo blue `#1e4f8e` for interaction, beige circles for service icons, pill buttons, thin `#e4e3e1` rules.
- Homepage sections: `HeroBanner` (carousel-ready; dots appear only with >1 slide), `NewsSection`, `ServicesSection`, `AcademySection` (tabs). Inner pages start with `PageTitle` directly below the header — no banner on inner pages (Figma rule).
- Header navigation mirrors the existing site's menu (with 服務項目 / 茗強學院 dropdowns) plus a client-side `SearchOverlay` over the site's own content.
- Deployed to GitHub Pages (static export): `next.config.ts` has `output: "export"` and a custom image loader for basePath. There is no `app/api/*` — GitHub Pages cannot run server code. Any new route must be a plain page (or a `force-static` metadata route). See README's Deployment/Inquiry form sections.
- Screenshot review: Playwright is a dev dependency; the scratchpad `shot.mjs` pattern (viewport + scroll position) is the quickest way to check a section against the mockup crops in `scratchpad/z-*.png`.
