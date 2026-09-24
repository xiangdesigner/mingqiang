import { HeroBanner } from "@/components/home/HeroBanner";
import { NewsSection } from "@/components/home/NewsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AcademySection } from "@/components/home/AcademySection";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <NewsSection />
      <ServicesSection />
      <AcademySection />
    </>
  );
}
