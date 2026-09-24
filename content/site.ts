/**
 * Site-wide facts, navigation, and shared copy.
 *
 * Source of truth for facts, navigation and links: the existing website
 * (https://www.594mcreaf594.com/). Copy that exists only in the Figma
 * mockup (hero tagline, section subtitles, footer slogan) is marked
 * `mockup` so it can be confirmed or replaced by the client.
 */
export const site = {
  name: "茗強地政與土管",
  nameEn: "Ming Chiang Land Economics & Land Management",
  shortName: "茗強",
  /** Logo lockup tagline shown under 茗強 in the header and footer (mockup). */
  logoTagline: "專業・誠信・創新",
  founder: { name: "蘇又德", nameEn: "Su Yu-Te", role: "茗強地政與土管負責人" },
  foundedYear: 2014,
  /** Existing-site facts */
  company: "茗強不動產估價師事務所",
  address: "台中市西區民權路252巷3號2樓（鄰近臺中教育大學）",
  addressShort: "台中市西區民權路252巷3號2樓",
  addressNote: "鄰近臺中教育大學",
  phone: "(04)2202-2662",
  phoneHref: "tel:+886422022662",
  fax: "(04)2202-2737",
  email: "mingattorney@gmail.com",
  line: "https://page.line.me/mcreaf",
  mapUrl: "https://www.google.com/maps/d/edit?mid=1rtM2ymQqlDwWzd6uJy9114gMGGvvE4CK&usp=sharing",
  copyright: "Copyright © 2021 茗強不動產估價師事務所. All Rights Reserved.",
  /** Public site origin used for canonical URLs and sitemap. */
  url: "https://www.594mcreaf594.com",
  seo: {
    title: "茗強地政與土管",
    description:
      "本企業提供不動產估價、城鄉規劃、不動產經紀、不動產登記、不動產稅務諮詢、不動產理財規劃、動產鑑價、無形資產鑑價、企業評價等專業服務，歡迎洽詢。提供客戶如品佳茗回甘力強之服務是我們的責任！",
    keywords: ["茗強", "鑑價", "估價", "徵收", "土地重劃估價", "都市更新", "代書", "地上物查估", "資產評估", "企業評價", "法院訴訟", "移民"],
  },
  motto: "如品佳茗，回甘力強",
  creed: "以誠信為基石，進而以誠感人",
} as const;

/** Copy that exists only in the Figma mockup. Confirm with the client. */
export const mockup = {
  hero: {
    kicker: "深耕土地・專業前行",
    headline: ["如品佳茗", "回甘力強"],
    /** Existing-site wording (立業宗旨); the mockup shows the same two lines. */
    description: ["培養同仁重視團隊、積極進取、樂於分享之從業態度", "並追求企業奉行公義、遵守法紀、誠信正直之發展願景"],
    tag: ["專業成就", "更好的城市未來"],
    label: "LAND　PROFESSIONAL　BETTER TOMORROW",
  },
  news: { subtitle: "掌握法規動態，關注產業脈動", more: "MORE" },
  services: { subtitle: "專業整合，全方位土地與不動產顧問服務" },
  academy: {
    subtitle: "傳承專業，分享知識，開創更大的可能",
    overlay: ["知識扎根土地", "專業創造價值"],
    overlayEn: ["KNOWLEDGE", "FOR A BETTER TOMORROW"],
    more: "了解更多",
  },
  footer: {
    slogan: "深耕專業・立足土地・放眼未來",
    text: "以專業知識與實務經驗，提供土地、不動產與都市規劃的整合服務，與客戶共創永續價值。",
    contactLead: ["歡迎與我們聯繫", "共同創造更好的未來"],
    disclaimer: "本網站內容僅供參考，未經同意請勿轉載。",
  },
} as const;

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/** Navigation mirrors the existing site's menu exactly (order, items, sub-items). */
export const nav: NavItem[] = [
  { label: "關於茗強", href: "/about" },
  { label: "最新消息", href: "/news" },
  { label: "服務實績", href: "/track-record" },
  {
    label: "服務項目",
    href: "/services",
    children: [
      { label: "不動產估價", href: "/services/appraisal" },
      { label: "城鄉規劃", href: "/services/planning" },
      { label: "仲介＆代書業務", href: "/services/brokerage" },
      { label: "資產評估", href: "/services/asset-valuation" },
      { label: "不動產理財規劃", href: "/services/financial-planning" },
      { label: "估價委任流程", href: "/services/process" },
    ],
  },
  {
    label: "茗強學院",
    href: "/academy",
    children: [
      { label: "學院簡介", href: "/academy" },
      { label: "茗強課程", href: "/academy/courses" },
      { label: "電子刊物", href: "/academy/publications" },
      { label: "相關連結", href: "/academy/links" },
    ],
  },
  { label: "聯絡我們", href: "/contact" },
  { label: "人才招募", href: "/careers" },
];

export const legalNav = [
  { href: "/privacy", label: "隱私權政策" },
  { href: "/terms", label: "使用條款" },
] as const;
