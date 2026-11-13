import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2026 university, Australian government and student-guide sources) and vary by institution and year.
export const australia: GuideData = {
  country: "Australia",
  accent: "#3A3F9E",
  accentDark: "#1A1C4E",
  currency: "A$",
  intros: {
    why: "World-ranked universities, generous work rights and a post-study work visa, in a safe, sunny and multicultural country.",
    cost: "Typical yearly tuition for international students, and what a month of student life costs in Australia.",
    jobs: "A Student visa lets you work part-time during study periods and without a limit in scheduled breaks.",
    scholarships: "Government, regional and university scholarships help international students fund their degree.",
    apply: "From choosing a CRICOS-registered course to arriving in Australia, these are the steps.",
    admission: "Requirements vary by university and course. These are the usual ones for international applicants.",
    documents: "Prepare these for your application. Documents not in English need certified translations.",
    visa: "International students need a Student visa (subclass 500), applied for online once you have a Confirmation of Enrolment.",
  },
  reasons: [
    { icon: "university", title: "World-ranked universities", copy: "Several Australian universities are in the global top 50, including Melbourne, Sydney, UNSW and ANU." },
    { icon: "passport", title: "Post-study work", copy: "The Temporary Graduate visa lets graduates stay and work: 2 years after a bachelor's or master's, 3 after a PhD." },
    { icon: "scholarship", title: "Work while you study", copy: "Work up to 48 hours a fortnight during study periods, and unlimited hours in the breaks." },
    { icon: "document", title: "Strong student protection", copy: "The ESOS framework and CRICOS register protect the quality of courses and your fees." },
    { icon: "compass", title: "Liveable cities", copy: "Melbourne, Sydney, Brisbane and Perth regularly rank among the world's most liveable cities." },
    { icon: "plane", title: "Lifestyle and nature", copy: "Beaches, rainforests, the outback and the Great Barrier Reef, with a warm, outdoor way of life." },
  ],
  tuition: [
    { field: "Arts, business & humanities", from: 25000, to: 45000 },
    { field: "Science & engineering", from: 35000, to: 55000 },
    { field: "Master's (coursework)", from: 30000, to: 55000 },
    { field: "Medicine", from: 70000, to: 95000 },
  ],
  living: {
    from: 1800,
    to: 2800,
    items: [
      { item: "Accommodation", range: "A$900–1,600", share: 55, note: "Shared house or student housing; Sydney costs most" },
      { item: "Groceries", range: "A$350–550", share: 18, note: "Food and household items" },
      { item: "Transport", range: "A$120–220", share: 7, note: "Concession fares in some states" },
      { item: "Health cover (OSHC)", range: "A$60–80", share: 4, note: "Mandatory for your visa" },
      { item: "Phone & bills", range: "A$100–200", share: 6, note: "Often included in student housing" },
      { item: "Other", range: "A$200–300", share: 10, note: "Books, leisure, eating out" },
    ],
  },
  work: {
    big: "48",
    unit: "hrs / fortnight",
    copy: "Student visa holders can work up to 48 hours per fortnight while their course is in session, and unlimited hours during scheduled course breaks.",
    points: [
      ["Popular student jobs", "Hospitality, retail, tutoring, warehousing, aged care and campus jobs."],
      ["In-demand fields", "Healthcare, nursing, engineering, IT, teaching and construction."],
      ["Temporary Graduate visa", "2 years after a bachelor's or master's by coursework, 3 after a research degree; most applicants must be under 35."],
      ["Longer term", "Many graduates move on to skilled or employer-sponsored visas."],
    ],
  },
  scholarships: [
    {
      title: "Australia Awards",
      who: "Selected countries · mostly master's",
      covers: ["Full tuition fees", "Return air travel and living allowance", "Health cover (OSHC)"],
      when: "Rounds usually open in February and close around April",
    },
    {
      title: "Destination Australia",
      who: "Students at regional campuses",
      covers: ["Up to A$15,000 a year", "For certificate IV up to PhD"],
      when: "Through participating universities",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: ["Merit awards of 10%–50% off tuition", "Research Training Program (RTP) for PhDs"],
      when: "Often assessed automatically with your application",
    },
  ],
  applySteps: [
    { title: "Choose a course", copy: "Pick a CRICOS-registered course and university that fit your goals, grades and budget." },
    { title: "Apply to the university", copy: "Apply online directly or through an education agent, with your academic and English documents." },
    { title: "Receive your offer", copy: "You receive a conditional or full offer letter. Check the conditions carefully." },
    { title: "Accept and get your CoE", copy: "Accept, pay the deposit and buy Overseas Student Health Cover; the university issues your Confirmation of Enrolment (CoE)." },
    { title: "Apply for the Student visa", copy: "Apply online in ImmiAccount for subclass 500, showing you are a genuine student and have the funds required." },
    { title: "Health check and biometrics", copy: "Complete a health examination and give biometrics if asked." },
    { title: "Arrive and start", copy: "Fly to Australia (up to 90 days before your course starts), attend orientation and enrol." },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent) with the required scores",
      "A foundation year, for some school systems or lower results",
      "English proficiency: usually IELTS Academic 6.0–6.5 (no band below 6.0)",
      "Subject prerequisites, such as maths for engineering",
      "UCAT ANZ and an interview for medicine",
    ],
    Master: [
      "Bachelor's degree with a minimum average (often 65% or a credit average)",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 (no band below 6.0)",
      "Statement of purpose and CV",
      "Relevant work experience for some courses, such as an MBA",
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
    "Reference letters",
    "Confirmation of Enrolment (CoE)",
    "OSHC policy",
    "Proof of funds",
    "Certified translations",
  ],
  visa: {
    stats: [
      ["Visa fee", "A$2,500", "Subclass 500, from 1 July 2026"],
      ["Funds to show", "A$29,710", "Living costs for a year, plus tuition and travel"],
      ["Work", "48 hrs", "Per fortnight during study periods"],
    ],
    steps: [
      "Accept your offer, pay the deposit and get your CoE.",
      "Buy Overseas Student Health Cover for the length of your visa.",
      "Apply online in ImmiAccount and pay the visa fee.",
      "Answer the Genuine Student questions and upload your financial and English evidence.",
      "Complete your health check and biometrics, then wait for your decision.",
    ],
    documents: [
      "Passport",
      "Confirmation of Enrolment (CoE)",
      "OSHC policy",
      "Proof of funds",
      "English test results",
      "Genuine Student statement",
      "Health examination results",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2026 university, Australian government and student-guide information. Tuition varies widely by university and course, and visa fees, the funds you must show and work conditions are set by the Department of Home Affairs and change regularly. Always confirm current fees and requirements with your university and the Department of Home Affairs before applying. Our advisors can check the latest details for you.",
};

export default function AustraliaGuide() {
  return <CountryGuide data={australia} />;
}
