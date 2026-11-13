import type { Metadata } from "next";
import SpainPage from "../../components/countries/spain";

export const metadata: Metadata = {
  title: "Study in Spain | Root Education",
  description: "Affordable universities and a Mediterranean way of life. Plan your studies in Spain with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <SpainPage />
    </main>
  );
}
