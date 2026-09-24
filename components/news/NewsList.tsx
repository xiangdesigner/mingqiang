import { TransitionLink } from "@/components/site/TransitionLink";
import type { NewsItem } from "@/content/news";
import styles from "./NewsList.module.css";

/** Date / rule / title + excerpt / chevron rows, as in the mockup. */
export function NewsList({ items, headingLevel = 3 }: { items: NewsItem[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className={styles.list}>
      {items.map((n) => (
        <li key={n.id} className={styles.item}>
          <TransitionLink href={`/news/${n.id}`} className={styles.row}>
            <span className={styles.date}>
              <span className={styles.year}>{n.year}</span>
              <span className={styles.day}>{n.day}</span>
            </span>
            <span className={styles.body}>
              <H className={styles.title}>{n.title}</H>
              <span className={styles.excerpt}>{n.excerpt}</span>
            </span>
            <span className={styles.chev} aria-hidden="true">
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <path d="M2 2l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </TransitionLink>
        </li>
      ))}
    </ol>
  );
}
