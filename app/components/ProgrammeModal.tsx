"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { GuideData } from "./CountryGuide";
import { SUBJECT_INFO, type Programme } from "./programmes";
import type { CountryInfo, University } from "./universitiesData";

gsap.registerPlugin(useGSAP);

/** The parts of a country guide the programme popup needs. */
export type GuideLite = Pick<GuideData, "country" | "currency" | "intakes" | "admission" | "documents" | "living" | "work" | "scholarships" | "visa" | "applySteps"> & { defaultIntake: string };

const TABS = ["Key information", "Overview", "Programme structure", "Admission requirements", "Fees and funding", "Scholarships", "Visa information"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, string> = {
  "Key information": "M12 8v.01M11 12h1v5h1M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  Overview: "M4 6h16M4 12h16M4 18h10",
  "Programme structure": "M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z",
  "Admission requirements": "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  "Fees and funding": "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  Scholarships: "M12 3l9 5-9 5-9-5 9-5ZM5 10v5c0 2 3 4 7 4s7-2 7-4v-5",
  "Visa information": "M5 3h14v18H5zM9 7h6M12 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
};

function Icon({ d, className = "h-4 w-4" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

function Tick({ color }: { color: string }) {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-white" style={{ background: color }}>
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 6.2 5 8.5l4.5-5" />
      </svg>
    </span>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">{children}</h3>;
}

export default function ProgrammeModal({
  p,
  origin,
  u,
  c,
  logo,
  website,
  guide,
  onClose,
}: {
  p: Programme;
  origin: { x: number; y: number };
  u: University;
  c: CountryInfo;
  logo: { src: string; ratio: number } | null;
  website?: string;
  guide: GuideLite;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = useState<Tab>("Key information");
  const info = SUBJECT_INFO[p.subject];
  const A = c.accent;
  const intakes = guide.intakes?.length ? guide.intakes.map((i) => `${i.when}${i.main ? " (main)" : ""}`).join(", ") : guide.defaultIntake;
  const applyBy = guide.intakes?.find((i) => i.main)?.apply;
  const requirements = guide.admission[p.level];

  // Open: a circle grows from the card that was clicked. Lock the page underneath.
  useGSAP(
    () => {
      window.dispatchEvent(new Event("scroll:lock"));
      document.documentElement.style.overflow = "hidden";
      closeBtn.current?.focus();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const far = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo("[data-pm-sheet]", { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }, { clipPath: `circle(${far}px at ${origin.x}px ${origin.y}px)`, duration: 0.9, ease: "power3.inOut" })
        .fromTo("[data-pm-in]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.06 }, 0.45);
    },
    { scope: root },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") root.current?.querySelector<HTMLButtonElement>("[data-pm-close]")?.click();
      // Keep keyboard focus inside the dialog.
      if (e.key === "Tab" && root.current) {
        const f = root.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.dispatchEvent(new Event("scroll:unlock"));
      document.documentElement.style.overflow = "";
    };
  }, []);

  const close = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onClose();
    gsap.to(root.current!.querySelector("[data-pm-sheet]"), {
      clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: onClose,
    });
  };

  // Changing tab: the panel slides in.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-pm-panel] > *", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: "power3.out" });
      root.current?.querySelector("[data-pm-scroll]")?.scrollTo({ top: 0 });
    },
    { scope: root, dependencies: [tab], revertOnUpdate: true },
  );

  const tile = (label: string, value: string, icon?: string) => (
    <div key={label} className="rounded-[20px] border border-ink/10 bg-white p-5">
      <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/45">
        {icon && <Icon d={icon} className="h-3.5 w-3.5" />}
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold leading-snug text-ink">{value}</p>
    </div>
  );

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="pm-title" className="fixed inset-0 z-[100]">
      <div data-pm-sheet className="flex h-full flex-col bg-[#FBF6EF]">
        {/* Header */}
        <header className="relative overflow-hidden text-white" style={{ background: `linear-gradient(120deg, ${A}, color-mix(in srgb, ${A} 45%, black))` }}>
          <div aria-hidden className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-brand/40 blur-[90px]" />
          <div className="relative mx-auto flex max-w-7xl items-start justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7">
            <div data-pm-in className="flex min-w-0 items-center gap-4">
              <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white p-2 sm:grid">
                {logo ? <Image src={logo.src} alt="" width={48} height={48} className="h-full w-full object-contain" /> : <span className="font-bold" style={{ color: A }}>{u.name.slice(0, 2)}</span>}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {u.name} · {u.city}
                </p>
                <h2 id="pm-title" className="mt-1 text-[clamp(1.5rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {p.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {[p.level, p.duration, "English-taught", p.subjectLabel].map((t) => (
                    <span key={t} className="rounded-full bg-white/15 px-3 py-1 font-medium backdrop-blur">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              ref={closeBtn}
              data-pm-close
              type="button"
              onClick={close}
              aria-label="Close programme details"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-all hover:rotate-90 hover:bg-white/25"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M3 3l10 10M13 3 3 13" />
              </svg>
            </button>
          </div>
        </header>

        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col lg:flex-row">
          {/* Tabs */}
          <nav data-pm-in aria-label="Programme sections" className="shrink-0 border-b border-ink/10 lg:w-72 lg:border-b-0 lg:border-r lg:py-8 lg:pl-8 lg:pr-4">
            <ul className="flex gap-1 overflow-x-auto px-4 py-3 [scrollbar-width:none] lg:flex-col lg:p-0">
              {TABS.map((t) => {
                const on = tab === t;
                return (
                  <li key={t} className="shrink-0">
                    <button
                      type="button"
                      aria-current={on ? "page" : undefined}
                      onClick={() => setTab(t)}
                      className={`group relative flex w-full items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${on ? "bg-white font-semibold text-ink shadow-sm" : "text-ink/60 hover:bg-white/60 hover:text-ink"}`}
                    >
                      <span className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${on ? "text-white" : "bg-ink/[0.05] text-ink/60"}`} style={on ? { background: A } : undefined}>
                        <Icon d={TAB_ICONS[t]} />
                      </span>
                      {t}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="hidden space-y-2 px-3 pt-8 lg:block">
              <Link href="/consultation" className="group flex items-center justify-between rounded-2xl bg-ink px-4 py-3.5 text-sm font-semibold text-white">
                Apply with Root
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand transition-transform group-hover:rotate-[-45deg]">→</span>
              </Link>
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-ink/10 px-4 py-3 text-center text-sm font-semibold text-ink/70 hover:text-ink">
                  University website ↗
                </a>
              )}
            </div>
          </nav>

          {/* Content */}
          <div data-pm-scroll data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-10 lg:py-10">
            <div data-pm-panel className="mx-auto max-w-3xl space-y-6 pb-16">
              {tab === "Key information" && (
                <>
                  <H>Key information</H>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {tile("Qualification", `${p.degree} · ${p.title}`, "M12 3l9 5-9 5-9-5 9-5Z")}
                    {tile("Duration", p.duration, "M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z")}
                    {tile("Tuition fee", p.fee, TAB_ICONS["Fees and funding"])}
                    {tile("Intakes", intakes, "M4 7h16v13H4zM8 3v4M16 3v4")}
                    {tile("Language", "English", "M4 5h16v11H4zM8 20h8")}
                    {tile("Study mode", "Full-time, on campus", "M3 21h18M5 21V8l7-5 7 5v13")}
                    {tile("Location", `${u.city}, ${c.name}`, "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z")}
                    {applyBy && tile("Apply by", applyBy, "M9 11l3 3 8-8")}
                  </div>
                </>
              )}

              {tab === "Overview" && (
                <>
                  <H>Overview</H>
                  <p className="text-lg leading-relaxed text-ink/75">
                    The {p.title} at {u.name} is {p.level === "Master" ? "an advanced, postgraduate course in" : "a degree in"} {info.blurb}. It is taught in English in {u.city},
                    {" "}so international students can join from their first day.
                  </p>
                  <div className="rounded-[24px] border border-ink/10 bg-white p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/45">What you&apos;ll study</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {p.structure.flatMap((s) => s.modules).slice(0, 8).map((m) => (
                        <li key={m} className="flex items-start gap-2 text-sm text-ink/80">
                          <Tick color={A} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[24px] p-6 text-white" style={{ background: `linear-gradient(135deg, ${A}, color-mix(in srgb, ${A} 50%, black))` }}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/70">Career paths</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {info.careers.map((k) => (
                        <span key={k} className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tab === "Programme structure" && (
                <>
                  <H>Programme structure</H>
                  <p className="text-ink/65">A typical structure for this kind of programme. Modules and their order vary by university and year.</p>
                  <ol className="relative space-y-4 border-l-2 pl-8" style={{ borderColor: `${A}33` }}>
                    {p.structure.map((s, i) => (
                      <li key={s.label} className="relative">
                        <span className="absolute -left-[2.6rem] top-4 grid h-7 w-7 place-items-center rounded-full font-mono text-xs font-semibold text-white" style={{ background: A }}>
                          {i + 1}
                        </span>
                        <div className="rounded-[22px] border border-ink/10 bg-white p-5">
                          <p className="font-semibold text-ink">{s.label}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {s.modules.map((m) => (
                              <span key={m} className="rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: `${A}12`, color: `color-mix(in srgb, ${A} 70%, black)` }}>
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {tab === "Admission requirements" && (
                <>
                  <H>Admission requirements</H>
                  <p className="text-ink/65">The usual requirements for international applicants to {p.level.toLowerCase()}&apos;s programmes in {c.name}.</p>
                  <ul className="space-y-2.5">
                    {requirements.map((r) => (
                      <li key={r} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-ink/80">
                        <Tick color={A} />
                        {r}
                      </li>
                    ))}
                    {p.subject === "med" && (
                      <li className="flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 text-ink/80">
                        <Tick color="#F47A2A" />
                        Biology and chemistry at a high level, and usually an entrance exam or interview
                      </li>
                    )}
                  </ul>
                  <div className="rounded-[24px] border border-ink/10 bg-white p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Documents to prepare</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {guide.documents.map((d) => (
                        <span key={d} className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-xs text-ink/75">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tab === "Fees and funding" && (
                <>
                  <H>Fees and funding</H>
                  <div className="overflow-hidden rounded-[24px] p-7 text-white" style={{ background: `linear-gradient(135deg, ${A}, color-mix(in srgb, ${A} 45%, black))` }}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/70">Tuition for international students</p>
                    <p className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight">{p.fee.replace(" per year", "")}</p>
                    <p className="text-white/70">per year · {p.duration}</p>
                  </div>
                  <div className="rounded-[24px] border border-ink/10 bg-white p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Living costs per month</p>
                      <p className="text-2xl font-semibold text-ink">
                        {guide.currency ?? "€"}
                        {guide.living.from.toLocaleString("en-GB")}–{guide.living.to.toLocaleString("en-GB")}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {guide.living.items.map((l) => (
                        <li key={l.item}>
                          <div className="flex justify-between text-sm">
                            <span className="text-ink/75">{l.item}</span>
                            <span className="font-mono text-ink/60">{l.range}</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                            <div className="h-full rounded-full" style={{ width: `${l.share * 1.6}%`, background: A }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-5 rounded-[24px] border border-ink/10 bg-white p-6">
                    <p className="text-4xl font-semibold tracking-tight" style={{ color: A }}>
                      {guide.work.big}
                    </p>
                    <div>
                      <p className="font-semibold text-ink">{guide.work.unit} of part-time work</p>
                      <p className="mt-1 text-sm text-ink/65">{guide.work.copy}</p>
                    </div>
                  </div>
                </>
              )}

              {tab === "Scholarships" && (
                <>
                  <H>Scholarships</H>
                  <p className="text-ink/65">Funding open to international students studying in {c.name}.</p>
                  <ul className="space-y-3">
                    {guide.scholarships.map((s) => (
                      <li key={s.title} className="rounded-[24px] border border-ink/10 bg-white p-6">
                        <p className="text-lg font-semibold text-ink">{s.title}</p>
                        <p className="mt-1 text-sm" style={{ color: A }}>
                          {s.who}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {s.covers.map((x) => (
                            <li key={x} className="flex items-start gap-2 text-sm text-ink/75">
                              <Tick color={A} />
                              {x}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 border-t border-ink/[0.07] pt-3 text-xs text-ink/50">{s.when}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tab === "Visa information" && (
                <>
                  <H>Visa information</H>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {guide.visa.stats.map(([label, big, small]) => (
                      <div key={label} className="rounded-[22px] border border-ink/10 bg-white p-5">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/45">{label}</p>
                        <p className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: A }}>
                          {big}
                        </p>
                        <p className="mt-1 text-xs text-ink/55">{small}</p>
                      </div>
                    ))}
                  </div>
                  <ol className="space-y-2.5">
                    {guide.visa.steps.map((s, i) => (
                      <li key={s} className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-4">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold text-white" style={{ background: A }}>
                          {i + 1}
                        </span>
                        <span className="pt-1 text-ink/80">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="rounded-[24px] border border-ink/10 bg-white p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Visa documents</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {guide.visa.documents.map((d) => (
                        <span key={d} className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-xs text-ink/75">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <p className="text-xs leading-relaxed text-ink/45">
                Details are indicative for international students in {c.name} and change each year. Always confirm the programme, fees and requirements with {u.name} before
                applying.
              </p>
              <div className="flex flex-wrap gap-3 lg:hidden">
                <Link href="/consultation" className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white">
                  Apply with Root
                </Link>
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-ink/15 px-5 py-3 text-sm font-semibold text-ink/75">
                    University website ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
