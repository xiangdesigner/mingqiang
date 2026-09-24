import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/ui/PageTitle";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { TransitionLink } from "@/components/site/TransitionLink";
import { services, serviceBySlug, type ServiceSection } from "@/content/services";
import inner from "../../inner.module.css";
import styles from "./service.module.css";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return { title: s.name, description: `${s.name}：${s.tagline.join("，")}`, alternates: { canonical: `/services/${s.slug}` } };
}

function Section({ s }: { s: ServiceSection }) {
  switch (s.type) {
    case "items":
      return (
        <ul className={inner.items}>
          {s.items.map((it) => (
            <li key={it.title} className={inner.item}>
              <h2 className={inner.itemTitle}>{it.title}</h2>
              {it.text ? <p className={inner.itemText}>{it.text}</p> : null}
            </li>
          ))}
        </ul>
      );
    case "blocks":
      return (
        <div className={styles.blocks}>
          {s.blocks.map((b) => (
            <section key={b.heading} className={inner.block}>
              <h2 className={inner.subheading}>{b.heading}</h2>
              <ul className={inner.items}>
                {b.items.map((it) => (
                  <li key={it.title} className={inner.item}>
                    <h3 className={inner.itemTitle}>{it.title}</h3>
                    {it.text ? <p className={inner.itemText}>{it.text}</p> : null}
                    {it.links?.map((l) => (
                      <p key={l.href} className={inner.itemText}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={styles.ext}>
                          {l.label}
                        </a>
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    case "groups":
      return (
        <div className={styles.groups}>
          {s.groups.map((g) => (
            <section key={g.index} className={styles.group}>
              <div className={inner.num}>
                <span className={inner.numIndex}>{g.index}</span>
                <h2 className={inner.numTitle}>{g.title}</h2>
              </div>
              <ul className={styles.tags}>
                {g.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    case "numbered":
      return (
        <div>
          {s.heading ? <h2 className={inner.subheading}>{s.heading}</h2> : null}
          <ol className={styles.numbered}>
            {s.items.map((it, i) => (
              <li key={it.title}>
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={inner.itemTitle}>{it.title}</h3>
                  {it.text ? <p className={inner.itemText}>{it.text}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "steps":
      return (
        <ol className={styles.steps}>
          {s.items.map((it, i) => (
            <li key={it.title}>
              <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
              <h2 className={styles.stepTitle}>{it.title}</h2>
              <p className={styles.stepText}>{it.text}</p>
            </li>
          ))}
        </ol>
      );
  }
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);
  return (
    <>
      <PageTitle title={s.name} subtitle={s.tagline.join("，")} />
      <div className={`container ${inner.wrap}`}>
        <div className={styles.layout}>
          <div className={styles.main}>
            {s.sections.map((sec, i) => (
              <Section key={i} s={sec} />
            ))}
          </div>
          <aside className={styles.aside} aria-label="其他服務項目">
            <p className={styles.asideTitle}>服務項目</p>
            <ul>
              {services.map((o) => (
                <li key={o.slug}>
                  <TransitionLink href={`/services/${o.slug}`} className={`${styles.asideLink} ${o.slug === s.slug ? styles.asideActive : ""}`} aria-current={o.slug === s.slug ? "page" : undefined}>
                    <span className={styles.asideIcon}>
                      <ServiceIcon name={o.icon} size={22} />
                    </span>
                    {o.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
            <TransitionLink href="/contact" className="pill pill-sm pill-arrow">
              聯絡我們
            </TransitionLink>
          </aside>
        </div>
        <nav className={styles.pager} aria-label="其他服務">
          {others.slice(0, 2).map((o) => (
            <TransitionLink key={o.slug} href={`/services/${o.slug}`} className={styles.pagerLink}>
              <span className={inner.entryDate}>其他服務</span>
              <span>{o.name}</span>
            </TransitionLink>
          ))}
        </nav>
      </div>
    </>
  );
}
