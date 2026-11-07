"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// What goes in the case, each with where it waits before it's packed ([left %, top %]).
const items = [
  { label: "Passport & visa", icon: "passport", tone: "bg-ink text-white", pos: [4, 8] },
  { label: "Offer letter", icon: "document", tone: "bg-white text-ink", pos: [70, 4] },
  { label: "Insurance", icon: "compass", tone: "bg-[#E6F2EB] text-[#2F7A56]", pos: [0, 54] },
  { label: "Bank card", icon: "scholarship", tone: "bg-brand text-white", pos: [76, 44] },
  { label: "Travel adapter", icon: "plane", tone: "bg-[#FFE3CC] text-ink", pos: [12, 82] },
  { label: "Accommodation", icon: "university", tone: "bg-white text-ink", pos: [66, 84] },
];

export default function DeparturePacking() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-dp-stage]")!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-dp-copy] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%" } });

        const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top 75%", end: "bottom 40%", scrub: 0.7 } });
        // Each item arcs up and drops into the open case, ticking off its line on the list.
        gsap.utils.toArray<HTMLElement>("[data-dp-item]").forEach((item, i) => {
          const at = i * 0.3;
          tl.to(
            item,
            {
              keyframes: [
                { x: () => (stage.offsetWidth * 0.5 - (item.offsetLeft + item.offsetWidth / 2)) * 0.6, y: -60, rotation: i % 2 ? 20 : -20, duration: 0.25, ease: "power1.out" },
                { x: () => stage.offsetWidth * 0.5 - (item.offsetLeft + item.offsetWidth / 2), y: () => stage.offsetHeight * 0.55 - (item.offsetTop + item.offsetHeight / 2), rotation: 0, scale: 0.4, autoAlpha: 0, duration: 0.25, ease: "power2.in" },
              ],
            },
            at,
          )
            .fromTo(`[data-dp-check='${i}']`, { scale: 0, backgroundColor: "rgba(20,16,18,0.08)" }, { scale: 1, backgroundColor: "#F47A2A", duration: 0.15, ease: "back.out(3)" }, at + 0.45)
            .fromTo("[data-dp-case]", { y: 0 }, { y: 6, duration: 0.05, yoyo: true, repeat: 1 }, at + 0.48);
        });
        // The lid swings shut and the luggage tag drops on.
        tl.fromTo("[data-dp-lid]", { rotationX: -110 }, { rotationX: 0, duration: 0.4, ease: "power2.in" }, 1.9)
          .fromTo("[data-dp-tag]", { y: -80, rotation: -40, autoAlpha: 0 }, { y: 0, rotation: 8, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" }, 2.3);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-dp-item]", { autoAlpha: 0 });
        gsap.set("[data-dp-check]", { backgroundColor: "#F47A2A" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="dp-title" className="overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-dp-copy>
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">Packing checklist</p>
          <h2 id="dp-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Nothing important <span className="text-brand">left behind</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
            We go through what to carry, what to sort out before you leave, and what can wait until you arrive.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <li key={it.label} className="flex items-center gap-3 text-sm font-medium text-ink/80">
                <span data-dp-check={i} className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand text-white">
                  <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M2.5 6.2 5 8.5l4.5-5" />
                  </svg>
                </span>
                {it.label}
              </li>
            ))}
          </ul>
        </div>

        <div data-dp-stage aria-hidden className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,#FFE3CC_0%,transparent_70%)]" />
          {/* Suitcase */}
          <div data-dp-case className="absolute left-1/2 top-[38%] w-[56%] -translate-x-1/2 [perspective:900px]">
            <div className="mx-auto h-6 w-[34%] rounded-t-2xl border-[6px] border-b-0 border-ink" />
            <div data-dp-lid className="relative z-10 h-[clamp(40px,7vw,64px)] origin-bottom rounded-t-[22px] bg-[linear-gradient(180deg,#F7924F,#D9561A)] shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)] [transform:rotateX(-110deg)]" />
            <div className="relative h-[clamp(120px,20vw,190px)] overflow-hidden rounded-b-[22px] bg-[linear-gradient(180deg,#E8702E,#B8501C)] shadow-[0_40px_60px_-30px_rgba(90,30,0,0.8)]">
              <div className="absolute inset-x-[18%] inset-y-0 border-x-[6px] border-[#9C4416]/40" />
              <div className="absolute inset-x-0 top-[40%] h-3 bg-[#9C4416]/40" />
            </div>
            <div className="mt-1 flex justify-between px-[12%]">
              <span className="h-4 w-4 rounded-full bg-ink" />
              <span className="h-4 w-4 rounded-full bg-ink" />
            </div>
            <div data-dp-tag className="invisible absolute -right-10 top-[48%] z-20 origin-top rounded-xl bg-white px-3 py-2 shadow-[0_14px_24px_-12px_rgba(20,16,18,0.6)]">
              <span className="block font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand">Ready</span>
              <span className="block text-sm font-semibold text-ink">to fly</span>
            </div>
          </div>

          {items.map((it) => (
            <div
              key={it.label}
              data-dp-item
              className={`absolute flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold shadow-[0_14px_30px_-14px_rgba(90,40,10,0.6)] sm:text-sm ${it.tone}`}
              style={{ left: `${it.pos[0]}%`, top: `${it.pos[1]}%` }}
            >
              <Icon name={it.icon} className="h-4 w-4" />
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
