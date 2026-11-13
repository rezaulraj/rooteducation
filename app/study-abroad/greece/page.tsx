import type { Metadata } from "next";
import GreecePage from "../../components/countries/greece";

export const metadata: Metadata = {
  title: "Study in Greece | Root Education",
  description: "Affordable, English-taught degrees where learning began. Plan your studies in Greece with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <GreecePage />
    </main>
  );
}
