import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES } from "../../components/guides";
import { programmesFor, uniSlug } from "../../components/programmes";
import type { GuideLite } from "../../components/ProgrammeModal";
import UniversityDetail, {
  type Facts,
} from "../../components/UniversityDetail";
import { COUNTRIES, UNIVERSITIES } from "../../components/universitiesData";
import FACTS from "../../components/universityFacts.json";
import { UNIVERSITY_LOGOS } from "../../components/universityLogos";

// Each country's hero photo, used when Wikipedia has no campus photo.
const FALLBACK: Record<string, string> = {
  uk: "1612563958093-2c3bcfbd8760",
  usa: "1485871981521-5b1fd3805eee",
  canada: "1539667547529-84c607280d20",
  australia: "1771760171302-2d60b9a3576f",
  "new-zealand": "1775152052607-48028bea7938",
  ireland: "1591387091135-1bd5a83d27ab",
  malaysia: "1597148543182-830ef7bbb904",
  "south-korea": "1638964663550-e2123ac8900b",
  romania: "1634491996455-a7a91dd17d4f",
  hungary: "1761157845019-11c2d237eb75",
  malta: "1669294841689-0ceb34ad40c1",
  cyprus: "1758789791158-71e81950f70f",
  sweden: "1588653818221-2651ec1a6423",
  finland: "1538332576228-eb5b4c4de6f5",
  norway: "1663428520845-056989f8a664",
  belgium: "1601961208755-3519c8a31ded",
  spain: "1661442196029-ecc4a8e0a0b8",
  italy: "1776377231754-d36928e6ee4d",
  greece: "1603565816030-6b389eeb23cb",
  lithuania: "1549891472-991e6bc75d1e",
};
const DEFAULT_INTAKE: Record<string, string> = {
  australia: "February (main), July",
  uk: "September (main), January",
  "south-korea": "March (main), September",
};

const find = (slug: string) =>
  UNIVERSITIES.find((u) => uniSlug(u.name) === slug);

export function generateStaticParams() {
  return UNIVERSITIES.map((u) => ({ slug: uniSlug(u.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const u = find((await params).slug);
  if (!u) return {};
  const c = COUNTRIES.find((x) => x.slug === u.country)!;
  return {
    title: `${u.name} | Root Education`,
    description: `Study at ${u.name} in ${u.city}, ${c.name}: international programmes, fees, admission and visa information.`,
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<div className="h-svh bg-white" />}>
        {params.then(({ slug }) => (
          <University slug={slug} />
        ))}
      </Suspense>
    </main>
  );
}

function University({ slug }: { slug: string }) {
  const u = find(slug);
  if (!u) notFound();
  const c = COUNTRIES.find((x) => x.slug === u.country)!;
  const g = GUIDES[u.country];
  const guide: GuideLite = {
    country: g.country,
    currency: g.currency,
    intakes: g.intakes,
    admission: g.admission,
    documents: g.documents,
    living: g.living,
    work: g.work,
    scholarships: g.scholarships,
    visa: g.visa,
    applySteps: g.applySteps,
    defaultIntake:
      DEFAULT_INTAKE[u.country] ?? "September / October (main intake)",
  };
  const facts = ((FACTS as Record<string, Facts>)[u.name] ??
    null) as Facts | null;
  const logo = u.partner
    ? { src: u.partner.logo, ratio: 1 }
    : (UNIVERSITY_LOGOS[u.name] ?? null);
  return (
    <UniversityDetail
      u={u}
      c={c}
      facts={facts}
      logo={logo}
      programmes={programmesFor(u)}
      guide={guide}
      heroFallback={`https://images.unsplash.com/photo-${FALLBACK[u.country]}?w=2400&q=80&auto=format&fit=crop`}
    />
  );
}
