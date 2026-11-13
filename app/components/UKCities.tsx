import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "London",
    region: "Capital · South-east",
    tagline: "A global capital with more universities than any other city in the UK, and endless museums, theatres and neighbourhoods.",
    known: ["Business", "Finance", "Medicine", "Arts"],
    universities: ["Imperial College London", "University College London (UCL)", "King's College London", "London School of Economics (LSE)"],
    vibe: "The biggest job market, at the highest cost of living",
    src: u("1533929736458-ca588d08c8be"),
    alt: "Tower Bridge over the River Thames with the City of London skyline behind",
  },
  {
    name: "Manchester",
    region: "North-west",
    tagline: "One of Europe's largest student cities, famous for its music, football and fast-growing tech scene.",
    known: ["Engineering", "Business", "Computer science", "Medicine"],
    universities: ["The University of Manchester", "Manchester Metropolitan University"],
    vibe: "Big, friendly and more affordable than London",
    src: u("1710178368224-9b21cf7554e8"),
    alt: "Aerial view over the rooftops of Manchester city centre",
  },
  {
    name: "Birmingham",
    region: "West Midlands",
    tagline: "The UK's second city, young and diverse, with more canals than Venice and excellent rail links.",
    known: ["Business", "Engineering", "Law", "Medicine"],
    universities: ["University of Birmingham", "Aston University", "Birmingham City University"],
    vibe: "Central, multicultural and good value",
    src: u("1719669753130-38c2245c014b"),
    alt: "Narrowboats moored on a canal in central Birmingham near Brindleyplace",
  },
  {
    name: "Edinburgh",
    region: "Scotland",
    tagline: "Scotland's historic capital, with a castle on a volcanic rock, a UNESCO-listed old town and the world's largest arts festival.",
    known: ["Medicine", "Informatics", "Law", "Humanities"],
    universities: ["The University of Edinburgh", "Heriot-Watt University", "Edinburgh Napier University"],
    vibe: "Beautiful, historic and full of festivals",
    src: u("1783739989956-6f45e04eb2a4"),
    alt: "Edinburgh Castle rising above the city's old town and green gardens",
  },
];

export default function UKCities() {
  return <CountryCities country="the UK" accent="#22408F" cities={cities} />;
}
