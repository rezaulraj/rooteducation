"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { COUNTRIES, SUBJECTS, UNIVERSITIES, type CountryInfo, type Level, type SubjectKey, type University } from "./universitiesData";
import { UNIVERSITY_LOGOS } from "./universityLogos";
import { uniSlug } from "./programmes";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const countryOf = (slug: string) => COUNTRIES.find((c) => c.slug === slug)!;
const subjectOf = (key: SubjectKey) => SUBJECTS.find((s) => s.key === key)!;
const STOP = new Set(["University", "The", "of", "Of", "and", "College", "Institute", "Universidad", "Universiti", "Université", "de", "di", "Technology", "Royal"]);
/** A short monogram: the official acronym if the name has one, otherwise the initials of its key words. */
const initials = (name: string) => {
  const acr = name.match(/\(([A-Z]{2,5})\)/)?.[1];
  if (acr) return acr;
  if (/^[A-Z]{2,6}$/.test(name)) return name;
  const words = name.split(/[\s-]+/).filter((w) => /^[A-ZÀ-Ž]/.test(w) && !STOP.has(w));
  return words.length >= 2 ? words[0][0] + words[1][0] : (words[0] ?? name).slice(0, 2).toUpperCase();
};
const keyOf = (u: University) => `${u.country}-${u.name}`;

// The universities that orbit in the hero.
const RING = [
  "University of Oxford",
  "University of Toronto",
  "University of Melbourne",
  "KAIST",
  "Trinity College Dublin",
  "KU Leuven",
  "Semmelweis University",
  "University of Bologna",
  "Lund University",
  "Stanford University",
  "University of Auckland",
  "Spiru Haret University",
  "Aalto University",
  "Universiti Malaya",
  "University of Malta",
  "NTNU",
].map((n) => UNIVERSITIES.find((x) => x.name === n)!);

function Flag({ code, className = "" }: { code: string; className?: string }) {
  return <Image src={`/flags/${code}.svg`} alt="" width={24} height={18} unoptimized className={`shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)] ${className}`} />;
}

function SubjectIcon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** A directory card: a gradient-edged card with a mesh-lit logo stage, then its details. Tilts gently towards the pointer. */
function UniversityCard({ u, c, activeSubject }: { u: University; c: CountryInfo; activeSubject: SubjectKey | null }) {
  const logo = u.partner ? { src: u.partner.logo, ratio: 1 } : UNIVERSITY_LOGOS[u.name];
  const wide = !!logo && logo.ratio > 1.6;
  return (
    <article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
        e.currentTarget.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--ry", "0deg");
        e.currentTarget.style.setProperty("--rx", "0deg");
      }}
      className="group relative h-full rounded-[26px] p-px transition-[transform,box-shadow] duration-500 ease-out [transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:shadow-[0_40px_80px_-40px_rgba(11,11,12,0.5)]"
      style={{
        // A thin gradient edge: the country's colour fading into orange.
        background: u.partner
          ? "linear-gradient(160deg, #F47A2A, rgba(244,122,42,0.25) 45%, #F47A2A)"
          : `linear-gradient(160deg, ${c.accent}66, rgba(11,11,12,0.07) 42%, rgba(11,11,12,0.05) 70%, rgba(244,122,42,0.4))`,
      }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[25px]"
        style={{ background: `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 62%, color-mix(in srgb, ${c.accent} 5%, #FFF8F1) 100%)` }}
      >
        {/* A spotlight that follows the pointer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 30%), ${c.accent}14, transparent 70%)` }}
        />

        {/* Logo stage: a mesh of the country's colour and Root orange, a fine grid, and a curved lower edge */}
        <div
          className="relative h-40 overflow-hidden"
          style={{
            background: `radial-gradient(90% 120% at 0% 0%, ${c.accent}40 0%, transparent 60%), radial-gradient(80% 110% at 100% 100%, rgba(244,122,42,0.28) 0%, transparent 60%), linear-gradient(135deg, color-mix(in srgb, ${c.accent} 10%, white), #FFF6EE)`,
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage: `linear-gradient(${c.accent}22 1px, transparent 1px), linear-gradient(90deg, ${c.accent}22 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(75% 80% at 50% 40%, black, transparent)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[55%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl transition-all duration-700 group-hover:h-48 group-hover:w-48 group-hover:opacity-80"
            style={{ background: c.accent }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100"
          />
          <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-6 w-full text-white">
            <path d="M0 40V22C90 4 170 0 230 10S350 30 400 14V40Z" fill="currentColor" />
          </svg>

          <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/85 py-1 pl-1.5 pr-2.5 text-[0.68rem] font-semibold text-ink/75 shadow-sm backdrop-blur">
            <Flag code={c.code} className="h-3 w-4" />
            {c.name}
          </span>
          <span className="absolute right-3.5 top-3.5 flex gap-1">
            {u.partner && <span className="rounded-full bg-brand px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-wider text-white shadow-sm">Partner</span>}
            <span className="rounded-full bg-white/85 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-wider text-ink/55 shadow-sm backdrop-blur">{u.type}</span>
          </span>

          <div className="absolute inset-x-0 bottom-3 top-9 grid place-items-center">
            {logo ? (
              <span
                className={`grid place-items-center bg-white shadow-[0_18px_40px_-16px_rgba(11,11,12,0.4)] ring-1 ring-ink/5 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 ${wide ? "h-[4.5rem] w-[78%] rounded-2xl px-4" : "h-[5.25rem] w-[5.25rem] rounded-[22px] p-2.5"}`}
              >
                <Image src={logo.src} alt={`${u.name} logo`} width={wide ? 220 : 84} height={wide ? 60 : 84} className={`object-contain ${wide ? "max-h-11 w-auto" : "h-full w-full"}`} />
              </span>
            ) : (
              <span
                aria-hidden
                className="grid h-[5.25rem] w-[5.25rem] place-items-center rounded-[22px] text-xl font-bold tracking-tight text-white shadow-[0_18px_40px_-16px_rgba(11,11,12,0.5)] ring-4 ring-white/70 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${c.accent}, color-mix(in srgb, ${c.accent} 55%, black))` }}
              >
                {initials(u.name)}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
          <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
            <Link href={`/universities/${uniSlug(u.name)}`} className="outline-none after:absolute after:inset-0 after:z-30 after:rounded-[25px] focus-visible:after:ring-2 focus-visible:after:ring-brand">
              {u.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-ink/55">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {u.city}
          </p>
          <p className="mt-2.5 line-clamp-2 text-[0.82rem] leading-relaxed text-ink/65">{u.note}</p>
          <ul className="mb-5 mt-3.5 flex flex-wrap gap-1.5">
            {u.subjects.slice(0, 3).map((k) => {
              const sub = subjectOf(k);
              const on = activeSubject === k;
              return (
                <li key={k} className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[0.7rem] transition-colors ${on ? "bg-brand text-white" : "bg-ink/[0.045] text-ink/70"}`}>
                  <SubjectIcon d={sub.icon} className="h-3 w-3" />
                  {sub.label}
                </li>
              );
            })}
            {u.subjects.length > 3 && <li className="rounded-full px-2 py-1 text-[0.7rem] text-ink/45">+{u.subjects.length - 3}</li>}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink/[0.07] pt-3.5">
            <span className="flex gap-1">
              {u.levels.map((l) => (
                <span key={l} className="rounded-md px-1.5 py-0.5 font-mono text-[0.6rem]" style={{ background: `${c.accent}14`, color: c.accent }}>
                  {l === "Bachelor" ? "BSc" : l === "Master" ? "MSc" : "PhD"}
                </span>
              ))}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-ink transition-colors group-hover:text-brand">
              View
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-brand">
                <Arrow className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

type Filters = { q: string; country: string | null; subject: SubjectKey | null; level: Level | null; type: University["type"] | null };
const EMPTY: Filters = { q: "", country: null, subject: null, level: null, type: null };
const PAGE = 12;

function matches(u: University, f: Filters) {
  if (f.country && u.country !== f.country) return false;
  if (f.subject && !u.subjects.includes(f.subject)) return false;
  if (f.level && !u.levels.includes(f.level)) return false;
  if (f.type && u.type !== f.type) return false;
  if (f.q) {
    const q = f.q.toLowerCase();
    const c = countryOf(u.country).name.toLowerCase();
    const subj = u.subjects.map((s) => subjectOf(s).label.toLowerCase()).join(" ");
    if (![u.name, u.city, c, subj].some((t) => t.toLowerCase().includes(q))) return false;
  }
  return true;
}

export default function UniversitiesExplorer() {
  const root = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [limit, setLimit] = useState(PAGE);
  const [panel, setPanel] = useState(false);
  const flipState = useRef<Flip.FlipState | null>(null);

  const results = useMemo(() => UNIVERSITIES.filter((u) => matches(u, filters)), [filters]);
  const shown = useMemo(() => new Set(results.slice(0, limit).map(keyOf)), [results, limit]);
  const countFor = (s: SubjectKey) => UNIVERSITIES.filter((u) => u.subjects.includes(s)).length;

  /** Records where the cards are, then changes the filters; the layout effect animates them to their new places. */
  const update = (patch: Partial<Filters>, resetLimit = true) => {
    flipState.current = Flip.getState("[data-uc]");
    setFilters((f) => ({ ...f, ...patch }));
    if (resetLimit) setLimit(PAGE);
  };
  const more = () => {
    flipState.current = Flip.getState("[data-uc]");
    setLimit((l) => l + PAGE);
  };
  const goToDirectory = () => window.dispatchEvent(new CustomEvent("scroll:to", { detail: "#directory" }));

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Flip.from(state, {
      duration: 0.65,
      ease: "power3.inOut",
      absolute: true,
      stagger: 0.015,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.03, delay: 0.1 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.35, ease: "power2.in" }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filters, limit]);

  useGSAP(
    () => {
      const ring = root.current!.querySelector<HTMLElement>("[data-ring]")!;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-ring-tile]");
      const n = tiles.length;

      const mm = gsap.matchMedia();
      mm.add({ sm: "(min-width: 640px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        const { sm, motion } = ctx.conditions as { sm: boolean; motion: boolean };
        // Each tile is turned to its angle and then pushed out along it (set in its inline transform).
        void sm;

        // Back tiles fade, front tiles shine.
        const shade = () => {
          const rot = Number(gsap.getProperty(ring, "rotationY"));
          tiles.forEach((t, i) => {
            const a = ((rot + (i * 360) / n) * Math.PI) / 180;
            t.style.opacity = String(0.05 + 0.95 * ((Math.cos(a) + 1) / 2) ** 2);
          });
        };
        shade();
        if (!motion) return;

        gsap.to(ring, { rotationY: -360, duration: 60, ease: "none", repeat: -1, onUpdate: shade });

        // Arrival.
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-ring-tilt]", { scale: 0.4, autoAlpha: 0, rotationX: 40 }, { scale: 1, autoAlpha: 1, rotationX: -14, duration: 2.2 }, 0)
          .fromTo("[data-uh-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.25)
          .fromTo("[data-uh-fade]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.55);

        // Pointer tilt.
        const stage = root.current!.querySelector<HTMLElement>("[data-uh-stage]")!;
        const tx = gsap.quickTo("[data-ring-tilt]", "rotationX", { duration: 1, ease: "power3.out" });
        const ty = gsap.quickTo("[data-ring-tilt]", "rotationZ", { duration: 1, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          tx(-14 + ((e.clientY - r.top) / r.height - 0.5) * -8);
          ty(((e.clientX - r.left) / r.width - 0.5) * 6);
        };
        stage.addEventListener("pointermove", move);

        // Scroll: the ring tips back and sinks as you leave the hero.
        gsap.to("[data-ring-scroll]", { rotationX: 40, y: 120, scale: 0.85, opacity: 0.2, ease: "none", scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: 0.8 } });
        gsap.to("[data-uh-copy]", { y: -80, opacity: 0, ease: "none", scrollTrigger: { trigger: stage, start: "25% top", end: "75% top", scrub: 0.8 } });

        // Sections arriving.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(el.children, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 82%" } });
        });
        ScrollTrigger.batch("[data-uc-in]", {
          start: "top 92%",
          once: true,
          onEnter: (b) => gsap.fromTo(b, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: "expo.out" }),
        });
        gsap.to("[data-uc-marquee]", { xPercent: -50, duration: 50, ease: "none", repeat: -1 });

        return () => stage.removeEventListener("pointermove", move);
      });
    },
    { scope: root },
  );

  const active = [filters.country, filters.subject, filters.level, filters.type, filters.q].filter(Boolean).length;

  return (
    <div ref={root}>
      {/* ---------------- Hero ---------------- */}
      <div className="overflow-hidden bg-white px-3 pt-3">
        <section
          data-uh-stage
          aria-labelledby="uh-title"
          className="relative flex h-[calc(100svh-24px)] min-h-[720px] items-center justify-center overflow-hidden rounded-[28px] pb-40 pt-20 text-white sm:pb-48"
          style={{ background: "radial-gradient(80% 70% at 50% 45%, #2A1A12 0%, #120D0C 55%, #08070A 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[44%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(70% 60% at 50% 50%, black, transparent)" }}
          />

          {/* The orbiting ring of universities */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[80%] flex h-0 justify-center [perspective:1600px] sm:top-[79%]">
            <div data-ring-scroll className="[transform-style:preserve-3d]">
              <div data-ring-tilt className="[transform-style:preserve-3d]">
                <div data-ring className="relative h-0 w-0 [--ring-r:290px] [transform-style:preserve-3d] sm:[--ring-r:520px]">
                  {RING.map((u, i) => {
                    const c = countryOf(u.country);
                    return (
                      <div
                        key={u.name}
                        data-ring-tile
                        className="absolute left-0 top-0 w-[150px] rounded-2xl border border-white/15 bg-white/[0.07] p-3 backdrop-blur-md sm:w-[210px] sm:p-4"
                        style={{
                          boxShadow: `0 20px 50px -20px ${c.accent}`,
                          transform: `translate(-50%, -50%) rotateY(${(i * 360) / RING.length}deg) translateZ(var(--ring-r))`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Flag code={c.code} className="h-3.5 w-5" />
                          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-[0.65rem]">{c.name}</span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs font-semibold leading-snug sm:text-sm">{u.name}</p>
                        <p className="mt-1 text-[0.65rem] text-white/50 sm:text-xs">{u.city}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Copy and search */}
          <div data-uh-copy className="relative z-10 mx-auto max-w-6xl px-6 text-center">
            <p data-uh-fade className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Universities & Programmes
            </p>
            <h1 id="uh-title" className="mt-6 text-[clamp(2.6rem,7.4vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-uh-line className="block">
                  Find the university
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <span data-uh-line className="inline-block bg-gradient-to-r from-[#FFD7B8] via-brand to-[#FF5A3C] bg-clip-text pr-[0.04em] text-transparent">
                  made for you.
                </span>
              </span>
            </h1>
            <p data-uh-fade className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Explore {UNIVERSITIES.length} universities across {COUNTRIES.length} countries, from medicine in Hungary to engineering in Canada.
            </p>

            <form
              data-uh-fade
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                goToDirectory();
              }}
              className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 shadow-[0_30px_80px_-30px_rgba(244,122,42,0.6)] backdrop-blur-xl"
            >
              <svg viewBox="0 0 24 24" className="ml-3 h-5 w-5 shrink-0 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <label htmlFor="uh-search" className="sr-only">
                Search universities, cities, countries or subjects
              </label>
              <input
                id="uh-search"
                value={filters.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search a university, city or subject…"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none sm:text-base"
              />
              <button type="submit" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                <span className="hidden sm:inline">{results.length} results</span>
                <Arrow />
              </button>
            </form>

            <div data-uh-fade className="mt-5 flex flex-wrap justify-center gap-2">
              {["Medicine", "Engineering", "Business", "Computer Science"].map((label) => {
                const s = SUBJECTS.find((x) => x.label === label)!;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      update({ subject: s.key });
                      goToDirectory();
                    }}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-brand hover:bg-brand/15 hover:text-white"
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

        </section>
      </div>

      {/* ---------------- Explore: filters on the left, universities on the right ---------------- */}
      <section id="directory" aria-labelledby="ud-title" className="scroll-mt-24 bg-[#FBF6EF] px-4 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex rounded-full border border-brand/30 bg-white px-4 py-1.5 text-sm font-semibold text-brand">Programmes</p>
              <h2 id="ud-title" className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
                Explore by <span className="text-brand">subject</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-ink/60">Choose a subject, level and country on the left; matching universities appear on the right.</p>
          </div>

          <div className="mt-12 grid items-start gap-6 lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-7">
            {/* ---- Filters ---- */}
            <aside aria-label="Filters" className="lg:sticky lg:top-24">
              <button
                type="button"
                aria-expanded={panel}
                aria-controls="ud-filters"
                onClick={() => setPanel((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white px-5 py-4 text-sm font-semibold text-ink shadow-sm lg:hidden"
              >
                <span className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  Filters
                  {active > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[0.65rem] text-white">{active}</span>}
                </span>
                <span className={`transition-transform duration-300 ${panel ? "rotate-180" : ""}`} aria-hidden>
                  ▾
                </span>
              </button>

              <div
                id="ud-filters"
                data-lenis-prevent
                className={`${panel ? "mt-3 block" : "hidden"} overflow-y-auto overscroll-contain rounded-[28px] border border-ink/10 bg-white p-5 shadow-[0_30px_60px_-40px_rgba(11,11,12,0.4)] lg:mt-0 lg:block lg:max-h-[calc(100svh-7.5rem)] [scrollbar-width:thin]`}
              >
                {/* Search */}
                <label className="flex h-11 items-center gap-2 rounded-xl bg-ink/[0.04] px-3 ring-brand/40 transition focus-within:bg-white focus-within:ring-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink/45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <span className="sr-only">Search universities</span>
                  <input value={filters.q} onChange={(e) => update({ q: e.target.value })} placeholder="Search…" className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none" />
                </label>

                {/* Subjects */}
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/45">Subject</p>
                  {active > 0 && (
                    <button type="button" onClick={() => update(EMPTY)} className="text-xs font-semibold text-brand hover:underline">
                      Clear all
                    </button>
                  )}
                </div>
                <ul className="mt-2 space-y-0.5">
                  {SUBJECTS.map((s) => {
                    const on = filters.subject === s.key;
                    return (
                      <li key={s.key}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => update({ subject: on ? null : s.key })}
                          className={`group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors ${on ? "bg-brand/10 font-semibold text-ink" : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"}`}
                        >
                          <span aria-hidden className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-brand transition-transform duration-300 ${on ? "scale-y-100" : "scale-y-0"}`} />
                          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all duration-300 group-hover:-rotate-6 ${on ? "bg-brand text-white" : "bg-[#FBF6EF] text-brand"}`}>
                            <SubjectIcon d={s.icon} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{s.label}</span>
                          <span className={`rounded-full px-2 py-0.5 font-mono text-[0.65rem] ${on ? "bg-brand text-white" : "bg-ink/[0.05] text-ink/50"}`}>{countFor(s.key)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Level */}
                <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/45">Study level</p>
                <div role="group" aria-label="Study level" className="mt-2 grid grid-cols-4 gap-1 rounded-xl bg-ink/[0.04] p-1">
                  {([null, "Bachelor", "Master", "PhD"] as const).map((l) => (
                    <button
                      key={l ?? "all"}
                      type="button"
                      aria-pressed={filters.level === l}
                      onClick={() => update({ level: l })}
                      className={`rounded-lg py-1.5 text-[0.72rem] font-semibold transition-colors ${filters.level === l ? "bg-ink text-white shadow" : "text-ink/60 hover:text-ink"}`}
                    >
                      {l ?? "All"}
                    </button>
                  ))}
                </div>

                {/* Type */}
                <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/45">University type</p>
                <div role="group" aria-label="University type" className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-ink/[0.04] p-1">
                  {([null, "Public", "Private"] as const).map((t) => (
                    <button
                      key={t ?? "all"}
                      type="button"
                      aria-pressed={filters.type === t}
                      onClick={() => update({ type: t })}
                      className={`rounded-lg py-1.5 text-[0.72rem] font-semibold transition-colors ${filters.type === t ? "bg-ink text-white shadow" : "text-ink/60 hover:text-ink"}`}
                    >
                      {t ?? "Any"}
                    </button>
                  ))}
                </div>

                {/* Countries */}
                <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/45">Country</p>
                <ul className="mt-2 grid grid-cols-2 gap-1">
                  {COUNTRIES.map((c) => {
                    const on = filters.country === c.slug;
                    return (
                      <li key={c.slug}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => update({ country: on ? null : c.slug })}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${on ? "font-semibold text-white" : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"}`}
                          style={on ? { background: c.accent } : undefined}
                        >
                          <Flag code={c.code} className="h-3 w-4" />
                          <span className="truncate">{c.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* ---- Results ---- */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-ink/10 bg-white/70 px-5 py-3.5 backdrop-blur" aria-live="polite">
                <p className="text-sm text-ink/60">
                  <span className="text-lg font-semibold text-ink">{results.length}</span> universities
                  {results.length > limit && <span className="text-ink/45"> · showing {limit}</span>}
                </p>
                <div className="flex flex-1 flex-wrap justify-end gap-1.5">
                  {filters.subject && (
                    <button type="button" onClick={() => update({ subject: null })} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                      <SubjectIcon d={subjectOf(filters.subject).icon} className="h-3.5 w-3.5" />
                      {subjectOf(filters.subject).label}
                      <span aria-hidden>×</span>
                      <span className="sr-only">Remove filter</span>
                    </button>
                  )}
                  {filters.country && (
                    <button type="button" onClick={() => update({ country: null })} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: countryOf(filters.country).accent }}>
                      <Flag code={countryOf(filters.country).code} className="h-3 w-4" />
                      {countryOf(filters.country).name}
                      <span aria-hidden>×</span>
                      <span className="sr-only">Remove filter</span>
                    </button>
                  )}
                  {filters.level && (
                    <button type="button" onClick={() => update({ level: null })} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                      {filters.level} <span aria-hidden>×</span>
                      <span className="sr-only">Remove filter</span>
                    </button>
                  )}
                  {filters.type && (
                    <button type="button" onClick={() => update({ type: null })} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                      {filters.type} <span aria-hidden>×</span>
                      <span className="sr-only">Remove filter</span>
                    </button>
                  )}
                </div>
              </div>

              <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {UNIVERSITIES.map((u) => {
                  const c = countryOf(u.country);
                  const visible = shown.has(keyOf(u));
                  return (
                    <li key={keyOf(u)} data-uc data-flip-id={keyOf(u)} style={{ display: visible ? undefined : "none" }}>
                      {/* GSAP animates this wrapper in; the card inside keeps its own tilt transform. */}
                      <div data-uc-in className="h-full">
                        <UniversityCard u={u} c={c} activeSubject={filters.subject} />
                      </div>
                    </li>
                  );
                })}
              </ul>

              {results.length === 0 && (
                <div className="mt-5 rounded-[28px] border border-dashed border-ink/20 bg-white p-12 text-center">
                  <p className="text-xl font-semibold text-ink">No universities match those filters.</p>
                  <p className="mt-2 text-ink/60">Try another country or subject, or ask an advisor to search for you.</p>
                  <button type="button" onClick={() => update(EMPTY)} className="mt-6 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white">
                    Clear filters
                  </button>
                </div>
              )}

              {results.length > limit && (
                <div className="mt-10 flex justify-center">
                  <button type="button" onClick={more} className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
                    Show more universities
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-90">
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Advisor CTA ---------------- */}
      <section className="overflow-hidden bg-white px-3 pb-3 pt-24">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-20 text-white sm:py-28">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 overflow-hidden opacity-[0.08]">
            <div data-uc-marquee className="flex w-max whitespace-nowrap text-6xl font-semibold tracking-tight sm:text-8xl">
              {[0, 1].map((k) => (
                <span key={k} className="pr-12">
                  {UNIVERSITIES.slice(0, 24).map((u) => u.name).join("  ·  ")}
                  {"  ·  "}
                </span>
              ))}
            </div>
          </div>
          <div data-reveal className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-[clamp(2.2rem,5.5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.04em]">
              Not sure where you fit? <span className="text-brand">We&apos;ll shortlist for you.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Tell us your grades, budget and goals. Our advisors will match you with universities and programmes, and handle the application with you.
            </p>
            <Link href="/consultation" className="group mt-9 inline-flex h-12 items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
              Get my free shortlist
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
