import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// See app/layout.tsx for why this can be overridden at build time.
const siteUrl = process.env.SITE_URL || site.url;

// Reading process.env would otherwise make Next treat this route as
// dynamic, which `output: "export"` does not allow.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
