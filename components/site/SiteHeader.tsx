"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import { SearchOverlay } from "./SearchOverlay";
import { nav, site } from "@/content/site";
import { getLenis } from "@/lib/lenis-store";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  // The mobile menu is "open for a pathname"; a route change closes it by definition.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    const toggle = toggleRef.current;
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <TransitionLink href="/" className={styles.logo} aria-label={`${site.name} 首頁`}>
          <Image src="/images/brand/mark.png" alt="" width={46} height={46} priority className={styles.mark} />
          <span className={styles.logoText}>
            <span className={styles.logoName}>{site.shortName}</span>
            <span className={styles.logoTag}>{site.logoTagline}</span>
          </span>
        </TransitionLink>

        <nav className={styles.nav} aria-label="主要導覽">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className={styles.item}>
                <TransitionLink
                  href={item.href}
                  className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  aria-haspopup={item.children ? "true" : undefined}
                >
                  {item.label}
                </TransitionLink>
                {item.children ? (
                  <ul className={styles.sub}>
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <TransitionLink href={c.href} className={styles.subLink}>
                          {c.label}
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.search} aria-label="搜尋" onClick={() => setSearchOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M13 13l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "關閉選單" : "開啟選單"}</span>
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div id="site-menu" ref={menuRef} className={styles.menu} role="dialog" aria-modal="true" aria-label="網站選單" hidden={!open}>
        <nav aria-label="行動版導覽">
          <ul className={styles.menuList}>
            {nav.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className={`${styles.menuLink} ${isActive(item.href) ? styles.menuActive : ""}`}>
                  {item.label}
                </TransitionLink>
                {item.children ? (
                  <ul className={styles.menuSub}>
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <TransitionLink href={c.href} className={styles.menuSubLink}>
                          {c.label}
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuFoot}>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
