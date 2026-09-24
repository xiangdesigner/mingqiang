import { TransitionLink } from "@/components/site/TransitionLink";
import { nav } from "@/content/site";
import styles from "./AcademyNav.module.css";

/** Sub-navigation for the 茗強學院 section (same items as the header dropdown). */
export function AcademyNav({ current }: { current: string }) {
  const items = nav.find((n) => n.href === "/academy")?.children ?? [];
  return (
    <nav className={styles.root} aria-label="茗強學院">
      {items.map((i) => (
        <TransitionLink key={i.href} href={i.href} className={`${styles.link} ${current === i.href ? styles.active : ""}`} aria-current={current === i.href ? "page" : undefined}>
          {i.label}
        </TransitionLink>
      ))}
    </nav>
  );
}
