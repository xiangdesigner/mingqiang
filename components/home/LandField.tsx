"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";
import { registerGsap, headerOffset } from "@/lib/motion";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import styles from "./LandField.module.css";

/**
 * Chapter 04 — LAND FIELD. One WebGL moment: a contour terrain drawn as
 * profile lines flattens into parcel geometry and settles into an ordered
 * grid as the visitor scrolls. Between technical drawing and spatial data.
 */

const STAGES = [
  { key: "terrain", label: "地形", en: "Terrain", at: 0 },
  { key: "cadastre", label: "地籍", en: "Cadastre", at: 0.36 },
  { key: "order", label: "秩序", en: "Order", at: 0.72 },
];

export function LandField() {
  const root = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [stage, setStage] = useState(0);

  // Layout effect so the pin is reverted before React detaches the section.
  useLayoutEffect(() => {
    const el = root.current;
    const host = canvasHost.current;
    if (!el || !host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (reduced || !hasWebGL) {
      const id = requestAnimationFrame(() => {
        setFallback(true);
        setStage(1);
      });
      return () => cancelAnimationFrame(id);
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const { gsap, ScrollTrigger } = registerGsap();

      /* ---------- field data ---------- */
      const W = 18;
      const H = 11;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const ROWS = isMobile ? 36 : 56;
      const SEGS = isMobile ? 96 : 150;

      // Deterministic value noise.
      const hash = (x: number, y: number) => {
        const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return s - Math.floor(s);
      };
      const smooth = (t: number) => t * t * (3 - 2 * t);
      const noise = (x: number, y: number) => {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const xf = smooth(x - xi);
        const yf = smooth(y - yi);
        const a = hash(xi, yi);
        const b = hash(xi + 1, yi);
        const c = hash(xi, yi + 1);
        const d = hash(xi + 1, yi + 1);
        return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
      };
      const height = (x: number, y: number) => {
        let v = 0;
        let amp = 1;
        let f = 0.22;
        for (let o = 0; o < 4; o++) {
          v += (noise(x * f + 7.3, y * f + 3.1) - 0.5) * amp;
          amp *= 0.5;
          f *= 2.1;
        }
        // Softer toward the far edge, a ridge along the middle.
        const ridge = Math.exp(-Math.pow((y + 1.5) / 3.2, 2)) * 0.35;
        return v * 1.35 + ridge;
      };

      // Contour profile lines (LineSegments).
      const contourPos: number[] = [];
      const contourH: number[] = [];
      for (let j = 0; j < ROWS; j++) {
        const y = -H / 2 + (j / (ROWS - 1)) * H;
        let prev: [number, number, number] | null = null;
        for (let i = 0; i <= SEGS; i++) {
          const x = -W / 2 + (i / SEGS) * W;
          const h = height(x, y);
          if (prev) {
            contourPos.push(prev[0], prev[1], 0, x, y, 0);
            contourH.push(prev[2], h);
          }
          prev = [x, y, h];
        }
      }

      // Parcels: binary subdivision of the field with slight jitter.
      type Rect = { x0: number; y0: number; x1: number; y1: number };
      const parcels: Rect[] = [];
      let seed = 11;
      const rand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      const split = (r: Rect, depth: number) => {
        const w = r.x1 - r.x0;
        const h = r.y1 - r.y0;
        if (depth > 5 || (w < 2.2 && h < 1.6) || rand() < 0.08 + depth * 0.05) {
          parcels.push(r);
          return;
        }
        const vertical = w > h * 1.3 ? true : h > w * 1.3 ? false : rand() > 0.5;
        const t = 0.35 + rand() * 0.3;
        if (vertical) {
          const xm = r.x0 + w * t;
          split({ ...r, x1: xm }, depth + 1);
          split({ ...r, x0: xm }, depth + 1);
        } else {
          const ym = r.y0 + h * t;
          split({ ...r, y1: ym }, depth + 1);
          split({ ...r, y0: ym }, depth + 1);
        }
      };
      split({ x0: -W / 2 + 1, y0: -H / 2 + 0.6, x1: W / 2 - 1, y1: H / 2 - 0.6 }, 0);

      const parcelPos: number[] = [];
      const parcelPhase: number[] = [];
      const parcelH: number[] = [];
      const pushEdge = (ax: number, ay: number, bx: number, by: number, phase: number) => {
        // Subdivide edges so they can follow terrain before flattening.
        const n = 6;
        for (let k = 0; k < n; k++) {
          const t0 = k / n;
          const t1 = (k + 1) / n;
          const x0 = ax + (bx - ax) * t0;
          const y0 = ay + (by - ay) * t0;
          const x1 = ax + (bx - ax) * t1;
          const y1 = ay + (by - ay) * t1;
          parcelPos.push(x0, y0, 0, x1, y1, 0);
          parcelH.push(height(x0, y0), height(x1, y1));
          parcelPhase.push(phase, phase);
        }
      };
      parcels.forEach((r) => {
        const phase = rand() * 0.7;
        pushEdge(r.x0, r.y0, r.x1, r.y0, phase);
        pushEdge(r.x1, r.y0, r.x1, r.y1, phase);
        pushEdge(r.x1, r.y1, r.x0, r.y1, phase);
        pushEdge(r.x0, r.y1, r.x0, r.y0, phase);
      });

      // Ordered grid.
      const gridPos: number[] = [];
      const gridPhase: number[] = [];
      const gridH: number[] = [];
      for (let x = -W / 2; x <= W / 2 + 0.001; x += 1) {
        gridPos.push(x, -H / 2, 0, x, H / 2, 0);
        gridPhase.push(Math.abs(x) / (W / 2), Math.abs(x) / (W / 2));
        gridH.push(0, 0);
      }
      for (let y = -H / 2; y <= H / 2 + 0.001; y += 1) {
        gridPos.push(-W / 2, y, 0, W / 2, y, 0);
        gridPhase.push(Math.abs(y) / (H / 2), Math.abs(y) / (H / 2));
        gridH.push(0, 0);
      }

      /* ---------- three ---------- */
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#0f1715");
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
      const camBase = new THREE.Vector3(0, -12.5, 8.4);
      camera.position.copy(camBase);
      const lookAt = new THREE.Vector3(0, 0.6, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      host.appendChild(renderer.domElement);

      const vert = /* glsl */ `
        attribute float aHeight;
        attribute float aPhase;
        uniform float uFlatten;
        uniform float uAmp;
        uniform float uTime;
        varying float vPhase;
        varying float vDepth;
        void main() {
          vec3 p = position;
          float breathe = sin(uTime * 0.18 + position.x * 0.6 + position.y * 0.4) * 0.03;
          p.z = (aHeight + breathe) * uAmp * (1.0 - uFlatten);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vDepth = -mv.z;
          vPhase = aPhase;
          gl_Position = projectionMatrix * mv;
        }
      `;
      const frag = /* glsl */ `
        precision mediump float;
        uniform vec3 uColor;
        uniform float uAlpha;
        uniform float uReveal;
        varying float vPhase;
        varying float vDepth;
        void main() {
          float reveal = smoothstep(vPhase, vPhase + 0.3, uReveal);
          float fog = smoothstep(26.0, 10.0, vDepth);
          gl_FragColor = vec4(uColor, uAlpha * reveal * fog);
        }
      `;
      const makeMaterial = (color: string, alpha: number, reveal: number) =>
        new THREE.ShaderMaterial({
          vertexShader: vert,
          fragmentShader: frag,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uFlatten: { value: 0 },
            uAmp: { value: 1 },
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uAlpha: { value: alpha },
            uReveal: { value: reveal },
          },
        });
      const makeLines = (pos: number[], h: number[], phase: number[], mat: ThreeNS.ShaderMaterial) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        g.setAttribute("aHeight", new THREE.Float32BufferAttribute(h, 1));
        g.setAttribute("aPhase", new THREE.Float32BufferAttribute(phase, 1));
        return new THREE.LineSegments(g, mat);
      };

      const contourMat = makeMaterial("#f1ede4", 0.34, 1);
      const parcelMat = makeMaterial("#d2b57a", 1, 0);
      const gridMat = makeMaterial("#f1ede4", 0.22, 0);
      const contours = makeLines(contourPos, contourH, new Array(contourH.length).fill(0), contourMat);
      const parcelLines = makeLines(parcelPos, parcelH, parcelPhase, parcelMat);
      const grid = makeLines(gridPos, gridH, gridPhase, gridMat);
      scene.add(contours, parcelLines, grid);

      /* ---------- state ---------- */
      const state = { progress: 0, px: 0, py: 0, running: false, t: 0 };
      const pointer = { x: 0, y: 0 };

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.fov = w < 768 ? 46 : 36;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const applyProgress = (p: number) => {
        const flatten = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.05, 0.55, 0, 1, p));
        const parcelReveal = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.3, 0.75, 0, 1, p));
        const gridReveal = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.68, 1, 0, 1, p));
        // Flattened contours are only a memory of the terrain: let them recede.
        const contourAlpha = 0.34 - gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.3, 0.85, 0, 1, p)) * 0.27;
        for (const m of [contourMat, parcelMat, gridMat]) m.uniforms.uFlatten.value = flatten;
        parcelMat.uniforms.uReveal.value = parcelReveal;
        gridMat.uniforms.uReveal.value = gridReveal;
        contourMat.uniforms.uAlpha.value = contourAlpha;
        // Camera settles from an oblique view to a more measured, higher angle.
        camBase.set(0, -12.5 + p * 1.6, 8.4 + p * 3.2);
      };
      applyProgress(0);

      let raf = 0;
      const frame = (now: number) => {
        if (!state.running) return;
        raf = requestAnimationFrame(frame);
        const t = now / 1000;
        pointer.x += (state.px - pointer.x) * 0.04;
        pointer.y += (state.py - pointer.y) * 0.04;
        camera.position.set(
          camBase.x + Math.sin(t * 0.06) * 0.35 + pointer.x * 0.5,
          camBase.y + pointer.y * 0.3,
          camBase.z + Math.cos(t * 0.05) * 0.15
        );
        camera.lookAt(lookAt);
        contourMat.uniforms.uTime.value = t;
        parcelMat.uniforms.uTime.value = t;
        renderer.render(scene, camera);
        if (!state.t) {
          state.t = t;
          setReady(true);
        }
      };
      const start = () => {
        if (state.running) return;
        state.running = true;
        raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        state.running = false;
        cancelAnimationFrame(raf);
      };

      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { rootMargin: "20% 0px" });
      io.observe(el);

      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        state.px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        state.py = ((e.clientY - r.top) / r.height - 0.5) * -2;
      };
      el.addEventListener("pointermove", onPointer, { passive: true });

      const isCompact = window.matchMedia("(max-width: 1023px)").matches;
      let lastStage = -1;
      const st = ScrollTrigger.create({
        trigger: el,
        start: () => `top ${headerOffset()}px`,
        end: isCompact ? "+=110%" : "+=170%",
        pin: true,
        // Created after the page's other pins (dynamic import); refresh in document order.
        refreshPriority: 2,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          applyProgress(self.progress);
          let s = 0;
          for (let i = 0; i < STAGES.length; i++) if (self.progress >= STAGES[i].at) s = i;
          if (s !== lastStage) {
            lastStage = s;
            setStage(s);
          }
        },
      });

      // This trigger was created after the page's initial refresh (dynamic import);
      // recompute every trigger so sections below account for the pin spacer.
      ScrollTrigger.refresh();

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        st.kill();
        el.removeEventListener("pointermove", onPointer);
        contours.geometry.dispose();
        parcelLines.geometry.dispose();
        grid.geometry.dispose();
        contourMat.dispose();
        parcelMat.dispose();
        gridMat.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    })().catch(() => setFallback(true));

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={root} className={`ink ${styles.root}`} aria-labelledby="landfield-title">
      <div ref={canvasHost} className={styles.canvas} aria-hidden="true" />
      {fallback ? <FallbackField /> : null}
      {!ready && !fallback ? (
        <div className={styles.loader} aria-hidden="true">
          <span />
        </div>
      ) : null}

      <div className={styles.overlay}>
        <div className={styles.head}>
          <ChapterLabel index="04" title="土地的層次" en="Land field" />
        </div>
        <div className={styles.copy}>
          <h2 id="landfield-title" className={styles.title}>
            土地先是地形，然後是地籍，最後是秩序。
          </h2>
          <p className={styles.text}>
            每一條界線背後，都有測量、登記、分區與權利的判斷。茗強的五個專業單位，分別處理其中一層，並在需要時共同處理整體。
          </p>
        </div>
        <ol className={styles.stages} aria-label="轉換階段">
          {STAGES.map((s, i) => (
            <li key={s.key} className={`${styles.stage} ${i === stage ? styles.stageActive : ""}`} aria-current={i === stage ? "step" : undefined}>
              <span className={styles.stageIdx}>0{i + 1}</span>
              <span className={styles.stageLabel}>{s.label}</span>
              <span className={styles.stageEn}>{s.en}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Static, intentional composition for reduced motion or no WebGL. */
function FallbackField() {
  const rows = 22;
  const lines: string[] = [];
  for (let j = 0; j < rows; j++) {
    const y = 80 + (j / (rows - 1)) * 440;
    let d = `M 0 ${y}`;
    for (let i = 1; i <= 40; i++) {
      const x = (i / 40) * 1000;
      const dy = Math.sin(i * 0.45 + j * 0.6) * 9 + Math.sin(i * 0.12 + j * 0.2) * 14;
      d += ` L ${x} ${(y + dy).toFixed(1)}`;
    }
    lines.push(d);
  }
  return (
    <svg className={styles.fallback} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(241,237,228,0.28)" strokeWidth="1" />
      ))}
      <g fill="none" stroke="#b8985f" strokeWidth="1.2">
        <path d="M 120 140 L 470 140 L 470 330 L 120 330 Z" />
        <path d="M 470 140 L 880 140 L 880 260 L 470 260 Z" />
        <path d="M 470 260 L 880 260 L 880 460 L 640 460 L 640 330 L 470 330 Z" />
        <path d="M 120 330 L 640 330 L 640 460 L 120 460 Z" />
      </g>
    </svg>
  );
}
