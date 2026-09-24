"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./Accordion.module.css";

export type AccordionItem = { id: string; title: string; content: ReactNode };

/** Accessible accordion (button + region). Opens the item named in the URL hash. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.replace("#", ""));
      if (h && items.some((i) => i.id === h)) setOpen(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  return (
    <div className={styles.root}>
      {items.map((it) => {
        const expanded = open === it.id;
        return (
          <div key={it.id} id={it.id} className={`${styles.item} ${expanded ? styles.open : ""}`}>
            <h3 className={styles.h}>
              <button type="button" className={styles.trigger} aria-expanded={expanded} aria-controls={`${it.id}-panel`} onClick={() => setOpen(expanded ? null : it.id)}>
                <span>{it.title}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>
            </h3>
            <div id={`${it.id}-panel`} role="region" aria-labelledby={it.id} className={styles.panel} hidden={!expanded}>
              <div className={styles.panelInner}>{it.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
