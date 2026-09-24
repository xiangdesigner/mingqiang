import type { Metadata } from "next";
import { PageTitle } from "@/components/ui/PageTitle";
import { Accordion } from "@/components/ui/Accordion";
import { trackIntro, trackItems } from "@/content/track";
import inner from "../inner.module.css";
import styles from "./track.module.css";

export const metadata: Metadata = {
  title: "服務實績",
  description: "茗強不動產估價師事務所承作政府單位委託執行不動產估價之實績。",
  alternates: { canonical: "/track-record" },
};

export default function TrackRecordPage() {
  const items = trackItems.map((t) => ({
    id: `item-${t.index}`,
    title: `${t.index}.${t.title}`,
    content:
      t.rows.length > 0 ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            {t.header ? (
              <thead>
                <tr>
                  {t.header.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`prose ${styles.prose}`}>
          {t.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      ),
  }));

  return (
    <>
      <PageTitle title="服務實績" />
      <section className={`container ${inner.wrap}`}>
        <h2 className={inner.subheading}>{trackIntro.heading}</h2>
        <p className={styles.intro}>{trackIntro.text}</p>
        <Accordion items={items} />
      </section>
    </>
  );
}
