import type { Metadata } from "next";
import MalaysiaPage from "../../components/countries/malaysia";

export const metadata: Metadata = {
  title: "Study in Malaysia | Root Education",
  description: "Affordable, English-taught degrees and international branch campuses. Plan your studies in Malaysia with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <MalaysiaPage />
    </main>
  );
}
