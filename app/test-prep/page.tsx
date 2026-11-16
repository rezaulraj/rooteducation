import type { Metadata } from "next";
import TestPrep from "../components/TestPrep";

export const metadata: Metadata = {
  title: "Test Preparation | Root Education",
  description:
    "IELTS, PTE, TOEFL, Duolingo, SAT, GRE and GMAT explained, with expert coaching from Root Education to reach the score your university asks for.",
};

export default function TestPrepPage() {
  return (
    <main className="flex-1">
      <TestPrep />
    </main>
  );
}
