import type { Metadata } from "next";
import UKCities from "../../components/UKCities";
import UKGuide from "../../components/UKGuide";
import UKHero from "../../components/UKHero";

export const metadata: Metadata = {
  title: "Study in the UK | Root Education",
  description: "World-ranked universities, one-year master's degrees and the Graduate Route. Plan your studies in the UK with Root Education.",
};

export default function StudyInUKPage() {
  return (
    <main className="flex-1">
      <UKHero />
      <UKGuide />
      <UKCities />
    </main>
  );
}
