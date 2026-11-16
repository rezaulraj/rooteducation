// Frequently asked questions. General guidance written for launch: review the wording with your team.

export type FaqTopic =
  | "Getting started"
  | "Universities"
  | "Applications"
  | "Costs & scholarships"
  | "Visas"
  | "Before you fly";

export const FAQ_TOPICS: { key: FaqTopic; icon: string }[] = [
  {
    key: "Getting started",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM15.5 8.5l-2 5-5 2 2-5z",
  },
  {
    key: "Universities",
    icon: "M3 9.5 12 4l9 5.5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18",
  },
  {
    key: "Applications",
    icon: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 14l2 2 4-4",
  },
  {
    key: "Costs & scholarships",
    icon: "m2 9 10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5",
  },
  {
    key: "Visas",
    icon: "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6M9 17h6",
  },
  {
    key: "Before you fly",
    icon: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  },
];

export type Faq = {
  topic: FaqTopic;
  q: string;
  a: string;
  link?: { label: string; href: string };
};

export const FAQS: Faq[] = [
  // Getting started
  {
    topic: "Getting started",
    q: "Is the first consultation really free?",
    a: "Yes. Your first one-to-one session with a counsellor is free and there's no obligation. We'll look at your grades, goals and budget and suggest realistic next steps.",
    link: { label: "Book a free consultation", href: "/consultation" },
  },
  {
    topic: "Getting started",
    q: "When should I start planning to study abroad?",
    a: "Ideally 12 to 18 months before you want to start. That leaves time to choose a country, take an English test, prepare documents and meet application and scholarship deadlines, some of which close very early.",
  },
  {
    topic: "Getting started",
    q: "Which countries can you help me with?",
    a: "We guide students to 20 destinations, including the UK, Ireland, Canada, the USA, Australia, New Zealand and many European countries such as Malta, Hungary, Cyprus, Romania, Italy and Spain.",
    link: { label: "See all destinations", href: "/universities" },
  },
  {
    topic: "Getting started",
    q: "Can I meet you in person?",
    a: "Yes. You can visit our offices in London and Dhaka, or meet a counsellor online by video or phone. Please book a time first so the right counsellor is available.",
    link: { label: "Find our offices", href: "/contact" },
  },
  // Universities
  {
    topic: "Universities",
    q: "How do you choose universities for me?",
    a: "We build a shortlist around your academic results, subject, budget, preferred countries and career plans, then explain the entry requirements and your realistic chances at each.",
  },
  {
    topic: "Universities",
    q: "How many universities should I apply to?",
    a: "Most students apply to four to six: a mix of ambitious, realistic and safer choices. Some systems limit the number, for example UCAS allows up to five choices for UK undergraduate courses.",
  },
  {
    topic: "Universities",
    q: "Are courses taught in English?",
    a: "In English-speaking countries, yes. Across Europe, many universities also offer full degrees taught in English, especially in medicine, business, engineering and computing. We only shortlist programmes you can study in English unless you ask otherwise.",
  },
  // Applications
  {
    topic: "Applications",
    q: "What documents will I need?",
    a: "Usually: your passport, academic transcripts and certificates, English test results, a statement of purpose or personal statement, references and a CV. Some courses also ask for a portfolio, an interview or an admissions test.",
  },
  {
    topic: "Applications",
    q: "Do I need an English test like IELTS?",
    a: "Usually yes, though some universities waive it if you studied in English. Accepted tests and scores vary by university and visa route, so we check yours before you book.",
    link: { label: "Compare English tests", href: "/test-prep" },
  },
  {
    topic: "Applications",
    q: "How long does it take to get an offer?",
    a: "It varies by university and country, from a few weeks to a few months. Applying early generally means faster decisions and more choice of accommodation.",
  },
  {
    topic: "Applications",
    q: "Will you help with my statement of purpose?",
    a: "Yes. We help you plan it, give feedback on your drafts and check the final version. The words and experiences should always be your own.",
    link: {
      label: "Read our SOP guide",
      href: "/blog/statement-of-purpose-that-stands-out",
    },
  },
  // Costs & scholarships
  {
    topic: "Costs & scholarships",
    q: "How much does it cost to study abroad?",
    a: "It depends on the country, city, university and course. Remember to budget for living costs, health insurance and visa fees as well as tuition. We'll give you a realistic estimate for each option on your shortlist.",
  },
  {
    topic: "Costs & scholarships",
    q: "Can I get a scholarship?",
    a: "Many students can. Universities, governments and private funds offer awards for academic results, leadership, subjects or nationalities. We help you find the ones you qualify for and prepare strong applications.",
    link: {
      label: "Scholarship support",
      href: "/services/scholarship-financial-aid",
    },
  },
  {
    topic: "Costs & scholarships",
    q: "Can I work while I study?",
    a: "In most destinations students can work part-time during term and more during holidays, within limits set by the visa. The rules differ by country and change from time to time, so always check the official guidance.",
  },
  // Visas
  {
    topic: "Visas",
    q: "Will you help with my student visa?",
    a: "Yes. We explain the requirements for your country, help you prepare and check your documents, and get you ready for any interview.",
    link: { label: "Visa guidance", href: "/services/visa-guidance" },
  },
  {
    topic: "Visas",
    q: "How much money do I need to show for a visa?",
    a: "Each country sets its own amount for tuition and living costs, and how long the money must be held. Check the official government website for your destination for the current figures.",
  },
  {
    topic: "Visas",
    q: "Can you guarantee my visa?",
    a: "No one can guarantee a visa: the decision is made only by the government. What we can do is make sure your application is complete, accurate and well prepared.",
  },
  // Before you fly
  {
    topic: "Before you fly",
    q: "Do you help with accommodation?",
    a: "We'll explain your options, such as university halls or private rentals, and how to apply safely. Never pay a deposit before you've seen a proper contract.",
  },
  {
    topic: "Before you fly",
    q: "What happens in the pre-departure briefing?",
    a: "We go through travel, documents to carry, money, arriving and registering at your university, and settling into life in a new country.",
    link: {
      label: "Pre-departure briefing",
      href: "/services/pre-departure-briefing",
    },
  },
];
