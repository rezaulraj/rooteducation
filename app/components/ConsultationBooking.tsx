"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COUNTRIES, SUBJECTS } from "./universitiesData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LEVELS = ["Foundation", "Bachelor", "Master", "PhD"];
const INTAKES = ["January 2027", "Feb – Mar 2027", "September 2027", "January 2028", "Not sure yet"];
const EDUCATION = ["HSC / A-levels or equivalent", "Diploma", "Bachelor's degree", "Master's degree", "Other"];
const ENGLISH = ["IELTS", "TOEFL", "PTE", "Duolingo", "Not taken yet"];
const BUDGET = ["Under €5,000 / year", "€5,000 – 15,000", "€15,000 – 30,000", "Over €30,000", "Need a scholarship"];
const MODES = [
  { key: "Video call", sub: "Google Meet or Zoom", d: "M3 7h12v10H3zM15 10l6-3v10l-6-3" },
  { key: "Phone call", sub: "We call you", d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" },
  { key: "London office", sub: "7 Kirkdale House, E11", d: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" },
  { key: "Dhaka office", sub: "Sector 12, Uttara", d: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" },
];
const TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];
const STEPS = ["Your plans", "About you", "Book a time"];

const BENEFITS = [
  { t: "A personal shortlist", s: "Countries, universities and programmes that fit your grades and budget.", d: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" },
  { t: "Real costs, upfront", s: "Tuition, living costs and the funds you'll need for the visa.", d: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { t: "Scholarship options", s: "Which scholarships and fee waivers you could apply for.", d: "M12 3l9 5-9 5-9-5 9-5ZM5 10v5c0 2 3 4 7 4s7-2 7-4v-5" },
  { t: "A step-by-step plan", s: "Your application, documents and visa timeline, mapped out.", d: "M4 6h16M4 12h10M4 18h7" },
];

const FAQ = [
  ["Is the consultation really free?", "Yes. Your first consultation is completely free, with no obligation to use our services afterwards."],
  ["How long does it take?", "About 30 minutes. We talk through your goals, grades and budget, then suggest countries, universities and next steps."],
  ["What should I prepare?", "Your latest academic results, any English test scores, and a rough budget. Don't worry if you don't have everything yet."],
  ["Can my parents join?", "Of course. Many students bring a parent or guardian, especially when discussing costs and funding."],
  ["Which countries do you cover?", `We advise on ${COUNTRIES.length} destinations, including the UK, Canada, Australia and many affordable European countries.`],
  ["What happens after the call?", "You receive a written summary with your shortlist. If you'd like our help, we guide you through applications, documents and your visa."],
];

type Form = {
  destinations: string[];
  level: string;
  intake: string;
  subject: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  english: string;
  budget: string;
  mode: string;
  date: string;
  time: string;
  message: string;
  consent: boolean;
};
const EMPTY: Form = { destinations: [], level: "", intake: "", subject: "", name: "", email: "", phone: "", education: "", english: "", budget: "", mode: "Video call", date: "", time: "", message: "", consent: false };

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

function Label({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return <p className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${error ? "text-red-600" : "text-ink/50"}`}>{children}</p>;
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-300 ${on ? "border-brand bg-brand text-white shadow-[0_10px_24px_-12px_rgba(244,122,42,0.9)]" : "border-ink/10 bg-white text-ink/75 hover:-translate-y-0.5 hover:border-ink/25"}`}
    >
      {children}
    </button>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-ink/10 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-red-400";

// Today, read on the client only, so the server render never disagrees with the browser.
const noop = () => () => {};
const useToday = () => useSyncExternalStore(noop, () => new Date().toDateString(), () => null);

export default function ConsultationBooking() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState("");
  const [faq, setFaq] = useState<number | null>(0);
  const today = useToday();

  // The next ten weekdays.
  const days = useMemo(() => {
    if (!today) return [];
    const out: Date[] = [];
    const d = new Date(today);
    while (out.length < 10) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
    }
    return out;
  }, [today]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((x) => ({ ...x, [k]: v }));
  const missing: Record<number, (keyof Form)[]> = {
    0: [...(f.destinations.length ? [] : (["destinations"] as const)), ...(f.level ? [] : (["level"] as const))],
    1: [
      ...(f.name.trim() ? [] : (["name"] as const)),
      ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) ? [] : (["email"] as const)),
      ...(f.phone.replace(/\D/g, "").length >= 7 ? [] : (["phone"] as const)),
    ],
    2: [...(f.date ? [] : (["date"] as const)), ...(f.time ? [] : (["time"] as const)), ...(f.consent ? [] : (["consent"] as const))],
  };
  const bad = (k: keyof Form) => tried && missing[step].includes(k);

  const go = (to: number) => {
    if (to > step && missing[step].length) {
      setTried(true);
      return;
    }
    setTried(false);
    setStep(to);
  };

  const submit = async () => {
    if (missing[2].length) return setTried(true);
    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();
      setReference(data.reference);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-cb-panel]", { clipPath: "inset(0 0 100% 0 round 28px)" }, { clipPath: "inset(0 0 0% 0 round 28px)", duration: 1.3, ease: "power4.inOut" }, 0)
          .fromTo("[data-cb-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.5)
          .fromTo("[data-cb-fade]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.07, ease: "power3.out" }, 0.75)
          .fromTo("[data-cb-form]", { y: 60, autoAlpha: 0, rotateX: 8 }, { y: 0, autoAlpha: 1, rotateX: 0, duration: 1.3 }, 0.6);
        gsap.to("[data-cb-orb]", { x: "random(-60, 60)", y: "random(-40, 40)", duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1, repeatRefresh: true, stagger: 0.8 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(el.children, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
      });
    },
    { scope: root },
  );

  // Each step slides in; the progress bar follows.
  useGSAP(
    () => {
      gsap.to("[data-cb-progress]", { scaleX: status === "done" ? 1 : (step + 1) / STEPS.length, duration: 0.8, ease: "power3.inOut" });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-cb-step] > *", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" });
    },
    { scope: root, dependencies: [step, status], revertOnUpdate: false },
  );

  useGSAP(
    () => {
      if (status !== "done" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline()
        .fromTo("[data-ok-ring]", { scale: 0 }, { scale: 1, duration: 0.8, ease: "back.out(2)" })
        .fromTo("[data-ok-tick]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 0.3)
        .fromTo("[data-ok-burst]", { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.02 }, 0.2)
        .fromTo("[data-ok-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" }, 0.5);
    },
    { scope: root, dependencies: [status] },
  );

  const dateLabel = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div ref={root}>
      <section aria-labelledby="cb-title" className="bg-white px-3 pb-24 pt-3">
        <div className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
          {/* ---------------- Left: why book ---------------- */}
          <div data-cb-panel className="relative overflow-hidden rounded-[28px] bg-[#120D0C] px-6 pb-10 pt-28 text-white sm:px-10 lg:min-h-[calc(100svh-24px)] lg:pb-12">
            <div data-cb-orb aria-hidden className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-brand/45 blur-[110px]" />
            <div data-cb-orb aria-hidden className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#FF5A3C]/25 blur-[120px]" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(80% 70% at 30% 30%, black, transparent)" }}
            />
            <div className="relative">
              <p data-cb-fade className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/75 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Free · 30 minutes · No obligation
              </p>
              <h1 id="cb-title" className="mt-6 text-[clamp(2.6rem,5.6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-cb-line className="block">
                    Let&apos;s plan your
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.12em]">
                  <span data-cb-line className="inline-block bg-gradient-to-r from-[#FFD7B8] via-brand to-[#FF5A3C] bg-clip-text pr-[0.04em] text-transparent">
                    future abroad.
                  </span>
                </span>
              </h1>
              <p data-cb-fade className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                Book a free consultation with a Root Education advisor. In one conversation, you&apos;ll leave with:
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <li key={b.t} data-cb-fade className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition-colors hover:border-brand/50 hover:bg-white/[0.07]">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon d={b.d} />
                    </span>
                    <p className="mt-3 font-semibold">{b.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{b.s}</p>
                  </li>
                ))}
              </ul>

              <dl data-cb-fade className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {[
                  [String(COUNTRIES.length), "Destinations"],
                  ["96+", "Universities"],
                  ["2", "Offices"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dd className="text-3xl font-semibold tracking-tight">{v}</dd>
                    <dt className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">{l}</dt>
                  </div>
                ))}
              </dl>

              <figure data-cb-fade className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Image src="/centerstudent.png" alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full bg-white/10 object-cover object-top" />
                <div>
                  <blockquote className="text-sm leading-relaxed text-white/80">“One call turned a confusing list of countries into a clear plan. I knew exactly what to do next.”</blockquote>
                  <figcaption className="mt-1 text-xs text-white/45">A Root Education student</figcaption>
                </div>
              </figure>
            </div>
          </div>

          {/* ---------------- Right: the booking form ---------------- */}
          <div className="relative flex items-start justify-center rounded-[28px] bg-[#FBF6EF] px-4 pb-10 pt-6 sm:px-8 lg:pt-28 [perspective:1400px]">
            <div data-cb-form className="w-full max-w-2xl rounded-[28px] border border-ink/[0.07] bg-white p-5 shadow-[0_40px_90px_-50px_rgba(11,11,12,0.45)] sm:p-8">
              {/* Progress */}
              <div className="flex items-center justify-between gap-3">
                <ol className="flex flex-1 gap-2">
                  {STEPS.map((s, i) => {
                    const done = status === "done" || i < step;
                    const on = i === step && status !== "done";
                    return (
                      <li key={s} className="flex-1">
                        <button
                          type="button"
                          disabled={status === "done" || i > step}
                          onClick={() => go(i)}
                          className="flex w-full items-center gap-2 text-left disabled:cursor-default"
                          aria-current={on ? "step" : undefined}
                        >
                          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors duration-500 ${done ? "bg-brand text-white" : on ? "bg-ink text-white" : "bg-ink/[0.06] text-ink/40"}`}>
                            {done ? "✓" : i + 1}
                          </span>
                          <span className={`hidden text-sm font-semibold sm:block ${on || done ? "text-ink" : "text-ink/35"}`}>{s}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/[0.06]">
                <div data-cb-progress className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-[#FF5A3C]" style={{ transform: "scaleX(0.333)" }} />
              </div>

              {status === "done" ? (
                /* ---------------- Success ---------------- */
                <div className="py-10 text-center" aria-live="polite">
                  <div className="relative mx-auto h-24 w-24">
                    {Array.from({ length: 12 }, (_, i) => (
                      <span key={i} data-ok-burst aria-hidden className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full" style={{ background: i % 2 ? "#F47A2A" : "#FFC27A", transform: `rotate(${i * 30}deg) translateY(-70px)` }} />
                    ))}
                    <span data-ok-ring className="absolute inset-0 grid place-items-center rounded-full bg-brand text-white shadow-[0_20px_50px_-15px_rgba(244,122,42,0.9)]">
                      <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path data-ok-tick d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray="1" />
                      </svg>
                    </span>
                  </div>
                  <h2 data-ok-fade className="mt-8 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">You&apos;re booked, {f.name.split(" ")[0]}!</h2>
                  <p data-ok-fade className="mx-auto mt-3 max-w-md text-ink/65">
                    We&apos;ll confirm your {f.mode.toLowerCase()} on <span className="font-semibold text-ink">{f.date}</span> at <span className="font-semibold text-ink">{f.time}</span> by email at{" "}
                    <span className="font-semibold text-ink">{f.email}</span>.
                  </p>
                  <p data-ok-fade className="mt-3 font-mono text-xs text-ink/45">Reference {reference}</p>
                  <ol data-ok-fade className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
                    {["We confirm your slot", "Your advisor prepares a shortlist", "You get a written plan after the call"].map((t, i) => (
                      <li key={t} className="rounded-2xl bg-[#FBF6EF] p-4">
                        <span className="font-mono text-xs text-brand">0{i + 1}</span>
                        <p className="mt-1 text-sm font-medium text-ink">{t}</p>
                      </li>
                    ))}
                  </ol>
                  <div data-ok-fade className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/universities" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
                      Explore universities
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform group-hover:rotate-[-45deg]">
                        <Arrow />
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setF(EMPTY);
                        setStep(0);
                        setStatus("idle");
                      }}
                      className="inline-flex h-12 items-center rounded-2xl border border-ink/15 px-5 text-sm font-semibold text-ink/70 hover:text-ink"
                    >
                      Book another
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (step < 2) go(step + 1);
                    else submit();
                  }}
                >
                  <div key={step} data-cb-step className="mt-8 space-y-7">
                    {step === 0 && (
                      <>
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Where would you like to study?</h2>
                          <p className="mt-1 text-sm text-ink/55">Pick one or more. Not sure? Choose &ldquo;Help me decide&rdquo;.</p>
                        </div>
                        <div>
                          <Label error={bad("destinations")}>Destinations{bad("destinations") && " · choose at least one"}</Label>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {COUNTRIES.map((c) => {
                              const on = f.destinations.includes(c.slug);
                              return (
                                <Chip key={c.slug} on={on} onClick={() => set("destinations", on ? f.destinations.filter((x) => x !== c.slug) : [...f.destinations.filter((x) => x !== "undecided"), c.slug])}>
                                  <Image src={`/flags/${c.code}.svg`} alt="" width={18} height={13} unoptimized className="h-3 w-[18px] rounded-[2px] object-cover" />
                                  {c.name}
                                </Chip>
                              );
                            })}
                            <Chip on={f.destinations.includes("undecided")} onClick={() => set("destinations", f.destinations.includes("undecided") ? [] : ["undecided"])}>
                              ✨ Help me decide
                            </Chip>
                          </div>
                        </div>
                        <div>
                          <Label error={bad("level")}>Study level{bad("level") && " · required"}</Label>
                          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {LEVELS.map((l) => (
                              <Chip key={l} on={f.level === l} onClick={() => set("level", l)}>
                                <span className="w-full text-center">{l}</span>
                              </Chip>
                            ))}
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="block">
                            <Label>Preferred intake</Label>
                            <select value={f.intake} onChange={(e) => set("intake", e.target.value)} className={`${inputClass} mt-2`}>
                              <option value="">Select…</option>
                              {INTAKES.map((x) => (
                                <option key={x}>{x}</option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <Label>Subject of interest</Label>
                            <select value={f.subject} onChange={(e) => set("subject", e.target.value)} className={`${inputClass} mt-2`}>
                              <option value="">Select…</option>
                              {SUBJECTS.map((s) => (
                                <option key={s.key}>{s.label}</option>
                              ))}
                              <option>Not sure yet</option>
                            </select>
                          </label>
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Tell us about you</h2>
                          <p className="mt-1 text-sm text-ink/55">So your advisor can prepare before the call.</p>
                        </div>
                        <label className="block">
                          <Label error={bad("name")}>Full name{bad("name") && " · required"}</Label>
                          <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={bad("name")} placeholder="Your name" className={`${inputClass} mt-2`} />
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="block">
                            <Label error={bad("email")}>Email{bad("email") && " · enter a valid email"}</Label>
                            <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={bad("email")} placeholder="you@example.com" className={`${inputClass} mt-2`} />
                          </label>
                          <label className="block">
                            <Label error={bad("phone")}>Phone / WhatsApp{bad("phone") && " · required"}</Label>
                            <input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" aria-invalid={bad("phone")} placeholder="+880 1XXX XXXXXX" className={`${inputClass} mt-2`} />
                          </label>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {(
                            [
                              ["education", "Current education", EDUCATION],
                              ["english", "English test", ENGLISH],
                              ["budget", "Yearly budget", BUDGET],
                            ] as const
                          ).map(([k, label, opts]) => (
                            <label key={k} className="block">
                              <Label>{label}</Label>
                              <select value={f[k]} onChange={(e) => set(k, e.target.value)} className={`${inputClass} mt-2`}>
                                <option value="">Select…</option>
                                {opts.map((x) => (
                                  <option key={x}>{x}</option>
                                ))}
                              </select>
                            </label>
                          ))}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Pick a time that suits you</h2>
                          <p className="mt-1 text-sm text-ink/55">Choose a slot in your local time. WeTimes are shown in your local time zone.apos;ll confirm the exact time by email.</p>
                        </div>
                        <div>
                          <Label>How would you like to meet?</Label>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {MODES.map((m) => {
                              const on = f.mode === m.key;
                              return (
                                <button
                                  key={m.key}
                                  type="button"
                                  aria-pressed={on}
                                  onClick={() => set("mode", m.key)}
                                  className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 ${on ? "border-brand bg-brand/[0.06] ring-4 ring-brand/10" : "border-ink/10 hover:border-ink/25"}`}
                                >
                                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${on ? "bg-brand text-white" : "bg-ink/[0.05] text-ink/60"}`}>
                                    <Icon d={m.d} />
                                  </span>
                                  <span>
                                    <span className="block text-sm font-semibold text-ink">{m.key}</span>
                                    <span className="block text-xs text-ink/50">{m.sub}</span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <Label error={bad("date")}>Date{bad("date") && " · choose a day"}</Label>
                          <div data-lenis-prevent className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
                            {days.map((d) => {
                              const label = dateLabel(d);
                              const on = f.date === label;
                              const [wd, day, mon] = label.split(" ");
                              return (
                                <button
                                  key={label}
                                  type="button"
                                  aria-pressed={on}
                                  aria-label={label}
                                  onClick={() => set("date", label)}
                                  className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 transition-all duration-300 ${on ? "border-brand bg-brand text-white shadow-[0_12px_28px_-14px_rgba(244,122,42,1)]" : "border-ink/10 hover:-translate-y-0.5 hover:border-ink/25"}`}
                                >
                                  <span className={`text-[0.65rem] font-semibold uppercase tracking-wider ${on ? "text-white/80" : "text-ink/45"}`}>{wd.replace(",", "")}</span>
                                  <span className="text-xl font-semibold leading-tight">{day}</span>
                                  <span className={`text-[0.65rem] ${on ? "text-white/80" : "text-ink/45"}`}>{mon}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <Label error={bad("time")}>Time{bad("time") && " · choose a time"}</Label>
                          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                            {TIMES.map((t) => (
                              <Chip key={t} on={f.time === t} onClick={() => set("time", t)}>
                                <span className="w-full text-center font-mono">{t}</span>
                              </Chip>
                            ))}
                          </div>
                        </div>
                        <label className="block">
                          <Label>Anything we should know? (optional)</Label>
                          <textarea
                            value={f.message}
                            onChange={(e) => set("message", e.target.value)}
                            rows={3}
                            maxLength={2000}
                            placeholder="Your grades, questions or goals…"
                            className={`${inputClass} mt-2 h-auto resize-none py-3`}
                          />
                        </label>
                        <label className="flex cursor-pointer items-start gap-3">
                          <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} className="peer sr-only" />
                          <span
                            aria-hidden
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 text-[0.7rem] text-white transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20 ${f.consent ? "border-brand bg-brand" : bad("consent") ? "border-red-400" : "border-ink/25"}`}
                          >
                            {f.consent && "✓"}
                          </span>
                          <span className={`text-sm ${bad("consent") ? "text-red-600" : "text-ink/65"}`}>I agree that Root Education may contact me about my consultation.</span>
                        </label>
                        {status === "error" && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">Something went wrong sending your booking. Please try again.</p>}
                      </>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="mt-9 flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-6">
                    {step > 0 ? (
                      <button type="button" onClick={() => go(step - 1)} className="inline-flex h-12 items-center gap-2 rounded-2xl px-4 text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
                        <Arrow className="h-4 w-4 rotate-180" />
                        Back
                      </button>
                    ) : (
                      <span className="text-xs text-ink/45">Step 1 of 3 · takes 1 minute</span>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                    >
                      {step < 2 ? "Continue" : status === "sending" ? "Booking…" : "Book my free consultation"}
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:translate-x-0.5">
                        {status === "sending" ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Arrow />}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section aria-labelledby="cb-faq" className="bg-white px-6 pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="inline-flex rounded-full border border-brand/30 px-4 py-1.5 text-sm font-semibold text-brand">Questions</p>
            <h2 id="cb-faq" className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
              Before you <span className="text-brand">book</span>
            </h2>
            <p className="mt-5 max-w-sm text-ink/60">Everything students usually ask about their first consultation.</p>
          </div>
          <ul data-reveal className="space-y-3">
            {FAQ.map(([q, a], i) => {
              const on = faq === i;
              return (
                <li key={q} className={`overflow-hidden rounded-[22px] border transition-colors duration-500 ${on ? "border-brand/30 bg-[#FBF6EF]" : "border-ink/10 bg-white"}`}>
                  <button type="button" aria-expanded={on} onClick={() => setFaq(on ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-base font-semibold text-ink sm:text-lg">{q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${on ? "rotate-45 bg-brand text-white" : "bg-ink/[0.05] text-ink"}`} aria-hidden>
                      +
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-ink/65">{a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
