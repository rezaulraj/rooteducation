import type { Metadata } from "next";
import CanadaPage from "../../components/countries/canada";

export const metadata: Metadata = {
  title: "Study in Canada | Root Education",
  description: "World-class universities, work rights and post-graduation work permits. Plan your studies in Canada with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <CanadaPage />
    </main>
  );
}
