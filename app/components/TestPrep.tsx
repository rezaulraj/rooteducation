"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQS, TESTS, TYPICAL } from "./testPrepData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const photo = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const STEPS = [
  {
    title: "Diagnostic test",
    text: "A full mock test on day one shows your level in every skill.",
    icon: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  },
  {
    title: "Your study plan",
    text: "A week-by-week plan built around your target score and deadline.",
    icon: "M4 5h16M4 12h16M4 19h10",
  },
  {
    title: "Coaching & practice",
    text: "Live classes, practice tasks and feedback on your writing and speaking.",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21c1.2-4 4-6 7.5-6s6.3 2 7.5 6",
  },
  {
    title: "Mock tests & booking",
    text: "Timed mock tests until you're ready, then help booking the real test.",
    icon: "M3.5 5h17v15h-17zM3.5 10h17M8 3v4M16 3v4",
  },
];

const OPTIONS = [
  {
    title: "One-to-one coaching",
    text: "Lessons built entirely around you, online or in our offices.",
    points: [
      "Personal study plan",
      "Flexible timings",
      "Detailed writing feedback",
    ],
    dark: true,
  },
  {
    title: "Small-group classes",
    text: "Learn with other students aiming for the same test and score.",
    points: [
      "Live online classes",
      "Speaking practice partners",
      "Weekly progress checks",
    ],
    dark: false,
  },
  {
    title: "Mock test packs",
    text: "Full, timed practice tests with scoring and review.",
    points: [
      "Real exam conditions",
      "Section-by-section scores",
      "Review session after each",
    ],
    dark: false,
  },
];

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
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

/** A half-ring gauge that fills to show a score, used in the hero. */
function Gauge() {
  return (
    <svg viewBox="0 0 220 130" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="g-fill" x1="0" x2="1">
          <stop offset="0" stopColor="#FFB07A" />
          <stop offset="1" stopColor="#F47A2A" />
        </linearGradient>
      </defs>
      <path
        d="M20 115a90 90 0 0 1 180 0"
        fill="none"
        stroke="#2E1212"
        strokeOpacity="0.08"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        data-tp-gauge
        d="M20 115a90 90 0 0 1 180 0"
        fill="none"
        stroke="url(#g-fill)"
        strokeWidth="16"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="0.22"
      />
      {Array.from({ length: 10 }, (_, i) => {
        const a = Math.PI - (i / 9) * Math.PI;
        return (
          <circle
            key={i}
            cx={Math.round((110 + Math.cos(a) * 70) * 10) / 10}
            cy={Math.round((115 - Math.sin(a) * 70) * 10) / 10}
            r="1.8"
            fill="#2E1212"
            opacity="0.25"
          />
        );
      })}
    </svg>
  );
}

export default function TestPrep() {
  const root = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(TESTS[0].key);
  const [openFaq, setOpenFaq] = useState(0);
  const t = TESTS.find((x) => x.key === active)!;
  const totalMin = t.sections.reduce((s, x) => s + x.minutes, 0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-tp-frame]",
            { clipPath: "inset(6% 4% 6% 4% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-tp-eyebrow]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.5,
          )
          .fromTo(
            "[data-tp-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.55,
          )
          .fromTo(
            "[data-tp-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            0.85,
          )
          .fromTo(
            "[data-tp-card]",
            { y: 70, rotate: 4, autoAlpha: 0 },
            { y: 0, rotate: 0, autoAlpha: 1, duration: 1.3 },
            0.6,
          )
          .fromTo(
            "[data-tp-gauge]",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0.22, duration: 2, ease: "power3.inOut" },
            0.9,
          )
          .fromTo(
            "[data-tp-score]",
            { textContent: 0 },
            {
              textContent: 7.5,
              duration: 2,
              ease: "power3.inOut",
              snap: { textContent: 0.5 },
            },
            0.9,
          )
          .fromTo(
            "[data-tp-chip]",
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(2)",
            },
            1.3,
          );

        gsap.utils.toArray<HTMLElement>("[data-tp-chip]").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 10 : -10,
            duration: 2.6 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2,
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-tp-head]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          );
        });
        gsap.fromTo(
          "[data-tp-explorer]",
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-tp-explorer]", start: "top 85%" },
          },
        );
        gsap.fromTo(
          "[data-tp-row]",
          { x: -30, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-tp-table]", start: "top 85%" },
          },
        );
        gsap.fromTo(
          "[data-tp-step]",
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-tp-steps]", start: "top 82%" },
          },
        );
        gsap.fromTo(
          "[data-tp-stepline]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: { trigger: "[data-tp-steps]", start: "top 82%" },
          },
        );
        ScrollTrigger.batch("[data-tp-option]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 60, autoAlpha: 0, rotateX: -15 },
              {
                y: 0,
                autoAlpha: 1,
                rotateX: 0,
                duration: 1.1,
                stagger: 0.12,
                ease: "expo.out",
                transformPerspective: 900,
              },
            ),
        });
        gsap.fromTo(
          "[data-tp-cta]",
          { clipPath: "inset(18% 8% 18% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-tp-cta]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // Switching test: the pill slides, the details and section bars animate in.
  useGSAP(
    () => {
      const tab = tabs.current[active];
      if (tab && pill.current)
        gsap.to(pill.current, {
          x: tab.offsetLeft,
          width: tab.offsetWidth,
          backgroundColor: t.tint,
          duration: 0.6,
          ease: "expo.out",
        });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-tp-fact]",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: "expo.out" },
      );
      gsap.fromTo(
        "[data-tp-bar]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          transformOrigin: "left center",
        },
      );
      gsap.fromTo(
        "[data-tp-intro] > *",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: "expo.out" },
      );
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="px-3 pt-3">
        <div
          data-tp-frame
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#FFF5EC_0%,#FFE6D2_55%,#FFD3B0_100%)] px-6 pb-16 pt-32 sm:px-10 lg:pb-20 lg:pt-36"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/60 blur-[90px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 left-[18%] h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[100px]"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              maskImage:
                "radial-gradient(60% 70% at 20% 45%, black, transparent 75%)",
            }}
          >
            <defs>
              <pattern
                id="tp-grid"
                width="34"
                height="34"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M34 0H0V34"
                  fill="none"
                  stroke="#F47A2A"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tp-grid)" />
          </svg>

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p
                data-tp-eyebrow
                className="inline-flex items-center gap-2 rounded-full border border-[#2E1212]/10 bg-white/70 px-4 py-1.5 text-sm font-semibold text-[#2E1212] backdrop-blur"
              >
                <Icon
                  d="M15.5 4.5 19.5 8.5 9 19H5v-4zM13 7l4 4"
                  className="h-4 w-4 text-brand"
                />
                Test preparation
              </p>
              <h1
                className="mt-6 text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
                style={{ color: MAROON }}
              >
                {["Get the score", "your university"].map((l) => (
                  <span key={l} className="block overflow-hidden pb-[0.06em]">
                    <span data-tp-line className="block">
                      {l}
                    </span>
                  </span>
                ))}
                <span className="block overflow-hidden pb-[0.12em]">
                  <span data-tp-line className="block text-brand">
                    asks for.
                  </span>
                </span>
              </h1>
              <p
                data-tp-sub
                className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#2E1212]/65"
              >
                Expert coaching for IELTS, PTE, TOEFL, Duolingo, SAT, GRE and
                GMAT, with a plan built around your target score and deadline.
              </p>
              <div data-tp-sub className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/consultation"
                  className="group inline-flex h-13 items-center gap-3 rounded-full bg-[#2E1212] pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand"
                >
                  Book a free level check
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-brand">
                    <Arrow />
                  </span>
                </Link>
                <a
                  href="#tests"
                  className="inline-flex h-13 items-center rounded-full border border-[#2E1212]/15 bg-white/60 px-7 text-sm font-semibold text-[#2E1212] backdrop-blur transition-colors hover:bg-white"
                >
                  Compare the tests
                </a>
              </div>
            </div>

            {/* Score card */}
            <div className="relative mx-auto w-full max-w-md">
              <div
                data-tp-card
                className="relative rounded-[28px] bg-white p-7 shadow-[0_40px_90px_-40px_rgba(46,18,18,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: MAROON }}
                  >
                    Your target
                  </p>
                  <span className="rounded-full bg-[#C8102E]/10 px-3 py-1 text-xs font-semibold text-[#C8102E]">
                    IELTS Academic
                  </span>
                </div>
                <div className="relative mt-4">
                  <Gauge />
                  <div className="absolute inset-x-0 bottom-0 text-center">
                    <p
                      className="text-[3.4rem] font-semibold leading-none tracking-tight"
                      style={{ color: MAROON }}
                    >
                      <span data-tp-score>7.5</span>
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#2E1212]/45">
                      Overall band
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[
                    ["L", "8.0"],
                    ["R", "7.5"],
                    ["W", "7.0"],
                    ["S", "7.5"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl bg-[#FBF6EF] py-2.5 text-center"
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#2E1212]/45">
                        {k}
                      </p>
                      <p
                        className="mt-0.5 font-semibold"
                        style={{ color: MAROON }}
                      >
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-[#2E1212]/45">
                  Example score report
                </p>
              </div>
              {[
                ["PTE 65", "-left-8 -top-5 bg-[#0A6BB5]"],
                ["Duolingo 120", "-right-5 top-[42%] bg-[#58A700]"],
                ["GRE 320", "-left-3 -bottom-4 bg-[#4B2C83]"],
              ].map(([label, cls]) => (
                <span
                  key={label}
                  data-tp-chip
                  aria-hidden
                  className={`absolute z-10 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(46,18,18,0.5)] ${cls}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Test explorer */}
      <section id="tests" className="scroll-mt-24 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div data-tp-head className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Know your test
            </p>
            <h2
              className="mt-3 text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              Seven tests, explained simply
            </h2>
            <p className="mt-4 text-[#2E1212]/60">
              Format, timing, scoring and validity for each test, from the
              official test makers.
            </p>
          </div>

          <div data-tp-explorer className="mt-12">
            <div className="-mx-6 overflow-x-auto px-6 pb-2">
              <div
                role="tablist"
                aria-label="Choose a test"
                className="relative mx-auto flex w-max rounded-full border border-[#2E1212]/10 bg-white p-1.5 shadow-[0_14px_40px_-24px_rgba(46,18,18,0.45)]"
              >
                <span
                  ref={pill}
                  aria-hidden
                  className="absolute bottom-1.5 left-0 top-1.5 rounded-full"
                  style={{ width: 0 }}
                />
                {TESTS.map((x) => (
                  <button
                    key={x.key}
                    ref={(el) => {
                      tabs.current[x.key] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={active === x.key}
                    onClick={() => setActive(x.key)}
                    className={`relative z-10 h-11 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors duration-300 ${active === x.key ? "text-white" : "text-[#2E1212]/65 hover:text-[#2E1212]"}`}
                  >
                    {x.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
              {/* Intro */}
              <div
                className="relative overflow-hidden rounded-[28px] p-8 text-white sm:p-10"
                style={{
                  background: `linear-gradient(150deg, ${t.tint} 0%, #2E1212 120%)`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl"
                />
                <div data-tp-intro className="relative">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur">
                    {t.kind} test
                  </span>
                  <h3 className="mt-5 text-[clamp(2rem,3.6vw,2.8rem)] font-semibold leading-none tracking-tight">
                    {t.full}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-white/80">
                    {t.tagline}
                  </p>
                  <div className="mt-8 rounded-2xl bg-white/10 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                      Best for
                    </p>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed">
                      {t.goodFor}
                    </p>
                  </div>
                  <a
                    href={t.official.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    Official site: {t.official.label}
                    <Arrow className="h-3.5 w-3.5 -rotate-45" />
                  </a>
                </div>
              </div>

              {/* Facts and sections */}
              <div className="rounded-[28px] border border-[#2E1212]/8 bg-white p-6 sm:p-8">
                <dl className="grid grid-cols-2 gap-3">
                  {[
                    [
                      "Duration",
                      t.duration,
                      "M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
                    ],
                    [
                      "Score scale",
                      t.scale,
                      "M4 20h16M7 16V9M12 16V5M17 16v-4",
                    ],
                    [
                      "Results",
                      t.results,
                      "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
                    ],
                    [
                      "Score valid for",
                      t.validity,
                      "M3.5 5h17v15h-17zM3.5 10h17M8 3v4M16 3v4",
                    ],
                  ].map(([label, value, icon]) => (
                    <div
                      key={label}
                      data-tp-fact
                      className="rounded-2xl bg-[#FBF6EF] p-4"
                    >
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2E1212]/45">
                        <span style={{ color: t.tint }}>
                          <Icon d={icon} className="h-4 w-4" />
                        </span>
                        {label}
                      </dt>
                      <dd
                        className="mt-2 font-semibold leading-snug"
                        style={{ color: MAROON }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p
                  data-tp-fact
                  className="mt-4 flex items-center gap-2 text-sm text-[#2E1212]/60"
                >
                  <Icon d="M4 5h16v11H4zM2 19h20" className="h-4 w-4" />
                  {t.mode}
                </p>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#2E1212]/45">
                  Sections
                </p>
                <ul className="mt-3 space-y-3">
                  {t.sections.map((s) => (
                    <li key={s.name}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span
                          className="font-semibold"
                          style={{ color: MAROON }}
                        >
                          {s.name}
                        </span>
                        <span className="text-[#2E1212]/55">{s.time}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#2E1212]/6">
                        <div
                          data-tp-bar
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(8, (s.minutes / totalMin) * 100)}%`,
                            background: t.tint,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-[#2E1212]/45">
                  Checked against the official {t.official.label} website.
                  Formats and timings can change, so always confirm on the
                  official site before booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical scores */}
      <section className="bg-[#FBF6EF] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-tp-head>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              What score do I need?
            </p>
            <h2
              className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              Typical English score ranges
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[#2E1212]/60">
              A general guide to the scores universities often ask for. Every
              university and course sets its own requirement, sometimes with a
              minimum in each skill, so we always check yours.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[24px]">
              <Image
                src={photo("1517842645767-c639042777db")}
                alt=""
                fill
                sizes="(min-width:1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            data-tp-table
            className="overflow-hidden rounded-[26px] border border-[#2E1212]/8 bg-white"
          >
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-2 bg-[#2E1212] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
              <span>Study level</span>
              <span>IELTS</span>
              <span>PTE</span>
              <span>Duolingo</span>
            </div>
            {TYPICAL.map((r, i) => (
              <div
                key={r.level}
                data-tp-row
                className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-2 px-5 py-5 text-sm ${i ? "border-t border-[#2E1212]/8" : ""}`}
              >
                <span className="font-semibold" style={{ color: MAROON }}>
                  {r.level}
                </span>
                <span className="font-semibold text-[#C8102E]">{r.ielts}</span>
                <span className="font-semibold text-[#0A6BB5]">{r.pte}</span>
                <span className="font-semibold text-[#3F7F00]">{r.det}</span>
              </div>
            ))}
            <p className="border-t border-[#2E1212]/8 bg-[#FBF6EF] px-5 py-4 text-xs leading-relaxed text-[#2E1212]/55">
              Approximate ranges only, not official equivalences. Visa routes
              may set their own minimum scores.
            </p>
          </div>
        </div>
      </section>

      {/* How we prepare you */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div
            data-tp-head
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2
              className="max-w-lg text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              How we get you <span className="text-brand">test-ready</span>
            </h2>
            <p className="max-w-sm text-[#2E1212]/60">
              A clear plan from your first mock test to the day you book the
              real one.
            </p>
          </div>
          <div
            data-tp-steps
            className="relative mt-14 grid gap-6 md:grid-cols-4"
          >
            <span
              data-tp-stepline
              aria-hidden
              className="absolute left-0 right-0 top-[1.85rem] hidden h-px origin-left bg-[linear-gradient(90deg,#F47A2A,#F47A2A33)] md:block"
            />
            {STEPS.map((s, i) => (
              <div key={s.title} data-tp-step className="relative">
                <span className="relative z-10 grid h-[3.7rem] w-[3.7rem] place-items-center rounded-2xl bg-white text-brand shadow-[0_14px_30px_-18px_rgba(46,18,18,0.45)]">
                  <Icon d={s.icon} className="h-6 w-6" />
                </span>
                <p className="mt-5 text-xs font-semibold text-[#2E1212]/40">
                  STEP {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-1 text-lg font-semibold tracking-tight"
                  style={{ color: MAROON }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#2E1212]/60">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-5 [perspective:1200px] md:grid-cols-3">
            {OPTIONS.map((o) => (
              <div
                key={o.title}
                data-tp-option
                className={`group relative flex flex-col overflow-hidden rounded-[26px] p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 ${o.dark ? "bg-[#2E1212] text-white shadow-[0_34px_70px_-34px_rgba(46,18,18,0.7)]" : "border border-[#2E1212]/8 bg-white hover:shadow-[0_34px_70px_-34px_rgba(46,18,18,0.35)]"}`}
              >
                {o.dark && (
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/40 blur-3xl"
                  />
                )}
                {o.dark && (
                  <span className="relative mb-4 w-fit rounded-full bg-brand px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h3
                  className="relative text-xl font-semibold tracking-tight"
                  style={o.dark ? undefined : { color: MAROON }}
                >
                  {o.title}
                </h3>
                <p
                  className={`relative mt-2 text-[0.95rem] leading-relaxed ${o.dark ? "text-white/70" : "text-[#2E1212]/60"}`}
                >
                  {o.text}
                </p>
                <ul className="relative mt-6 space-y-2.5">
                  {o.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full ${o.dark ? "bg-brand text-white" : "bg-brand/12 text-brand"}`}
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M2.5 6.2 5 8.5l4.5-5" />
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/consultation"
                  className={`relative mt-8 inline-flex h-12 items-center justify-between rounded-full pl-6 pr-1.5 text-sm font-semibold transition-colors ${o.dark ? "bg-white text-[#2E1212] hover:bg-brand hover:text-white" : "bg-[#2E1212] text-white hover:bg-brand"}`}
                >
                  Ask about this
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-45 ${o.dark ? "bg-[#2E1212] text-white" : "bg-brand text-white"}`}
                  >
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#FBF6EF] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-tp-head>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Questions
            </p>
            <h2
              className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              Test prep FAQs
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${open ? "border-brand/30 bg-white" : "border-[#2E1212]/8 bg-white/60"}`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold" style={{ color: MAROON }}>
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500 ${open ? "rotate-45 bg-brand text-white" : "bg-[#2E1212]/6 text-[#2E1212]"}`}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-[#2E1212]/65">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-3 py-3">
        <div
          data-tp-cta
          className="relative overflow-hidden rounded-[32px] bg-[#2E1212] px-6 py-16 text-white sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#6464FF]/25 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                Not sure which test, or where to start?
              </h2>
              <p className="mt-3 max-w-md text-white/65">
                Book a free level check. We&apos;ll recommend the right test and
                a realistic plan for your target score.
              </p>
            </div>
            <Link
              href="/consultation"
              className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-brand pl-7 pr-2 text-sm font-semibold transition-colors hover:bg-white hover:text-[#2E1212]"
            >
              Book a free level check
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
