import type { Metadata } from "next";
import MaltaCities from "../../components/MaltaCities";
import MaltaGuide from "../../components/MaltaGuide";
import MaltaHero from "../../components/MaltaHero";

export const metadata: Metadata = {
  title: "Study in Malta | Root Education",
  description: "English-taught, EU-recognised degrees on a safe Mediterranean island. Plan your studies in Malta with Root Education.",
};

export default function StudyInMaltaPage() {
  return (
    <main className="flex-1">
      <MaltaHero />
      <MaltaGuide />
      <MaltaCities />
    </main>
  );
}
