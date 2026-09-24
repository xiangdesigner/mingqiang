import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/ui/PageTitle";
import { TransitionLink } from "@/components/site/TransitionLink";
import { courses } from "@/content/courses";
import inner from "../../../inner.module.css";
import styles from "./course.module.css";

export function generateStaticParams() {
  return courses.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata(props: PageProps<"/academy/courses/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const c = courses.find((x) => x.id === Number(id));
  if (!c) return {};
  return { title: c.title, description: c.text.slice(0, 120), alternates: { canonical: `/academy/courses/${c.id}` } };
}

export default async function CoursePage(props: PageProps<"/academy/courses/[id]">) {
  const { id } = await props.params;
  const c = courses.find((x) => x.id === Number(id));
  if (!c) notFound();
  const i = courses.indexOf(c);
  const prev = courses[i - 1];
  const next = courses[i + 1];
  return (
    <>
      <PageTitle title="茗強課程" />
      <article className={`container ${inner.wrap}`}>
        <div className={styles.layout}>
          {c.thumb ? (
            <figure className={styles.thumb}>
              <Image src={c.thumb} alt="" width={800} height={795} sizes="(min-width: 768px) 30vw, 60vw" />
            </figure>
          ) : null}
          <div className={styles.body}>
            <header className={inner.articleHead}>
              <p className={inner.articleDate}>{c.date.replace(/\./g, " . ")}</p>
              <h1 className={inner.articleTitle}>{c.title}</h1>
            </header>
            <p className={styles.text}>{c.text}</p>
            {c.link ? (
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="pill pill-arrow">
                點我閱讀全文
              </a>
            ) : null}
            <nav className={styles.pager} aria-label="前後課程">
              {prev ? (
                <TransitionLink href={`/academy/courses/${prev.id}`} className={styles.pagerLink}>
                  <span className={inner.entryDate}>上一篇</span>
                  <span>{prev.title}</span>
                </TransitionLink>
              ) : (
                <span />
              )}
              {next ? (
                <TransitionLink href={`/academy/courses/${next.id}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                  <span className={inner.entryDate}>下一篇</span>
                  <span>{next.title}</span>
                </TransitionLink>
              ) : null}
            </nav>
            <TransitionLink href="/academy/courses" className={inner.back}>
              BACK
            </TransitionLink>
          </div>
        </div>
      </article>
    </>
  );
}
