/**
 * 服務項目 — six services, names/links/body transcribed from the existing
 * site. Card taglines (two short lines) come from the Figma mockup.
 */
export type ServiceSection =
  | { type: "items"; items: { title: string; text?: string; links?: { label: string; href: string }[] }[] }
  | { type: "groups"; groups: { index: string; title: string; tags: string[] }[] }
  | { type: "numbered"; heading?: string; items: { title: string; text?: string }[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "blocks"; blocks: { heading: string; items: { title: string; text?: string; links?: { label: string; href: string }[] }[] }[] };

export type Service = {
  slug: string;
  name: string;
  /** Two-line tagline on the homepage card (mockup copy, confirm). */
  tagline: [string, string];
  icon: "building" | "house" | "document" | "calculator" | "certificate" | "handshake";
  photo: { src: string; alt: string; note?: string };
  intro?: string;
  sections: ServiceSection[];
};

export const services: Service[] = [
  {
    slug: "appraisal",
    name: "不動產估價",
    tagline: ["專業・公正・精確", "提供不動產估價服務"],
    icon: "building",
    photo: { src: "/images/services/appraisal.webp", alt: "都市建築與天際線", note: "替代圖：待確認" },
    sections: [
      {
        type: "items",
        items: [
          { title: "都市更新權利變換前後不動產價值之估價、土地重劃前後地主權益價值估價、區段徵收地主分配抵價地估價、政府公共工程土地徵收之估價、不動產權利（例如地上權、租賃權、容積移轉等）之估價等", text: "依不動產估價師公會全國聯合會規範之第6號公報、相關土地重劃法規、土地徵收補償市價查估作業手冊或不動產估價技術規則等之相關規定，進行相關都市更新權利變換、土地重劃前後地主權益價值、土地徵收或不動產權利之估價。" },
          { title: "聯合開發有關政府、地主、投資者之權益價值估價等", text: "依大眾捷運系統土地聯合開發辦法、台北都會區大眾捷運系統土地聯合開發實施要點或不動產估價技術規則等之相關規定，考慮捷運聯合開發相關之容積獎勵、需支付之共構費用等較特殊之獎勵與成本，以合理評估土地於聯合開發條件下之價值及有關政府、地主、投資者之權益價值。" },
          { title: "各級政府公有不動產標售或買賣之估價、不動產證券化之不動產開發價值之估價、各項工程或鄰房損害之不動產價值減損之估價等", text: "依各級政府有關公有非公用土地處分之自治法規、不動產證券化條例、證券化不動產估價報告書範本或不動產估價技術規則等之相關規定，考慮各公有非公用土地之個別條件或權利種類、不動產證券化之不動產之產品型態、或因近鄰地區工程施工不當所造成損害、標的本身缺陷（如海砂屋、輻射屋等）所導致不動產之價值減損，進行相關估價。" },
          { title: "法院民事糾紛有關土地合併或分割等之估價、土地使用分區變更前後之價值差異估價、其他（包含土地、建築改良物、農作改良物及其權利）之估價等", text: "依都市計畫法、非都市土地使用管制規則等相關土地利用法規或不動產估價技術規則之相關規定，考慮合併或分割土地、使用分區變更前後土地或其他評估項目（包含土地、建築改良物、農作改良物及其權利）之個別條件，進行相關估價。" },
          { title: "土地開發合建分配之權益價值估價、政府公共工程徵收地上改良物之估價、政府公共工程徵收農作改良物之估價等", text: "依不動產估價技術規則或土地徵收條例之相關規定，考慮地主提供土地之個別條件及建商出資興建房屋之成本、政府公共工程徵收地上改良物或農作改良物之現況，進行相關估價。" },
          { title: "公開發行公司不動產買賣交易之估價等、依會計財物報導準則不動產以公允價值入帳之估價、企業購併對不動產價值之估價、企業投資以不動產作價入股之估價等", text: "依公開發行公司取得或處分資產處理準則、國際會計準則(IFRS) 或不動產估價技術規則之相關規定，考量公開發行公司不動產買賣交易、不動產以公允價值入帳或企業投資以不動產作價入股等之標的現況，進行相關估價。" },
          { title: "金融機構不動產抵押擔保物之估價等", text: "依各金融機構內部之相關規範或不動產估價技術規則之相關規定，進行不動產抵押擔保物之估價。" },
          { title: "法院民事執行處、法務部行政執行署拍賣不動產之估價等", text: "依各法院民事執行處、法務部行政執行署內部之相關規範或不動產估價技術規則之相關規定，進行拍賣不動產之估價。" },
          { title: "移民國外有關之不動產價值之估價等", text: "依不動產估價技術規則之相關規定，進行移民國外有關之不動產價值之估價。" },
        ],
      },
    ],
  },
  {
    slug: "planning",
    name: "城鄉規劃",
    tagline: ["立足專業，放眼未來", "協助城鄉永續發展"],
    icon: "house",
    photo: { src: "/images/services/planning.webp", alt: "農地與城鎮空拍" },
    sections: [
      {
        type: "groups",
        groups: [
          { index: "01", title: "都市土地", tags: ["通盤檢討", "專案變更", "都市設計", "都市計畫規劃", "都市更新", "市地重劃", "區段徵收"] },
          { index: "02", title: "非都市土地", tags: ["開發評估", "開發許可申請", "用地變更", "興辦事業計畫申請"] },
        ],
      },
    ],
  },
  {
    slug: "brokerage",
    name: "仲介＆代書業務",
    tagline: ["安全・效率・值得信賴", "提供不動產交易相關服務"],
    icon: "document",
    photo: { src: "/images/services/brokerage.webp", alt: "簽署文件" },
    sections: [
      {
        type: "blocks",
        blocks: [
          {
            heading: "不動產仲介業務",
            items: [
              { title: "不動產仲介業務", links: [{ label: "惠双房屋官網 https://www.hshouse.com.tw/", href: "https://www.hshouse.com.tw/" }] },
              { title: "不動產買賣業務", links: [{ label: "惠双房屋台中茗強加盟店官網 https://www.hshouse.com.tw/HS0396", href: "https://www.hshouse.com.tw/HS0396" }] },
              { title: "不動產租賃業務", links: [{ label: "惠双房屋台中茗強加盟店官網 https://www.hshouse.com.tw/HS0396", href: "https://www.hshouse.com.tw/HS0396" }] },
            ],
          },
          {
            heading: "代書業務",
            items: [
              { title: "總登記", text: "土地總登記、建物所有權第一次登記等。" },
              { title: "所有權移轉登記", text: "買賣、贈與、交換、共有物分割、徵收、照價收買、判決(如夫妻剩餘財產差額分配)、和解與調解、拍賣、取得典物、政府出售、都市更新權利變換等。" },
              { title: "繼承登記", text: "一般繼承及分割繼承等，包含各式書表（如遺產分割協議書、拋棄繼承聲請狀、繼承系統表等）之代擬等。" },
              { title: "他項權利登記", text: "抵押權、典權、地上權、不動產役權、農育權、耕作權等各式他項權利設定、遺產或變更登記等。" },
              { title: "土地複丈", text: "土地複丈、建物第一次測量等。" },
              { title: "信託登記", text: "一般信託登記、抵押權（金融資產信託）移轉登記、他項權利(金融資產信託)移轉登記等。" },
              { title: "限制登記", text: "預告登記、查封、假扣押、假處分、破產登記等。" },
              { title: "消滅登記及塗銷登記", text: "土地滅失、建物滅失、抵押權塗銷、塗銷預告登記等。" },
              { title: "標示變更及其他變更登記", text: "土地分割、土地合併、建物分割、建物合併、地目變更、等則調整、面積增減、地籍圖重測、土地重劃、建物門牌變更、夫妻聯合財產更名、自然人更名、法人更名、法人合併、管理者變更、住址變更、書狀換給、書狀補給、出生日期更正、住址更正、姓名更正、建物門牌更正、統一編號更正等。" },
            ],
          },
          {
            heading: "不動產稅務",
            items: [
              { title: "土增稅、奢侈稅等不動產稅移轉稅賦", text: "土增稅、奢侈稅、契稅、印花稅試算等。" },
              { title: "遺產稅、贈與稅等移轉稅賦", text: "遺產稅、贈與稅試算等。" },
              { title: "所得稅移轉稅賦", text: "所得稅試算等。" },
              { title: "不動產稅、高資產族群節稅規劃", text: "高資產族群財富管理與節稅規劃等。" },
              { title: "遺產稅、贈與稅節稅規劃" },
              { title: "所得稅節稅規劃" },
              { title: "遺贈稅率調降前等過去法令之規定", text: "過往稅務法令諮詢等。" },
              { title: "房地合一稅、囤房稅等現在法令之規定", text: "現在稅務法令諮詢及納稅人權利保障等。" },
              { title: "實價課稅等未來可能法令之規定", text: "未來可能稅務法令諮詢及納稅人權利保障等。" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "asset-valuation",
    name: "資產評估",
    tagline: ["專業分析，創造價值", "協助資產最適配置"],
    icon: "calculator",
    photo: { src: "/images/services/asset.webp", alt: "地圖與文件", note: "替代圖：待確認" },
    sections: [
      {
        type: "numbered",
        heading: "動產鑑價、無形資產評價、企業評價",
        items: [
          { title: "機械、儀器、船舶、車輛、航空器、工業產品、材料等動產鑑價。" },
          { title: "商標、專利、著作權等資產評價。" },
          { title: "企業經營權、股權、股票、商譽、出資額及投資權益等權利評價。" },
          { title: "企業(股權)價值評估。" },
        ],
      },
    ],
  },
  {
    slug: "financial-planning",
    name: "不動產理財規劃",
    tagline: ["整合專業，量身規劃", "提供全方位諮詢服務"],
    icon: "certificate",
    photo: { src: "/images/services/financial.webp", alt: "桌上的規劃圖與模型" },
    sections: [
      {
        type: "numbered",
        items: [
          { title: "土增稅、奢侈稅等不動產稅移轉稅賦", text: "土增稅、奢侈稅、契稅、印花稅等試算。" },
          { title: "投資、財務、貸款及買賣流程等分析諮詢", text: "投資分析、財務分析、貸款分析、買賣流程分析等事務之諮詢。" },
          { title: "開發及市場分析、金融市場分析諮詢", text: "不動產開發流程、市場分析、市場潛力及行銷分析、財務可行性分析、金融市場分析等事務之諮詢。" },
          { title: "不動產開發信託諮詢" },
          { title: "不動產管理信託諮詢" },
          { title: "不動產處分信託諮詢" },
          { title: "估價事務之法令規定諮詢" },
          { title: "估價事務之市場行情諮詢" },
          { title: "合建、徵收、都更、重劃等複雜案件或土地、透天、公寓大廈等交易案件之估價事務諮詢" },
        ],
      },
    ],
  },
  {
    slug: "process",
    name: "估價委任流程",
    tagline: ["誠信合作，共創雙贏", "建構透明的市場環境"],
    icon: "handshake",
    photo: { src: "/images/services/process.webp", alt: "會議桌與城市景觀", note: "替代圖：待確認" },
    sections: [
      {
        type: "steps",
        items: [
          { title: "委託專案", text: "委託方透過電話聯繫、電子郵件或至本事務所向本事務所提出估價案件委託之需求。" },
          { title: "專案報價", text: "經與委託方交涉，了解勘估標的、委託目的、交付時間等委託需求後，專案人員將於約定時間內提供報價結果及繳費資訊等供委託方參考，達成共識後委託成立。" },
          { title: "案件執行", text: "依委託方所提供之勘估標的相關資料，本事務所將以此進行現場勘查、資料蒐集、案例蒐集、報告書撰寫等估價作業，並於約定期日內交付估價報告書。" },
          { title: "估價結果交付", text: "估價報告書完成後，可選擇以郵寄或是至本事務所收取案件估價報告書。" },
        ],
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
