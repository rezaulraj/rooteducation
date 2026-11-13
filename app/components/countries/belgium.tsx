import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { skyline, waves } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#B8860B";

// Bobbin lace: a delicate lattice of rings and diamonds.
const lace = (
  <g fill="none" stroke="#FCE38A" strokeWidth="0.8">
    <circle cx="20" cy="20" r="8" />
    <path d="M20 4L36 20L20 36L4 20Z" />
    <circle cx="0" cy="0" r="4" />
    <circle cx="40" cy="0" r="4" />
    <circle cx="0" cy="40" r="4" />
    <circle cx="40" cy="40" r="4" />
  </g>
);

const hero: DestinationHeroConfig = {
  slug: "belgium",
  country: "Belgium",
  theme: "dark",
  background:
    "linear-gradient(180deg, #14100A 0%, #2A2014 45%, #3E2C14 75%, #5A3A14 100%)",
  eyebrow: "Welkom · Bienvenue · Willkommen",
  name: "Belgium",
  intro:
    "Highly ranked, affordable universities at the heart of Europe, in medieval cities of canals, chocolate and EU institutions.",
  gradient: "linear-gradient(100deg, #FFF6D6 0%, #FDDA24 50%, #EF6A5B 100%)",
  accent: "#FDDA24",
  frame: ["#FFF6D6", "#EF6A5B"],
  shape: "steppedGable",
  embroidery: {
    colors: ["#FDDA24", "#EF6A5B", "#FFF6D6"],
    motifs: ["rhombus", "cross"],
  },
  photo: {
    id: "1601961208755-3519c8a31ded",
    aspect: 1.333,
    focus: [0.62, 0.45],
    alt: "Medieval houses and the Belfry along a canal in Bruges",
  },
  glows: [
    {
      color: "rgba(253,218,36,0.28)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(239,106,91,0.25)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  pattern: { size: 40, content: lace, opacity: 0.04 },
  land: (
    <>
      <g data-dh-land>
        <path d={skyline(160, 110, 29, 30)} fill="#4A3418" opacity="0.6" />
      </g>
      <g data-dh-land>
        {/* Gabled canal houses */}
        <path
          d={`M0 220V160${Array.from({ length: 30 }, (_, i) => {
            const x = i * 50;
            const h = 150 - ((i * 37) % 30);
            return `L${x} ${h}L${x + 8} ${h}L${x + 8} ${h - 10}L${x + 16} ${h - 10}L${x + 16} ${h - 20}L${x + 25} ${h - 28}L${x + 34} ${h - 20}L${x + 34} ${h - 10}L${x + 42} ${h - 10}L${x + 42} ${h}L${x + 50} ${h}`;
          }).join("")}V220Z`}
          fill="#2A1C0C"
        />
      </g>
      <g data-dh-land>
        <path d={waves(200, 6, 140)} fill="#16100A" />
      </g>
    </>
  ),
  final: {
    line: "at the heart of Europe",
    copy: "Excellent, affordable universities, three languages and the EU institutions on your doorstep.",
    cta: "Plan my move to Belgium",
    flag: ["#000000", "#FDDA24", "#EF3340"],
  },
  facts: [
    { label: "Capital", value: "Brussels" },
    { label: "Currency", value: "Euro" },
    { label: "Languages", value: "Dutch, French & German" },
    { label: "In the EU", value: "Founding member" },
  ],
};

export const guide: GuideData = {
  country: "Belgium",
  accent: ACCENT,
  accentDark: "#4A3604",
  intros: {
    why: "World-class universities at modest fees, in the multilingual heart of Europe and the home of the EU.",
    intakes:
      "Belgian universities admit most students in September, with a small February intake.",
    cost: "Typical yearly tuition for non-EU students, and what a month of student life costs in Belgium.",
    jobs: "Students can work part-time during term and more in the holidays, and graduates can stay on to look for work.",
    scholarships:
      "Belgian governments and universities offer scholarships, especially for master's students from developing countries.",
    apply:
      "Apply directly to the university, then for a long-stay visa for studies.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents usually need legalisation and certified translations.",
    visa: "Non-EU students need a type D long-stay visa for studies, then register with their local commune on arrival.",
  },
  intakes: [
    {
      title: "Autumn semester",
      when: "September",
      months: [9],
      main: true,
      copy: "The main intake for bachelor's and master's programmes.",
      apply: "December – March (non-EU deadlines are early)",
    },
    {
      title: "Spring semester",
      when: "February",
      months: [2],
      copy: "A small intake for some master's and exchange programmes.",
      apply: "September – October",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "Highly ranked universities",
      copy: "KU Leuven, Ghent and UCLouvain are among Europe's top research universities.",
    },
    {
      icon: "scholarship",
      title: "Affordable fees",
      copy: "Tuition is far lower than in the UK or US, even for non-EU students.",
    },
    {
      icon: "document",
      title: "English-taught master's",
      copy: "Hundreds of master's programmes are taught fully in English.",
    },
    {
      icon: "passport",
      title: "Heart of Europe",
      copy: "Home of the EU and NATO, with Paris, London and Amsterdam a short train ride away.",
    },
    {
      icon: "compass",
      title: "Multilingual",
      copy: "Dutch, French and German are official, and English is widely spoken.",
    },
    {
      icon: "plane",
      title: "Search year",
      copy: "Graduates can stay up to 12 months to look for work or start a business.",
    },
  ],
  tuition: [
    { field: "Flemish universities (non-EU)", from: 4000, to: 9000 },
    { field: "French-speaking universities (non-EU)", from: 900, to: 4200 },
    { field: "Advanced master's & MBAs", from: 8000, to: 20000 },
    { field: "Private business schools", from: 10000, to: 25000 },
  ],
  living: {
    from: 850,
    to: 1200,
    items: [
      {
        item: "Accommodation",
        range: "€400–650",
        share: 50,
        note: "Student room ('kot'); Brussels costs most",
      },
      {
        item: "Food",
        range: "€250–350",
        share: 28,
        note: "Student restaurants are cheap",
      },
      {
        item: "Transport",
        range: "€20–50",
        share: 4,
        note: "Cheap student passes",
      },
      {
        item: "Insurance",
        range: "€10–20",
        share: 2,
        note: "Health insurance through a Belgian fund",
      },
      {
        item: "Other",
        range: "€150–200",
        share: 16,
        note: "Books, leisure, travel",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Non-EU students can work up to 20 hours a week during term and full-time during school holidays, usually with a student work contract. Some institutions only allow work after the first semester.",
    points: [
      [
        "Popular student jobs",
        "Hospitality, retail, events, tutoring and campus jobs.",
      ],
      [
        "In-demand fields",
        "EU affairs, logistics, pharma, engineering and IT.",
      ],
      [
        "Search year",
        "Up to 12 months after graduating to look for work or start a business.",
      ],
      [
        "Longer term",
        "With a job offer, apply for a single permit for work and residence.",
      ],
    ],
  },
  scholarships: [
    {
      title: "Master Mind Scholarships (Flanders)",
      who: "Excellent non-EU master's students",
      covers: [
        "Up to €10,000 a year",
        "Tuition waiver at Flemish universities",
      ],
      when: "Usually applications close in early March",
    },
    {
      title: "VLIR-UOS and ARES scholarships",
      who: "Students from development-cooperation countries",
      covers: [
        "Full scholarships for selected master's and training programmes",
        "Living allowance and travel",
      ],
      when: "Usually January – February",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: ["Partial tuition waivers", "Merit-based awards"],
      when: "Through each university",
    },
  ],
  applySteps: [
    {
      title: "Choose a programme",
      copy: "Choose a university and an English-taught programme that fits your goals.",
    },
    {
      title: "Apply online",
      copy: "Apply directly to the university; non-EU deadlines are often 1 February to 1 March.",
    },
    {
      title: "Receive your admission",
      copy: "Accept your place and get your admission letter.",
    },
    {
      title: "Prove your funds",
      copy: "Show sufficient funds, often through a blocked account, a sponsor or a scholarship.",
    },
    {
      title: "Apply for a type D visa",
      copy: "Apply at the Belgian embassy or VFS with your documents, medical certificate and police certificate.",
    },
    {
      title: "Arrive and register",
      copy: "Register at your local commune within 8 days to receive your residence card.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate with equivalence for Belgium",
      "Proof of language: Dutch or French for most bachelor's, or English for the few English-taught ones",
      "Entrance exam for medicine, dentistry and engineering (some universities)",
      "Motivation letter",
      "Legalised documents and translations",
    ],
    Master: [
      "Bachelor's degree in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 or TOEFL 90",
      "Motivation letter and CV",
      "References, for some programmes",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "Legalised diplomas",
    "Transcripts",
    "English test results",
    "Motivation letter",
    "CV",
    "References",
    "Admission letter",
    "Proof of funds",
    "Medical certificate",
    "Police certificate",
  ],
  visa: {
    stats: [
      [
        "Funds to show",
        "~€850/mo",
        "Set each academic year; check the current amount",
      ],
      ["Work", "20 hrs/wk", "During term, full-time in holidays"],
      ["After study", "12 months", "Search year to find work"],
    ],
    steps: [
      "Receive your admission letter.",
      "Prove your funds through a blocked account, sponsor or scholarship.",
      "Get a medical certificate and police certificate.",
      "Apply for a type D visa at the Belgian embassy or VFS.",
      "Arrive and register with your local commune.",
    ],
    documents: [
      "Passport",
      "Admission letter",
      "Proof of funds",
      "Medical certificate",
      "Police certificate",
      "Proof of fee payment",
      "Legalised diplomas",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Belgian government and student-guide information. Tuition differs between the Flemish and French-speaking communities and between programmes, and visa rules and the funds you must show are set each year by the Belgian authorities. Always confirm current requirements with your university and the Belgian embassy before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Brussels",
    region: "Capital Region",
    tagline:
      "The capital of Belgium and the EU, a multilingual city of grand squares, art nouveau and international careers.",
    known: ["Politics", "Law", "Business", "International relations"],
    universities: [
      "Université libre de Bruxelles (ULB)",
      "Vrije Universiteit Brussel (VUB)",
      "Solvay Brussels School",
    ],
    vibe: "International, political and multilingual",
    src: u("1575845664732-ee40fdc525a3"),
    alt: "Guild houses on the Grand-Place in Brussels",
  },
  {
    name: "Leuven",
    region: "Flemish Brabant",
    tagline:
      "A historic student city built around KU Leuven, one of Europe's oldest and most innovative universities.",
    known: ["Engineering", "Medicine", "Economics", "Philosophy"],
    universities: ["KU Leuven"],
    vibe: "A true student city, cosy and lively",
    src: u("1661775773702-e5eeef0c5d1d"),
    alt: "The KU Leuven University Library tower in Leuven",
  },
  {
    name: "Ghent",
    region: "East Flanders",
    tagline:
      "A medieval city of canals and towers, with a large university and a young, creative population.",
    known: ["Biotechnology", "Engineering", "Veterinary", "Arts"],
    universities: ["Ghent University", "HOGENT University of Applied Sciences"],
    vibe: "Creative, historic and full of cyclists",
    src: u("1775918173078-1452101e0721"),
    alt: "Historic buildings along a canal in Ghent",
  },
  {
    name: "Antwerp",
    region: "Antwerp province",
    tagline:
      "Belgium's port city and diamond capital, known for fashion, design and a lively cultural scene.",
    known: ["Business", "Fashion", "Logistics", "Law"],
    universities: [
      "University of Antwerp",
      "Antwerp Management School",
      "Royal Academy of Fine Arts",
    ],
    vibe: "Stylish, urban and creative",
    src: u("1757535298607-7830f109ca3d"),
    alt: "Ornate guild houses on the Grote Markt in Antwerp",
  },
];

export default function BelgiumPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Belgium" accent={ACCENT} cities={cities} />
    </>
  );
}
