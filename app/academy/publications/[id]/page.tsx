import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/ui/PageTitle";
import { TransitionLink } from "@/components/site/TransitionLink";
import { publications } from "@/content/academy";
import inner from "../../../inner.module.css";

export function generateStaticParams() {
  return publications.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata(props: PageProps<"/academy/publications/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const p = publications.find((x) => x.id === Number(id));
  if (!p) return {};
  return { title: p.title, alternates: { canonical: `/academy/publications/${p.id}` } };
}

export default async function PublicationPage(props: PageProps<"/academy/publications/[id]">) {
  const { id } = await props.params;
  const p = publications.find((x) => x.id === Number(id));
  if (!p) notFound();
  return (
    <>
      <PageTitle title="電子刊物" />
      <article className={`container ${inner.wrap}`}>
        <div className={inner.prose}>
          <header className={inner.articleHead}>
            <p className={inner.articleDate}>{p.date.replace(/\./g, " . ")}</p>
            <h1 className={inner.articleTitle}>{p.title}</h1>
          </header>
          <div className="prose">
            <p style={{ lineHeight: 2, wordBreak: "break-all" }}>{p.text}</p>
          </div>
          <TransitionLink href="/academy/publications" className={inner.back}>
            BACK
          </TransitionLink>
        </div>
      </article>
    </>
  );
}
