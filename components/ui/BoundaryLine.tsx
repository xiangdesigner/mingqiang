import styles from "./BoundaryLine.module.css";

type Props = {
  /** Small mono text placed at the line's left end. */
  label?: string;
  /** Right-end text, e.g. folio or coordinates. */
  end?: string;
  /** Show tick marks along the line. */
  ticks?: boolean;
  className?: string;
};

/**
 * The signature device: a thin boundary with survey-marker nodes.
 * Purely decorative unless label/end are provided.
 */
export function BoundaryLine({ label, end, ticks = true, className }: Props) {
  return (
    <div className={`${styles.root} ${className ?? ""}`} aria-hidden={!label && !end}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={`${styles.line} ${ticks ? styles.ticks : ""}`}>
        <i className={styles.node} />
        <i className={`${styles.node} ${styles.nodeEnd}`} />
      </span>
      {end ? <span className={styles.end}>{end}</span> : null}
    </div>
  );
}
