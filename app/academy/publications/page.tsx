import type { Metadata } from "next";
import { PageTitle } from "@/components/ui/PageTitle";
import { AcademyNav } from "@/components/academy/AcademyNav";
import { TransitionLink } from "@/components/site/TransitionLink";
import { publications } from "@/content/academy";
import inner from "../../inner.module.css";

export const metadata: Metadata = {
  title: "電子刊物",
  description: "茗強學院電子刊物。",
  alternates: { canonical: "/academy/publications" },
};

export default function PublicationsPage() {
  return (
    <>
      <PageTitle title="電子刊物" />
      <section className={`container ${inner.wrap}`}>
        <AcademyNav current="/academy/publications" />
        <ol className={inner.entries}>
          {publications.map((p) => (
            <li key={p.id}>
              <TransitionLink href={`/academy/publications/${p.id}`} className={inner.entry}>
                <span className={inner.entryThumb} aria-hidden="true" />
                <span>
                  <span className={inner.entryDate}>{p.date.replace(/\./g, " . ")}</span>
                  <h2 className={inner.entryTitle}>{p.title}</h2>
                  <p className={inner.entryText}>{p.text}</p>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
