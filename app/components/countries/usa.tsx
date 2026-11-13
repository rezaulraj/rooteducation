import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { skyline, star } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#2B4C9B";

const hero: DestinationHeroConfig = {
  slug: "usa",
  country: "the USA",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0A1230 0%, #18265A 45%, #3A2E6A 75%, #7A3E5E 100%)",
  eyebrow: "The land of opportunity",
  name: "the USA",
  intro:
    "The world's largest choice of universities, flexible degrees and work experience through OPT, from New York to California.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #C9D6FF 45%, #FF8C8C 100%)",
  accent: "#C9D6FF",
  frame: ["#F3F5FF", "#FF7A7A"],
  shape: "arch",
  embroidery: {
    colors: ["#FF7A7A", "#F3F5FF", "#8FB0FF"],
    motifs: ["star", "rhombus"],
  },
  ornament: (
    <g>
      {[-30, 0, 30].map((dx, i) => (
        <g key={dx} transform={`translate(${100 + dx} ${i === 1 ? -26 : -16})`}>
          <g data-dh-pop>
            <path d={star(0, 0, i === 1 ? 10 : 7, 5)} fill="#F3F5FF" />
          </g>
        </g>
      ))}
    </g>
  ),
  photo: {
    id: "1485871981521-5b1fd3805eee",
    aspect: 1.5,
    focus: [0.62, 0.42],
    alt: "The Empire State Building and Manhattan skyline at sunset",
  },
  glows: [
    {
      color: "rgba(255,122,122,0.35)",
      className: "-bottom-40 right-[10%] h-[32rem] w-[32rem]",
    },
    {
      color: "rgba(120,150,255,0.35)",
      className: "-top-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  decor: (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-x-0 top-0 h-[60%] w-full"
    >
      {Array.from({ length: 40 }, (_, i) => (
        <circle
          key={i}
          data-dh-twinkle
          cx={(i * 37) % 100}
          cy={(i * 23) % 55}
          r={0.12 + (i % 3) * 0.06}
          fill="#fff"
        />
      ))}
    </svg>
  ),
  land: (
    <>
      <g data-dh-land>
        <path d={skyline(150, 110, 11, 40)} fill="#2E2C5E" opacity="0.7" />
      </g>
      <g data-dh-land>
        <path d={skyline(195, 130, 4, 30)} fill="#1A1A3E" />
      </g>
      <g data-dh-land>
        <path d="M0 210H1440V220H0Z" fill="#0E0E26" />
      </g>
    </>
  ),
  final: {
    line: "made in America",
    copy: "Flexible degrees, world-leading research and up to three years of practical training after you graduate in a STEM field.",
    cta: "Plan my move to the USA",
    flag: ["#B22234", "#FFFFFF", "#3C3B6E"],
  },
  facts: [
    { label: "Capital", value: "Washington, D.C." },
    { label: "Currency", value: "US dollar" },
    { label: "Language", value: "English" },
    { label: "Universities", value: "4,000+" },
  ],
};

export const guide: GuideData = {
  country: "the USA",
  accent: ACCENT,
  accentDark: "#14234D",
  currency: "$",
  intros: {
    why: "The widest choice of universities in the world, flexible degrees and strong links between study and industry.",
    intakes:
      "Most US universities admit international students in the fall, with a smaller spring intake.",
    cost: "Typical yearly tuition for international students, and what a month of student life costs in the US.",
    jobs: "F-1 students can work on campus during study, and gain practical experience through CPT and OPT.",
    scholarships:
      "US universities offer generous merit scholarships and, for graduate students, paid assistantships.",
    apply:
      "From shortlisting universities to your visa interview, these are the steps.",
    admission:
      "Requirements vary by university. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English need certified translations.",
    visa: "International students need an F-1 visa, applied for with the I-20 form from a SEVP-certified university.",
  },
  intakes: [
    {
      title: "Fall intake",
      when: "Aug – Sep",
      months: [8, 9],
      main: true,
      copy: "The main intake, with every programme open and the most scholarships and assistantships.",
      apply: "November – February",
    },
    {
      title: "Spring intake",
      when: "January",
      months: [1],
      copy: "A second intake at many universities, especially for master's programmes.",
      apply: "August – October",
    },
    {
      title: "Summer intake",
      when: "May – June",
      months: [5, 6],
      copy: "A small intake for selected programmes and short courses.",
      apply: "December – February",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "World-leading universities",
      copy: "More universities in the world's top 100 than any other country, from the Ivy League to great state universities.",
    },
    {
      icon: "compass",
      title: "Flexible degrees",
      copy: "Explore subjects before choosing a major, and combine majors and minors.",
    },
    {
      icon: "passport",
      title: "OPT work experience",
      copy: "12 months of Optional Practical Training, plus 24 more for STEM graduates.",
    },
    {
      icon: "scholarship",
      title: "Scholarships and assistantships",
      copy: "Merit awards for undergraduates; teaching and research assistantships for graduate students.",
    },
    {
      icon: "document",
      title: "Research and innovation",
      copy: "Study where the world's biggest tech, health and research breakthroughs happen.",
    },
    {
      icon: "plane",
      title: "Diverse campus life",
      copy: "Over a million international students, in big cities, college towns and everything between.",
    },
  ],
  tuition: [
    { field: "Community college", from: 8000, to: 15000 },
    { field: "Public university (bachelor's)", from: 25000, to: 45000 },
    { field: "Private university (bachelor's)", from: 40000, to: 65000 },
    { field: "Master's", from: 25000, to: 60000 },
  ],
  living: {
    from: 1500,
    to: 2600,
    items: [
      {
        item: "Accommodation",
        range: "$700–1,500",
        share: 55,
        note: "Dorm or shared apartment; big cities cost most",
      },
      {
        item: "Food",
        range: "$350–550",
        share: 20,
        note: "Meal plans or groceries",
      },
      {
        item: "Health insurance",
        range: "$100–250",
        share: 8,
        note: "Usually required by your university",
      },
      {
        item: "Transport",
        range: "$50–120",
        share: 5,
        note: "Often free on campus",
      },
      {
        item: "Other",
        range: "$150–250",
        share: 12,
        note: "Books, phone, leisure",
      },
    ],
  },
  work: {
    big: "20",
    unit: "hrs/week",
    copy: "F-1 students can work on campus up to 20 hours a week during term and full-time in breaks. Off-campus work is through Curricular Practical Training (CPT) or Optional Practical Training (OPT).",
    points: [
      [
        "Popular student jobs",
        "Campus dining, libraries, labs, tutoring and student services.",
      ],
      [
        "Curricular Practical Training",
        "Paid internships that are part of your programme.",
      ],
      [
        "Optional Practical Training",
        "12 months of work after graduating, plus 24 months more for STEM degrees.",
      ],
      [
        "Longer term",
        "Employers can sponsor you for an H-1B or other work visa.",
      ],
    ],
  },
  scholarships: [
    {
      title: "University merit scholarships",
      who: "Undergraduates with strong grades",
      covers: [
        "Partial to full tuition",
        "Often renewable each year",
        "Many considered automatically",
      ],
      when: "With your application",
    },
    {
      title: "Graduate assistantships",
      who: "Master's and PhD students",
      covers: [
        "Tuition waiver",
        "Monthly stipend for teaching or research work",
      ],
      when: "With your graduate application",
    },
    {
      title: "Fulbright Foreign Student Program",
      who: "Graduate students from many countries",
      covers: ["Tuition, living costs and travel", "Run through US embassies"],
      when: "Usually opens a year before you start",
    },
  ],
  applySteps: [
    {
      title: "Shortlist universities",
      copy: "Choose a mix of universities that fit your goals, grades and budget.",
    },
    {
      title: "Take your tests",
      copy: "Take IELTS, TOEFL or Duolingo, and the SAT, ACT, GRE or GMAT if your universities ask for them.",
    },
    {
      title: "Apply online",
      copy: "Apply through the Common App or each university's portal, with essays and recommendations.",
    },
    {
      title: "Receive your offer and I-20",
      copy: "Accept an offer, show your funds, and receive your Form I-20.",
    },
    {
      title: "Pay the SEVIS fee and apply for the visa",
      copy: "Pay the I-901 SEVIS fee, complete the DS-160 and book your visa interview.",
    },
    {
      title: "Attend your interview and travel",
      copy: "Attend your interview at the US embassy, then arrive up to 30 days before your programme starts.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent) with strong grades",
      "English proficiency: usually IELTS 6.5, TOEFL 80 or Duolingo 110+",
      "SAT or ACT scores, where required (many universities are test-optional)",
      "Personal essays and recommendation letters",
      "Extracurricular activities and achievements",
    ],
    Master: [
      "Bachelor's degree, usually 16 years of education",
      "Bachelor's transcripts, sometimes evaluated by WES",
      "English proficiency: usually IELTS 6.5–7.0 or TOEFL 90+",
      "GRE or GMAT, where required",
      "Statement of purpose, CV and two or three recommendations",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "Academic transcripts",
    "Certificates",
    "English test scores",
    "SAT/ACT or GRE/GMAT scores",
    "Essays or statement of purpose",
    "Recommendation letters",
    "CV (Master)",
    "Bank statements",
    "Form I-20",
    "DS-160 confirmation",
  ],
  visa: {
    stats: [
      ["Visa fee", "$185", "MRV application fee"],
      ["SEVIS fee", "$350", "I-901 fee for F-1 students"],
      ["After study", "Up to 3 yrs", "OPT, including the STEM extension"],
    ],
    steps: [
      "Accept your offer and receive your I-20.",
      "Pay the I-901 SEVIS fee.",
      "Complete the DS-160 form and pay the visa fee.",
      "Attend your interview with your documents and proof of funds.",
      "Travel up to 30 days before your programme starts.",
    ],
    documents: [
      "Passport",
      "Form I-20",
      "DS-160 confirmation",
      "SEVIS fee receipt",
      "Visa fee receipt",
      "Proof of funds",
      "Academic documents and test scores",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, US government and student-guide information. Tuition varies widely between public and private universities, and visa fees, interview rules and work options are set by the US government and change over time (a new visa integrity fee may also apply). Always confirm current requirements with your university and the US embassy before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "New York",
    region: "New York · East Coast",
    tagline:
      "The city that never sleeps, a world centre for finance, media, art and fashion, with dozens of universities.",
    known: ["Business", "Finance", "Media", "Arts"],
    universities: [
      "Columbia University",
      "New York University (NYU)",
      "City University of New York (CUNY)",
      "Fordham University",
    ],
    vibe: "Fast, iconic and full of internships",
    src: u("1496588152823-86ff7695e68f"),
    alt: "The Brooklyn Bridge leading towards the Manhattan skyline",
  },
  {
    name: "Boston",
    region: "Massachusetts · New England",
    tagline:
      "America's college town, home to some of the world's most famous universities and a booming biotech scene.",
    known: ["Medicine", "Engineering", "Biotech", "Law"],
    universities: [
      "Harvard University",
      "Massachusetts Institute of Technology (MIT)",
      "Boston University",
      "Northeastern University",
    ],
    vibe: "Historic, academic and walkable",
    src: u("1565127803082-69dd82351360"),
    alt: "The Boston skyline across the Charles River on a sunny day",
  },
  {
    name: "San Francisco Bay Area",
    region: "California · West Coast",
    tagline:
      "The heart of the tech world, from Silicon Valley start-ups to the Golden Gate Bridge.",
    known: ["Computer science", "Engineering", "Business", "Design"],
    universities: [
      "Stanford University",
      "University of California, Berkeley",
      "San José State University",
    ],
    vibe: "Innovative, sunny and entrepreneurial",
    src: u("1521747116042-5a810fda9664"),
    alt: "The Golden Gate Bridge over San Francisco Bay",
  },
  {
    name: "Chicago",
    region: "Illinois · Midwest",
    tagline:
      "A great lakeside city of architecture, business and food, with strong universities and lower costs than the coasts.",
    known: ["Economics", "Business", "Engineering", "Architecture"],
    universities: [
      "University of Chicago",
      "Northwestern University",
      "University of Illinois Chicago",
      "DePaul University",
    ],
    vibe: "Big-city life with Midwest friendliness",
    src: u("1714662660476-022bfd34cf44"),
    alt: "Aerial view of Chicago beside Lake Michigan",
  },
];

export default function USAPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="the USA" accent={ACCENT} cities={cities} />
    </>
  );
}
