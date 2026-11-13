import type { Metadata } from "next";
import IrelandPage from "../../components/countries/ireland";

export const metadata: Metadata = {
  title: "Study in Ireland | Root Education",
  description: "English-speaking EU degrees, a tech hub and the Stay Back visa. Plan your studies in Ireland with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <IrelandPage />
    </main>
  );
}
