import Image from "next/image";
import { site } from "@/content/site";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import styles from "./Philosophy.module.css";

/** Chapter 09 — the quietest section. Material, light, and two sentences. */
export function Philosophy() {
  return (
    <section className={`limestone ${styles.root}`} aria-labelledby="philosophy-title">
      <div className="container">
        <div className="grid">
          <figure className={styles.figure}>
            <div className={styles.media}>
              <Image
                src="/images/photo-desk-detail.png"
                alt="木桌上的地圖與描圖紙，一枝筆置於其上，午後光線斜照"
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={72}
                className={styles.img}
              />
            </div>
            <figcaption className={styles.caption}>
              <span>09</span>
              <span>工作桌</span>
              <span>Desk, afternoon</span>
            </figcaption>
          </figure>

          <div className={styles.text}>
            <ChapterLabel index="09" title="理念" en="Philosophy" />
            <h2 id="philosophy-title" className={styles.motto}>
              {site.motto}
            </h2>
            <p className={styles.para}>
              「茗」取自佳茗。好的專業判斷如同好茶，入口未必濃烈，回甘卻長而穩定。一份報告、一次諮詢的價值，往往在事後被反覆檢驗時才完整顯現。
            </p>
            <p className={styles.creed}>{site.creed}</p>
            <p className={styles.para}>誠信是所有工作的基礎。由誠信建立的信任，是茗強與委託人長期合作的方式。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
