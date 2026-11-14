import type { Metadata } from "next";
import Counsellors from "../components/Counsellors";

export const metadata: Metadata = {
  title: "Our Counsellors | Root Education",
  description:
    "Meet the Root Education counsellors in London and Dhaka who guide students to universities in 20 countries, from shortlist to visa.",
};

export default function CounsellorsPage() {
  return (
    <main className="flex-1">
      <Counsellors />
    </main>
  );
}
