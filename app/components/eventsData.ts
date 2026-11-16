// Events and webinars. Placeholder schedule for launch: replace with your real events.
// Times are stored in UTC and shown in both London and Dhaka time.

export type EventKind = "Webinar" | "Education fair" | "Workshop";
export type EventMode = "Online" | "London office" | "Dhaka office";

export type RootEvent = {
  slug: string;
  kind: EventKind;
  mode: EventMode;
  title: string;
  blurb: string;
  start: string; // ISO, UTC
  minutes: number;
  host: string;
  img: string; // Unsplash photo id
  flags: string[]; // country codes from /public/flags
  agenda: string[];
  seats?: number; // seats left, for in-person events
};

export const KIND_TINT: Record<EventKind, string> = {
  Webinar: "#5A4FF0",
  "Education fair": "#F47A2A",
  Workshop: "#1E7A6A",
};

export const eventImage = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const UPCOMING: RootEvent[] = [
  {
    slug: "study-in-the-uk-2027",
    kind: "Webinar",
    mode: "Online",
    title: "Study in the UK: September 2027 intake",
    blurb:
      "Universities, fees, scholarships and the Graduate visa explained, with a live Q&A at the end.",
    start: "2026-11-28T13:00:00Z",
    minutes: 60,
    host: "Root Education UK team",
    img: "1529070538774-1843cb3265df",
    flags: ["gb"],
    agenda: [
      "How UK admissions work",
      "Costs and scholarships",
      "Student and Graduate visas",
      "Live Q&A",
    ],
  },
  {
    slug: "dhaka-europe-education-fair",
    kind: "Education fair",
    mode: "Dhaka office",
    title: "Europe Education Fair, Dhaka",
    blurb:
      "Meet our counsellors and explore universities in Malta, Hungary, Cyprus, Romania and more. Bring your documents for an on-the-spot profile check.",
    start: "2026-12-05T05:00:00Z",
    minutes: 360,
    host: "Root Education Dhaka",
    img: "1541339907198-e08756dedf3f",
    flags: ["mt", "hu", "cy", "ro", "gr", "lt"],
    agenda: [
      "University desks by country",
      "Free profile assessments",
      "Scholarship clinic",
      "Visa document check",
    ],
    seats: 120,
  },
  {
    slug: "scholarships-masterclass",
    kind: "Workshop",
    mode: "Online",
    title: "Scholarship masterclass: write an application that wins",
    blurb:
      "A practical session on finding scholarships you qualify for and writing a focused, convincing application.",
    start: "2026-12-12T14:00:00Z",
    minutes: 90,
    host: "Root Education Counselling Team",
    img: "1586281380349-632531db7ed4",
    flags: ["gb", "ie", "hu", "it"],
    agenda: [
      "Where scholarships hide",
      "Matching your profile",
      "Essay structure that works",
      "Review of sample essays",
    ],
  },
  {
    slug: "canada-and-australia",
    kind: "Webinar",
    mode: "Online",
    title: "Canada vs Australia: which fits you?",
    blurb:
      "Costs, work rights, post-study options and the application timeline for both countries, side by side.",
    start: "2027-01-09T13:00:00Z",
    minutes: 60,
    host: "Root Education Counselling Team",
    img: "1436491865332-7a61a109cc05",
    flags: ["ca", "au"],
    agenda: [
      "Cost of studying and living",
      "Work while you study",
      "After graduation",
      "Live Q&A",
    ],
  },
  {
    slug: "london-open-day",
    kind: "Workshop",
    mode: "London office",
    title: "London open day: applications and personal statements",
    blurb:
      "Small-group workshop at our London office. Bring your draft statement and leave with clear feedback.",
    start: "2027-01-16T11:00:00Z",
    minutes: 180,
    host: "Root Education London",
    img: "1522202176988-66273c2fd55f",
    flags: ["gb", "ie"],
    agenda: [
      "How admissions teams read",
      "Statement workshop",
      "One-to-one feedback",
    ],
    seats: 30,
  },
  {
    slug: "ielts-strategy-session",
    kind: "Workshop",
    mode: "Online",
    title: "IELTS, PTE or Duolingo: strategy session",
    blurb:
      "Choose the right English test for your universities and get a study plan for the score you need.",
    start: "2027-01-23T14:00:00Z",
    minutes: 75,
    host: "Root Education Test Prep",
    img: "1517842645767-c639042777db",
    flags: [],
    agenda: [
      "Test formats compared",
      "What your universities accept",
      "A four-week study plan",
    ],
  },
];

export const PAST = [
  {
    title: "Study in Malta: life, costs and courses",
    kind: "Webinar" as EventKind,
    date: "2026-10-18T13:00:00Z",
    img: "1569949381669-ecf31ae8e613",
    minutes: 55,
  },
  {
    title: "Student visa interviews: practice and tips",
    kind: "Workshop" as EventKind,
    date: "2026-10-04T13:00:00Z",
    img: "1521791136064-7986c2920216",
    minutes: 70,
  },
  {
    title: "Your first semester in Europe",
    kind: "Webinar" as EventKind,
    date: "2026-09-20T13:00:00Z",
    img: "1562774053-701939374585",
    minutes: 50,
  },
];

const fmt = (iso: string, tz: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...opts }).format(
    new Date(iso),
  );
export const dayOf = (iso: string) =>
  fmt(iso, "Europe/London", { day: "2-digit" });
export const monthOf = (iso: string) =>
  fmt(iso, "Europe/London", { month: "short" });
export const weekdayOf = (iso: string) =>
  fmt(iso, "Europe/London", { weekday: "long" });
export const fullDate = (iso: string) =>
  fmt(iso, "Europe/London", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
export const timeIn = (iso: string, tz: string) =>
  fmt(iso, tz, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
export const monthKey = (iso: string) =>
  fmt(iso, "Europe/London", { month: "long", year: "numeric" });
export const duration = (m: number) =>
  m < 120 ? `${m} min` : `${Math.round(m / 60)} hours`;

/** A calendar file for "Add to calendar". */
export function icsFor(e: RootEvent) {
  const stamp = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const start = new Date(e.start);
  const end = new Date(start.getTime() + e.minutes * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Root Education//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@rooteducation`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.blurb}`,
    `LOCATION:${e.mode === "Online" ? "Online (link sent by email)" : e.mode}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
