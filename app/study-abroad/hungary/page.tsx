import type { Metadata } from "next";
import HungaryCities from "../../components/HungaryCities";
import HungaryGuide from "../../components/HungaryGuide";
import HungaryHero from "../../components/HungaryHero";

export const metadata: Metadata = {
  title: "Study in Hungary | Root Education",
  description: "English-taught medicine, engineering and business degrees in the heart of Europe. Plan your studies in Hungary with Root Education.",
};

export default function StudyInHungaryPage() {
  return (
    <main className="flex-1">
      <HungaryHero />
      <HungaryGuide />
      <HungaryCities />
    </main>
  );
}
