import type { Metadata } from "next";
import BelgiumPage from "../../components/countries/belgium";

export const metadata: Metadata = {
  title: "Study in Belgium | Root Education",
  description: "Highly ranked, affordable universities at the heart of Europe. Plan your studies in Belgium with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <BelgiumPage />
    </main>
  );
}
