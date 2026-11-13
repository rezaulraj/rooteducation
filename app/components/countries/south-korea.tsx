import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { PARTICLE, range, skyline } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#C8325A";

// Dancheong-inspired lattice: interlocking squares, as on traditional hanok windows.
const lattice = (
  <g fill="none" stroke="#F7C8D6" strokeWidth="1">
    <rect x="4" y="4" width="32" height="32" />
    <path d="M20 4V36M4 20H36" />
    <rect x="12" y="12" width="16" height="16" />
  </g>
);

const hero: DestinationHeroConfig = {
  slug: "south-korea",
  country: "South Korea",
  theme: "dark",
  background:
    "linear-gradient(180deg, #120F2A 0%, #26204A 45%, #4A2B5C 75%, #7A3B5E 100%)",
  eyebrow: "환영합니다 · Welcome",
  eyebrowLang: "ko",
  name: "South Korea",
  intro:
    "Cutting-edge universities, full government scholarships and a dynamic culture that blends palaces, pop culture and technology.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #FFC2D4 45%, #8FB8FF 100%)",
  accent: "#FFC2D4",
  frame: ["#FFF0F5", "#8FB8FF"],
  shape: "square",
  embroidery: {
    colors: ["#FF8FB0", "#F3F5FF", "#8FB8FF"],
    motifs: ["flower", "star"],
  },
  ornament: (
    <g transform="translate(100 -24)">
      <g data-dh-pop>
        {/* The taegeuk, from the national flag */}
        <circle r="12" fill="#CD2E3A" />
        <path
          d="M-12 0A12 12 0 0 0 12 0A6 6 0 0 0 0 0A6 6 0 0 1 -12 0Z"
          fill="#0047A0"
        />
      </g>
    </g>
  ),
  photo: {
    id: "1638964663550-e2123ac8900b",
    aspect: 1.51,
    focus: [0.5, 0.45],
    alt: "Geunjeongjeon Hall at Gyeongbokgung Palace in Seoul",
  },
  glows: [
    {
      color: "rgba(255,150,190,0.35)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(120,160,255,0.3)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  pattern: { size: 40, content: lattice, opacity: 0.03 },
  particles: {
    path: PARTICLE.petal,
    colors: ["#FFD1DC", "#FFB7C9", "#FFE4EC"],
    count: 18,
    size: [10, 18],
  },
  land: (
    <>
      <g data-dh-land>
        <path
          d={range([
            [0, 110],
            [180, 70],
            [360, 120],
            [540, 60],
            [760, 110],
            [960, 55],
            [1180, 115],
            [1440, 75],
          ])}
          fill="#3A2F63"
          opacity="0.7"
        />
      </g>
      <g data-dh-land>
        <path d={skyline(190, 120, 23, 32)} fill="#221C42" />
      </g>
      <g data-dh-land>
        <path d="M0 208H1440V220H0Z" fill="#140F2A" />
      </g>
    </>
  ),
  final: {
    line: "in the land of morning calm",
    copy: "Leading technology universities, the Global Korea Scholarship and a culture the whole world is watching.",
    cta: "Plan my move to South Korea",
    flag: ["#FFFFFF", "#CD2E3A", "#0047A0", "#000000"],
  },
  facts: [
    { label: "Capital", value: "Seoul" },
    { label: "Currency", value: "Korean won" },
    { label: "Language", value: "Korean" },
    { label: "Universities", value: "190+" },
  ],
};

export const guide: GuideData = {
  country: "South Korea",
  accent: ACCENT,
  accentDark: "#5A1428",
  currency: "₩",
  intros: {
    why: "World-class technology universities, generous scholarships and a fast, safe and exciting place to live.",
    intakes:
      "The Korean academic year starts in March, with a second intake in September.",
    cost: "Typical yearly tuition for international students, and what a month of student life costs in Korea.",
    jobs: "D-2 students can work part-time with a permit, with more hours for those with stronger Korean.",
    scholarships:
      "Korea offers one of Asia's best full government scholarships, plus university tuition waivers.",
    apply:
      "From choosing a university to your Alien Registration Card, these are the steps.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents usually need an apostille or consular confirmation.",
    visa: "Degree students need a D-2 student visa, applied for at the Korean embassy with the university's certificate of admission.",
  },
  intakes: [
    {
      title: "Spring semester",
      when: "March",
      months: [3],
      main: true,
      copy: "The start of the academic year and the biggest intake, including most GKS scholars.",
      apply: "September – November",
    },
    {
      title: "Fall semester",
      when: "September",
      months: [9],
      copy: "The second intake, open for most undergraduate and graduate programmes.",
      apply: "March – May",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "Top technology universities",
      copy: "KAIST, Seoul National University, POSTECH and Yonsei are among Asia's best.",
    },
    {
      icon: "scholarship",
      title: "Global Korea Scholarship",
      copy: "The government GKS covers tuition, flights, a monthly allowance and Korean language study.",
    },
    {
      icon: "document",
      title: "English-taught programmes",
      copy: "A growing number of degrees are taught in English, especially at graduate level.",
    },
    {
      icon: "compass",
      title: "Culture and innovation",
      copy: "Home to Samsung, Hyundai and LG, and the K-culture wave.",
    },
    {
      icon: "passport",
      title: "Job-seeking visa",
      copy: "Graduates can switch to a D-10 job-seeking visa to look for work in Korea.",
    },
    {
      icon: "plane",
      title: "Safe and connected",
      copy: "Very safe cities, superb public transport and super-fast internet.",
    },
  ],
  tuition: [
    { field: "Public university (per year)", from: 4000000, to: 9000000 },
    { field: "Private university (per year)", from: 8000000, to: 16000000 },
    { field: "Master's (per year)", from: 8000000, to: 18000000 },
    { field: "Korean language course (per year)", from: 5000000, to: 7000000 },
  ],
  living: {
    from: 900000,
    to: 1500000,
    items: [
      {
        item: "Accommodation",
        range: "₩300,000–700,000",
        share: 45,
        note: "Dormitory or one-room flat",
      },
      {
        item: "Food",
        range: "₩300,000–450,000",
        share: 30,
        note: "Campus cafeterias are cheap",
      },
      {
        item: "Transport",
        range: "₩50,000–80,000",
        share: 5,
        note: "Excellent subway and buses",
      },
      {
        item: "Phone & insurance",
        range: "₩70,000–100,000",
        share: 7,
        note: "National health insurance is required",
      },
      {
        item: "Other",
        range: "₩100,000–200,000",
        share: 13,
        note: "Books, leisure, cafés",
      },
    ],
  },
  work: {
    big: "25",
    unit: "hrs/week",
    copy: "After six months in Korea, D-2 students can work part-time with a permit from immigration. The weekly limit depends on your level and Korean ability: around 10–25 hours in term, with more in vacations.",
    points: [
      [
        "Part-time work permit",
        "Required before you start any job; your university's international office helps.",
      ],
      [
        "Korean language helps",
        "A higher TOPIK level allows more working hours and many more jobs.",
      ],
      [
        "D-10 job-seeking visa",
        "After graduating, look for work in Korea on a D-10 visa.",
      ],
      [
        "Longer term",
        "Move to an E-7 professional work visa with a job offer.",
      ],
    ],
  },
  scholarships: [
    {
      title: "Global Korea Scholarship (GKS)",
      who: "Undergraduate and graduate students",
      covers: [
        "Full tuition and return flights",
        "Monthly living allowance",
        "One year of Korean language study",
      ],
      when: "Graduate track opens in February; undergraduate in September",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: [
        "30%–100% tuition waivers based on grades or TOPIK",
        "Renewable each semester",
      ],
      when: "With your application",
    },
    {
      title: "Research assistantships",
      who: "Master's and PhD students",
      covers: ["Tuition support and a stipend from your lab"],
      when: "Arranged with your professor",
    },
  ],
  applySteps: [
    {
      title: "Choose a university",
      copy: "Pick a university and programme, and check whether it is taught in English or Korean.",
    },
    {
      title: "Apply online",
      copy: "Apply with your documents, usually apostilled, during the university's application window.",
    },
    {
      title: "Receive your admission",
      copy: "Pay your tuition and receive a Certificate of Admission.",
    },
    {
      title: "Apply for a D-2 visa",
      copy: "Apply at the Korean embassy with your admission, financial proof and documents.",
    },
    {
      title: "Arrive in Korea",
      copy: "Fly in before the semester and attend orientation.",
    },
    {
      title: "Register as a foreign resident",
      copy: "Apply for your Alien Registration Card within 90 days of arriving.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate with good grades, apostilled",
      "TOPIK level 3 or higher for Korean-taught programmes",
      "English proficiency: usually IELTS 5.5–6.5 or TOEFL 80 for English-taught programmes",
      "Personal statement and study plan",
      "Interview for some universities",
    ],
    Master: [
      "Bachelor's degree, apostilled",
      "Bachelor's transcripts",
      "TOPIK or English test, depending on the language of study",
      "Study plan and research proposal",
      "Two recommendation letters",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "Apostilled certificates",
    "Apostilled transcripts",
    "TOPIK or English test results",
    "Personal statement",
    "Study plan",
    "Recommendation letters",
    "Bank statement",
    "Certificate of Admission",
    "Family relationship documents, if asked",
    "Passport photos",
  ],
  visa: {
    stats: [
      ["Visa type", "D-2", "Student visa for degree programmes"],
      ["Funds to show", "~US$20,000", "Varies by university and region"],
      ["After study", "D-10", "Job-seeking visa for graduates"],
    ],
    steps: [
      "Receive your Certificate of Admission and tuition receipt.",
      "Prepare a bank statement showing the funds required.",
      "Apply for a D-2 visa at the Korean embassy or consulate.",
      "Travel to Korea before the semester starts.",
      "Apply for your Alien Registration Card within 90 days.",
    ],
    documents: [
      "Passport",
      "Visa application form",
      "Certificate of Admission",
      "Tuition payment receipt",
      "Bank statement",
      "Final degree certificate",
      "Passport photo",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, Korean government and student-guide information. Tuition varies by university and programme, and visa, funds and work rules are set by the Korean Ministry of Justice and change over time. Always confirm current requirements with your university and the Korean embassy before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Seoul",
    region: "Capital Area",
    tagline:
      "A dazzling capital of palaces, neon streets and mountains, home to Korea's most famous universities.",
    known: ["Engineering", "Business", "Media", "Medicine"],
    universities: [
      "Seoul National University",
      "Yonsei University",
      "Korea University",
      "Hanyang University",
    ],
    vibe: "Fast, exciting and open all night",
    src: u("1532649097480-b67d52743b69"),
    alt: "The Seoul skyline at night under a crescent moon",
  },
  {
    name: "Busan",
    region: "South-east coast",
    tagline:
      "Korea's second city, a port city of beaches, seafood markets and colourful hillside villages.",
    known: ["Marine science", "Engineering", "Business", "Film"],
    universities: [
      "Pusan National University",
      "Pukyong National University",
      "Dong-A University",
    ],
    vibe: "Beachy, relaxed and cheaper than Seoul",
    src: u("1638591751482-1a7d27fcea15"),
    alt: "Haeundae beach and towers in Busan",
  },
  {
    name: "Incheon",
    region: "Capital Area",
    tagline:
      "Home to the international airport and the futuristic Songdo district, with a Global Campus of foreign universities.",
    known: ["Logistics", "Engineering", "Business", "Design"],
    universities: [
      "Incheon National University",
      "Inha University",
      "Incheon Global Campus (SUNY Korea, Utah, Ghent)",
    ],
    vibe: "Modern, green and well connected",
    src: u("1638198800371-32341c84beba"),
    alt: "The skyline of Songdo, Incheon, across the water",
  },
  {
    name: "Daejeon",
    region: "Central Korea",
    tagline:
      "Korea's science city, home to KAIST and dozens of national research institutes.",
    known: ["Science", "Engineering", "AI", "Robotics"],
    universities: ["KAIST", "Chungnam National University"],
    vibe: "Calm, green and research-focused",
    src: u("1663038550207-ed3a4d05bf0b"),
    alt: "Science buildings and a bridge in Daejeon",
  },
];

export default function SouthKoreaPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="South Korea" accent={ACCENT} cities={cities} />
    </>
  );
}
