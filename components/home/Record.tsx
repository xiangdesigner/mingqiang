import { site } from "@/content/site";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { BoundaryLine } from "@/components/ui/BoundaryLine";
import styles from "./Record.module.css";

/** Chapter 08 — a short ledger of verified facts. No invented metrics. */
export function Record() {
  const rows = [
    { k: "起始", v: `${site.foundedYear} 年`, note: "Founded" },
    { k: "所在", v: site.city, note: site.cityEn },
    { k: "組成", v: "三個專業事務所、兩家有限公司、一所學院", note: "Structure" },
    { k: "創辦人", v: site.founder.name, note: site.founder.nameEn },
    { k: "教育", v: `${site.academy.name}：專業教育、研究與出版`, note: site.academy.nameEn },
  ];
  return (
    <section className={`section ${styles.root}`} aria-labelledby="record-title">
      <div className="container">
        <div className="grid">
          <div className={styles.margin}>
            <ChapterLabel index="08" title="紀錄" en="Record" />
            <h2 id="record-title" className="sr-only">
              紀錄
            </h2>
          </div>
          <dl className={styles.ledger}>
            {rows.map((r) => (
              <div key={r.k} className={styles.row}>
                <dt>{r.k}</dt>
                <dd>
                  <span className={styles.value}>{r.v}</span>
                  <span className={styles.noteText}>{r.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.rule}>
          <BoundaryLine label={`${site.foundedYear}`} end="Present" />
        </div>
      </div>
    </section>
  );
}
