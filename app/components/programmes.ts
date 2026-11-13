import { SUBJECTS, type SubjectKey, type University } from "./universitiesData";

/** A URL-friendly slug for a university. */
export const uniSlug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\(.*?\)/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type SubjectInfo = {
  bachelor: string;
  master: string;
  blurb: string;
  careers: string[];
  years: [string[], string[], string[]];
  masterModules: string[];
};

// What each subject area covers. Programme names and modules are typical of English-taught degrees in the field;
// exact titles and modules differ by university.
export const SUBJECT_INFO: Record<SubjectKey, SubjectInfo> = {
  med: {
    bachelor: "Medicine (MD / MBBS)",
    master: "MSc Public Health",
    blurb: "a long, integrated medical degree that combines biomedical science with years of clinical training in hospitals",
    careers: ["Doctor (after licensing)", "Medical researcher", "Public health specialist", "Clinical trials"],
    years: [
      ["Anatomy", "Physiology", "Biochemistry", "Histology", "Medical ethics"],
      ["Pathology", "Pharmacology", "Microbiology", "Clinical skills"],
      ["Internal medicine", "Surgery", "Paediatrics", "Obstetrics & gynaecology", "Clinical rotations"],
    ],
    masterModules: ["Epidemiology", "Biostatistics", "Global health", "Health policy", "Research dissertation"],
  },
  eng: {
    bachelor: "BEng / BSc Engineering",
    master: "MSc Engineering",
    blurb: "maths, physics and design applied to real problems, with labs and team projects from the first year",
    careers: ["Engineer", "Project manager", "R&D specialist", "Consultant"],
    years: [
      ["Engineering mathematics", "Mechanics", "Materials", "Programming", "Design fundamentals"],
      ["Thermodynamics", "Electronics", "Fluid mechanics", "Control systems", "Group design project"],
      ["Specialist modules", "Industry project", "Sustainability in engineering", "Final-year project"],
    ],
    masterModules: ["Advanced engineering analysis", "Systems design", "Research methods", "Specialist electives", "Master's thesis"],
  },
  bus: {
    bachelor: "BSc / BBA Business Administration",
    master: "MSc Management / MBA",
    blurb: "how organisations work, from finance and marketing to strategy and leadership, with real business cases",
    careers: ["Business analyst", "Marketing manager", "Consultant", "Entrepreneur"],
    years: [
      ["Principles of management", "Accounting", "Microeconomics", "Business statistics", "Marketing"],
      ["Corporate finance", "Operations", "Organisational behaviour", "Digital business", "Business law"],
      ["Strategy", "International business", "Elective specialisation", "Capstone or dissertation"],
    ],
    masterModules: ["Strategic management", "Finance for managers", "Leadership", "Data-driven decisions", "Consulting project"],
  },
  cs: {
    bachelor: "BSc Computer Science",
    master: "MSc Computer Science / AI",
    blurb: "programming, algorithms and systems, from software engineering to artificial intelligence",
    careers: ["Software engineer", "Data scientist", "AI engineer", "Cyber security analyst"],
    years: [
      ["Programming", "Discrete mathematics", "Computer systems", "Databases", "Web development"],
      ["Algorithms & data structures", "Software engineering", "Operating systems", "Networks", "Team project"],
      ["Machine learning", "Security", "Specialist electives", "Final-year project"],
    ],
    masterModules: ["Advanced algorithms", "Machine learning", "Distributed systems", "Research seminar", "Master's project"],
  },
  law: {
    bachelor: "LLB / Bachelor of Laws",
    master: "LLM Master of Laws",
    blurb: "the principles of law and justice, legal reasoning and writing, and how law shapes business and society",
    careers: ["Lawyer (after qualifying)", "Legal adviser", "Compliance officer", "Policy analyst"],
    years: [
      ["Legal method", "Constitutional law", "Contract law", "Criminal law", "Legal writing"],
      ["Tort law", "Property law", "EU or international law", "Moot court"],
      ["Jurisprudence", "Commercial law", "Human rights", "Dissertation"],
    ],
    masterModules: ["International law", "Corporate law", "Dispute resolution", "Legal research", "LLM dissertation"],
  },
  arts: {
    bachelor: "BA Arts & Humanities",
    master: "MA Humanities",
    blurb: "history, languages, literature and culture, building strong research, writing and critical-thinking skills",
    careers: ["Writer or editor", "Researcher", "Teacher", "Cultural sector manager"],
    years: [
      ["Critical thinking", "Introduction to history", "Literature", "Academic writing", "Language option"],
      ["Research methods", "Thematic modules", "Cultural studies", "Study abroad or placement"],
      ["Advanced seminars", "Specialist options", "Dissertation"],
    ],
    masterModules: ["Theory and method", "Advanced seminars", "Archival research", "Language or digital humanities", "Master's thesis"],
  },
  sci: {
    bachelor: "BSc Natural Sciences",
    master: "MSc Science",
    blurb: "the core sciences, biology, chemistry and physics, with lots of lab work and research projects",
    careers: ["Research scientist", "Lab analyst", "Data analyst", "Science teacher"],
    years: [
      ["Biology", "Chemistry", "Physics", "Mathematics for scientists", "Lab skills"],
      ["Molecular biology", "Physical chemistry", "Statistics", "Field or lab work"],
      ["Specialist options", "Research project", "Scientific communication"],
    ],
    masterModules: ["Advanced lab techniques", "Specialist modules", "Data analysis", "Research placement", "Master's thesis"],
  },
  health: {
    bachelor: "BSc Nursing / Health Sciences",
    master: "MSc Health Sciences",
    blurb: "caring for patients and communities, combining health science with supervised clinical placements",
    careers: ["Nurse (after registration)", "Health manager", "Physiotherapist", "Public health officer"],
    years: [
      ["Anatomy & physiology", "Foundations of care", "Health psychology", "Clinical skills"],
      ["Pharmacology", "Adult and child health", "Clinical placements", "Evidence-based practice"],
      ["Leadership in care", "Specialist placements", "Research project"],
    ],
    masterModules: ["Advanced practice", "Healthcare quality", "Health economics", "Research methods", "Dissertation"],
  },
  design: {
    bachelor: "BA Architecture & Design",
    master: "MA / MArch Architecture & Design",
    blurb: "creative design studio work, from architecture and urban design to product and digital design",
    careers: ["Architect (after licensing)", "Product designer", "UX designer", "Urban planner"],
    years: [
      ["Design studio", "Drawing and modelling", "History of design", "Digital tools"],
      ["Design studio", "Building technology or materials", "Theory", "Portfolio"],
      ["Major studio project", "Professional practice", "Graduation project"],
    ],
    masterModules: ["Advanced design studio", "Theory and criticism", "Sustainable design", "Professional practice", "Thesis project"],
  },
  soc: {
    bachelor: "BSc Social Sciences",
    master: "MSc Social Sciences",
    blurb: "how people and societies work, through economics, politics, psychology and sociology",
    careers: ["Policy analyst", "Researcher", "Economist", "NGO or public sector officer"],
    years: [
      ["Introduction to economics", "Politics", "Sociology", "Psychology", "Statistics"],
      ["Research methods", "Public policy", "Specialist options", "Data analysis"],
      ["Advanced options", "Internship or project", "Dissertation"],
    ],
    masterModules: ["Advanced theory", "Quantitative methods", "Policy analysis", "Electives", "Master's thesis"],
  },
  agri: {
    bachelor: "BSc Agriculture & Environment",
    master: "MSc Environmental Science",
    blurb: "food, farming and the environment, from soil and plant science to climate and sustainability",
    careers: ["Agronomist", "Environmental consultant", "Sustainability manager", "Food scientist"],
    years: [
      ["Biology", "Soil science", "Ecology", "Chemistry", "Field skills"],
      ["Crop and animal science", "Environmental management", "GIS", "Field course"],
      ["Sustainable systems", "Climate change", "Research project"],
    ],
    masterModules: ["Climate and environment", "Natural resource management", "GIS and remote sensing", "Policy", "Thesis"],
  },
  sea: {
    bachelor: "BSc Maritime / Marine Studies",
    master: "MSc Maritime / Marine Science",
    blurb: "the sea, from navigation, shipping and port operations to marine biology and ocean science",
    careers: ["Ship officer (with certification)", "Port manager", "Marine scientist", "Logistics specialist"],
    years: [
      ["Navigation basics", "Maritime law", "Oceanography", "Mathematics", "Safety at sea"],
      ["Ship operations", "Marine engineering", "Logistics", "Sea training"],
      ["Port management", "Specialist options", "Final project"],
    ],
    masterModules: ["Maritime economics", "Marine environment", "Shipping management", "Research methods", "Master's thesis"],
  },
};

type CountrySpec = { cur: string; b: [number, number]; m: [number, number]; med: [number, number]; yB: number; yM: string; yMed: number };

// Typical yearly international tuition and course lengths, matching the country guides.
const SPEC: Record<string, CountrySpec> = {
  uk: { cur: "£", b: [15000, 38000], m: [16000, 40000], med: [45000, 70000], yB: 3, yM: "1 year", yMed: 5 },
  usa: { cur: "$", b: [25000, 65000], m: [25000, 60000], med: [60000, 90000], yB: 4, yM: "2 years", yMed: 4 },
  canada: { cur: "C$", b: [25000, 60000], m: [20000, 50000], med: [30000, 60000], yB: 4, yM: "1–2 years", yMed: 4 },
  australia: { cur: "A$", b: [25000, 55000], m: [30000, 55000], med: [70000, 95000], yB: 3, yM: "1.5–2 years", yMed: 6 },
  "new-zealand": { cur: "NZ$", b: [22000, 45000], m: [26000, 50000], med: [45000, 90000], yB: 3, yM: "1–2 years", yMed: 6 },
  ireland: { cur: "€", b: [12000, 28000], m: [12000, 30000], med: [45000, 60000], yB: 4, yM: "1 year", yMed: 6 },
  malaysia: { cur: "RM", b: [15000, 50000], m: [20000, 45000], med: [70000, 110000], yB: 3, yM: "1–2 years", yMed: 5 },
  "south-korea": { cur: "₩", b: [4000000, 16000000], m: [8000000, 18000000], med: [8000000, 16000000], yB: 4, yM: "2 years", yMed: 6 },
  romania: { cur: "€", b: [2000, 4500], m: [2500, 5000], med: [7500, 10000], yB: 3, yM: "2 years", yMed: 6 },
  hungary: { cur: "€", b: [3500, 8000], m: [4000, 9000], med: [15000, 18500], yB: 3, yM: "2 years", yMed: 6 },
  malta: { cur: "€", b: [8500, 10800], m: [10800, 18000], med: [14000, 16000], yB: 3, yM: "1–2 years", yMed: 5 },
  cyprus: { cur: "€", b: [6834, 11000], m: [9000, 14000], med: [19000, 25000], yB: 4, yM: "1.5–2 years", yMed: 6 },
  sweden: { cur: "SEK ", b: [80000, 200000], m: [100000, 200000], med: [200000, 295000], yB: 3, yM: "1–2 years", yMed: 6 },
  finland: { cur: "€", b: [10000, 15000], m: [10000, 18000], med: [15000, 25000], yB: 3, yM: "2 years", yMed: 6 },
  norway: { cur: "NOK ", b: [100000, 250000], m: [130000, 300000], med: [150000, 400000], yB: 3, yM: "2 years", yMed: 6 },
  belgium: { cur: "€", b: [900, 9000], m: [900, 9000], med: [4000, 9000], yB: 3, yM: "1–2 years", yMed: 6 },
  spain: { cur: "€", b: [1000, 20000], m: [2000, 40000], med: [5000, 20000], yB: 4, yM: "1–2 years", yMed: 6 },
  italy: { cur: "€", b: [900, 20000], m: [900, 20000], med: [1000, 20000], yB: 3, yM: "2 years", yMed: 6 },
  greece: { cur: "€", b: [1500, 6000], m: [3000, 12000], med: [12000, 15000], yB: 4, yM: "1–2 years", yMed: 6 },
  lithuania: { cur: "€", b: [3000, 6000], m: [3500, 7000], med: [12000, 16000], yB: 4, yM: "1.5–2 years", yMed: 6 },
};

export type Programme = {
  id: string;
  subject: SubjectKey;
  subjectLabel: string;
  title: string;
  level: "Bachelor" | "Master";
  degree: string;
  duration: string;
  fee: string;
  structure: { label: string; modules: string[] }[];
};

const money = (n: number, cur: string) => `${cur}${n.toLocaleString("en-GB")}`;

/** The international programmes we list for a university: one per subject and level it offers. */
export function programmesFor(u: University): Programme[] {
  const s = SPEC[u.country];
  const out: Programme[] = [];
  for (const key of u.subjects) {
    const info = SUBJECT_INFO[key];
    const label = SUBJECTS.find((x) => x.key === key)!.label;
    if (u.levels.includes("Bachelor")) {
      const med = key === "med";
      const years = med ? s.yMed : u.name.includes("Edinburgh") ? 4 : s.yB;
      const [lo, hi] = med ? s.med : s.b;
      out.push({
        id: `${key}-b`,
        subject: key,
        subjectLabel: label,
        title: info.bachelor,
        level: "Bachelor",
        degree: med ? "Integrated medical degree" : "Bachelor's degree",
        duration: `${years} years full-time`,
        fee: `${money(lo, s.cur)}–${money(hi, s.cur)} per year`,
        structure: med
          ? [
              { label: "Years 1–2 · Pre-clinical", modules: info.years[0] },
              { label: "Year 3 · Foundations of disease", modules: info.years[1] },
              { label: `Years 4–${years} · Clinical`, modules: info.years[2] },
            ]
          : info.years.map((m, i) => ({ label: i === 2 && years > 3 ? `Years 3–${years}` : `Year ${i + 1}`, modules: m })),
      });
    }
    if (u.levels.includes("Master") && !(key === "med" && !u.levels.includes("Bachelor"))) {
      out.push({
        id: `${key}-m`,
        subject: key,
        subjectLabel: label,
        title: info.master,
        level: "Master",
        degree: "Master's degree",
        duration: `${s.yM} full-time`,
        fee: `${money(s.m[0], s.cur)}–${money(s.m[1], s.cur)} per year`,
        structure: [
          { label: "Semester 1 · Core", modules: info.masterModules.slice(0, 3) },
          { label: "Semester 2 · Specialisation", modules: info.masterModules.slice(3, 4).concat(["Electives"]) },
          { label: "Final semester · Research", modules: info.masterModules.slice(4) },
        ],
      });
    }
  }
  return out;
}
