import { site } from "@/content/site";
import { practices } from "@/content/practices";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { TransitionLink } from "@/components/site/TransitionLink";
import styles from "./ContactAnchor.module.css";

const ROUTES = [
  { q: "需要一份可供銀行、法院或機關審視的估價報告", to: "appraisal-office" },
  { q: "想知道一筆土地在計畫與分區下能做什麼", to: "planning-office" },
  { q: "辦理移轉、繼承、分割或設定登記，並釐清稅務", to: "land-office" },
  { q: "打算買賣或交易，希望先有完整的專業判斷", to: "brokerage" },
  { q: "需要企業、設備或無形資產的價值意見", to: "asset-valuation" },
];

/** Chapter 11 — a calm geographic and professional anchor. */
export function ContactAnchor() {
  return (
    <section className={`ink section ${styles.root}`} aria-labelledby="contact-title">
      <div className="container">
        <div className="grid">
          <div className={styles.left}>
            <ChapterLabel index="11" title="聯絡" en="Contact" />
            <h2 id="contact-title" className={styles.title}>
              從一個具體的問題開始。
            </h2>
            <p className={styles.text}>說明您面對的土地或不動產問題，我們會由適當的專業單位回覆。</p>
            <ul className={styles.routes}>
              {ROUTES.map((r) => {
                const p = practices.find((x) => x.id === r.to);
                return (
                  <li key={r.to}>
                    <span className={styles.q}>{r.q}</span>
                    <span className={styles.to}>
                      {p?.index} {p?.name}
                    </span>
                  </li>
                );
              })}
            </ul>
            <TransitionLink href="/contact" className="action action-primary">
              前往聯絡頁
            </TransitionLink>
          </div>

          <div className={styles.right}>
            <svg viewBox="0 0 600 420" className={styles.frame} role="img" aria-label={`位置示意：${site.city}`}>
              <rect x="0.5" y="0.5" width="599" height="419" fill="none" stroke="rgba(241,237,228,0.3)" />
              <g stroke="rgba(241,237,228,0.3)" strokeWidth="1">
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`t${i}`} x1={i * 60} y1="0" x2={i * 60} y2="8" />
                ))}
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`b${i}`} x1={i * 60} y1="420" x2={i * 60} y2="412" />
                ))}
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={`l${i}`} x1="0" y1={i * 60} x2="8" y2={i * 60} />
                ))}
              </g>
              <g stroke="rgba(241,237,228,0.14)" strokeWidth="1" fill="none">
                <path d="M 0 260 C 120 240 180 300 300 250 S 480 190 600 220" />
                <path d="M 0 300 C 140 280 200 340 320 290 S 500 230 600 262" />
                <path d="M 260 0 C 250 80 300 160 292 240" />
              </g>
              <rect x="288" y="216" width="8" height="8" fill="#b8985f" />
              <line x1="292" y1="220" x2="340" y2="172" stroke="#b8985f" strokeWidth="1" />
              <text x="346" y="168" className={styles.frameLabel}>
                {site.city}
              </text>
              <text x="346" y="186" className={styles.frameLabelEn}>
                {site.cityEn.toUpperCase()}
              </text>
              <text x="14" y="404" className={styles.frameLabelEn}>
                LOCATION · SCHEMATIC · NOT A SURVEY
              </text>
            </svg>

            <dl className={styles.facts}>
              <div>
                <dt>所在</dt>
                <dd>{site.city}</dd>
              </div>
              <div>
                <dt>地址</dt>
                <dd>{site.address || <span className={styles.pending}>資訊補充中</span>}</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>{site.phone ? <a href={`tel:${site.phone}`} className="link link-quiet">{site.phone}</a> : <span className={styles.pending}>資訊補充中</span>}</dd>
              </div>
              <div>
                <dt>電子郵件</dt>
                <dd>{site.email ? <a href={`mailto:${site.email}`} className="link link-quiet">{site.email}</a> : <span className={styles.pending}>資訊補充中</span>}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
