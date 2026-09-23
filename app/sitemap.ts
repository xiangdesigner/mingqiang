import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { expertise } from "@/content/expertise";

// See app/layout.tsx for why this can be overridden at build time.
const siteUrl = process.env.SITE_URL || site.url;

// Reading process.env would otherwise make Next treat this route as
// dynamic, which `output: "export"` does not allow.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  const now = new Date();
  const routes = ["", "/expertise", "/about", "/academy", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const details = expertise.map((e) => ({
    url: `${base}/expertise/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...routes, ...details];
}
