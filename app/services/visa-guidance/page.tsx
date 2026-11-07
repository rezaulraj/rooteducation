import type { Metadata } from "next";
import Faq from "../../components/UniversityFaq";
import VisaHero from "../../components/VisaHero";
import VisaJourney from "../../components/VisaJourney";
import VisaServices from "../../components/VisaServices";

export const metadata: Metadata = {
  title: "Visa Guidance | Root Education",
  description: "Step-by-step support with your student visa: the right documents, a strong application and confident interview preparation.",
};

// Placeholder answers: check them against how your service actually works.
const faqs = [
  { q: "Which student visa do I need?", a: "It depends on your destination and course length. We confirm the right visa type for your situation at the start." },
  { q: "When should I apply for my visa?", a: "Usually once you have your university offer or confirmation. Processing times vary by country, so your advisor will tell you how early to start." },
  { q: "What documents are usually required?", a: "Commonly your passport, university offer, proof of funds, academic records, English test results and sometimes health insurance or medical checks. We give you a checklist for your destination." },
  { q: "How do I prove I have enough funds?", a: "Each country sets its own rules for how much you need and how it must be shown. We explain what's expected and review your evidence before you submit." },
  { q: "Will I need a visa interview?", a: "Some countries and embassies require one. If you do, we run mock interviews so you know what to expect." },
  { q: "What if my visa is refused?", a: "We review the refusal reasons with you and advise on the best next step, whether that's reapplying with stronger evidence or another route." },
  { q: "Can you guarantee my visa will be approved?", a: "No one can guarantee a visa decision, which is made by the embassy. What we can do is make sure your application is complete, accurate and as strong as possible." },
];

export default function VisaGuidancePage() {
  return (
    <main className="flex-1">
      <VisaHero />
      <VisaServices />
      <VisaJourney />
      <Faq faqs={faqs} intro="What students ask us most about getting their student visa." />
    </main>
  );
}
