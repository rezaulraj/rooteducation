import type { Metadata } from "next";
import UniversityBenefits from "../../components/UniversityBenefits";
import UniversityFaq from "../../components/UniversityFaq";
import UniversityProcess from "../../components/UniversityProcess";
import UniversitySelectionHero from "../../components/UniversitySelectionHero";
import UniversityWhy from "../../components/UniversityWhy";

export const metadata: Metadata = {
  title: "University Selection | Root Education",
  description: "Tell us what matters to you and get a shortlist of programmes that fit your goals, grades and budget.",
};

export default function UniversitySelectionPage() {
  return (
    <main className="flex-1">
      <UniversitySelectionHero />
      <UniversityProcess />
      <UniversityWhy />
      <UniversityBenefits />
      <UniversityFaq />
    </main>
  );
}
