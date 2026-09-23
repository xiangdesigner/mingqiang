/**
 * 茗強學院 editorial sections. These are content categories, not articles.
 * No article metadata is fabricated: `articles` stays empty until real
 * publications are supplied.
 */
export type AcademySection = {
  code: string;
  name: string;
  nameEn: string;
  description: string;
};

export const academySections: AcademySection[] = [
  { code: "A", name: "研究", nameEn: "Research", description: "土地經濟、估價方法與計畫制度的專業研究。" },
  { code: "B", name: "評論", nameEn: "Commentary", description: "對土地政策、市場現象與制度變動的專業評論。" },
  { code: "C", name: "專業教育", nameEn: "Professional Education", description: "面向從業人員與準專業者的課程與教材。" },
  { code: "D", name: "法規更新", nameEn: "Regulatory Updates", description: "土地、都市計畫、稅務與登記相關法規的整理與說明。" },
  { code: "E", name: "土地法", nameEn: "Land Law", description: "土地法制與權利關係的解析。" },
  { code: "F", name: "估價專題", nameEn: "Appraisal Topics", description: "估價技術規則、方法與案例類型的討論。" },
  { code: "G", name: "計畫專題", nameEn: "Planning Topics", description: "都市與區域計畫制度、分區與開發程序。" },
  { code: "H", name: "考試資源", nameEn: "Examination Resources", description: "地政、估價與計畫相關專業考試的學習資源。" },
];

export type Article = {
  slug: string;
  title: string;
  section: string;
  date: string; // ISO
  author: string;
  type: string;
};

export const articles: Article[] = [];
