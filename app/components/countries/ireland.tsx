import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { hills, waves } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#169B62";

// A Celtic triple spiral (triskele), drawn as thread.
const triskele = (
  <g fill="none" stroke="#B6E3C8" strokeWidth="1.6" strokeLinecap="round">
    {[0, 120, 240].map((a) => (
      <path
        key={a}
        data-dh-draw
        transform={`rotate(${a})`}
        d="M0 0C0-6 6-10 10-6C13-3 11 2 7 2C4 2 3-1 5-2"
        pathLength={1}
        strokeDasharray="1"
      />
    ))}
  </g>
);

const hero: DestinationHeroConfig = {
  slug: "ireland",
  country: "Ireland",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0B1E24 0%, #123A3A 45%, #1A5240 75%, #286B45 100%)",
  eyebrow: "Céad míle fáilte",
  eyebrowLang: "ga",
  name: "Ireland",
  intro:
    "English-speaking, EU-recognised degrees, a booming tech sector and the Stay Back visa, on the friendly, green Emerald Isle.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #B6E3C8 45%, #FF9E4A 100%)",
  accent: "#B6E3C8",
  frame: ["#EAF7EF", "#FF9E4A"],
  shape: "drop",
  embroidery: {
    colors: ["#5FD08F", "#F2F7EF", "#FF9E4A"],
    motifs: ["cross", "rhombus", "flower"],
  },
  ornament: <g transform="translate(100 -22) scale(1.4)">{triskele}</g>,
  photo: {
    id: "1591387091135-1bd5a83d27ab",
    aspect: 1.5,
    focus: [0.25, 0.45],
    alt: "The Cliffs of Moher above the Atlantic at sunset",
  },
  glows: [
    {
      color: "rgba(255,158,74,0.3)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(22,155,98,0.4)",
      className: "-bottom-40 -left-20 h-[34rem] w-[34rem]",
    },
  ],
  decor: (
    <>
      <div
        className="absolute left-[6%] top-[22%] hidden md:block"
        data-dh-drift
      >
        <svg viewBox="-14 -14 28 28" className="h-16 w-16 opacity-50">
          {triskele}
        </svg>
      </div>
      <div
        className="absolute bottom-[30%] right-[4%] hidden md:block"
        data-dh-drift
      >
        <svg viewBox="-14 -14 28 28" className="h-12 w-12 opacity-40">
          {triskele}
        </svg>
      </div>
    </>
  ),
  land: (
    <>
      <g data-dh-land>
        <path d={hills(110, 30, 0, 2)} fill="#2F7A4E" opacity="0.6" />
      </g>
      <g data-dh-land>
        <path d={hills(150, 22, 1.5, 3)} fill="#1F5E3C" />
      </g>
      <g data-dh-land>
        <path d={waves(196, 10, 140)} fill="#0F3A36" />
      </g>
    </>
  ),
  final: {
    line: "on the Emerald Isle",
    copy: "World-class universities, Europe's tech capital in Dublin and up to two years to work after you graduate.",
    cta: "Plan my move to Ireland",
    flag: ["#169B62", "#FFFFFF", "#FF883E"],
  },
  facts: [
    { label: "Capital", value: "Dublin" },
    { label: "Currency", value: "Euro" },
    { label: "Languages", value: "English & Irish" },
    { label: "In the EU", value: "Since 1973" },
  ],
};

export const guide: GuideData = {
  country: "Ireland",
  accent: ACCENT,
  accentDark: "#0A4A2E",
  intros: {
    why: "Study in English inside the EU, at universities linked to the world's biggest tech and pharma companies.",
    intakes:
      "Irish universities admit most international students in September, with a smaller January intake.",
    cost: "Typical yearly tuition for non-EU students, and what a month of student life costs in Ireland.",
    jobs: "Students can work part-time in term and full-time in the holidays, then stay on to work after graduating.",
    scholarships:
      "Government and university scholarships help international students fund their studies.",
    apply:
      "From choosing a course to registering with immigration in Ireland, these are the steps.",
    admission:
      "Requirements vary by university and course. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English need certified translations.",
    visa: "Students from visa-required countries apply for a study visa online; everyone then registers for an Irish Residence Permit (Stamp 2).",
  },
  intakes: [
    {
      title: "September intake",
      when: "September",
      months: [9],
      main: true,
      copy: "The main intake for almost every undergraduate and postgraduate course.",
      apply: "November – May",
    },
    {
      title: "January intake",
      when: "January",
      months: [1],
      copy: "A smaller intake for selected postgraduate and some business programmes.",
      apply: "August – October",
    },
  ],
  reasons: [
    {
      icon: "document",
      title: "English-speaking EU",
      copy: "The only English-speaking country in the eurozone, with EU-recognised degrees.",
    },
    {
      icon: "university",
      title: "Strong universities",
      copy: "Trinity College Dublin, UCD and others rank among Europe's best.",
    },
    {
      icon: "passport",
      title: "Stay Back visa",
      copy: "Up to 1 year after a bachelor's and 2 years after a master's or PhD (Stamp 1G).",
    },
    {
      icon: "scholarship",
      title: "Global companies",
      copy: "Google, Meta, Apple, Pfizer and hundreds more have their European bases here.",
    },
    {
      icon: "compass",
      title: "Friendly and safe",
      copy: "Known for its warm welcome, music, storytelling and lively student life.",
    },
    {
      icon: "plane",
      title: "Close to Europe",
      copy: "Short, cheap flights to the UK and across Europe.",
    },
  ],
  tuition: [
    { field: "Arts & business (bachelor's)", from: 12000, to: 22000 },
    { field: "Science & engineering (bachelor's)", from: 15000, to: 28000 },
    { field: "Master's", from: 12000, to: 30000 },
    { field: "Medicine", from: 45000, to: 60000 },
  ],
  living: {
    from: 1000,
    to: 1600,
    items: [
      {
        item: "Accommodation",
        range: "€600–1,000",
        share: 58,
        note: "Shared or student housing; Dublin costs most",
      },
      {
        item: "Food",
        range: "€250–350",
        share: 20,
        note: "Groceries and eating out",
      },
      {
        item: "Transport",
        range: "€50–100",
        share: 5,
        note: "Student Leap Card discounts",
      },
      {
        item: "Phone & bills",
        range: "€50–100",
        share: 5,
        note: "Often included in student housing",
      },
      {
        item: "Other",
        range: "€100–200",
        share: 12,
        note: "Books, leisure, travel",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "Students on a full-time degree course with Stamp 2 can work up to 20 hours a week during term, and up to 40 hours a week from June to September and from 15 December to 15 January.",
    points: [
      [
        "Popular student jobs",
        "Retail, hospitality, tutoring, call centres and campus jobs.",
      ],
      [
        "In-demand fields",
        "Technology, pharmaceuticals, finance, data and healthcare.",
      ],
      [
        "Stay Back (Stamp 1G)",
        "1 year after a level 8 degree, 2 years after a level 9 master's or above.",
      ],
      [
        "Longer term",
        "With a job offer, you can move to a Critical Skills Employment Permit.",
      ],
    ],
  },
  scholarships: [
    {
      title: "Government of Ireland International Education Scholarship",
      who: "Master's and PhD students",
      covers: ["€10,000 stipend for one year", "Full fee waiver"],
      when: "Usually opens in the autumn, closing in early spring",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: ["€2,000–5,000 off tuition at most universities", "Merit-based"],
      when: "With or after your application",
    },
    {
      title: "Research scholarships",
      who: "PhD students",
      covers: [
        "Research Ireland (Irish Research Council) awards",
        "Stipend and fees",
      ],
      when: "Through your supervisor and university",
    },
  ],
  applySteps: [
    {
      title: "Choose a course",
      copy: "Pick a university and course that fit your goals, grades and budget.",
    },
    {
      title: "Apply online",
      copy: "Apply directly to the university (or through the CAO for some undergraduate courses) with your documents.",
    },
    {
      title: "Receive your offer",
      copy: "Accept the offer and pay your deposit or tuition.",
    },
    {
      title: "Apply for a study visa",
      copy: "If your nationality needs one, apply online through AVATS and submit your documents.",
    },
    {
      title: "Arrive in Ireland",
      copy: "Travel with your documents and show them at immigration on arrival.",
    },
    {
      title: "Register for your IRP",
      copy: "Register with immigration for your Irish Residence Permit (Stamp 2) and pay the €300 fee.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent) with good grades",
      "A foundation year, for some school systems",
      "English proficiency: usually IELTS 6.5 (no band below 6.0)",
      "Subject requirements for some courses",
      "Interview or HPAT for medicine",
    ],
    Master: [
      "Bachelor's degree with a 2.1 or equivalent (some accept a 2.2)",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5",
      "Personal statement and CV",
      "Two references",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "School / university certificates",
    "Transcripts",
    "English test results",
    "Personal statement",
    "CV (Master)",
    "References",
    "Offer letter",
    "Proof of tuition payment",
    "Proof of funds (€10,000)",
    "Private medical insurance",
  ],
  visa: {
    stats: [
      [
        "Funds to show",
        "€10,000",
        "For the first year, in addition to tuition",
      ],
      ["IRP fee", "€300", "Irish Residence Permit registration"],
      ["After study", "Up to 2 yrs", "Stay Back permission (Stamp 1G)"],
    ],
    steps: [
      "Accept your offer and pay your tuition.",
      "Arrange private medical insurance.",
      "Apply online for a study visa if your nationality needs one.",
      "Submit your documents and passport to the visa office.",
      "Arrive and register for your Irish Residence Permit.",
    ],
    documents: [
      "Passport",
      "Letter of acceptance",
      "Proof of tuition payment",
      "Proof of funds",
      "Private medical insurance",
      "Academic documents",
      "English test results",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Irish Immigration Service and student-guide information. Tuition varies by university and course, and visa fees, funds requirements and work rules are set by the Irish authorities and change over time. Always confirm current requirements with your university and the Irish Immigration Service before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Dublin",
    region: "Leinster · East coast",
    tagline:
      "Ireland's lively capital and Europe's tech hub, with historic universities, great music and the sea nearby.",
    known: ["Computer science", "Business", "Medicine", "Law"],
    universities: [
      "Trinity College Dublin",
      "University College Dublin (UCD)",
      "Dublin City University (DCU)",
      "TU Dublin",
    ],
    vibe: "Lively, international and full of jobs",
    src: u("1788108621620-99202a2fd2a9"),
    alt: "The Ha'penny Bridge over the River Liffey in Dublin at dusk",
  },
  {
    name: "Cork",
    region: "Munster · South coast",
    tagline:
      "Ireland's food capital and second city, friendly and creative, with Cobh's harbour and colourful houses nearby.",
    known: ["Pharmacy", "Food science", "Business", "Engineering"],
    universities: [
      "University College Cork (UCC)",
      "Munster Technological University",
    ],
    vibe: "Friendly, foodie and relaxed",
    src: u("1773587563640-2ff1d469953f"),
    alt: "Colourful houses and St Colman's Cathedral in Cobh, near Cork",
  },
  {
    name: "Galway",
    region: "Connacht · West coast",
    tagline:
      "A bohemian, music-filled city on the Atlantic, and the gateway to Connemara and the Wild Atlantic Way.",
    known: ["Medical devices", "Marine science", "Arts", "Engineering"],
    universities: ["University of Galway", "Atlantic Technological University"],
    vibe: "Creative, cosy and full of festivals",
    src: u("1585334644725-e0b49aa6cdce"),
    alt: "Colourful houses of the Long Walk in Galway beside the water",
  },
  {
    name: "Limerick",
    region: "Munster · Mid-west",
    tagline:
      "A riverside city with a medieval castle and a large, sporty university campus.",
    known: ["Engineering", "Sport science", "Business", "Health"],
    universities: [
      "University of Limerick",
      "Mary Immaculate College",
      "Technological University of the Shannon",
    ],
    vibe: "Sporty, affordable and student-friendly",
    src: u("1660687446301-7788b4a6ebe7"),
    alt: "King John's Castle beside the River Shannon in Limerick",
  },
];

export default function IrelandPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Ireland" accent={ACCENT} cities={cities} />
    </>
  );
}
