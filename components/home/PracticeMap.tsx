"use client";

import { useId, useState } from "react";
import { practices } from "@/content/practices";
import { expertise } from "@/content/expertise";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { TransitionLink } from "@/components/site/TransitionLink";
import styles from "./PracticeMap.module.css";

const SHORT: Record<string, string> = {
  "appraisal-office": "不動產估價",
  "planning-office": "都市計畫",
  "land-office": "地政登記",
  brokerage: "不動產經紀",
  "asset-valuation": "資產鑑定",
};

/**
 * Chapter 06 — the umbrella as a field of parcels. Five entities occupy
 * adjacent regions; selecting one reveals its name, form and function.
 * Geometry is abstract and carries no survey meaning.
 */
export function PracticeMap() {
  const [active, setActive] = useState(0);
  const id = useId();
  const p = practices[active];
  const fields = expertise.filter((e) => p.expertise.includes(e.slug));

  return (
    <section className={`limestone section ${styles.root}`} aria-labelledby="structure-title">
      <div className="container">
        <div className="grid">
          <div className={styles.aside}>
            <ChapterLabel index="06" title="組織" en="Structure" />
            <h2 id="structure-title" className={styles.title}>
              五個專業單位，共用一個名字。
            </h2>
            <p className={styles.text}>
              茗強地政與土管不是單一公司，而是一個連結多個專業事務所與公司的整體。土地問題常常跨越專業的邊界；相鄰的結構，讓不同的專業可以在同一件事上共同工作。
            </p>

            <div className={styles.detail} aria-live="polite">
              <p className={styles.detailIndex}>
                {p.index} <span>{p.kind}</span>
              </p>
              <h3 className={styles.detailName}>{p.name}</h3>
              <p className={styles.detailEn}>{p.nameEn}</p>
              <p className={styles.detailFn}>{p.function}</p>
              <ul className={styles.detailFields}>
                {fields.map((f) => (
                  <li key={f.slug}>
                    <TransitionLink href={`/expertise/${f.slug}`} className="link link-quiet">
                      {f.index} {f.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.field}>
            <svg viewBox="0 0 1000 620" className={styles.svg} role="group" aria-label="茗強組織圖：五個相鄰的專業單位">
              <defs>
                <pattern id={`${id}-ticks`} width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 6 0 M 0 0 L 0 6" stroke="rgba(15,23,21,0.28)" strokeWidth="1" fill="none" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="1000" height="620" fill={`url(#${id}-ticks)`} />
              <rect x="0.5" y="0.5" width="999" height="619" fill="none" stroke="rgba(15,23,21,0.3)" />
              {practices.map((pr, i) => (
                <g
                  key={pr.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={i === active}
                  aria-label={`${pr.index} ${pr.name}`}
                  className={`${styles.parcel} ${i === active ? styles.parcelActive : ""}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                >
                  <path d={pr.parcel} className={styles.parcelShape} />
                  <text x={pr.label[0]} y={pr.label[1]} className={styles.parcelIndex}>
                    {pr.index}
                  </text>
                  <text x={pr.label[0]} y={pr.label[1] + 34} className={styles.parcelName}>
                    {SHORT[pr.id]}
                  </text>
                </g>
              ))}
              {/* survey nodes at shared vertices */}
              {[
                [420, 40],
                [400, 300],
                [60, 320],
                [700, 272],
                [940, 250],
                [380, 580],
                [720, 580],
              ].map(([x, y], i) => (
                <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="#8c6f3e" />
              ))}
              <text x="20" y="605" className={styles.caption}>
                MING CHIANG · FIELD OF PRACTICES · NOT TO SCALE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
