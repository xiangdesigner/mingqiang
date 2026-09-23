import { PageHead } from "@/components/ui/PageHead";
import { TransitionLink } from "@/components/site/TransitionLink";

export default function NotFound() {
  return (
    <>
      <PageHead kicker="404" en="Not found" title="這個位置沒有登記。" lead="您要找的頁面不存在，或已經移動。" />
      <section className="container" style={{ paddingBottom: "var(--section-y)" }}>
        <TransitionLink href="/" className="action">
          回到首頁
        </TransitionLink>
      </section>
    </>
  );
}
