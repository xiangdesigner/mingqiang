"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerGsap, prefersReducedMotion } from "@/lib/motion";
import styles from "./PageTransition.module.css";

type Ctx = { navigate: (href: string) => void; busy: boolean };
const TransitionContext = createContext<Ctx>({ navigate: () => {}, busy: false });
export const usePageTransition = () => useContext(TransitionContext);

/**
 * A thin boundary draws across the viewport, expands into a plane that
 * separates the outgoing and incoming page, then retracts to a line.
 * Total in ≈ 560ms, out ≈ 520ms. Skipped under reduced motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const pending = useRef<string | null>(null);
  const covered = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (busy || href === pathname) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      const { gsap } = registerGsap();
      const line = lineRef.current;
      const plane = planeRef.current;
      if (!line || !plane) return router.push(href);
      setBusy(true);
      pending.current = href;
      router.prefetch(href);
      gsap
        .timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            covered.current = true;
            router.push(href);
          },
        })
        .set(plane, { scaleY: 0, transformOrigin: "50% 50%" })
        .set(line, { scaleX: 0, transformOrigin: "0% 50%", opacity: 1 })
        .to(line, { scaleX: 1, duration: 0.28, ease: "power2.inOut" })
        .to(plane, { scaleY: 1, duration: 0.3 }, "-=0.04");
    },
    [busy, pathname, router]
  );

  // When the new route has rendered, uncover it.
  useEffect(() => {
    if (!covered.current) return;
    const { gsap } = registerGsap();
    const line = lineRef.current;
    const plane = planeRef.current;
    if (!line || !plane) return;
    covered.current = false;
    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setBusy(false);
          pending.current = null;
        },
      })
      .to(plane, { scaleY: 0, duration: 0.3, delay: 0.06 })
      .set(line, { transformOrigin: "100% 50%" })
      .to(line, { scaleX: 0, duration: 0.24, ease: "power2.inOut" }, "-=0.02")
      .set(line, { opacity: 0 });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, busy }}>
      {children}
      <div className={styles.root} aria-hidden="true">
        <div ref={planeRef} className={styles.plane} />
        <div ref={lineRef} className={styles.line} />
      </div>
    </TransitionContext.Provider>
  );
}
