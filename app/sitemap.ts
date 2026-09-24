import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { news } from "@/content/news";
import { courses } from "@/content/courses";
import { publications } from "@/content/academy";

// See app/layout.tsx for why this can be overridden at build time.
const siteUrl = process.env.SITE_URL || site.url;

// Reading process.env would otherwise make Next treat this route as
// dynamic, which `output: "export"` does not allow.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  const now = new Date();
  const entry = (p: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "monthly", priority });
  return [
    entry("", 1),
    entry("/about", 0.8),
    entry("/news", 0.8),
    ...news.map((n) => entry(`/news/${n.id}`, 0.6)),
    entry("/track-record", 0.7),
    entry("/services", 0.8),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.7)),
    entry("/academy", 0.7),
    entry("/academy/courses", 0.7),
    ...courses.map((c) => entry(`/academy/courses/${c.id}`, 0.5)),
    entry("/academy/publications", 0.5),
    ...publications.map((p) => entry(`/academy/publications/${p.id}`, 0.3)),
    entry("/academy/links", 0.6),
    entry("/contact", 0.8),
    entry("/careers", 0.6),
  ];
}
