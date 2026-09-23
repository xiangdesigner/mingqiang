import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { site } from "@/content/site";
import { practices } from "@/content/practices";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "聯絡",
  description: "向茗強地政與土管提出不動產估價、都市計畫、地政登記、不動產經紀或資產鑑定的專業諮詢。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead kicker="聯絡" en="Contact" title="說明您的問題。" lead="請描述您面對的土地或不動產情況，並選擇最接近的專業類別。我們會由對應的單位回覆。" />

      <section className={`container ${styles.body}`}>
        <div className="grid">
          <aside className={styles.aside}>
            <dl className={styles.facts}>
              <div>
                <dt>所在</dt>
                <dd>
                  {site.city}
                  <span className={styles.en}>{site.cityEn}</span>
                </dd>
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
              <div>
                <dt>服務時間</dt>
                <dd>{site.hours || <span className={styles.pending}>資訊補充中</span>}</dd>
              </div>
            </dl>

            <p className="label">組成單位</p>
            <ol className={styles.units}>
              {practices.map((p) => (
                <li key={p.id}>
                  <span className={styles.unitIdx}>{p.index}</span>
                  <span>{p.name}</span>
                </li>
              ))}
            </ol>
          </aside>

          <div className={styles.form}>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
