"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power2.out", duration: 0.52 });
    // Mobile browsers resize the viewport as the address bar hides; don't re-pin on that.
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Height of the sticky masthead; pinned chapters start beneath it. */
export function headerOffset() {
  if (typeof document === "undefined") return 72;
  return document.querySelector("header")?.getBoundingClientRect().height || 72;
}

const MQ_MOTION = "(prefers-reduced-motion: reduce)";
const MQ_POINTER = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(MQ_MOTION).matches;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MQ_MOTION);
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MQ_POINTER);
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}
