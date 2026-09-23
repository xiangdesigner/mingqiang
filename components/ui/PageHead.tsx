import { BoundaryLine } from "./BoundaryLine";
import styles from "./PageHead.module.css";

type Props = {
  index?: string;
  kicker: string;
  en?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
};

/** Opening composition for interior pages: folio label, title, optional lead. */
export function PageHead({ index, kicker, en, title, lead, children }: Props) {
  return (
    <header className={styles.root}>
      <div className="container">
        <BoundaryLine label={index ? `${index} · ${kicker}` : kicker} end={en} />
        <div className={`grid ${styles.body}`}>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}
