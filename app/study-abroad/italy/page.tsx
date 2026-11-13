import type { Metadata } from "next";
import ItalyPage from "../../components/countries/italy";

export const metadata: Metadata = {
  title: "Study in Italy | Root Education",
  description: "Historic universities, low tuition and regional grants. Plan your studies in Italy with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <ItalyPage />
    </main>
  );
}
