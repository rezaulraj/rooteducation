"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  { title: "Profile review", copy: "We look at your grades, achievements, background and budget to see where you stand." },
  { title: "Funding search", copy: "We match you with scholarships, grants and bursaries across your chosen countries." },
  { title: "Eligibility check", copy: "We confirm the criteria and deadlines for each one, so you only apply where you have a real chance." },
  { title: "Strong applications", copy: "Essays, statements and documents prepared and reviewed to stand out." },
  { title: "Offers compared", copy: "We help you weigh each award against the total cost, and plan for the rest." },
];
const R = 120;
const C = 2 * Math.PI * R;

export default function ScholarshipSteps() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ss-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });

        // The ring fills as the steps scroll past; whichever step is mid-screen is the active one.
        gsap.fromTo("[data-ss-ring]", { strokeDashoffset: C }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: "[data-ss-list]", start: "top 55%", end: "bottom 55%", scrub: 0.6 } });
        gsap.utils.toArray<HTMLElement>("[data-ss-step]").forEach((step, i) => {
          ScrollTrigger.create({ trigger: step, start: "top 60%", end: "bottom 60%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) });
        });
      });
    },
    { scope: root },
  );

  // The ring's number rolls when the active step changes.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-ss-num]", { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <section ref={root} aria-labelledby="ss-title" className="bg-[#141012] px-3 py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-3 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div data-ss-head>
            <p className="inline-flex rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">How we find your funding</p>
            <h2 id="ss-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]">
              Five steps to a <span className="text-brand">lighter bill</span>
            </h2>
          </div>
          <div className="relative mt-12 hidden h-[280px] w-[280px] lg:block">
            <svg viewBox="0 0 280 280" className="h-full w-full -rotate-90" aria-hidden>
              <circle cx="140" cy="140" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="14" />
              <circle data-ss-ring cx="140" cy="140" r={R} fill="none" stroke="#F47A2A" strokeWidth="14" strokeLinecap="round" strokeDasharray={C} />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div data-ss-num>
                <p className="font-mono text-6xl font-semibold tabular-nums">{String(active + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-sm text-white/55">{steps[active].title}</p>
              </div>
            </div>
          </div>
        </div>

        <ol data-ss-list className="space-y-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-ss-step
              className={`rounded-[24px] border p-7 transition-all duration-500 lg:min-h-[220px] ${
                i === active ? "border-brand/60 bg-white/[0.07] lg:translate-x-2" : "border-white/10 bg-white/[0.02] lg:opacity-50"
              }`}
            >
              <p className="font-mono text-sm text-brand">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-md text-base leading-relaxed text-white/65">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
