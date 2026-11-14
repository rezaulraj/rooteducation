import type { Metadata } from "next";
import HowWeWork from "../components/HowWeWork";

export const metadata: Metadata = {
  title: "How We Work | Root Education",
  description:
    "From the first chat to take-off: how Root Education supports students with study plans, university choice, applications, scholarships, visas and pre-departure, and how we work with recruitment partners.",
};

export default function HowWeWorkPage() {
  return (
    <main className="flex-1">
      <HowWeWork />
    </main>
  );
}
