import type { NextConfig } from "next";

// GitHub Pages serves this as a project page at
// https://<owner>.github.io/<repo>/ — the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH to "/<repo>" at build time. Local `npm run dev`/`build`
// leave it unset, so the site behaves normally at the domain root.
// It is NEXT_PUBLIC_ (not a private build var) because image-loader.ts must
// see the same value inside client bundles.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // GitHub Pages is static hosting only: no Node server, no API routes,
  // no on-demand image optimization. This produces a fully static `out/`.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,

  // Allows the Cloudflare Quick Tunnel (random *.trycloudflare.com subdomain
  // each run) to reach dev-only assets: HMR, JS/CSS chunks, next/image.
  // Dev-only; has no effect on production builds.
  allowedDevOrigins: ["*.trycloudflare.com"],

  images: {
    // No image-optimization server is available on static hosting.
    // `unoptimized: true` alone leaves next/image's <img src> unprefixed
    // by basePath (see image-loader.ts) — a custom loader fixes that.
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  poweredByHeader: false,
};

export default nextConfig;
