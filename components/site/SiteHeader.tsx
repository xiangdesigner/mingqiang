"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/brand/Mark";
import { TransitionLink } from "./TransitionLink";
import { nav, site } from "@/content/site";
import { getLenis } from "@/lib/lenis-store";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is "open for a pathname"; a route change closes it by definition.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenPath(next ? pathname : null);
  };
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu: lock scroll, focus, Escape, restore focus.
  useEffect(() => {
    const lenis = getLenis();
    const toggle = toggleRef.current;
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      const first = menuRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpenPath(null);
        if (e.key === "Tab" && menuRef.current) {
          const focusables = menuRef.current.querySelectorAll<HTMLElement>("a, button");
          const list = [toggleRef.current, ...Array.from(focusables)].filter(Boolean) as HTMLElement[];
          const i = list.indexOf(document.activeElement as HTMLElement);
          if (e.shiftKey && i <= 0) {
            e.preventDefault();
            list[list.length - 1].focus();
          } else if (!e.shiftKey && i === list.length - 1) {
            e.preventDefault();
            list[0].focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.documentElement.style.overflow = "";
        lenis?.start();
        toggle?.focus();
      };
    }
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.open : ""}`}>
      <div className={styles.bar}>
        <TransitionLink href="/" className={styles.brand} aria-label={`${site.name} 首頁`}>
          <Mark size={34} />
          <span className={styles.wordmark}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.nameEn}>Ming Chiang Land Economics</span>
          </span>
        </TransitionLink>

        <nav className={styles.nav} aria-label="主要導覽">
          <ul>
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <TransitionLink href={item.href} className={`${styles.navLink} ${active ? styles.active : ""}`} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleLabel}>{open ? "關閉" : "選單"}</span>
          <span className={styles.toggleGlyph} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div
        id="site-menu"
        ref={menuRef}
        className={styles.menu}
        role="dialog"
        aria-modal="true"
        aria-label="網站選單"
        hidden={!open}
      >
        <div className={styles.menuInner}>
          <ol className={styles.menuList}>
            {nav.map((item, i) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className={styles.menuLink}>
                  <span className={styles.menuIndex}>0{i + 1}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                  <span className={styles.menuEn}>{item.labelEn}</span>
                </TransitionLink>
              </li>
            ))}
          </ol>
          <div className={styles.menuFoot}>
            <p className="label">{site.cityEn}</p>
            <p className="label">Since {site.foundedYear}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
