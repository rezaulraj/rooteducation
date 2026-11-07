import type { Metadata } from "next";
import DepartureHero from "../../components/DepartureHero";
import DeparturePacking from "../../components/DeparturePacking";
import DepartureTopics from "../../components/DepartureTopics";
import Faq from "../../components/UniversityFaq";

export const metadata: Metadata = {
  title: "Pre-departure Briefing | Root Education",
  description: "Everything you need to know before you fly: accommodation, banking, travel, health and settling into a new country.",
};

// Placeholder answers: check them against how your service actually works.
const faqs = [
  { q: "What is a pre-departure briefing?", a: "A session before you travel that covers everything practical: accommodation, money, travel, health, local life and the rules that come with your visa." },
  { q: "When should I attend it?", a: "Ideally a few weeks before you fly, once your visa is approved and your travel plans are taking shape." },
  { q: "Is it online or in person?", a: "Ask your advisor about the options available. Our London and Dhaka offices are there if you'd like to come in." },
  { q: "Will you help me find accommodation?", a: "We explain your options, what to look out for in contracts and how to avoid common scams, so you can choose with confidence." },
  { q: "What should I pack?", a: "Your passport, visa, offer letter and other key documents in your hand luggage, plus essentials for your first weeks. We give you a full checklist." },
  { q: "Can I get support after I arrive?", a: "Yes. Get in touch with your advisor if you have questions once you've settled in." },
];

export default function PreDeparturePage() {
  return (
    <main className="flex-1">
      <DepartureHero />
      <DeparturePacking />
      <DepartureTopics />
      <Faq faqs={faqs} intro="What students ask us most before they fly." />
    </main>
  );
}
