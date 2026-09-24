import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";
import { about } from "@/content/about";
import inner from "../inner.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "關於茗強",
  description: "茗強地政與土管的成立緣由、經營理念、立業宗旨、重大記事、組織架構與專業團隊。",
  alternates: { canonical: "/about" },
};

function Num({ index, title, en, light }: { index: string; title: string; en: string; light?: boolean }) {
  return (
    <div className={`${inner.num} ${light ? styles.numLight : ""}`}>
      <span className={inner.numIndex}>{index}</span>
      <span className={inner.numTitle}>{title}</span>
      <span className={inner.numEn}>({en})</span>
    </div>
  );
}

export default function AboutPage() {
  const { establishment: e, philosophy: p, purpose: u, events: ev, organization: o, team: t } = about;
  const f = t.founder;
  const sections = [e, p, u, ev, o, t];
  return (
    <>
      <PageTitle title="關於我們" />
      <nav className={`container ${styles.jump}`} aria-label="章節">
        {sections.map((s) => (
          <a key={s.index} href={`#about-${s.index}`}>
            <span>{s.index}</span>
            {s.title}
          </a>
        ))}
      </nav>

      <section id={`about-${e.index}`} className={`container ${styles.section}`}>
        <div className={inner.row}>
          <figure className={inner.media}>
            <Image src={e.photo.src} alt={e.photo.alt} width={e.photo.width} height={e.photo.height} sizes="(min-width: 768px) 40vw, 100vw" />
          </figure>
          <div>
            <Num index={e.index} title={e.title} en={e.titleEn} />
            <p className={styles.acronym}>{e.acronym}</p>
            <div className={`prose ${styles.text}`}>
              {e.paragraphs.map((para) => (
                <p key={para.slice(0, 20)}>{para}</p>
              ))}
            </div>
            <div className={styles.pair}>
              <Image src={e.valuesImage.src} alt={e.valuesImage.alt} width={e.valuesImage.width} height={e.valuesImage.height} sizes="(min-width: 768px) 24vw, 60vw" />
              <Image src={e.wheelImage.src} alt={e.wheelImage.alt} width={e.wheelImage.width} height={e.wheelImage.height} sizes="(min-width: 768px) 24vw, 60vw" />
            </div>
          </div>
        </div>
      </section>

      <section id={`about-${p.index}`} className={styles.dark}>
        <div className={`container ${styles.darkInner}`}>
          <Num index={p.index} title={p.title} en={p.titleEn} light />
          <p className={styles.darkLead}>{p.lead}</p>
          <div className={`prose ${styles.darkText}`}>
            {p.paragraphs.map((para) => (
              <p key={para.slice(0, 20)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <section id={`about-${u.index}`} className={`container ${styles.section}`}>
        <Num index={u.index} title={u.title} en={u.titleEn} />
        <p className={inner.lead}>{u.lead}</p>
        <p className={`${inner.prose} ${styles.text}`}>{u.text}</p>
        <div className={styles.pairWide}>
          <Image src={u.attitudeImage.src} alt={u.attitudeImage.alt} width={u.attitudeImage.width} height={u.attitudeImage.height} sizes="(min-width: 768px) 45vw, 100vw" />
          <Image src={u.teaImage.src} alt={u.teaImage.alt} width={u.teaImage.width} height={u.teaImage.height} sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
      </section>

      <section id={`about-${ev.index}`} className={`container ${styles.section}`}>
        <Num index={ev.index} title={ev.title} en={ev.titleEn} />
        <ol className={styles.timeline}>
          {ev.timeline.map((item, i) => (
            <li key={i} className={`${styles.tl} ${"muted" in item && item.muted ? styles.tlMuted : ""}`}>
              <span className={styles.tlYear}>{item.year}</span>
              <span className={styles.tlDot} aria-hidden="true" />
              <span className={styles.tlRoc}>{item.roc}</span>
              <span className={styles.tlBody}>
                <span className={styles.tlTitle}>{item.title}</span>
                {"text" in item && item.text ? <span className={styles.tlText}>{item.text}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section id={`about-${o.index}`} className={styles.gray}>
        <div className={`container ${styles.section}`}>
          <Num index={o.index} title={o.title} en={o.titleEn} />
          <div className={`prose ${inner.prose} ${styles.text}`}>
            {o.paragraphs.map((para) => (
              <p key={para.slice(0, 20)}>{para}</p>
            ))}
          </div>
          <figure className={styles.org}>
            <Image src={o.image.src} alt={o.image.alt} width={o.image.width} height={o.image.height} sizes="(min-width: 1024px) 80vw, 100vw" />
          </figure>
        </div>
      </section>

      <section id={`about-${t.index}`} className={`container ${styles.section} ${inner.wrap}`}>
        <Num index={t.index} title={t.title} en={t.titleEn} />
        <div className={styles.team}>
          <div className={styles.person}>
            <Image src={f.photo.src} alt={f.photo.alt} width={f.photo.width} height={f.photo.height} sizes="(min-width: 768px) 26vw, 60vw" className={styles.portrait} />
            <p className={styles.personRole}>{f.role}</p>
            <p className={styles.personName}>{f.name}</p>
          </div>
          <div className={styles.cv}>
            <div>
              <h3 className={styles.cvTitle}>學歷</h3>
              <ul className={styles.cvList}>{f.education.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className={styles.cvTitle}>現職</h3>
              <ul className={styles.cvList}>{f.current.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className={styles.cvTitle}>得獎事蹟</h3>
              <ul className={`${styles.cvList} ${styles.award}`}>{f.awards.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className={styles.awardImages}>
                {f.awardImages.map((img) => (
                  <Image key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 22vw, 80vw" />
                ))}
              </div>
            </div>
            <div>
              <h3 className={styles.cvTitle}>經歷</h3>
              <ul className={styles.cvList}>{f.experience.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className={styles.cvTitle}>證照</h3>
              <ul className={styles.cvList}>{f.licenses.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className={styles.cvWide}>
              <h3 className={styles.cvTitle}>發表之論文、期刊等著作</h3>
              <ul className={`${styles.cvList} ${styles.pubs}`}>{f.publications.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
