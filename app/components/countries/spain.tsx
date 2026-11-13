import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { hills } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#C2410C";

// Andalusian azulejo tile: a quatrefoil star.
const azulejo = (
  <g fill="none" stroke="#FFD27A" strokeWidth="1">
    <rect x="0" y="0" width="48" height="48" />
    <path d="M24 6L30 18L42 24L30 30L24 42L18 30L6 24L18 18Z" />
    <circle cx="24" cy="24" r="5" />
    <path d="M0 0L10 10M48 0L38 10M0 48L10 38M48 48L38 38" />
  </g>
);

const hero: DestinationHeroConfig = {
  slug: "spain",
  country: "Spain",
  theme: "dark",
  background:
    "linear-gradient(180deg, #2A0E0A 0%, #4A160E 40%, #7A2A12 75%, #A84418 100%)",
  eyebrow: "Bienvenido a España",
  eyebrowLang: "es",
  name: "Spain",
  intro:
    "Affordable, high-quality universities, sunshine all year and a language spoken by 500 million people.",
  gradient: "linear-gradient(100deg, #FFF1D0 0%, #FFC94A 45%, #FF7A45 100%)",
  accent: "#FFC94A",
  frame: ["#FFF1D0", "#FFC94A"],
  shape: "horseshoe",
  embroidery: {
    colors: ["#FFC94A", "#FF6A45", "#FFF1D0"],
    motifs: ["star", "rhombus"],
  },
  ornament: (
    <g transform="translate(100 -24)">
      <g data-dh-pop>
        <circle r="10" fill="none" stroke="#FFC94A" strokeWidth="2" />
        <path d="M0-6L2-2L6 0L2 2L0 6L-2 2L-6 0L-2-2Z" fill="#FFC94A" />
      </g>
    </g>
  ),
  photo: {
    id: "1661442196029-ecc4a8e0a0b8",
    aspect: 1.51,
    focus: [0.5, 0.5],
    alt: "Plaza de España in Seville, seen through its brick arcade",
  },
  glows: [
    {
      color: "rgba(255,201,74,0.35)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(255,122,69,0.3)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  pattern: { size: 48, content: azulejo, opacity: 0.035 },
  land: (
    <>
      <g data-dh-land>
        <path d={hills(120, 26, 0.4, 2)} fill="#8E3A18" opacity="0.6" />
      </g>
      <g data-dh-land>
        {/* Rows of olive trees on the hills */}
        <path d={hills(160, 16, 1.6, 3)} fill="#5C2610" />
        {Array.from({ length: 36 }, (_, i) => (
          <circle
            key={i}
            cx={i * 40 + 20}
            cy={150 + ((i * 13) % 14)}
            r={9}
            fill="#4E5A2A"
            opacity="0.85"
          />
        ))}
      </g>
      <g data-dh-land>
        <path d={hills(200, 6, 2.2, 5)} fill="#2E1008" />
      </g>
    </>
  ),
  final: {
    line: "under the Spanish sun",
    copy: "Affordable degrees, a relaxed and sociable way of life and the chance to master Spanish, the world's second language.",
    cta: "Plan my move to Spain",
    flag: ["#AA151B", "#F1BF00", "#AA151B"],
  },
  facts: [
    { label: "Capital", value: "Madrid" },
    { label: "Currency", value: "Euro" },
    { label: "Language", value: "Spanish" },
    { label: "In the EU", value: "Since 1986" },
  ],
};

export const guide: GuideData = {
  country: "Spain",
  accent: ACCENT,
  accentDark: "#5A1C06",
  intros: {
    why: "Quality, affordable universities, a Mediterranean lifestyle and a gateway to the Spanish-speaking world.",
    intakes:
      "Spanish universities start in September or October, with a February intake for some master's programmes.",
    cost: "Typical yearly tuition for non-EU students, and what a month of student life costs in Spain.",
    jobs: "A student permit allows part-time work, and graduates can apply for a job-search permit.",
    scholarships:
      "Government, regional and university scholarships help international students.",
    apply:
      "From applying to university to getting your TIE card, these are the steps.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents usually need an apostille and an official Spanish translation.",
    visa: "Non-EU students on courses over 90 days need a national (type D) student visa, then a TIE residence card in Spain.",
  },
  intakes: [
    {
      title: "Autumn intake",
      when: "Sep – Oct",
      months: [9, 10],
      main: true,
      copy: "The main intake for bachelor's and master's programmes.",
      apply: "January – June",
    },
    {
      title: "Spring intake",
      when: "February",
      months: [2],
      copy: "A smaller intake for some master's and private university programmes.",
      apply: "September – November",
    },
  ],
  reasons: [
    {
      icon: "scholarship",
      title: "Affordable public universities",
      copy: "Public tuition is among the lowest in Western Europe.",
    },
    {
      icon: "university",
      title: "Top business schools",
      copy: "IE, ESADE and IESE are among the world's best for business and MBAs.",
    },
    {
      icon: "document",
      title: "Learn Spanish",
      copy: "Master the world's second most-spoken native language while you study.",
    },
    {
      icon: "passport",
      title: "Job-search permit",
      copy: "Graduates can apply for a permit to look for work or start a business.",
    },
    {
      icon: "compass",
      title: "Lifestyle",
      copy: "Sunshine, beaches, tapas and festivals, with a famously social way of life.",
    },
    {
      icon: "plane",
      title: "Europe and Latin America",
      copy: "Links across Europe and to the whole Spanish-speaking world.",
    },
  ],
  tuition: [
    { field: "Public university (bachelor's)", from: 1000, to: 4000 },
    { field: "Public university (master's)", from: 2000, to: 6000 },
    { field: "Private university", from: 8000, to: 20000 },
    { field: "Business schools (master's)", from: 15000, to: 40000 },
  ],
  living: {
    from: 800,
    to: 1300,
    items: [
      {
        item: "Accommodation",
        range: "€350–650",
        share: 48,
        note: "Shared flat; Madrid and Barcelona cost most",
      },
      {
        item: "Food",
        range: "€200–300",
        share: 25,
        note: "Markets and menú del día",
      },
      {
        item: "Transport",
        range: "€20–40",
        share: 4,
        note: "Cheap student passes",
      },
      {
        item: "Health insurance",
        range: "€40–60",
        share: 5,
        note: "Private insurance is required for the visa",
      },
      {
        item: "Other",
        range: "€150–250",
        share: 18,
        note: "Leisure, phone, travel",
      },
    ],
  },
  work: {
    big: "30",
    unit: "hrs/week",
    copy: "Since the 2025 immigration reform, students can work up to 30 hours a week alongside their studies, as long as the work is compatible with their course. Confirm current rules with your university before planning.",
    points: [
      [
        "Popular student jobs",
        "Hospitality, tourism, language teaching and retail.",
      ],
      [
        "In-demand fields",
        "Tourism, renewable energy, tech, engineering and healthcare.",
      ],
      [
        "Job-search permit",
        "Graduates can apply for a permit to look for work or start a business.",
      ],
      [
        "Longer term",
        "With a job offer, switch to a work and residence permit.",
      ],
    ],
  },
  scholarships: [
    {
      title: "MAEC-AECID scholarships",
      who: "Selected nationalities · mostly postgraduate",
      covers: ["Tuition support", "Monthly allowance and insurance"],
      when: "Rounds change each year",
    },
    {
      title: "University and regional grants",
      who: "International students",
      covers: ["Tuition discounts", "Merit-based grants"],
      when: "Through each university",
    },
    {
      title: "Business school scholarships",
      who: "Master's and MBA students",
      covers: ["Partial tuition waivers", "Merit and diversity awards"],
      when: "With your application",
    },
  ],
  applySteps: [
    {
      title: "Choose a programme",
      copy: "Choose a university and programme taught in Spanish or English.",
    },
    {
      title: "Get your qualifications recognised",
      copy: "Bachelor's applicants may need homologation and UNEDasiss accreditation.",
    },
    {
      title: "Apply to the university",
      copy: "Apply online and pay any pre-registration fee.",
    },
    {
      title: "Receive your admission",
      copy: "Accept your place and pay your deposit or tuition.",
    },
    {
      title: "Apply for a student visa",
      copy: "Apply at the Spanish consulate with your admission, funds, insurance and certificates.",
    },
    {
      title: "Arrive and get your TIE",
      copy: "Register your address and apply for your TIE residence card within 30 days.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate, recognised (homologated) in Spain",
      "UNEDasiss accreditation for many public universities",
      "Spanish proficiency (usually DELE B2) for Spanish-taught programmes",
      "English (IELTS 6.0–6.5) for English-taught programmes",
      "Entrance tests for some private universities",
    ],
    Master: [
      "Bachelor's degree in a related field",
      "Bachelor's transcripts",
      "Spanish B2 or English proficiency, depending on the language of study",
      "Motivation letter and CV",
      "References, for some programmes",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "Apostilled diplomas",
    "Apostilled transcripts",
    "Official Spanish translations",
    "Language certificate",
    "Motivation letter",
    "CV",
    "Admission letter",
    "Proof of funds",
    "Private health insurance",
    "Police and medical certificates",
  ],
  visa: {
    stats: [
      ["Funds to show", "€600/mo", "100% of IPREM, excluding tuition"],
      ["Visa type", "Type D", "National student visa"],
      ["Work", "30 hrs/wk", "Compatible with your studies"],
    ],
    steps: [
      "Receive your admission letter.",
      "Gather proof of funds, insurance and certificates.",
      "Apply at the Spanish consulate or visa centre.",
      "Travel to Spain within the visa's validity.",
      "Apply for your TIE residence card within 30 days.",
    ],
    documents: [
      "Passport",
      "National visa form",
      "Admission letter",
      "Proof of funds",
      "Private health insurance",
      "Police certificate",
      "Medical certificate",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Spanish government and student-guide information. Tuition varies by region, university and programme, and visa, funds and work rules are set by the Spanish authorities and change over time. Always confirm current requirements with your university and the Spanish consulate before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Madrid",
    region: "Community of Madrid",
    tagline:
      "Spain's elegant capital, full of museums, parks and nightlife, with the country's largest universities and business schools.",
    known: ["Business", "Law", "Engineering", "Medicine"],
    universities: [
      "Universidad Complutense de Madrid",
      "Universidad Autónoma de Madrid",
      "IE University",
      "Universidad Carlos III",
    ],
    vibe: "Lively, grand and open all night",
    src: u("1570698473651-b2de99bae12f"),
    alt: "The Metropolis building on Gran Vía in Madrid",
  },
  {
    name: "Barcelona",
    region: "Catalonia",
    tagline:
      "A creative Mediterranean city of Gaudí, beaches and start-ups, with top universities and business schools.",
    known: ["Business", "Architecture", "Design", "Engineering"],
    universities: [
      "University of Barcelona",
      "Pompeu Fabra University",
      "ESADE",
      "Polytechnic University of Catalonia",
    ],
    vibe: "Creative, coastal and international",
    src: u("1583422409516-2895a77efded"),
    alt: "Aerial view of Barcelona's Eixample grid and the Sagrada Família",
  },
  {
    name: "Valencia",
    region: "Valencian Community",
    tagline:
      "A sunny, affordable coastal city with futuristic architecture and the home of paella.",
    known: ["Engineering", "Architecture", "Business", "Sciences"],
    universities: [
      "University of Valencia",
      "Polytechnic University of Valencia",
    ],
    vibe: "Sunny, relaxed and great value",
    src: u("1763571294142-54993a594420"),
    alt: "The City of Arts and Sciences in Valencia reflected in water",
  },
  {
    name: "Granada",
    region: "Andalusia",
    tagline:
      "A historic Andalusian city beneath the Alhambra and the Sierra Nevada, with a huge student population.",
    known: ["Translation", "Medicine", "Humanities", "Sciences"],
    universities: ["University of Granada"],
    vibe: "Historic, affordable and very studenty",
    src: u("1620677368158-32b1293fac36"),
    alt: "The Alhambra palace above Granada among green trees",
  },
];

export default function SpainPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Spain" accent={ACCENT} cities={cities} />
    </>
  );
}
