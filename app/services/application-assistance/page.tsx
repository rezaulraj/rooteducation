import type { Metadata } from "next";
import ApplicationHero from "../../components/ApplicationHero";
import ApplicationProcess from "../../components/ApplicationProcess";
import ApplicationServices from "../../components/ApplicationServices";
import ApplicationWhy from "../../components/ApplicationWhy";
import Faq from "../../components/UniversityFaq";

// Placeholder answers: check them against how your service actually works.
const faqs = [
  { q: "What does application assistance include?", a: "Help with every part of your application: document preparation, personal statement reviews, recommendation letters, interview practice, submission and follow-up with universities." },
  { q: "Which documents will I need?", a: "Usually transcripts, a personal statement, recommendation letters, a CV, English test scores and a passport copy. Your advisor gives you a checklist specific to each university and programme." },
  { q: "Will you write my personal statement for me?", a: "No. It needs to be your own work. We help you plan it, give detailed feedback on each draft and make sure it's clear, engaging and fits the programme." },
  { q: "How many universities can I apply to?", a: "There's no fixed limit. We usually suggest a balanced list, and we manage each application side by side so every deadline is met." },
  { q: "How long does the application process take?", a: "It depends on your intake, your destinations and how quickly your documents come together. Your advisor will set out a timeline at your first meeting." },
  { q: "Do you help with interviews?", a: "Yes. We run mock interviews that mirror the real thing and give you honest feedback on how to improve." },
  { q: "What happens after I submit?", a: "We stay in touch, help you respond to any extra requests from universities, and guide you through comparing and accepting offers." },
  { q: "Is there a fee for application assistance?", a: "Your advisor will explain exactly what's included, and any fees, before you commit to anything." },
];

export const metadata: Metadata = {
  title: "Application Assistance | Root Education",
  description: "Document reviews, personal statements and submission guidance, so your application is complete, polished and on time.",
};

export default function ApplicationAssistancePage() {
  return (
    <main className="flex-1">
      <ApplicationHero />
      <ApplicationServices />
      <ApplicationWhy />
      <ApplicationProcess />
      <Faq faqs={faqs} intro="What students ask us most about putting their applications together." />
    </main>
  );
}
