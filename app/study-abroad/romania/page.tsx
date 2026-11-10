import type { Metadata } from "next";
import RomaniaCities from "../../components/RomaniaCities";
import RomaniaGuide from "../../components/RomaniaGuide";
import RomaniaHero from "../../components/RomaniaHero";
import RomaniaInstitutions from "../../components/RomaniaInstitutions";

export const metadata: Metadata = {
  title: "Study in Romania | Root Education",
  description: "EU-recognised degrees, English-taught programmes and an affordable cost of living. Plan your studies in Romania with Root Education.",
};

export default function StudyInRomaniaPage() {
  return (
    <main className="flex-1">
      <RomaniaHero />
      <RomaniaGuide />
      <RomaniaCities />
      <RomaniaInstitutions />
    </main>
  );
}
