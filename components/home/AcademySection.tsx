"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TransitionLink } from "@/components/site/TransitionLink";
import { academyIntro, academyTabs, publications, relatedLinks } from "@/content/academy";
import { courses } from "@/content/courses";
import { mockup } from "@/content/site";
import styles from "./AcademySection.module.css";

type Key = (typeof academyTabs)[number]["key"];

export function AcademySection() {
  const [tab, setTab] = useState<Key>("intro");
  const a = mockup.academy;

  return (
    <section className={`section ${styles.root}`} aria-labelledby="home-academy">
      <div className="container">
        <SectionTitle id="home-academy" title="茗強學院" subtitle={a.subtitle} />

        <div className={styles.tabs} role="tablist" aria-label="茗強學院">
          {academyTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`acad-tab-${t.key}`}
              aria-selected={tab === t.key}
              aria-controls={`acad-panel-${t.key}`}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.body}>
          <figure className={styles.figure}>
            <Image src="/images/home/academy.webp" alt="農田與道路的空拍景觀" width={1600} height={1063} sizes="(min-width: 1024px) 56vw, 100vw" className={styles.img} />
            <figcaption className={styles.overlay}>
              <span className={styles.overlayZh}>
                {a.overlay[0]}
                <br />
                {a.overlay[1]}
              </span>
              <span className={styles.overlayRule} aria-hidden="true" />
              <span className={styles.overlayEn}>
                {a.overlayEn[0]}
                <br />
                {a.overlayEn[1]}
              </span>
            </figcaption>
          </figure>

          <div className={styles.panel} role="tabpanel" id={`acad-panel-${tab}`} aria-labelledby={`acad-tab-${tab}`}>
            {tab === "intro" ? (
              <>
                <h3 className={styles.panelTitle}>{academyIntro.title}</h3>
                <p className={styles.text}>{academyIntro.summary}</p>
                <TransitionLink href="/academy" className="pill pill-arrow">
                  {a.more}
                </TransitionLink>
              </>
            ) : null}

            {tab === "publications" ? (
              <>
                <h3 className={styles.panelTitle}>電子刊物</h3>
                <ul className={styles.rows}>
                  {publications.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <TransitionLink href={`/academy/publications/${p.id}`} className={styles.rowLink}>
                        <span className={styles.rowDate}>{p.date}</span>
                        <span className={styles.rowTitle}>{p.title}</span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
                <TransitionLink href="/academy/publications" className="pill pill-arrow">
                  {a.more}
                </TransitionLink>
              </>
            ) : null}

            {tab === "courses" ? (
              <>
                <h3 className={styles.panelTitle}>茗強課程</h3>
                <ul className={styles.rows}>
                  {courses.slice(0, 5).map((c) => (
                    <li key={c.id}>
                      <TransitionLink href={`/academy/courses/${c.id}`} className={styles.rowLink}>
                        <span className={styles.rowDate}>{c.date}</span>
                        <span className={styles.rowTitle}>{c.title}</span>
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
                <TransitionLink href="/academy/courses" className="pill pill-arrow">
                  {a.more}
                </TransitionLink>
              </>
            ) : null}

            {tab === "links" ? (
              <>
                <h3 className={styles.panelTitle}>相關連結</h3>
                <ul className={styles.rows}>
                  {relatedLinks.slice(0, 6).map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className={styles.rowLink}>
                        <span className={styles.rowTitle}>{l.title}</span>
                        <span className={styles.ext} aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <TransitionLink href="/academy/links" className="pill pill-arrow">
                  {a.more}
                </TransitionLink>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
