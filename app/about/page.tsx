import type { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
  title: "About Us | Root Education",
  description:
    "Root Education turns global ambition into reality, one student at a time: honest study abroad guidance from our offices in London and Dhaka.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <About />
    </main>
  );
}
