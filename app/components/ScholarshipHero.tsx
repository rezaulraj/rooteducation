"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// An illustrative bill, not a quote: costs on top, then the savings we help find.
const costs = [
  { label: "Tuition fees", amount: 12000 },
  { label: "Accommodation", amount: 5400 },
  { label: "Living costs", amount: 3600 },
];
const savings = [
  { label: "Merit scholarship", amount: 6000 },
  { label: "University bursary", amount: 2500 },
  { label: "Early-payment discount", amount: 900 },
];
const TOTAL = costs.reduce((a, c) => a + c.amount, 0);
const SAVED = savings.reduce((a, c) => a + c.amount, 0);
const fmt = (n: number) => `€${Math.round(n).toLocaleString("en-GB")}`;

// Coins drifting up behind the receipt, as [left %, size px, delay].
const coins: [number, number, number][] = [
  [6, 34, 0], [18, 22, 1.4], [30, 28, 0.6], [62, 24, 2.1], [74, 36, 0.9], [88, 26, 1.8], [46, 20, 2.6], [94, 30, 0.3],
];

export default function ScholarshipHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const totalEl = section.querySelector<HTMLElement>("[data-sh-total]")!;
      const savedEl = section.querySelector<HTMLElement>("[data-sh-saved]")!;
      const show = (t: number, s: number) => {
        totalEl.textContent = fmt(t);
        savedEl.textContent = fmt(s);
      };

      gsap.utils.toArray<HTMLElement>("[data-sh-coin]").forEach((c) => {
        gsap.fromTo(
          c,
          { y: "110vh", rotationY: 0 },
          { y: "-20vh", rotationY: 720, duration: 9 + Number(c.dataset.size) / 6, ease: "none", repeat: -1, delay: Number(c.dataset.delay) },
        );
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        if (desktop) section.classList.add("pinned");

        gsap
          .timeline({ delay: 0.25, defaults: { ease: "expo.out" } })
          .fromTo("[data-sh-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0)
          .fromTo("[data-sh-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.45)
          // The receipt prints out of the slot.
          .fromTo("[data-sh-paper]", { yPercent: -100 }, { yPercent: 0, duration: 1.6, ease: "power2.out" }, 0.4);

        const counter = { s: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          // Desktop pins the hero; on phones the receipt is taller than the screen, so it plays as you scroll past it.
          scrollTrigger: desktop
            ? { trigger: section, pin: true, start: "top top", end: "+=240%", scrub: 0.7 }
            : { trigger: "[data-sh-receipt]", start: "top 75%", end: "bottom 60%", scrub: 0.7 },
        });

        // Each saving is "clipped" onto the bill: it slides in, the total drops, the old figure is struck through.
        savings.forEach((s, i) => {
          const at = i * 0.5;
          const before = TOTAL - savings.slice(0, i).reduce((a, x) => a + x.amount, 0);
          tl.fromTo(`[data-sh-save='${i}']`, { x: 70, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3 }, at)
            .fromTo(`[data-sh-tick='${i}']`, { scale: 0 }, { scale: 1, duration: 0.15, ease: "back.out(3)" }, at + 0.2)
            // Chained .to tweens on one counter, so scrubbing back always lands on the true starting value.
            .to(counter, { s: TOTAL - before + s.amount, duration: 0.4, ease: "none", onUpdate: () => show(TOTAL - counter.s, counter.s) }, at + 0.1);
        });
        tl.fromTo("[data-sh-bar]", { scaleX: 1 }, { scaleX: (TOTAL - SAVED) / TOTAL, duration: 1.5, ease: "none" }, 0.1)
          .fromTo("[data-sh-strike]", { scaleX: 0 }, { scaleX: 1, duration: 0.2, stagger: 0.08 }, 1.45)
          .fromTo("[data-sh-stamp]", { scale: 3, rotation: -30, autoAlpha: 0 }, { scale: 1, rotation: -12, autoAlpha: 1, duration: 0.2, ease: "power4.in" }, 1.7)
          .fromTo("[data-sh-receipt]", { y: 0 }, { y: 8, duration: 0.05, yoyo: true, repeat: 1 }, 1.9)
          .fromTo("[data-sh-burst]", { scale: 0.4, autoAlpha: 0 }, { scale: 1.3, autoAlpha: 1, duration: 0.5 }, 1.75)
          .to({}, { duration: 0.3 });
        show(TOTAL, 0);

        // The receipt tilts a touch with the cursor.
        const tilt = gsap.quickTo("[data-sh-receipt]", "rotation", { duration: 1, ease: "power3.out" });
        const move = (e: PointerEvent) => tilt((e.clientX / window.innerWidth - 0.5) * 6);
        window.addEventListener("pointermove", move, { passive: true });
        return () => {
          window.removeEventListener("pointermove", move);
          section.classList.remove("pinned");
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        show(TOTAL - SAVED, SAVED);
        gsap.set("[data-sh-save], [data-sh-stamp]", { autoAlpha: 1 });
        gsap.set("[data-sh-strike]", { scaleX: 1 });
        gsap.set("[data-sh-bar]", { scaleX: (TOTAL - SAVED) / TOTAL });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/sh overflow-hidden bg-white px-3 pt-3">
      <section
        aria-labelledby="sh-title"
        className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(110%_90%_at_72%_40%,#FFF8EE_0%,#FFE2C2_55%,#FFC58E_100%)] group-[.pinned]/sh:h-[calc(100svh-24px)] lg:min-h-[calc(100svh-24px)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 [perspective:600px]">
          {coins.map(([left, size, delay], i) => (
            <span
              key={i}
              data-sh-coin
              data-size={size}
              data-delay={delay}
              className="absolute top-0 grid place-items-center rounded-full border-2 border-[#C9773F] bg-[radial-gradient(circle_at_35%_30%,#FFE2A8,#F2A65A_60%,#D9841F)] text-[0.6rem] font-bold text-[#8A4A12] opacity-70 shadow-[0_6px_14px_-6px_rgba(120,60,10,0.6)]"
              style={{ left: `${left}%`, width: size, height: size }}
            >
              €
            </span>
          ))}
        </div>
        <div data-sh-burst aria-hidden className="invisible pointer-events-none absolute right-[14%] top-1/2 h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full bg-[#7FB59C]/40 blur-[90px]" />

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 pb-14 pt-28 lg:grid-cols-[1fr_0.9fr] lg:pb-10">
          <div className="relative z-10">
            <p data-sh-fade className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand sm:text-sm">
              <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Scholarship &amp; financial aid
            </p>
            <h1 id="sh-title" className="mt-4 text-[clamp(2.4rem,5.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
              {["Study abroad,", "for less than", "you think"].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <span data-sh-line className={`block ${i === 2 ? "text-brand" : ""}`}>{l}</span>
                </span>
              ))}
            </h1>
            <p data-sh-fade className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-lg">
              We find the scholarships, grants and funding you qualify for, and help you apply, so the cost of studying abroad comes down.
            </p>
            <div data-sh-fade className="mt-7">
              <Link href="/consultation" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
                Find my funding
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* The bill */}
          <div className="flex justify-center">
            <div data-sh-receipt className="relative w-full max-w-[400px]">
              {/* Printer slot */}
              <div aria-hidden className="relative z-10 mx-auto h-5 w-[108%] -translate-x-[3.7%] rounded-full bg-ink shadow-[0_10px_20px_-8px_rgba(20,16,18,0.6)]" />
              <div className="-mt-2.5 overflow-hidden px-3">
                <div
                  data-sh-paper
                  className="relative bg-white px-6 pb-10 pt-8 text-ink shadow-[0_30px_50px_-30px_rgba(120,60,20,0.7)] [mask-image:linear-gradient(#000,#000),radial-gradient(circle_8px_at_50%_100%,transparent_96%,#000)] sm:px-7"
                  style={{
                    WebkitMaskImage: "radial-gradient(circle at 10px 100%, transparent 7px, #000 7.5px)",
                    WebkitMaskSize: "20px 100%",
                    maskImage: "radial-gradient(circle at 10px 100%, transparent 7px, #000 7.5px)",
                    maskSize: "20px 100%",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">Your study budget</p>
                    <p className="font-mono text-[0.65rem] text-ink/40">Example · 1 year</p>
                  </div>
                  <div className="my-4 border-t border-dashed border-ink/20" />
                  <ul className="space-y-2.5 font-mono text-sm">
                    {costs.map((c) => (
                      <li key={c.label} className="flex justify-between">
                        <span className="relative text-ink/70">
                          {c.label}
                          <span data-sh-strike aria-hidden className="absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-ink/50" />
                        </span>
                        <span>{fmt(c.amount)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="my-4 border-t border-dashed border-ink/20" />
                  <ul className="space-y-2.5 font-mono text-[0.72rem] sm:text-sm">
                    {savings.map((s, i) => (
                      <li key={s.label} data-sh-save={i} className="invisible flex items-center justify-between rounded-lg bg-[#E6F2EB] px-2 py-1.5 text-[#2F7A56]">
                        <span className="flex items-center gap-2">
                          <span data-sh-tick={i} className="grid h-4 w-4 place-items-center rounded-full bg-[#2F7A56] text-white">
                            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M2.5 6.2 5 8.5l4.5-5" />
                            </svg>
                          </span>
                          {s.label}
                        </span>
                        <span className="whitespace-nowrap">−{fmt(s.amount)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="my-4 border-t-2 border-ink" />
                  <div className="flex items-end justify-between">
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-[0.2em] text-ink/50">You pay</span>
                      <span className="mt-1 block font-mono text-[0.7rem] text-[#2F7A56]">
                        Saved <span data-sh-saved>{fmt(SAVED)}</span>
                      </span>
                    </span>
                    <span data-sh-total className="font-mono text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
                      {fmt(TOTAL - SAVED)}
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10">
                    <div data-sh-bar className="h-full origin-left rounded-full bg-brand" />
                  </div>
                  <p
                    data-sh-stamp
                    aria-hidden
                    className="invisible absolute left-[38%] top-[4.6rem] rotate-[-12deg] rounded-xl border-[3px] border-[#2F7A56] px-3 py-1.5 font-mono text-lg font-bold uppercase tracking-[0.14em] text-[#2F7A56]"
                  >
                    Funded
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-4 left-6 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink/45 lg:block">
          Illustrative figures, not a quote
        </p>
      </section>
    </div>
  );
}
