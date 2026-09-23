"use client";

import { useId, useState, type FormEvent } from "react";
import { expertise } from "@/content/expertise";
import { site } from "@/content/site";
import styles from "./InquiryForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "contact" | "message" | "field", string>>;

/**
 * Qualified inquiry form. Validates on the client, then posts to
 * NEXT_PUBLIC_INQUIRY_ENDPOINT if one is configured at build time.
 *
 * This site can be built either for a Node-capable host (with the
 * app/api/inquiry route handling submissions server-side) or for static
 * hosting such as GitHub Pages, which cannot run any server code at all.
 * When no endpoint is configured — the static-hosting case — the form
 * skips the network call entirely and shows the same honest message it
 * would show if a real backend were unreachable, with phone/email as the
 * fallback.
 */
export function InquiryForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const field = String(data.get("field") ?? "");
    if (!name) e.name = "請填寫姓名或單位名稱。";
    if (!contact) e.contact = "請填寫電話或電子郵件，以便回覆。";
    else if (!/^(\+?[\d\s\-()]{7,}|[^\s@]+@[^\s@]+\.[^\s@]+)$/.test(contact)) e.contact = "格式看起來不正確，請確認電話或電子郵件。";
    if (!field) e.field = "請選擇最接近的專業類別。";
    if (message.length < 10) e.message = "請至少以一句話說明您的情況（10 字以上）。";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");

    const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;
    if (!endpoint) {
      // Static hosting (e.g. GitHub Pages): no server is available to
      // receive this. Say so plainly rather than pretending it sent.
      setStatus("error");
      setServerMessage("此為靜態展示網站，線上表單尚未啟用，請以電話或電子郵件聯絡。");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
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
        <p className="label">已收到</p>
        <p className={styles.successTitle}>謝謝您的說明。</p>
        <p className={styles.successText}>我們會由對應的專業單位以您留下的聯絡方式回覆。</p>
        <button type="button" className="action" onClick={() => setStatus("idle")}>
          再送出一則
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={`${id}-intro`}>
      <p id={`${id}-intro`} className={styles.intro}>
        欄位標示 * 為必填。表單內容僅用於回覆您的諮詢。
      </p>

      <div className={styles.row}>
        <label htmlFor={`${id}-name`} className={styles.label}>
          姓名或單位 *
        </label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" className={styles.input} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
        {errors.name ? (
          <p id={`${id}-name-err`} className={styles.error}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.row}>
        <label htmlFor={`${id}-contact`} className={styles.label}>
          電話或電子郵件 *
        </label>
        <input id={`${id}-contact`} name="contact" type="text" inputMode="email" autoComplete="email" className={styles.input} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${id}-contact-err` : undefined} />
        {errors.contact ? (
          <p id={`${id}-contact-err`} className={styles.error}>
            {errors.contact}
          </p>
        ) : null}
      </div>

      <fieldset className={styles.fieldset} aria-describedby={errors.field ? `${id}-field-err` : undefined}>
        <legend className={styles.label}>專業類別 *</legend>
        <div className={styles.options}>
          {expertise.map((e) => (
            <label key={e.slug} className={styles.option}>
              <input type="radio" name="field" value={e.slug} />
              <span className={styles.optionIdx}>{e.index}</span>
              <span>{e.name}</span>
            </label>
          ))}
          <label className={styles.option}>
            <input type="radio" name="field" value="unsure" />
            <span className={styles.optionIdx}>—</span>
            <span>不確定，請協助判斷</span>
          </label>
        </div>
        {errors.field ? (
          <p id={`${id}-field-err`} className={styles.error}>
            {errors.field}
          </p>
        ) : null}
      </fieldset>

      <div className={styles.row}>
        <label htmlFor={`${id}-location`} className={styles.label}>
          標的所在地（選填）
        </label>
        <input id={`${id}-location`} name="location" type="text" className={styles.input} placeholder="例如：臺中市西屯區" />
      </div>

      <div className={styles.row}>
        <label htmlFor={`${id}-message`} className={styles.label}>
          情況說明 *
        </label>
        <textarea id={`${id}-message`} name="message" rows={6} className={styles.textarea} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-err` : undefined} />
        {errors.message ? (
          <p id={`${id}-message-err`} className={styles.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={styles.foot}>
        <button type="submit" className="action action-primary" disabled={status === "submitting"} aria-busy={status === "submitting"}>
          {status === "submitting" ? "送出中" : "送出諮詢"}
        </button>
        {status === "error" ? (
          <p className={styles.serverError} role="alert">
            {serverMessage}
            {site.email ? (
              <>
                {" "}
                您也可以直接來信 <a href={`mailto:${site.email}`} className="link">{site.email}</a>。
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    </form>
  );
}
