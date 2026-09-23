import { Opening } from "@/components/home/Opening";
import { Manifesto } from "@/components/home/Manifesto";
import { LandField } from "@/components/home/LandField";
import { ExpertiseSequence } from "@/components/home/ExpertiseSequence";
import { PracticeMap } from "@/components/home/PracticeMap";
import { EvidenceIndex } from "@/components/home/EvidenceIndex";
import { Record } from "@/components/home/Record";
import { Philosophy } from "@/components/home/Philosophy";
import { AcademyIndex } from "@/components/home/AcademyIndex";
import { ContactAnchor } from "@/components/home/ContactAnchor";

export default function HomePage() {
  return (
    <>
      <Opening />
      <Manifesto />
      <LandField />
      <ExpertiseSequence />
      <PracticeMap />
      <EvidenceIndex />
      <Record />
      <Philosophy />
      <AcademyIndex />
      <ContactAnchor />
    </>
  );
}
