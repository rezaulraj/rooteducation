import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2025–27 university, government and student-guide sources) and vary by institution and year.
export const cyprus: GuideData = {
  country: "Cyprus",
  accent: "#B5541C",
  accentDark: "#5A2A0E",
  intros: {
    why: "English-taught degrees inside the EU, on a safe, sunny island where English is widely spoken.",
    cost: "Typical yearly tuition for non-EU students, and what a month of island life costs.",
    jobs: "With the right permit, non-EU students can work part-time in approved sectors alongside their studies.",
    scholarships: "Most funding comes as tuition discounts from the universities themselves, so apply early.",
    apply: "In Cyprus your university helps with the entry permit, so the steps are straightforward.",
    admission: "Requirements vary by university and course. These are the usual ones for international applicants.",
    documents: "Prepare these for your application. Documents not in English or Greek need certified translations.",
    visa: "Non-EU students need a student entry permit before travelling, then a temporary residence permit in Cyprus.",
  },
  reasons: [
    { icon: "document", title: "Taught in English", copy: "Most private universities teach fully in English, and English is widely spoken across the island." },
    { icon: "passport", title: "EU-recognised degrees", copy: "Cyprus has been in the EU since 2004, so its degrees are recognised across Europe." },
    { icon: "university", title: "UK-style education", copy: "The system follows British models closely, and several universities partner with UK institutions." },
    { icon: "scholarship", title: "Good value", copy: "Tuition and living costs are lower than in the UK and much of Western Europe." },
    { icon: "compass", title: "Safe and sunny", copy: "A friendly island with over 300 days of sunshine a year, beaches and mountains." },
    { icon: "plane", title: "Between three continents", copy: "Short flights to Europe, the Middle East and Africa, from Larnaca and Paphos airports." },
  ],
  tuition: [
    { field: "Public university (bachelor's)", from: 6834, to: 6834 },
    { field: "Private university (bachelor's)", from: 8500, to: 11000 },
    { field: "Master's programmes", from: 9000, to: 14000 },
    { field: "Medicine", from: 19000, to: 25000 },
  ],
  living: {
    from: 700,
    to: 1100,
    items: [
      { item: "Accommodation", range: "€350–600", share: 50, note: "Shared flat or dorm; Limassol costs most" },
      { item: "Food", range: "€200–300", share: 26, note: "Groceries and eating out" },
      { item: "Transport", range: "€20–40", share: 4, note: "Buses, with student discounts" },
      { item: "Health insurance", range: "€30–60", share: 6, note: "Required for your permit" },
      { item: "Other", range: "€80–150", share: 14, note: "Phone, books, leisure" },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Non-EU students can usually work up to 20 hours a week during term, in sectors approved by the Department of Labour, usually after about six months of residence. More hours are allowed in the holidays.",
    points: [
      ["Popular student jobs", "Hospitality, restaurants, retail, delivery and tourism, especially in summer."],
      ["Growing sectors", "Shipping, fintech, IT, tourism and professional services, with many firms in Limassol."],
      ["Work contract", "Your employment contract must be approved by the Department of Labour."],
      ["After you graduate", "With a job offer, you can apply to change from a student permit to a work permit."],
    ],
  },
  scholarships: [
    {
      title: "University scholarships",
      who: "New international students",
      covers: ["Tuition discounts based on your grades", "Early-application and sibling discounts at some universities"],
      when: "Ask when you apply; many are awarded with the offer",
    },
    {
      title: "Cyprus government schemes",
      who: "Selected countries · mostly postgraduate",
      covers: ["A small number of funded places", "Rounds and eligibility change each year"],
      when: "Check with an advisor or the Cyprus embassy",
    },
    {
      title: "Erasmus+",
      who: "Enrolled students",
      covers: ["Grants for an exchange semester in another EU country", "Traineeship grants"],
      when: "Through your university",
    },
  ],
  applySteps: [
    { title: "Choose a course", copy: "Pick a university and an English-taught programme that fits your goals, grades and budget." },
    { title: "Apply online", copy: "Apply through the university's portal and upload your documents." },
    { title: "Receive your offer", copy: "Accept your offer and pay the deposit, which is usually needed for the permit." },
    { title: "Entry permit", copy: "The university submits your student entry permit application to the Civil Registry and Migration Department." },
    { title: "Visa, if needed", copy: "If your nationality needs one, get an entry visa from the Cyprus embassy once the permit is approved." },
    { title: "Arrive and register", copy: "Enrol, complete the required medical tests, and apply for your temporary residence permit soon after arrival." },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent)",
      "Grades in the subjects your course requires",
      "English proficiency: IELTS 5.5–6.0 or the university's own English test",
      "Interview, for some courses",
      "Higher grades and science subjects for medicine",
    ],
    Master: [
      "Bachelor's degree in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.0–6.5 or equivalent",
      "Personal statement and CV",
      "Two reference letters",
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
    "Bank statement",
    "Police clearance certificate",
    "Passport-size photos",
    "Certified translations",
  ],
  visa: {
    stats: [
      ["Permit", "Entry permit", "Arranged through your university"],
      ["Fee", "~€70", "Entry permit; registration is extra"],
      ["Work", "20 hrs/wk", "During term, approved sectors"],
    ],
    steps: [
      "Accept your offer and pay the deposit.",
      "Send your documents to the university, which applies for your entry permit.",
      "Once approved, apply for an entry visa if your nationality needs one.",
      "Travel to Cyprus and enrol at your university.",
      "Do your medical tests and apply for a temporary residence permit within days of arriving.",
    ],
    documents: [
      "Letter of acceptance",
      "Proof of tuition payment",
      "Bank statement (proof of funds)",
      "Police clearance certificate",
      "Health insurance",
      "Medical test results",
      "Passport and photos",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–27 university, government and student-guide information. Tuition differs between public and private universities, and permit fees, working hours and the funds you must show are set by the Cyprus authorities and change over time. Always confirm current fees and requirements with your university and the Civil Registry and Migration Department before applying. Our advisors can check the latest details for you.",
};

export default function CyprusGuide() {
  return <CountryGuide data={cyprus} />;
}
