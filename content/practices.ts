/**
 * The five professional entities operating under the 茗強 identity.
 * `parcel` is the SVG path (0–1000 × 0–620 field) each entity occupies in
 * the PracticeMap composition. Geometry is abstract; it is not survey data.
 */
export type Practice = {
  id: string;
  index: string;
  name: string;
  nameEn: string;
  kind: string;
  function: string;
  expertise: string[]; // expertise slugs this practice handles
  parcel: string;
  label: [number, number];
};

export const practices: Practice[] = [
  {
    id: "appraisal-office",
    index: "01",
    name: "茗強不動產估價師事務所",
    nameEn: "Ming Chiang Real Estate Appraiser Office",
    kind: "專業事務所",
    function: "不動產估價與價值分析。",
    expertise: ["real-estate-appraisal"],
    parcel: "M 40 40 L 420 40 L 400 300 L 60 320 Z",
    label: [92, 92],
  },
  {
    id: "planning-office",
    index: "02",
    name: "茗強都市計畫技師事務所",
    nameEn: "Ming Chiang Urban Planning Engineer Office",
    kind: "專業事務所",
    function: "都市與區域計畫、土地使用與開發分析。",
    expertise: ["urban-planning"],
    parcel: "M 420 40 L 960 40 L 940 250 L 400 300 Z",
    label: [470, 92],
  },
  {
    id: "land-office",
    index: "03",
    name: "茗強地政士事務所",
    nameEn: "Ming Chiang Land Administration Agent Office",
    kind: "專業事務所",
    function: "地政作業、產權登記與不動產稅務諮詢。",
    expertise: ["land-administration"],
    parcel: "M 60 320 L 400 300 L 380 580 L 40 580 Z",
    label: [92, 372],
  },
  {
    id: "brokerage",
    index: "04",
    name: "茗強不動產經紀有限公司",
    nameEn: "Ming Chiang Real Estate Brokerage Co., Ltd.",
    kind: "有限公司",
    function: "不動產經紀與交易諮詢。",
    expertise: ["real-estate-brokerage"],
    parcel: "M 400 300 L 700 272 L 720 580 L 380 580 Z",
    label: [452, 372],
  },
  {
    id: "asset-valuation",
    index: "05",
    name: "茗強資產鑑定有限公司",
    nameEn: "Ming Chiang Asset Appraisal Co., Ltd.",
    kind: "有限公司",
    function: "資產鑑定、企業價值與無形資產評價。",
    expertise: ["asset-valuation", "property-financial-planning"],
    parcel: "M 700 272 L 940 250 L 960 580 L 720 580 Z",
    label: [752, 372],
  },
];
