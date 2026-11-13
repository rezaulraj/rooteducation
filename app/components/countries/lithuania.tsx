import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { hills, pines } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#0E7A4E";

const hero: DestinationHeroConfig = {
  slug: "lithuania",
  country: "Lithuania",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0A1F17 0%, #0F3424 45%, #164A30 75%, #2A5C2E 100%)",
  eyebrow: "Sveiki atvykę",
  eyebrowLang: "lt",
  name: "Lithuania",
  intro:
    "Affordable, English-taught EU degrees, a fast-growing tech scene and a beautiful baroque capital on the Baltic.",
  gradient: "linear-gradient(100deg, #FFF3C4 0%, #FDB913 45%, #F06A4A 100%)",
  accent: "#FDB913",
  frame: ["#FFF3C4", "#C1272D"],
  shape: "shield",
  embroidery: {
    colors: ["#FDB913", "#E8473F", "#7FD6A0"],
    motifs: ["rhombus", "tree", "star"],
  },
  photo: {
    id: "1549891472-991e6bc75d1e",
    aspect: 1.51,
    focus: [0.62, 0.45],
    alt: "A hot-air balloon over Vilnius Old Town and the city beyond",
  },
  glows: [
    {
      color: "rgba(253,185,19,0.3)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(193,39,45,0.25)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  land: (
    <>
      <g data-dh-land>
        <path d={hills(130, 20, 0.3, 2)} fill="#2E6B3C" opacity="0.6" />
      </g>
      <g data-dh-land>
        <path d={pines(185, 75, 30, 61)} fill="#163F28" />
      </g>
      <g data-dh-land>
        <path d={hills(208, 5, 1.4, 4)} fill="#0A2216" />
      </g>
    </>
  ),
  final: {
    line: "on the Baltic",
    copy: "Low tuition, EU-recognised degrees taught in English and one of Europe's fastest-growing tech and start-up scenes.",
    cta: "Plan my move to Lithuania",
    flag: ["#FDB913", "#006A44", "#C1272D"],
  },
  facts: [
    { label: "Capital", value: "Vilnius" },
    { label: "Currency", value: "Euro" },
    { label: "Language", value: "Lithuanian" },
    { label: "In the EU", value: "Since 2004" },
  ],
};

export const guide: GuideData = {
  country: "Lithuania",
  accent: ACCENT,
  accentDark: "#063A24",
  intros: {
    why: "Affordable, English-taught EU degrees, safe and friendly cities and a booming tech, fintech and laser industry.",
    intakes:
      "Lithuanian universities admit most international students in September, with a February intake for some programmes.",
    cost: "Typical yearly tuition for non-EU students, and what a month of student life costs in Lithuania.",
    jobs: "Students with a residence permit can work while they study, and graduates can stay to find work.",
    scholarships:
      "The Lithuanian state and universities offer scholarships and tuition discounts.",
    apply:
      "Apply directly to the university, then for a temporary residence permit (TRP).",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents usually need an apostille and recognition by SKVC.",
    visa: "Non-EU degree students need a temporary residence permit (TRP) for studies, applied for through the MIGRIS system.",
  },
  intakes: [
    {
      title: "Autumn semester",
      when: "September",
      months: [9],
      main: true,
      copy: "The main intake for bachelor's, master's and medicine.",
      apply: "February – June",
    },
    {
      title: "Spring semester",
      when: "February",
      months: [2],
      copy: "A smaller intake for some master's and preparatory programmes.",
      apply: "September – November",
    },
  ],
  reasons: [
    {
      icon: "scholarship",
      title: "Low tuition",
      copy: "Some of the lowest tuition fees for English-taught degrees in the EU.",
    },
    {
      icon: "university",
      title: "Strong universities",
      copy: "Vilnius University (founded 1579), KTU and LSMU are well known internationally.",
    },
    {
      icon: "document",
      title: "Taught in English",
      copy: "Hundreds of English-taught programmes, and English is widely spoken by young people.",
    },
    {
      icon: "passport",
      title: "Stay after graduating",
      copy: "Graduates can get a 12-month residence permit to look for work.",
    },
    {
      icon: "compass",
      title: "Tech and fintech hub",
      copy: "A fast-growing scene in fintech, lasers, gaming and start-ups.",
    },
    {
      icon: "plane",
      title: "Safe and green",
      copy: "Safe, uncrowded cities, forests and the Baltic coast.",
    },
  ],
  tuition: [
    { field: "Social sciences & business", from: 3000, to: 5000 },
    { field: "Engineering & IT", from: 3500, to: 6000 },
    { field: "Master's", from: 3500, to: 7000 },
    { field: "Medicine & dentistry", from: 12000, to: 16000 },
  ],
  living: {
    from: 600,
    to: 900,
    items: [
      {
        item: "Accommodation",
        range: "€200–400",
        share: 42,
        note: "Dormitory or shared flat",
      },
      {
        item: "Food",
        range: "€200–250",
        share: 30,
        note: "Groceries and canteens",
      },
      {
        item: "Transport",
        range: "€10–20",
        share: 3,
        note: "Big student discounts",
      },
      {
        item: "Phone & bills",
        range: "€30–60",
        share: 7,
        note: "Mobile and utilities",
      },
      {
        item: "Other",
        range: "€100–150",
        share: 18,
        note: "Books, leisure, travel",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Non-EU students with a TRP for studies can work while they study. Limits depend on your contract and year of study (commonly 20 hours a week), and you can work full-time in the first three months after graduating.",
    points: [
      [
        "Popular student jobs",
        "Customer support, IT, hospitality and tutoring.",
      ],
      [
        "In-demand fields",
        "Fintech, software, lasers, life sciences and shared services.",
      ],
      [
        "After you graduate",
        "A 12-month TRP to look for work or work as self-employed.",
      ],
      [
        "Longer term",
        "With a job offer, switch to a work-based residence permit.",
      ],
    ],
  },
  scholarships: [
    {
      title: "State scholarships",
      who: "Selected nationalities · mostly master's and summer schools",
      covers: ["Tuition waiver", "Monthly scholarship"],
      when: "Through the Education Exchanges Support Foundation",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: [
        "Tuition discounts of 10%–100%",
        "Merit awards after each semester",
      ],
      when: "With your application or after enrolling",
    },
    {
      title: "Erasmus+",
      who: "Enrolled students",
      covers: ["Exchange grants within Europe"],
      when: "Through your university",
    },
  ],
  applySteps: [
    {
      title: "Choose a programme",
      copy: "Choose an English-taught programme at a Lithuanian university.",
    },
    {
      title: "Apply online",
      copy: "Apply directly with your documents and pay the application fee.",
    },
    {
      title: "Recognition and interview",
      copy: "Your diploma is assessed (often through SKVC), and some programmes hold an interview or test.",
    },
    {
      title: "Accept your offer",
      copy: "Sign your study contract and pay the first tuition instalment.",
    },
    {
      title: "Apply for a TRP",
      copy: "Your university helps you apply for a temporary residence permit through MIGRIS.",
    },
    {
      title: "Arrive and collect your TRP",
      copy: "Travel to Lithuania and collect your residence permit card.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate, apostilled",
      "Recognition of your qualification by SKVC or the university",
      "English proficiency: usually IELTS 5.5–6.0 or B2",
      "Motivation letter",
      "Entrance test or interview for some programmes",
    ],
    Master: [
      "Bachelor's degree in a related field, apostilled",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.0–6.5",
      "Motivation letter and CV",
      "Interview for some programmes",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "Apostilled diplomas",
    "Transcripts",
    "Certified translations",
    "English test results",
    "Motivation letter",
    "CV",
    "Study contract",
    "Proof of tuition payment",
    "Proof of funds",
    "Health insurance (1 year)",
  ],
  visa: {
    stats: [
      ["Permit type", "TRP", "Temporary residence permit for studies"],
      ["Funds to show", "~€6,900", "A year's living costs, from 2026"],
      ["After study", "12 months", "Permit to look for work"],
    ],
    steps: [
      "Receive your admission and sign the study contract.",
      "Pay tuition and arrange health insurance.",
      "Apply for a TRP through MIGRIS.",
      "Attend an appointment at the embassy or migration office.",
      "Arrive and collect your TRP card.",
    ],
    documents: [
      "Passport",
      "Admission letter",
      "Proof of tuition payment",
      "Proof of funds",
      "Health insurance",
      "Accommodation details",
      "Passport photo",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Migration Department and student-guide information. Tuition varies by university and programme, and permit rules, funds requirements and work limits are set by the Lithuanian authorities and change over time. Always confirm current requirements with your university and the Migration Department before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Vilnius",
    region: "Capital",
    tagline:
      "Lithuania's capital, with one of Europe's largest baroque old towns and a fast-growing tech and fintech scene.",
    known: ["Business", "IT", "Medicine", "Law"],
    universities: [
      "Vilnius University",
      "Vilnius Gediminas Technical University (VILNIUS TECH)",
      "ISM University of Management and Economics",
    ],
    vibe: "Historic, green and start-up friendly",
    src: u("1776432408626-a3c03e9127f3"),
    alt: "Cathedral Square and the bell tower in Vilnius",
  },
  {
    name: "Kaunas",
    region: "Central Lithuania",
    tagline:
      "Lithuania's second city and student hub, known for interwar modernist architecture and a strong engineering university.",
    known: ["Engineering", "Medicine", "IT", "Design"],
    universities: [
      "Kaunas University of Technology (KTU)",
      "Lithuanian University of Health Sciences (LSMU)",
      "Vytautas Magnus University",
    ],
    vibe: "Young, creative and affordable",
    src: u("1636068219277-75a61ead0027"),
    alt: "Kaunas at night, seen from a hill",
  },
  {
    name: "Klaipėda",
    region: "Baltic coast",
    tagline:
      "Lithuania's port city, gateway to the Curonian Spit's dunes and beaches.",
    known: ["Marine science", "Logistics", "Business", "Health"],
    universities: ["Klaipėda University"],
    vibe: "Seaside, relaxed and close to nature",
    src: u("1600110306971-6e13c9d52341"),
    alt: "The marina and red-roofed buildings in Klaipėda",
  },
];

export default function LithuaniaPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Lithuania" accent={ACCENT} cities={cities} />
    </>
  );
}
