import type { Metadata } from "next";
import BlogIndex from "../components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog & Guides | Root Education",
  description:
    "Practical study abroad guides from Root Education counsellors: choosing a country, applications, scholarships, student visas, English tests and life abroad.",
};

export default function BlogPage() {
  return (
    <main className="flex-1">
      <BlogIndex />
    </main>
  );
}
