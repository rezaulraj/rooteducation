"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Visa stamps that land across the open passport, as [left %, top %, rotation] over the spread.
const stamps = [
  { country: "United Kingdom", code: "GBR", color: "#C8102E", shape: "rounded-[14px]", pos: [6, 10, -12] },
  { country: "Malta", code: "MLT", color: "#2F7A56", shape: "rounded-full", pos: [28, 52, 9] },
  { country: "Romania", code: "ROU", color: "#002B7F", shape: "rounded-[6px]", pos: [6, 60, 6] },
  { country: "Hungary", code: "HUN", color: "#477050", shape: "rounded-full", pos: [27, 8, -6] },
  { country: "Cyprus", code: "CYP", color: "#D57800", shape: "rounded-[14px]", pos: [56, 66, -9] },
  { country: "Greece", code: "GRC", color: "#0D5EAF", shape: "rounded-full", pos: [80, 64, 12] },
];

function Lines({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span aria-hidden className="block space-y-1.5">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`block h-1 rounded-full ${dark ? "bg-ink/15" : "bg-ink/10"}`} style={{ width: `${90 - ((i * 23) % 40)}%` }} />
      ))}
    </span>
  );
}

export default function VisaHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");

        gsap
          .timeline({ delay: 0.25, defaults: { ease: "expo.out" } })
          .fromTo("[data-vh-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0)
          .fromTo("[data-vh-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.45)
          .fromTo("[data-vh-book]", { y: 120, rotationX: 40, rotationZ: -8, autoAlpha: 0 }, { y: 0, rotationX: 18, rotationZ: -6, autoAlpha: 1, duration: 1.6 }, 0.2);

        // The closed passport floats while it waits.
        gsap.to("[data-vh-float]", { y: -14, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: section, pin: true, start: "top top", end: "+=260%", scrub: 0.8 },
        });

        // 1. The book straightens, slides over and its cover swings open on the spine.
        tl.to("[data-vh-book]", { rotationX: 0, rotationZ: 0, duration: 0.6 }, 0)
          .fromTo("[data-vh-shift]", { xPercent: -25 }, { xPercent: 0, duration: 0.9 }, 0.2)
          .fromTo("[data-vh-cover]", { rotationY: 0 }, { rotationY: -180, duration: 0.9 }, 0.2)
          .fromTo("[data-vh-photo]", { scale: 1.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, 0.8)
          .fromTo("[data-vh-data]", { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3, stagger: 0.06, ease: "power3.out" }, 0.85);

        // 2. Each country's visa stamp slams down, and the passport jolts with it.
        stamps.forEach((_, i) => {
          const at = 1.25 + i * 0.22;
          tl.fromTo(`[data-vh-stamp='${i}']`, { scale: 2.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.14, ease: "power4.in" }, at).fromTo(
            "[data-vh-jolt]",
            { y: 0 },
            { y: 6, duration: 0.04, ease: "power1.out", yoyo: true, repeat: 1 },
            at + 0.14,
          );
        });

        // 3. The final verdict.
        tl.fromTo("[data-vh-approved]", { scale: 3.5, rotation: -30, autoAlpha: 0 }, { scale: 1, rotation: -14, autoAlpha: 1, duration: 0.2, ease: "power4.in" }, 2.7)
          .fromTo("[data-vh-jolt]", { y: 0 }, { y: 10, duration: 0.05, yoyo: true, repeat: 1 }, 2.9)
          .fromTo("[data-vh-glow]", { scale: 0.6, autoAlpha: 0 }, { scale: 1.2, autoAlpha: 1, duration: 0.5 }, 2.75)
          .to({}, { duration: 0.3 });

        return () => section.classList.remove("pinned");
      });

      // Reduced motion: the passport already open and stamped.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-vh-cover]", { rotationY: -180 });
        gsap.set("[data-vh-stamp], [data-vh-approved]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/vh overflow-hidden bg-white px-3 pt-3">
      <section
        aria-labelledby="vh-title"
        className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(110%_90%_at_75%_40%,#2E1E1C_0%,#171112_60%,#100C0D_100%)] text-white group-[.pinned]/vh:h-[calc(100svh-24px)] lg:min-h-[calc(100svh-24px)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-radial-gradient(circle_at_75%_45%,transparent_0,transparent_38px,rgba(244,122,42,0.22)_39px,transparent_40px)]" />
        <div data-vh-glow aria-hidden className="invisible pointer-events-none absolute right-[8%] top-1/2 h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full bg-[#2F7A56]/30 blur-[100px]" />

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 pb-14 pt-28 lg:grid-cols-[0.85fr_1.15fr] lg:pb-10">
          <div className="relative z-10">
            <p data-vh-fade className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand sm:text-sm">
              <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Visa guidance
            </p>
            <h1 id="vh-title" className="mt-4 text-[clamp(2.4rem,5.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              {["Your passport", "to studying", "abroad"].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <span data-vh-line className={`block ${i === 2 ? "text-brand" : ""}`}>{l}</span>
                </span>
              ))}
            </h1>
            <p data-vh-fade className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-lg">
              Step-by-step support with your student visa: the right documents, a strong application and confident interview preparation.
            </p>
            <div data-vh-fade className="mt-7">
              <Link href="/consultation" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Get visa ready
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* The passport */}
          <div aria-hidden className="flex justify-center [perspective:1600px]">
            <div data-vh-book className="[transform-style:preserve-3d]">
              <div data-vh-float className="[transform-style:preserve-3d]">
                <div data-vh-jolt className="[transform-style:preserve-3d]">
                  <div data-vh-shift className="relative flex [--pw:clamp(150px,22vw,300px)] [transform-style:preserve-3d]">
                    {/* Left page: the inside of the cover lands here */}
                    <div className="h-[calc(var(--pw)*1.38)] w-[var(--pw)]" />

                    {/* Right page: the data page */}
                    <div className="relative h-[calc(var(--pw)*1.38)] w-[var(--pw)] overflow-hidden rounded-r-2xl bg-[linear-gradient(160deg,#FFF8F1,#F6E6D6)] p-[calc(var(--pw)*0.07)] text-ink shadow-[0_40px_60px_-30px_rgba(0,0,0,0.9)]">
                      <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(135deg,transparent_0_9px,rgba(244,122,42,0.12)_9px_10px)]" />
                      <p className="relative text-[calc(var(--pw)*0.04)] font-bold uppercase tracking-[0.2em] text-brand">Student · Passport</p>
                      <div className="relative mt-[calc(var(--pw)*0.06)] flex gap-[calc(var(--pw)*0.06)]">
                        <div data-vh-photo className="relative h-[calc(var(--pw)*0.5)] w-[calc(var(--pw)*0.4)] shrink-0 overflow-hidden rounded-lg bg-[linear-gradient(170deg,#FFE3CC,#F7924F)]">
                          <Image src="/centerstudent.png" alt="" fill sizes="140px" className="object-cover object-[50%_15%]" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-[calc(var(--pw)*0.04)]">
                          {["Surname", "Given names", "Nationality", "Purpose"].map((l, i) => (
                            <div key={l} data-vh-data>
                              <p className="text-[calc(var(--pw)*0.03)] font-semibold uppercase tracking-[0.15em] text-ink/40">{l}</p>
                              <p className="truncate text-[calc(var(--pw)*0.045)] font-semibold">{["Student", "Future graduate", "Yours", "Study"][i]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div data-vh-data className="relative mt-[calc(var(--pw)*0.08)]">
                        <Lines n={3} dark />
                      </div>
                      <p data-vh-data className="absolute inset-x-[calc(var(--pw)*0.07)] bottom-[calc(var(--pw)*0.06)] truncate font-mono text-[calc(var(--pw)*0.034)] tracking-[0.1em] text-ink/45">
                        P&lt;ROOT&lt;&lt;STUDY&lt;ABROAD&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                      </p>
                    </div>

                    {/* Cover: hinged on the spine, swings over to the left */}
                    <div data-vh-cover className="absolute left-1/2 top-0 h-full w-[var(--pw)] origin-left [transform-style:preserve-3d]">
                      <div className="absolute inset-0 flex flex-col items-center justify-between rounded-r-2xl bg-[linear-gradient(150deg,#2A2023,#120D0E)] px-4 py-[calc(var(--pw)*0.14)] text-center shadow-[0_40px_60px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 [backface-visibility:hidden]">
                        <p className="text-[calc(var(--pw)*0.07)] font-semibold uppercase tracking-[0.3em] text-brand">Passport</p>
                        <svg viewBox="0 0 64 64" className="h-[calc(var(--pw)*0.36)] w-[calc(var(--pw)*0.36)] text-brand" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <circle cx="32" cy="32" r="28" />
                          <ellipse cx="32" cy="32" rx="12" ry="28" />
                          <path d="M4 32h56M8 18h48M8 46h48" />
                        </svg>
                        <p className="text-[calc(var(--pw)*0.045)] font-semibold uppercase tracking-[0.25em] text-brand/80">Root Education</p>
                      </div>
                      <div className="absolute inset-0 rounded-l-2xl bg-[linear-gradient(200deg,#FFF8F1,#F2DFCB)] p-[calc(var(--pw)*0.08)] text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="absolute inset-0 rounded-l-2xl opacity-40 [background-image:repeating-linear-gradient(45deg,transparent_0_9px,rgba(244,122,42,0.12)_9px_10px)]" />
                        <p className="relative text-[calc(var(--pw)*0.04)] font-bold uppercase tracking-[0.2em] text-ink/40">Visas</p>
                      </div>
                    </div>

                    {/* Stamps across the open spread */}
                    {stamps.map((s, i) => (
                      <div key={s.code} className="absolute" style={{ left: `${s.pos[0]}%`, top: `${s.pos[1]}%`, transform: `rotate(${s.pos[2]}deg)` }}>
                        <div
                          data-vh-stamp={i}
                          className={`invisible grid place-items-center border-[3px] px-[calc(var(--pw)*0.04)] py-[calc(var(--pw)*0.025)] text-center font-mono font-bold uppercase leading-tight opacity-85 mix-blend-multiply ${s.shape}`}
                          style={{ borderColor: s.color, color: s.color }}
                        >
                          <span className="block text-[calc(var(--pw)*0.065)] tracking-[0.12em]">{s.code}</span>
                          <span className="block text-[calc(var(--pw)*0.03)] tracking-[0.1em]">Student visa</span>
                        </div>
                      </div>
                    ))}
                    <div className="absolute left-[9%] top-[33%] rotate-[-14deg]">
                      <p
                        data-vh-approved
                        className="invisible rounded-xl border-4 border-[#2F7A56] bg-[#FFF8F1]/70 px-[calc(var(--pw)*0.06)] py-[calc(var(--pw)*0.03)] text-center font-mono text-[calc(var(--pw)*0.09)] font-bold uppercase leading-none tracking-[0.12em] text-[#2F7A56]"
                      >
                        Approved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
