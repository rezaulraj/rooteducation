// The university directory: well-known universities in each of our 20 destinations.
// Subjects and levels are broad guides; programme lists change every year.

export type SubjectKey = "med" | "eng" | "bus" | "cs" | "law" | "arts" | "sci" | "health" | "design" | "soc" | "agri" | "sea";
export type Level = "Bachelor" | "Master" | "PhD";

export const SUBJECTS: { key: SubjectKey; label: string; icon: string }[] = [
  { key: "med", label: "Medicine", icon: "M12 4v16M4 12h16" },
  { key: "eng", label: "Engineering", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" },
  { key: "bus", label: "Business", icon: "M3 8h18v12H3zM9 8V5h6v3M3 13h18" },
  { key: "cs", label: "Computer Science", icon: "M4 5h16v11H4zM2 19h20M9 9l-2 2 2 2M15 9l2 2-2 2" },
  { key: "law", label: "Law", icon: "M12 3v18M5 7h14M5 7l-3 7h6zM19 7l-3 7h6zM8 21h8" },
  { key: "arts", label: "Arts & Humanities", icon: "M4 19V5l8 3 8-3v14l-8 3z M12 8v14" },
  { key: "sci", label: "Sciences", icon: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" },
  { key: "health", label: "Health & Nursing", icon: "M12 21s-8-5-8-11a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 6-8 11-8 11Z" },
  { key: "design", label: "Design & Architecture", icon: "M3 21l6-6M14 4l6 6-9 9H5v-6z" },
  { key: "soc", label: "Social Sciences", icon: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 3-5 6-5s6 2 6 5M14 15c3 0 8 1 8 5" },
  { key: "agri", label: "Agriculture & Environment", icon: "M12 21V11M12 11C12 6 8 3 4 3c0 5 4 8 8 8ZM12 13c0-4 3-7 8-7 0 4-3 7-8 7Z" },
  { key: "sea", label: "Maritime & Marine", icon: "M3 17c3 2 6 2 9 0s6-2 9 0M6 14l1-6h10l1 6M12 8V3l5 3" },
];

export type CountryInfo = { slug: string; name: string; code: string; accent: string };

export const COUNTRIES: CountryInfo[] = [
  { slug: "uk", name: "UK", code: "gb", accent: "#22408F" },
  { slug: "usa", name: "USA", code: "us", accent: "#2B4C9B" },
  { slug: "canada", name: "Canada", code: "ca", accent: "#C8372D" },
  { slug: "australia", name: "Australia", code: "au", accent: "#3A3F9E" },
  { slug: "new-zealand", name: "New Zealand", code: "nz", accent: "#1E7A6A" },
  { slug: "ireland", name: "Ireland", code: "ie", accent: "#169B62" },
  { slug: "malaysia", name: "Malaysia", code: "my", accent: "#0F7A6C" },
  { slug: "south-korea", name: "South Korea", code: "kr", accent: "#C8325A" },
  { slug: "romania", name: "Romania", code: "ro", accent: "#B3132B" },
  { slug: "hungary", name: "Hungary", code: "hu", accent: "#2E7D4F" },
  { slug: "malta", name: "Malta", code: "mt", accent: "#0A8A9C" },
  { slug: "cyprus", name: "Cyprus", code: "cy", accent: "#B5541C" },
  { slug: "sweden", name: "Sweden", code: "se", accent: "#1B5FA8" },
  { slug: "finland", name: "Finland", code: "fi", accent: "#1F5AA6" },
  { slug: "norway", name: "Norway", code: "no", accent: "#B5303A" },
  { slug: "belgium", name: "Belgium", code: "be", accent: "#B8860B" },
  { slug: "spain", name: "Spain", code: "es", accent: "#C2410C" },
  { slug: "italy", name: "Italy", code: "it", accent: "#B5482A" },
  { slug: "greece", name: "Greece", code: "gr", accent: "#1D5FAF" },
  { slug: "lithuania", name: "Lithuania", code: "lt", accent: "#0E7A4E" },
];

export type University = {
  name: string;
  country: string;
  city: string;
  type: "Public" | "Private";
  subjects: SubjectKey[];
  levels: Level[];
  note: string;
  partner?: { logo: string };
};

const ALL: Level[] = ["Bachelor", "Master", "PhD"];
const BM: Level[] = ["Bachelor", "Master"];

const u = (name: string, country: string, city: string, type: University["type"], subjects: SubjectKey[], levels: Level[], note: string, partner?: University["partner"]): University => ({ name, country, city, type, subjects, levels, note, partner });

export const UNIVERSITIES: University[] = [
  // UK
  u("University of Oxford", "uk", "Oxford", "Public", ["med", "law", "arts", "sci", "soc"], ALL, "The English-speaking world's oldest university, taught through its famous college tutorials."),
  u("Imperial College London", "uk", "London", "Public", ["eng", "med", "sci", "bus", "cs"], ALL, "A science, engineering, medicine and business specialist in South Kensington."),
  u("University College London (UCL)", "uk", "London", "Public", ["arts", "med", "law", "design", "soc"], ALL, "A large research university in central London with a wide choice of subjects."),
  u("The University of Manchester", "uk", "Manchester", "Public", ["eng", "bus", "cs", "med", "sci"], ALL, "One of the UK's largest universities, in one of Europe's biggest student cities."),
  u("The University of Edinburgh", "uk", "Edinburgh", "Public", ["cs", "med", "arts", "sci", "law"], ALL, "Scotland's historic capital university, known for informatics and medicine."),
  u("University of Birmingham", "uk", "Birmingham", "Public", ["bus", "eng", "law", "med", "soc"], ALL, "A leafy redbrick campus in the UK's second city."),
  // USA
  u("Massachusetts Institute of Technology (MIT)", "usa", "Cambridge, MA", "Private", ["eng", "cs", "sci", "bus", "design"], ALL, "A world leader in science, engineering and innovation."),
  u("Harvard University", "usa", "Cambridge, MA", "Private", ["law", "med", "bus", "arts", "soc"], ALL, "America's oldest university, with world-famous law, medical and business schools."),
  u("Stanford University", "usa", "Stanford, CA", "Private", ["cs", "eng", "bus", "med", "sci"], ALL, "At the heart of Silicon Valley, known for entrepreneurship and technology."),
  u("New York University (NYU)", "usa", "New York", "Private", ["bus", "arts", "law", "design", "soc"], ALL, "A global university woven into the streets of Manhattan."),
  u("University of Chicago", "usa", "Chicago", "Private", ["bus", "soc", "law", "sci", "arts"], ALL, "Famous for economics and a rigorous core curriculum."),
  // Canada
  u("University of Toronto", "canada", "Toronto", "Public", ["med", "eng", "cs", "bus", "law"], ALL, "Canada's top-ranked university, in its largest and most diverse city."),
  u("University of British Columbia", "canada", "Vancouver", "Public", ["sci", "eng", "agri", "bus", "arts"], ALL, "A beautiful campus between the mountains and the Pacific."),
  u("McGill University", "canada", "Montréal", "Public", ["med", "law", "eng", "sci", "arts"], ALL, "An English-language university in bilingual, creative Montréal."),
  u("University of Waterloo", "canada", "Waterloo", "Public", ["cs", "eng", "sci", "bus"], ALL, "Famous for co-op programmes and computer science."),
  u("University of Ottawa", "canada", "Ottawa", "Public", ["law", "soc", "health", "eng"], ALL, "The world's largest bilingual English–French university."),
  // Australia
  u("University of Melbourne", "australia", "Melbourne", "Public", ["med", "law", "arts", "sci", "bus"], ALL, "Australia's leading research university, in its cultural capital."),
  u("University of Sydney", "australia", "Sydney", "Public", ["med", "law", "bus", "eng", "arts"], ALL, "Australia's first university, with a sandstone campus near the harbour."),
  u("UNSW Sydney", "australia", "Sydney", "Public", ["eng", "cs", "bus", "law", "design"], ALL, "Known for engineering, technology and strong industry links."),
  u("Monash University", "australia", "Melbourne", "Public", ["health", "eng", "bus", "sci", "design"], ALL, "Australia's largest university, with campuses in Melbourne and Malaysia."),
  u("University of Queensland", "australia", "Brisbane", "Public", ["sci", "health", "eng", "agri", "bus"], ALL, "A leading research university in sunny Brisbane."),
  u("University of Western Australia", "australia", "Perth", "Public", ["eng", "sci", "agri", "med"], ALL, "A riverside campus strong in mining, engineering and science."),
  // New Zealand
  u("University of Auckland", "new-zealand", "Auckland", "Public", ["eng", "med", "bus", "law", "design"], ALL, "New Zealand's largest university, in its biggest city."),
  u("University of Otago", "new-zealand", "Dunedin", "Public", ["med", "health", "sci", "law"], ALL, "New Zealand's oldest university and a classic student town."),
  u("Victoria University of Wellington", "new-zealand", "Wellington", "Public", ["law", "soc", "design", "arts"], ALL, "In the capital, strong in law, policy and the creative industries."),
  u("University of Canterbury", "new-zealand", "Christchurch", "Public", ["eng", "sci", "agri", "soc"], ALL, "Known for engineering, close to the Southern Alps."),
  u("Massey University", "new-zealand", "Palmerston North", "Public", ["agri", "design", "bus", "sci"], ALL, "Leading in agriculture, veterinary science, aviation and design."),
  // Ireland
  u("Trinity College Dublin", "ireland", "Dublin", "Public", ["arts", "law", "med", "cs", "sci"], ALL, "Ireland's oldest university, in the heart of Dublin."),
  u("University College Dublin (UCD)", "ireland", "Dublin", "Public", ["bus", "eng", "med", "agri", "law"], ALL, "Ireland's largest university, with a green campus and a top business school."),
  u("University of Galway", "ireland", "Galway", "Public", ["health", "eng", "arts", "sea"], ALL, "On the Atlantic coast, strong in medical devices and marine science."),
  u("University College Cork", "ireland", "Cork", "Public", ["health", "sci", "bus", "law"], ALL, "A friendly campus in Ireland's second city, known for food science and pharmacy."),
  u("University of Limerick", "ireland", "Limerick", "Public", ["eng", "health", "bus", "cs"], ALL, "A riverside campus with a strong work-placement programme."),
  // Malaysia
  u("Universiti Malaya", "malaysia", "Kuala Lumpur", "Public", ["med", "eng", "bus", "law", "sci"], ALL, "Malaysia's oldest and top-ranked university."),
  u("Taylor's University", "malaysia", "Subang Jaya", "Private", ["bus", "design", "health", "cs"], BM, "A leading private university known for hospitality and business."),
  u("Monash University Malaysia", "malaysia", "Bandar Sunway", "Private", ["eng", "bus", "health", "cs"], ALL, "An Australian university campus awarding Monash degrees."),
  u("Universiti Sains Malaysia", "malaysia", "Penang", "Public", ["sci", "eng", "med", "health"], ALL, "A research university on the island of Penang."),
  u("Asia Pacific University (APU)", "malaysia", "Kuala Lumpur", "Private", ["cs", "eng", "bus", "design"], BM, "A tech-focused private university with many international students."),
  // South Korea
  u("Seoul National University", "south-korea", "Seoul", "Public", ["eng", "med", "sci", "soc", "law"], ALL, "Korea's most prestigious national university."),
  u("KAIST", "south-korea", "Daejeon", "Public", ["eng", "cs", "sci"], ALL, "Korea's leading science and technology university, mostly taught in English."),
  u("Yonsei University", "south-korea", "Seoul", "Private", ["bus", "med", "soc", "arts"], ALL, "A top private university with an international college taught in English."),
  u("Korea University", "south-korea", "Seoul", "Private", ["bus", "law", "eng", "soc"], ALL, "A leading private university known for business and law."),
  u("Pusan National University", "south-korea", "Busan", "Public", ["eng", "sea", "sci", "bus"], ALL, "A large national university in Korea's coastal second city."),
  // Romania
  u("Spiru Haret University", "romania", "Bucharest", "Private", ["law", "bus", "soc", "arts", "health"], ALL, "Root Education partner: one of Romania's largest private universities.", { logo: "/univercity/logo_ush.png" }),
  u("Constanța Maritime University", "romania", "Constanța", "Public", ["sea", "eng"], ALL, "Root Education partner: Romania's maritime university on the Black Sea.", { logo: "/univercity/logo_cmu.png" }),
  u("Romanian-American University", "romania", "Bucharest", "Private", ["bus", "law", "cs", "soc"], BM, "Root Education partner: an American-style private university.", { logo: "/univercity/logo_RAU.png" }),
  u("Carol Davila University of Medicine and Pharmacy", "romania", "Bucharest", "Public", ["med", "health"], ALL, "Romania's best-known medical university."),
  u("Babeș-Bolyai University", "romania", "Cluj-Napoca", "Public", ["bus", "sci", "arts", "cs", "soc"], ALL, "Romania's largest university, in the student capital Cluj."),
  // Hungary
  u("Semmelweis University", "hungary", "Budapest", "Public", ["med", "health"], ALL, "Hungary's leading medical university, teaching medicine in English for decades."),
  u("University of Debrecen", "hungary", "Debrecen", "Public", ["med", "eng", "agri", "health"], ALL, "One of Hungary's largest universities, with many international students."),
  u("University of Szeged", "hungary", "Szeged", "Public", ["med", "sci", "law", "cs"], ALL, "A leading research university in a sunny riverside town."),
  u("University of Pécs", "hungary", "Pécs", "Public", ["med", "arts", "bus", "health"], ALL, "Hungary's first university, founded in 1367."),
  u("Eötvös Loránd University (ELTE)", "hungary", "Budapest", "Public", ["sci", "arts", "law", "soc", "cs"], ALL, "Hungary's largest and oldest continuously operating university."),
  // Malta
  u("University of Malta", "malta", "Msida", "Public", ["med", "law", "eng", "arts", "sea"], ALL, "Malta's national university, teaching in English."),
  u("MCAST", "malta", "Paola", "Public", ["eng", "bus", "cs", "design"], BM, "Malta's college of arts, science and technology, with applied degrees."),
  u("American University of Malta", "malta", "Cospicua", "Private", ["bus", "eng", "cs"], BM, "An American-style university in the Grand Harbour."),
  // Cyprus
  u("University of Cyprus", "cyprus", "Nicosia", "Public", ["eng", "sci", "bus", "soc"], ALL, "Cyprus's leading public research university."),
  u("University of Nicosia", "cyprus", "Nicosia", "Private", ["med", "bus", "law", "cs"], ALL, "The island's largest university, known for its English-taught medical school."),
  u("Cyprus University of Technology", "cyprus", "Limassol", "Public", ["eng", "sea", "health", "design"], ALL, "A technology university in the seaside business hub of Limassol."),
  u("European University Cyprus", "cyprus", "Nicosia", "Private", ["med", "health", "bus", "law"], ALL, "A private university with English-taught medicine and health programmes."),
  u("Neapolis University Pafos", "cyprus", "Paphos", "Private", ["design", "law", "soc", "bus"], BM, "A small private university in historic Paphos."),
  // Sweden
  u("Lund University", "sweden", "Lund", "Public", ["sci", "eng", "law", "med", "bus"], ALL, "One of Scandinavia's oldest and largest universities."),
  u("KTH Royal Institute of Technology", "sweden", "Stockholm", "Public", ["eng", "cs", "design", "sci"], ALL, "Sweden's largest technical university."),
  u("Uppsala University", "sweden", "Uppsala", "Public", ["sci", "health", "arts", "soc"], ALL, "Sweden's oldest university, founded in 1477."),
  u("Karolinska Institutet", "sweden", "Stockholm", "Public", ["med", "health"], ALL, "One of the world's leading medical universities."),
  u("Chalmers University of Technology", "sweden", "Gothenburg", "Public", ["eng", "cs", "design", "sea"], ALL, "A leading technical university on Sweden's west coast."),
  // Finland
  u("University of Helsinki", "finland", "Helsinki", "Public", ["sci", "med", "arts", "agri", "law"], ALL, "Finland's oldest and largest university."),
  u("Aalto University", "finland", "Espoo", "Public", ["eng", "bus", "design", "cs"], ALL, "Where technology, business and art meet."),
  u("Tampere University", "finland", "Tampere", "Public", ["eng", "health", "soc", "cs"], ALL, "A multidisciplinary university in a lively lakeside city."),
  u("University of Turku", "finland", "Turku", "Public", ["med", "bus", "sci", "arts"], ALL, "A coastal university in Finland's oldest city."),
  u("University of Oulu", "finland", "Oulu", "Public", ["eng", "cs", "health", "agri"], ALL, "A northern university known for wireless technology."),
  // Norway
  u("University of Oslo", "norway", "Oslo", "Public", ["law", "med", "sci", "soc"], ALL, "Norway's oldest and largest university."),
  u("NTNU", "norway", "Trondheim", "Public", ["eng", "cs", "design", "sea"], ALL, "Norway's university of science and technology."),
  u("University of Bergen", "norway", "Bergen", "Public", ["sea", "sci", "med", "soc"], ALL, "Known for marine and climate research."),
  u("UiT The Arctic University of Norway", "norway", "Tromsø", "Public", ["sea", "sci", "health", "agri"], ALL, "The world's northernmost university."),
  // Belgium
  u("KU Leuven", "belgium", "Leuven", "Public", ["eng", "med", "bus", "law", "sci"], ALL, "Belgium's largest university and one of Europe's most innovative."),
  u("Ghent University", "belgium", "Ghent", "Public", ["sci", "agri", "eng", "health"], ALL, "A leading research university in a medieval canal city."),
  u("Université libre de Bruxelles (ULB)", "belgium", "Brussels", "Public", ["law", "soc", "med", "eng"], ALL, "A French-speaking university in the capital of Europe."),
  u("University of Antwerp", "belgium", "Antwerp", "Public", ["bus", "law", "sea", "sci"], ALL, "A young, dynamic university in Belgium's port city."),
  // Spain
  u("Universidad Complutense de Madrid", "spain", "Madrid", "Public", ["med", "law", "arts", "sci", "soc"], ALL, "One of Europe's oldest and largest universities."),
  u("University of Barcelona", "spain", "Barcelona", "Public", ["med", "sci", "arts", "bus"], ALL, "Spain's leading research university, in creative Barcelona."),
  u("IE University", "spain", "Madrid & Segovia", "Private", ["bus", "law", "design", "cs"], BM, "A top private university known for business and an international outlook."),
  u("Pompeu Fabra University", "spain", "Barcelona", "Public", ["bus", "soc", "law", "health"], ALL, "A young, highly ranked university in central Barcelona."),
  u("University of Granada", "spain", "Granada", "Public", ["arts", "med", "sci", "cs"], ALL, "Spain's most popular university for exchange students."),
  // Italy
  u("University of Bologna", "italy", "Bologna", "Public", ["law", "med", "bus", "arts", "eng"], ALL, "The world's oldest university, founded in 1088."),
  u("Politecnico di Milano", "italy", "Milan", "Public", ["eng", "design", "cs"], ALL, "Italy's leading technical university for engineering, architecture and design."),
  u("Sapienza University of Rome", "italy", "Rome", "Public", ["med", "eng", "arts", "sci"], ALL, "One of Europe's largest universities, in the Eternal City."),
  u("Bocconi University", "italy", "Milan", "Private", ["bus", "law", "soc"], ALL, "One of Europe's top business and economics universities."),
  u("University of Padua", "italy", "Padua", "Public", ["med", "sci", "eng", "agri"], ALL, "A historic university where Galileo once taught."),
  // Greece
  u("National and Kapodistrian University of Athens", "greece", "Athens", "Public", ["med", "law", "arts", "sci"], ALL, "Greece's oldest modern university."),
  u("Aristotle University of Thessaloniki", "greece", "Thessaloniki", "Public", ["eng", "med", "agri", "arts"], ALL, "Greece's largest university, in a lively seaside city."),
  u("National Technical University of Athens", "greece", "Athens", "Public", ["eng", "design", "cs"], ALL, "Greece's leading engineering university."),
  u("University of Crete", "greece", "Heraklion", "Public", ["med", "cs", "sci"], ALL, "A research university on Greece's largest island."),
  // Lithuania
  u("Vilnius University", "lithuania", "Vilnius", "Public", ["med", "law", "bus", "cs", "arts"], ALL, "One of Central Europe's oldest universities, founded in 1579."),
  u("Kaunas University of Technology", "lithuania", "Kaunas", "Public", ["eng", "cs", "design", "bus"], ALL, "Lithuania's leading technical university."),
  u("Lithuanian University of Health Sciences", "lithuania", "Kaunas", "Public", ["med", "health"], ALL, "English-taught medicine, dentistry and pharmacy."),
  u("VILNIUS TECH", "lithuania", "Vilnius", "Public", ["eng", "design", "cs", "bus"], ALL, "A technical university known for engineering and architecture."),
];
