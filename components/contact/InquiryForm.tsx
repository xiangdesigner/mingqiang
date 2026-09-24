"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import styles from "./InquiryForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"email" | "message", string>>;

const KINDS = ["抱怨", "問題", "建議", "稱讚"] as const;
const AREAS = ["設計", "服務", "其他"] as const;

/**
 * 聯絡我們 form — the same fields as the existing site (trans.php):
 * 意見種類、意見方面、意見內容、姓名、電子郵件、電話、傳真、請儘快與我聯絡.
 *
 * Submissions post to NEXT_PUBLIC_INQUIRY_ENDPOINT when configured at build
 * time. On static hosting (GitHub Pages) no endpoint exists, so the form
 * says so plainly and offers phone / email instead of pretending it sent.
 * (The existing site's image captcha is a server feature and is not
 * reproducible on static hosting.)
 */
export function InquiryForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [area, setArea] = useState<string>(AREAS[0]);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!email) e.email = "請輸入電子信箱。";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "電子信箱格式看起來不正確。";
    if (!message) e.message = "請輸入您的意見。";
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      setServerMessage("線上表單尚未啟用，請以電話或電子郵件與我們聯絡。");
      return;
    }
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data.entries())) });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setServerMessage(json.message ?? "目前無法送出，請稍後再試。");
      }
    } catch {
      setStatus("error");
      setServerMessage("網路連線異常，請確認後再試。");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>已收到您的意見，謝謝。</p>
        <p className={styles.successText}>我們會盡快以您留下的聯絡方式回覆。</p>
        <button type="button" className="pill pill-sm" onClick={() => setStatus("idle")}>
          再填寫一則
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <fieldset className={styles.box}>
        <legend className={styles.boxTitle}>你想給我們哪種意見？</legend>
        <div className={styles.choices}>
          {KINDS.map((k) => (
            <label key={k} className={styles.choice}>
              <input type="radio" name="kind" value={k} />
              <span>{k}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.box}>
        <legend className={styles.boxTitle}>你想給我們那方面的意見？</legend>
        <div className={styles.inline}>
          <select name="area" value={area} onChange={(e) => setArea(e.target.value)} className={styles.select} aria-label="意見方面">
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {area === "其他" ? (
            <div className={styles.field}>
              <label htmlFor={`${id}-other`}>其他</label>
              <input id={`${id}-other`} name="areaOther" type="text" className={styles.input} />
            </div>
          ) : null}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-message`}>請輸入意見？</label>
          <textarea id={`${id}-message`} name="message" rows={6} className={styles.textarea} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-err` : undefined} />
          {errors.message ? (
            <p id={`${id}-message-err`} className={styles.error}>
              {errors.message}
            </p>
          ) : null}
        </div>
      </fieldset>

      <fieldset className={styles.box}>
        <legend className={styles.boxTitle}>請告訴我們如何與您取得聯絡？</legend>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor={`${id}-name`}>姓名</label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-email`}>電子郵件 *</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="請輸入電子信箱" required className={styles.input} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} />
            {errors.email ? (
              <p id={`${id}-email-err`} className={styles.error}>
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-phone`}>電話</label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${id}-fax`}>傳真</label>
            <input id={`${id}-fax`} name="fax" type="text" className={styles.input} />
          </div>
        </div>
        <label className={`${styles.choice} ${styles.urgent}`}>
          <input type="checkbox" name="urgent" value="請儘快與我聯絡" />
          <span>請儘快與我聯絡</span>
        </label>
      </fieldset>

      <div className={styles.actions}>
        <button type="reset" className="pill" onClick={() => setErrors({})}>
          重新填寫
        </button>
        <button type="submit" className="pill pill-solid" disabled={status === "submitting"} aria-busy={status === "submitting"}>
          {status === "submitting" ? "送出中" : "確定送出"}
        </button>
      </div>
      {status === "error" ? (
        <p className={styles.serverError} role="alert">
          {serverMessage} 電話 <a href={site.phoneHref}>{site.phone}</a>，電子郵件 <a href={`mailto:${site.email}`}>{site.email}</a>。
        </p>
      ) : null}
    </form>
  );
}
