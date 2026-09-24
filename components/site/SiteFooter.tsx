import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import { legalNav, mockup, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

const Icon = {
  pin: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" fill="currentColor" />
      <circle cx="12" cy="9.5" r="2.6" fill="var(--navy)" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.6 3h3l1.7 4.3-2.1 1.5a12 12 0 0 0 6 6l1.5-2.1L21 14.4v3a2.6 2.6 0 0 1-2.8 2.6A16 16 0 0 1 4 5.8 2.6 2.6 0 0 1 6.6 3z" fill="currentColor" />
    </svg>
  ),
  fax: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h10v5H7z" fill="currentColor" />
      <path d="M4 9h16a1 1 0 0 1 1 1v7h-4v3H7v-3H3v-7a1 1 0 0 1 1-1z" fill="currentColor" />
      <path d="M8 15h8v4H8z" fill="var(--navy)" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image src="/images/brand/mark-white.png" alt="" width={56} height={56} />
              <span className={styles.logoText}>
                <span className={styles.logoName}>{site.shortName}</span>
                <span className={styles.logoTag}>{site.logoTagline}</span>
              </span>
            </div>
            <p className={styles.slogan}>{mockup.footer.slogan}</p>
            <p className={styles.text}>{mockup.footer.text}</p>
          </div>

          <span className={styles.rule} aria-hidden="true" />

          <address className={styles.contact}>
            <ul>
              <li>
                <span className={styles.icon}>{Icon.pin}</span>
                <span>
                  {site.addressShort}
                  <br />
                  <span className={styles.note}>（{site.addressNote}）</span>
                </span>
              </li>
              <li>
                <span className={styles.icon}>{Icon.phone}</span>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <span className={styles.icon}>{Icon.fax}</span>
                <span>{site.fax}</span>
              </li>
              <li>
                <span className={styles.icon}>{Icon.mail}</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </address>

          <span className={styles.rule} aria-hidden="true" />

          <div className={styles.connect}>
            <div className={styles.social}>
              <a href={site.line} target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.lineBtn}`} aria-label="LINE 官方帳號">
                <svg viewBox="0 0 40 40" aria-hidden="true">
                  <path d="M20 8C11.7 8 5 13.5 5 20.2c0 6 5.4 11 12.5 12l-.6 4.8c0 .3.3.5.6.3l6.2-4.3C30 32.3 35 26.9 35 20.2 35 13.5 28.3 8 20 8z" fill="#111" />
                  <text x="20" y="23.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">
                    LINE
                  </text>
                </svg>
              </a>
              <a href={`mailto:${site.email}`} className={`${styles.socialBtn} ${styles.mailBtn}`} aria-label="寄送電子郵件">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="#fff" strokeWidth="2" />
                  <path d="M3.5 6.5 12 13l8.5-6.5" stroke="#fff" strokeWidth="2" />
                </svg>
              </a>
            </div>
            <p className={styles.lead}>
              {mockup.footer.contactLead[0]}
              <br />
              {mockup.footer.contactLead[1]}
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{site.copyright}</p>
          <p className={styles.disclaimer}>{mockup.footer.disclaimer}</p>
          <ul className={styles.legal}>
            {legalNav.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href}>{l.label}</TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
