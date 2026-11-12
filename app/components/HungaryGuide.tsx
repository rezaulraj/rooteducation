import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2025–26 university, government and student-guide sources) and vary by institution and year.
const hungary: GuideData = {
  country: "Hungary",
  accent: "#2E7D4F",
  accentDark: "#163E28",
  intros: {
    why: "World-known medical schools, hundreds of English-taught programmes and an affordable life in the heart of Europe.",
    cost: "Typical yearly tuition for English-taught programmes, and what a month of student life costs in Hungary.",
    jobs: "A study residence permit lets you work part-time during term and full-time in the breaks.",
    scholarships: "Hungary runs one of Europe's best-known government scholarships for international students.",
    apply: "From choosing a programme to arriving in Hungary, these are the steps for a non-EU student.",
    admission: "Requirements vary by university and course. These are the usual ones for international applicants.",
    documents: "Prepare these for your application. Documents not in English or Hungarian need certified translations.",
    visa: "Non-EU students need a residence permit for the purpose of study, applied for before travelling.",
  },
  reasons: [
    { icon: "university", title: "Renowned medical schools", copy: "Semmelweis, Debrecen, Szeged and Pécs have taught medicine in English to international students for decades." },
    { icon: "document", title: "English-taught degrees", copy: "Hundreds of bachelor's, master's and doctoral programmes are taught fully in English." },
    { icon: "scholarship", title: "Affordable fees", copy: "Tuition and living costs are lower than in most of Western Europe." },
    { icon: "passport", title: "EU and Schengen", copy: "Hungary has been in the EU since 2004, and its degrees are recognised across Europe." },
    { icon: "plane", title: "Central location", copy: "Vienna is under three hours from Budapest by train, with cheap flights across Europe." },
    { icon: "compass", title: "Historic universities", copy: "Higher education here goes back to 1367, when the University of Pécs was founded." },
  ],
  tuition: [
    { field: "Business & economics", from: 3500, to: 7000 },
    { field: "Engineering & IT", from: 4000, to: 8000 },
    { field: "Master's programmes", from: 4000, to: 9000 },
    { field: "Medicine & dentistry", from: 15000, to: 18500 },
  ],
  living: {
    from: 500,
    to: 850,
    items: [
      { item: "Accommodation", range: "€250–450", share: 48, note: "Dorm or shared flat; Budapest costs more" },
      { item: "Food", range: "€150–250", share: 28, note: "Groceries and canteens" },
      { item: "Transport", range: "€10–25", share: 3, note: "Discounted student passes" },
      { item: "Health insurance", range: "€0–40", share: 5, note: "Sometimes included in tuition" },
      { item: "Other", range: "€60–120", share: 16, note: "Phone, books, leisure" },
    ],
  },
  work: {
    big: "30",
    unit: "hrs/week",
    copy: "With a residence permit for study, non-EU students can work up to 30 hours a week during term, and full-time for up to 90 days (66 working days) a year outside term.",
    points: [
      ["Popular student jobs", "Customer service, hospitality, tutoring and multilingual support roles."],
      ["Growing sectors", "Shared service centres, IT, automotive, pharmaceuticals and logistics."],
      ["Language skills", "Many international companies in Budapest hire for English and other languages."],
      ["After you graduate", "You can apply for a permit to look for work or start a business after graduating."],
    ],
  },
  scholarships: [
    {
      title: "Stipendium Hungaricum",
      who: "Students from partner countries · Bachelor, Master, PhD",
      covers: ["Full tuition waiver", "Monthly stipend (HUF 43,700 for bachelor's and master's)", "Accommodation support and health insurance"],
      when: "Applications usually open in November and close in mid-January",
    },
    {
      title: "University scholarships",
      who: "Self-funded international students",
      covers: ["Tuition fee discounts for strong results", "Merit awards after your first year"],
      when: "Through each university's international office",
    },
    {
      title: "Erasmus+",
      who: "Enrolled students",
      covers: ["Grants for an exchange semester in another EU country", "Traineeship grants"],
      when: "Through your university, usually a year ahead",
    },
  ],
  applySteps: [
    { title: "Choose a course", copy: "Pick a university and an English-taught programme that fits your goals, grades and budget." },
    { title: "Apply online", copy: "Apply through the university's portal (or the Stipendium Hungaricum portal) and upload your documents." },
    { title: "Entrance exam or interview", copy: "Many courses, including all medical ones, hold an online entrance exam or interview." },
    { title: "Receive your acceptance", copy: "Accept your offer and pay the deposit or first tuition instalment." },
    { title: "Apply for the residence permit", copy: "Apply at the Hungarian embassy or consulate with your acceptance letter, proof of funds and accommodation." },
    { title: "Arrive and register", copy: "Collect your residence permit card in Hungary, register your address and enrol at the university." },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent)",
      "Grades in the subjects your course requires (biology and chemistry for medicine)",
      "English proficiency: IELTS 5.5–6.0 or the university's own English test",
      "Passing the entrance exam or interview",
      "Medical certificate, for some courses",
    ],
    Master: [
      "Bachelor's degree in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.0–6.5 or equivalent",
      "Motivation letter and CV",
      "References, and an interview for some courses",
    ],
  },
  documents: [
    "Completed online application",
    "Passport copy",
    "School / university certificates",
    "Academic transcripts",
    "English language certificate",
    "Motivation letter",
    "CV (Master)",
    "Reference letters",
    "Medical certificate",
    "Certified translations",
    "Passport-size photo",
    "Application fee receipt",
  ],
  visa: {
    stats: [
      ["Permit type", "Study permit", "Residence permit for the purpose of study"],
      ["Fee", "~€110", "Procedure fee when applying abroad"],
      ["Work allowed", "30 hrs/wk", "During term, full-time in the breaks"],
    ],
    steps: [
      "Accept your offer and arrange tuition and proof of funds.",
      "Book an appointment at the Hungarian embassy or consulate.",
      "Submit your application, documents and biometrics, and pay the fee.",
      "Apply early: processing can take several weeks.",
      "Travel, collect your residence permit card and register your address.",
    ],
    documents: [
      "Letter of acceptance",
      "Proof of tuition payment",
      "Proof of sufficient funds",
      "Proof of accommodation",
      "Health insurance",
      "Passport and photo",
      "Completed application form",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, government and student-guide information. Tuition differs by university and programme, and the residence permit fee and funds you must show are set by the Hungarian authorities and change over time. Always confirm current fees and requirements with your university, the National Directorate-General for Aliens Policing and the Hungarian embassy before applying. Our advisors can check the latest details for you.",
};

export default function HungaryGuide() {
  return <CountryGuide data={hungary} />;
}
