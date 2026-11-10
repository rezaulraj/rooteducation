import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "Bucharest",
    region: "Capital · South",
    tagline: "The capital and the country's biggest student city, with grand boulevards and a lively Old Town.",
    known: ["Medicine", "Economics", "Engineering", "Law"],
    universities: ["University of Bucharest", "Carol Davila University of Medicine and Pharmacy", "Bucharest University of Economic Studies", "National University of Science and Technology Politehnica Bucharest"],
    vibe: "Big-city energy, the most job and internship options",
    src: u("1636196435721-e937d2ad9746"),
    alt: "People walking along a cobblestone street in Bucharest's Old Town at dusk",
  },
  {
    name: "Cluj-Napoca",
    region: "Transylvania · North-west",
    tagline: "Transylvania's student capital: young, creative and one of Romania's leading tech hubs.",
    known: ["Medicine", "IT", "Sciences", "Arts"],
    universities: ["Babeș-Bolyai University", "Iuliu Hațieganu University of Medicine and Pharmacy", "Technical University of Cluj-Napoca"],
    vibe: "Festivals, cafés and a booming IT scene",
    src: u("1583751636643-94790958040a"),
    alt: "Rooftops of Cluj-Napoca with St. Michael's Church tower and hills behind",
  },
  {
    name: "Iași",
    region: "Moldavia · North-east",
    tagline: "Home to Romania's oldest university, founded in 1860, and a city of culture and history.",
    known: ["Medicine", "Humanities", "Engineering", "Agronomy"],
    universities: ["Alexandru Ioan Cuza University", "Grigore T. Popa University of Medicine and Pharmacy", "Gheorghe Asachi Technical University"],
    vibe: "Historic, affordable and very student-focused",
    src: u("1555160254-d712aa2ae9bb"),
    alt: "The Palace of Culture in Iași at sunset",
  },
  {
    name: "Timișoara",
    region: "Banat · West",
    tagline: "A multicultural western city close to Hungary and Serbia, and European Capital of Culture in 2023.",
    known: ["Engineering", "Medicine", "IT", "Business"],
    universities: ["West University of Timișoara", "Politehnica University of Timișoara", "Victor Babeș University of Medicine and Pharmacy"],
    vibe: "Relaxed, green and well connected to Central Europe",
    src: u("1581011348327-2e033c842a72"),
    alt: "A church clock tower against a blue sky in Timișoara",
  },
  {
    name: "Brașov",
    region: "Transylvania · Centre",
    tagline: "A medieval old town ringed by the Carpathians, with skiing and hiking minutes away.",
    known: ["Engineering", "Forestry", "Tourism", "Music"],
    universities: ["Transilvania University of Brașov"],
    vibe: "Small-town charm with mountains on the doorstep",
    src: u("1688559581417-656693faf76a"),
    alt: "Brașov's Council Square with the forested Tâmpa mountain behind",
  },
];

export default function RomaniaCities() {
  return <CountryCities country="Romania" accent="#B3132B" cities={cities} />;
}
