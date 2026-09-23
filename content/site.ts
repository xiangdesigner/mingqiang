/**
 * Site-wide verified facts and contact configuration.
 *
 * Only supplied or verified information belongs here. Fields left as empty
 * strings are intentionally unknown; the UI renders an honest "pending"
 * state rather than inventing data. Fill them in when confirmed.
 */
export const site = {
  name: "茗強地政與土管",
  nameEn: "Ming Chiang Land Economics & Land Management",
  shortName: "茗強",
  shortNameEn: "Ming Chiang",
  founder: { name: "蘇又德", nameEn: "Su Yu-Te", role: "創辦人 / 主持人" },
  foundedYear: 2014,
  city: "臺中市",
  cityEn: "Taichung, Taiwan",
  /** Verified street address. Empty = not yet supplied. */
  address: "",
  /** Verified telephone. Empty = not yet supplied. */
  phone: "",
  /** Verified inquiry email. Empty = not yet supplied. */
  email: "",
  /** Office hours. Empty = not yet supplied. */
  hours: "",
  /** Public site origin used for canonical URLs and sitemap. */
  url: "https://www.mingchiang.example",
  motto: "如品佳茗，回甘力強",
  creed: "以誠信為基石，進而以誠感人",
  academy: { name: "茗強學院", nameEn: "Ming Chiang Academy" },
} as const;

export const nav = [
  { href: "/expertise", label: "專業領域", labelEn: "Expertise" },
  { href: "/about", label: "關於茗強", labelEn: "About" },
  { href: "/academy", label: "茗強學院", labelEn: "Academy" },
  { href: "/contact", label: "聯絡", labelEn: "Contact" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "隱私權政策" },
  { href: "/terms", label: "使用條款" },
] as const;
