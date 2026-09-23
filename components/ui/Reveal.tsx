"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { registerGsap } from "@/lib/motion";
import styles from "./Reveal.module.css";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms between children marked with [data-reveal]. */
  stagger?: number;
};

/**
 * One-time entrance: children with [data-reveal] rise 12px and fade in
 * when the block enters the viewport. Reduced motion shows immediately.
 */
export function Reveal({ children, as: Tag = "div", className, stagger = 90 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(items, { y: 14, opacity: 0 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => gsap.to(items, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: stagger / 1000 }),
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [stagger]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = Tag as any;
  return (
    <El ref={ref} className={`${styles.root} ${className ?? ""}`}>
      {children}
    </El>
  );
}
