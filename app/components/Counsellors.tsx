"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { COUNTRIES, UNIVERSITIES } from "./universitiesData";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const MAROON = "#2E1212";
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=800&q=80&auto=format&fit=crop&crop=faces`;

type Office = "London" | "Dhaka";
type Counsellor = {
  name: string;
  role: string;
  office: Office;
  img: string;
  countries: string[];
  languages: string[];
  years: number;
};

// Placeholder team: replace names, roles, photos and details with your real counsellors.
const TEAM: Counsellor[] = [
  {
    name: "Sarah Mitchell",
    role: "Head of Counselling",
    office: "London",
    img: photo("1573496359142-b8d87734a5a2"),
    countries: ["gb", "ie", "mt"],
    languages: ["English", "French"],
    years: 12,
  },
  {
    name: "Arif Rahman",
    role: "Senior Counsellor",
    office: "Dhaka",
    img: photo("1507003211169-0a1dd7228f2d"),
    countries: ["gb", "ca", "au"],
    languages: ["Bangla", "English", "Hindi"],
    years: 9,
  },
  {
    name: "Daniel Hughes",
    role: "UK Admissions Specialist",
    office: "London",
    img: photo("1519085360753-af0119f7cbe7"),
    countries: ["gb", "us"],
    languages: ["English"],
    years: 8,
  },
  {
    name: "Amara Okafor",
    role: "Scholarships Advisor",
    office: "Dhaka",
    img: photo("1531123897727-8f129e1688ce"),
    countries: ["hu", "ro", "cy"],
    languages: ["English", "Bangla"],
    years: 6,
  },
  {
    name: "James Carter",
    role: "Visa & Compliance Lead",
    office: "London",
    img: photo("1560250097-0b93528c311a"),
    countries: ["gb", "ca", "us"],
    languages: ["English"],
    years: 11,
  },
  {
    name: "Nadia Islam",
    role: "Europe Counsellor",
    office: "Dhaka",
    img: photo("1607746882042-944635dfe10e"),
    countries: ["it", "es", "lt", "mt"],
    languages: ["Bangla", "English", "Italian"],
    years: 7,
  },
  {
    name: "Rumana Chowdhury",
    role: "Student Experience Manager",
    office: "Dhaka",
    img: photo("1573497019940-1c28c88b4f3e"),
    countries: ["gr", "cy", "es"],
    languages: ["Bangla", "English"],
    years: 10,
  },
  {
    name: "Emily Clarke",
    role: "Nordic Destinations Counsellor",
    office: "London",
    img: photo("1580489944761-15a19d654956"),
    countries: ["se", "fi", "no"],
    languages: ["English", "Swedish"],
    years: 5,
  },
];

const FAN_ANGLES = [-12, -4, 4, 12];

const FILTERS = ["All", "London", "Dhaka"] as const;
type Filter = (typeof FILTERS)[number];

const STEPS = [
  {
    n: "01",
    title: "Tell us your goals",
    text: "Share your grades, budget and dream destinations in a short form or call.",
  },
  {
    n: "02",
    title: "Meet your counsellor",
    text: "We match you with the counsellor who knows your countries best.",
  },
  {
    n: "03",
    title: "Get your plan",
    text: "Leave with a university shortlist, scholarship options and a visa timeline.",
  },
];

const countryName = (code: string) =>
  COUNTRIES.find((c) => c.code === code)?.name ?? code.toUpperCase();

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" />
    </svg>
  );
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function FlagDot({ code }: { code: string }) {
  return (
    <span
      className="relative inline-block h-6 w-6 overflow-hidden rounded-full ring-2 ring-white"
      title={countryName(code)}
    >
      <Image
        src={`/flags/${code}.svg`}
        alt={countryName(code)}
        fill
        sizes="24px"
        className="object-cover"
        unoptimized
      />
    </span>
  );
}

function Card({ c }: { c: Counsellor }) {
  return (
    <article
      data-c-card
      data-office={c.office}
      className="group flex flex-col items-center gap-5"
    >
      <div
        className="relative w-full overflow-hidden rounded-[28px] bg-[#FBEBDD]"
        style={{ aspectRatio: "4 / 5" }}
      >
        <div data-c-img className="absolute inset-0">
          <Image
            src={c.img}
            alt={`${c.name}, ${c.role}`}
            fill
            sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
            className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-[0.35]"
          />
        </div>
        {/* Office tag */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {c.office}
        </span>
        {/* Details slide up on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[calc(100%+1rem)] rounded-2xl bg-white/95 p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
            Speaks
          </p>
          <p className="mt-1 text-sm font-medium text-ink">
            {c.languages.join(" · ")}
          </p>
          <Link
            href="/consultation"
            className="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition-colors hover:bg-brand"
          >
            Book a session <Arrow className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 text-center">
        <div>
          <h3
            className="text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: MAROON }}
          >
            {c.name}
          </h3>
          <p className="mt-1 text-sm text-ink/55">
            {c.role} · {c.years} yrs
          </p>
          {/* Touch screens can't hover, so show the languages here too. */}
          <p className="mt-1 text-xs text-ink/45 lg:hidden">Speaks {c.languages.join(", ")}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="flex -space-x-1.5"
            aria-label={`Specialises in ${c.countries.map(countryName).join(", ")}`}
          >
            {c.countries.map((code) => (
              <FlagDot key={code} code={code} />
            ))}
          </span>
          <span className="h-4 w-px bg-ink/10" aria-hidden />
          <a
            href="#"
            aria-label={`${c.name} on LinkedIn`}
            className="grid h-8 w-8 place-items-center rounded-full text-ink/60 transition-colors hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
          >
            <LinkedinIcon />
          </a>
          <Link
            href="/consultation"
            aria-label={`Book a session with ${c.name}`}
            className="grid h-8 w-8 place-items-center rounded-full text-ink/60 transition-colors hover:bg-brand/10 hover:text-brand"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Counsellors() {
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [filter, setFilter] = useState<Filter>("All");

  useGSAP(
    () => {
      // The portrait fan's resting angles.
      gsap.set("[data-c-fan]", { rotation: (i) => FAN_ANGLES[i] });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: the heading rises line by line, the portrait fan deals out, the chips float in.
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-c-hero]",
            { clipPath: "inset(6% 4% 6% 4% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-c-eyebrow]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.5,
          )
          .fromTo(
            "[data-c-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.55,
          )
          .fromTo(
            "[data-c-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            0.85,
          )
          .fromTo(
            "[data-c-fan]",
            { y: 160, rotation: 0, autoAlpha: 0 },
            {
              y: 0,
              rotation: (i) => FAN_ANGLES[i],
              autoAlpha: 1,
              duration: 1.4,
              stagger: 0.09,
            },
            0.55,
          )
          .fromTo(
            "[data-c-chip]",
            { scale: 0.6, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "back.out(2)",
            },
            1.3,
          );

        // The fan breathes, and the chips bob gently.
        gsap.to("[data-c-chip]", {
          y: -8,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5,
        });

        // Section headings.
        gsap.utils.toArray<HTMLElement>("[data-c-head]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 82%" },
            },
          );
        });

        // Cards rise in as they scroll into view; their portraits settle from a slight zoom.
        ScrollTrigger.batch("[data-c-card]", {
          start: "top 88%",
          once: true,
          onEnter: (cards) => {
            gsap.fromTo(
              cards,
              { y: 60, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.1,
                stagger: 0.1,
                ease: "expo.out",
              },
            );
            gsap.fromTo(
              cards.map((c) => c.querySelector("[data-c-img]")),
              { scale: 1.25 },
              { scale: 1, duration: 1.6, stagger: 0.1, ease: "expo.out" },
            );
          },
        });

        gsap.fromTo(
          "[data-c-step]",
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-c-steps]", start: "top 80%" },
          },
        );
        gsap.fromTo(
          "[data-c-step-line]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: { trigger: "[data-c-steps]", start: "top 80%" },
          },
        );
        gsap.fromTo(
          "[data-c-cta]",
          { clipPath: "inset(20% 10% 20% 10% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-c-cta]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // Place the sliding pill under the active filter.
  useGSAP(
    () => {
      const t = tabs.current[filter];
      if (!t || !pill.current) return;
      gsap.to(pill.current, {
        x: t.offsetLeft,
        width: t.offsetWidth,
        duration: 0.6,
        ease: "expo.out",
      });
    },
    { scope: root, dependencies: [filter] },
  );

  const choose = (f: Filter) => {
    if (f === filter || !grid.current) return;
    // Cards that leave fade out, the rest glide into their new places.
    const state = Flip.getState(grid.current.querySelectorAll("[data-c-card]"));
    grid.current
      .querySelectorAll<HTMLElement>("[data-c-card]")
      .forEach((el) => {
        el.style.display = f === "All" || el.dataset.office === f ? "" : "none";
      });
    setFilter(f);
    Flip.from(state, {
      duration: 0.7,
      ease: "expo.out",
      absolute: true,
      stagger: 0.03,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, scale: 0.9, y: 30 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "expo.out" },
        ),
      onLeave: (els) =>
        gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.35 }),
    });
  };

  const count = (f: Filter) =>
    f === "All" ? TEAM.length : TEAM.filter((c) => c.office === f).length;
  const fan = [TEAM[0], TEAM[1], TEAM[5], TEAM[4]];

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="px-3 pt-3">
        <div
          data-c-hero
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#FFF3EA_0%,#FDE3D0_55%,#FCD8BE_100%)] px-6 pb-16 pt-32 sm:px-10 lg:pb-24 lg:pt-36"
        >
          {/* A fine grid fading out from the right */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              maskImage:
                "radial-gradient(70% 80% at 80% 50%, black, transparent 75%)",
            }}
          >
            <defs>
              <pattern
                id="c-grid"
                width="36"
                height="36"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M36 0H0V36"
                  fill="none"
                  stroke="#F47A2A"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#c-grid)" />
          </svg>

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p
                data-c-eyebrow
                className="inline-flex items-center gap-2 rounded-full border border-[#2E1212]/10 bg-white/70 px-4 py-1.5 text-sm font-semibold text-[#2E1212] backdrop-blur"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Our counsellors
              </p>
              <h1
                className="mt-6 text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
                style={{ color: MAROON }}
              >
                {["Meet the experts", "behind every"].map((l) => (
                  <span key={l} className="block overflow-hidden pb-[0.06em]">
                    <span data-c-line className="block">
                      {l}
                    </span>
                  </span>
                ))}
                <span className="block overflow-hidden pb-[0.12em]">
                  <span data-c-line className="block text-brand">
                    admit.
                  </span>
                </span>
              </h1>
              <p
                data-c-sub
                className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#2E1212]/65"
              >
                Certified counsellors in London and Dhaka who know your
                destinations inside out, from the first shortlist to the day you
                fly.
              </p>
              <div
                data-c-sub
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/consultation"
                  className="group inline-flex h-13 items-center gap-3 rounded-full bg-[#2E1212] pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand"
                >
                  Book a free session
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-brand">
                    <Arrow />
                  </span>
                </Link>
                <a
                  href="#team"
                  className="inline-flex h-13 items-center rounded-full border border-[#2E1212]/15 bg-white/60 px-7 text-sm font-semibold text-[#2E1212] backdrop-blur transition-colors hover:bg-white"
                >
                  Meet the team
                </a>
              </div>
              <dl
                data-c-sub
                className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[#2E1212]/10 pt-6"
              >
                {[
                  ["2", "offices"],
                  [String(COUNTRIES.length), "countries"],
                  [`${UNIVERSITIES.length}+`, "universities"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd
                      className="text-3xl font-semibold tracking-tight"
                      style={{ color: MAROON }}
                    >
                      {n}
                    </dd>
                    <dd className="mt-0.5 text-sm text-[#2E1212]/55">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* A fan of portraits */}
            <div
              className="relative mx-auto h-[22rem] w-full max-w-[30rem] sm:h-[26rem]"
              aria-hidden
            >
              {fan.map((c, i) => (
                <div
                  key={c.name}
                  data-c-fan
                  className="absolute bottom-6 left-1/2 w-[46%] origin-bottom overflow-hidden rounded-[22px] border-4 border-white bg-white shadow-[0_30px_60px_-24px_rgba(46,18,18,0.45)]"
                  style={{
                    marginLeft: `${(i - 1.5) * 18 - 23}%`,
                    aspectRatio: "4 / 5",
                    zIndex: i === 1 || i === 2 ? 2 : 1,
                  }}
                >
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    sizes="220px"
                    className="object-cover"
                    preload={i === 1}
                  />
                </div>
              ))}
              <span
                data-c-chip
                className="absolute left-0 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[0_18px_40px_-18px_rgba(46,18,18,0.45)]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#22C55E] text-white">
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 6.2 5 8.5l4.5-5" />
                  </svg>
                </span>
                Certified counsellors
              </span>
              <span
                data-c-chip
                className="absolute right-0 top-20 z-10 inline-flex items-center gap-2 rounded-full bg-[#2E1212] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(46,18,18,0.6)]"
              >
                <FlagDot code="gb" /> London
                <span className="text-white/40">·</span>
                <FlagDot code="bd" /> Dhaka
              </span>
              <span
                data-c-chip
                className="absolute -bottom-1 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(244,122,42,0.8)]"
              >
                Free 1:1 sessions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The team */}
      <section id="team" className="scroll-mt-24 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div
            data-c-head
            className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center"
          >
            <span className="rounded-full border border-[#2E1212]/12 px-3.5 py-1 text-sm font-medium text-[#2E1212]/70">
              Team
            </span>
            <h2
              className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              The people who <span className="text-brand">guide you</span>{" "}
              abroad
            </h2>
            <p className="text-[#2E1212]/60">
              Hover a counsellor to see the languages they speak and book a
              session.
            </p>
          </div>

          {/* Office filter */}
          <div className="mt-10 flex justify-center">
            <div
              role="tablist"
              aria-label="Filter by office"
              className="relative inline-flex rounded-full border border-[#2E1212]/10 bg-white p-1 shadow-[0_10px_30px_-20px_rgba(46,18,18,0.4)]"
            >
              <span
                ref={pill}
                aria-hidden
                className="absolute bottom-1 left-0 top-1 rounded-full bg-[#2E1212]"
                style={{ width: 0 }}
              />
              {FILTERS.map((f) => (
                <button
                  key={f}
                  ref={(el) => {
                    tabs.current[f] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={filter === f}
                  onClick={() => choose(f)}
                  className={`relative z-10 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-300 ${filter === f ? "text-white" : "text-[#2E1212]/65 hover:text-[#2E1212]"}`}
                >
                  {f === "All" ? "All counsellors" : f}
                  <span
                    className={`rounded-full px-1.5 text-xs ${filter === f ? "bg-white/20" : "bg-[#2E1212]/8"}`}
                  >
                    {count(f)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            ref={grid}
            className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
          >
            {TEAM.map((c) => (
              <Card key={c.name} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* How a session works */}
      <section className="bg-[#FBF6EF] px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div
            data-c-head
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2
              className="max-w-lg text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              How a session <span className="text-brand">works</span>
            </h2>
            <p className="max-w-sm text-[#2E1212]/60">
              Free, about 30 minutes, by video, phone or in our offices.
            </p>
          </div>
          <div
            data-c-steps
            className="relative mt-14 grid gap-6 md:grid-cols-3"
          >
            <span
              data-c-step-line
              aria-hidden
              className="absolute left-0 right-0 top-[2.1rem] hidden h-px origin-left bg-[linear-gradient(90deg,#F47A2A,#F47A2A33)] md:block"
            />
            {STEPS.map((s) => (
              <div key={s.n} data-c-step className="relative">
                <span className="relative z-10 grid h-[4.2rem] w-[4.2rem] place-items-center rounded-2xl bg-white text-lg font-semibold text-brand shadow-[0_14px_30px_-18px_rgba(46,18,18,0.45)]">
                  {s.n}
                </span>
                <h3
                  className="mt-6 text-xl font-semibold tracking-tight"
                  style={{ color: MAROON }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xs leading-relaxed text-[#2E1212]/60">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-3 py-3">
        <div
          data-c-cta
          className="relative mx-auto overflow-hidden rounded-[32px] bg-[#2E1212] px-6 py-16 text-center text-white sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#6464FF]/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex justify-center -space-x-3">
              {TEAM.slice(0, 5).map((c) => (
                <span
                  key={c.name}
                  className="relative h-12 w-12 overflow-hidden rounded-full ring-4 ring-[#2E1212]"
                >
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
              ))}
            </span>
            <h2 className="mt-7 text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Not sure who to talk to?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/65">
              Tell us where you want to study. We&apos;ll match you with the
              right counsellor, free.
            </p>
            <Link
              href="/consultation"
              className="group mt-9 inline-flex h-13 items-center gap-3 rounded-full bg-brand pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E1212]"
            >
              Book a free session
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
