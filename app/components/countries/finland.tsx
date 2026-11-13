import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { PARTICLE, pines } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#1F5AA6";

const hero: DestinationHeroConfig = {
  slug: "finland",
  country: "Finland",
  theme: "dark",
  background:
    "linear-gradient(180deg, #050D1E 0%, #0A1F3A 45%, #0F3550 75%, #164A5C 100%)",
  eyebrow: "Tervetuloa Suomeen",
  eyebrowLang: "fi",
  name: "Finland",
  intro:
    "A world-famous education system, a two-year post-study permit and the northern lights, in the world's happiest country.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #A8F0DA 50%, #7FC4FF 100%)",
  accent: "#A8F0DA",
  frame: ["#EAF6FF", "#7FE6C4"],
  shape: "hexagon",
  embroidery: {
    colors: ["#EAF6FF", "#7FC4FF", "#7FE6C4"],
    motifs: ["star", "tree"],
  },
  ornament: (
    <g transform="translate(100 -24)">
      <g data-dh-pop>
        {/* A snowflake */}
        <g stroke="#EAF6FF" strokeWidth="2" strokeLinecap="round">
          {[0, 60, 120].map((a) => (
            <path
              key={a}
              transform={`rotate(${a})`}
              d="M0-12V12M-4-8L0-4L4-8M-4 8L0 4L4 8"
              fill="none"
            />
          ))}
        </g>
      </g>
    </g>
  ),
  photo: {
    id: "1528155124528-06c125d81e89",
    aspect: 0.67,
    focus: [0.5, 0.45],
    alt: "The northern lights glowing green over a snowy Finnish forest",
  },
  glows: [
    {
      color: "rgba(127,230,196,0.35)",
      className: "-top-32 left-[20%] h-[26rem] w-[44rem]",
    },
    {
      color: "rgba(160,120,255,0.25)",
      className: "top-10 right-[0%] h-[24rem] w-[30rem]",
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
          cx={(i * 41) % 100}
          cy={(i * 17) % 55}
          r={0.12 + (i % 3) * 0.06}
          fill="#fff"
        />
      ))}
    </svg>
  ),
  land: (
    <>
      <g data-dh-land>
        <path d={pines(150, 90, 28, 41)} fill="#173A4A" opacity="0.8" />
      </g>
      <g data-dh-land>
        <path d={pines(190, 80, 22, 47)} fill="#0C2432" />
      </g>
      <g data-dh-land>
        <path
          d="M0 206C300 200 600 210 900 204S1300 198 1440 206V220H0Z"
          fill="#E6F0F5"
          opacity="0.9"
        />
      </g>
    </>
  ),
  final: {
    line: "under the northern lights",
    copy: "A world-class, practical education, a safe and happy society and two years to find work after you graduate.",
    cta: "Plan my move to Finland",
    flag: ["#FFFFFF", "#002F6C", "#FFFFFF"],
  },
  facts: [
    { label: "Capital", value: "Helsinki" },
    { label: "Currency", value: "Euro" },
    { label: "Languages", value: "Finnish & Swedish" },
    { label: "In the EU", value: "Since 1995" },
  ],
};

export const guide: GuideData = {
  country: "Finland",
  accent: ACCENT,
  accentDark: "#0B2852",
  intros: {
    why: "World-renowned education, generous scholarships and great work rights, in the happiest country in the world.",
    intakes:
      "Most degree programmes start in late August, with a few starting in January.",
    cost: "Typical yearly tuition for non-EU students in English-taught programmes, and what a month of student life costs.",
    jobs: "Students can work an average of 30 hours a week, and graduates get up to two years to find a job.",
    scholarships:
      "Almost every university offers fee waivers of 50–100% for strong non-EU students.",
    apply:
      "Most applications go through the national Studyinfo portal, in one of two joint application rounds.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English, Finnish or Swedish need certified translations.",
    visa: "Non-EU students need a residence permit for studies from the Finnish Immigration Service (Migri), applied for online.",
  },
  intakes: [
    {
      title: "Autumn intake",
      when: "Aug – Sep",
      months: [8, 9],
      main: true,
      copy: "The main intake, with almost every English-taught programme.",
      apply: "January (joint application)",
    },
    {
      title: "Spring intake",
      when: "January",
      months: [1],
      copy: "A smaller intake for some universities of applied sciences.",
      apply: "September (joint application)",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "World-famous education",
      copy: "Finland's education system is admired worldwide, with excellent universities and universities of applied sciences.",
    },
    {
      icon: "scholarship",
      title: "Generous fee waivers",
      copy: "Most universities offer 50%–100% tuition scholarships to non-EU students.",
    },
    {
      icon: "passport",
      title: "Two years to find work",
      copy: "Graduates can get a residence permit of up to 2 years to look for work.",
    },
    {
      icon: "document",
      title: "Work while you study",
      copy: "Work an average of 30 hours a week, and full-time in holidays.",
    },
    {
      icon: "compass",
      title: "Happiest country",
      copy: "Named the world's happiest country for years running, with clean nature and low crime.",
    },
    {
      icon: "plane",
      title: "Tech and design",
      copy: "Home of Nokia, gaming studios and a thriving start-up scene.",
    },
  ],
  tuition: [
    { field: "Universities of applied sciences", from: 8000, to: 12000 },
    { field: "Bachelor's (universities)", from: 10000, to: 15000 },
    { field: "Master's", from: 10000, to: 18000 },
    { field: "Business & medicine", from: 15000, to: 25000 },
  ],
  living: {
    from: 800,
    to: 1200,
    items: [
      {
        item: "Accommodation",
        range: "€350–600",
        share: 45,
        note: "Student housing foundations are affordable",
      },
      {
        item: "Food",
        range: "€250–350",
        share: 28,
        note: "Subsidised student lunches (about €3)",
      },
      {
        item: "Transport",
        range: "€30–60",
        share: 5,
        note: "Student discounts on all public transport",
      },
      {
        item: "Phone & internet",
        range: "€20–40",
        share: 3,
        note: "Cheap, unlimited mobile data",
      },
      {
        item: "Other",
        range: "€150–200",
        share: 19,
        note: "Clothes, sauna, leisure",
      },
    ],
  },
  work: {
    big: "30",
    unit: "hrs/week",
    copy: "Students can work an average of 30 hours a week, worked out over the year, so you can work full-time in the holidays. Internships and thesis work that are part of your degree don't count towards the limit.",
    points: [
      [
        "Popular student jobs",
        "Cafés, restaurants, cleaning, delivery, tutoring and campus jobs.",
      ],
      [
        "In-demand fields",
        "ICT, gaming, engineering, healthcare and clean technology.",
      ],
      [
        "After you graduate",
        "A residence permit of up to 2 years to look for work or start a business.",
      ],
      [
        "Longer term",
        "Work experience in Finland can lead to permanent residence.",
      ],
    ],
  },
  scholarships: [
    {
      title: "University fee waivers",
      who: "Non-EU degree students",
      covers: [
        "50%, 80% or 100% of tuition",
        "Often renewed if you complete enough credits",
      ],
      when: "Usually with your application in January",
    },
    {
      title: "Finland Scholarship",
      who: "Top non-EU applicants to master's or bachelor's programmes",
      covers: ["Full tuition for the first year", "A €5,000 relocation grant"],
      when: "Through participating universities",
    },
    {
      title: "Doctoral positions",
      who: "PhD students",
      covers: [
        "Most PhD positions are salaried",
        "No tuition fees for doctoral studies",
      ],
      when: "Advertised through the year",
    },
  ],
  applySteps: [
    {
      title: "Choose programmes",
      copy: "Find English-taught programmes on Studyinfo.fi; you can apply to up to six.",
    },
    {
      title: "Apply in the joint application",
      copy: "Apply online during the January joint application, and upload your documents.",
    },
    {
      title: "Entrance exam or interview",
      copy: "Some programmes hold an online entrance exam, interview or assignment.",
    },
    {
      title: "Accept your place",
      copy: "Results come in spring. Accept your place and pay the first year's tuition (after any scholarship).",
    },
    {
      title: "Apply for a residence permit",
      copy: "Apply online at Enter Finland and visit the embassy or VFS to prove your identity.",
    },
    {
      title: "Arrive and register",
      copy: "Travel, register your address and get a Finnish personal identity code.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate that gives access to university in your country",
      "English proficiency: usually IELTS 6.0–6.5 or equivalent",
      "Entrance exam or SAT scores, for some programmes",
      "Maths and science for technology programmes",
      "Motivation letter, for some programmes",
    ],
    Master: [
      "Bachelor's degree in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 (no band below 5.5)",
      "Motivation letter and CV",
      "References, for some programmes",
    ],
  },
  documents: [
    "Studyinfo application",
    "Passport copy",
    "Degree certificate",
    "Transcripts",
    "English test results",
    "Motivation letter",
    "CV",
    "References",
    "Proof of tuition payment",
    "Proof of funds",
    "Health insurance",
    "Certified translations",
  ],
  visa: {
    stats: [
      ["Funds to show", "€800/mo", "€9,600 for a one-year permit"],
      ["Work", "30 hrs/wk", "On average, over the year"],
      ["After study", "Up to 2 yrs", "Permit to look for work"],
    ],
    steps: [
      "Accept your place and pay the tuition due.",
      "Prepare proof of funds and health insurance.",
      "Apply online at Enter Finland and pay the fee.",
      "Prove your identity at a Finnish embassy or VFS centre.",
      "Receive your residence permit card and travel.",
    ],
    documents: [
      "Passport",
      "Letter of acceptance",
      "Proof of tuition payment or scholarship",
      "Proof of funds",
      "Health insurance",
      "Passport photo",
      "Online application",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2026 university, Migri and student-guide information. Tuition and scholarships vary by university and programme, and permit fees, funds requirements and work rules are set by the Finnish Immigration Service and change over time. Always confirm current requirements with your university and Migri before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Helsinki",
    region: "Uusimaa · South coast",
    tagline:
      "Finland's compact, design-loving capital on the Baltic Sea, with saunas, islands and a booming start-up scene.",
    known: ["Technology", "Business", "Design", "Medicine"],
    universities: [
      "University of Helsinki",
      "Aalto University",
      "Haaga-Helia and Metropolia universities of applied sciences",
    ],
    vibe: "Stylish, safe and seaside",
    src: u("1538332576228-eb5b4c4de6f5"),
    alt: "Helsinki Cathedral above the city's waterfront",
  },
  {
    name: "Tampere",
    region: "Pirkanmaa",
    tagline:
      "A lively student city between two lakes, with a strong technology and gaming industry.",
    known: ["Engineering", "ICT", "Health", "Social sciences"],
    universities: [
      "Tampere University",
      "Tampere University of Applied Sciences",
    ],
    vibe: "Young, friendly and lakeside",
    src: u("1636452089599-56a0dc26b4f2"),
    alt: "Aerial view of Tampere with its river and autumn trees",
  },
  {
    name: "Turku",
    region: "South-west coast",
    tagline:
      "Finland's oldest city, on the edge of a vast archipelago, with a medieval cathedral and lively riverbanks.",
    known: ["Biomedicine", "Business", "Education", "Maritime"],
    universities: [
      "University of Turku",
      "Åbo Akademi University",
      "Turku University of Applied Sciences",
    ],
    vibe: "Historic, relaxed and coastal",
    src: u("1642747041760-96edbc00df69"),
    alt: "Turku Cathedral beside the Aura river",
  },
  {
    name: "Oulu",
    region: "Northern Ostrobothnia",
    tagline:
      "A northern tech city on the Gulf of Bothnia, known for wireless technology and as a 2026 European Capital of Culture.",
    known: ["Wireless tech", "Engineering", "Health", "Environment"],
    universities: ["University of Oulu", "Oulu University of Applied Sciences"],
    vibe: "Innovative, outdoorsy and good value",
    src: u("1657123096362-f12bfb5dcf53"),
    alt: "Aerial view of Oulu and its river delta",
  },
];

export default function FinlandPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Finland" accent={ACCENT} cities={cities} />
    </>
  );
}
