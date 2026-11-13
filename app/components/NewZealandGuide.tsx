import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2026–27 university, Immigration New Zealand and student-guide sources) and vary by institution and year.
export const nz: GuideData = {
  country: "New Zealand",
  accent: "#1E7A6A",
  accentDark: "#0C3B33",
  currency: "NZ$",
  intros: {
    why: "Eight world-ranked universities, generous work rights and post-study work, in one of the safest countries on earth.",
    intakes: "New Zealand universities have two main intakes a year, in February–March and July, with a smaller one in November.",
    cost: "Typical yearly tuition for international students, and what a month of student life costs in New Zealand.",
    jobs: "A Student visa lets you work part-time in term and full-time in the holidays, with up to three years of post-study work after.",
    scholarships: "Government and university scholarships help international students, and PhD students pay domestic fees.",
    apply: "From choosing a programme to arriving in New Zealand, these are the steps for an international student.",
    admission: "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents: "Prepare these for your application. Documents not in English need certified translations.",
    visa: "International students need a fee-paying Student visa from Immigration New Zealand before they travel.",
  },
  intakes: [
    {
      title: "Semester 1",
      when: "Feb – Mar",
      months: [2, 3],
      main: true,
      copy: "The start of the academic year and the biggest intake. Almost every programme accepts new students, with the most course choice and scholarships.",
      apply: "October – November of the year before",
    },
    {
      title: "Semester 2",
      when: "July",
      months: [7],
      copy: "The mid-year intake. Most bachelor's and master's programmes also start in July, though some, such as medicine, do not.",
      apply: "April – May",
    },
    {
      title: "Summer school / Trimester 3",
      when: "November",
      months: [11],
      copy: "Some universities run a third trimester or summer school from mid-November, for selected courses and pathway programmes.",
      apply: "August – September",
    },
  ],
  reasons: [
    { icon: "university", title: "All 8 universities ranked", copy: "Every New Zealand university is in the world's top 3%, with a British-style system recognised worldwide." },
    { icon: "passport", title: "Post-study work", copy: "A Post-Study Work visa of up to 3 years after a bachelor's degree or higher, with no job offer needed." },
    { icon: "scholarship", title: "Work while you study", copy: "Work up to 25 hours a week in term, and full-time in the scheduled holidays." },
    { icon: "document", title: "PhD at domestic fees", copy: "International PhD students pay the same tuition as New Zealand students." },
    { icon: "compass", title: "Safe and welcoming", copy: "One of the world's most peaceful countries, with a friendly, multicultural society." },
    { icon: "plane", title: "Nature on your doorstep", copy: "Mountains, lakes, beaches and fiords, never more than a short drive away." },
  ],
  tuition: [
    { field: "Arts, business & humanities", from: 22000, to: 35000 },
    { field: "Science & engineering", from: 30000, to: 45000 },
    { field: "Postgraduate (taught)", from: 26000, to: 50000 },
    { field: "Medicine & health", from: 45000, to: 90000 },
  ],
  living: {
    from: 1667,
    to: 2500,
    items: [
      { item: "Accommodation", range: "NZ$900–1,500", share: 55, note: "Halls or a shared flat; Auckland costs most" },
      { item: "Food", range: "NZ$350–500", share: 20, note: "Groceries and eating out" },
      { item: "Transport", range: "NZ$80–200", share: 6, note: "Student discounts on buses" },
      { item: "Insurance", range: "NZ$50–70", share: 3, note: "Compulsory medical and travel insurance" },
      { item: "Phone & bills", range: "NZ$80–150", share: 6, note: "Often included in halls" },
      { item: "Other", range: "NZ$150–250", share: 10, note: "Books, outings, leisure" },
    ],
  },
  work: {
    big: "25",
    unit: "hrs/week",
    copy: "Since 3 November 2025, eligible students can work up to 25 hours a week during term, and full-time during scheduled holidays. Students on visas granted earlier can apply to vary their conditions.",
    points: [
      ["Popular student jobs", "Hospitality, retail, tourism, farming, tutoring and campus jobs."],
      ["In-demand fields", "Healthcare, engineering, IT, construction, teaching and agriculture."],
      ["Post-Study Work visa", "Up to 3 years after a bachelor's degree or higher studied in New Zealand."],
      ["Longer term", "Green List and skilled-migrant pathways can lead to residence."],
    ],
  },
  scholarships: [
    {
      title: "Manaaki New Zealand Scholarships",
      who: "Selected countries · undergraduate to PhD",
      covers: ["Full tuition fees", "Living allowance and travel", "Medical and travel insurance"],
      when: "Rounds and eligible countries change each year",
    },
    {
      title: "University international scholarships",
      who: "International students",
      covers: ["NZ$5,000–15,000 off tuition at most universities", "Merit awards for strong grades"],
      when: "Usually with or soon after your application",
    },
    {
      title: "PhD at domestic fees",
      who: "International doctoral students",
      covers: ["Pay domestic tuition, not international fees", "University doctoral scholarships with a stipend"],
      when: "Doctoral scholarship rounds run through the year",
    },
  ],
  applySteps: [
    { title: "Choose a programme", copy: "Pick a university and programme that fit your goals, grades and budget; see the 2027 intakes above." },
    { title: "Apply to the university", copy: "Apply online directly or through an education agent, with your academic and English documents." },
    { title: "Receive your offer", copy: "You receive an Offer of Place, which may be conditional on grades or English." },
    { title: "Apply for the Student visa", copy: "Apply online to Immigration New Zealand with your offer, funds, medical and police certificates." },
    { title: "Approval in principle and fees", copy: "Once approved in principle, pay your tuition fees and send the receipt to finalise your visa." },
    { title: "Arrive and enrol", copy: "Fly to New Zealand, attend international orientation and enrol in your courses." },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent) with the required grades",
      "A foundation programme, for some school systems",
      "English proficiency: usually IELTS Academic 6.0 (no band below 5.5)",
      "Subject prerequisites for some programmes",
      "Interviews or portfolios for some programmes, such as design and health",
    ],
    Master: [
      "Bachelor's degree with a B average or equivalent",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 (no band below 6.0)",
      "Statement of purpose and CV",
      "References, and a research proposal for research degrees",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "School / university certificates",
    "Academic transcripts",
    "English language certificate",
    "Statement of purpose",
    "CV (Master)",
    "References",
    "Offer of Place",
    "Proof of funds",
    "Medical and chest X-ray certificates",
    "Police certificate",
  ],
  visa: {
    stats: [
      ["Visa fee", "~NZ$850", "Fee-paying Student visa"],
      ["Funds to show", "NZ$20,000", "Living costs per year of study"],
      ["Work", "25 hrs/wk", "During term, full-time in holidays"],
    ],
    steps: [
      "Accept your Offer of Place from the university.",
      "Apply online to Immigration New Zealand and pay the fee.",
      "Provide medical and chest X-ray certificates and a police certificate if asked.",
      "Receive approval in principle, then pay your tuition fees.",
      "Get your visa, travel and enrol.",
    ],
    documents: [
      "Passport",
      "Offer of Place",
      "Evidence of tuition payment",
      "Proof of living funds",
      "Medical and chest X-ray certificates",
      "Police certificate",
      "Return travel or funds for it",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2026–27 university, Immigration New Zealand and student-guide information. Tuition varies by university and programme (medicine in particular), and visa fees, funds requirements and work conditions are set by Immigration New Zealand and change over time. Always confirm current fees and requirements with your university and Immigration New Zealand before applying. Our advisors can check the latest details for you.",
};

export default function NewZealandGuide() {
  return <CountryGuide data={nz} />;
}
