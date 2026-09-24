import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NewsList } from "@/components/news/NewsList";
import { TransitionLink } from "@/components/site/TransitionLink";
import { news } from "@/content/news";
import { mockup } from "@/content/site";
import styles from "./NewsSection.module.css";

export function NewsSection() {
  return (
    <section className={`section section-warm ${styles.root}`} aria-labelledby="home-news">
      <Image src="/images/home/news-bg.webp" alt="" width={1366} height={855} className={styles.bg} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <SectionTitle
          id="home-news"
          title="最新消息"
          subtitle={mockup.news.subtitle}
          action={
            <TransitionLink href="/news" className="pill pill-arrow">
              {mockup.news.more}
            </TransitionLink>
          }
        />
        <div className={styles.list}>
          <NewsList items={news} />
        </div>
      </div>
    </section>
  );
}
