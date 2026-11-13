import type { Metadata } from "next";
import NewZealandCities from "../../components/NewZealandCities";
import NewZealandGuide from "../../components/NewZealandGuide";
import NewZealandHero from "../../components/NewZealandHero";

export const metadata: Metadata = {
  title: "Study in New Zealand | Root Education",
  description: "Intakes, costs, work rights and visas for studying in New Zealand. Plan your studies in New Zealand with Root Education.",
};

export default function StudyInNewZealandPage() {
  return (
    <main className="flex-1">
      <NewZealandHero />
      <NewZealandGuide />
      <NewZealandCities />
    </main>
  );
}
