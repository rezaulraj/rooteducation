import type { Metadata } from "next";
import StudyAbroadCards from "../../components/StudyAbroadCards";
import StudyAbroadHero from "../../components/StudyAbroadHero";

export const metadata: Metadata = {
  title: "Study Abroad Consultation | Root Education",
  description: "One-to-one guidance to plan your path, from choosing a country to your first day on campus.",
};

export default function StudyAbroadConsultationPage() {
  return (
    <main className="flex-1">
      <StudyAbroadHero />
      <StudyAbroadCards />
    </main>
  );
}
