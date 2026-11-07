import type { Metadata } from "next";
import ScholarshipHero from "../../components/ScholarshipHero";
import ScholarshipSteps from "../../components/ScholarshipSteps";
import ScholarshipTypes from "../../components/ScholarshipTypes";
import Faq from "../../components/UniversityFaq";

export const metadata: Metadata = {
  title: "Scholarship & Financial Aid | Root Education",
  description: "We find the scholarships, grants and funding you qualify for, and help you apply, so the cost of studying abroad comes down.",
};

// Placeholder answers: check them against how your service actually works.
const faqs = [
  { q: "Am I eligible for a scholarship?", a: "Many students are, but criteria vary: grades, test scores, subject, nationality and financial need all play a part. We review your profile and tell you which awards are realistic." },
  { q: "When should I start looking for scholarships?", a: "As early as possible. Many deadlines fall months before the course starts, and some close at the same time as university applications." },
  { q: "Do scholarships cover the full cost?", a: "Some do, but most cover part of the tuition or living costs. We help you combine awards and plan for whatever is left." },
  { q: "Can I apply for more than one scholarship?", a: "Usually yes. Applying for several improves your chances, and we help you manage each application and deadline." },
  { q: "Do you help with education loans?", a: "We guide you through comparing loan options and preparing the documents lenders ask for. The lending decision is always the lender's." },
  { q: "Can I work while I study?", a: "In most of our destinations students can work part-time within limits set by their visa. We explain the rules for your country." },
  { q: "Can you guarantee I'll get a scholarship?", a: "No one can guarantee an award, since the provider decides. We make sure your applications are as strong as they can be." },
];

export default function ScholarshipPage() {
  return (
    <main className="flex-1">
      <ScholarshipHero />
      <ScholarshipTypes />
      <ScholarshipSteps />
      <Faq faqs={faqs} intro="What students ask us most about funding their studies abroad." />
    </main>
  );
}
