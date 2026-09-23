import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { site } from "@/content/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "隱私權政策",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead kicker="隱私權政策" en="Privacy" title="隱私權政策" />
      <section className={`container ${styles.body}`}>
        <div className="grid">
          <div className={styles.text}>
            <p className={styles.note}>本頁為最小內容版本，正式條文待法務審閱後更新。</p>
            <h2>蒐集的資料</h2>
            <p>當您透過本網站的聯絡表單提出諮詢時，我們會收到您填寫的姓名或單位、聯絡方式、專業類別、標的所在地（選填）與情況說明。</p>
            <h2>使用目的</h2>
            <p>上述資料僅用於回覆您的諮詢，並由{site.name}內對應的專業單位處理。</p>
            <h2>Cookie 與分析</h2>
            <p>本網站目前未使用第三方分析或廣告追蹤 Cookie。</p>
            <h2>聯絡</h2>
            <p>如需查詢、更正或刪除您提供的資料，請透過聯絡頁與我們聯繫。</p>
          </div>
        </div>
      </section>
    </>
  );
}
