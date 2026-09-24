import Image from "next/image";
import { TransitionLink } from "@/components/site/TransitionLink";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/content/services";
import styles from "./ServiceCard.module.css";

export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <TransitionLink href={`/services/${service.slug}`} className={styles.card}>
      <span className={styles.top}>
        <span className={styles.circle}>
          <ServiceIcon name={service.icon} />
        </span>
        <H className={styles.title}>{service.name}</H>
        <span className={styles.meta}>
          <span className={styles.tagline}>
            <span>{service.tagline[0]}</span>
            <span>{service.tagline[1]}</span>
          </span>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </span>
      <span className={styles.photo}>
        <Image src={service.photo.src} alt={service.photo.alt} width={1200} height={800} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className={styles.img} />
      </span>
    </TransitionLink>
  );
}

export function ServicesGrid({ services, headingLevel = 3 }: { services: Service[]; headingLevel?: 2 | 3 }) {
  return (
    <ul className={styles.grid}>
      {services.map((s) => (
        <li key={s.slug}>
          <ServiceCard service={s} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
