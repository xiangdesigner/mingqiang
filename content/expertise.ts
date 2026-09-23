/**
 * The six disciplines. Copy is deliberately specific and free of claims
 * that cannot be verified from supplied project content.
 */
export type Expertise = {
  slug: string;
  index: string;
  name: string;
  nameEn: string;
  summary: string;
  body: string[];
  scope: string[];
  practiceId: string;
  /** Illustration asset (transparent PNG) or null for a procedural panel. */
  image: { src: string; alt: string } | null;
};

export const expertise: Expertise[] = [
  {
    slug: "real-estate-appraisal",
    index: "01",
    name: "不動產估價",
    nameEn: "Real Estate Appraisal",
    summary: "以市場證據與法定程序，建立土地與建物的價值判斷。",
    body: [
      "估價是所有土地決策的起點。買賣、抵押、徵收、分割、訴訟或資產重估，都需要一份能被檢驗的價值報告。",
      "茗強不動產估價師事務所依估價技術規則，整合比較法、收益法與成本法，並說明每一項判斷的依據，使報告能面對金融機構、法院與主管機關的審視。",
    ],
    scope: ["土地與建物估價", "抵押擔保估價", "徵收與更新權利價值", "訴訟與鑑定估價", "資產重估"],
    practiceId: "appraisal-office",
    image: { src: "/images/ill-appraisal.png", alt: "不動產估價示意：建築群、估價報告與放大鏡" },
  },
  {
    slug: "urban-planning",
    index: "02",
    name: "都市及區域計畫",
    nameEn: "Urban & Rural Planning",
    summary: "解讀分區與計畫，判斷一筆土地可以成為什麼。",
    body: [
      "土地的可能性由計畫決定。使用分區、容積、開發許可與變更程序，決定了土地在法律上能承載的用途與規模。",
      "茗強都市計畫技師事務所處理都市計畫與非都市土地的分析與變更作業，協助業主、開發者與公部門在計畫框架內找到可行的路徑。",
    ],
    scope: ["都市計畫變更", "非都市土地使用分析", "土地使用與開發評估", "開發許可作業", "計畫審議協助"],
    practiceId: "planning-office",
    image: { src: "/images/ill-planning.png", alt: "都市計畫示意：圓規、分區圖與街廓模型" },
  },
  {
    slug: "land-administration",
    index: "03",
    name: "地政與產權登記",
    nameEn: "Land Administration",
    summary: "把權利落實為登記，把交易落實為文件。",
    body: [
      "產權是否乾淨，決定了土地能否被信任。登記、繼承、分割、設定與塗銷，每一步都需要正確的程序與文件。",
      "茗強地政士事務所辦理地政登記與不動產稅務諮詢，協助當事人在複雜的權利關係中，完成合法而完整的移轉。",
    ],
    scope: ["所有權移轉登記", "繼承與贈與登記", "抵押權設定與塗銷", "土地分割與合併", "不動產稅務諮詢"],
    practiceId: "land-office",
    image: { src: "/images/ill-land-admin.png", alt: "地政登記示意：地籍分割圖、權狀與印章" },
  },
  {
    slug: "real-estate-brokerage",
    index: "04",
    name: "不動產經紀",
    nameEn: "Real Estate Brokerage",
    summary: "以估價與地政的知識，處理交易本身。",
    body: [
      "交易是估價、計畫與登記的交會點。價格是否合理、用途是否可行、產權是否完整，都應在簽約之前釐清。",
      "茗強不動產經紀有限公司提供不動產交易與諮詢服務，並可與集團內其他專業協同，讓交易建立在完整的專業判斷之上。",
    ],
    scope: ["不動產買賣", "土地交易諮詢", "交易前專業評估", "跨領域協同"],
    practiceId: "brokerage",
    image: { src: "/images/ill-brokerage.png", alt: "不動產經紀示意：握手、住宅與鑰匙" },
  },
  {
    slug: "asset-valuation",
    index: "05",
    name: "資產與企業鑑定",
    nameEn: "Asset & Business Valuation",
    summary: "把價值判斷從土地延伸到企業與無形資產。",
    body: [
      "資產不止於土地。機器設備、企業股權與智慧財產，同樣需要可被檢驗的價值意見。",
      "茗強資產鑑定有限公司提供資產鑑定、企業價值與無形資產評價，服務對象包括企業、金融機構與需要獨立意見的各方。",
    ],
    scope: ["資產鑑定", "企業價值評估", "智慧財產相關評價", "獨立價值意見"],
    practiceId: "asset-valuation",
    image: { src: "/images/ill-valuation.png", alt: "資產鑑定示意：天平、建築與財務圖表" },
  },
  {
    slug: "property-financial-planning",
    index: "06",
    name: "不動產財務規劃",
    nameEn: "Property Financial Planning",
    summary: "把持有、開發與處分，放進同一張時間表。",
    body: [
      "土地的價值會隨持有方式、開發時程與稅務安排而改變。單一決策往往需要同時考慮估價、計畫、登記與稅務。",
      "茗強整合各專業，協助業主與企業就不動產的持有、開發與處分建立財務規劃，並以事實與計算為基礎。",
    ],
    scope: ["持有與處分規劃", "開發財務評估", "稅務影響分析", "跨專業整合諮詢"],
    practiceId: "asset-valuation",
    image: null,
  },
];

export const expertiseBySlug = (slug: string) => expertise.find((e) => e.slug === slug);
