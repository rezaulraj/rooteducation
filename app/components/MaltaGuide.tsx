import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2025–26 university, government and student-guide sources) and vary by institution and year.
const malta: GuideData = {
  country: "Malta",
  accent: "#0A8A9C",
  accentDark: "#064A5C",
  intros: {
    why: "Study in English inside the EU, on a safe, sunny island with a long academic history and a fast-growing economy.",
    cost: "Typical yearly tuition for non-EU students at the University of Malta, and what a month of island life costs.",
    jobs: "Once your study residence permit and work authorisation are in place, you can work part-time alongside your studies.",
    scholarships: "Funding for non-EU students is limited and competitive, especially at bachelor's level, so plan your budget carefully.",
    apply: "From choosing a programme to arriving on the island, these are the steps for a non-EU student.",
    admission: "Requirements vary by course. These are the usual ones for international applicants.",
    documents: "Prepare these for your application. Documents not in English need certified translations.",
    visa: "Non-EU students on courses longer than 90 days need a national long-stay visa, then a study residence permit in Malta.",
  },
  reasons: [
    { icon: "document", title: "English is official", copy: "English is one of Malta's two official languages, so you study and live in English." },
    { icon: "university", title: "EU-recognised degrees", copy: "Malta has been in the EU since 2004, and its degrees are recognised across Europe." },
    { icon: "compass", title: "A historic university", copy: "The University of Malta traces its roots back to 1592, and has campuses in Msida, Valletta and Gozo." },
    { icon: "plane", title: "Schengen and central", copy: "A Schengen member in the middle of the Mediterranean, with short flights across Europe." },
    { icon: "scholarship", title: "Growing industries", copy: "Strong sectors include financial services, iGaming, tourism, healthcare and maritime." },
    { icon: "passport", title: "Safe and sunny", copy: "A small, friendly island with one of Europe's sunniest climates and free public buses." },
  ],
  tuition: [
    { field: "Arts & humanities", from: 8500, to: 8500 },
    { field: "Science & engineering", from: 10800, to: 10800 },
    { field: "Postgraduate (taught)", from: 10800, to: 18000 },
    { field: "Medicine & health", from: 14000, to: 16000 },
  ],
  living: {
    from: 700,
    to: 1200,
    items: [
      { item: "Accommodation", range: "€350–700", share: 50, note: "Shared flat; inland towns cost less" },
      { item: "Food", range: "€200–300", share: 25, note: "Groceries and eating out" },
      { item: "Health insurance", range: "€40–80", share: 7, note: "Mandatory for international students" },
      { item: "Transport", range: "€0–20", share: 3, note: "Buses are free with a personalised card" },
      { item: "Other", range: "€80–150", share: 15, note: "Phone, books, leisure" },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Non-EU students on full-time courses (MQF level 5 and above) can usually work up to 20 hours a week, after an initial period of around 13 weeks, with a Jobsplus employment licence.",
    points: [
      ["Popular student jobs", "Hospitality, retail, customer support, tutoring and tourism."],
      ["Growing sectors", "Financial services, iGaming, software, healthcare, aviation and maritime."],
      ["Work authorisation", "Your employer applies through Jobsplus, Malta's employment agency, before you start."],
      ["After you graduate", "With a job offer, you can apply to move from a study permit to a work permit."],
    ],
  },
  scholarships: [
    {
      title: "University of Malta postgraduate scholarships",
      who: "Non-EU students · Master by Research, PhD",
      covers: ["Tuition fee waivers of 40%–100%", "For research degrees", "Competitive, merit-based"],
      when: "Check the university's scholarships page each year",
    },
    {
      title: "Malta Government scholarships",
      who: "Selected nationalities and fields",
      covers: ["Some cover tuition and a living stipend", "Often for priority sectors", "Mostly postgraduate"],
      when: "Rounds and eligibility change, so ask an advisor",
    },
    {
      title: "Erasmus+ and college awards",
      who: "Enrolled students",
      covers: ["Exchange grants within Europe", "Some colleges offer their own scholarships"],
      when: "Through your institution's international office",
    },
  ],
  applySteps: [
    { title: "Choose a course", copy: "Pick a university or college and a programme that fits your goals, grades and budget." },
    { title: "Apply online", copy: "Apply through the institution's online portal and upload your documents." },
    { title: "Receive your offer", copy: "If accepted, you receive an offer letter. Accept it and pay any deposit required." },
    { title: "Prepare your finances", copy: "Arrange tuition payment and proof of funds, and book accommodation and health insurance." },
    { title: "Apply for the student visa", copy: "Apply for a national long-stay visa (Visa D) at the Maltese embassy or its visa centre." },
    { title: "Arrive and get your permit", copy: "Enrol, then apply for your study residence permit with Identità, Malta's agency for foreign nationals." },
    { title: "Work authorisation (optional)", copy: "If you plan to work, your employer applies for a Jobsplus employment licence." },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent)",
      "Grades in the subjects your course requires",
      "English proficiency: usually IELTS 6.0–6.5 or equivalent",
      "Some courses add an interview, test or portfolio",
      "Recognition of foreign qualifications, if requested",
    ],
    Master: [
      "Bachelor's degree in a related field, with good grades",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 or equivalent",
      "Personal statement and CV",
      "References, and a research proposal for research degrees",
    ],
  },
  documents: [
    "Completed online application",
    "Passport copy",
    "School / university certificates",
    "Academic transcripts",
    "English language certificate",
    "Personal statement",
    "CV (Master)",
    "Reference letters",
    "Certified translations of documents",
    "Passport-size photos",
    "Proof of application fee, if any",
    "Research proposal (research degrees)",
  ],
  visa: {
    stats: [
      ["Visa type", "Visa D", "National long-stay visa"],
      ["Visa fee", "~€100", "Plus a separate residence permit fee"],
      ["After arrival", "Study permit", "Issued by Identità in Malta"],
    ],
    steps: [
      "Accept your offer and arrange tuition and proof of funds.",
      "Book an appointment at the Maltese embassy or its visa centre (VFS Global in many countries).",
      "Submit your documents and pay the visa fee.",
      "Apply early: processing can take several weeks.",
      "Travel, enrol, and apply for your study residence permit with Identità.",
    ],
    documents: [
      "Letter of acceptance",
      "Proof of tuition payment",
      "Proof of sufficient funds",
      "Proof of accommodation",
      "Health insurance",
      "Passport and photos",
      "Police certificate, if requested",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, government and student-guide information. Tuition differs between the University of Malta, MCAST and private colleges, and the funds you must show for the visa is set by the Maltese authorities and changes over time. Always confirm current fees and requirements with your institution, Identità and the Maltese embassy before applying. Our advisors can check the latest details for you.",
};

export default function MaltaGuide() {
  return <CountryGuide data={malta} />;
}
