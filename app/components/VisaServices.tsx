"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const items = [
  { title: "Eligibility check", icon: "compass", copy: "We confirm which visa you need and what you must show before you start." },
  { title: "Document checklist", icon: "document", copy: "A tailored list of every document, so nothing is missing or out of date." },
  { title: "Financial evidence", icon: "scholarship", copy: "Guidance on proving funds the way each embassy expects to see them." },
  { title: "Application filing", icon: "passport", copy: "Help completing forms accurately and booking your appointment on time." },
  { title: "Interview preparation", icon: "university", copy: "Mock interviews with honest feedback, so you walk in calm and ready." },
  { title: "Pre-travel support", icon: "plane", copy: "What to do once your visa arrives, from entry rules to your first week." },
];

export default function VisaServices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-vs-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });

        // Each card is "scanned": a light bar sweeps down it as it rises, then its stamp-icon lands.
        gsap.utils.toArray<HTMLElement>("[data-vs-card]").forEach((card, i) => {
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" } })
            .fromTo(card, { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", delay: (i % 3) * 0.08 })
            .fromTo(card.querySelector("[data-vs-scan]"), { top: "-10%", autoAlpha: 1 }, { top: "110%", autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, 0.15)
            .fromTo(card.querySelector("[data-vs-icon]"), { scale: 2.4, rotation: -25, autoAlpha: 0 }, { scale: 1, rotation: -6, autoAlpha: 1, duration: 0.3, ease: "power4.in" }, 0.55);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="vs-title" className="bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-vs-head className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">What we cover</p>
            <h2 id="vs-title" className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
              Every step of your <span className="text-brand">student visa</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/60">Visa rules differ by country and change often. We keep you on the right side of them.</p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <li
              key={it.title}
              data-vs-card
              className="group relative overflow-hidden rounded-[24px] border border-ink/10 bg-[#FBF7F2] p-7 transition-colors duration-300 hover:bg-white"
            >
              <span data-vs-scan aria-hidden className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-brand/25 to-transparent" />
              <div className="flex items-start justify-between">
                <span
                  data-vs-icon
                  className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-dashed border-brand text-brand transition-transform duration-300 group-hover:rotate-6"
                >
                  <Icon name={it.icon} className="h-6 w-6" />
                </span>
                <span className="font-mono text-sm text-ink/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-tight text-ink">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{it.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
