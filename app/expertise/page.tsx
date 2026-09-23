import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/ui/PageHead";
import { TransitionLink } from "@/components/site/TransitionLink";
import { ProceduralPlan } from "@/components/home/ExpertiseSequence";
import { expertise } from "@/content/expertise";
import { practices } from "@/content/practices";
import styles from "./expertise.module.css";

export const metadata: Metadata = {
  title: "專業領域",
  description: "不動產估價、都市及區域計畫、地政與產權登記、不動產經紀、資產與企業鑑定、不動產財務規劃。",
  alternates: { canonical: "/expertise" },
};

export default function ExpertiseIndexPage() {
  return (
    <>
      <PageHead
        index="05"
        kicker="專業領域"
        en="Expertise"
        title="六個領域，一套判斷。"
        lead="每一個領域由對應的專業單位執行；當問題跨越領域，各單位在同一件事上協同工作。"
      />
      <section className="container">
        <ol className={styles.list}>
          {expertise.map((e) => {
            const p = practices.find((x) => x.id === e.practiceId);
            return (
              <li key={e.slug} className={styles.item}>
                <div className={`ink ${styles.plate}`}>
                  {e.image ? <Image src={e.image.src} alt="" width={800} height={800} sizes="(min-width: 1024px) 33vw, 100vw" quality={72} className={styles.img} /> : <ProceduralPlan />}
                </div>
                <div className={styles.body}>
                  <p className={styles.index}>
                    {e.index} <span>{e.nameEn}</span>
                  </p>
                  <h2 className={styles.name}>{e.name}</h2>
                  <p className={styles.summary}>{e.summary}</p>
                  <p className={styles.practice}>{p?.name}</p>
                  <TransitionLink href={`/expertise/${e.slug}`} className="action">
                    閱讀
                  </TransitionLink>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
