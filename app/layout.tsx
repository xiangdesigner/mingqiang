import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { PageTransition } from "@/components/site/PageTransition";
import { site } from "@/content/site";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

// Overridable at build time (the Pages workflow sets this to the real
// https://<owner>.github.io/<repo> origin).
const siteUrl = process.env.SITE_URL || site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s｜${site.name}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: "/images/brand/logo-values.png", width: 542, height: 441, alt: site.name }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f1",
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
  telephone: "+886-4-2202-2662",
  faxNumber: "+886-4-2202-2737",
  email: site.email,
  foundingDate: String(site.foundedYear),
  founder: { "@type": "Person", name: site.founder.name, alternateName: site.founder.nameEn },
  address: { "@type": "PostalAddress", streetAddress: "民權路252巷3號2樓", addressLocality: "台中市西區", addressCountry: "TW" },
  areaServed: "TW",
  knowsAbout: ["不動產估價", "城鄉規劃", "不動產經紀", "不動產登記", "不動產稅務諮詢", "不動產理財規劃", "動產鑑價", "無形資產評價", "企業評價"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-TW" className={notoSans.variable}>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
