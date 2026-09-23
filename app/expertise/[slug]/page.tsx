import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/ui/PageHead";
import { BoundaryLine } from "@/components/ui/BoundaryLine";
import { TransitionLink } from "@/components/site/TransitionLink";
import { ProceduralPlan } from "@/components/home/ExpertiseSequence";
import { expertise, expertiseBySlug } from "@/content/expertise";
import { practices } from "@/content/practices";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return expertise.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/expertise/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const e = expertiseBySlug(slug);
  if (!e) return {};
  return {
    title: `${e.name}｜${e.nameEn}`,
    description: e.summary,
    alternates: { canonical: `/expertise/${e.slug}` },
  };
}

export default async function ExpertiseDetailPage(props: PageProps<"/expertise/[slug]">) {
  const { slug } = await props.params;
  const e = expertiseBySlug(slug);
  if (!e) notFound();
  const i = expertise.findIndex((x) => x.slug === e.slug);
  const prev = expertise[(i - 1 + expertise.length) % expertise.length];
  const next = expertise[(i + 1) % expertise.length];
  const p = practices.find((x) => x.id === e.practiceId);

  return (
    <>
      <PageHead index={e.index} kicker="專業領域" en={e.nameEn} title={e.name} lead={e.summary} />

      <article className={`container ${styles.article}`}>
        <div className="grid">
          <div className={`ink ${styles.plate}`}>
            {e.image ? <Image src={e.image.src} alt={e.image.alt} width={1000} height={1000} sizes="(min-width: 1024px) 42vw, 100vw" quality={72} priority className={styles.img} /> : <ProceduralPlan />}
            <p className={styles.plateFolio}>
              <span>{e.index}</span>
              <span>{e.nameEn}</span>
            </p>
          </div>

          <div className={styles.body}>
            {e.body.map((para, k) => (
              <p key={k} className={styles.para}>
                {para}
              </p>
            ))}

            <h2 className={styles.h}>服務範疇</h2>
            <ol className={styles.scope}>
              {e.scope.map((s, k) => (
                <li key={s}>
                  <span className={styles.scopeIdx}>{String(k + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>

            <h2 className={styles.h}>執行單位</h2>
            <p className={styles.practice}>
              <span className={styles.practiceName}>{p?.name}</span>
              <span className={styles.practiceEn}>{p?.nameEn}</span>
              <span className={styles.practiceKind}>{p?.kind}</span>
            </p>

            <div className={styles.actions}>
              <TransitionLink href="/contact" className="action action-primary">
                提出諮詢
              </TransitionLink>
              <TransitionLink href="/about" className="action">
                關於茗強
              </TransitionLink>
            </div>
          </div>
        </div>
      </article>

      <nav className={`container ${styles.pager}`} aria-label="其他領域">
        <BoundaryLine />
        <div className={styles.pagerRow}>
          <TransitionLink href={`/expertise/${prev.slug}`} className={styles.pagerLink}>
            <span className="label">上一項 {prev.index}</span>
            <span className={styles.pagerName}>{prev.name}</span>
          </TransitionLink>
          <TransitionLink href={`/expertise/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className="label">下一項 {next.index}</span>
            <span className={styles.pagerName}>{next.name}</span>
          </TransitionLink>
        </div>
      </nav>
    </>
  );
}
