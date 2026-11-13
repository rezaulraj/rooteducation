"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Everything the eight-part study guide needs for one country. */
export type GuideData = {
  country: string;
  /** The country's accent colour, and a darker shade for gradients. */
  accent: string;
  accentDark: string;
  /** Currency symbol for tuition and living costs; euros unless set. */
  currency?: string;
  intros: Record<"why" | "cost" | "jobs" | "scholarships" | "apply" | "admission" | "documents" | "visa", string> & { intakes?: string };
  /** Optional: the usual intakes in the year. When set, an "Intakes" section follows "Why study". */
  intakes?: { title: string; when: string; months: number[]; copy: string; apply: string; main?: boolean }[];
  reasons: { icon: string; title: string; copy: string }[];
  tuition: { field: string; from: number; to: number }[];
  living: { from: number; to: number; items: { item: string; range: string; share: number; note: string }[] };
  work: { big: string; unit: string; copy: string; points: [string, string][] };
  scholarships: { title: string; who: string; covers: string[]; when: string }[];
  applySteps: { title: string; copy: string }[];
  admission: { Bachelor: string[]; Master: string[] };
  documents: string[];
  visa: { stats: [string, string, string][]; steps: string[]; documents: string[] };
  disclaimer: string;
};

const allIds = ["why", "intakes", "cost", "jobs", "scholarships", "apply", "admission", "documents", "visa"] as const;
type SectionId = (typeof allIds)[number];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const money = (n: number, symbol = "€") => `${symbol}${n.toLocaleString("en-GB")}`;
const pad = (n: number) => String(n).padStart(2, "0");

type SectionProps = { id: SectionId; n: number; total: number; accent: string; title: string; intro: string; children: ReactNode };
function Section({ id, n, total, accent, title, intro, children }: SectionProps) {
  return (
    <section id={id} data-rg-section className="scroll-mt-28 border-t border-ink/10 py-16 first:border-t-0 first:pt-0 sm:py-20">
      <div data-rg-head>
        <p className="font-mono text-sm" style={{ color: accent }}>
          {pad(n)} / {pad(total)}
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65">{intro}</p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Tick({ accent }: { accent: string }) {
  return (
    <span data-rg-tick className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white" style={{ background: accent }}>
      <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 6.2 5 8.5l4.5-5" />
      </svg>
    </span>
  );
}

export default function CountryGuide({ data: d }: { data: GuideData }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState<"Bachelor" | "Master">("Bachelor");
  const A = d.accent;
  const titleOf: Record<SectionId, string> = {
    why: `Why Study in ${d.country}?`,
    intakes: "Intakes",
    cost: "Cost of Study and Living",
    jobs: "Job Opportunity",
    scholarships: "Scholarships",
    apply: "Application Procedures",
    admission: "Admission Requirements",
    documents: "Required Documents",
    visa: "Visa Procedures & Fees",
  };
  // The sections this country has, in order; "intakes" only when there is intake data.
  const ids = allIds.filter((id) => id !== "intakes" || d.intakes?.length);
  const titles = ids.map((id) => titleOf[id]);
  const sec = (id: SectionId) => ({
    id,
    n: ids.indexOf(id) + 1,
    total: ids.length,
    accent: A,
    title: titleOf[id],
    intro: (id === "intakes" ? d.intros.intakes : d.intros[id]) ?? "",
  });
  const tuitionMax = Math.max(...d.tuition.map((t) => t.to));
  const swatches = [A, "#F47A2A", "#FBB524", "#7FB59C", "#2A2023"];

  useGSAP(
    () => {
      const secs = gsap.utils.toArray<HTMLElement>("[data-rg-section]");
      // Highlight the section in the middle of the screen.
      secs.forEach((s, i) => {
        ScrollTrigger.create({ trigger: s, start: "top 45%", end: "bottom 45%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-rg-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-rg-body]", start: "top 40%", end: "bottom 60%", scrub: true } });

        secs.forEach((s) => {
          const q = (sel: string) => s.querySelectorAll(sel);
          const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: s, start: "top 75%" } });
          tl.from(q("[data-rg-head] > *"), { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.08 });
          if (q("[data-rg-item]").length) tl.from(q("[data-rg-item]"), { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.2);
          if (q("[data-rg-bar]").length) tl.from(q("[data-rg-bar]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.1, stagger: 0.08, ease: "expo.out" }, 0.35);
          if (q("[data-rg-tick]").length) tl.from(q("[data-rg-tick]"), { scale: 0, duration: 0.4, stagger: 0.04, ease: "back.out(3)" }, 0.4);
          q("[data-rg-count]").forEach((el) => {
            const end = Number((el as HTMLElement).dataset.rgCount);
            const v = { n: 0 };
            tl.to(v, { n: end, duration: 1.4, ease: "power2.out", onUpdate: () => ((el as HTMLElement).textContent = Math.round(v.n).toLocaleString("en-GB")) }, 0.3);
          });
          if (q("[data-rg-line]").length) tl.from(q("[data-rg-line]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 1.4, ease: "power2.inOut" }, 0.3);
        });
      });
    },
    { scope: root },
  );

  // Switching Bachelor / Master re-deals the checklist.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-rg-req]", { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" });
    },
    { scope: root, dependencies: [level], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold" style={{ borderColor: `${A}55`, color: A }}>
            The complete guide
          </p>
          <h2 className="mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            Everything you need to know about <span style={{ color: A }}>studying in {d.country}</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Contents */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">On this page</p>
              <ol className="relative mt-5 space-y-1 border-l border-ink/10">
                <span data-rg-progress aria-hidden className="absolute -left-px top-0 h-full w-px origin-top" style={{ background: A }} />
                {titles.map((t, i) => (
                  <li key={ids[i]}>
                    <a
                      href={`#${ids[i]}`}
                      className={`flex items-baseline gap-3 py-2 pl-5 text-sm transition-all duration-300 ${i === active ? "translate-x-1 font-semibold text-ink" : "text-ink/45 hover:text-ink/80"}`}
                    >
                      <span className="font-mono text-xs" style={{ color: i === active ? A : undefined }}>
                        {pad(i + 1)}
                      </span>
                      {t}
                    </a>
                  </li>
                ))}
              </ol>
              <Link href="/consultation" className="mt-8 flex flex-col gap-1 rounded-2xl p-5 text-white transition-transform hover:-translate-y-0.5" style={{ background: A }}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Need help?</span>
                <span className="text-lg font-semibold leading-tight">Talk to a {d.country.replace(/^the /, "")} advisor →</span>
              </Link>
            </div>
          </nav>

          <div data-rg-body>
            {/* 1. Why */}
            <Section {...sec("why")}>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {d.reasons.map((r) => (
                  <li key={r.title} data-rg-item className="group rounded-[22px] border border-ink/10 bg-[#FBF6EF] p-6 transition-colors hover:bg-white">
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ background: A }}>
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{r.copy}</p>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Intakes */}
            {d.intakes?.length ? (
              <Section {...sec("intakes")}>
                {/* The year at a glance */}
                <div data-rg-item className="overflow-hidden rounded-[24px] border border-ink/10 bg-[#FBF6EF] p-5 sm:p-6">
                  <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
                    {monthNames.map((m, mi) => {
                      const hit = d.intakes!.find((it) => it.months.includes(mi + 1));
                      return (
                        <div key={m} className="flex flex-col items-center gap-2">
                          <span
                            data-rg-bar
                            className="h-10 w-full rounded-lg sm:h-14"
                            style={{ background: hit ? (hit.main ? A : `${A}80`) : "rgba(11,11,12,0.06)" }}
                          />
                          <span className={`text-[0.6rem] font-semibold uppercase tracking-wider sm:text-xs ${hit ? "text-ink" : "text-ink/35"}`}>{m}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink/55">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: A }} /> Main intake
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: `${A}80` }} /> Other intakes
                    </span>
                  </div>
                </div>

                <ul className="mt-5 grid gap-4 md:grid-cols-3">
                  {d.intakes.map((it) => (
                    <li
                      key={it.title}
                      data-rg-item
                      className="relative flex flex-col overflow-hidden rounded-[24px] border p-6"
                      style={it.main ? { background: A, borderColor: A, color: "#fff" } : { borderColor: "rgba(11,11,12,0.1)" }}
                    >
                      {it.main && <span className="mb-3 self-start rounded-full bg-white/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider">Main intake</span>}
                      <p className={`text-3xl font-semibold tracking-tight ${it.main ? "" : "text-ink"}`}>{it.when}</p>
                      <p className={`mt-1 text-sm font-semibold ${it.main ? "text-white/80" : ""}`} style={it.main ? undefined : { color: A }}>
                        {it.title}
                      </p>
                      <p className={`mt-4 text-sm leading-relaxed ${it.main ? "text-white/80" : "text-ink/65"}`}>{it.copy}</p>
                      <p className={`mt-auto pt-5 text-xs font-semibold ${it.main ? "text-white" : "text-ink/70"}`}>
                        <span className={it.main ? "text-white/60" : "text-ink/45"}>Apply by: </span>
                        {it.apply}
                      </p>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {/* 2. Cost */}
            <Section {...sec("cost")}>
              <div className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
                <div data-rg-item className="rounded-[24px] bg-[#141012] p-6 text-white sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Tuition per year</p>
                  <ul className="mt-6 space-y-5">
                    {d.tuition.map((t) => (
                      <li key={t.field}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="font-medium">{t.field}</span>
                          <span className="whitespace-nowrap font-mono text-white/75">{t.from === t.to ? money(t.from, d.currency) : `${money(t.from, d.currency)}–${money(t.to, d.currency)}`}</span>
                        </div>
                        <div className="relative mt-2 h-2.5 rounded-full bg-white/10">
                          <span
                            data-rg-bar
                            className="absolute inset-y-0 rounded-full"
                            style={{
                              left: `${(t.from / tuitionMax) * 100}%`,
                              width: `max(10px, ${((t.to - t.from) / tuitionMax) * 100}%)`,
                              background: `linear-gradient(90deg, #F47A2A, ${A})`,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div data-rg-item className="rounded-[24px] border border-ink/10 bg-[#FBF6EF] p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Living costs per month</p>
                  <p className="mt-3 text-5xl font-semibold tracking-tight text-ink">
                    {d.currency ?? "€"}
                    <span data-rg-count={d.living.from}>{d.living.from.toLocaleString("en-GB")}</span>–<span data-rg-count={d.living.to}>{d.living.to.toLocaleString("en-GB")}</span>
                  </p>
                  <div className="mt-6 flex h-3 overflow-hidden rounded-full">
                    {d.living.items.map((l, i) => (
                      <span key={l.item} data-rg-bar className="h-full" style={{ width: `${l.share}%`, background: swatches[i % swatches.length] }} />
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {d.living.items.map((l, i) => (
                      <li key={l.item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: swatches[i % swatches.length] }} />
                        <span className="flex-1">
                          <span className="font-medium text-ink">{l.item}</span>
                          <span className="block text-xs text-ink/50">{l.note}</span>
                        </span>
                        <span className="whitespace-nowrap font-mono text-ink/70">{l.range}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* 3. Jobs */}
            <Section {...sec("jobs")}>
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
                <div data-rg-item className="flex flex-col justify-between rounded-[24px] p-7 text-white" style={{ background: `linear-gradient(150deg, ${A} 0%, ${d.accentDark} 100%)` }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Part-time while studying</p>
                  <p className="mt-6 text-7xl font-semibold leading-none tracking-tight">
                    <span data-rg-count={d.work.big}>{d.work.big}</span>
                    <span className="text-3xl"> {d.work.unit}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">{d.work.copy}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {d.work.points.map(([t, c]) => (
                    <li key={t} data-rg-item className="rounded-[20px] border border-ink/10 bg-[#FBF6EF] p-5">
                      <h3 className="font-semibold text-ink">{t}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{c}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* 4. Scholarships */}
            <Section {...sec("scholarships")}>
              <ul className="grid gap-4 lg:grid-cols-3">
                {d.scholarships.map((s, i) => (
                  <li
                    key={s.title}
                    data-rg-item
                    className={`flex flex-col rounded-[24px] p-6 sm:p-7 ${i === 0 ? "text-white" : "border border-ink/10 bg-[#FBF6EF] text-ink"}`}
                    style={i === 0 ? { background: "#141012" } : undefined}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: i === 0 ? A : "#141012" }}>
                      <Icon name="scholarship" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className={`mt-1 text-xs font-medium uppercase tracking-[0.15em] ${i === 0 ? "text-white/50" : "text-ink/45"}`}>{s.who}</p>
                    <ul className="mt-5 space-y-2.5">
                      {s.covers.map((c) => (
                        <li key={c} className="flex items-center gap-2.5 text-sm">
                          <Tick accent={A} />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-auto pt-6 text-sm ${i === 0 ? "text-white/65" : "text-ink/55"}`}>{s.when}</p>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 5. Application */}
            <Section {...sec("apply")}>
              <ol className="relative space-y-4 pl-12">
                <span data-rg-line aria-hidden className="absolute bottom-6 left-[19px] top-6 w-0.5 rounded-full" style={{ background: `${A}55` }} />
                {d.applySteps.map((s, i) => (
                  <li key={s.title} data-rg-item className="relative rounded-[20px] border border-ink/10 bg-[#FBF6EF] p-5 sm:p-6">
                    <span className="absolute -left-12 top-5 grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-semibold text-white ring-4 ring-white" style={{ background: A }}>
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{s.copy}</p>
                  </li>
                ))}
              </ol>
            </Section>

            {/* 6. Admission */}
            <Section {...sec("admission")}>
              <div data-rg-item className="rounded-[24px] border border-ink/10 bg-[#FBF6EF] p-6 sm:p-8">
                <div role="tablist" aria-label="Level of study" className="inline-flex rounded-full bg-white p-1 shadow-sm">
                  {(["Bachelor", "Master"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      role="tab"
                      aria-selected={level === l}
                      onClick={() => setLevel(l)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${level === l ? "text-white" : "text-ink/60 hover:text-ink"}`}
                      style={level === l ? { background: A } : undefined}
                    >
                      {l}&apos;s
                    </button>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {d.admission[level].map((r) => (
                    <li key={r} data-rg-req className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink/80">
                      <Tick accent={A} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* 7. Documents */}
            <Section {...sec("documents")}>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.documents.map((doc, i) => (
                  <li key={doc} data-rg-item className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-4 transition-colors hover:border-ink/25">
                    <span className="grid h-10 w-9 shrink-0 place-items-center rounded-md border border-ink/15 bg-[#FBF6EF] font-mono text-[0.65rem] text-ink/50 transition-transform group-hover:-rotate-6">
                      {pad(i + 1)}
                    </span>
                    <span className="text-sm font-medium text-ink/85">{doc}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 8. Visa */}
            <Section {...sec("visa")}>
              <div className="grid gap-4 sm:grid-cols-3">
                {d.visa.stats.map(([k, v, n], i) => (
                  <div key={k} data-rg-item className="rounded-[22px] bg-[#141012] p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{k}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight" style={{ color: i === 1 ? "#F47A2A" : undefined }}>
                      {v}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{n}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div data-rg-item className="rounded-[24px] border border-ink/10 bg-[#FBF6EF] p-6 sm:p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">How to apply</h3>
                  <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink/70">
                    {d.visa.steps.map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="font-mono font-semibold" style={{ color: A }}>
                          {i + 1}.
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div data-rg-item className="rounded-[24px] border border-ink/10 bg-white p-6 sm:p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">Documents for the visa</h3>
                  <ul className="mt-4 space-y-2.5">
                    {d.visa.documents.map((doc) => (
                      <li key={doc} className="flex items-center gap-2.5 text-sm text-ink/80">
                        <Tick accent={A} />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <p className="mt-4 rounded-2xl bg-[#FBF6EF] p-5 text-xs leading-relaxed text-ink/55">{d.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
