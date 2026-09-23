"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { registerGsap, prefersReducedMotion } from "@/lib/motion";
import { setLenis, getLenis } from "@/lib/lenis-store";

/**
 * Lenis smooth scrolling synchronised with GSAP's ticker.
 * Disabled under prefers-reduced-motion; native scroll remains intact.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.95,
        anchors: { offset: -72 },
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };
    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      setLenis(null);
    };

    const sync = () => (mq.matches ? stop() : start());
    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  // On route change, land at the top (under the transition plane) and refresh triggers.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else if (!prefersReducedMotion()) window.scrollTo(0, 0);
    const { ScrollTrigger } = registerGsap();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
