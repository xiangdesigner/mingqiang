import type { ReactNode } from "react";
import styles from "./SectionTitle.module.css";

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/** Bold section heading with the short rule, optional right-aligned subtitle and action. */
export function SectionTitle({ title, subtitle, action, as: Tag = "h2", id, className }: Props) {
  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.left}>
        <Tag id={id} className={styles.title}>
          {title}
        </Tag>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      {subtitle || action ? (
        <div className={styles.right}>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}
