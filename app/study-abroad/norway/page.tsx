import type { Metadata } from "next";
import NorwayPage from "../../components/countries/norway";

export const metadata: Metadata = {
  title: "Study in Norway | Root Education",
  description: "Research-led universities among the fjords. Plan your studies in Norway with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <NorwayPage />
    </main>
  );
}
