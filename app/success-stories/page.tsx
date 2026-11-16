import type { Metadata } from "next";
import SuccessStories from "../components/SuccessStories";

export const metadata: Metadata = {
  title: "Student Success Stories | Root Education",
  description:
    "Meet students Root Education has guided to universities in the UK, Canada, Australia, Ireland and across Europe.",
};

export default function SuccessStoriesPage() {
  return (
    <main className="flex-1">
      <SuccessStories />
    </main>
  );
}
