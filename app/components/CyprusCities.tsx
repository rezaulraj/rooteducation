import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "Nicosia",
    region: "Capital · Inland",
    tagline: "The capital, ringed by Venetian walls, with a lively old town and the island's largest universities.",
    known: ["Medicine", "Business", "Law", "IT"],
    universities: ["University of Cyprus", "University of Nicosia", "European University Cyprus", "Frederick University"],
    vibe: "The busiest student scene, with cafés and bars in the old town",
    src: u("1684438269027-52d616164157"),
    alt: "A quiet street of old stone houses with wooden doors in Nicosia",
  },
  {
    name: "Limassol",
    region: "South coast",
    tagline: "A seaside business hub for shipping, tech and finance, with a long promenade and beaches nearby.",
    known: ["Engineering", "Shipping", "IT", "Hospitality"],
    universities: ["Cyprus University of Technology"],
    vibe: "Cosmopolitan, busy and right on the sea",
    src: u("1760484151582-fcd01e1a922a"),
    alt: "Turquoise sea and a long sandy beach below white cliffs near Limassol",
  },
  {
    name: "Larnaca",
    region: "South-east coast",
    tagline: "A relaxed coastal city with a palm-lined seafront, the island's main airport and lower rents.",
    known: ["Business", "Law", "Computing"],
    universities: ["University of Central Lancashire (UCLan) Cyprus"],
    vibe: "Laid-back, affordable and easy to travel from",
    src: u("1602521163379-79fba9eac5e6"),
    alt: "Larnaca's palm-lined seafront promenade beside the sea",
  },
  {
    name: "Paphos",
    region: "West coast",
    tagline: "A UNESCO World Heritage town with Roman mosaics, a medieval harbour fort and sunsets over the sea.",
    known: ["Architecture", "Psychology", "Law", "Tourism"],
    universities: ["Neapolis University Pafos"],
    vibe: "Small, scenic and historic",
    src: u("1771071240700-8cfcde078ab8"),
    alt: "Paphos medieval fort at the end of the harbour breakwater",
  },
];

export default function CyprusCities() {
  return <CountryCities country="Cyprus" accent="#B5541C" cities={cities} />;
}
