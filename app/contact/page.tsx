import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { site } from "@/content/site";
import { contactInfo } from "@/content/about";
import inner from "../inner.module.css";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: `${site.address}　電話 ${site.phone}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageTitle title="聯絡我們" />
      <section className={`container ${inner.wrap}`}>
        <div className={styles.top}>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.map} aria-label="在 Google 地圖中開啟本公司及事務所位置">
            <Image src={contactInfo.map.src} alt={contactInfo.map.alt} width={contactInfo.map.width} height={contactInfo.map.height} sizes="(min-width: 1024px) 50vw, 100vw" />
          </a>
          <div className={styles.info}>
            <dl className={styles.facts}>
              <div>
                <dt>服務地址</dt>
                <dd>{site.address}</dd>
              </div>
              <div>
                <dt>服務電話</dt>
                <dd>
                  <a href={site.phoneHref}>{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt>傳真電話</dt>
                <dd>{site.fax}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
            </dl>
            <h2 className={inner.subheading}>{contactInfo.parking.title}</h2>
            <p className={styles.parkingText}>{contactInfo.parking.text}</p>
            <ul className={styles.lots}>
              {contactInfo.parking.lots.map((l) => (
                <li key={l.name}>
                  <strong>{l.name}</strong>
                  {l.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.form}>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
