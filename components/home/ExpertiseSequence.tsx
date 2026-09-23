"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { expertise } from "@/content/expertise";
import { practices } from "@/content/practices";
import { TransitionLink } from "@/components/site/TransitionLink";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { registerGsap, headerOffset } from "@/lib/motion";
import { getLenis } from "@/lib/lenis-store";
import styles from "./ExpertiseSequence.module.css";

/**
 * Chapter 05 — a pinned editorial index. Discipline typography on the left,
 * a plate of illustrations on the right that changes as the reader scrolls.
 * Below 1024px it becomes a vertical editorial sequence with no pinning.
 */
export function ExpertiseSequence() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const stRef = useRef<{ start: number; end: number } | null>(null);
  const n = expertise.length;

  // Layout effect so the pin is reverted before React detaches the section.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: () => `top ${headerOffset()}px`,
        end: `+=${(n - 1) * 70}%`,
        pin: true,
        refreshPriority: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          if (i !== activeRef.current) {
            activeRef.current = i;
            setActive(i);
          }
        },
        onRefresh: (self) => {
          stRef.current = { start: self.start, end: self.end };
        },
      });
      stRef.current = { start: st.start, end: st.end };
      return () => {
        st.kill();
        stRef.current = null;
      };
    });
    return () => mm.revert();
  }, [n]);

  const jump = (i: number) => {
    const r = stRef.current;
    if (!r) return;
    const y = r.start + ((i + 0.5) / n) * (r.end - r.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const item = expertise[active];
  const practice = practices.find((p) => p.id === item.practiceId);

  return (
    <section ref={root} className={styles.root} aria-labelledby="expertise-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <ChapterLabel index="05" title="專業領域" en="Expertise" />
          <h2 id="expertise-title" className="sr-only">
            專業領域
          </h2>
        </div>

        {/* Desktop pinned index */}
        <div className={styles.stage}>
          <ol className={styles.list}>
            {expertise.map((e, i) => (
              <li key={e.slug} className={`${styles.item} ${i === active ? styles.itemActive : ""}`}>
                <button
                  type="button"
                  className={styles.itemButton}
                  onClick={() => {
                    setActive(i);
                    activeRef.current = i;
                    jump(i);
                  }}
                  aria-current={i === active ? "true" : undefined}
                >
                  <span className={styles.itemIndex}>{e.index}</span>
                  <span className={styles.itemName}>{e.name}</span>
                  <span className={styles.itemEn}>{e.nameEn}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.detail} aria-live="polite">
            <p className={styles.summary} key={item.slug}>
              {item.summary}
            </p>
            <p className={styles.practice}>{practice?.name}</p>
            <TransitionLink href={`/expertise/${item.slug}`} className="action">
              查看 {item.name}
            </TransitionLink>
          </div>

          <div className={`ink ${styles.plate}`} data-cursor="VIEW">
            {expertise.map((e, i) => (
              <div key={e.slug} className={`${styles.slide} ${i === active ? styles.slideActive : i < active ? styles.slidePast : ""}`}>
                {e.image ? (
                  <Image src={e.image.src} alt="" width={800} height={800} sizes="(min-width: 1024px) 40vw, 100vw" quality={72} className={styles.slideImg} />
                ) : (
                  <ProceduralPlan />
                )}
              </div>
            ))}
            <p className={styles.plateFolio}>
              <span>
                {item.index} / {String(n).padStart(2, "0")}
              </span>
              <span>{item.nameEn}</span>
            </p>
          </div>
        </div>

        {/* Compact vertical sequence */}
        <ol className={styles.vertical}>
          {expertise.map((e) => {
            const p = practices.find((x) => x.id === e.practiceId);
            return (
              <li key={e.slug} className={styles.vItem}>
                <div className={`ink ${styles.vPlate}`}>
                  {e.image ? <Image src={e.image.src} alt="" width={800} height={800} sizes="100vw" quality={72} className={styles.vImg} /> : <ProceduralPlan />}
                </div>
                <div className={styles.vBody}>
                  <p className={styles.vIndex}>
                    {e.index} <span>{e.nameEn}</span>
                  </p>
                  <h3 className={styles.vName}>{e.name}</h3>
                  <p className={styles.vSummary}>{e.summary}</p>
                  <p className={styles.vPractice}>{p?.name}</p>
                  <TransitionLink href={`/expertise/${e.slug}`} className="action">
                    查看
                  </TransitionLink>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** For the discipline without a supplied illustration: a schedule drawn as boundary lines. */
export function ProceduralPlan() {
  const phases = ["取得", "持有", "開發", "處分"];
  return (
    <svg className={styles.plan} viewBox="0 0 600 600" role="img" aria-label="持有、開發與處分的時間表示意">
      <g stroke="rgba(241,237,228,0.2)" strokeWidth="1">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1="60" x2="540" y1={90 + i * 35} y2={90 + i * 35} />
        ))}
      </g>
      <g stroke="#b8985f" strokeWidth="1.25" fill="none">
        <line x1="60" y1="300" x2="540" y2="300" />
        {phases.map((_, i) => {
          const x = 60 + (i / (phases.length - 1)) * 480;
          return <line key={i} x1={x} y1="286" x2={x} y2="314" />;
        })}
        <path d="M 60 300 L 180 300 L 180 230 L 340 230 L 340 160 L 540 160" strokeDasharray="4 4" />
      </g>
      <g fill="#b8985f">
        {phases.map((_, i) => {
          const x = 60 + (i / (phases.length - 1)) * 480;
          return <rect key={i} x={x - 3} y="297" width="6" height="6" />;
        })}
      </g>
      <g fontFamily="var(--font-mono)" fontSize="12" fill="rgba(241,237,228,0.8)" letterSpacing="2">
        {phases.map((p, i) => {
          const x = 60 + (i / (phases.length - 1)) * 480;
          return (
            <text key={p} x={x} y="345" textAnchor={i === 0 ? "start" : i === phases.length - 1 ? "end" : "middle"}>
              {p}
            </text>
          );
        })}
        <text x="60" y="520">
          T0
        </text>
        <text x="540" y="520" textAnchor="end">
          Tn
        </text>
      </g>
    </svg>
  );
}
