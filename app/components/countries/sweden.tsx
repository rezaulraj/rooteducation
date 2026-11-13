import CountryCities, { type City } from "../CountryCities";
import CountryGuide, { type GuideData } from "../CountryGuide";
import DestinationHero, {
  type DestinationHeroConfig,
} from "../DestinationHero";
import { PARTICLE, pines, waves } from "../heroBits";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;
const ACCENT = "#1B5FA8";

const hero: DestinationHeroConfig = {
  slug: "sweden",
  country: "Sweden",
  theme: "dark",
  background:
    "linear-gradient(180deg, #0B1A33 0%, #13305A 45%, #1C4A7A 75%, #2C6A92 100%)",
  eyebrow: "Välkommen till Sverige",
  eyebrowLang: "sv",
  name: "Sweden",
  intro:
    "Innovative universities, student-centred teaching and a society built on equality and sustainability.",
  gradient: "linear-gradient(100deg, #FFFFFF 0%, #FFE38A 50%, #FECC02 100%)",
  accent: "#FFE38A",
  frame: ["#EEF4FF", "#FECC02"],
  shape: "pill",
  embroidery: {
    colors: ["#FECC02", "#EEF4FF", "#6FA8FF"],
    motifs: ["star", "tree", "rhombus"],
  },
  ornament: (
    <g transform="translate(100 -26)">
      <g data-dh-pop>
        {/* Three crowns, from the Swedish coat of arms */}
        {[-14, 0, 14].map((x) => (
          <path
            key={x}
            transform={`translate(${x} ${x === 0 ? -4 : 0})`}
            d="M-5 4H5L6-3L3 0L0-5L-3 0L-6-3Z"
            fill="#FECC02"
          />
        ))}
      </g>
    </g>
  ),
  photo: {
    id: "1588653818221-2651ec1a6423",
    aspect: 1.5,
    focus: [0.48, 0.5],
    alt: "Riddarholmen Church and Stockholm's waterfront on a sunny day",
  },
  glows: [
    {
      color: "rgba(254,204,2,0.28)",
      className: "-top-40 right-[8%] h-[30rem] w-[30rem]",
    },
    {
      color: "rgba(120,180,255,0.3)",
      className: "-bottom-40 -left-20 h-[32rem] w-[32rem]",
    },
  ],
  particles: {
    path: PARTICLE.dot,
    colors: ["#FFFFFF", "#E6F2FF"],
    count: 26,
    size: [4, 9],
    speed: 0.6,
    spin: false,
  },
  land: (
    <>
      <g data-dh-land>
        <path d={pines(150, 80, 30, 21)} fill="#1F4870" opacity="0.7" />
      </g>
      <g data-dh-land>
        <path d={pines(185, 70, 24, 33)} fill="#14304E" />
      </g>
      <g data-dh-land>
        <path d={waves(205, 6, 160)} fill="#0C1F36" />
      </g>
    </>
  ),
  final: {
    line: "the Swedish way",
    copy: "Creative, team-based learning, world-famous innovation and a society that puts balance and sustainability first.",
    cta: "Plan my move to Sweden",
    flag: ["#006AA7", "#FECC02", "#006AA7"],
  },
  facts: [
    { label: "Capital", value: "Stockholm" },
    { label: "Currency", value: "Swedish krona" },
    { label: "Language", value: "Swedish (English widely spoken)" },
    { label: "In the EU", value: "Since 1995" },
  ],
};

export const guide: GuideData = {
  country: "Sweden",
  accent: ACCENT,
  accentDark: "#0B2B52",
  currency: "SEK ",
  intros: {
    why: "Study at innovative universities, in English, in one of the world's most progressive and sustainable countries.",
    intakes:
      "Most programmes start in late August, with some starting in January.",
    cost: "Typical yearly tuition for non-EU students, and what a month of student life costs in Sweden.",
    jobs: "Students can work alongside their studies, and graduates can stay to look for work.",
    scholarships:
      "The Swedish Institute and universities offer scholarships covering tuition and living costs.",
    apply:
      "Most applications go through one national website, University Admissions in Sweden.",
    admission:
      "Requirements vary by programme. These are the usual ones for international applicants.",
    documents:
      "Prepare these for your application. Documents not in English or Swedish need certified translations.",
    visa: "Non-EU students need a residence permit for studies from the Swedish Migration Agency, applied for online after paying the first tuition instalment.",
  },
  intakes: [
    {
      title: "Autumn semester",
      when: "August",
      months: [8],
      main: true,
      copy: "The main intake, with almost every bachelor's and master's programme open.",
      apply: "October – mid-January",
    },
    {
      title: "Spring semester",
      when: "January",
      months: [1],
      copy: "A smaller intake with a limited choice of programmes.",
      apply: "June – mid-August",
    },
  ],
  reasons: [
    {
      icon: "university",
      title: "Innovative universities",
      copy: "Lund, KTH, Uppsala and Karolinska rank among the world's best.",
    },
    {
      icon: "compass",
      title: "Student-centred teaching",
      copy: "Small groups, open debate and project work with real companies.",
    },
    {
      icon: "document",
      title: "English everywhere",
      copy: "Over 1,000 English-taught programmes, and almost everyone speaks English.",
    },
    {
      icon: "scholarship",
      title: "Home of big ideas",
      copy: "Spotify, IKEA, Volvo and Ericsson all began here.",
    },
    {
      icon: "passport",
      title: "Stay after graduating",
      copy: "Graduates can apply to stay up to 12 months to look for work or start a business.",
    },
    {
      icon: "plane",
      title: "Nature and balance",
      copy: "Right of public access to nature, long summer days and a healthy work-life balance.",
    },
  ],
  tuition: [
    { field: "Humanities & social sciences", from: 80000, to: 140000 },
    { field: "Business & economics", from: 100000, to: 180000 },
    { field: "Engineering & technology", from: 120000, to: 200000 },
    { field: "Medicine & art", from: 200000, to: 295000 },
  ],
  living: {
    from: 10656,
    to: 14000,
    items: [
      {
        item: "Accommodation",
        range: "SEK 4,500–7,000",
        share: 50,
        note: "Student corridor or shared flat",
      },
      {
        item: "Food",
        range: "SEK 2,500–3,500",
        share: 25,
        note: "Groceries and fika",
      },
      {
        item: "Transport",
        range: "SEK 400–650",
        share: 5,
        note: "Student travel cards",
      },
      {
        item: "Phone & internet",
        range: "SEK 250–400",
        share: 3,
        note: "Often included in housing",
      },
      {
        item: "Other",
        range: "SEK 1,500–2,500",
        share: 17,
        note: "Clothes, leisure, travel",
      },
    ],
  },
  work: {
    big: "15",
    unit: "hrs/week",
    copy: "Bachelor's and master's students whose residence permit was granted on or after 11 June 2026 can work up to 15 hours a week during their studies. Permits granted earlier may have different conditions.",
    points: [
      [
        "Popular student jobs",
        "Cafés, retail, tutoring, warehouses and campus jobs.",
      ],
      [
        "In-demand fields",
        "Tech, engineering, life sciences, sustainability and healthcare.",
      ],
      [
        "After you graduate",
        "Apply for a permit of up to 12 months to look for work or start a business.",
      ],
      ["Longer term", "With a job offer, you can switch to a work permit."],
    ],
  },
  scholarships: [
    {
      title: "Swedish Institute Scholarships for Global Professionals",
      who: "Master's students from eligible countries",
      covers: [
        "Full tuition fees",
        "Monthly living allowance",
        "Travel grant and insurance",
      ],
      when: "Usually February – March for the autumn intake",
    },
    {
      title: "University tuition scholarships",
      who: "Non-EU students",
      covers: ["25%–100% of tuition", "Offered by almost every university"],
      when: "Usually alongside your January application",
    },
    {
      title: "Research and PhD positions",
      who: "Doctoral students",
      covers: ["PhD positions are paid jobs with a salary", "No tuition fees"],
      when: "Advertised through the year",
    },
  ],
  applySteps: [
    {
      title: "Choose programmes",
      copy: "Choose up to four master's (or eight bachelor's) programmes on universityadmissions.se.",
    },
    {
      title: "Apply and pay the fee",
      copy: "Apply online by mid-January and pay the SEK 900 application fee.",
    },
    {
      title: "Upload your documents",
      copy: "Upload your transcripts, degree, passport and English results by early February.",
    },
    {
      title: "Get your admission results",
      copy: "Results come out in late March or early April. Accept your place.",
    },
    {
      title: "Pay tuition and apply for a permit",
      copy: "Pay the first tuition instalment and apply online for your residence permit.",
    },
    {
      title: "Arrive and register",
      copy: "Travel, collect your residence permit card and register with the Tax Agency if staying a year or more.",
    },
  ],
  admission: {
    Bachelor: [
      "Secondary school-leaving certificate (HSC / A-levels or equivalent)",
      "Specific subject requirements, such as maths or physics, for some programmes",
      "English proficiency: equivalent to Swedish 'English 6' (usually IELTS 6.5, no band below 5.5)",
      "Swedish for Swedish-taught programmes",
      "Portfolios or tests for some programmes",
    ],
    Master: [
      "Bachelor's degree of at least 180 ECTS (or equivalent) in a related field",
      "Bachelor's transcripts",
      "English proficiency: usually IELTS 6.5 (no band below 5.5)",
      "Statement of purpose and CV, for many programmes",
      "References or a portfolio, for some programmes",
    ],
  },
  documents: [
    "University Admissions application",
    "Passport copy",
    "Degree certificate",
    "Transcripts",
    "English test results",
    "Statement of purpose",
    "CV",
    "References",
    "Proof of tuition payment",
    "Proof of funds",
    "Health insurance",
    "Certified translations",
  ],
  visa: {
    stats: [
      ["Funds to show", "SEK 10,656", "Per month, for applications in 2026"],
      ["Permit fee", "SEK 1,500", "Online application, approximately"],
      ["After study", "Up to 12 mo", "Permit to look for work"],
    ],
    steps: [
      "Accept your place and pay the first tuition instalment.",
      "Prepare proof of funds and health insurance.",
      "Apply online to the Swedish Migration Agency.",
      "Visit the embassy for fingerprints and photo.",
      "Receive your residence permit card and travel.",
    ],
    documents: [
      "Passport",
      "Letter of admission",
      "Proof of tuition payment",
      "Proof of funds",
      "Comprehensive health insurance (under 1 year)",
      "Online application",
      "Passport copy",
    ],
  },
  disclaimer:
    "Figures are indicative, based on 2026 university, Swedish Migration Agency and student-guide information. Tuition varies by university and programme, and permit fees, funds requirements and work rules are set by the Swedish Migration Agency and change over time (the work-hours rule changed in June 2026). Always confirm current requirements with your university and the Swedish Migration Agency before applying. Our advisors can check the latest details for you.",
};

const cities: City[] = [
  {
    name: "Stockholm",
    region: "East coast",
    tagline:
      "Sweden's beautiful capital, spread over 14 islands, and a world-leading hub for tech start-ups and design.",
    known: ["Medicine", "Engineering", "Business", "Design"],
    universities: [
      "Karolinska Institutet",
      "KTH Royal Institute of Technology",
      "Stockholm University",
      "Stockholm School of Economics",
    ],
    vibe: "Stylish, green and full of start-ups",
    src: u("1508189860359-777d945909ef"),
    alt: "Gamla Stan and Stockholm's waterfront at dawn",
  },
  {
    name: "Gothenburg",
    region: "West coast",
    tagline:
      "A friendly harbour city and Sweden's industrial heart, home to Volvo, with an archipelago on its doorstep.",
    known: ["Engineering", "Automotive", "Marine science", "Business"],
    universities: [
      "Chalmers University of Technology",
      "University of Gothenburg",
    ],
    vibe: "Relaxed, creative and coastal",
    src: u("1548194128-2e8440ccd6d7"),
    alt: "A canal lined with buildings in central Gothenburg",
  },
  {
    name: "Lund",
    region: "Skåne · South",
    tagline:
      "A classic student town with one of Scandinavia's oldest universities, close to Malmö and Copenhagen.",
    known: ["Science", "Engineering", "Law", "Medicine"],
    universities: ["Lund University"],
    vibe: "A true student town, with student 'nations' and traditions",
    src: u("1572225303717-a96db5e8d8b0"),
    alt: "A street with Swedish flags in a Swedish town centre",
  },
  {
    name: "Uppsala",
    region: "East · Uppland",
    tagline:
      "A historic university city with Scandinavia's largest cathedral and Sweden's oldest university, founded in 1477.",
    known: ["Life sciences", "Pharmacy", "Theology", "Peace studies"],
    universities: [
      "Uppsala University",
      "Swedish University of Agricultural Sciences (SLU)",
    ],
    vibe: "Historic, green and very studenty",
    src: u("1553106789-988f8d3c366f"),
    alt: "Uppsala Cathedral beside the Fyris river",
  },
];

export default function SwedenPage() {
  return (
    <>
      <DestinationHero c={hero} />
      <CountryGuide data={guide} />
      <CountryCities country="Sweden" accent={ACCENT} cities={cities} />
    </>
  );
}
