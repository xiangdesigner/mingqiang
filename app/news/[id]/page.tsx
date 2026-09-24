import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/ui/PageTitle";
import { TransitionLink } from "@/components/site/TransitionLink";
import { news, newsById, type NewsBlock } from "@/content/news";
import inner from "../../inner.module.css";
import styles from "./news-detail.module.css";

export function generateStaticParams() {
  return news.map((n) => ({ id: String(n.id) }));
}

export async function generateMetadata(props: PageProps<"/news/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const n = newsById(Number(id));
  if (!n) return {};
  return { title: n.title, description: n.excerpt, alternates: { canonical: `/news/${n.id}` } };
}

function Block({ b }: { b: NewsBlock }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h":
      return <h2 className={styles.h}>{b.text}</h2>;
    case "link":
      return (
        <p>
          <a href={b.href} target="_blank" rel="noopener noreferrer">
            {b.text ?? b.href}
          </a>
        </p>
      );
    case "img":
      return (
        <figure className={styles.figure}>
          <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(min-width: 1024px) 800px, 100vw" />
        </figure>
      );
    case "gallery":
      return (
        <ul className={styles.gallery}>
          {b.images.map((img, i) => (
            <li key={img.src + i} className={img.width > img.height * 1.6 ? styles.wide : ""}>
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 400px, 100vw" />
            </li>
          ))}
        </ul>
      );
    case "agenda":
      return (
        <div className={styles.agendaWrap}>
          <table className={styles.agenda}>
            <thead>
              <tr>
                <th scope="col">時間</th>
                <th scope="col">主題</th>
                <th scope="col">致詞人／引言人／與談人／司儀</th>
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.time + r.topic}>
                  <td>{r.time}</td>
                  <td>{r.topic}</td>
                  <td>{r.people}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function NewsDetailPage(props: PageProps<"/news/[id]">) {
  const { id } = await props.params;
  const n = newsById(Number(id));
  if (!n) notFound();
  return (
    <>
      <PageTitle title="最新消息" />
      <article className={`container ${inner.wrap}`}>
        <div className={inner.prose}>
          <header className={inner.articleHead}>
            <p className={inner.articleDate}>{n.date.replace(/\./g, " . ")}</p>
            <h1 className={inner.articleTitle}>{n.title}</h1>
          </header>
          <div className={`prose ${styles.body}`}>
            {n.body.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
          <TransitionLink href="/news" className={inner.back}>
            BACK
          </TransitionLink>
        </div>
      </article>
    </>
  );
}
