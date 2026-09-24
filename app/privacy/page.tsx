import type { Metadata } from "next";
import { PageTitle } from "@/components/ui/PageTitle";
import { site } from "@/content/site";
import inner from "../inner.module.css";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "隱私權政策",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageTitle title="隱私權政策" />
      <section className={`container ${inner.wrap}`}>
        <div className={`prose ${styles.text}`}>
          <p className={styles.note}>本頁為最小內容版本，正式條文待法務審閱後更新。</p>
          <h2>蒐集的資料</h2>
          <p>當您透過本網站的聯絡表單提出意見時，我們會收到您填寫的意見種類與內容、姓名、電子郵件、電話與傳真。</p>
          <h2>使用目的</h2>
          <p>上述資料僅用於回覆您的意見，並由{site.name}內對應的單位處理。</p>
          <h2>Cookie 與分析</h2>
          <p>本網站目前未使用第三方分析或廣告追蹤 Cookie。</p>
          <h2>聯絡</h2>
          <p>如需查詢、更正或刪除您提供的資料，請透過聯絡我們頁面與我們聯繫。</p>
        </div>
      </section>
    </>
  );
}
