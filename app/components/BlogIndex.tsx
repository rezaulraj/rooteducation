"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import {
  CATEGORIES,
  CATEGORY_TINT,
  POSTS,
  blogImage,
  formatDate,
  type BlogPost,
  type Category,
} from "./blogPosts";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const MAROON = "#2E1212";
type Filter = "All" | Category;

// The newest guide is featured in the hero; the rest fill the grid.
const [FEATURED, ...REST] = POSTS;
const FILTERS: Filter[] = [
  "All",
  ...CATEGORIES.filter((c) => REST.some((p) => p.category === c)),
];

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
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

export function CategoryChip({
  c,
  solid = false,
}: {
  c: Category;
  solid?: boolean;
}) {
  const tint = CATEGORY_TINT[c];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] backdrop-blur"
      style={
        solid
          ? { background: tint, color: "#fff" }
          : { background: "rgba(255,255,255,0.92)", color: tint }
      }
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: solid ? "#fff" : tint }}
      />
      {c}
    </span>
  );
}

/** A post card, used on the blog page and under each article. */
export function BlogCard({ p }: { p: BlogPost }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group flex h-full flex-col rounded-[26px] border border-[#2E1212]/8 bg-white p-2.5 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_34px_70px_-34px_rgba(46,18,18,0.4)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-[20px]">
        <Image
          src={blogImage(p.img, 900)}
          alt=""
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
        />
        <div className="absolute left-3 top-3">
          <CategoryChip c={p.category} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <p className="text-xs font-medium text-[#2E1212]/50">
          {formatDate(p.date)} · {p.read} min read
        </p>
        <h3
          className="mt-2.5 text-[1.2rem] font-semibold leading-snug tracking-tight"
          style={{ color: MAROON }}
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1.5px] bg-bottom-left bg-no-repeat transition-[background-size] duration-500 group-hover:bg-size-[100%_1.5px]">
            {p.title}
          </span>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-[#2E1212]/60">
          {p.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs font-medium text-[#2E1212]/55">
            {p.author}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2E1212] text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-brand">
            <Arrow className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogIndex() {
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const featured = FEATURED;
  const rest = REST;
  const filters = FILTERS;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return new Set(
      rest
        .filter(
          (p) =>
            (filter === "All" || p.category === filter) &&
            (!q ||
              `${p.title} ${p.excerpt} ${p.category}`
                .toLowerCase()
                .includes(q)),
        )
        .map((p) => p.slug),
    );
  }, [filter, query, rest]);

  // Remember where every card is, just before the filter changes.
  const capture = () => {
    if (grid.current)
      flipState.current = Flip.getState(
        grid.current.querySelectorAll("[data-b-card]"),
      );
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-bh-frame]",
            { clipPath: "inset(6% 4% 6% 4% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-bh-eyebrow]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.5,
          )
          .fromTo(
            "[data-bh-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.55,
          )
          .fromTo(
            "[data-bh-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            0.85,
          )
          .fromTo(
            "[data-bh-feature]",
            { clipPath: "inset(100% 0% 0% 0% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "power4.inOut",
            },
            0.5,
          )
          .fromTo(
            "[data-bh-feature-img]",
            { scale: 1.35 },
            { scale: 1, duration: 1.8 },
            0.6,
          )
          .fromTo(
            "[data-bh-feature-text] > *",
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            1.2,
          );

        gsap.fromTo(
          "[data-bh-orb]",
          { scale: 0.8 },
          {
            scale: 1.15,
            xPercent: 8,
            yPercent: -6,
            duration: 7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 1.5,
          },
        );

        gsap.fromTo(
          "[data-bf-bar] > *",
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-bf-bar]", start: "top 88%" },
          },
        );

        ScrollTrigger.batch("[data-b-card]", {
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
          "[data-b-cta]",
          { clipPath: "inset(18% 8% 18% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-b-cta]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // After a filter or search: glide cards to their new places, fade out leavers, pop in arrivals.
  useGSAP(
    () => {
      const t = tabs.current[filter];
      if (t && pill.current)
        gsap.to(pill.current, {
          x: t.offsetLeft,
          width: t.offsetWidth,
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
    { scope: root, dependencies: [filter, shown] },
  );

  return (
    <div ref={root}>
      {/* Hero with the featured guide */}
      <section className="px-3 pt-3">
        <div
          data-bh-frame
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#FFF5EC_0%,#FFE6D2_55%,#FFD3B0_100%)] px-6 pb-14 pt-32 sm:px-10 lg:pb-16 lg:pt-36"
        >
          <div
            data-bh-orb
            aria-hidden
            className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/60 blur-[90px]"
          />
          <div
            data-bh-orb
            aria-hidden
            className="absolute -bottom-32 left-[20%] h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[100px]"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              maskImage:
                "radial-gradient(70% 70% at 15% 40%, black, transparent 75%)",
            }}
          >
            <defs>
              <pattern
                id="bh-grid"
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
            <rect width="100%" height="100%" fill="url(#bh-grid)" />
          </svg>

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <p
                data-bh-eyebrow
                className="inline-flex items-center gap-2.5 rounded-full border border-[#2E1212]/10 bg-white/70 px-4 py-1.5 text-sm font-semibold text-[#5A4FF0] backdrop-blur"
              >
                <svg viewBox="0 0 26 18" className="h-3 w-4" aria-hidden>
                  <path
                    d="M3 0H18Q20 0 21.3 1.6L25.4 7.6Q26.4 9 25.4 10.4L21.3 16.4Q20 18 18 18H3Q0 18 0 15V3Q0 0 3 0Z"
                    fill="#5A4FF0"
                  />
                </svg>
                Blog &amp; guides
              </p>
              <h1
                className="mt-6 text-[clamp(2.6rem,5.8vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
                style={{ color: MAROON }}
              >
                {["Guides for every", "step of your"].map((l) => (
                  <span key={l} className="block overflow-hidden pb-[0.06em]">
                    <span data-bh-line className="block">
                      {l}
                    </span>
                  </span>
                ))}
                <span className="block overflow-hidden pb-[0.12em]">
                  <span data-bh-line className="block text-brand">
                    journey abroad.
                  </span>
                </span>
              </h1>
              <p
                data-bh-sub
                className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#2E1212]/65"
              >
                Practical advice from our counsellors on choosing a country,
                applying, funding your studies, visas and settling in.
              </p>
              <label
                data-bh-sub
                className="mt-8 flex h-14 max-w-md items-center gap-3 rounded-full border border-[#2E1212]/10 bg-white pl-5 pr-2 shadow-[0_18px_40px_-24px_rgba(46,18,18,0.45)] transition-shadow focus-within:shadow-[0_0_0_4px_rgba(244,122,42,0.18)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-[#2E1212]/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    capture();
                    setQuery(e.target.value);
                  }}
                  placeholder="Search guides, e.g. visa, IELTS"
                  aria-label="Search guides"
                  className="h-full min-w-0 flex-1 bg-transparent text-[0.95rem] text-[#2E1212] outline-none placeholder:text-[#2E1212]/35"
                />
                <a
                  href="#guides"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2E1212] text-white transition-colors hover:bg-brand"
                  aria-label="Go to guides"
                >
                  <Arrow />
                </a>
              </label>
            </div>

            {/* Featured */}
            <Link
              data-bh-feature
              href={`/blog/${featured.slug}`}
              className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[28px] p-7 text-white sm:min-h-[32rem] sm:p-9"
            >
              <div data-bh-feature-img className="absolute inset-0 -z-10">
                <Image
                  src={blogImage(featured.img, 1600)}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  preload
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-t from-[#1A0B0B]/95 via-[#1A0B0B]/35 to-transparent"
              />
              <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                Latest guide
              </span>
              <div data-bh-feature-text>
                <div className="flex flex-wrap items-center gap-3">
                  <CategoryChip c={featured.category} solid />
                  <span className="text-xs text-white/75">
                    {formatDate(featured.date)} · {featured.read} min read
                  </span>
                </div>
                <h2 className="mt-4 max-w-xl text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2.5 text-sm font-semibold">
                  Read the guide
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:-rotate-45">
                    <Arrow />
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* All guides */}
      <section id="guides" className="scroll-mt-24 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div
            data-bf-bar
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <h2
                className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
                style={{ color: MAROON }}
              >
                All guides
              </h2>
              <p className="mt-2 text-[#2E1212]/55" aria-live="polite">
                {shown.size} {shown.size === 1 ? "guide" : "guides"}
                {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
              </p>
            </div>
            <div
              role="tablist"
              aria-label="Filter by topic"
              className="relative -mx-6 flex gap-1 overflow-x-auto px-6 pb-1 lg:mx-0 lg:overflow-visible lg:px-0"
            >
              <div className="relative inline-flex shrink-0 rounded-full border border-[#2E1212]/10 bg-white p-1 shadow-[0_10px_30px_-20px_rgba(46,18,18,0.4)]">
                <span
                  ref={pill}
                  aria-hidden
                  className="absolute bottom-1 left-0 top-1 rounded-full bg-[#2E1212]"
                  style={{ width: 0 }}
                />
                {filters.map((f) => (
                  <button
                    key={f}
                    ref={(el) => {
                      tabs.current[f] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={filter === f}
                    onClick={() => {
                      if (f === filter) return;
                      capture();
                      setFilter(f);
                    }}
                    className={`relative z-10 h-10 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${filter === f ? "text-white" : "text-[#2E1212]/65 hover:text-[#2E1212]"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={grid}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((p) => (
              <div
                key={p.slug}
                data-b-card
                className={shown.has(p.slug) ? "" : "hidden"}
              >
                <BlogCard p={p} />
              </div>
            ))}
          </div>

          {shown.size === 0 && (
            <div className="mt-12 rounded-[26px] border border-dashed border-[#2E1212]/15 bg-[#FBF6EF] p-12 text-center">
              <p className="text-lg font-semibold" style={{ color: MAROON }}>
                No guides match that yet.
              </p>
              <p className="mt-2 text-[#2E1212]/60">
                Try another word, or ask a counsellor directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  capture();
                  setQuery("");
                  setFilter("All");
                }}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-[#2E1212] px-6 text-sm font-semibold text-white transition-colors hover:bg-brand"
              >
                Show all guides
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="px-3 pb-3">
        <div
          data-b-cta
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
                Have a question a guide can&apos;t answer?
              </h2>
              <p className="mt-3 max-w-md text-white/65">
                Talk to a counsellor for free. We&apos;ll look at your grades,
                budget and goals and give you a clear plan.
              </p>
            </div>
            <Link
              href="/consultation"
              className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-brand pl-7 pr-2 text-sm font-semibold transition-colors hover:bg-white hover:text-[#2E1212]"
            >
              Book a free consultation
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
