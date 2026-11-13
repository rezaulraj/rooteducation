import type { Metadata } from "next";
import USAPage from "../../components/countries/usa";

export const metadata: Metadata = {
  title: "Study in the USA | Root Education",
  description: "World-leading universities, flexible degrees and OPT work experience. Plan your studies in the USA with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <USAPage />
    </main>
  );
}
