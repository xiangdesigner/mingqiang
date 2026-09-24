import type { Metadata } from "next";
import { PageTitle } from "@/components/ui/PageTitle";
import { AcademyNav } from "@/components/academy/AcademyNav";
import { relatedLinks } from "@/content/academy";
import inner from "../../inner.module.css";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "相關連結",
  description: "不動產估價、地政、城鄉規劃相關公會、學校與政府資訊系統連結。",
  alternates: { canonical: "/academy/links" },
};

export default function LinksPage() {
  return (
    <>
      <PageTitle title="相關連結" />
      <section className={`container ${inner.wrap}`}>
        <AcademyNav current="/academy/links" />
        <ul className={styles.list}>
          {relatedLinks.map((l) => (
            <li key={l.href} className={styles.item}>
              <h2 className={styles.title}>{l.title}</h2>
              <div className={`prose ${styles.text}`}>
                {l.text.map((t) => (
                  <p key={t.slice(0, 30)}>{t}</p>
                ))}
              </div>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="pill pill-sm pill-arrow">
                點我進入連結
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
