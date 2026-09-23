import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { site } from "@/content/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "使用條款",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHead kicker="使用條款" en="Terms" title="使用條款" />
      <section className={`container ${styles.body}`}>
        <div className="grid">
          <div className={styles.text}>
            <p className={styles.note}>本頁為最小內容版本，正式條文待法務審閱後更新。</p>
            <h2>內容性質</h2>
            <p>本網站內容為{site.name}及其組成單位的一般性介紹，不構成針對個案的專業意見。任何估價、計畫、登記、稅務或交易決策，應以正式委託後出具的文件為準。</p>
            <h2>智慧財產</h2>
            <p>本網站的文字、圖像與識別，除另有標示外，屬{site.name}所有。未經同意不得轉載或作商業使用。</p>
            <h2>外部連結</h2>
            <p>本網站可能包含外部網站連結，其內容由各該網站負責。</p>
          </div>
        </div>
      </section>
    </>
  );
}
