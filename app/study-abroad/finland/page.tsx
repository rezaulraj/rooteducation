import type { Metadata } from "next";
import FinlandPage from "../../components/countries/finland";

export const metadata: Metadata = {
  title: "Study in Finland | Root Education",
  description: "World-famous education, fee waivers and two years to find work. Plan your studies in Finland with Root Education.",
};

export default function Page() {
  return (
    <main className="flex-1">
      <FinlandPage />
    </main>
  );
}
