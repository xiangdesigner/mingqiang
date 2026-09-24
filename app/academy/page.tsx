import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";
import { AcademyNav } from "@/components/academy/AcademyNav";
import { academyIntro } from "@/content/academy";
import inner from "../inner.module.css";
import styles from "./academy.module.css";

export const metadata: Metadata = {
  title: "茗強學院簡介",
  description: "茗強學院之成立，乃為結合地政與土管領域之專業知識，藉由傳承與創新，打造出「巨人的肩膀」。",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  return (
    <>
      <PageTitle title={academyIntro.title} />
      <div className="container">
        <AcademyNav current="/academy" />
      </div>
      <section className={`container ${inner.wrap}`}>
        {academyIntro.sections.map((s, i) => (
          <div key={s.title} className={`${inner.row} ${i % 2 ? inner.rowReverse : ""} ${styles.row}`}>
            <figure className={inner.media}>
              <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="(min-width: 768px) 40vw, 100vw" />
            </figure>
            <div>
              <h2 className={styles.title}>{s.title}</h2>
              <p className={styles.text}>{s.text}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
