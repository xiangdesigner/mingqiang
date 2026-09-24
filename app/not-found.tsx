import { PageTitle } from "@/components/ui/PageTitle";
import { TransitionLink } from "@/components/site/TransitionLink";
import inner from "./inner.module.css";

export default function NotFound() {
  return (
    <>
      <PageTitle title="找不到頁面" subtitle="您要找的頁面不存在，或已經移動。" />
      <section className={`container ${inner.wrap}`}>
        <TransitionLink href="/" className="pill pill-arrow">
          回到首頁
        </TransitionLink>
      </section>
    </>
  );
}
