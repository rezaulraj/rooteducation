import CountryCities, { type City } from "./CountryCities";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fit=crop`;

// Photos are free under the Unsplash License.
const cities: City[] = [
  {
    name: "Auckland",
    region: "North Island · Tāmaki Makaurau",
    tagline: "New Zealand's largest city, spread between two harbours, with beaches, volcanic hills and the country's biggest job market.",
    known: ["Business", "Engineering", "Medicine", "Design"],
    universities: ["University of Auckland", "Auckland University of Technology (AUT)", "Massey University, Auckland campus"],
    vibe: "Big, diverse and full of opportunities",
    src: u("1595125989588-36d745a2a828"),
    alt: "The Auckland skyline and Sky Tower across the harbour at golden hour",
  },
  {
    name: "Wellington",
    region: "North Island · Te Whanganui-a-Tara",
    tagline: "The compact, creative capital, known for its harbour, cafés, film industry and Parliament.",
    known: ["Law", "Public policy", "Film", "Architecture"],
    universities: ["Victoria University of Wellington", "Massey University, Wellington campus"],
    vibe: "Walkable, artsy and politically buzzing",
    src: u("1782921389398-6c2a9dc1c64e"),
    alt: "Wellington's city and harbour on a sunny day",
  },
  {
    name: "Christchurch",
    region: "South Island · Ōtautahi",
    tagline: "The South Island's largest city, rebuilt with modern design, its heritage trams and gardens, and the Southern Alps nearby.",
    known: ["Engineering", "Science", "Agriculture", "Forestry"],
    universities: ["University of Canterbury", "Lincoln University"],
    vibe: "Green, relaxed and great for outdoor adventures",
    src: u("1576569847896-3cead09c0eec"),
    alt: "A heritage tram running through central Christchurch",
  },
  {
    name: "Dunedin",
    region: "South Island · Ōtepoti",
    tagline: "New Zealand's classic student city, home to its oldest university, with Scottish heritage and wildlife on the Otago Peninsula.",
    known: ["Medicine", "Dentistry", "Health sciences", "Sciences"],
    universities: ["University of Otago"],
    vibe: "A true student town, affordable and close-knit",
    src: u("1616894671635-e591fec8ef1e"),
    alt: "The University of Otago clocktower building with cherry blossom",
  },
];

export default function NewZealandCities() {
  return <CountryCities country="New Zealand" accent="#1E7A6A" cities={cities} />;
}
