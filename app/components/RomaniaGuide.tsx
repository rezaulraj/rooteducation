"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const RED = "#B3132B";

const sections = [
  { id: "why", title: "Why Study in Romania?" },
  { id: "cost", title: "Cost of Study and Living" },
  { id: "jobs", title: "Job Opportunity" },
  { id: "scholarships", title: "Scholarships" },
  { id: "apply", title: "Application Procedures" },
  { id: "admission", title: "Admission Requirements" },
  { id: "documents", title: "Required Documents" },
  { id: "visa", title: "Visa Procedures & Fees" },
];

// ---------------------------------------------------------------- content
// Figures are indicative (2025–26 sources) and vary by university and year.

const reasons = [
  { icon: "university", title: "EU-recognised degrees", copy: "Romania is in the EU, so its degrees are recognised across Europe and widely beyond." },
  { icon: "document", title: "Taught in English", copy: "Hundreds of programmes in English, including medicine, dentistry, engineering and business." },
  { icon: "scholarship", title: "Affordable fees", copy: "Tuition and living costs are among the lowest in the European Union." },
  { icon: "compass", title: "Strong in medicine", copy: "Long-established medical universities in Bucharest, Cluj-Napoca, Iași and Timișoara." },
  { icon: "plane", title: "Schengen member", copy: "A full Schengen member since January 2025, making travel around Europe simpler." },
  { icon: "passport", title: "Safe and welcoming", copy: "Lively student cities, a low cost of living and a large international student community." },
];

const tuition = [
  { field: "Medicine & dentistry", from: 7500, to: 10000 },
  { field: "Pharmacy", from: 6000, to: 9000 },
  { field: "Engineering & IT", from: 2700, to: 4500 },
  { field: "Business & economics", from: 2500, to: 4000 },
  { field: "Humanities & social sciences", from: 2000, to: 3500 },
];
const TUITION_MAX = 10000;

const living = [
  { item: "Accommodation", range: "€100–450", share: 40, note: "University dorm or shared flat" },
  { item: "Food", range: "€150–250", share: 30, note: "Groceries and eating out" },
  { item: "Transport", range: "€10–25", share: 5, note: "Student discounts on city transport" },
  { item: "Phone & internet", range: "€10–20", share: 5, note: "Fast, cheap mobile data" },
  { item: "Other", range: "€50–120", share: 20, note: "Books, leisure, health" },
];

const scholarships = [
  {
    title: "Romanian Government scholarship",
    who: "Non-EU students · Bachelor, Master, PhD",
    covers: ["Tuition fee waiver", "Monthly stipend", "Visa fee waived", "Dorm place, subject to availability"],
    when: "Call usually opens in January, closing around March",
  },
  {
    title: "University merit scholarships",
    who: "Enrolled students, by results",
    covers: ["Fee reductions or stipends", "Awarded each semester", "Based on grades and activity"],
    when: "Ask each university after enrolment",
  },
  {
    title: "Erasmus+ mobility grants",
    who: "Students already enrolled in Romania",
    covers: ["Study or train in another EU country", "Monthly grant for the exchange"],
    when: "Through your university's international office",
  },
];

const applySteps = [
  { title: "Choose a programme", copy: "Pick a university, programme and language of study that suit your goals and budget." },
  { title: "Apply to the university", copy: "Submit your application and documents, usually online, and pay any application fee." },
  { title: "Receive your offer", copy: "If accepted, the university sends your file to the Ministry of Education." },
  { title: "Letter of Acceptance to Studies", copy: "Non-EU students receive this official letter from the Ministry. It is needed for the visa." },
  { title: "Pay first-year tuition", copy: "One year's tuition is normally paid in advance, as the embassy asks for proof." },
  { title: "Apply for the student visa", copy: "Apply for the long-stay study visa (D/SD) at the Romanian embassy or consulate." },
  { title: "Arrive and register", copy: "Enrol at your university and apply for a residence permit before your visa expires." },
];

const admission = {
  Bachelor: [
    "Upper secondary school-leaving certificate (HSC / A-levels or equivalent)",
    "Academic transcripts with good grades",
    "English proficiency: IELTS around 5.5–6.0, TOEFL, or the university's own test",
    "For medicine: strong biology and chemistry, and often an exam or interview",
    "Recognition of your diploma by the Romanian authorities",
  ],
  Master: [
    "Bachelor's degree in a related field",
    "Bachelor's transcripts",
    "English proficiency: IELTS around 6.0 or equivalent",
    "Motivation letter and CV",
    "Sometimes an interview or portfolio",
  ],
};

const documents = [
  "Completed application form",
  "Passport copy (valid for the whole stay)",
  "Birth certificate",
  "School / university diplomas",
  "Academic transcripts",
  "Certified translations of documents",
  "Legalisation or apostille of diplomas",
  "English language certificate",
  "Medical certificate",
  "Passport-size photos",
  "CV and motivation letter (Master)",
  "Proof of application fee payment",
];

const visaDocs = [
  "Letter of Acceptance to Studies",
  "Proof of one year's tuition paid",
  "Proof of funds for living costs",
  "Proof of accommodation",
  "Health insurance",
  "Criminal record certificate",
  "Passport and photos",
];

// ---------------------------------------------------------------- pieces

function Section({ id, n, title, intro, children }: { id: string; n: number; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} data-rg-section className="scroll-mt-28 border-t border-ink/10 py-16 first:border-t-0 first:pt-0 sm:py-20">
      <div data-rg-head>
        <p className="font-mono text-sm" style={{ color: RED }}>
          {String(n).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65">{intro}</p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Tick() {
  return (
    <span data-rg-tick className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white" style={{ background: RED }}>
      <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 6.2 5 8.5l4.5-5" />
      </svg>
    </span>
  );
}

const eur = (n: number) => `€${n.toLocaleString("en-GB")}`;

// ---------------------------------------------------------------- page

export default function RomaniaGuide() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState<"Bachelor" | "Master">("Bachelor");

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
            tl.to(v, { n: end, duration: 1.4, ease: "power2.out", onUpdate: () => ((el as HTMLElement).textContent = String(Math.round(v.n))) }, 0.3);
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
          <p className="inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold" style={{ borderColor: `${RED}55`, color: RED }}>
            The complete guide
          </p>
          <h2 className="mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            Everything you need to know about <span style={{ color: RED }}>studying in Romania</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Contents */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">On this page</p>
              <ol className="relative mt-5 space-y-1 border-l border-ink/10">
                <span data-rg-progress aria-hidden className="absolute -left-px top-0 h-full w-px origin-top" style={{ background: RED }} />
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-baseline gap-3 py-2 pl-5 text-sm transition-all duration-300 ${i === active ? "translate-x-1 font-semibold text-ink" : "text-ink/45 hover:text-ink/80"}`}
                    >
                      <span className="font-mono text-xs" style={{ color: i === active ? RED : undefined }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <Link href="/consultation" className="mt-8 flex flex-col gap-1 rounded-2xl p-5 text-white transition-transform hover:-translate-y-0.5" style={{ background: RED }}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Need help?</span>
                <span className="text-lg font-semibold leading-tight">Talk to a Romania advisor →</span>
              </Link>
            </div>
          </nav>

          <div data-rg-body>
            {/* 1. Why */}
            <Section id="why" n={1} title="Why Study in Romania?" intro="An EU education at a fraction of the usual cost, with English-taught degrees and a long tradition in medicine and engineering.">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reasons.map((r) => (
                  <li key={r.title} data-rg-item className="group rounded-[22px] border border-ink/10 bg-[#FBF6EF] p-6 transition-colors hover:bg-white">
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ background: RED }}>
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{r.copy}</p>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 2. Cost */}
            <Section id="cost" n={2} title="Cost of Study and Living" intro="Typical yearly tuition for non-EU students in English-taught programmes, and what a month of student life costs.">
              <div className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
                <div data-rg-item className="rounded-[24px] bg-[#141012] p-6 text-white sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Tuition per year</p>
                  <ul className="mt-6 space-y-5">
                    {tuition.map((t) => (
                      <li key={t.field}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="font-medium">{t.field}</span>
                          <span className="whitespace-nowrap font-mono text-white/75">
                            {eur(t.from)}–{eur(t.to)}
                          </span>
                        </div>
                        <div className="relative mt-2 h-2.5 rounded-full bg-white/10">
                          <span
                            data-rg-bar
                            className="absolute inset-y-0 rounded-full"
                            style={{ left: `${(t.from / TUITION_MAX) * 100}%`, width: `${((t.to - t.from) / TUITION_MAX) * 100}%`, background: `linear-gradient(90deg, #F47A2A, ${RED})` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div data-rg-item className="rounded-[24px] border border-ink/10 bg-[#FBF6EF] p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Living costs per month</p>
                  <p className="mt-3 text-5xl font-semibold tracking-tight text-ink">
                    €<span data-rg-count="400">400</span>–<span data-rg-count="700">700</span>
                  </p>
                  <div className="mt-6 flex h-3 overflow-hidden rounded-full">
                    {living.map((l, i) => (
                      <span key={l.item} data-rg-bar className="h-full" style={{ width: `${l.share}%`, background: [RED, "#F47A2A", "#FBB524", "#7FB59C", "#2A2023"][i] }} />
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {living.map((l, i) => (
                      <li key={l.item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: [RED, "#F47A2A", "#FBB524", "#7FB59C", "#2A2023"][i] }} />
                        <span className="flex-1">
                          <span className="font-medium text-ink">{l.item}</span>
                          <span className="block text-xs text-ink/50">{l.note}</span>
                        </span>
                        <span className="font-mono text-ink/70">{l.range}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* 3. Jobs */}
            <Section id="jobs" n={3} title="Job Opportunity" intro="With a student residence permit you can work part-time alongside your studies, and Romania's growing economy offers options after graduation.">
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
                <div data-rg-item className="flex flex-col justify-between rounded-[24px] p-7 text-white" style={{ background: `linear-gradient(150deg, #D32F45, ${RED} 60%, #7A0C1C)` }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Part-time while studying</p>
                  <p className="mt-6 text-7xl font-semibold leading-none tracking-tight">
                    <span data-rg-count="4">4</span>
                    <span className="text-3xl"> hrs/day</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    Non-EU students with a valid study residence permit can work up to four hours a day without a separate work permit.
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Popular student jobs", "IT support, call centres, tutoring, hospitality and delivery."],
                    ["Growing sectors", "IT and software, outsourcing, engineering, healthcare and shared services."],
                    ["Internships", "Many programmes include placements, especially in medicine and engineering."],
                    ["After you graduate", "With a job offer, you can apply to switch your residence permit from study to work."],
                  ].map(([t, c]) => (
                    <li key={t} data-rg-item className="rounded-[20px] border border-ink/10 bg-[#FBF6EF] p-5">
                      <h3 className="font-semibold text-ink">{t}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{c}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* 4. Scholarships */}
            <Section id="scholarships" n={4} title="Scholarships" intro="Funding is available, but the main government scheme is competitive and has an early deadline, so plan ahead.">
              <ul className="grid gap-4 lg:grid-cols-3">
                {scholarships.map((s, i) => (
                  <li key={s.title} data-rg-item className={`flex flex-col rounded-[24px] p-6 sm:p-7 ${i === 0 ? "text-white" : "border border-ink/10 bg-[#FBF6EF] text-ink"}`} style={i === 0 ? { background: "#141012" } : undefined}>
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: i === 0 ? RED : "#141012" }}>
                      <Icon name="scholarship" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className={`mt-1 text-xs font-medium uppercase tracking-[0.15em] ${i === 0 ? "text-white/50" : "text-ink/45"}`}>{s.who}</p>
                    <ul className="mt-5 space-y-2.5">
                      {s.covers.map((c) => (
                        <li key={c} className="flex items-center gap-2.5 text-sm">
                          <Tick />
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
            <Section id="apply" n={5} title="Application Procedures" intro="From choosing a programme to arriving on campus, these are the steps for a non-EU student.">
              <ol className="relative space-y-4 pl-12">
                <span data-rg-line aria-hidden className="absolute bottom-6 left-[19px] top-6 w-0.5 rounded-full" style={{ background: `${RED}55` }} />
                {applySteps.map((s, i) => (
                  <li key={s.title} data-rg-item className="relative rounded-[20px] border border-ink/10 bg-[#FBF6EF] p-5 sm:p-6">
                    <span className="absolute -left-12 top-5 grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-semibold text-white ring-4 ring-white" style={{ background: RED }}>
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{s.copy}</p>
                  </li>
                ))}
              </ol>
            </Section>

            {/* 6. Admission */}
            <Section id="admission" n={6} title="Admission Requirements" intro="Entry requirements vary by university and programme. These are the usual ones for international students.">
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
                      style={level === l ? { background: RED } : undefined}
                    >
                      {l}&apos;s
                    </button>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {admission[level].map((r) => (
                    <li key={r} data-rg-req className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink/80">
                      <Tick />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* 7. Documents */}
            <Section id="documents" n={7} title="Required Documents" intro="Prepare these for your university application. Documents not in English or Romanian need certified translations.">
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {documents.map((d, i) => (
                  <li key={d} data-rg-item className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-4 transition-colors hover:border-[#B3132B]/40">
                    <span className="grid h-10 w-9 shrink-0 place-items-center rounded-md border border-ink/15 bg-[#FBF6EF] font-mono text-[0.65rem] text-ink/50 transition-transform group-hover:-rotate-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-ink/85">{d}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 8. Visa */}
            <Section id="visa" n={8} title="Visa Procedures & Fees" intro="Non-EU students need a long-stay visa for studies, then a residence permit after arriving in Romania.">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Visa type", "D/SD", "Long-stay visa for studies"],
                  ["Visa fee", "€120", "Waived for government scholarship holders"],
                  ["After arrival", "Residence permit", "Apply before your visa expires"],
                ].map(([k, v, n]) => (
                  <div key={k} data-rg-item className="rounded-[22px] bg-[#141012] p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{k}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight" style={{ color: k === "Visa fee" ? "#F47A2A" : undefined }}>
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
                    {[
                      "Get your Letter of Acceptance to Studies and pay first-year tuition.",
                      "Apply online through Romania's e-Visa portal and book an appointment.",
                      "Submit your documents and pay the fee at the Romanian embassy or consulate.",
                      "Attend an interview if asked. Processing usually takes several weeks.",
                      "Travel, enrol, and apply for your residence permit at the Immigration Inspectorate.",
                    ].map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="font-mono font-semibold" style={{ color: RED }}>
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
                    {visaDocs.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-sm text-ink/80">
                        <Tick />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <p className="mt-4 rounded-2xl bg-[#FBF6EF] p-5 text-xs leading-relaxed text-ink/55">
              Figures are indicative, based on 2025–26 university and government information, and change from year to year. Always confirm current fees, funds requirements
              and deadlines with your university and the Romanian embassy or consulate before applying. Our advisors can check the latest details for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
