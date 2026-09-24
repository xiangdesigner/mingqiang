import type { Metadata } from "next";
import { PageTitle } from "@/components/ui/PageTitle";
import { NewsList } from "@/components/news/NewsList";
import { news } from "@/content/news";
import inner from "../inner.module.css";

export const metadata: Metadata = {
  title: "最新消息",
  description: "茗強地政與土管最新消息。",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageTitle title="最新消息" />
      <section className={`container ${inner.wrap}`}>
        <NewsList items={news} headingLevel={2} />
      </section>
    </>
  );
}
