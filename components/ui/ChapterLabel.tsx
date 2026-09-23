import styles from "./ChapterLabel.module.css";

/** Folio-style chapter marker: index, Chinese title, English caption. */
export function ChapterLabel({ index, title, en, className }: { index: string; title: string; en?: string; className?: string }) {
  return (
    <p className={`${styles.root} ${className ?? ""}`}>
      <span className={styles.index}>{index}</span>
      <span className={styles.title}>{title}</span>
      {en ? <span className={styles.en}>{en}</span> : null}
    </p>
  );
}
