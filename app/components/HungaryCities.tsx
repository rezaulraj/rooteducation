import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "Budapest",
    region: "Capital · Danube",
    tagline: "A grand capital split by the Danube, and Hungary's biggest student city, with thermal baths and a famous nightlife.",
    known: ["Medicine", "Engineering", "Business", "Arts"],
    universities: ["Semmelweis University", "Eötvös Loránd University (ELTE)", "Budapest University of Technology and Economics", "Corvinus University of Budapest"],
    vibe: "Big-city energy and the most job options",
    src: u("1616432902940-b7a1acbc60b3"),
    alt: "The Hungarian Parliament on the banks of the Danube in Budapest",
  },
  {
    name: "Debrecen",
    region: "Great Plain · East",
    tagline: "Hungary's second city, home to one of the country's largest universities and a big international student community.",
    known: ["Medicine", "Pharmacy", "Agriculture", "Engineering"],
    universities: ["University of Debrecen"],
    vibe: "Green, relaxed and affordable",
    src: u("1705697356051-57e3943d932a"),
    alt: "The yellow Great Reformed Church on Kossuth Square in Debrecen",
  },
  {
    name: "Szeged",
    region: "South · Tisza",
    tagline: "A sunny riverside university town, where Albert Szent-Györgyi did the vitamin C research that won a Nobel Prize.",
    known: ["Medicine", "Sciences", "Law", "IT"],
    universities: ["University of Szeged"],
    vibe: "Sunny, youthful and full of festivals",
    src: u("1685976289867-ac5a8fbdcf5c"),
    alt: "Aerial view of a church tower with orange roofs in Szeged",
  },
  {
    name: "Pécs",
    region: "South-west · Mecsek hills",
    tagline: "Home to Hungary's first university, founded in 1367, and a European Capital of Culture in 2010.",
    known: ["Medicine", "Arts", "Humanities", "Business"],
    universities: ["University of Pécs"],
    vibe: "Mediterranean feel, Roman-era history and low living costs",
    src: u("1661975782597-6fc5aafce028"),
    alt: "The four-towered Pécs Cathedral above the city's rooftops",
  },
];

export default function HungaryCities() {
  return <CountryCities country="Hungary" accent="#2E7D4F" cities={cities} />;
}
