import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServicesGrid } from "@/components/services/ServiceCard";
import { services } from "@/content/services";
import { mockup } from "@/content/site";
import styles from "./ServicesSection.module.css";

export function ServicesSection() {
  return (
    <section className={`section section-sand ${styles.root}`} aria-labelledby="home-services">
      <div className="container">
        <SectionTitle id="home-services" title="服務項目" subtitle={mockup.services.subtitle} />
        <div className={styles.grid}>
          <ServicesGrid services={services} />
        </div>
      </div>
    </section>
  );
}
