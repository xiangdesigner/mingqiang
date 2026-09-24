"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { nav } from "@/content/site";
import { services } from "@/content/services";
import { news } from "@/content/news";
import { courses } from "@/content/courses";
import { relatedLinks, publications } from "@/content/academy";
import { trackItems } from "@/content/track";
import { getLenis } from "@/lib/lenis-store";
import styles from "./SearchOverlay.module.css";

type Entry = { title: string; href: string; group: string; text?: string; external?: boolean };

function buildIndex(): Entry[] {
  const out: Entry[] = [];
  for (const n of nav) {
    out.push({ title: n.label, href: n.href, group: "頁面" });
    for (const c of n.children ?? []) out.push({ title: c.label, href: c.href, group: "頁面" });
  }
  for (const s of services) out.push({ title: s.name, href: `/services/${s.slug}`, group: "服務項目", text: s.tagline.join(" ") });
  for (const n of news) out.push({ title: n.title, href: `/news/${n.id}`, group: "最新消息", text: n.date });
  for (const c of courses) out.push({ title: c.title, href: `/academy/courses/${c.id}`, group: "茗強課程", text: c.date });
  for (const p of publications) out.push({ title: p.title, href: `/academy/publications/${p.id}`, group: "電子刊物", text: p.date });
  for (const l of relatedLinks) out.push({ title: l.title, href: l.href, group: "相關連結", external: true });
  for (const t of trackItems) out.push({ title: t.title, href: `/track-record#item-${t.index}`, group: "服務實績" });
  return out;
}

/** Client-side search over the site's own pages and lists. */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose]);

  const term = q.trim().toLowerCase();
  const results = term ? index.filter((e) => (e.title + " " + (e.text ?? "")).toLowerCase().includes(term)).slice(0, 30) : [];

  if (!open) return null;
  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label="站內搜尋">
      <button type="button" className={styles.backdrop} aria-label="關閉搜尋" onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.field}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M13 13l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input ref={inputRef} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜尋頁面、服務、消息、課程…" aria-label="搜尋關鍵字" />
          <button type="button" className={styles.close} onClick={onClose}>
            關閉
          </button>
        </div>
        {term ? (
          <ul className={styles.results} aria-live="polite">
            {results.length === 0 ? <li className={styles.empty}>找不到與「{q}」相關的內容。</li> : null}
            {results.map((r) => (
              <li key={r.href + r.title}>
                {r.external ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className={styles.result}>
                    <span className={styles.group}>{r.group}</span>
                    <span className={styles.title}>{r.title}</span>
                  </a>
                ) : (
                  <TransitionLink href={r.href} className={styles.result} onClick={onClose}>
                    <span className={styles.group}>{r.group}</span>
                    <span className={styles.title}>{r.title}</span>
                    {r.text ? <span className={styles.meta}>{r.text}</span> : null}
                  </TransitionLink>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.hint}>輸入關鍵字，搜尋本站的頁面、服務項目、最新消息、茗強課程與相關連結。</p>
        )}
      </div>
    </div>
  );
}
