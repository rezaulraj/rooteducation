// Key facts for each test, checked against the official test-maker websites in November 2026.
// Tests change their formats from time to time: re-check the official links before relying on a detail.

export type Test = {
  key: string;
  name: string;
  full: string;
  kind: "English" | "Admissions";
  tint: string;
  tagline: string;
  duration: string;
  scale: string;
  results: string;
  validity: string;
  mode: string;
  sections: { name: string; time: string; minutes: number }[];
  goodFor: string;
  official: { label: string; href: string };
};

export const TESTS: Test[] = [
  {
    key: "ielts",
    name: "IELTS",
    full: "IELTS Academic",
    kind: "English",
    tint: "#C8102E",
    tagline:
      "The most widely accepted English test for study in the UK, Ireland, Australia, New Zealand and Canada.",
    duration: "2 h 45 min + Speaking",
    scale: "Band 0–9",
    results: "3–5 days on computer",
    validity: "2 years (recommended)",
    mode: "Paper or computer, Speaking face to face",
    sections: [
      { name: "Listening", time: "30 min", minutes: 30 },
      { name: "Reading", time: "60 min", minutes: 60 },
      { name: "Writing", time: "60 min", minutes: 60 },
      { name: "Speaking", time: "11–14 min", minutes: 13 },
    ],
    goodFor:
      "Students who prefer speaking to a real examiner and applying to UK or Commonwealth universities.",
    official: { label: "ielts.org", href: "https://ielts.org" },
  },
  {
    key: "pte",
    name: "PTE",
    full: "PTE Academic",
    kind: "English",
    tint: "#0A6BB5",
    tagline:
      "A fully computer-based English test, scored by AI, with fast results.",
    duration: "About 2 hours",
    scale: "10–90",
    results: "Typically within 48 hours",
    validity: "2 years",
    mode: "Computer at a test centre",
    sections: [
      { name: "Speaking & Writing", time: "≈ 60 min", minutes: 60 },
      { name: "Reading", time: "≈ 30 min", minutes: 30 },
      { name: "Listening", time: "≈ 35 min", minutes: 35 },
    ],
    goodFor:
      "Students who are comfortable on a computer and need results quickly, especially for Australia and the UK.",
    official: { label: "pearsonpte.com", href: "https://www.pearsonpte.com" },
  },
  {
    key: "toefl",
    name: "TOEFL",
    full: "TOEFL iBT",
    kind: "English",
    tint: "#1B3F8F",
    tagline:
      "The ETS English test, popular with universities in the USA and Canada. Updated in January 2026.",
    duration: "Under 2 hours",
    scale: "1–6 (new) · 0–120 shown until 2028",
    results: "About 4–8 days",
    validity: "2 years",
    mode: "Test centre or at home",
    sections: [
      { name: "Reading", time: "Adaptive", minutes: 30 },
      { name: "Listening", time: "Adaptive", minutes: 29 },
      { name: "Writing", time: "Short tasks", minutes: 23 },
      { name: "Speaking", time: "Short tasks", minutes: 8 },
    ],
    goodFor: "Students applying mainly to American and Canadian universities.",
    official: {
      label: "ets.org/toefl",
      href: "https://www.ets.org/toefl.html",
    },
  },
  {
    key: "det",
    name: "Duolingo",
    full: "Duolingo English Test",
    kind: "English",
    tint: "#58A700",
    tagline:
      "An adaptive English test you take online from home, accepted by thousands of programmes.",
    duration: "About 1 hour",
    scale: "10–160",
    results: "Within 2 days",
    validity: "2 years",
    mode: "Online, at home",
    sections: [
      { name: "Setup & ID check", time: "5 min", minutes: 5 },
      { name: "Adaptive test", time: "45 min", minutes: 45 },
      { name: "Writing & speaking samples", time: "10 min", minutes: 10 },
    ],
    goodFor:
      "Students who want a lower-cost test from home. Check each university and visa route accepts it.",
    official: {
      label: "englishtest.duolingo.com",
      href: "https://englishtest.duolingo.com",
    },
  },
  {
    key: "sat",
    name: "SAT",
    full: "Digital SAT",
    kind: "Admissions",
    tint: "#00648A",
    tagline:
      "The College Board admissions test used by many US universities for undergraduate entry.",
    duration: "2 h 14 min",
    scale: "400–1600",
    results: "Online, usually within weeks",
    validity: "Set by each university",
    mode: "Digital, at a test centre",
    sections: [
      { name: "Reading & Writing", time: "64 min (2 modules)", minutes: 64 },
      { name: "Math", time: "70 min (2 modules)", minutes: 70 },
    ],
    goodFor:
      "Bachelor's applicants to US universities, and some scholarship programmes.",
    official: {
      label: "satsuite.collegeboard.org",
      href: "https://satsuite.collegeboard.org",
    },
  },
  {
    key: "gre",
    name: "GRE",
    full: "GRE General Test",
    kind: "Admissions",
    tint: "#4B2C83",
    tagline:
      "The ETS graduate admissions test, accepted for many master's and PhD programmes.",
    duration: "1 h 58 min",
    scale: "130–170 per section · Writing 0–6",
    results: "About 8–10 days",
    validity: "5 years",
    mode: "Test centre or at home",
    sections: [
      { name: "Analytical Writing", time: "30 min", minutes: 30 },
      { name: "Verbal Reasoning", time: "41 min (2 sections)", minutes: 41 },
      {
        name: "Quantitative Reasoning",
        time: "47 min (2 sections)",
        minutes: 47,
      },
    ],
    goodFor:
      "Master's and PhD applicants, especially in science, engineering and the USA.",
    official: { label: "ets.org/gre", href: "https://www.ets.org/gre.html" },
  },
  {
    key: "gmat",
    name: "GMAT",
    full: "GMAT Focus Edition",
    kind: "Admissions",
    tint: "#B5303A",
    tagline:
      "The business school admissions test, for MBA and business master's programmes.",
    duration: "2 h 15 min",
    scale: "205–805",
    results: "Official score within days",
    validity: "5 years",
    mode: "Test centre or online",
    sections: [
      { name: "Quantitative Reasoning", time: "45 min", minutes: 45 },
      { name: "Verbal Reasoning", time: "45 min", minutes: 45 },
      { name: "Data Insights", time: "45 min", minutes: 45 },
    ],
    goodFor: "MBA and business master's applicants worldwide.",
    official: { label: "mba.com", href: "https://www.mba.com" },
  },
];

/** Common entry levels: a general guide only. Every university and course sets its own requirement. */
export const TYPICAL = [
  {
    level: "Foundation / pathway",
    ielts: "5.0–5.5",
    pte: "42–50",
    det: "90–100",
  },
  { level: "Bachelor's", ielts: "6.0–6.5", pte: "54–62", det: "105–115" },
  { level: "Master's", ielts: "6.5–7.0", pte: "58–65", det: "110–125" },
  {
    level: "Top-ranked / competitive",
    ielts: "7.0–7.5",
    pte: "65–73",
    det: "125–135",
  },
];

export const FAQS = [
  {
    q: "Which English test should I take?",
    a: "The one your universities and visa route accept, in the format you perform best in. Check each programme's entry requirements first; our counsellors can confirm this for your shortlist.",
  },
  {
    q: "How long should I prepare?",
    a: "Most students need four to eight weeks of focused practice, depending on their starting level and target score. A diagnostic test on day one tells us exactly where to focus.",
  },
  {
    q: "Can I retake a test?",
    a: "Yes. All of these tests can be retaken. Leave enough time before your application deadlines in case you need a second attempt.",
  },
  {
    q: "Do I always need an English test?",
    a: "Not always. Some universities waive it if you studied in English or are from certain countries, but visa rules may still require one. Ask us before you book.",
  },
];
