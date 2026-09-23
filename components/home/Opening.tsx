"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { registerGsap, headerOffset } from "@/lib/motion";
import { site } from "@/content/site";
import styles from "./Opening.module.css";

/**
 * Chapter 01 + 02. The entrance photograph opens almost still; on the
 * first scroll it is intersected by boundary geometry, the frame insets
 * to a measured plate, and the layers of land are named.
 */
const LINES = [
  "M -20 392 L 178 346 L 334 378 L 522 304 L 704 336 L 902 262 L 1020 284",
  "M 334 378 L 302 640",
  "M 522 304 L 566 -20",
  "M 704 336 L 758 640",
  "M 178 346 L 118 640",
  "M 902 262 L 946 -20",
  "M -20 520 L 118 508 L 302 540 L 560 470 L 758 500 L 1020 430",
];
const NODES: [number, number][] = [
  [178, 346],
  [334, 378],
  [522, 304],
  [704, 336],
  [902, 262],
  [302, 540],
  [560, 470],
];
const LAYERS = [
  { text: "地籍", en: "Cadastre", x: 33.4, y: 63 },
  { text: "使用分區", en: "Zoning", x: 52.2, y: 50.7 },
  { text: "權利", en: "Rights", x: 70.4, y: 56 },
  { text: "價值", en: "Value", x: 90.2, y: 43.7 },
];

export function Opening() {
  const root = useRef<HTMLElement>(null);

  // Layout effect: pins re-parent the section into a spacer, so triggers must be
  // reverted before React removes the node on route change.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const q = gsap.utils.selector(el);
    const paths = q<SVGPathElement>("[data-line]");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 1024px)",
      },
      (ctx) => {
        const { wide } = ctx.conditions as { wide: boolean };
        if (wide) {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: () => `top ${headerOffset()}px`,
              end: "+=130%",
              pin: true,
              refreshPriority: 3,
              scrub: 0.6,
              anticipatePin: 1,
            },
          });
          tl.to(q(`.${styles.plate}`), { y: 48, opacity: 0, duration: 0.3 }, 0)
            .to(q(`.${styles.media}`), { scale: 1.035, duration: 1 }, 0)
            .to(q(`.${styles.media}`), { filter: "saturate(0.82) brightness(0.95)", duration: 0.7 }, 0.2)
            .to(paths, { strokeDashoffset: 0, duration: 0.55, stagger: 0.04 }, 0.12)
            .to(q(`.${styles.node}`), { scale: 1, duration: 0.15, stagger: 0.03 }, 0.4)
            .to(q(`.${styles.frame}`), { clipPath: "inset(7% 6% 12% 6%)", duration: 0.5 }, 0.45)
            .to(q(`.${styles.ticks}`), { opacity: 1, duration: 0.3 }, 0.6)
            .to(q(`.${styles.layer}`), { opacity: 1, y: 0, duration: 0.18, stagger: 0.08 }, 0.62)
            .to(q(`.${styles.folio}`), { opacity: 1, duration: 0.2 }, 0.8);
          return () => tl.kill();
        }
        // Narrow viewports: no pin. Lines draw once on entering; labels follow.
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          once: true,
          onEnter: () => {
            gsap.to(paths, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.08, delay: 0.3 });
            gsap.to(q(`.${styles.node}`), { scale: 1, duration: 0.4, stagger: 0.05, delay: 1.1 });
            gsap.to(q(`.${styles.layer}`), { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 1.4 });
          },
        });
        return () => st.kill();
      }
    );

    // Reduced motion: everything visible, nothing pinned.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(paths, { strokeDashoffset: 0 });
      gsap.set(q(`.${styles.node}`), { scale: 1 });
      gsap.set(q(`.${styles.layer}`), { opacity: 1, y: 0 });
      // Ticks belong to the inset frame, which never happens without motion.
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={styles.root} aria-labelledby="opening-title">
      <div className={styles.stage}>
        <div className={styles.frame}>
          <div className={styles.media}>
            <Image
              src="/images/photo-entrance.png"
              alt="石材與玻璃構成的建築入口，遠處是城市天際線"
              fill
              priority
              quality={82}
              sizes="100vw"
              className={styles.img}
            />
          </div>
          <svg className={styles.cadastre} viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {LINES.map((d, i) => (
              <path key={i} d={d} data-line />
            ))}
            {NODES.map(([x, y], i) => (
              <rect key={i} x={x - 4} y={y - 4} width="8" height="8" className={styles.node} style={{ transformOrigin: `${x}px ${y}px` }} />
            ))}
          </svg>
        </div>
        <div className={styles.ticks} aria-hidden="true">
          <span className={styles.tickRow} />
          <span className={`${styles.tickRow} ${styles.tickRowBottom}`} />
        </div>
        <ul className={styles.layers} aria-label="土地的層次">
          {LAYERS.map((l) => (
            <li key={l.text} className={styles.layer} style={{ left: `${l.x}%`, top: `${l.y}%` }}>
              <span>{l.text}</span>
              <span className={styles.layerEn}>{l.en}</span>
            </li>
          ))}
        </ul>
        <p className={styles.folio}>
          <span>01 — 02</span>
          <span>Place → Boundary</span>
        </p>

        <div className={styles.plate}>
          <p className={styles.kicker}>
            <span>{site.city}</span>
            <span>自 {site.foundedYear} 年</span>
          </p>
          <h1 id="opening-title" className={styles.title}>
            {site.name}
          </h1>
          <p className={styles.titleEn}>{site.nameEn}</p>
          <p className={styles.intro}>
            不動產估價、都市計畫、地政登記、不動產經紀與資產鑑定。
            <br />
            五個專業單位，一套關於土地的完整判斷。
          </p>
        </div>
      </div>
    </section>
  );
}
