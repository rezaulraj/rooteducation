import type { Metadata } from "next";
import SouthKoreaPage from "../../components/countries/south-korea";

export const metadata: Metadata = {
  title: "Study in South Korea | Root Education",
  description: "Top technology universities and the Global Korea Scholarship. Plan your studies in South Korea with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <SouthKoreaPage />
    </main>
  );
}
