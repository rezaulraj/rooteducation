"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProgrammeModal, { type GuideLite } from "./ProgrammeModal";
import type { Programme } from "./programmes";
import type { CountryInfo, University } from "./universitiesData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type Photo = { src: string; w: number; h: number; page?: string; artist?: string; license?: string; caption?: string };
export type Facts = { title: string; wiki: string; about: string[]; gallery: Photo[]; founded?: number; students?: number; studentsYear?: number; website?: string };

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function UniversityDetail({
  u,
  c,
  facts,
  logo,
  programmes,
  guide,
  heroFallback,
}: {
  u: University;
  c: CountryInfo;
  facts: Facts | null;
  logo: { src: string; ratio: number } | null;
  programmes: Programme[];
  guide: GuideLite;
  heroFallback: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<"All" | "Bachelor" | "Master">("All");
  const [open, setOpen] = useState<{ p: Programme; x: number; y: number } | null>(null);
  const gallery = facts?.gallery ?? [];
  const hero = gallery[0]?.src ?? heroFallback;
  const fromWiki = (src: string) => src.startsWith("https://upload.wikimedia.org/");
  const sized = (src: string, w: number) => src.replace(/\/\d+px-/, `/${w}px-`);
  const shown = useMemo(() => programmes.filter((p) => level === "All" || p.level === level), [programmes, level]);
  const short = u.name.match(/\(([^)]+)\)/)?.[1] ?? u.name.replace(/^The /, "");
  const wide = !!logo && logo.ratio > 1.6;

  const stats = [
    facts?.founded && { label: "Founded", value: facts.founded, count: true },
    facts?.students && { label: facts.studentsYear ? `Students (${facts.studentsYear})` : "Students", value: facts.students, count: true },
    { label: "Type", value: u.type },
    { label: "Programmes listed", value: programmes.length, count: true },
  ].filter(Boolean) as { label: string; value: number | string; count?: boolean }[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-ud-img]", { scale: 1.25 }, { scale: 1.05, duration: 2.6 }, 0)
          .fromTo("[data-ud-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.2)
          .fromTo("[data-ud-fade]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.45)
          .fromTo("[data-ud-logo]", { scale: 0.6, autoAlpha: 0, rotation: -8 }, { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.2, ease: "back.out(1.6)" }, 0.3);
        gsap.to("[data-ud-img]", { yPercent: 12, ease: "none", scrollTrigger: { trigger: "[data-ud-hero]", start: "top top", end: "bottom top", scrub: true } });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(el.children, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const v = { n: 0 };
          gsap.to(v, {
            n: end,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => (el.textContent = el.dataset.raw ? String(Math.round(v.n)) : Math.round(v.n).toLocaleString("en-GB")),
          });
        });
        ScrollTrigger.batch("[data-ph]", {
          start: "top 90%",
          once: true,
          onEnter: (b) => gsap.fromTo(b, { clipPath: "inset(18% 18% 18% 18% round 28px)", autoAlpha: 0 }, { clipPath: "inset(0% 0% 0% 0% round 24px)", autoAlpha: 1, duration: 1.2, stagger: 0.1, ease: "expo.out" }),
        });
      });
    },
    { scope: root },
  );

  // Re-deal the programme cards when the level changes.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-pg]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" });
    },
    { scope: root, dependencies: [level], revertOnUpdate: true },
  );

  return (
    <div ref={root}>
      {/* ---------------- Hero ---------------- */}
      <div className="overflow-hidden bg-white px-3 pt-3">
        <section data-ud-hero aria-labelledby="ud-name" className="relative h-[calc(92svh-24px)] min-h-[620px] overflow-hidden rounded-[28px] bg-ink text-white">
          <div data-ud-img className="absolute inset-0">
            <Image src={hero} alt={gallery[0]?.caption || `${u.name} campus`} fill preload sizes="100vw" unoptimized={fromWiki(hero)} className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.55)_0%,rgba(8,8,10,0.15)_35%,rgba(8,8,10,0.85)_100%)]" />
          <div aria-hidden className="absolute -bottom-40 -left-20 h-[30rem] w-[30rem] rounded-full blur-[120px]" style={{ background: c.accent, opacity: 0.45 }} />

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-10 pt-28 sm:pb-14">
            <Link data-ud-fade href="/universities" className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md transition-colors hover:bg-white/20">
              <Arrow className="h-3.5 w-3.5 rotate-180" />
              All universities
            </Link>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div data-ud-logo className={`grid place-items-center bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ${wide ? "h-20 w-56 rounded-2xl px-5" : "h-24 w-24 rounded-[26px] p-3"}`}>
                  {logo ? (
                    <Image src={logo.src} alt={`${u.name} logo`} width={wide ? 220 : 96} height={wide ? 64 : 96} className={`object-contain ${wide ? "max-h-12 w-auto" : "h-full w-full"}`} />
                  ) : (
                    <span className="text-2xl font-bold" style={{ color: c.accent }}>
                      {short.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <p data-ud-fade className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
                  <Image src={`/flags/${c.code}.svg`} alt="" width={20} height={15} unoptimized className="h-3.5 w-5 rounded-[3px] object-cover" />
                  {u.city}, {c.name}
                  {u.partner && <span className="rounded-full bg-brand px-2.5 py-1 tracking-wider text-white">Root partner</span>}
                </p>
                <h1 id="ud-name" className="mt-3 text-[clamp(2.4rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                  <span className="block overflow-hidden pb-[0.06em]">
                    <span data-ud-line className="block">
                      {u.name}
                    </span>
                  </span>
                </h1>
                <p data-ud-fade className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  {u.note.replace(/^Root Education partner: /, "")}
                </p>
              </div>
              <div data-ud-fade className="flex flex-wrap gap-3">
                <a href="#programmes" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                  International programmes
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-90">
                    <Arrow />
                  </span>
                </a>
                {facts?.website && (
                  <a href={facts.website} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/25 px-5 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10">
                    Official website
                    <Arrow className="h-3.5 w-3.5 -rotate-45" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Facts ---------------- */}
      <section className="bg-white px-6 pt-10">
        <dl data-reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[22px] border border-ink/10 p-5" style={{ background: `linear-gradient(160deg, ${c.accent}0D, #FFFFFF 60%)` }}>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/45">{s.label}</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {s.count ? (
                  <span data-count={s.value} data-raw={s.label === "Founded" ? "1" : undefined}>
                    {typeof s.value === "number" && s.label !== "Founded" ? s.value.toLocaleString("en-GB") : s.value}
                  </span>
                ) : (
                  s.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- About ---------------- */}
      {facts && facts.about.length > 0 && (
        <section aria-labelledby="ud-about" className="bg-white px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div data-reveal>
              <p className="inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold" style={{ color: c.accent, borderColor: `${c.accent}55` }}>
                About
              </p>
              <h2 id="ud-about" className="mt-5 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
                Get to know <span style={{ color: c.accent }}>{short}</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {u.levels.map((l) => (
                  <span key={l} className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-xs font-semibold text-ink/70">
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div data-reveal className="space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              {facts.about.map((p, i) => (
                <p key={i} className={i === 0 ? "text-ink/85" : undefined}>
                  {p}
                </p>
              ))}
              <p className="pt-2 text-xs text-ink/45">
                Text from{" "}
                <a href={facts.wiki} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
                  Wikipedia
                </a>
                , available under{" "}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
                  CC BY-SA 4.0
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Gallery ---------------- */}
      {gallery.length > 1 && (
        <section aria-labelledby="ud-gallery" className="bg-[#FBF6EF] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="flex items-end justify-between gap-6">
              <h2 id="ud-gallery" className="text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
                Campus & <span style={{ color: c.accent }}>student life</span>
              </h2>
            </div>
            <ul className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] lg:grid-cols-4">
              {gallery.slice(0, 6).map((ph, i) => (
                <li key={ph.src} data-ph className={`group relative overflow-hidden rounded-[24px] bg-ink/10 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <Image src={i === 0 ? ph.src : sized(ph.src, 960)} unoptimized alt={ph.caption || `${u.name} campus`} fill loading="lazy" sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"} className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <a
                    href={ph.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-3 bottom-3 translate-y-2 text-[0.68rem] leading-snug text-white/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {ph.caption && <span className="line-clamp-2 block text-xs font-medium">{ph.caption}</span>}
                    <span className="text-white/60">
                      Photo: {ph.artist || "Wikimedia Commons"}
                      {ph.license ? ` · ${ph.license}` : ""}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- Programmes ---------------- */}
      <section id="programmes" aria-labelledby="ud-prog" className="scroll-mt-24 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-brand/30 px-4 py-1.5 text-sm font-semibold text-brand">Taught in English</p>
              <h2 id="ud-prog" className="mt-5 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
                International <span className="text-brand">programmes</span>
              </h2>
            </div>
            <div role="group" aria-label="Study level" className="flex rounded-2xl bg-ink/[0.05] p-1">
              {(["All", "Bachelor", "Master"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={level === l}
                  onClick={() => setLevel(l)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${level === l ? "bg-ink text-white" : "text-ink/60 hover:text-ink"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <li key={p.id} data-pg>
                <button
                  type="button"
                  onClick={(e) => setOpen({ p, x: e.clientX, y: e.clientY })}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-white p-6 text-left transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(11,11,12,0.4)]"
                >
                  <span aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(150deg, ${c.accent}14, transparent 55%, rgba(244,122,42,0.1))` }} />
                  <span className="relative flex items-center justify-between">
                    <span className="rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider" style={{ background: `${c.accent}14`, color: c.accent }}>
                      {p.level}
                    </span>
                    <span className="font-mono text-xs text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="relative mt-6 text-xl font-semibold leading-snug tracking-tight text-ink">{p.title}</span>
                  <span className="relative mt-1 text-sm text-ink/55">{p.subjectLabel}</span>
                  <span className="relative mt-6 grid grid-cols-2 gap-3 border-t border-ink/[0.07] pt-4 text-xs">
                    <span>
                      <span className="block text-ink/45">Duration</span>
                      <span className="mt-0.5 block font-semibold text-ink">{p.duration.replace(" full-time", "")}</span>
                    </span>
                    <span>
                      <span className="block text-ink/45">Tuition / year</span>
                      <span className="mt-0.5 block font-semibold text-ink">{p.fee.replace(" per year", "")}</span>
                    </span>
                  </span>
                  <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-brand">
                    View programme
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-brand">
                      <Arrow className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink/45">
            Programmes are listed by subject area, with typical titles, structures and fee ranges for international students in {c.name}. Exact course names, modules and fees
            change each year, so check the university&apos;s website or ask our advisors before applying.
          </p>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="overflow-hidden bg-white px-3 pb-3">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-20 text-white sm:py-24" style={{ background: `linear-gradient(135deg, ${c.accent}, color-mix(in srgb, ${c.accent} 45%, black))` }}>
          <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/40 blur-[100px]" />
          <div data-reveal className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em]">Want to study at {short}?</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">Our advisors will check your eligibility, help you choose a programme and handle the application and visa with you.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/consultation" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Apply with Root Education
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <Arrow />
                </span>
              </Link>
              <Link href={`/study-abroad/${c.slug}`} className="inline-flex h-12 items-center rounded-2xl border border-white/30 px-5 text-sm font-semibold transition-colors hover:bg-white/10">
                Study in {c.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {open && <ProgrammeModal key={open.p.id} p={open.p} origin={{ x: open.x, y: open.y }} u={u} c={c} logo={logo} website={facts?.website} guide={guide} onClose={() => setOpen(null)} />}
    </div>
  );
}
