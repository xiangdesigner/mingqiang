"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, useFinePointer, useReducedMotion } from "@/lib/motion";
import styles from "./Cursor.module.css";

/**
 * Contextual cursor label. The system cursor is never replaced; a small
 * mono label appears beside it only over elements carrying [data-cursor].
 * Fine-pointer devices only.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fine || reduced) return;
    const el = ref.current;
    if (!el) return;
    const { gsap } = registerGsap();
    const x = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 18);
      y(e.clientY + 18);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(t?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;
  return (
    <div ref={ref} className={`${styles.cursor} ${label ? styles.visible : ""}`} aria-hidden="true">
      {label}
    </div>
  );
}
