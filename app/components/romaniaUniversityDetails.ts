import type { UniversityDetails } from "./UniversityModal";

type Details = Omit<UniversityDetails, "name" | "short" | "city" | "type" | "logo" | "tone">;

// Indicative details from each university's published information and programme listings.
// Programmes, fees and deadlines change every year: keep this in step with the universities.
export const universityDetails: Record<string, Details> = {
  SH: {
    overview:
      "Spiru Haret is one of Romania's largest private universities, based in Bucharest with campuses in other cities including Constanța. International students can study selected programmes in English, or study in Romanian after a preparatory language year.",
    highlights: [
      "Private university headquartered in Bucharest",
      "English-taught Marketing (Bucharest) and Management (Constanța)",
      "Other programmes in Romanian, after a Romanian preparatory year",
      "A dedicated International Students Department",
    ],
    programmes: [
      { name: "Marketing", level: "Bachelor", years: 3, language: "English", campus: "Bucharest" },
      { name: "Management", level: "Bachelor", years: 3, language: "English", campus: "Constanța" },
    ],
    programmesNote:
      "Most other bachelor's and master's programmes are taught in Romanian. International students can join them after completing a one-year Romanian preparatory course.",
    eligibility: [
      {
        title: "Bachelor's",
        items: [
          "Secondary school-leaving certificate (HSC, A-levels or equivalent)",
          "Academic transcripts",
          "Proof of English for English-taught programmes, such as TOEFL or IELTS",
          "Documents in English, French or Romanian, with certified translations where needed",
        ],
      },
      {
        title: "For non-EU students",
        items: [
          "Letter of Acceptance to Studies from the Romanian Ministry of Education",
          "Valid passport",
          "Long-stay study visa (D/SD) before travelling",
          "Medical certificate",
        ],
      },
    ],
    fees: [
      { label: "Admission fee", value: "€120", note: "One-time, non-refundable" },
      { label: "Tuition", value: "Per year", note: "Set in the university's 2025–26 fee schedule, paid monthly over nine months" },
    ],
    intake: "One intake a year, starting in October. Applications are usually open from 1 April to 10 August.",
    apply: [
      "Choose your programme and campus with your Root Education advisor.",
      "Send your documents to the university's International Students Department.",
      "Pay the €120 admission fee.",
      "Receive your offer, then your Letter of Acceptance to Studies from the Ministry of Education.",
      "Pay first-year tuition and apply for your D/SD student visa.",
    ],
    sources: [
      { label: "International Students Department", href: "https://isd.spiruharet.ro/" },
      { label: "International relations office", href: "https://relatii-internationale.spiruharet.ro/en/home/" },
    ],
  },

  CMU: {
    overview:
      "Constanța Maritime University is a public university on Romania's Black Sea coast, specialising in the maritime industry. It trains navigation officers, marine engineers and port specialists, with teaching in Romanian and English.",
    highlights: [
      "Public university in Constanța, Romania's largest port",
      "Specialist maritime and engineering degrees",
      "Four-year engineering bachelor's degrees",
      "An English-taught international master's in Marine Engineering",
    ],
    programmes: [
      { name: "Navigation and Waterborne Transport", level: "Bachelor", years: 4, language: "English or Romanian" },
      { name: "Marine Engineering", level: "Bachelor", years: 4, language: "English or Romanian" },
      { name: "Electrical Engineering", level: "Bachelor", years: 4, language: "Romanian or English" },
      { name: "Marine Engineering (incl. offshore oil & gas)", level: "Master", years: 2, language: "English" },
    ],
    programmesNote: "Programme language can vary by intake. Check which programmes are running in English for your year before applying.",
    eligibility: [
      {
        title: "Bachelor's",
        items: [
          "Secondary school-leaving certificate (HSC, A-levels or equivalent)",
          "Academic transcripts, with good maths and physics",
          "Proof of English for English-taught programmes",
          "Applicants who don't meet the language requirement are not accepted",
        ],
      },
      {
        title: "Master's",
        items: [
          "Bachelor's degree in a related engineering or maritime field",
          "English certificate, or the university's own English proficiency test",
          "Bachelor's transcripts",
          "Letter of Acceptance to Studies and D/SD visa for non-EU students",
        ],
      },
    ],
    fees: [
      { label: "Bachelor's tuition", value: "~€3,000", note: "Per year, indicative" },
      { label: "Master's tuition", value: "~€3,500", note: "Per year, indicative" },
    ],
    intake: "October start. Registration for international applicants has typically run from April to the end of August.",
    apply: [
      "Pick your programme and check it runs in English for your intake.",
      "Register as an international applicant during the April–August window.",
      "Submit your documents and English certificate, or sit the university's English test.",
      "Receive your offer and Letter of Acceptance to Studies.",
      "Pay first-year tuition and apply for your D/SD student visa.",
    ],
    sources: [
      { label: "CMU international students", href: "https://cmu-edu.eu/en/home/international-students/" },
      { label: "Information for foreign applicants (PDF)", href: "https://cmu-edu.eu/en/wp-content/uploads/sites/7/2020/05/Useful-information-about-admission-for-foreign-applicants.pdf" },
    ],
  },

  RAU: {
    overview:
      "The Romanian-American University is a private university in Bucharest built on an American-style academic model. It has a strong focus on business and economics, and a sizeable share of its students study in English.",
    highlights: [
      "Private university in Bucharest",
      "American-style teaching model",
      "English-taught bachelor's and master's in business, economics and IT",
      "Around a quarter of students study in English-taught programmes",
    ],
    programmes: [
      { name: "International Business", level: "Bachelor", years: 3, language: "English" },
      { name: "Computer Science for Economics", level: "Bachelor", years: 3, language: "English" },
      { name: "International Business and Entrepreneurship", level: "Master", years: 2, language: "English" },
      { name: "International Economic Relations and Economic Diplomacy", level: "Master", years: 2, language: "English" },
      { name: "Strategic Marketing", level: "Master", years: 2, language: "English" },
      { name: "Business Management in Tourism and Aviation", level: "Master", years: 2, language: "English" },
    ],
    eligibility: [
      {
        title: "Bachelor's",
        items: ["Secondary school-leaving certificate and transcripts", "Proof of English skills", "An interview with the admissions staff"],
      },
      {
        title: "Master's",
        items: ["Bachelor's degree and transcripts", "Admission grade: (bachelor's final exam grade + essay grade) ÷ 2", "Proof of English skills"],
      },
    ],
    fees: [
      { label: "Bachelor's tuition", value: "~€3,400", note: "Per year, indicative" },
      { label: "Master's tuition", value: "~€3,600", note: "Per year, indicative" },
      { label: "Scholarships", value: "Available", note: "Ask about current merit awards" },
    ],
    intake: "October start. Ask your advisor for this year's application deadlines.",
    apply: [
      "Choose your programme with your Root Education advisor.",
      "Submit your application, transcripts and proof of English.",
      "Bachelor's: attend an admissions interview. Master's: submit your essay.",
      "Receive your offer and Letter of Acceptance to Studies.",
      "Pay first-year tuition and apply for your D/SD student visa.",
    ],
    sources: [
      { label: "Romanian-American University", href: "https://www.rau.ro/" },
      { label: "Romania Insider", href: "https://www.romania-insider.com/romanian-american-university-bucharest-international-community" },
    ],
  },
};
