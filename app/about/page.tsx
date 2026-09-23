import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/ui/PageHead";
import { BoundaryLine } from "@/components/ui/BoundaryLine";
import { TransitionLink } from "@/components/site/TransitionLink";
import { site } from "@/content/site";
import { practices } from "@/content/practices";
import { expertise } from "@/content/expertise";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "關於茗強",
  description: "茗強地政與土管：自 2014 年起於臺中，連結不動產估價、都市計畫、地政、不動產經紀與資產鑑定五個專業單位與茗強學院。",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { l: "M", zh: "互助" },
  { l: "C", zh: "認真" },
  { l: "R", zh: "可靠" },
  { l: "E", zh: "熱忱" },
  { l: "A", zh: "精確" },
  { l: "F", zh: "清新" },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        kicker="關於茗強"
        en="About"
        title="一個名字，多個專業。"
        lead={`${site.name}自 ${site.foundedYear} 年起於${site.city}發展，是連結多個專業事務所與公司的整體識別，而非單一公司。`}
      />

      <section className={`container ${styles.intro}`}>
        <div className="grid">
          <figure className={styles.figure}>
            <Image
              src="/images/photo-office-window.png"
              alt="辦公室內的長桌，桌上放著地圖、圖紙與城市模型，窗外是山與城市"
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 66vw, 100vw"
              quality={72}
              priority
              className={styles.img}
            />
            <figcaption className={styles.caption}>
              <span>工作桌與城市</span>
              <span>Desk and city</span>
            </figcaption>
          </figure>
          <div className={styles.introText}>
            <p>
              土地問題很少只屬於一個專業。一筆土地的價值取決於它的分區與計畫，能否移轉取決於登記與稅務，是否值得交易則取決於以上所有判斷。
            </p>
            <p>
              茗強以一個識別連結不同的專業單位，讓估價、計畫、地政、經紀與鑑定可以在同一件事上協同工作，並各自對自己的專業負責。
            </p>
          </div>
        </div>
      </section>

      <section className={`container section ${styles.founder}`} aria-labelledby="founder-title">
        <BoundaryLine label="創辦人" end="Founder" />
        <div className={`grid ${styles.founderBody}`}>
          <div className={styles.founderName}>
            <h2 id="founder-title" className={styles.founderZh}>
              {site.founder.name}
            </h2>
            <p className={styles.founderEn}>{site.founder.nameEn}</p>
            <p className={styles.founderRole}>{site.founder.role}</p>
          </div>
          <div className={styles.founderText}>
            <p>{site.founder.name}於 {site.foundedYear} 年開始建立茗強，並主持集團內各專業單位與{site.academy.name}的發展。</p>
            <p className={styles.founderNote}>更完整的專業資歷、學歷與研究方向，待資料確認後補充。</p>
          </div>
        </div>
      </section>

      <section className={`ink section ${styles.group}`} aria-labelledby="group-title">
        <div className="container">
          <div className="grid">
            <div className={styles.groupText}>
              <p className="label">組成單位 · Practices</p>
              <h2 id="group-title" className={styles.groupTitle}>
                五個專業單位，加上一所學院。
              </h2>
              <ol className={styles.entities}>
                {practices.map((p) => {
                  const fields = expertise.filter((e) => p.expertise.includes(e.slug));
                  return (
                    <li key={p.id}>
                      <span className={styles.entIdx}>{p.index}</span>
                      <span className={styles.entName}>{p.name}</span>
                      <span className={styles.entEn}>{p.nameEn}</span>
                      <span className={styles.entFn}>{p.function}</span>
                      <span className={styles.entFields}>
                        {fields.map((f) => (
                          <TransitionLink key={f.slug} href={`/expertise/${f.slug}`} className="link link-quiet">
                            {f.name}
                          </TransitionLink>
                        ))}
                      </span>
                    </li>
                  );
                })}
                <li>
                  <span className={styles.entIdx}>06</span>
                  <span className={styles.entName}>{site.academy.name}</span>
                  <span className={styles.entEn}>{site.academy.nameEn}</span>
                  <span className={styles.entFn}>專業教育、研究與出版。</span>
                  <span className={styles.entFields}>
                    <TransitionLink href="/academy" className="link link-quiet">
                      前往學院
                    </TransitionLink>
                  </span>
                </li>
              </ol>
            </div>
            <figure className={styles.groupFigure}>
              <Image
                src="/images/ill-practices.png"
                alt="五個專業領域環繞城市的示意圖：估價、計畫、登記、經紀與鑑定"
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 45vw, 100vw"
                quality={72}
                className={styles.groupImg}
              />
              <figcaption className={styles.groupCaption}>示意圖：五個專業圍繞同一片土地。</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={`container section ${styles.values}`} aria-labelledby="values-title">
        <div className="grid">
          <div className={styles.valuesText}>
            <p className="label">識別 · Identity</p>
            <h2 id="values-title" className={styles.valuesTitle}>
              六項價值，寫在識別裡。
            </h2>
            <p className={styles.valuesDesc}>茗強的識別標誌以六邊形承載六項價值，也是集團內各單位共同的工作標準。</p>
            <ol className={styles.valueList}>
              {VALUES.map((v) => (
                <li key={v.l}>
                  <span className={styles.valueLetter}>{v.l}</span>
                  <span className={styles.valueZh}>{v.zh}</span>
                </li>
              ))}
            </ol>
          </div>
          <figure className={styles.logoFigure}>
            <Image src="/images/logo.webp" alt="茗強識別標誌：藍色六邊形與 MC 字母，周圍標示互助、認真、可靠、熱忱、精確、清新" width={542} height={441} sizes="(min-width: 1024px) 30vw, 60vw" quality={82} className={styles.logoImg} />
          </figure>
        </div>
      </section>
    </>
  );
}
