import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";
import { AcademyNav } from "@/components/academy/AcademyNav";
import { TransitionLink } from "@/components/site/TransitionLink";
import { courses } from "@/content/courses";
import inner from "../../inner.module.css";

export const metadata: Metadata = {
  title: "茗強課程",
  description: "茗強學院課程：土地法規剖析、土地利用攻略等地政士考試準備內容。",
  alternates: { canonical: "/academy/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <PageTitle title="茗強課程" />
      <section className={`container ${inner.wrap}`}>
        <AcademyNav current="/academy/courses" />
        <ol className={inner.entries}>
          {courses.map((c) => (
            <li key={c.id}>
              <TransitionLink href={`/academy/courses/${c.id}`} className={inner.entry}>
                {c.thumb ? <Image src={c.thumb} alt="" width={96} height={96} sizes="96px" className={inner.entryThumb} /> : <span className={inner.entryThumb} aria-hidden="true" />}
                <span>
                  <span className={inner.entryDate}>{c.date.replace(/\./g, " . ")}</span>
                  <h2 className={inner.entryTitle}>{c.title}</h2>
                  <p className={inner.entryText}>{c.text}</p>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
