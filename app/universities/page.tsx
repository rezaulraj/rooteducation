import type { Metadata } from "next";
import UniversitiesExplorer from "../components/UniversitiesExplorer";

export const metadata: Metadata = {
  title: "Universities & Programmes | Root Education",
  description: "Explore universities and programmes in 20 study-abroad destinations. Search by country, subject, level and type with Root Education.",
};

export default function UniversitiesPage() {
  return (
    <main className="flex-1">
      <UniversitiesExplorer />
    </main>
  );
}
