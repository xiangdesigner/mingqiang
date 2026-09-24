import type { Metadata } from "next";
import { PageTitle } from "@/components/ui/PageTitle";
import { ServicesGrid } from "@/components/services/ServiceCard";
import { services } from "@/content/services";
import { mockup } from "@/content/site";
import inner from "../inner.module.css";

export const metadata: Metadata = {
  title: "服務項目",
  description: "不動產估價、城鄉規劃、仲介＆代書業務、資產評估、不動產理財規劃、估價委任流程。",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageTitle title="服務項目" subtitle={mockup.services.subtitle} />
      <section className={`container ${inner.wrap}`}>
        <ServicesGrid services={services} headingLevel={2} />
      </section>
    </>
  );
}
