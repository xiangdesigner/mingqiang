import { Mark } from "@/components/brand/Mark";
import { TransitionLink } from "./TransitionLink";
import { BoundaryLine } from "@/components/ui/BoundaryLine";
import { legalNav, nav, site } from "@/content/site";
import { practices } from "@/content/practices";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={`ink ink-2 ${styles.footer}`}>
      <div className="container">
        <BoundaryLine label={site.cityEn} end={`Est. ${site.foundedYear}`} />
        <div className={`grid ${styles.body}`}>
          <div className={styles.identity}>
            <Mark size={40} />
            <p className={styles.name}>{site.name}</p>
            <p className={styles.nameEn}>{site.nameEn}</p>
          </div>

          <div className={styles.practices}>
            <p className="label">組成單位</p>
            <ul>
              {practices.map((p) => (
                <li key={p.id}>
                  <span className={styles.idx}>{p.index}</span>
                  {p.name}
                </li>
              ))}
              <li>
                <span className={styles.idx}>06</span>
                {site.academy.name}
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <p className="label">導覽</p>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className="link link-quiet">
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contact}>
            <p className="label">聯絡</p>
            <ul>
              <li>{site.city}</li>
              {site.address ? <li>{site.address}</li> : null}
              {site.phone ? (
                <li>
                  <a href={`tel:${site.phone}`} className="link link-quiet">
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className="link link-quiet">
                    {site.email}
                  </a>
                </li>
              ) : null}
              <li>
                <TransitionLink href="/contact" className="link link-quiet">
                  聯絡表單
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <p>
            © {year} {site.name}
          </p>
          <ul>
            {legalNav.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="link link-quiet">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
