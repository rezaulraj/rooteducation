import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { PARTICLE, range, waves } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#B5303A";

const hero: DestinationHeroConfig = {
  slug: "norway",
  country: "Norway",
  theme: "dark",
  background:
    "linear-gradient(180deg, #071224 0%, #0E2440 45%, #163A56 75%, #1F4F66 100%)",
  eyebrow: "Velkommen til Norge",
  eyebrowLang: "no",
  name: "Norway",
  intro:
    "Research-led universities, a high quality of life and some of the most dramatic scenery on earth, from fjords to the northern lights.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #BFE3FF 45%, #FF8C8C 100%)",
  accent: "#BFE3FF",
  frame: ["#EEF6FF", "#FF7A7A"],
  shape: "peak",
  embroidery: {
    colors: ["#FF7A7A", "#EEF6FF", "#7FB8FF"],
    motifs: ["star", "rhombus", "tree"],
  },
  ornament: (
    <g transform="translate(100 -20)">
      <g data-dh-pop>
        <path
          d="M-12 6L0-12L12 6Z"
          fill="none"
          stroke="#EEF6FF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M-4-6L0-12L4-6" fill="#EEF6FF" />
      </g>
    </g>
  ),
  photo: {
    id: "1663428520845-056989f8a664",
    aspect: 1.5,
    focus: [0.5, 0.48],
    alt: "Red fishing cabins below mountains in the Lofoten Islands",
  },
  glows: [
    {
      color: "rgba(127,230,196,0.3)",
      className: "-top-32 left-[16%] h-[24rem] w-[46rem]",
    },
    {
      color: "rgba(255,122,122,0.22)",
      className: "-bottom-40 right-[0%] h-[30rem] w-[30rem]",
    },
  ],
  particles: {
    path: PARTICLE.dot,
    colors: ["#FFFFFF", "#E6F2FF"],
    count: 30,
    size: [4, 9],
    speed: 0.6,
    spin: false,
  },
  decor: (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-x-0 top-0 h-[60%] w-full"
    >
      {Array.from({ length: 36 }, (_, i) => (
        <circle
          key={i}
          data-dh-twinkle
          cx={(i * 29) % 100}
          cy={(i * 19) % 55}
          r={0.12 + (i % 3) * 0.06}
          fill="#fff"
        />
      ))}
    </svg>
  ),
  land: (
    <>
      <g data-dh-land>
        <path
          d={range([
            [0, 100],
            [140, 40],
            [260, 120],
            [420, 20],
            [560, 110],
            [720, 50],
            [880, 130],
            [1040, 30],
            [1200, 110],
            [1340, 60],
            [1440, 90],
          ])}
          fill="#2A4A66"
          opacity="0.7"
        />
        <path
          d="M420 20L396 42L410 40L424 52L436 38L448 46ZM1040 30L1018 50L1032 48L1044 58L1056 46L1068 52Z"
          fill="#F2F7FA"
          opacity="0.9"
        />
      </g>
      <g data-dh-land>
        {/* Red rorbu cabins on the shore */}
        <path d="M0 220V170H1440V220Z" fill="#14263A" />
        {[120, 170, 230, 610, 660, 1080, 1130, 1185].map((x) => (
          <path
            key={x}
            d={`M${x} 172V156L${x + 18} 144L${x + 36} 156V172Z`}
            fill="#B5303A"
          />
        ))}
      </g>
      <g data-dh-land>
        <path d={waves(196, 6, 160)} fill="#0A1A2C" />
      </g>
    </>
  ),
  final: {
    line: "among the fjords",
    copy: "High-quality, research-led universities, one of the world's highest standards of living and nature like nowhere else.",
    cta: "Plan my move to Norway",
    flag: ["#BA0C2F", "#FFFFFF", "#00205B"],
  },
  facts: [
    { label: "Capital", value: "Oslo" },
    { label: "Currency", value: "Norwegian krone" },
    { label: "Language", value: "Norwegian (English widely spoken)" },
    { label: "In the EEA", value: "Since 1994" },
  ],
};

export const guide: GuideData = {
  country: "Norway",
  accent: ACCENT,
  accentDark: "#4A0E14",
  currency: "NOK ",
  intros: {
    why: "Research-led universities, English everywhere and a safe, equal society with an outstanding quality of life.",
    intakes:
      "Norwegian universities admit international students once a year, in August.",
    cost: "Typical yearly tuition for non-EU students since 2023, and what a month of student life costs in Norway.",
    jobs: "Students can work part-time in term and full-time in holidays, and graduates can stay to look for work.",
    scholarships:
      "Funding for non-EU students is limited, but PhD positions are paid jobs.",
    apply:
      "Apply directly to each university, usually by 1 December for the following August.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English or a Scandinavian language need certified translations.",
    visa: "Non-EU students need a study permit from the Norwegian Directorate of Immigration (UDI), with proof of funds.",
  },
  intakes: [
    {
      title: "Autumn intake",
      when: "August",
      months: [8],
      main: true,
      copy: "The one main intake for international degree programmes.",
      apply: "October – 1 December, the year before",
    },
    {
      title: "Spring semester",
      when: "January",
      months: [1],
      copy: "Mostly for exchange students; very few degree programmes start in January.",
      apply: "Varies by university",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "Research-led universities",
      copy: "Oslo, NTNU and Bergen are known for research in energy, climate and marine science.",
    },
    {
      icon: "document",
      title: "English everywhere",
      copy: "Hundreds of English-taught master's programmes, and almost everyone speaks English.",
    },
    {
      icon: "compass",
      title: "Quality of life",
      copy: "One of the world's safest, richest and most equal societies.",
    },
    {
      icon: "passport",
      title: "Job-seeker permit",
      copy: "Graduates can apply for a permit of up to one year to look for work.",
    },
    {
      icon: "scholarship",
      title: "Paid PhD positions",
      copy: "PhD candidates are university employees with a good salary.",
    },
    {
      icon: "plane",
      title: "Spectacular nature",
      copy: "Fjords, mountains and the northern lights, with the right to roam freely.",
    },
  ],
  tuition: [
    { field: "Bachelor's (non-EU)", from: 100000, to: 250000 },
    { field: "Master's (non-EU)", from: 130000, to: 300000 },
    { field: "Engineering & technology", from: 150000, to: 400000 },
    { field: "Private business schools", from: 130000, to: 200000 },
  ],
  living: {
    from: 13000,
    to: 16000,
    items: [
      {
        item: "Accommodation",
        range: "NOK 5,000–8,000",
        share: 45,
        note: "Student housing (SiO, Sit, Sammen) is cheapest",
      },
      {
        item: "Food",
        range: "NOK 3,500–4,500",
        share: 28,
        note: "Groceries; eating out is expensive",
      },
      {
        item: "Transport",
        range: "NOK 400–600",
        share: 4,
        note: "Student discounts on passes",
      },
      {
        item: "Phone & bills",
        range: "NOK 300–600",
        share: 4,
        note: "Mobile and utilities",
      },
      {
        item: "Other",
        range: "NOK 2,000–3,000",
        share: 19,
        note: "Books, clothes, outdoors",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "With a first-time study permit, students can work part-time up to 20 hours a week during term, and full-time during normal holidays.",
    points: [
      [
        "Popular student jobs",
        "Retail, hospitality, cleaning and campus jobs.",
      ],
      [
        "In-demand fields",
        "Energy, maritime, aquaculture, engineering, IT and healthcare.",
      ],
      [
        "Job-seeker permit",
        "Up to one year after graduating to look for skilled work.",
      ],
      [
        "Longer term",
        "With a skilled job offer, switch to a skilled-worker permit.",
      ],
    ],
  },
  scholarships: [
    {
      title: "Paid PhD positions",
      who: "Doctoral candidates",
      covers: ["Salary of around NOK 550,000 a year", "No tuition fees"],
      when: "Advertised through the year",
    },
    {
      title: "University scholarships",
      who: "Selected non-EU master's students",
      covers: ["A small number of tuition waivers at some universities"],
      when: "With your application",
    },
    {
      title: "Erasmus+ and exchange",
      who: "Exchange students",
      covers: ["No Norwegian tuition for exchange students", "Erasmus+ grants"],
      when: "Through your home university",
    },
  ],
  applySteps: [
    {
      title: "Choose a programme",
      copy: "Choose an English-taught programme; most international programmes are master's degrees.",
    },
    {
      title: "Apply by 1 December",
      copy: "Apply directly to the university, usually between October and 1 December.",
    },
    {
      title: "Receive your offer",
      copy: "Offers usually come out in spring. Accept your place.",
    },
    {
      title: "Pay tuition and deposit funds",
      copy: "Pay the tuition and deposit your living costs into the university's account or a Norwegian bank.",
    },
    {
      title: "Apply for a study permit",
      copy: "Apply online to UDI and hand in your documents at the embassy or VFS.",
    },
    {
      title: "Arrive and register",
      copy: "Book an appointment with the police or service centre to register.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate plus one year of university study, for many countries",
      "Norwegian for most bachelor's programmes (few are in English)",
      "English proficiency: usually IELTS 6.0–6.5",
      "Specific subjects for some programmes",
      "Documents verified by the university",
    ],
    Master: [
      "Bachelor's degree of at least 180 ECTS (3 years) in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 (no band below 5.5)",
      "Motivation letter and CV",
      "References, for some programmes",
    ],
  },
  documents: [
    "University application",
    "Passport copy",
    "Degree certificate",
    "Transcripts",
    "English test results",
    "Motivation letter",
    "CV",
    "References",
    "Letter of admission",
    "Proof of tuition payment",
    "Proof of funds",
    "Housing documentation",
  ],
  visa: {
    stats: [
      [
        "Funds to show",
        "NOK 166,859",
        "Per year (2025–26); check the current amount",
      ],
      ["Work", "20 hrs/wk", "During term, full-time in holidays"],
      ["After study", "Up to 1 yr", "Job-seeker permit"],
    ],
    steps: [
      "Accept your offer and pay tuition.",
      "Deposit the required living costs.",
      "Apply online to UDI and pay the fee.",
      "Hand in your documents at the embassy or VFS.",
      "Travel and register with the police on arrival.",
    ],
    documents: [
      "Passport",
      "Letter of admission",
      "Proof of tuition payment",
      "Proof of funds",
      "Housing documentation",
      "Online application",
      "Passport photo",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, UDI and student-guide information. Since autumn 2023, non-EU/EEA students pay tuition at Norwegian public universities, which varies by programme. Permit fees, funds requirements and work rules are set by UDI and updated each year. Always confirm current requirements with your university and UDI before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Oslo",
    region: "Eastern Norway",
    tagline:
      "Norway's green, modern capital on a fjord, with striking architecture, museums and the country's largest university.",
    known: ["Law", "Medicine", "Social sciences", "Technology"],
    universities: [
      "University of Oslo",
      "Oslo Metropolitan University",
      "BI Norwegian Business School",
    ],
    vibe: "Green, modern and international",
    src: u("1609793654930-1bfbefe939d7"),
    alt: "The Oslo Opera House beside the fjord",
  },
  {
    name: "Bergen",
    region: "Western Norway",
    tagline:
      "A colourful harbour city between seven mountains, the gateway to the fjords and a hub for marine research.",
    known: ["Marine science", "Climate", "Medicine", "Business"],
    universities: [
      "University of Bergen",
      "Norwegian School of Economics (NHH)",
      "Western Norway University of Applied Sciences",
    ],
    vibe: "Cosy, rainy and beautiful",
    src: u("1544085311-11a028465b03"),
    alt: "The colourful wooden houses of Bryggen in Bergen",
  },
  {
    name: "Trondheim",
    region: "Central Norway",
    tagline:
      "Norway's technology capital, home to NTNU and colourful wharf houses along the Nidelva river.",
    known: ["Engineering", "Technology", "Energy", "Architecture"],
    universities: ["Norwegian University of Science and Technology (NTNU)"],
    vibe: "A true student city, techy and friendly",
    src: u("1517904518766-16c4f3ab0293"),
    alt: "Colourful wharf houses reflected in the Nidelva river, Trondheim",
  },
  {
    name: "Tromsø",
    region: "Northern Norway",
    tagline:
      "The capital of the Arctic, with midnight sun in summer and the northern lights in winter.",
    known: ["Arctic studies", "Marine biology", "Medicine", "Fisheries"],
    universities: ["UiT The Arctic University of Norway"],
    vibe: "Arctic, adventurous and unique",
    src: u("1641299868381-42c07960306c"),
    alt: "Tromsø lit up at night below snowy mountains",
  },
];

export default function NorwayPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Norway" accent={ACCENT} cities={cities} />
    </>
  );
}
