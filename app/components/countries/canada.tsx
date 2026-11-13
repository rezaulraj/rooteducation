import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { PARTICLE, pines, range } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#C8372D";

const hero: DestinationHeroConfig = {
  slug: "canada",
  country: "Canada",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0B1C2C 0%, #12324A 45%, #1C4A5E 75%, #23594F 100%)",
  eyebrow: "Welcome · Bienvenue",
  name: "Canada",
  intro:
    "World-class universities, post-graduation work permits and a welcoming, multicultural society, from the Rockies to the Atlantic.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #FFD3C4 45%, #E8574A 100%)",
  accent: "#FFB4A2",
  frame: ["#F5EDE4", "#E8574A"],
  shape: "circle",
  embroidery: {
    colors: ["#E8574A", "#F5EDE4", "#7FC8C0"],
    motifs: ["star", "rhombus", "tree"],
  },
  ornament: (
    <g transform="translate(100 -26)">
      <g data-dh-pop>
        <svg
          x="-13"
          y="-13"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          overflow="visible"
        >
          <path d={PARTICLE.maple} fill="#E8574A" />
        </svg>
      </g>
    </g>
  ),
  photo: {
    id: "1539667547529-84c607280d20",
    aspect: 1.48,
    focus: [0.5, 0.5],
    alt: "Moraine Lake and the Valley of the Ten Peaks in the Canadian Rockies",
  },
  glows: [
    {
      color: "rgba(232,87,74,0.35)",
      className: "-top-40 right-[6%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(64,160,170,0.35)",
      className: "-bottom-40 -left-20 h-[34rem] w-[34rem]",
    },
  ],
  particles: {
    path: PARTICLE.maple,
    colors: ["#D93A2B", "#E8574A", "#F08A4B", "#B8322A"],
    count: 16,
    size: [14, 30],
  },
  land: (
    <>
      <g data-dh-land>
        <path
          d={range([
            [0, 120],
            [160, 60],
            [300, 110],
            [470, 40],
            [640, 120],
            [820, 50],
            [980, 110],
            [1160, 30],
            [1320, 100],
            [1440, 70],
          ])}
          fill="#2C5568"
          opacity="0.6"
        />
      </g>
      <g data-dh-land>
        <path d={pines(190, 90, 34, 5)} fill="#173B3C" />
      </g>
      <g data-dh-land>
        <path d={pines(220, 70, 26, 9)} fill="#0D2626" />
      </g>
    </>
  ),
  final: {
    line: "in the true north",
    copy: "Globally recognised degrees, part-time work while you study and a work permit after you graduate, in one of the world's most welcoming countries.",
    cta: "Plan my move to Canada",
    flag: ["#D52B1E", "#FFFFFF", "#D52B1E"],
  },
  facts: [
    { label: "Capital", value: "Ottawa" },
    { label: "Currency", value: "Canadian dollar" },
    { label: "Languages", value: "English & French" },
    { label: "Universities", value: "95+" },
  ],
};

export const guide: GuideData = {
  country: "Canada",
  accent: ACCENT,
  accentDark: "#5C1712",
  currency: "C$",
  intros: {
    why: "Top-ranked universities, generous work rights and a clear path from study to work, in a safe and diverse country.",
    intakes:
      "Most Canadian universities and colleges take students in September, with smaller intakes in January and May.",
    cost: "Typical yearly tuition for international students, and what a month of student life costs in Canada.",
    jobs: "A study permit lets you work off campus during term, and a Post-Graduation Work Permit lets you stay and work after.",
    scholarships:
      "Universities, provinces and the federal government offer scholarships, mostly merit-based.",
    apply:
      "From choosing a designated institution to arriving in Canada, these are the steps.",
    admission:
      "Requirements vary by institution and programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English or French need certified translations.",
    visa: "International students need a study permit, applied for online with a letter of acceptance and, in most cases, a provincial attestation letter.",
  },
  intakes: [
    {
      title: "Fall intake",
      when: "September",
      months: [9],
      main: true,
      copy: "The main intake, with the widest choice of programmes and most scholarships.",
      apply: "October – March, the year before",
    },
    {
      title: "Winter intake",
      when: "January",
      months: [1],
      copy: "A second intake for many college and some university programmes.",
      apply: "May – September",
    },
    {
      title: "Summer intake",
      when: "May",
      months: [5],
      copy: "A smaller intake, mostly for colleges and selected programmes.",
      apply: "September – January",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "World-class universities",
      copy: "Toronto, McGill and UBC are among the world's best, with many more strong universities and colleges.",
    },
    {
      icon: "passport",
      title: "Post-graduation work",
      copy: "The Post-Graduation Work Permit (PGWP) can last up to 3 years, depending on your programme.",
    },
    {
      icon: "scholarship",
      title: "Work while you study",
      copy: "Work up to 24 hours a week off campus during term, and full-time in scheduled breaks.",
    },
    {
      icon: "compass",
      title: "Path to residence",
      copy: "Canadian study and work experience count towards permanent residence programmes.",
    },
    {
      icon: "document",
      title: "Safe and diverse",
      copy: "A peaceful, multicultural country that welcomes students from every part of the world.",
    },
    {
      icon: "plane",
      title: "Bilingual and outdoorsy",
      copy: "Study in English or French, with mountains, lakes and coastlines to explore.",
    },
  ],
  tuition: [
    { field: "College diplomas", from: 15000, to: 22000 },
    { field: "Bachelor's (arts, business)", from: 25000, to: 45000 },
    { field: "Bachelor's (engineering, science)", from: 30000, to: 60000 },
    { field: "Master's", from: 20000, to: 50000 },
  ],
  living: {
    from: 1600,
    to: 2600,
    items: [
      {
        item: "Accommodation",
        range: "C$800–1,600",
        share: 55,
        note: "Shared or student housing; Toronto and Vancouver cost most",
      },
      {
        item: "Food",
        range: "C$350–550",
        share: 20,
        note: "Groceries and eating out",
      },
      {
        item: "Transport",
        range: "C$80–150",
        share: 5,
        note: "Student transit passes",
      },
      {
        item: "Phone & internet",
        range: "C$60–100",
        share: 5,
        note: "Mobile plan and Wi-Fi",
      },
      {
        item: "Other",
        range: "C$200–300",
        share: 15,
        note: "Books, winter clothes, leisure",
      },
    ],
  },
  work: {
    big: "24",
    unit: "hrs/week",
    copy: "Eligible students can work up to 24 hours a week off campus during regular academic sessions, and full-time during scheduled breaks such as the summer holidays.",
    points: [
      [
        "Popular student jobs",
        "Retail, hospitality, campus jobs, tutoring and customer service.",
      ],
      [
        "In-demand fields",
        "Healthcare, technology, engineering, skilled trades and education.",
      ],
      [
        "Co-op programmes",
        "Many programmes include paid work terms with Canadian employers.",
      ],
      [
        "After you graduate",
        "A PGWP of up to 3 years, which can lead to permanent residence.",
      ],
    ],
  },
  scholarships: [
    {
      title: "University entrance scholarships",
      who: "New international students",
      covers: [
        "One-off or renewable awards",
        "Often C$1,000–20,000",
        "Some automatic with your offer",
      ],
      when: "Usually with your application",
    },
    {
      title: "Vanier & Banting",
      who: "PhD and postdoctoral researchers",
      covers: [
        "Vanier: C$50,000 a year for 3 years",
        "Highly competitive, nominated by universities",
      ],
      when: "Autumn deadlines through your university",
    },
    {
      title: "Provincial and external awards",
      who: "Varies by province and field",
      covers: [
        "Ontario Graduate Scholarship and others",
        "Research funding for graduate students",
      ],
      when: "Check each province and university",
    },
  ],
  applySteps: [
    {
      title: "Choose a programme",
      copy: "Pick a designated learning institution (DLI) and a programme that fits your goals, grades and budget.",
    },
    {
      title: "Apply to the institution",
      copy: "Apply online with your transcripts, English or French test results and other documents.",
    },
    {
      title: "Receive your letter of acceptance",
      copy: "Accept your offer and pay any deposit required.",
    },
    {
      title: "Get a provincial attestation letter",
      copy: "Most students need a provincial or territorial attestation letter (PAL), which the institution helps arrange.",
    },
    {
      title: "Apply for a study permit",
      copy: "Apply online to IRCC with your acceptance, PAL, proof of funds and documents, then give biometrics.",
    },
    {
      title: "Arrive and enrol",
      copy: "Receive your study permit at the port of entry, then start your programme.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent) with the required grades",
      "Prerequisite subjects such as maths or sciences for some programmes",
      "English proficiency: usually IELTS 6.5 (no band below 6.0), or French for French-language programmes",
      "Personal statement or supplementary application, for some programmes",
      "Portfolio or interview for some programmes",
    ],
    Master: [
      "Bachelor's degree with a strong average (often B or 70%+)",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5–7.0",
      "Statement of purpose and CV",
      "Two or three references; GRE or GMAT for some programmes",
    ],
  },
  documents: [
    "Online application",
    "Passport copy",
    "School / university certificates",
    "Academic transcripts",
    "English or French test results",
    "Statement of purpose",
    "CV (Master)",
    "References",
    "Letter of acceptance",
    "Provincial attestation letter",
    "Proof of funds",
    "Certified translations",
  ],
  visa: {
    stats: [
      [
        "Funds to show",
        "C$22,895",
        "Living costs for a year, plus tuition and travel",
      ],
      ["Work", "24 hrs/wk", "Off campus during term"],
      ["After study", "Up to 3 yrs", "Post-Graduation Work Permit"],
    ],
    steps: [
      "Get your letter of acceptance and provincial attestation letter.",
      "Gather proof of funds, such as bank statements or a GIC.",
      "Apply online to IRCC and pay the fees.",
      "Give your biometrics and do a medical exam if asked.",
      "Receive your approval and collect your study permit on arrival.",
    ],
    documents: [
      "Passport",
      "Letter of acceptance",
      "Provincial attestation letter",
      "Proof of funds",
      "Language test results",
      "Statement of purpose",
      "Medical exam, if required",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2025–26 university, IRCC and student-guide information. Tuition varies widely by institution and programme, and study permit rules, caps and the funds you must show are set by Immigration, Refugees and Citizenship Canada and change often. Always confirm current requirements with your institution and IRCC before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Toronto",
    region: "Ontario",
    tagline:
      "Canada's largest and most diverse city, a global hub for finance, tech and culture on the shores of Lake Ontario.",
    known: ["Business", "Engineering", "Medicine", "Computer science"],
    universities: [
      "University of Toronto",
      "Toronto Metropolitan University",
      "York University",
      "Humber and Seneca colleges",
    ],
    vibe: "Big, diverse and full of opportunities",
    src: u("1507992781348-310259076fe0"),
    alt: "The Toronto skyline and CN Tower across Lake Ontario at sunset",
  },
  {
    name: "Vancouver",
    region: "British Columbia",
    tagline:
      "A Pacific coast city between mountains and ocean, known for its green spaces, film industry and tech scene.",
    known: ["Film", "Technology", "Forestry", "Business"],
    universities: [
      "University of British Columbia",
      "Simon Fraser University",
      "British Columbia Institute of Technology",
    ],
    vibe: "Outdoorsy, mild and beautiful",
    src: u("1647655806923-e8202f4f2b8c"),
    alt: "Aerial view of False Creek and the Vancouver skyline at golden hour",
  },
  {
    name: "Montréal",
    region: "Québec",
    tagline:
      "A bilingual, creative city with a European feel, often ranked among the world's best cities for students.",
    known: ["Medicine", "Engineering", "AI", "Arts"],
    universities: [
      "McGill University",
      "Concordia University",
      "Université de Montréal",
    ],
    vibe: "Affordable, artsy and full of festivals",
    src: u("1519178251-5390a0fb6a3f"),
    alt: "The Old Port of Montréal and the St Lawrence River at dusk",
  },
  {
    name: "Ottawa",
    region: "Ontario",
    tagline:
      "Canada's capital, home to Parliament Hill, national museums and a growing tech sector.",
    known: ["Public policy", "Engineering", "Law", "Computer science"],
    universities: [
      "University of Ottawa",
      "Carleton University",
      "Algonquin College",
    ],
    vibe: "Calm, bilingual and green",
    src: u("1578973615934-8d9cdb0792b4"),
    alt: "The Canadian flag in front of the Peace Tower on Parliament Hill, Ottawa",
  },
];

export default function CanadaPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Canada" accent={ACCENT} cities={cities} />
    </>
  );
}
