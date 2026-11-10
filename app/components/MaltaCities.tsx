import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "Valletta",
    region: "Capital · Harbour",
    tagline: "A UNESCO World Heritage capital of honey-coloured stone, Baroque churches and the Grand Harbour.",
    known: ["Arts", "Heritage", "Law", "Culture"],
    universities: ["University of Malta, Valletta Campus"],
    vibe: "Historic streets, cafés and harbour views, all within walking distance",
    src: u("1776707440368-932d9ce4a4cf"),
    alt: "Valletta's skyline with the dome of the Carmelite Church across the harbour",
  },
  {
    name: "Msida & Sliema",
    region: "Central · Coast",
    tagline: "The student heart of Malta: the main university campus in Msida, and the seafront of Sliema next door.",
    known: ["Medicine", "Engineering", "IT", "Business"],
    universities: ["University of Malta, Msida Campus", "Mater Dei Hospital, the main teaching hospital"],
    vibe: "Busy, international and right on the sea",
    src: u("1669718022108-505b40ed2e65"),
    alt: "Aerial view of the Sliema seafront with apartment blocks and rocky coastline",
  },
  {
    name: "Mdina & Rabat",
    region: "Inland · Old capital",
    tagline: "The walled 'Silent City', Malta's medieval former capital, with quieter and cheaper living in neighbouring Rabat.",
    known: ["History", "Archaeology", "Theology"],
    universities: ["A short bus ride from the Msida campus"],
    vibe: "Calm, historic and good value",
    src: u("1569227726523-5b0cdc550fd8"),
    alt: "St Paul's Cathedral in Mdina at sunset",
  },
  {
    name: "Gozo",
    region: "Sister island · North",
    tagline: "Malta's greener, slower sister island, a short ferry ride away, with its own university campus.",
    known: ["Tourism", "Environment", "Education"],
    universities: ["University of Malta, Gozo Campus"],
    vibe: "Countryside, beaches and a close-knit community",
    src: u("1668647184912-67da07256e3e"),
    alt: "Ramla Bay on Gozo, seen through a rocky opening above green fields",
  },
];

export default function MaltaCities() {
  return <CountryCities country="Malta" accent="#0A8A9C" cities={cities} />;
}
