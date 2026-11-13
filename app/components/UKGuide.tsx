import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2026–27 university, UK government and UCAS sources) and vary by institution and year.
export const uk: GuideData = {
  country: "the UK",
  accent: "#22408F",
  accentDark: "#0E1B3D",
  currency: "£",
  intros: {
    why: "Globally respected degrees, shorter courses and a post-study work visa, in an English-speaking country.",
    cost: "Typical yearly tuition for international students, and the monthly living costs UK Visas and Immigration expects you to cover.",
    jobs: "A Student visa lets you work part-time during term, and the Graduate Route lets you stay and work after you finish.",
    scholarships: "Government, Commonwealth and university scholarships help international students fund their studies.",
    apply: "Undergraduates apply through UCAS; postgraduates usually apply directly to the university.",
    admission: "Requirements vary by university and course. These are the usual ones for international applicants.",
    documents: "Prepare these for your application. Documents not in English need certified translations.",
    visa: "International students on courses longer than six months need a Student visa, applied for online once you have a CAS.",
  },
  reasons: [
    { icon: "university", title: "World-ranked universities", copy: "Oxford, Cambridge, Imperial and UCL are among the world's top 10, with many more in the top 100." },
    { icon: "compass", title: "Shorter degrees", copy: "Most bachelor's degrees take three years (four in Scotland) and most master's just one, saving time and money." },
    { icon: "passport", title: "Graduate Route", copy: "Stay and work after graduating: 2 years, or 18 months for applications from January 2027, and 3 years after a PhD." },
    { icon: "document", title: "Study in English", copy: "Learn and live in English, the language of global business, science and research." },
    { icon: "scholarship", title: "Scholarships", copy: "Chevening, Commonwealth and GREAT scholarships, plus thousands of university awards." },
    { icon: "plane", title: "Diverse student life", copy: "Hundreds of thousands of international students, in cities linked by fast trains and short flights to Europe." },
  ],
  tuition: [
    { field: "Arts, business & humanities", from: 15000, to: 26000 },
    { field: "Science & engineering", from: 18000, to: 38000 },
    { field: "Master's (taught)", from: 16000, to: 40000 },
    { field: "Medicine", from: 45000, to: 70000 },
  ],
  living: {
    from: 1171,
    to: 1529,
    items: [
      { item: "Accommodation", range: "£600–1,000", share: 55, note: "Halls or a shared house; London costs most" },
      { item: "Food", range: "£200–300", share: 19, note: "Groceries and eating out" },
      { item: "Transport", range: "£50–120", share: 6, note: "Student travel cards and railcards" },
      { item: "Phone & bills", range: "£60–120", share: 7, note: "Often included in halls" },
      { item: "Other", range: "£100–200", share: 13, note: "Books, clothes, leisure" },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Students on a degree-level course can work up to 20 hours a week during term, and full-time in the official vacations. After graduating, the Graduate Route lets you stay and work without a job offer.",
    points: [
      ["Popular student jobs", "Retail, hospitality, campus jobs, tutoring and student ambassador roles."],
      ["Growing sectors", "Finance, technology, healthcare, engineering, data and the creative industries."],
      ["Graduate Route", "2 years after a bachelor's or master's (18 months for applications from 1 January 2027); 3 years after a PhD."],
      ["Longer term", "With a qualifying job offer, you can switch to a Skilled Worker visa."],
    ],
  },
  scholarships: [
    {
      title: "Chevening Scholarships",
      who: "Future leaders · one-year master's",
      covers: ["Full tuition fees", "Monthly living allowance", "Return flights and visa costs"],
      when: "Applications usually open in August and close in early November",
    },
    {
      title: "Commonwealth Scholarships",
      who: "Commonwealth countries · Master's and PhD",
      covers: ["Tuition fees and living allowance", "Travel to and from the UK"],
      when: "Applications usually open in the autumn",
    },
    {
      title: "GREAT and university scholarships",
      who: "International students",
      covers: ["GREAT: at least £10,000 towards a one-year master's", "University awards from about £2,000 to full fees"],
      when: "Usually with or soon after your university application",
    },
  ],
  applySteps: [
    { title: "Choose a course", copy: "Pick universities and courses that fit your goals, grades and budget." },
    { title: "Apply through UCAS or directly", copy: "Undergraduates apply through UCAS (up to five choices); postgraduates apply directly to each university." },
    { title: "Meet the deadline", copy: "For 2027 entry, UCAS's main deadline is 13 January 2027; Oxford, Cambridge and most medicine closed on 15 October 2026." },
    { title: "Receive your offer", copy: "Offers are conditional (you still need to meet grades) or unconditional. Accept your firm choice." },
    { title: "Pay the deposit and get your CAS", copy: "Your university issues a Confirmation of Acceptance for Studies (CAS), which you need for the visa." },
    { title: "Apply for the Student visa", copy: "Apply online, pay the visa fee and health surcharge, give biometrics, and take a TB test if your country requires one." },
    { title: "Arrive and enrol", copy: "Travel, enrol at your university and access your eVisa through your UKVI account." },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent) with the required grades",
      "A foundation year, for some 12-year school systems",
      "English proficiency: usually IELTS for UKVI 6.0–6.5",
      "Personal statement and an academic reference",
      "Admissions tests or interviews for some courses (e.g. medicine, Oxford and Cambridge)",
    ],
    Master: [
      "Bachelor's degree equivalent to a UK 2:1 or 2:2, depending on the university",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 or equivalent",
      "Statement of purpose and CV",
      "One or two academic or professional references",
    ],
  },
  documents: [
    "Online application (UCAS or university)",
    "Passport copy",
    "School / university certificates",
    "Academic transcripts",
    "English language certificate",
    "Personal statement",
    "CV (Master)",
    "References",
    "CAS from your university",
    "Proof of funds (28-day bank statement)",
    "TB test certificate, if required",
    "Certified translations",
  ],
  visa: {
    stats: [
      ["Visa fee", "£558", "Student visa, applying from outside the UK"],
      ["Health surcharge", "£776/yr", "Immigration Health Surcharge, paid upfront"],
      ["Funds to show", "£1,171–1,529", "Per month for up to 9 months, outside / in London"],
    ],
    steps: [
      "Accept your offer, pay the deposit and receive your CAS.",
      "Hold the required funds in your account for 28 consecutive days.",
      "Apply online up to 6 months before your course starts, and pay the fee and health surcharge.",
      "Give your biometrics at a visa application centre, and take a TB test if required.",
      "Get your decision, usually within about 3 weeks, then travel and access your eVisa.",
    ],
    documents: [
      "Passport",
      "CAS number",
      "Proof of funds",
      "English language certificate",
      "TB test certificate, if required",
      "ATAS certificate, for some science subjects",
      "Academic documents listed on your CAS",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2026–27 university, UK government and UCAS information. Tuition varies widely by university and course, and visa fees, the health surcharge and the funds you must show are set by the UK government and change regularly (the funds required are due to rise from 30 November 2026). Always confirm current fees and requirements with your university and GOV.UK before applying. Our advisors can check the latest details for you.",
};

export default function UKGuide() {
  return <CountryGuide data={uk} />;
}
