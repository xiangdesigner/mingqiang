import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";
import { careers } from "@/content/about";
import inner from "../inner.module.css";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: "人才招募",
  description: "茗強地政與土管誠徵不動產估價師、都市計畫技師、不動產經紀人、地政士、企業評價師等專業人才。",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageTitle title={careers.title} />
      <section className={`container ${inner.wrap}`}>
        <div className={inner.row}>
          <figure className={inner.media}>
            <Image src={careers.photo.src} alt={careers.photo.alt} width={careers.photo.width} height={careers.photo.height} sizes="(min-width: 768px) 40vw, 100vw" />
          </figure>
          <div>
            <ul className={styles.positions}>
              {careers.positions.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={styles.text}>{careers.text}</p>
          </div>
        </div>
      </section>
    </>
  );
}
