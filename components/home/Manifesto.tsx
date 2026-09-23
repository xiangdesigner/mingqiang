import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Reveal } from "@/components/ui/Reveal";
import { BoundaryLine } from "@/components/ui/BoundaryLine";
import styles from "./Manifesto.module.css";

/** Chapter 03. A short editorial statement, set with room around it. */
export function Manifesto() {
  return (
    <section className={`section ${styles.root}`} aria-labelledby="manifesto-title">
      <div className="container">
        <Reveal className="grid">
          <div className={styles.margin} data-reveal>
            <ChapterLabel index="03" title="宣言" en="Manifesto" />
          </div>
          <div className={styles.body}>
            <h2 id="manifesto-title" className={styles.statement} data-reveal>
              一筆土地，從來不只是一塊地。
            </h2>
            <p className={styles.text} data-reveal>
              它同時是地理、經濟、所有權、法律、權利、法規、開發潛力、稅務、歷史與價值。
              這些層次彼此牽動，任何一層的判斷失準，都會改變整體的結果。
            </p>
            <p className={styles.text} data-reveal>
              茗強的工作，是在這些層次交會的地方，做出可以被檢驗的判斷。
            </p>
          </div>
        </Reveal>
        <div className={styles.rule}>
          <BoundaryLine label="03" end="Layers of land" />
        </div>
      </div>
    </section>
  );
}
