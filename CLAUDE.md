@AGENTS.md

# Project notes

- Dev server: `npm run dev -- --port 3100` (port 3000 is occupied on this machine).
- All facts and copy live in `content/*.ts`. Never invent contact details, metrics, case studies, bios, or article metadata; empty fields render as 「資訊補充中」.
- Design system is in `app/globals.css` (tokens) plus CSS Modules per component. No utility framework. Square geometry, hairlines, paper/ink surfaces, bronze markers, logo blue for interaction.
- Pinned GSAP chapters (`Opening`, `LandField`, `ExpertiseSequence`) must create/kill triggers in `useLayoutEffect` and carry `refreshPriority` (3, 2, 1) so refresh order matches document order. Pin at `headerOffset()`, not `top top`.
- `LandField` is the only WebGL. Keep DPR capped at 1.5, pause when off-screen, dispose on unmount, keep the SVG fallback intentional.
- Reduced motion must keep every chapter readable: no pins, no Lenis, static land field.
- Screenshot review: Playwright is installed as a dev dependency; the scratchpad `shot.mjs` pattern (viewport + scroll position) is the quickest way to check a chapter.
- Deployed to GitHub Pages (static export): `next.config.ts` has `output: "export"` and `images.unoptimized: true` permanently, not conditionally. There is no `app/api/*` — GitHub Pages cannot run server code. Any new route must be a plain page (or a `force-static` metadata route like `sitemap.ts`/`robots.ts`); a server-dependent Route Handler will break `npm run build`. See README's Deployment/Inquiry form sections before adding a server feature or moving to a Node host.
