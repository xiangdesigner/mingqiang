import styles from "./PageTitle.module.css";

/**
 * Inner pages start directly below the shared header with the page title
 * (Figma rule: no banner on internal pages, consistent top spacing).
 */
export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
    </header>
  );
}
