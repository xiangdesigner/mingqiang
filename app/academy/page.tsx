import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { AcademyIndex } from "@/components/home/AcademyIndex";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.academy.name,
  description: "茗強學院：土地經濟、估價、都市計畫、地政與法規的研究、評論、專業教育與考試資源。",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  return (
    <>
      <PageHead
        kicker={site.academy.name}
        en={site.academy.nameEn}
        title="知識，也是一種土地。"
        lead="學院整理茗強在研究、教學與實務中累積的內容，面向從業者、準專業者與需要理解制度的委託人。"
      />
      <AcademyIndex full />
    </>
  );
}
