"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { COUNTRIES, UNIVERSITIES } from "./universitiesData";
import StepSlider from "./StepSlider";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const MAROON = "#2E1212";
const NIGHT = "#140E0D";

const STUDENT_PERKS = [
  {
    title: "Free expert counselling",
    text: "Talk to a certified counsellor at no cost, online or at our London and Dhaka offices.",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21c1.2-4 4-6 7.5-6s6.3 2 7.5 6",
  },
  {
    title: `${UNIVERSITIES.length}+ universities, ${COUNTRIES.length} countries`,
    text: "A shortlist built around your grades, budget and goals, not around a sales target.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18",
  },
  {
    title: "Scholarships found for you",
    text: "We search and apply for the funding you qualify for, so the cost never stops the dream.",
    icon: "m2 9 10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5",
  },
  {
    title: "Applications done right",
    text: "SOPs, references and documents checked line by line, and sent on time.",
    icon: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 14l2 2 4-4",
  },
  {
    title: "Visa and interview ready",
    text: "Checklists, mock embassy interviews and a calm expert by your side.",
    icon: "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6M9 17h6",
  },
  {
    title: "One counsellor, start to finish",
    text: "The same person who first met you is still there when you land.",
    icon: "M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4M9 12l2 2 4-4",
  },
];

const PARTNER_PERKS = [
  {
    title: `${UNIVERSITIES.length}+ universities`,
    text: `Place students across ${COUNTRIES.length} destinations, from the UK and Canada to Malta and Lithuania.`,
    icon: "M3 9.5 12 4l9 5.5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18",
  },
  {
    title: "A dedicated partner manager",
    text: "One named contact who knows your agency, your students and your goals.",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21c1.2-4 4-6 7.5-6s6.3 2 7.5 6",
  },
  {
    title: "Fast, tracked applications",
    text: "Clear status updates at every step, from submission to offer to CAS.",
    icon: "M3 12h4l3-8 4 16 3-8h4",
  },
  {
    title: "Transparent commission",
    text: "Clear terms and on-time payments for every student you enrol.",
    icon: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Training and marketing",
    text: "Product training, destination updates and ready-made materials for your counsellors.",
    icon: "M4 19V5l8 3 8-3v14l-8 3zM12 8v14",
  },
  {
    title: "Visa and compliance support",
    text: "Our visa team reviews files so your students arrive with fewer refusals and delays.",
    icon: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6zM9 12l2 2 4-4",
  },
];

// The hero's flight arc stays low and to the right, clear of the text.
const HERO_ARC = "M-20 410 C 260 410, 420 350, 600 280 S 940 120, 1240 30";
const HERO_AT = [0.12, 0.3, 0.5, 0.7, 0.88];

function Icon({ d, className = "h-6 w-6" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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

export default function HowWeWork() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Sit the hero's stops and labels exactly on its arc.
      const arc = root.current!.querySelector<SVGPathElement>("[data-h-arc]");
      if (arc) {
        const len = arc.getTotalLength();
        const stops = root.current!.querySelectorAll("[data-h-stop]");
        const labels = root.current!.querySelectorAll("[data-h-label]");
        HERO_AT.forEach((t, i) => {
          const pt = arc.getPointAtLength(len * t);
          stops[i]?.setAttribute("cx", pt.x.toFixed(1));
          stops[i]?.setAttribute("cy", pt.y.toFixed(1));
          labels[i]?.setAttribute("x", pt.x.toFixed(1));
          labels[i]?.setAttribute("y", (pt.y - 18).toFixed(1));
        });
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: the frame opens, the headline rises, the arc draws and a plane flies it on a loop.
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-h-frame]",
            { clipPath: "inset(8% 6% 8% 6% round 48px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.5,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-h-eyebrow]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.6,
          )
          .fromTo(
            "[data-h-line]",
            { yPercent: 120, rotate: 3 },
            { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.1 },
            0.65,
          )
          .fromTo(
            "[data-h-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            1,
          )
          .fromTo(
            "[data-h-arc]",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
            0.8,
          )
          .fromTo(
            "[data-h-stop]",
            { attr: { r: 0 } },
            {
              attr: { r: 5 },
              duration: 0.5,
              stagger: 0.18,
              ease: "back.out(3)",
            },
            1.1,
          )
          .fromTo(
            "[data-h-label]",
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.18 },
            1.2,
          );
        gsap.to("[data-h-plane]", {
          motionPath: {
            path: "[data-h-arc]",
            align: "[data-h-arc]",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 7,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 0.6,
          delay: 1.4,
        });
        gsap.to("[data-h-star]", {
          opacity: 0.15,
          duration: () => gsap.utils.random(1.2, 3),
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.1, from: "random" },
        });

        // Section headings and grids.
        gsap.utils.toArray<HTMLElement>("[data-w-head]").forEach((el) => {
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
        ScrollTrigger.batch("[data-w-perk]", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 60, autoAlpha: 0, rotateX: -18 },
              {
                y: 0,
                autoAlpha: 1,
                rotateX: 0,
                duration: 1.1,
                stagger: 0.1,
                ease: "expo.out",
                transformPerspective: 900,
              },
            ),
        });
        gsap.fromTo(
          "[data-p-glow]",
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-p-section]", start: "top 70%" },
          },
        );
        gsap.fromTo(
          "[data-p-stat]",
          { textContent: 0 },
          {
            textContent: (_: number, el: HTMLElement) => Number(el.dataset.to),
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.15,
            scrollTrigger: { trigger: "[data-p-stats]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  const heroStops = ["Chat", "Plan", "Apply", "Visa", "Fly"];

  return (
    <div ref={root}>
      {/* Hero: a night sky with a flight path */}
      <section className="px-3 pt-3">
        <div
          data-h-frame
          className="relative overflow-hidden rounded-[28px] px-6 pb-20 pt-36 text-white sm:px-10 lg:min-h-[calc(100svh-12px)] lg:pb-16"
          style={{
            background: `radial-gradient(120% 90% at 85% 110%, #6B2A0E 0%, ${NIGHT} 55%)`,
          }}
        >
          {/* Stars */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {Array.from({ length: 60 }, (_, i) => (
              <circle
                key={i}
                data-h-star
                cx={`${(i * 37.7) % 100}%`}
                cy={`${(i * 53.3) % 70}%`}
                r={i % 7 === 0 ? 1.4 : 0.8}
                fill="#fff"
                opacity={0.25 + ((i * 13) % 50) / 100}
              />
            ))}
          </svg>
          <div
            aria-hidden
            className="absolute -right-40 bottom-[-30%] h-[40rem] w-[40rem] rounded-full bg-brand/25 blur-[120px]"
          />

          {/* The flight arc across the hero */}
          <svg
            aria-hidden
            viewBox="0 0 1200 420"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[58%] w-full lg:block"
          >
            <path
              data-h-arc
              d={HERO_ARC}
              fill="none"
              stroke="#F47A2A"
              strokeWidth="2"
              strokeDasharray="1"
              pathLength={1}
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d={HERO_ARC}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.12"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {heroStops.map((label, i) => (
              <g key={i}>
                <circle
                  data-h-stop
                  cx="0"
                  cy="0"
                  r="5"
                  fill={NIGHT}
                  stroke="#F47A2A"
                  strokeWidth="2.5"
                />
                <text
                  data-h-label
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#fff"
                  fillOpacity="0.7"
                  fontSize="13"
                  fontWeight="600"
                  letterSpacing="1.5"
                >
                  {label.toUpperCase()}
                </text>
              </g>
            ))}
            <g data-h-plane>
              <circle r="20" fill="#F47A2A" opacity="0.2" />
              <path d="M12 0 -8 -8 -4 0 -8 8Z" fill="#fff" />
            </g>
          </svg>

          <div className="relative mx-auto max-w-6xl">
            <p
              data-h-eyebrow
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
              How We Work
            </p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.7rem,7vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
              {["Comprehensive", "support for your"].map((l) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <span data-h-line className="block origin-left">
                    {l}
                  </span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.12em]">
                <span data-h-line className="block origin-left text-brand">
                  journey.
                </span>
              </span>
            </h1>
            <p
              data-h-sub
              className="mt-7 max-w-lg text-lg leading-relaxed text-white/65"
            >
              Eight clear steps, one counsellor beside you, from the very first
              chat to the day you take off.
            </p>
            <div data-h-sub className="mt-9 flex flex-wrap gap-3">
              <a
                href="#journey"
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-brand pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E1212]"
              >
                See the journey
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:rotate-90">
                  <Arrow />
                </span>
              </a>
              <Link
                href="/consultation"
                className="inline-flex h-13 items-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a free chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StepSlider />

      {/* Student advantages */}
      <section className="bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div
            data-w-head
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-[#C95A14]">
                For students
              </span>
              <h2
                className="mt-5 max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
                style={{ color: MAROON }}
              >
                The student <span className="text-brand">advantage</span>
              </h2>
            </div>
            <p className="max-w-sm text-[1.02rem] leading-relaxed text-[#2E1212]/60">
              Everything you need to study abroad, handled by people who have
              done it hundreds of times.
            </p>
          </div>

          <div className="mt-14 grid gap-4 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">
            {/* Feature card with a photo */}
            <div
              data-w-perk
              className="group relative overflow-hidden rounded-[26px] md:col-span-2 lg:col-span-1 lg:row-span-3"
            >
              <Image
                src="/study-abroad-consultation.png"
                alt=""
                fill
                sizes="(min-width:1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1A0B0B]/90 via-[#1A0B0B]/30 to-transparent" />
              <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                  Your counsellor
                </p>
                <p className="mt-2 text-2xl font-semibold leading-snug tracking-tight">
                  One plan. One team. Zero guesswork.
                </p>
                <Link
                  href="/consultation"
                  className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-brand hover:text-white"
                >
                  Book a free session <Arrow className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            {STUDENT_PERKS.map((p, i) => (
              <div
                key={p.title}
                data-w-perk
                className="group relative overflow-hidden rounded-[26px] border border-[#2E1212]/8 bg-[#FBF6EF] p-7 transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(46,18,18,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition-colors duration-700 group-hover:bg-brand/25"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-[0_10px_24px_-14px_rgba(46,18,18,0.4)] transition-all duration-500 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                    <Icon d={p.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-[#2E1212]/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="relative mt-6 text-lg font-semibold tracking-tight"
                  style={{ color: MAROON }}
                >
                  {p.title}
                </h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-[#2E1212]/60">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment partner advantages */}
      <section className="px-3 pb-3">
        <div
          data-p-section
          className="relative overflow-hidden rounded-[32px] px-6 py-24 text-white sm:px-10 sm:py-28"
          style={{ background: NIGHT }}
        >
          <div
            data-p-glow
            aria-hidden
            className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand/25 blur-[120px]"
          />
          <div
            data-p-glow
            aria-hidden
            className="absolute -bottom-48 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#6464FF]/25 blur-[120px]"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          >
            <defs>
              <pattern
                id="p-grid"
                width="44"
                height="44"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M44 0H0V44"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#p-grid)" />
          </svg>

          <div className="relative mx-auto max-w-6xl">
            <div
              data-w-head
              className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold">
                  For recruitment partners
                </span>
                <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                  The partner <span className="text-brand">advantage</span>
                </h2>
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/60">
                  Agencies, schools and independent counsellors: place your
                  students with confidence, backed by our team in London and
                  Dhaka.
                </p>
              </div>
              <dl data-p-stats className="grid grid-cols-3 gap-3">
                {[
                  [UNIVERSITIES.length, "+", "universities"],
                  [COUNTRIES.length, "", "countries"],
                  [2, "", "offices"],
                ].map(([n, plus, l]) => (
                  <div
                    key={String(l)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                  >
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-[2.2rem] font-semibold leading-none tracking-tight">
                      <span data-p-stat data-to={n}>
                        {n}
                      </span>
                      <span className="text-brand">{plus}</span>
                    </dd>
                    <dd className="mt-1.5 text-sm text-white/55">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-14 grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
              {PARTNER_PERKS.map((p) => (
                <div
                  key={p.title}
                  data-w-perk
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1.5 hover:border-brand/50 hover:bg-white/[0.07]"
                >
                  {/* A light sweep across the card on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]"
                  />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-brand transition-all duration-500 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                    <Icon d={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/60">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              data-w-head
              className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-brand p-7 sm:flex-row sm:items-center sm:p-8"
            >
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  Ready to grow with us?
                </p>
                <p className="mt-1 text-white/85">
                  Apply in a few minutes. A partner manager will be in touch.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("signup:open"))}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#2E1212] hover:text-white"
                >
                  Become a partner{" "}
                  <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full border border-white/40 px-6 text-sm font-semibold transition-colors hover:bg-white/10"
                >
                  Talk to partnerships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
