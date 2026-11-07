"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  { title: "Initial consultation", icon: "compass", copy: "A personal assessment of your goals, preferences and academic background, so every recommendation is tailored to you." },
  { title: "Shortlisting universities", icon: "university", copy: "A curated selection of universities that fits your aspirations, budget and academic interests." },
  { title: "Application assistance", icon: "document", copy: "Hands-on help preparing applications, from document reviews and personal statements to submission." },
  { title: "Offer acceptance", icon: "scholarship", copy: "Guidance on comparing offers, understanding their conditions and accepting with confidence." },
  { title: "Final decision support", icon: "passport", copy: "Help weighing your options so you choose the university that fits you best." },
  { title: "Pre-departure preparation", icon: "plane", copy: "Support with visas, accommodation and travel planning, for a smooth move abroad." },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function UniversityProcess() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-up-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });

        // The route fills as you scroll, with a plane riding its tip.
        const route = { trigger: "[data-up-route]", start: "top 60%", end: "bottom 60%", scrub: 0.6 };
        gsap.fromTo("[data-up-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: route });
        gsap.fromTo("[data-up-plane]", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: route });

        // Each stop lights up as the plane reaches it, and its card swings in from its side.
        gsap.utils.toArray<HTMLElement>("[data-up-step]").forEach((step, i) => {
          const side = i % 2 ? 1 : -1;
          gsap
            .timeline({ scrollTrigger: { trigger: step, start: "top 62%", toggleActions: "play none none reverse" } })
            .fromTo(step.querySelector("[data-up-dot]"), { scale: 0.4, backgroundColor: "#FFFFFF" }, { scale: 1, backgroundColor: "#F47A2A", duration: 0.5, ease: "back.out(3)" })
            .fromTo(step.querySelector("[data-up-card]"), { x: side * 80, rotation: side * 4, autoAlpha: 0 }, { x: 0, rotation: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out" }, 0)
            .fromTo(step.querySelector("[data-up-num]"), { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "expo.out" }, 0.1);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="up-title" className="overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-3">
        <div data-up-head className="text-center">
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">University selection process</p>
          <h2 id="up-title" className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Our step-by-step <span className="text-brand">selection process</span>
          </h2>
        </div>

        <ol data-up-route className="relative mt-16">
          {/* The route */}
          <span aria-hidden className="absolute bottom-6 left-6 top-6 w-[3px] -translate-x-1/2 rounded-full bg-ink/10 md:left-1/2">
            <span data-up-fill className="absolute inset-0 origin-top rounded-full bg-brand" />
            <span data-up-plane className="absolute left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-white shadow-[0_10px_24px_-8px_rgba(20,16,18,0.6)]">
              <Icon name="plane" className="h-5 w-5 rotate-90" />
            </span>
          </span>

          {steps.map((s, i) => (
            <li key={s.title} data-up-step className="relative grid pb-10 pl-16 last:pb-0 md:grid-cols-2 md:gap-20 md:pl-0">
              <span data-up-dot aria-hidden className="absolute left-6 top-7 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-brand bg-brand md:left-1/2" />
              <article
                data-up-card
                className={`group relative overflow-hidden rounded-[24px] border border-ink/10 bg-[#FBF7F2] p-6 transition-colors duration-300 hover:border-brand/40 hover:bg-white sm:p-7 ${i % 2 ? "md:col-start-2" : "md:text-right"}`}
              >
                <span aria-hidden className={`absolute -top-3 select-none overflow-hidden text-[6rem] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(244,122,42,0.25)] ${i % 2 ? "right-4" : "right-4 md:left-4 md:right-auto"}`}>
                  <span data-up-num className="block">{pad(i + 1)}</span>
                </span>
                <div className={`relative flex items-center gap-3 ${i % 2 ? "" : "md:flex-row-reverse"}`}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Step {pad(i + 1)}</span>
                </div>
                <h3 className="relative mt-5 text-2xl font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink/65">{s.copy}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
