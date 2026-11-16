"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import DuotoneRoster from "./DuotoneRoster";
import { STORIES, storyPhoto, type Story } from "./storiesData";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const MAROON = "#2E1212";

// Root's colours as the roster's burning field and photo tritone.
const ROOT_PALETTE = {
  ground: "#140805",
  deep: "#5B2410",
  hot: "#F47A2A",
  glow: "#FFB07A",
  ink: "#FFF3E8",
  shadow: "#2E1212",
  highlight: "#FFE6D2",
};

const DESTS = ["All", ...Array.from(new Set(STORIES.map((s) => s.to.country)))];

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

function Flag({
  code,
  className = "h-6 w-6",
}: {
  code: string;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ring-2 ring-white ${className}`}
    >
      <Image
        src={`/flags/${code}.svg`}
        alt=""
        fill
        sizes="24px"
        className="object-cover"
        unoptimized
      />
    </span>
  );
}

function Route({ s, light = false }: { s: Story; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold ${light ? "text-white/80" : "text-[#2E1212]/65"}`}
    >
      <Flag code={s.from.flag} className="h-5 w-5" />
      {s.from.country}
      <svg
        viewBox="0 0 24 8"
        className="h-2 w-6 text-brand"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M1 4h20M17 1l4 3-4 3" />
      </svg>
      <Flag code={s.to.flag} className="h-5 w-5" />
      {s.to.country}
    </span>
  );
}

function StoryCard({ s }: { s: Story }) {
  return (
    <article
      id={`story-${s.slug}`}
      className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[26px] border border-[#2E1212]/8 bg-white transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-34px_rgba(46,18,18,0.45)] target:ring-4 target:ring-brand/40"
    >
      <div className="relative flex gap-4 p-5 pb-0">
        <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={storyPhoto(s.photo)}
            alt={s.name}
            fill
            sizes="64px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </span>
        <span className="min-w-0">
          <span
            className="block text-lg font-semibold tracking-tight"
            style={{ color: MAROON }}
          >
            {s.name}
          </span>
          <span className="mt-0.5 block text-sm text-[#2E1212]/60">
            {s.course}
          </span>
          <span className="mt-2 block">
            <Route s={s} />
          </span>
        </span>
      </div>
      <blockquote className="relative flex-1 px-5 pt-5">
        <svg
          viewBox="0 0 32 24"
          className="h-5 w-7 text-brand"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h5v12zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h5v12z" />
        </svg>
        <p
          className="mt-3 text-[1.08rem] font-medium leading-snug tracking-tight"
          style={{ color: MAROON }}
        >
          {s.quote}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#2E1212]/60">
          {s.story}
        </p>
      </blockquote>
      <footer className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#2E1212]/8 bg-[#FBF6EF] px-5 py-4 text-xs font-semibold">
        <span className="rounded-full bg-white px-3 py-1 text-[#2E1212]/75">
          {s.university}
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-[#2E1212]/55">
          {s.intake}
        </span>
        {s.scholarship && (
          <span className="rounded-full bg-brand/12 px-3 py-1 text-[#C95A14]">
            ★ {s.scholarship}
          </span>
        )}
      </footer>
    </article>
  );
}

export default function SuccessStories() {
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const flipState = useRef<Flip.FlipState | null>(null);
  const [dest, setDest] = useState("All");
  const [featured, setFeatured] = useState(0);
  const f = STORIES[featured];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-s-head]").forEach((el) => {
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
          "[data-s-feature]",
          { clipPath: "inset(10% 8% 10% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-s-feature]", start: "top 80%" },
          },
        );
        ScrollTrigger.batch("[data-s-card]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 70, autoAlpha: 0, rotate: 1.5 },
              {
                y: 0,
                autoAlpha: 1,
                rotate: 0,
                duration: 1.1,
                stagger: 0.09,
                ease: "expo.out",
                overwrite: true,
              },
            ),
        });
        gsap.fromTo(
          "[data-s-cta]",
          { clipPath: "inset(18% 8% 18% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-s-cta]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // Featured story: changes every few seconds, with a soft crossfade.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-s-fimg]",
        { scale: 1.15, autoAlpha: 0.4 },
        { scale: 1, autoAlpha: 1, duration: 1.1, ease: "expo.out" },
      );
      gsap.fromTo(
        "[data-s-ftext] > *",
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "expo.out" },
      );
      const t = gsap.delayedCall(7, () =>
        setFeatured((i) => (i + 1) % STORIES.length),
      );
      return () => t.kill();
    },
    { scope: root, dependencies: [featured] },
  );

  // Filter: the pill slides, the cards glide into their new places.
  useGSAP(
    () => {
      const tab = tabs.current[dest];
      if (tab && pill.current)
        gsap.to(pill.current, {
          x: tab.offsetLeft,
          width: tab.offsetWidth,
          duration: 0.6,
          ease: "expo.out",
        });
      const state = flipState.current;
      flipState.current = null;
      if (
        !state ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      Flip.from(state, {
        duration: 0.7,
        ease: "expo.out",
        absolute: true,
        stagger: 0.03,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, scale: 0.92, y: 30 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "expo.out" },
          ),
        onLeave: (els) =>
          gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.3 }),
      });
    },
    { scope: root, dependencies: [dest] },
  );

  return (
    <div ref={root}>
      {/* Hero: the drifting portrait wall */}
      <section className="px-3 pt-3">
        <div className="overflow-hidden rounded-[28px]">
          <DuotoneRoster
            people={STORIES.map((s) => ({
              name: s.name,
              role: `${s.course} · ${s.university}`,
              craft: `${s.from.country} → ${s.to.country}`,
              bio: `“${s.quote}”`,
              photo: storyPhoto(s.photo),
              focus: "50% 30%",
              href: `#story-${s.slug}`,
            }))}
            palette={ROOT_PALETTE}
            eyebrow="Student"
            title={"Success\nstories"}
            intro="Real plans, real offers, real departures. Hover or tap a student to see where their journey took them."
            cta={{ label: "Start your story", href: "/consultation" }}
            secondaryCta={{ label: "Read their journeys", href: "#journeys" }}
            columns={3}
            driftSeconds={9}
            height="calc(100svh - 12px)"
            labels={{ team: "Students", memberLink: "Read the story" }}
          />
        </div>
      </section>

      {/* Featured story */}
      <section className="px-6 pt-20 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div
            data-s-feature
            className="relative grid overflow-hidden rounded-[32px] bg-[#2E1212] text-white md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative min-h-[22rem] overflow-hidden">
              <div data-s-fimg key={f.slug} className="absolute inset-0">
                <Image
                  src={storyPhoto(f.photo)}
                  alt={f.name}
                  fill
                  sizes="(min-width:768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-[#2E1212]/80 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-[#2E1212]"
              />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                Featured story
              </span>
            </div>
            <div className="relative p-8 sm:p-12">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
              />
              <div data-s-ftext key={f.slug} className="relative">
                <Route s={f} light />
                <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
                  &ldquo;{f.quote}&rdquo;
                </p>
                <p className="mt-5 max-w-lg leading-relaxed text-white/65">
                  {f.story}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span>
                    <span className="block font-semibold">{f.name}</span>
                    <span className="block text-sm text-white/60">
                      {f.course}, {f.university}
                    </span>
                  </span>
                </div>
              </div>
              <div className="relative mt-10 flex items-center gap-3">
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-label={d < 0 ? "Previous story" : "Next story"}
                    onClick={() =>
                      setFeatured(
                        (i) => (i + d + STORIES.length) % STORIES.length,
                      )
                    }
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-[#2E1212]"
                  >
                    <Arrow className={`h-4 w-4 ${d < 0 ? "rotate-180" : ""}`} />
                  </button>
                ))}
                <span className="ml-2 text-sm tabular-nums text-white/55">
                  {String(featured + 1).padStart(2, "0")} /{" "}
                  {String(STORIES.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All journeys */}
      <section id="journeys" className="scroll-mt-24 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div
            data-s-head
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Their journeys
              </p>
              <h2
                className="mt-3 text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
                style={{ color: MAROON }}
              >
                Every story started with{" "}
                <span className="text-brand">one chat</span>
              </h2>
            </div>
            <div className="-mx-6 overflow-x-auto px-6 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
              <div
                role="tablist"
                aria-label="Filter by destination"
                className="relative inline-flex rounded-full border border-[#2E1212]/10 bg-white p-1 shadow-[0_10px_30px_-20px_rgba(46,18,18,0.4)]"
              >
                <span
                  ref={pill}
                  aria-hidden
                  className="absolute bottom-1 left-0 top-1 rounded-full bg-[#2E1212]"
                  style={{ width: 0 }}
                />
                {DESTS.map((d) => (
                  <button
                    key={d}
                    ref={(el) => {
                      tabs.current[d] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={dest === d}
                    onClick={() => {
                      if (d === dest) return;
                      if (grid.current)
                        flipState.current = Flip.getState(
                          grid.current.querySelectorAll("[data-s-card]"),
                        );
                      setDest(d);
                    }}
                    className={`relative z-10 h-10 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${dest === d ? "text-white" : "text-[#2E1212]/65 hover:text-[#2E1212]"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={grid}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {STORIES.map((s) => (
              <div
                key={s.slug}
                data-s-card
                className={
                  dest === "All" || s.to.country === dest ? "" : "hidden"
                }
              >
                <StoryCard s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-3 pb-3">
        <div
          data-s-cta
          className="relative overflow-hidden rounded-[32px] bg-[radial-gradient(120%_120%_at_20%_0%,#F47A2A_0%,#B5481A_45%,#2E1212_100%)] px-6 py-16 text-white sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="flex items-center gap-6">
              <span className="hidden -space-x-4 sm:flex">
                {STORIES.slice(0, 5).map((s) => (
                  <span
                    key={s.slug}
                    className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-[#7A2E12]"
                  >
                    <Image
                      src={storyPhoto(s.photo)}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </span>
              <div>
                <h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                  Your story starts here.
                </h2>
                <p className="mt-3 max-w-md text-white/75">
                  Book a free consultation and we&apos;ll plan your journey
                  together.
                </p>
              </div>
            </div>
            <Link
              href="/consultation"
              className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-white pl-7 pr-2 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#2E1212] hover:text-white"
            >
              Book a free consultation
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
