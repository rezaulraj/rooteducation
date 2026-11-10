import CountryGuide, { type GuideData } from "./CountryGuide";

// Figures are indicative (2025–26 sources) and vary by university and year.
const romania: GuideData = {
  country: "Romania",
  accent: "#B3132B",
  accentDark: "#7A0C1C",
  intros: {
    why: "An EU education at a fraction of the usual cost, with English-taught degrees and a long tradition in medicine and engineering.",
    cost: "Typical yearly tuition for non-EU students in English-taught programmes, and what a month of student life costs.",
    jobs: "With a student residence permit you can work part-time alongside your studies, and Romania's growing economy offers options after graduation.",
    scholarships: "Funding is available, but the main government scheme is competitive and has an early deadline, so plan ahead.",
    apply: "From choosing a programme to arriving on campus, these are the steps for a non-EU student.",
    admission: "Entry requirements vary by university and programme. These are the usual ones for international students.",
    documents: "Prepare these for your university application. Documents not in English or Romanian need certified translations.",
    visa: "Non-EU students need a long-stay visa for studies, then a residence permit after arriving in Romania.",
  },
  reasons: [
    { icon: "university", title: "EU-recognised degrees", copy: "Romania is in the EU, so its degrees are recognised across Europe and widely beyond." },
    { icon: "document", title: "Taught in English", copy: "Hundreds of programmes in English, including medicine, dentistry, engineering and business." },
    { icon: "scholarship", title: "Affordable fees", copy: "Tuition and living costs are among the lowest in the European Union." },
    { icon: "compass", title: "Strong in medicine", copy: "Long-established medical universities in Bucharest, Cluj-Napoca, Iași and Timișoara." },
    { icon: "plane", title: "Schengen member", copy: "A full Schengen member since January 2025, making travel around Europe simpler." },
    { icon: "passport", title: "Safe and welcoming", copy: "Lively student cities, a low cost of living and a large international student community." },
  ],
  tuition: [
    { field: "Medicine & dentistry", from: 7500, to: 10000 },
    { field: "Pharmacy", from: 6000, to: 9000 },
    { field: "Engineering & IT", from: 2700, to: 4500 },
    { field: "Business & economics", from: 2500, to: 4000 },
    { field: "Humanities & social sciences", from: 2000, to: 3500 },
  ],
  living: {
    from: 400,
    to: 700,
    items: [
      { item: "Accommodation", range: "€100–450", share: 40, note: "University dorm or shared flat" },
      { item: "Food", range: "€150–250", share: 30, note: "Groceries and eating out" },
      { item: "Transport", range: "€10–25", share: 5, note: "Student discounts on city transport" },
      { item: "Phone & internet", range: "€10–20", share: 5, note: "Fast, cheap mobile data" },
      { item: "Other", range: "€50–120", share: 20, note: "Books, leisure, health" },
    ],
  },
  work: {
    big: "4",
    unit: "hrs/day",
    copy: "Non-EU students with a valid study residence permit can work up to four hours a day without a separate work permit.",
    points: [
      ["Popular student jobs", "IT support, call centres, tutoring, hospitality and delivery."],
      ["Growing sectors", "IT and software, outsourcing, engineering, healthcare and shared services."],
      ["Internships", "Many programmes include placements, especially in medicine and engineering."],
      ["After you graduate", "With a job offer, you can apply to switch your residence permit from study to work."],
    ],
  },
  scholarships: [
    {
      title: "Romanian Government scholarship",
      who: "Non-EU students · Bachelor, Master, PhD",
      covers: ["Tuition fee waiver", "Monthly stipend", "Visa fee waived", "Dorm place, subject to availability"],
      when: "Call usually opens in January, closing around March",
    },
    {
      title: "University merit scholarships",
      who: "Enrolled students, by results",
      covers: ["Fee reductions or stipends", "Awarded each semester", "Based on grades and activity"],
      when: "Ask each university after enrolment",
    },
    {
      title: "Erasmus+ mobility grants",
      who: "Students already enrolled in Romania",
      covers: ["Study or train in another EU country", "Monthly grant for the exchange"],
      when: "Through your university's international office",
    },
  ],
  applySteps: [
    { title: "Choose a programme", copy: "Pick a university, programme and language of study that suit your goals and budget." },
    { title: "Apply to the university", copy: "Submit your application and documents, usually online, and pay any application fee." },
    { title: "Receive your offer", copy: "If accepted, the university sends your file to the Ministry of Education." },
    { title: "Letter of Acceptance to Studies", copy: "Non-EU students receive this official letter from the Ministry. It is needed for the visa." },
    { title: "Pay first-year tuition", copy: "One year's tuition is normally paid in advance, as the embassy asks for proof." },
    { title: "Apply for the student visa", copy: "Apply for the long-stay study visa (D/SD) at the Romanian embassy or consulate." },
    { title: "Arrive and register", copy: "Enrol at your university and apply for a residence permit before your visa expires." },
  ],
  admission: {
    Bachelor: [
      "Upper secondary school-leaving certificate (HSC / A-levels or equivalent)",
      "Academic transcripts with good grades",
      "English proficiency: IELTS around 5.5–6.0, TOEFL, or the university's own test",
      "For medicine: strong biology and chemistry, and often an exam or interview",
      "Recognition of your diploma by the Romanian authorities",
    ],
    Master: ["Bachelor's degree in a related field", "Bachelor's transcripts", "English proficiency: IELTS around 6.0 or equivalent", "Motivation letter and CV", "Sometimes an interview or portfolio"],
  },
  documents: [
    "Completed application form",
    "Passport copy (valid for the whole stay)",
    "Birth certificate",
    "School / university diplomas",
    "Academic transcripts",
    "Certified translations of documents",
    "Legalisation or apostille of diplomas",
    "English language certificate",
    "Medical certificate",
    "Passport-size photos",
    "CV and motivation letter (Master)",
    "Proof of application fee payment",
  ],
  visa: {
    stats: [
      ["Visa type", "D/SD", "Long-stay visa for studies"],
      ["Visa fee", "€120", "Waived for government scholarship holders"],
      ["After arrival", "Residence permit", "Apply before your visa expires"],
    ],
    steps: [
      "Get your Letter of Acceptance to Studies and pay first-year tuition.",
      "Apply online through Romania's e-Visa portal and book an appointment.",
      "Submit your documents and pay the fee at the Romanian embassy or consulate.",
      "Attend an interview if asked. Processing usually takes several weeks.",
      "Travel, enrol, and apply for your residence permit at the Immigration Inspectorate.",
    ],
    documents: [
      "Letter of Acceptance to Studies",
      "Proof of one year's tuition paid",
      "Proof of funds for living costs",
      "Proof of accommodation",
      "Health insurance",
      "Criminal record certificate",
      "Passport and photos",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university and government information, and change from year to year. Always confirm current fees, funds requirements and deadlines with your university and the Romanian embassy or consulate before applying. Our advisors can check the latest details for you.",
};

export default function RomaniaGuide() {
  return <CountryGuide data={romania} />;
}
