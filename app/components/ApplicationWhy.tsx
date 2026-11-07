"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reasons = [
  { title: "Expert guidance", icon: "compass", copy: "Tailored advice from experienced counsellors to strengthen your application." },
  { title: "Comprehensive support", icon: "document", copy: "Help with every detail, for a smooth application from start to finish." },
  { title: "Personalised approach", icon: "scholarship", copy: "A strategy built around your own academic profile and goals." },
  { title: "Strong university network", icon: "university", copy: "Connections with universities that open up opportunities and insight." },
];
const checklist = ["Academic transcripts", "Personal statement", "Recommendation letters", "CV", "English test scores", "Passport copy"];

export default function ApplicationWhy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-aw-copy] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });

        // Scrolling works through the checklist: each item ticks, the bar fills, then the stamp lands.
        const progress = { v: 0 };
        const label = root.current!.querySelector<HTMLElement>("[data-aw-pct]")!;
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-aw-form]", start: "top 75%", end: "bottom 45%", scrub: 0.6 } });
        tl.fromTo("[data-aw-form]", { rotation: -4, y: 40 }, { rotation: 0, y: 0, duration: 0.6, ease: "power2.out" }, 0);
        gsap.utils.toArray<HTMLElement>("[data-aw-item]").forEach((item, i) => {
          tl.fromTo(item.querySelector("[data-aw-box]"), { backgroundColor: "rgba(20,16,18,0.06)" }, { backgroundColor: "#F47A2A", duration: 0.2 }, 0.4 + i * 0.3)
            .fromTo(item.querySelector("[data-aw-tick]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2 }, 0.45 + i * 0.3)
            .fromTo(item.querySelector("[data-aw-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.25 }, 0.45 + i * 0.3);
        });
        tl.fromTo("[data-aw-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "none" }, 0.4)
          .fromTo(progress, { v: 0 }, { v: 100, duration: 1.8, ease: "none", onUpdate: () => (label.textContent = `${Math.round(progress.v)}%`) }, 0.4)
          .fromTo("[data-aw-stamp]", { scale: 2.6, autoAlpha: 0, rotation: -24 }, { scale: 1, autoAlpha: 1, rotation: -12, duration: 0.25, ease: "power4.in" }, 2.3);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="aw-title" className="overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-3 lg:grid-cols-2 lg:gap-16">
        {/* The application, filling itself in */}
        <div className="relative rounded-[32px] bg-[radial-gradient(110%_90%_at_30%_20%,#FFE3CC_0%,#FFC79E_55%,#F7924F_100%)] p-6 sm:p-10">
          <div data-aw-form className="relative rounded-[24px] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(90,40,10,0.7)] sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/45">Application</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-ink">Ready to submit</p>
              </div>
              <span data-aw-pct className="font-mono text-2xl font-semibold tabular-nums text-brand">100%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10">
              <div data-aw-bar className="h-full origin-left rounded-full bg-brand" />
            </div>
            <ul className="mt-6 space-y-3.5">
              {checklist.map((c) => (
                <li key={c} data-aw-item className="flex items-center gap-3">
                  <span data-aw-box className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand">
                    <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path data-aw-tick d="M2.5 6.2 5 8.5l4.5-5" pathLength={1} strokeDasharray="1" />
                    </svg>
                  </span>
                  <span className="relative text-sm font-medium text-ink/80">
                    {c}
                    <span data-aw-line aria-hidden className="absolute inset-x-0 top-1/2 h-px origin-left bg-ink/30" />
                  </span>
                </li>
              ))}
            </ul>
            <p data-aw-stamp aria-hidden className="absolute bottom-6 right-6 rotate-[-12deg] rounded-xl border-[3px] border-[#2F7A56] px-3 py-1.5 text-center font-mono text-xs font-bold uppercase leading-tight tracking-[0.14em] text-[#2F7A56]">
              Submitted
              <br />
              on time
            </p>
          </div>
        </div>

        <div data-aw-copy>
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">Why choose us</p>
          <h2 id="aw-title" className="mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Applications that are <span className="text-brand">complete, competitive and on time.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/65">
            Expert guidance, personal support and a clear process, so you meet every deadline and send strong applications to the universities you want.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.title} className="group flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-white transition-colors duration-300 group-hover:bg-brand">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-ink">{r.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/60">{r.copy}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/consultation" className="group mt-9 inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
            Book a consultation
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
