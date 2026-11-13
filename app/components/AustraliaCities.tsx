import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "Sydney",
    region: "New South Wales",
    tagline: "Australia's largest city, wrapped around one of the world's most beautiful harbours, with beaches minutes from campus.",
    known: ["Business", "Medicine", "Engineering", "Media"],
    universities: ["University of Sydney", "UNSW Sydney", "University of Technology Sydney (UTS)", "Macquarie University"],
    vibe: "Iconic, energetic and the biggest job market",
    src: u("1546268060-2592ff93ee24"),
    alt: "Aerial view of Sydney Harbour with the Harbour Bridge and Opera House",
  },
  {
    name: "Melbourne",
    region: "Victoria",
    tagline: "The country's cultural capital, famous for its coffee, laneways, live music and sport, and often named the best student city in Australia.",
    known: ["Arts", "Medicine", "Engineering", "Education"],
    universities: ["University of Melbourne", "Monash University", "RMIT University", "Deakin University"],
    vibe: "Creative, multicultural and full of events",
    src: u("1775308960126-a694dd3676a3"),
    alt: "The Yarra River and Melbourne's city towers on a clear day",
  },
  {
    name: "Brisbane",
    region: "Queensland",
    tagline: "A sunny, relaxed river city, close to the Gold Coast and Sunshine Coast beaches, and a growing hub for tech and health.",
    known: ["Health", "Engineering", "IT", "Environment"],
    universities: ["University of Queensland", "Queensland University of Technology (QUT)", "Griffith University"],
    vibe: "Warm, outdoorsy and more affordable than Sydney",
    src: u("1783166588085-434cebe482b0"),
    alt: "Aerial view of the Brisbane River winding past the city skyline and a bridge",
  },
  {
    name: "Perth",
    region: "Western Australia",
    tagline: "A laid-back coastal capital on the Swan River, with Indian Ocean beaches and strong mining, energy and engineering industries.",
    known: ["Mining", "Engineering", "Health", "Business"],
    universities: ["University of Western Australia", "Curtin University", "Murdoch University", "Edith Cowan University"],
    vibe: "Sunny, spacious and relaxed",
    src: u("1777085993807-b529b35cd3bd"),
    alt: "Perth's city towers and Elizabeth Quay on the Swan River",
  },
];

export default function AustraliaCities() {
  return <CountryCities country="Australia" accent="#3A3F9E" cities={cities} />;
}
