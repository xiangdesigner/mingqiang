import { academySections, articles } from "@/content/academy";
import { site } from "@/content/site";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { TransitionLink } from "@/components/site/TransitionLink";
import styles from "./AcademyIndex.module.css";

/** Chapter 10 — the Academy as a journal masthead and section index. */
export function AcademyIndex({ full = false }: { full?: boolean }) {
  return (
    <section className={`${full ? styles.rootFull : "section"} ${styles.root}`} aria-labelledby="academy-title">
      <div className="container">
        {full ? (
          <div className={styles.mastheadFull}>
            <h2 id="academy-title" className="label">
              欄目 · Sections
            </h2>
          </div>
        ) : (
          <div className={`grid ${styles.masthead}`}>
            <div className={styles.mastLeft}>
              <ChapterLabel index="10" title="學院" en="Academy" />
              <h2 id="academy-title" className={styles.title}>
                {site.academy.name}
              </h2>
              <p className={styles.titleEn}>{site.academy.nameEn}</p>
            </div>
            <p className={styles.desc}>
              面向專業者與準專業者的研究、評論與教育平台。內容涵蓋土地經濟、估價、都市計畫、地政與相關法規，以及專業考試的學習資源。
            </p>
          </div>
        )}

        <ol className={styles.sections}>
          {academySections.map((s) => (
            <li key={s.code} className={styles.section}>
              <span className={styles.code}>{s.code}</span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.en}>{s.nameEn}</span>
              <span className={styles.sdesc}>{s.description}</span>
            </li>
          ))}
        </ol>

        <div className={styles.foot}>
          {articles.length === 0 ? (
            <p className={styles.empty}>
              <span className={styles.emptyMark} aria-hidden="true" />
              文章目錄整理中。刊出後將依欄目、日期與作者編列於此。
            </p>
          ) : null}
          {!full ? (
            <TransitionLink href="/academy" className="action">
              前往學院
            </TransitionLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
