import type { Metadata } from "next";
import Faq from "../components/Faq";
import { FAQS } from "../components/faqData";

export const metadata: Metadata = {
  title: "FAQs | Root Education",
  description:
    "Answers to common questions about studying abroad with Root Education: consultations, universities, applications, costs, scholarships, visas and pre-departure.",
};

// Structured data so search engines can show these answers directly.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Faq />
    </main>
  );
}
