import type { Metadata } from "next";
import LithuaniaPage from "../../components/countries/lithuania";

export const metadata: Metadata = {
  title: "Study in Lithuania | Root Education",
  description: "Low-cost, English-taught EU degrees on the Baltic. Plan your studies in Lithuania with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <LithuaniaPage />
    </main>
  );
}
