"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";

// Each week: its colour, the step it covers, whether the label sits above or below, and the paler "ghost" chevrons trailing it.
const WEEKS = [
  {
    color: "#6464FF",
    step: "Find the right universities",
    above: true,
    ghosts: [] as string[],
  },
  { color: "#FFB321", step: "Plan your finances", above: false, ghosts: [] },
  {
    color: "#FF8A52",
    step: "Prepare for exams",
    above: true,
    ghosts: ["#C3D2FF"],
  },
  {
    color: "#EC6825",
    step: "Unlock scholarships",
    above: false,
    ghosts: ["#FFBE96", "#EC6825"],
  },
  { color: "#4A1814", step: "Get visa ready", above: true, ghosts: [] },
];
const GHOST = 0.3; // how far each ghost sticks out, as a share of a chevron's width

/** A chevron with softly rounded corners: flat on the left, pointed on the right (220 × 108 box). */
const CHEVRON =
  "M12 0H178Q186 0 191 6L216 47Q220 54 216 61L191 102Q186 108 178 108H12Q0 108 0 96V12Q0 0 12 0Z";

function Chevron({
  color,
  className = "",
  style,
  children,
}: {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`} style={style}>
      <svg
        viewBox="0 0 220 108"
        preserveAspectRatio="none"
        className="block h-full w-full"
        aria-hidden
      >
        <path d={CHEVRON} fill={color} />
      </svg>
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
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

export default function HowWeHelp() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as {
            desktop: boolean;
            motion: boolean;
          };
          if (!motion) return;

          gsap
            .timeline({
              scrollTrigger: { trigger: root.current, start: "top 75%" },
            })
            .fromTo(
              "[data-hw-eyebrow]",
              { x: -24, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            )
            .fromTo(
              "[data-hw-line]",
              { yPercent: 115 },
              { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" },
              0.1,
            )
            .fromTo(
              "[data-hw-side]",
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
              },
              0.35,
            );

          // The chevrons race in from the left one after another, then their ghosts slide out and the labels settle.
          const tl = gsap.timeline({
            scrollTrigger: { trigger: "[data-hw-track]", start: "top 80%" },
          });
          tl.fromTo(
            "[data-hw-chev]",
            desktop
              ? { xPercent: -60, autoAlpha: 0, scaleX: 0.6 }
              : { x: -60, autoAlpha: 0 },
            desktop
              ? {
                  xPercent: 0,
                  autoAlpha: 1,
                  scaleX: 1,
                  duration: 0.9,
                  stagger: 0.14,
                  ease: "expo.out",
                  transformOrigin: "0% 50%",
                }
              : {
                  x: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  stagger: 0.12,
                  ease: "expo.out",
                },
          )
            .fromTo(
              "[data-hw-week]",
              { autoAlpha: 0, x: -10 },
              { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.14 },
              0.3,
            )
            .fromTo(
              "[data-hw-ghost]",
              { xPercent: -100 * GHOST, autoAlpha: 0 },
              {
                xPercent: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
              },
              0.75,
            )
            .fromTo(
              "[data-hw-label]",
              {
                y: (i: number, el: HTMLElement) =>
                  el.dataset.above ? 16 : -16,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
              },
              0.55,
            );

          // A soft light keeps sweeping across the row.
          gsap.fromTo(
            "[data-hw-sheen]",
            { xPercent: -120 },
            {
              xPercent: 520,
              duration: 3.6,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: 1.6,
              delay: 1.8,
            },
          );
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="how-title"
      className="overflow-hidden bg-white px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p
              data-hw-eyebrow
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.04em] text-[#6464FF] sm:text-base"
            >
              <svg
                viewBox="0 0 26 18"
                className="h-[18px] w-[26px]"
                aria-hidden
              >
                <path
                  d="M3 0H18Q20 0 21.3 1.6L25.4 7.6Q26.4 9 25.4 10.4L21.3 16.4Q20 18 18 18H3Q0 18 0 15V3Q0 0 3 0Z"
                  fill="#6464FF"
                />
              </svg>
              How we help you
            </p>
            <h2
              id="how-title"
              className="mt-5 text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[1] tracking-[-0.045em]"
              style={{ color: MAROON }}
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hw-line className="block">
                  We got you covered
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span data-hw-line className="block">
                  from Day one
                </span>
              </span>
            </h2>
          </div>
          <div className="max-w-sm lg:pt-2">
            <p
              data-hw-side
              className="text-lg leading-relaxed"
              style={{ color: MAROON }}
            >
              Every student starts with a dream, but not everyone knows how to
              take it global. Root Education opens that door.
            </p>
            <Link
              data-hw-side
              href="/consultation"
              className="group mt-6 inline-flex h-14 items-center gap-3 rounded-full bg-[#0B0B0C] pl-7 pr-2 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start Your Journey
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>

        {/* The five weeks: a row of chevrons on desktop, a stack on phones */}
        <ol
          data-hw-track
          aria-label="Your journey, week by week"
          className="relative mt-20 flex flex-col gap-4 md:mt-28 md:flex-row md:gap-1.5 md:pb-16 md:pt-16"
        >
          {WEEKS.map((w, i) => {
            const grow = 1 + GHOST * w.ghosts.length;
            return (
              <li
                key={w.step}
                className="relative md:min-w-0"
                style={{ flex: `${grow} 1 0%` }}
              >
                {/* Label: above or below on desktop, beside on phones */}
                <p
                  data-hw-label
                  data-above={w.above ? "1" : undefined}
                  className={`mb-2 text-sm font-medium uppercase tracking-[0.02em] md:absolute md:left-0 md:mb-0 md:whitespace-nowrap md:text-[1.02rem] ${w.above ? "md:-top-12" : "md:-bottom-12"} ${i === WEEKS.length - 1 ? "md:left-auto md:right-0" : ""}`}
                  style={{ color: MAROON }}
                >
                  {w.step}
                </p>

                <div
                  data-hw-chev
                  className="group relative h-20 md:h-[6.75rem]"
                >
                  {/* Ghost chevrons, tucked behind and peeking out to the right */}
                  {w.ghosts
                    .map((g, k) => ({ g, k }))
                    .reverse()
                    .map(({ g, k }) => (
                      <div
                        key={k}
                        className="absolute inset-y-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                        style={{
                          left: `${((k + 1) * GHOST * 100) / grow}%`,
                          width: `${100 / grow}%`,
                        }}
                      >
                        <div data-hw-ghost className="h-full">
                          <Chevron color={g} className="h-full" />
                        </div>
                      </div>
                    ))}

                  {/* The week itself */}
                  <Chevron
                    color={w.color}
                    style={{ width: `${100 / grow}%` }}
                    className="relative z-10 h-full overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 grid place-items-center pr-[8%]">
                      <span
                        data-hw-week
                        className="text-base font-medium uppercase tracking-[0.04em] text-white sm:text-lg"
                      >
                        Week {i + 1}
                      </span>
                    </span>
                  </Chevron>
                </div>
              </li>
            );
          })}

          {/* A soft light that sweeps across the row */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-16 left-0 z-20 hidden w-1/5 md:block"
          >
            <span
              data-hw-sheen
              className="block h-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            />
          </span>
        </ol>
      </div>
    </section>
  );
}
