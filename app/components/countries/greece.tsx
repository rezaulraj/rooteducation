import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { hills, waves } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#1D5FAF";

// The Greek key (meander), as a repeating border tile.
const meander = (
  <path
    d="M0 30H6V6H30V24H18V18H24V12H12V30H36"
    fill="none"
    stroke="#F3E7C9"
    strokeWidth="2"
  />
);

const hero: DestinationHeroConfig = {
  slug: "greece",
  country: "Greece",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0A1B3A 0%, #12366A 45%, #1D5590 75%, #2C76AE 100%)",
  eyebrow: "Καλώς ήρθατε · Welcome",
  eyebrowLang: "el",
  name: "Greece",
  intro:
    "Study where Western learning began, with growing English-taught programmes, low living costs and the Aegean on your doorstep.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #F3E7C9 50%, #F0B65A 100%)",
  accent: "#F3E7C9",
  frame: ["#FFFFFF", "#F0B65A"],
  shape: "pediment",
  embroidery: {
    colors: ["#F3E7C9", "#7FB8FF", "#F0B65A"],
    motifs: ["cross", "rhombus"],
  },
  ornament: (
    <g>
      {/* Columns beside the window */}
      {[-24, 224].map((x) => (
        <g key={x}>
          <path
            data-dh-draw
            d={`M${x} 250V80`}
            stroke="#F3E7C9"
            strokeWidth="6"
            pathLength={1}
            strokeDasharray="1"
          />
          <path
            data-dh-draw
            d={`M${x - 9} 80H${x + 9}M${x - 9} 250H${x + 9}`}
            stroke="#F3E7C9"
            strokeWidth="3"
            pathLength={1}
            strokeDasharray="1"
          />
        </g>
      ))}
    </g>
  ),
  photo: {
    id: "1603565816030-6b389eeb23cb",
    aspect: 1.5,
    focus: [0.55, 0.42],
    alt: "The Acropolis of Athens at golden hour",
  },
  glows: [
    {
      color: "rgba(240,182,90,0.35)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(120,200,255,0.3)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  decor: (
    <svg className="absolute inset-x-0 top-[86px] h-9 w-full opacity-25">
      <defs>
        <pattern
          id="gr-key"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          {meander}
        </pattern>
      </defs>
      <rect width="100%" height="36" fill="url(#gr-key)" />
    </svg>
  ),
  land: (
    <>
      <g data-dh-land>
        <path d={hills(120, 30, 0.8, 2)} fill="#3B6E9A" opacity="0.5" />
      </g>
      <g data-dh-land>
        <path d={hills(160, 20, 2, 2)} fill="#2A5E8E" />
      </g>
      <g data-dh-land>
        <path d={waves(198, 8, 130)} fill="#123E70" />
      </g>
    </>
  ),
  final: {
    line: "where learning began",
    copy: "Ancient history, Mediterranean life and affordable, English-taught degrees in Athens, Thessaloniki and beyond.",
    cta: "Plan my move to Greece",
    flag: ["#0D5EAF", "#FFFFFF", "#0D5EAF"],
  },
  facts: [
    { label: "Capital", value: "Athens" },
    { label: "Currency", value: "Euro" },
    { label: "Language", value: "Greek" },
    { label: "In the EU", value: "Since 1981" },
  ],
};

export const guide: GuideData = {
  country: "Greece",
  accent: ACCENT,
  accentDark: "#0B2A52",
  intros: {
    why: "Study in the birthplace of philosophy and democracy, at low cost, with a growing range of English-taught degrees.",
    intakes:
      "Greek universities admit most students in September or October, with a February intake for some master's programmes.",
    cost: "Typical yearly tuition for non-EU students in English-taught programmes, and what a month of student life costs.",
    jobs: "Students with a residence permit can work part-time alongside their studies.",
    scholarships:
      "The Greek state and universities offer scholarships, especially for postgraduate study.",
    apply:
      "Apply directly to the university's English-taught programme, then for a student visa.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents usually need an apostille and a certified translation.",
    visa: "Non-EU students need a national (type D) student visa, then a residence permit for studies in Greece.",
  },
  intakes: [
    {
      title: "Autumn semester",
      when: "Sep – Oct",
      months: [9, 10],
      main: true,
      copy: "The main intake for bachelor's and master's programmes.",
      apply: "March – June",
    },
    {
      title: "Spring semester",
      when: "February",
      months: [2],
      copy: "A smaller intake for some master's programmes.",
      apply: "October – December",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "Birthplace of learning",
      copy: "Study where philosophy, democracy, maths and medicine took shape.",
    },
    {
      icon: "scholarship",
      title: "Affordable",
      copy: "Low tuition for English-taught programmes and some of Western Europe's lowest living costs.",
    },
    {
      icon: "document",
      title: "English-taught programmes",
      copy: "A fast-growing choice of English-taught bachelor's and master's degrees.",
    },
    {
      icon: "passport",
      title: "EU and Schengen",
      copy: "An EU member with degrees recognised across Europe.",
    },
    {
      icon: "compass",
      title: "Mediterranean life",
      copy: "Sunshine, islands, food and a warm, sociable culture.",
    },
    {
      icon: "plane",
      title: "Growing economy",
      copy: "Opportunities in shipping, tourism, tech and energy.",
    },
  ],
  tuition: [
    { field: "English-taught bachelor's", from: 1500, to: 6000 },
    { field: "English-taught master's", from: 3000, to: 12000 },
    { field: "Medicine (English-taught)", from: 12000, to: 15000 },
    { field: "Private colleges", from: 6000, to: 15000 },
  ],
  living: {
    from: 650,
    to: 1000,
    items: [
      {
        item: "Accommodation",
        range: "€300–500",
        share: 46,
        note: "Shared flat; Athens costs most",
      },
      {
        item: "Food",
        range: "€200–280",
        share: 30,
        note: "Markets, bakeries and tavernas",
      },
      {
        item: "Transport",
        range: "€15–30",
        share: 3,
        note: "Discounted student passes",
      },
      {
        item: "Phone & bills",
        range: "€40–70",
        share: 6,
        note: "Mobile and utilities",
      },
      {
        item: "Other",
        range: "€100–150",
        share: 15,
        note: "Books, leisure, island trips",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Students with a residence permit for studies can usually work part-time, around 20 hours a week in term, and full-time in official holidays, as long as it doesn't affect their studies.",
    points: [
      ["Popular student jobs", "Tourism, hospitality, cafés and tutoring."],
      [
        "In-demand fields",
        "Shipping, tourism, tech, renewable energy and logistics.",
      ],
      ["Greek language", "Learning Greek opens far more local job options."],
      [
        "After you graduate",
        "With a job offer, apply for a work and residence permit.",
      ],
    ],
  },
  scholarships: [
    {
      title: "IKY scholarships",
      who: "Selected nationalities · postgraduate and research",
      covers: ["Monthly allowance", "Tuition support for some programmes"],
      when: "Calls are announced by the State Scholarships Foundation",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: ["Tuition waivers for strong applicants", "Merit-based awards"],
      when: "Through each programme",
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
      copy: "Choose an English-taught programme at a Greek university.",
    },
    {
      title: "Apply online",
      copy: "Apply directly to the programme with your apostilled documents.",
    },
    {
      title: "Receive your acceptance",
      copy: "Accept your place and pay any tuition deposit.",
    },
    {
      title: "Apply for a type D visa",
      copy: "Apply at the Greek consulate with your acceptance, funds and insurance.",
    },
    {
      title: "Arrive and enrol",
      copy: "Travel to Greece, enrol and get your tax number (AFM).",
    },
    {
      title: "Get your residence permit",
      copy: "Apply for your residence permit for studies before your visa expires.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate, apostilled",
      "English proficiency: usually IELTS 6.0–6.5 for English-taught programmes",
      "Greek proficiency for Greek-taught programmes",
      "Motivation letter",
      "Interview for some programmes",
    ],
    Master: [
      "Bachelor's degree in a related field, apostilled",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5",
      "Motivation letter and CV",
      "Two recommendation letters",
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
    "Recommendation letters",
    "Acceptance letter",
    "Proof of funds",
    "Health insurance",
  ],
  visa: {
    stats: [
      ["Visa type", "Type D", "National student visa"],
      ["Funds to show", "~€500–650/mo", "Check the consulate's current amount"],
      ["Work", "20 hrs/wk", "Part-time, around your studies"],
    ],
    steps: [
      "Receive your acceptance letter.",
      "Prepare proof of funds and health insurance.",
      "Apply at the Greek consulate for a type D visa.",
      "Travel and enrol at your university.",
      "Apply for your residence permit for studies.",
    ],
    documents: [
      "Passport",
      "Visa application form",
      "Acceptance letter",
      "Proof of funds",
      "Health insurance",
      "Police certificate",
      "Medical certificate",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Greek government and student-guide information. Tuition varies by programme, and visa, funds and work rules are set by the Greek authorities and differ between consulates. Always confirm current requirements with your university and the Greek consulate before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Athens",
    region: "Attica",
    tagline:
      "The capital and birthplace of democracy, where ancient monuments meet a lively, modern city by the sea.",
    known: ["Classics", "Business", "Engineering", "Medicine"],
    universities: [
      "National and Kapodistrian University of Athens",
      "National Technical University of Athens",
      "Athens University of Economics and Business",
    ],
    vibe: "Historic, lively and sunny",
    src: u("1555993539-1732b0258235"),
    alt: "The Parthenon on the Acropolis in Athens",
  },
  {
    name: "Thessaloniki",
    region: "Central Macedonia",
    tagline:
      "Greece's second city and student capital, with a seafront promenade, Byzantine churches and great food.",
    known: ["Engineering", "Medicine", "Agriculture", "Arts"],
    universities: [
      "Aristotle University of Thessaloniki",
      "University of Macedonia",
      "International Hellenic University",
    ],
    vibe: "Young, foodie and full of students",
    src: u("1763567966641-2fd8676612b5"),
    alt: "The White Tower on Thessaloniki's waterfront promenade",
  },
  {
    name: "Heraklion",
    region: "Crete",
    tagline:
      "The capital of Crete, with a Venetian harbour, ancient Knossos nearby and beaches all around.",
    known: ["Medicine", "Computer science", "Biology", "Physics"],
    universities: ["University of Crete", "Hellenic Mediterranean University"],
    vibe: "Island life, relaxed and sunny",
    src: u("1660806886383-d8558af05201"),
    alt: "The Venetian fortress and boats in Heraklion harbour",
  },
  {
    name: "Patras",
    region: "Western Greece",
    tagline:
      "A port city on the Gulf of Patras, linked by the Rio–Antirrio bridge, with a large, technical university.",
    known: ["Engineering", "Computer science", "Medicine", "Sciences"],
    universities: ["University of Patras", "Hellenic Open University"],
    vibe: "Lively, coastal and affordable",
    src: u("1653493170506-3fc43d3baf5b"),
    alt: "The Rio–Antirrio bridge over turquoise water near Patras",
  },
];

export default function GreecePage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Greece" accent={ACCENT} cities={cities} />
    </>
  );
}
