"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { mockup } from "@/content/site";
import styles from "./HeroBanner.module.css";

/**
 * Homepage hero. Built as a carousel per the Figma note ("add the remaining
 * images to the carousel after they are provided"): the copy is web text,
 * the background is the supplied text-free image. Dots and auto-advance
 * appear only once there is more than one slide.
 */
const slides = [{ src: "/images/home/hero-01.webp", alt: "河岸城市天際線與山景", width: 1759, height: 894 }];

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => window.clearInterval(id);
  }, [count]);

  const h = mockup.hero;
  return (
    <section className={styles.hero} aria-label="主視覺">
      <div className={styles.slides} aria-hidden={count < 2 ? undefined : "false"}>
        {slides.map((s, i) => (
          <div key={s.src} className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}>
            <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className={styles.img} />
          </div>
        ))}
      </div>
      <div className={styles.fade} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{h.kicker}</p>
          <h1 className={styles.headline}>
            <span>{h.headline[0]}</span>
            <span>{h.headline[1]}</span>
          </h1>
          <p className={styles.desc}>
            <span>{h.description[0]}</span>
            <span>{h.description[1]}</span>
          </p>
          <p className={styles.label}>
            <span className={styles.labelRule} aria-hidden="true" />
            {h.label}
          </p>
        </div>

        <p className={styles.tag}>
          <span className={styles.tagLine}>{h.tag[0]}</span>
          <span className={styles.tagLine}>{h.tag[1]}</span>
          <svg className={styles.tagStroke} viewBox="0 0 260 14" preserveAspectRatio="none" aria-hidden="true">
            <path d="M2 10 C 70 2, 170 2, 258 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </p>
      </div>

      {count > 1 ? (
        <div className={styles.dots} role="tablist" aria-label="輪播">
          {slides.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === index} aria-label={`第 ${i + 1} 張`} className={`${styles.dot} ${i === index ? styles.dotActive : ""}`} onClick={() => setIndex(i)} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
