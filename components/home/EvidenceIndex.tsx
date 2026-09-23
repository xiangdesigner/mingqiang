import { expertise } from "@/content/expertise";
import { practices } from "@/content/practices";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { TransitionLink } from "@/components/site/TransitionLink";
import styles from "./EvidenceIndex.module.css";

/**
 * Chapter 07 — an index of professional scope. Individual assignments are
 * not published here; the index states, per discipline, what is handled and
 * by which entity. Nothing beyond supplied content is claimed.
 */
export function EvidenceIndex() {
  return (
    <section className={`section ${styles.root}`} aria-labelledby="evidence-title">
      <div className="container">
        <div className={`grid ${styles.head}`}>
          <div className={styles.headLeft}>
            <ChapterLabel index="07" title="服務範疇" en="Index of services" />
            <h2 id="evidence-title" className={styles.title}>
              每一類問題，都有對應的專業與執行單位。
            </h2>
          </div>
          <p className={styles.note}>
            委託案件內容不對外公開。以下為各專業領域的服務範疇與執行單位，供辨識適合的諮詢對象。
          </p>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">領域</th>
              <th scope="col">執行單位</th>
              <th scope="col">範疇</th>
            </tr>
          </thead>
          <tbody>
            {expertise.map((e) => {
              const p = practices.find((x) => x.id === e.practiceId);
              return (
                <tr key={e.slug}>
                  <td className={styles.idx}>{e.index}</td>
                  <td className={styles.name}>
                    <TransitionLink href={`/expertise/${e.slug}`} className="link link-quiet">
                      {e.name}
                    </TransitionLink>
                    <span className={styles.en}>{e.nameEn}</span>
                  </td>
                  <td className={styles.practice}>{p?.name}</td>
                  <td className={styles.scope}>{e.scope.join("　")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
