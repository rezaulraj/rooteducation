"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  { title: "Offer received", copy: "Your university offer or confirmation is the starting point for your visa." },
  { title: "Documents gathered", copy: "We work through the checklist with you and review every document." },
  { title: "Funds proven", copy: "Your financial evidence is prepared in the format the embassy expects." },
  { title: "Application filed", copy: "Forms completed, fees paid and your appointment booked." },
  { title: "Interview passed", copy: "Practised, prepared and confident on the day." },
  { title: "Visa in hand", copy: "Your visa arrives and you're ready to fly." },
];
const pad = (n: number) => String(n).padStart(2, "0");

export default function VisaJourney() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const track = section.querySelector<HTMLElement>("[data-vj-track]")!;
      const mm = gsap.matchMedia();

      // Desktop: pinned, scrolling flies the plane along a runway of six gates.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, pin: true, start: "top top", end: "+=220%", scrub: 0.7 },
        });
        tl.fromTo("[data-vj-fill]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0).fromTo("[data-vj-plane]", { left: "0%" }, { left: "100%", duration: 1 }, 0);
        gsap.utils.toArray<HTMLElement>("[data-vj-step]").forEach((step, i) => {
          const at = i / (steps.length - 1);
          tl.fromTo(step.querySelector("[data-vj-dot]"), { scale: 0.5, backgroundColor: "#2A2023" }, { scale: 1, backgroundColor: "#F47A2A", duration: 0.04 }, Math.max(0, at - 0.02))
            .fromTo(step.querySelector("[data-vj-card]"), { y: i % 2 ? -40 : 40, autoAlpha: 0.25 }, { y: 0, autoAlpha: 1, duration: 0.1, ease: "power2.out" }, Math.max(0, at - 0.06));
        });
        void track;
        return () => section.classList.remove("pinned");
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-vj-step]").forEach((step) => {
          gsap.from(step, { x: -40, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 85%" } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="vj-title" className="group/vj relative overflow-x-clip bg-[#141012] px-3 py-24 text-white lg:[&.pinned]:flex lg:[&.pinned]:h-svh lg:[&.pinned]:items-center lg:[&.pinned]:py-0">
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" />
      <div className="relative mx-auto w-full max-w-6xl px-3">
        <p className="inline-flex rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">Your visa journey</p>
        <h2 id="vj-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]">
          From offer letter <span className="text-brand">to take-off</span>
        </h2>

        <div data-vj-track className="relative mt-16 lg:mt-24">
          {/* Runway */}
          <div aria-hidden className="absolute left-0 right-0 top-1/2 hidden h-[3px] -translate-y-1/2 rounded-full bg-white/10 lg:block">
            <div data-vj-fill className="absolute inset-0 origin-left rounded-full bg-brand" />
            <div data-vj-plane className="absolute top-1/2 -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-[0_0_30px_rgba(244,122,42,0.6)]">
              <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor">
                <path d="M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z" />
              </svg>
            </div>
          </div>

          <ol className="relative grid gap-6 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => (
              <li key={s.title} data-vj-step className={`relative flex lg:h-[460px] lg:flex-col ${i % 2 ? "lg:justify-end" : "lg:justify-start"}`}>
                <span data-vj-dot aria-hidden className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#141012] bg-brand lg:block" />
                <article data-vj-card className="w-full rounded-[22px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm lg:min-h-[190px]">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">Gate {pad(i + 1)}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-tight tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.copy}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
