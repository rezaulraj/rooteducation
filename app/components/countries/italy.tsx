import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { hills } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#B5482A";

// A cypress tree, as on the Tuscan hills.
const cypress = (x: number, y: number, h: number) =>
  `M${x} ${y}C${x - h * 0.12} ${y - h * 0.3} ${x - h * 0.1} ${y - h * 0.75} ${x} ${y - h}C${x + h * 0.1} ${y - h * 0.75} ${x + h * 0.12} ${y - h * 0.3} ${x} ${y}Z`;

const hero: DestinationHeroConfig = {
  slug: "italy",
  country: "Italy",
  theme: "dark",
  background:
    "linear-gradient(180deg, #1E1018 0%, #3A1A22 40%, #6A2E28 72%, #A0522D 100%)",
  eyebrow: "Benvenuti in Italia",
  eyebrowLang: "it",
  name: "Italy",
  intro:
    "The world's oldest universities, low public tuition and generous regional grants, surrounded by art, history and food.",
  gradient: "linear-gradient(100deg, #FFF1DC 0%, #F6C88A 45%, #E9785A 100%)",
  accent: "#F6C88A",
  frame: ["#FFF1DC", "#E9785A"],
  shape: "romanArch",
  embroidery: {
    colors: ["#F6C88A", "#E9785A", "#9FCF8F"],
    motifs: ["flower", "rhombus"],
  },
  ornament: (
    <g>
      <path
        data-dh-draw
        d="M-30 236H230"
        stroke="#F6C88A"
        strokeWidth="2"
        pathLength={1}
        strokeDasharray="1"
      />
      <g transform="translate(100 -20)">
        <g data-dh-pop>
          <path d="M-10 6A10 10 0 0 1 10 6Z" fill="#F6C88A" />
          <path d="M0-10V-4" stroke="#F6C88A" strokeWidth="2" />
          <circle cy="-12" r="2.5" fill="#F6C88A" />
        </g>
      </g>
    </g>
  ),
  photo: {
    id: "1776377231754-d36928e6ee4d",
    aspect: 1.5,
    focus: [0.66, 0.45],
    alt: "Florence and the dome of its cathedral at sunrise",
  },
  glows: [
    {
      color: "rgba(246,200,138,0.35)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(233,120,90,0.3)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  land: (
    <>
      <g data-dh-land>
        <path d={hills(120, 30, 0.2, 2)} fill="#8E4A30" opacity="0.55" />
      </g>
      <g data-dh-land>
        <path d={hills(160, 22, 1.4, 2)} fill="#5E3A22" />
        {[90, 120, 150, 520, 545, 960, 990, 1015, 1300, 1330].map((x, i) => (
          <path
            key={x}
            d={cypress(x, 162 + ((i * 7) % 10), 60 + ((i * 11) % 20))}
            fill="#2E3A1E"
          />
        ))}
      </g>
      <g data-dh-land>
        <path d={hills(204, 8, 2.4, 4)} fill="#22120E" />
      </g>
    </>
  ),
  final: {
    line: "la dolce vita",
    copy: "Historic universities, affordable public tuition and generous grants, in the country of the Renaissance.",
    cta: "Plan my move to Italy",
    flag: ["#009246", "#FFFFFF", "#CE2B37"],
  },
  facts: [
    { label: "Capital", value: "Rome" },
    { label: "Currency", value: "Euro" },
    { label: "Language", value: "Italian" },
    { label: "In the EU", value: "Founding member" },
  ],
};

export const guide: GuideData = {
  country: "Italy",
  accent: ACCENT,
  accentDark: "#4A1A0E",
  intros: {
    why: "Study at historic universities, many with English-taught degrees, with low tuition and generous regional scholarships.",
    intakes:
      "Italian universities start in September or October, with a February intake for some programmes.",
    cost: "Typical yearly tuition for non-EU students, and what a month of student life costs in Italy.",
    jobs: "Students can work part-time, and graduates can stay on to look for work.",
    scholarships:
      "Regional DSU grants can cover tuition, a living allowance and housing for students with limited income.",
    apply:
      "Non-EU students pre-enrol through the Universitaly portal before applying for a visa.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Many documents need a Declaration of Value or CIMEA statement.",
    visa: "Non-EU students need a type D study visa, applied for after Universitaly pre-enrolment, then a residence permit (permesso di soggiorno).",
  },
  intakes: [
    {
      title: "Autumn intake",
      when: "Sep – Oct",
      months: [9, 10],
      main: true,
      copy: "The main intake for almost all bachelor's and master's programmes.",
      apply: "January – May (non-EU deadlines are early)",
    },
    {
      title: "Spring intake",
      when: "Feb – Mar",
      months: [2, 3],
      copy: "A small intake for some master's programmes.",
      apply: "September – November",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "Historic universities",
      copy: "Bologna, founded in 1088, is the world's oldest university, alongside Padua, Sapienza and Politecnico di Milano.",
    },
    {
      icon: "scholarship",
      title: "Low tuition and DSU grants",
      copy: "Public tuition is linked to family income, and regional grants can cover fees, housing and a stipend.",
    },
    {
      icon: "document",
      title: "English-taught degrees",
      copy: "Hundreds of English-taught bachelor's and master's programmes.",
    },
    {
      icon: "compass",
      title: "Design and engineering",
      copy: "World leaders in fashion, design, architecture and automotive engineering.",
    },
    {
      icon: "passport",
      title: "Stay after graduating",
      copy: "Graduates can convert their permit to look for work for up to 12 months.",
    },
    {
      icon: "plane",
      title: "Art, food and life",
      copy: "Renaissance art, world-famous food and the Mediterranean way of life.",
    },
  ],
  tuition: [
    { field: "Public university (income-based)", from: 900, to: 4000 },
    { field: "Polytechnics", from: 1000, to: 4000 },
    { field: "Private university", from: 6000, to: 20000 },
    { field: "Medicine (English-taught, public)", from: 1000, to: 4000 },
  ],
  living: {
    from: 800,
    to: 1300,
    items: [
      {
        item: "Accommodation",
        range: "€350–700",
        share: 50,
        note: "Shared flat; Milan costs most",
      },
      {
        item: "Food",
        range: "€200–300",
        share: 25,
        note: "University canteens (mense) are cheap",
      },
      { item: "Transport", range: "€20–40", share: 4, note: "Student passes" },
      {
        item: "Phone & bills",
        range: "€40–70",
        share: 6,
        note: "Mobile and utilities",
      },
      {
        item: "Other",
        range: "€150–200",
        share: 15,
        note: "Books, leisure, travel",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Students with a residence permit for study can work up to 20 hours a week (1,040 hours a year), as long as work doesn't affect their studies.",
    points: [
      [
        "Popular student jobs",
        "Hospitality, tourism, tutoring and university part-time jobs (collaborazioni).",
      ],
      [
        "In-demand fields",
        "Engineering, design, fashion, IT and life sciences.",
      ],
      [
        "After you graduate",
        "Convert your permit to look for work for up to 12 months.",
      ],
      ["Longer term", "With a job offer, switch to a work permit."],
    ],
  },
  scholarships: [
    {
      title: "Regional DSU scholarships",
      who: "Students with limited family income",
      covers: [
        "Tuition waiver",
        "Up to about €7,000 a year",
        "Housing and canteen meals",
      ],
      when: "Usually July – September each year",
    },
    {
      title: "Italian Government (MAECI) scholarships",
      who: "Selected nationalities",
      covers: ["Monthly allowance", "Tuition waiver"],
      when: "Usually spring",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: [
        "Merit awards and fee waivers",
        "E.g. Bocconi, Politecnico, Padua",
      ],
      when: "With your application",
    },
  ],
  applySteps: [
    {
      title: "Choose a programme",
      copy: "Choose a university and an English- or Italian-taught programme.",
    },
    {
      title: "Apply to the university",
      copy: "Apply through the university's portal; some programmes have entrance tests (such as IMAT for medicine).",
    },
    {
      title: "Pre-enrol on Universitaly",
      copy: "Submit your pre-enrolment on Universitaly, which the university validates.",
    },
    {
      title: "Get your qualifications assessed",
      copy: "Get a Declaration of Value or CIMEA statement for your qualifications.",
    },
    {
      title: "Apply for a study visa",
      copy: "Apply at the Italian consulate with your pre-enrolment summary, funds, insurance and accommodation.",
    },
    {
      title: "Arrive and apply for your permit",
      copy: "Apply for your permesso di soggiorno within 8 working days of arriving.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate after at least 12 years of schooling",
      "Declaration of Value or CIMEA statement",
      "English proficiency: usually IELTS 6.0–6.5 for English-taught programmes",
      "Italian (B2) for Italian-taught programmes",
      "Entrance tests for some programmes, such as IMAT for medicine",
    ],
    Master: [
      "Bachelor's degree in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5",
      "Motivation letter and CV",
      "GMAT/GRE for some business programmes",
    ],
  },
  documents: [
    "University application",
    "Universitaly pre-enrolment",
    "Passport copy",
    "Diplomas",
    "Transcripts",
    "Declaration of Value or CIMEA statement",
    "Language certificate",
    "Motivation letter",
    "CV",
    "Proof of funds",
    "Health insurance",
    "Proof of accommodation",
  ],
  visa: {
    stats: [
      ["Visa type", "Type D", "Study visa, after Universitaly pre-enrolment"],
      [
        "Funds to show",
        "~€7,000–10,000",
        "Per year; check the consulate's current amount",
      ],
      ["Work", "20 hrs/wk", "Up to 1,040 hours a year"],
    ],
    steps: [
      "Get your admission and complete Universitaly pre-enrolment.",
      "Prepare proof of funds, insurance and accommodation.",
      "Apply at the Italian consulate or visa centre.",
      "Travel to Italy once your visa is issued.",
      "Apply for your permesso di soggiorno within 8 working days.",
    ],
    documents: [
      "Passport",
      "Visa application form",
      "Universitaly summary",
      "Proof of funds",
      "Health insurance",
      "Proof of accommodation",
      "Return ticket or funds for it",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Italian government and student-guide information. Public tuition depends on family income and university, and visa, funds and work rules are set by the Italian authorities and updated each year. Always confirm current requirements with your university and the Italian consulate before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Rome",
    region: "Lazio",
    tagline:
      "The Eternal City, where ancient ruins, Renaissance art and modern life meet at every corner.",
    known: ["Archaeology", "Engineering", "Medicine", "Political science"],
    universities: [
      "Sapienza University of Rome",
      "Tor Vergata University",
      "LUISS Guido Carli",
    ],
    vibe: "Historic, grand and lively",
    src: u("1552832230-c0197dd311b5"),
    alt: "The Colosseum in Rome",
  },
  {
    name: "Milan",
    region: "Lombardy",
    tagline:
      "Italy's capital of business, fashion and design, home to world-famous universities and companies.",
    known: ["Design", "Engineering", "Business", "Fashion"],
    universities: [
      "Politecnico di Milano",
      "Bocconi University",
      "University of Milan",
    ],
    vibe: "Fast, stylish and full of careers",
    src: u("1610016302534-6f67f1c968d8"),
    alt: "The Duomo di Milano under an evening sky",
  },
  {
    name: "Bologna",
    region: "Emilia-Romagna",
    tagline:
      "Home to the world's oldest university, a city of red roofs, porticoes and Italy's best food.",
    known: ["Law", "Medicine", "Economics", "Humanities"],
    universities: ["University of Bologna"],
    vibe: "A true student city, lively and foodie",
    src: u("1477915737647-b5246ee6de6f"),
    alt: "Aerial view of Bologna's red rooftops",
  },
  {
    name: "Turin",
    region: "Piedmont",
    tagline:
      "An elegant city at the foot of the Alps, Italy's automotive capital and home to a top polytechnic.",
    known: ["Engineering", "Automotive", "Architecture", "Economics"],
    universities: ["Politecnico di Torino", "University of Turin"],
    vibe: "Elegant, affordable and close to the Alps",
    src: u("1610651219730-6b580d616e72"),
    alt: "Aerial view of Turin with the Mole Antonelliana and the Alps",
  },
];

export default function ItalyPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Italy" accent={ACCENT} cities={cities} />
    </>
  );
}
