import type { Metadata } from "next";
import SwedenPage from "../../components/countries/sweden";

export const metadata: Metadata = {
  title: "Study in Sweden | Root Education",
  description: "Innovative, English-taught degrees in a progressive society. Plan your studies in Sweden with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <SwedenPage />
    </main>
  );
}
