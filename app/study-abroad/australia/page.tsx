import type { Metadata } from "next";
import AustraliaCities from "../../components/AustraliaCities";
import AustraliaGuide from "../../components/AustraliaGuide";
import AustraliaHero from "../../components/AustraliaHero";

export const metadata: Metadata = {
  title: "Study in Australia | Root Education",
  description: "World-ranked universities, work rights and a post-study work visa. Plan your studies in Australia with Root Education.",
};

export default function StudyInAustraliaPage() {
  return (
    <main className="flex-1">
      <AustraliaHero />
      <AustraliaGuide />
      <AustraliaCities />
    </main>
  );
}
