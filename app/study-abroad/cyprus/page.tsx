import type { Metadata } from "next";
import CyprusCities from "../../components/CyprusCities";
import CyprusGuide from "../../components/CyprusGuide";
import CyprusHero from "../../components/CyprusHero";

export const metadata: Metadata = {
  title: "Study in Cyprus | Root Education",
  description: "English-taught, EU-recognised degrees on a sunny Mediterranean island. Plan your studies in Cyprus with Root Education.",
};

export default function StudyInCyprusPage() {
  return (
    <main className="flex-1">
      <CyprusHero />
      <CyprusGuide />
      <CyprusCities />
    </main>
  );
}
