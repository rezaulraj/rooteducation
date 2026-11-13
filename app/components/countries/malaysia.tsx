import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { PARTICLE, hills, skyline } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#0F7A6C";

// The songket weave: a lattice of diamonds in gold thread.
const songket = (
  <g fill="none" stroke="#E9C46A" strokeWidth="1">
    <path d="M30 0L60 30L30 60L0 30Z" />
    <path d="M30 14L46 30L30 46L14 30Z" />
    <circle cx="30" cy="30" r="3" fill="#E9C46A" />
  </g>
);

const hero: DestinationHeroConfig = {
  slug: "malaysia",
  country: "Malaysia",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0A1F2B 0%, #0E3A3F 45%, #135048 75%, #1C5E43 100%)",
  eyebrow: "Selamat datang",
  eyebrowLang: "ms",
  name: "Malaysia",
  intro:
    "Affordable, English-taught degrees, including from UK and Australian branch campuses, in a vibrant, multicultural tropical country.",
  gradient: "linear-gradient(100deg, #FFF3C4 0%, #F4C95D 45%, #F08A5D 100%)",
  accent: "#F4C95D",
  frame: ["#FFF3C4", "#F08A5D"],
  shape: "onion",
  embroidery: {
    colors: ["#F4C95D", "#F08A5D", "#FFF3C4"],
    motifs: ["flower", "rhombus"],
  },
  ornament: (
    <g transform="translate(100 -22)">
      <g data-dh-pop>
        <path d="M0-14C6-6 6 4 0 10C-6 4-6-6 0-14Z" fill="#F4C95D" />
        <circle cy="14" r="2.5" fill="#F4C95D" />
      </g>
    </g>
  ),
  photo: {
    id: "1597148543182-830ef7bbb904",
    aspect: 0.75,
    focus: [0.5, 0.42],
    alt: "The Petronas Twin Towers lit up at night in Kuala Lumpur",
  },
  glows: [
    {
      color: "rgba(244,201,93,0.3)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(240,138,93,0.3)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  pattern: { size: 60, content: songket, opacity: 0.035 },
  particles: {
    path: PARTICLE.flower,
    colors: ["#E63946", "#F4A261", "#F7D6E0"],
    count: 10,
    size: [14, 26],
    speed: 0.8,
  },
  land: (
    <>
      <g data-dh-land>
        <path d={hills(120, 26, 0.6, 2)} fill="#1F6B52" opacity="0.6" />
      </g>
      <g data-dh-land>
        <path d={skyline(180, 120, 17, 36)} fill="#0E3A33" />
      </g>
      <g data-dh-land>
        <path d={hills(206, 8, 1.2, 4)} fill="#082621" />
      </g>
    </>
  ),
  final: {
    line: "in Truly Asia",
    copy: "Internationally recognised degrees at a fraction of the cost, with UK and Australian branch campuses on your doorstep.",
    cta: "Plan my move to Malaysia",
    flag: ["#CC0001", "#FFFFFF", "#010066", "#FFCC00"],
  },
  facts: [
    { label: "Capital", value: "Kuala Lumpur" },
    { label: "Currency", value: "Ringgit (RM)" },
    { label: "Languages", value: "Malay & English" },
    { label: "Branch campuses", value: "10+" },
  ],
};

export const guide: GuideData = {
  country: "Malaysia",
  accent: ACCENT,
  accentDark: "#063B33",
  currency: "RM",
  intros: {
    why: "High-quality, affordable degrees taught in English, in one of Asia's most welcoming and diverse countries.",
    intakes:
      "Malaysian universities usually have three intakes a year, so you rarely wait long to start.",
    cost: "Typical yearly tuition for international students, and what a month of student life costs in Malaysia.",
    jobs: "Student Pass holders can work part-time during semester breaks, with approval.",
    scholarships:
      "Government and university scholarships help international students, especially at postgraduate level.",
    apply:
      "Your university applies for your Student Pass through EMGS, which keeps things simple.",
    admission:
      "Requirements vary by university and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English or Malay need certified translations.",
    visa: "International students need a Student Pass, applied for by the university through Education Malaysia Global Services (EMGS).",
  },
  intakes: [
    {
      title: "September intake",
      when: "September",
      months: [9],
      main: true,
      copy: "The main intake at most universities, with the full range of programmes.",
      apply: "March – June",
    },
    {
      title: "February / March intake",
      when: "Feb – Mar",
      months: [2, 3],
      copy: "A second large intake for most bachelor's and master's programmes.",
      apply: "September – December",
    },
    {
      title: "July intake",
      when: "July",
      months: [7],
      copy: "Offered by many private universities and foundation programmes.",
      apply: "January – April",
    },
  ],
  reasons: [
    {
      icon: "scholarship",
      title: "Affordable",
      copy: "Tuition and living costs are among the lowest for English-taught degrees anywhere.",
    },
    {
      icon: "university",
      title: "International branch campuses",
      copy: "Earn a UK or Australian degree at campuses such as Monash, Nottingham and Southampton.",
    },
    {
      icon: "document",
      title: "Taught in English",
      copy: "English is widely spoken, and most degrees are taught fully in English.",
    },
    {
      icon: "compass",
      title: "Multicultural",
      copy: "Malay, Chinese, Indian and indigenous cultures, with food and festivals all year round.",
    },
    {
      icon: "passport",
      title: "Simple visa process",
      copy: "Your university handles the Student Pass application through EMGS.",
    },
    {
      icon: "plane",
      title: "Gateway to Asia",
      copy: "Cheap flights across Southeast Asia from Kuala Lumpur's hub airport.",
    },
  ],
  tuition: [
    { field: "Public university (bachelor's)", from: 15000, to: 30000 },
    { field: "Private university (bachelor's)", from: 25000, to: 50000 },
    { field: "Master's", from: 20000, to: 45000 },
    { field: "Medicine", from: 70000, to: 110000 },
  ],
  living: {
    from: 1500,
    to: 2500,
    items: [
      {
        item: "Accommodation",
        range: "RM600–1,200",
        share: 45,
        note: "Campus or shared condo",
      },
      {
        item: "Food",
        range: "RM500–800",
        share: 30,
        note: "Hawker food is cheap and excellent",
      },
      {
        item: "Transport",
        range: "RM100–200",
        share: 7,
        note: "LRT, MRT and buses",
      },
      {
        item: "Phone & internet",
        range: "RM50–100",
        share: 4,
        note: "Affordable mobile data",
      },
      {
        item: "Other",
        range: "RM200–350",
        share: 14,
        note: "Books, leisure, travel",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "International students can work part-time up to 20 hours a week during semester breaks or holidays of more than 7 days, in approved sectors, with permission from the Immigration Department through their university.",
    points: [
      [
        "Approved jobs",
        "Restaurants, petrol kiosks, mini markets and hotels (not as cashiers or entertainers).",
      ],
      [
        "Internships",
        "Industrial training is built into many degree programmes.",
      ],
      [
        "Growing sectors",
        "Technology, finance, engineering, logistics and the digital economy.",
      ],
      [
        "After you graduate",
        "Graduates need an Employment Pass, sponsored by an employer, to work in Malaysia.",
      ],
    ],
  },
  scholarships: [
    {
      title: "Malaysia International Scholarship (MIS)",
      who: "Master's and PhD students",
      covers: [
        "Tuition fees",
        "Monthly allowance",
        "Travel and health insurance",
      ],
      when: "Check the Ministry of Higher Education each year",
    },
    {
      title: "University scholarships",
      who: "International students",
      covers: [
        "10%–50% off tuition for strong grades",
        "Many awarded automatically",
      ],
      when: "With your application",
    },
    {
      title: "Branch campus awards",
      who: "Students at foreign branch campuses",
      covers: [
        "Merit scholarships from the home university",
        "Up to full tuition",
      ],
      when: "Through each campus",
    },
  ],
  applySteps: [
    {
      title: "Choose a university",
      copy: "Pick a public, private or branch campus and a programme that fits your goals and budget.",
    },
    {
      title: "Apply online",
      copy: "Apply with your transcripts, passport and English results.",
    },
    {
      title: "Receive your offer letter",
      copy: "Accept the offer and pay the fees for the Student Pass application.",
    },
    {
      title: "EMGS applies for your Student Pass",
      copy: "The university submits your application to EMGS, including a medical screening.",
    },
    {
      title: "Get your eVAL",
      copy: "Once approved, you receive an electronic Visa Approval Letter (eVAL).",
    },
    {
      title: "Arrive and finish your pass",
      copy: "Fly to Malaysia, complete your medical check, and receive your Student Pass sticker.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent), or a foundation programme",
      "Minimum grades set by each university and programme",
      "English proficiency: usually IELTS 5.5–6.0 or equivalent",
      "Maths and science subjects for science and engineering programmes",
      "Interview for some programmes such as medicine",
    ],
    Master: [
      "Bachelor's degree, usually with a CGPA of 2.5–3.0 or above",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.0–6.5",
      "Statement of purpose and CV",
      "Research proposal for research degrees",
    ],
  },
  documents: [
    "Online application",
    "Passport (all pages)",
    "Passport photos",
    "Academic certificates",
    "Transcripts",
    "English test results",
    "Statement of purpose",
    "CV (Master)",
    "Medical report",
    "Offer letter",
    "Proof of funds",
    "Certified translations",
  ],
  visa: {
    stats: [
      ["Student Pass", "Via EMGS", "Your university applies for you"],
      ["Fees", "~RM2,000", "EMGS, medical and insurance, approximately"],
      ["Work", "20 hrs/wk", "During semester breaks only"],
    ],
    steps: [
      "Accept your offer and send your documents to the university.",
      "Pay the EMGS and visa processing fees.",
      "Do a pre-arrival medical screening if required.",
      "Receive your eVAL and single-entry visa if needed.",
      "Arrive, complete your medical check and collect your Student Pass.",
    ],
    documents: [
      "Passport",
      "Offer letter",
      "Academic documents",
      "Passport photos",
      "Medical report",
      "Health insurance",
      "Personal bond, if required",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, EMGS and student-guide information. Tuition varies widely between public, private and branch campuses, and Student Pass fees and work rules are set by the Malaysian authorities and change over time. Always confirm current requirements with your university and EMGS before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Kuala Lumpur",
    region: "Federal Territory",
    tagline:
      "Malaysia's buzzing capital of skyscrapers, street food and shopping, with many universities in and around the city.",
    known: ["Business", "Engineering", "IT", "Medicine"],
    universities: [
      "Universiti Malaya",
      "Taylor's University",
      "Asia Pacific University",
      "Sunway University",
    ],
    vibe: "Modern, lively and affordable",
    src: u("1597148543182-830ef7bbb904"),
    alt: "The Petronas Twin Towers lit up at night in Kuala Lumpur",
  },
  {
    name: "Penang",
    region: "Northern Malaysia",
    tagline:
      "An island of heritage streets, beaches and famous food, with George Town a UNESCO World Heritage Site.",
    known: ["Engineering", "Science", "Medicine", "Hospitality"],
    universities: ["Universiti Sains Malaysia (USM)", "Penang Medical College"],
    vibe: "Relaxed, historic and delicious",
    src: u("1671964231495-97e9f2b5a79d"),
    alt: "Aerial view of George Town, Penang, by the sea",
  },
  {
    name: "Johor Bahru",
    region: "Southern Malaysia",
    tagline:
      "A fast-growing city on the border with Singapore, home to several international branch campuses.",
    known: ["Engineering", "Business", "Medicine", "Built environment"],
    universities: [
      "Universiti Teknologi Malaysia (UTM)",
      "University of Southampton Malaysia",
      "Newcastle University Medicine Malaysia",
    ],
    vibe: "Growing, connected and close to Singapore",
    src: u("1687861717577-8ff74dd61a47"),
    alt: "Johor Bahru's city centre with tall buildings and busy roads",
  },
  {
    name: "Kuching",
    region: "Sarawak, Borneo",
    tagline:
      "A friendly riverside city on Borneo, with rainforest, wildlife and international campuses nearby.",
    known: ["Engineering", "Environment", "Business", "IT"],
    universities: [
      "Swinburne University of Technology Sarawak",
      "Curtin University Malaysia (Miri)",
      "Universiti Malaysia Sarawak",
    ],
    vibe: "Laid-back, green and great value",
    src: u("1762774365051-add54197be99"),
    alt: "Boats on the Sarawak River in Kuching with the State Assembly building behind",
  },
];

export default function MalaysiaPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Malaysia" accent={ACCENT} cities={cities} />
    </>
  );
}
