"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const types = [
  { title: "Merit scholarships", icon: "scholarship", copy: "Awards for strong grades, test scores or achievements, from universities and foundations.", tone: "bg-[#141012] text-white", muted: "text-white/60" },
  { title: "Need-based grants", icon: "compass", copy: "Funding for students who need financial support to make studying abroad possible.", tone: "bg-[linear-gradient(150deg,#F7924F,#D9561A)] text-white", muted: "text-white/80" },
  { title: "University bursaries", icon: "university", copy: "Fee reductions and bursaries offered directly by the universities you apply to.", tone: "bg-[#FBF1E7] text-ink", muted: "text-ink/65" },
  { title: "Government scholarships", icon: "passport", copy: "National and international programmes that fund students studying overseas.", tone: "bg-[linear-gradient(150deg,#FFF0E3,#FFC79E)] text-ink", muted: "text-ink/65" },
  { title: "Education loans", icon: "document", copy: "Guidance on comparing loan options and preparing the paperwork lenders ask for.", tone: "bg-[#E6F2EB] text-ink", muted: "text-ink/65" },
  { title: "Budget planning", icon: "plane", copy: "A clear plan for tuition, rent and living costs, including part-time work rules.", tone: "bg-[#141012] text-white", muted: "text-white/60" },
];

export default function ScholarshipTypes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-st-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });

        // Each card's coin spins in as the card flips up, like a coin being tossed onto the table.
        gsap.utils.toArray<HTMLElement>("[data-st-card]").forEach((card, i) => {
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" } })
            .fromTo(card, { rotationX: -60, y: 70, autoAlpha: 0, transformOrigin: "50% 100%" }, { rotationX: 0, y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", delay: (i % 3) * 0.1 })
            .fromTo(card.querySelector("[data-st-coin]"), { rotationY: 0, y: -90, autoAlpha: 0 }, { rotationY: 1080, y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.15);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="st-title" className="overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-st-head className="text-center">
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">Funding we help with</p>
          <h2 id="st-title" className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Every way to <span className="text-brand">fund your studies</span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t) => (
            <li key={t.title} data-st-card className={`group relative overflow-hidden rounded-[28px] p-7 sm:p-8 ${t.tone}`}>
              <span
                data-st-coin
                className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#C9773F] bg-[radial-gradient(circle_at_35%_30%,#FFE2A8,#F2A65A_60%,#D9841F)] text-[#5A2A0A] shadow-[0_10px_20px_-8px_rgba(120,60,10,0.6)] transition-transform duration-700 group-hover:[transform:rotateY(360deg)]"
              >
                <Icon name={t.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{t.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>{t.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
