"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const RINGS = 13;
const TILES = 36;
// Tiles fill in a scattered order so the grid "grows" rather than wipes.
const tileOrder = Array.from({ length: TILES }, (_, i) => (i * 17 + 5) % TILES);
const avatars = [
  { initials: "AR", bg: "#F47A2A" },
  { initials: "SN", bg: "#FFC79E" },
  { initials: "MK", bg: "#7FB59C" },
  { initials: "LT", bg: "#F6E2CF" },
  { initials: "JD", bg: "#E09A66" },
];

/** A number whose digits roll into place like an odometer. */
function Roll({ value }: { value: string }) {
  return (
    <span className="inline-flex tabular-nums" aria-label={value}>
      {value.split("").map((ch, i) => {
        const d = Number(ch);
        if (Number.isNaN(d)) {
          return (
            <span key={i} aria-hidden>
              {ch}
            </span>
          );
        }
        // Two runs of 0–9; land in the second so every digit spins at least once.
        const land = ((10 + d) / 20) * 100;
        return (
          <span key={i} aria-hidden className="inline-block h-[1em] overflow-hidden leading-none">
            <span data-roll data-land={land} className="flex flex-col" style={{ transform: `translateY(-${land}%)` }}>
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n} className="block h-[1em]">
                  {n % 10}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  // A soft spotlight follows the pointer across the card.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      data-card
      onPointerMove={onMove}
      className={`group relative isolate overflow-hidden rounded-[28px] p-7 sm:p-9 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.16), transparent 60%)" }}
      />
      {children}
    </div>
  );
}

function Label({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`mt-3 text-sm font-medium uppercase tracking-[0.18em] ${tone === "light" ? "text-white/65" : "text-ink/55"}`}>
      {children}
    </p>
  );
}

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root.current, start: "top 70%", toggleActions: "play none none reverse" },
        });

        tl.from("[data-stats-head] > *", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.1 })
          .fromTo(
            "[data-card]",
            { clipPath: "inset(100% 0% 0% 0% round 28px)", y: 60 },
            { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" },
            0.2,
          )
          .fromTo(
            "[data-roll]",
            { y: 0, yPercent: 0 },
            {
              y: 0,
              yPercent: (_: number, el: HTMLElement) => -Number(el.dataset.land),
              duration: 2,
              stagger: 0.06,
              ease: "power4.out",
            },
            0.45,
          )
          .fromTo("[data-ring]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.07, ease: "power2.out" }, 0.6)
          .fromTo("[data-tile]", { scale: 0 }, { scale: 1, duration: 0.5, stagger: { each: 0.025 }, ease: "back.out(2.5)" }, 0.6)
          .fromTo("[data-avatar]", { scale: 0, x: -20 }, { scale: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "back.out(2)" }, 0.7)
          .fromTo("[data-pin]", { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(3)", transformOrigin: "50% 50%" }, 0.8);

        // The globe keeps turning slowly once it's on screen.
        gsap.to("[data-orbit]", { rotation: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to("[data-pin-pulse]", { scale: 2.4, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.3, transformOrigin: "50% 50%" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="stats-title" className="bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-stats-head className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              <span className="h-px w-10 bg-brand" />
              Our impact
            </p>
            <h2 id="stats-title" className="mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
              Rooted in <span className="text-brand">results.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/60">
            Thirteen years of turning study-abroad plans into offer letters, visas and first days on campus.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {/* Students */}
          <Card className="bg-[#141012] text-white md:col-span-7">
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/40 blur-[90px]" />
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <div className="text-[clamp(4rem,10vw,8.5rem)] font-semibold leading-none tracking-[-0.05em]">
                  <Roll value="1,000" />
                  <span className="text-brand">+</span>
                </div>
                <Label>Enrolled students</Label>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {avatars.map((a, i) => (
                    <span
                      key={a.initials}
                      data-avatar
                      className="-ml-2 grid h-12 w-12 place-items-center rounded-full text-sm font-semibold text-ink ring-4 ring-[#141012] first:ml-0"
                      style={{ background: a.bg, zIndex: i }}
                    >
                      {a.initials}
                    </span>
                  ))}
                  <span
                    data-avatar
                    className="-ml-2 grid h-12 w-12 place-items-center rounded-full bg-[#2A2023] text-[11px] font-semibold ring-4 ring-[#141012]"
                    style={{ zIndex: avatars.length }}
                  >
                    +995
                  </span>
                </div>
                <p className="max-w-[16rem] text-sm leading-snug text-white/55">Students placed across Europe and the UK.</p>
              </div>
            </div>
          </Card>

          {/* Years: one growth ring per year */}
          <Card className="bg-[linear-gradient(150deg,#FFF0E3_0%,#FFC79E_100%)] text-ink md:col-span-5">
            <div className="flex h-full items-center justify-between gap-4">
              <div>
                <div className="text-[clamp(3.6rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em]">
                  <Roll value="13" />
                </div>
                <p className="mt-1 text-2xl font-semibold tracking-tight">Years</p>
                <Label tone="dark">of experience</Label>
              </div>
              <svg viewBox="0 0 220 220" className="h-40 w-40 shrink-0 sm:h-48 sm:w-48" aria-hidden>
                {Array.from({ length: RINGS }, (_, i) => (
                  <circle
                    key={i}
                    data-ring
                    cx="110"
                    cy="110"
                    r={10 + i * 7.6}
                    fill="none"
                    stroke={i === RINGS - 1 ? "#F47A2A" : "#B8673A"}
                    strokeOpacity={i === RINGS - 1 ? 1 : 0.25 + (i / RINGS) * 0.5}
                    strokeWidth={i === RINGS - 1 ? 3 : 1.6}
                    pathLength={1}
                    strokeDasharray="1"
                    transform={`rotate(${-90 + i * 23} 110 110)`}
                  />
                ))}
                <circle cx="110" cy="110" r="4" fill="#B8673A" />
              </svg>
            </div>
          </Card>

          {/* Universities: one tile each */}
          <Card className="border border-ink/10 bg-[#FBF7F2] text-ink md:col-span-5">
            <div className="flex h-full items-center justify-between gap-6">
              <div>
                <div className="text-[clamp(3.6rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em]">
                  <Roll value="36" />
                  <span className="text-brand">+</span>
                </div>
                <Label tone="dark">Partnered universities</Label>
              </div>
              <div aria-hidden className="grid shrink-0 grid-cols-6 gap-1.5">
                {Array.from({ length: TILES }, (_, i) => (
                  <span
                    key={i}
                    data-tile
                    className={`h-4 w-4 rounded-[5px] sm:h-5 sm:w-5 ${
                      tileOrder[i] % 7 === 0 ? "bg-ink" : tileOrder[i] % 3 === 0 ? "bg-[#FFC79E]" : "bg-brand"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Branches: pins orbiting a globe */}
          <Card className="bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white md:col-span-7">
            <div className="flex h-full items-center justify-between gap-6">
              <div>
                <div className="text-[clamp(4rem,10vw,8.5rem)] font-semibold leading-none tracking-[-0.05em]">
                  <Roll value="6" />
                  <span className="text-[#141012]">+</span>
                </div>
                <Label>Branches worldwide</Label>
              </div>
              <svg viewBox="0 0 240 240" className="h-44 w-44 shrink-0 sm:h-56 sm:w-56" aria-hidden>
                <circle cx="120" cy="120" r="70" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                <ellipse cx="120" cy="120" rx="30" ry="70" fill="none" stroke="rgba(255,255,255,0.35)" />
                <ellipse cx="120" cy="120" rx="55" ry="70" fill="none" stroke="rgba(255,255,255,0.25)" />
                <path d="M50 120 H190 M58 85 H182 M58 155 H182" stroke="rgba(255,255,255,0.3)" />
                <g data-orbit>
                  <ellipse cx="120" cy="120" rx="108" ry="108" fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="2 6" />
                  {Array.from({ length: 6 }, (_, i) => {
                    const a = (i / 6) * Math.PI * 2;
                    // Rounded so server and browser agree on the markup.
                    const x = Math.round((120 + Math.cos(a) * 108) * 100) / 100;
                    const y = Math.round((120 + Math.sin(a) * 108) * 100) / 100;
                    return (
                      <g key={i} data-pin>
                        <circle data-pin-pulse cx={x} cy={y} r="7" fill="#fff" opacity="0.5" />
                        <circle cx={x} cy={y} r="6" fill="#fff" />
                        <circle cx={x} cy={y} r="2.5" fill="#D9561A" />
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
