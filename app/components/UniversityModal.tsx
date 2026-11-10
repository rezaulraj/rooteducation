"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * A university's official logo. `chip` decides what it sits on: a white circle for round seals,
 * a white pill for wordmarks with dark lettering, or nothing for logos drawn in white.
 */
export type Logo = { src: string; width: number; height: number; chip: "circle" | "pill" | "none" };

export function UniversityLogo({ name, logo, size = "card" }: { name: string; logo: Logo; size?: "card" | "header" }) {
  const big = size === "header";
  if (logo.chip === "circle") {
    return (
      <span className={`grid shrink-0 place-items-center rounded-full bg-white p-1.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] ${big ? "h-24 w-24" : "h-24 w-24"}`}>
        <Image src={logo.src} alt={`${name} logo`} width={logo.width} height={logo.height} className="h-full w-full object-contain" />
      </span>
    );
  }
  if (logo.chip === "pill") {
    return (
      <span className={`flex min-w-0 items-center rounded-2xl bg-white px-4 py-3 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] ${big ? "h-20 shrink-0" : "h-16"}`}>
        <Image src={logo.src} alt={`${name} logo`} width={logo.width} height={logo.height} className="h-full w-auto max-w-[220px] object-contain" />
      </span>
    );
  }
  return <Image src={logo.src} alt={`${name} logo`} width={logo.width} height={logo.height} className={`w-auto shrink-0 object-contain ${big ? "h-20" : "h-16"}`} />;
}

export type Programme = { name: string; level: "Bachelor" | "Master"; years: number; language: string; campus?: string };
export type UniversityDetails = {
  name: string;
  short: string;
  city: string;
  type: string;
  logo: Logo;
  tone: { bg: string; seal: string };
  overview: string;
  highlights: string[];
  programmes: Programme[];
  programmesNote?: string;
  eligibility: { title: string; items: string[] }[];
  fees: { label: string; value: string; note?: string }[];
  intake: string;
  apply: string[];
  sources: { label: string; href: string }[];
};

const tabs = ["Overview", "Programmes", "Eligibility", "Fees & intake", "How to apply"] as const;
type Tab = (typeof tabs)[number];

function Tick({ color }: { color: string }) {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white" style={{ background: color }}>
      <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 6.2 5 8.5l4.5-5" />
      </svg>
    </span>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div data-um-panel>{children}</div>;
}

/** Full-window details for one university. It grows out of the point that was clicked. */
export default function UniversityModal({ uni, origin, onClose }: { uni: UniversityDetails; origin: { x: number; y: number }; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("Overview");
  const accent = uni.tone.bg;

  const { contextSafe } = useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const at = `${origin.x}px ${origin.y}px`;
      gsap
        .timeline()
        .fromTo("[data-um-sheet]", { clipPath: `circle(0% at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: reduce ? 0 : 0.9, ease: "power3.inOut" })
        .fromTo("[data-um-reveal]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: reduce ? 0 : 0.7, stagger: 0.06, ease: "power3.out" }, reduce ? 0 : 0.45);
    },
    { scope: root },
  );

  const close = contextSafe(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to("[data-um-sheet]", { clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`, duration: reduce ? 0 : 0.6, ease: "power3.inOut", overwrite: true, onComplete: onClose });
  });

  // Each tab's content rises in when it's chosen.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-um-panel] > *", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" });
      gsap.fromTo("[data-um-item]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.04, ease: "power3.out", delay: 0.1 });
    },
    { scope: root, dependencies: [tab], revertOnUpdate: true },
  );

  // Lock the page behind, close on Escape, keep focus inside.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    window.dispatchEvent(new Event("scroll:lock"));
    document.body.style.overflow = "hidden";
    root.current?.querySelector<HTMLElement>("[data-um-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      // Escape goes through the close button, so this effect never depends on render-time values.
      if (e.key === "Escape") root.current?.querySelector<HTMLButtonElement>("[data-um-close]")?.click();
      if (e.key !== "Tab" || !root.current) return;
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
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.dispatchEvent(new Event("scroll:unlock"));
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, []);

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="um-title" className="fixed inset-0 z-[100]">
      <div data-um-sheet className="absolute inset-0 overflow-y-auto overscroll-contain bg-[#FBF6EF]" data-lenis-prevent>
        {/* Header band in the university's colour */}
        <div className="relative overflow-hidden px-6 pb-10 pt-6 text-white sm:px-10" style={{ background: accent }}>
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-6xl items-center justify-between">
            <p data-um-reveal className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Partner university · {uni.city}, Romania
            </p>
            <button
              type="button"
              data-um-close
              onClick={close}
              aria-label="Close"
              className="grid h-12 w-12 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
            >
              <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M3 3l10 10M13 3 3 13" />
              </svg>
            </button>
          </div>
          <div className="relative mx-auto mt-8 max-w-6xl">
            <div data-um-reveal className="inline-flex">
              <UniversityLogo name={uni.name} logo={uni.logo} size="header" />
            </div>
            <h2 id="um-title" data-um-reveal className="mt-5 text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {uni.name}
            </h2>
            <div data-um-reveal className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1">{uni.type}</span>
              <span className="rounded-full bg-white/15 px-3 py-1">{uni.city}, Romania</span>
              <span className="rounded-full bg-white/15 px-3 py-1">{uni.programmes.length} programmes in English</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-10 border-b border-ink/10 bg-[#FBF6EF]/90 px-6 backdrop-blur sm:px-10">
          <div role="tablist" aria-label="University details" className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-3">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === t ? "text-white" : "text-ink/55 hover:bg-ink/5 hover:text-ink"}`}
                style={tab === t ? { background: accent } : undefined}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div data-um-reveal className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
          {tab === "Overview" && (
            <Panel>
              <p className="max-w-3xl text-xl leading-relaxed text-ink/80">{uni.overview}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {uni.highlights.map((h) => (
                  <li key={h} data-um-item className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink/80">
                    <Tick color={accent} />
                    {h}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {tab === "Programmes" && (
            <Panel>
              {(["Bachelor", "Master"] as const).map((lvl) => {
                const list = uni.programmes.filter((p) => p.level === lvl);
                if (!list.length) return null;
                return (
                  <div key={lvl} className="mb-10 last:mb-0">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">{lvl}&apos;s programmes</h3>
                    <ul className="mt-4 grid gap-3 md:grid-cols-2">
                      {list.map((p) => (
                        <li key={p.name} data-um-item className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-ink/25">
                          <span>
                            <span className="block text-lg font-semibold tracking-tight text-ink">{p.name}</span>
                            <span className="mt-1 block text-sm text-ink/55">
                              {p.language}
                              {p.campus ? ` · ${p.campus} campus` : ""}
                            </span>
                          </span>
                          <span className="shrink-0 rounded-xl px-3 py-2 text-center text-white" style={{ background: accent }}>
                            <span className="block text-xl font-semibold leading-none">{p.years}</span>
                            <span className="block text-[0.6rem] font-semibold uppercase tracking-wider opacity-80">years</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              {uni.programmesNote && <p className="mt-6 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink/65">{uni.programmesNote}</p>}
            </Panel>
          )}

          {tab === "Eligibility" && (
            <Panel>
              <div className="grid gap-6 md:grid-cols-2">
                {uni.eligibility.map((g) => (
                  <div key={g.title} className="rounded-[24px] bg-white p-6 sm:p-7">
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{g.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {g.items.map((it) => (
                        <li key={it} data-um-item className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                          <Tick color={accent} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {tab === "Fees & intake" && (
            <Panel>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uni.fees.map((f) => (
                  <li key={f.label} data-um-item className="rounded-[24px] p-6 text-white" style={{ background: "#141012" }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">{f.value}</p>
                    {f.note && <p className="mt-2 text-sm text-white/60">{f.note}</p>}
                  </li>
                ))}
              </ul>
              <div data-um-item className="mt-6 flex items-start gap-4 rounded-[24px] bg-white p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: accent }}>
                  <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="2" y="3" width="12" height="11" rx="2" />
                    <path d="M2 6.5h12M5 1.5v3M11 1.5v3" />
                  </svg>
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-ink">Intake</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/65">{uni.intake}</span>
                </span>
              </div>
            </Panel>
          )}

          {tab === "How to apply" && (
            <Panel>
              <ol className="relative space-y-4 pl-12">
                <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-0.5 rounded-full bg-ink/10" />
                {uni.apply.map((s, i) => (
                  <li key={s} data-um-item className="relative rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink/80">
                    <span className="absolute -left-12 top-4 grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-semibold text-white ring-4 ring-[#FBF6EF]" style={{ background: accent }}>
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </Panel>
          )}

          <div className="mt-12 flex flex-col gap-6 rounded-[28px] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9" style={{ background: accent }}>
            <div>
              <p className="text-2xl font-semibold tracking-tight">Apply to {uni.name} with Root Education</p>
              <p className="mt-1 text-sm text-white/75">We check the latest requirements and handle your application with you.</p>
            </div>
            <Link href="/consultation" className="inline-flex h-12 w-fit shrink-0 items-center rounded-2xl bg-white px-6 text-sm font-semibold text-ink">
              Book a consultation
            </Link>
          </div>

          <p className="mt-8 text-xs leading-relaxed text-ink/50">
            Indicative information from the university&apos;s published details and programme listings. Programmes, fees and deadlines change each year, so always confirm
            with the university or your Root Education advisor. Sources:{" "}
            {uni.sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 && ", "}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                  {s.label}
                </a>
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </div>
  );
}
