import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Noto_Sans_TC, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { PageTransition } from "@/components/site/PageTransition";
import { Cursor } from "@/components/site/Cursor";
import { site } from "@/content/site";
import "./globals.css";

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Overridable at build time (the Pages workflow sets this to the real
// https://<owner>.github.io/<repo> origin); content/site.ts keeps the
// documented placeholder as its default until a production domain exists.
const siteUrl = process.env.SITE_URL || site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}｜${site.nameEn}`,
    template: `%s｜${site.name}`,
  },
  description:
    "茗強地政與土管整合不動產估價、都市計畫、地政登記、不動產經紀與資產鑑定五項專業，自 2014 年起於臺中服務土地與不動產相關決策。",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: site.name,
    title: `${site.name}｜${site.nameEn}`,
    description: "不動產估價、都市計畫、地政登記、不動產經紀與資產鑑定。臺中，自 2014 年起。",
    images: [{ url: "/images/photo-entrance.png", width: 1672, height: 941, alt: "建築入口與城市景觀" }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1ede4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: site.nameEn,
  url: siteUrl,
  foundingDate: String(site.foundedYear),
  founder: { "@type": "Person", name: site.founder.name, alternateName: site.founder.nameEn },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "TW" },
  areaServed: "TW",
  knowsAbout: ["不動產估價", "都市計畫", "地政登記", "不動產經紀", "資產鑑定", "企業價值評估"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-TW" className={`${notoSerif.variable} ${notoSans.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          跳至主要內容
        </a>
        <PageTransition>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </PageTransition>
        <SmoothScroll />
        <Cursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
