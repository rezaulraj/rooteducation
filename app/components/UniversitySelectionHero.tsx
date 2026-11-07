"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries, Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// What the student tells us: each chip flies into the campus and nudges the match up.
const criteria = [
  { label: "Your course", icon: "document", pos: [4, 12] },
  { label: "Your budget", icon: "scholarship", pos: [70, 4] },
  { label: "Your grades", icon: "university", pos: [-2, 58] },
  { label: "Your city", icon: "compass", pos: [76, 48] },
  { label: "Scholarships", icon: "scholarship", pos: [38, -4] },
];

// An illustrative shortlist, not real results.
const shortlist = [
  { course: "Medicine", country: "Romania", match: 96 },
  { course: "Business", country: "Malta", match: 91 },
  { course: "Engineering", country: "Hungary", match: 88 },
];
// Horizontal spread as a share of the visual's width.
const fan = [
  { x: -0.31, rotation: -9, y: 14 },
  { x: 0, rotation: 0, y: 0 },
  { x: 0.31, rotation: 9, y: 14 },
];

const columns = Array.from({ length: 6 }, (_, i) => 178 + i * 48);
const windows = Array.from({ length: 5 }, (_, i) => 202 + i * 48);
const MATCH = 96;

function Campus() {
  return (
    <svg viewBox="0 0 600 560" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <pattern id="us-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#F47A2A" strokeOpacity="0.16" />
        </pattern>
        <radialGradient id="us-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFC56B" />
          <stop offset="1" stopColor="#FFC56B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="us-dome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A3236" />
          <stop offset="1" stopColor="#1A1214" />
        </linearGradient>
      </defs>

      <rect data-us-grid x="40" y="20" width="520" height="470" rx="24" fill="url(#us-grid)" />
      <ellipse cx="300" cy="474" rx="250" ry="22" fill="#E9A57A" opacity="0.35" />

      {/* Blueprint: drawn first, the building is then built over it */}
      <g data-us-blueprint fill="none" stroke="#F47A2A" strokeWidth="2" strokeDasharray="1" strokeLinejoin="round">
        <rect data-us-line x="110" y="412" width="380" height="42" pathLength={1} />
        <rect data-us-line x="160" y="240" width="280" height="172" pathLength={1} />
        <path data-us-line d="M140 240 300 170 460 240Z" pathLength={1} />
        <path data-us-line d="M250 170V120A50 50 0 0 1 350 120V170" pathLength={1} />
        <path data-us-line d="M300 70V20" pathLength={1} />
      </g>

      <g data-us-build>
        <rect data-us-dome x="250" y="118" width="100" height="56" fill="#F2B48C" />
        <path data-us-dome d="M246 120A54 54 0 0 1 354 120Z" fill="url(#us-dome)" />
        <rect data-us-dome x="291" y="56" width="18" height="12" rx="3" fill="#2B1E1F" />
        <path data-us-pole d="M300 58V18" stroke="#2B1E1F" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
        <path data-us-flag d="M302 20 334 28 302 37Z" fill="#F47A2A" />

        <rect data-us-step x="110" y="440" width="380" height="14" rx="3" fill="#E9A57A" />
        <rect data-us-step x="130" y="426" width="340" height="14" rx="3" fill="#F2B48C" />
        <rect data-us-step x="150" y="412" width="300" height="14" rx="3" fill="#F7C9A6" />
        <rect data-us-podium x="160" y="392" width="280" height="20" fill="#FFE3CC" />

        <rect data-us-wall x="170" y="262" width="260" height="130" fill="#FFEFE2" />
        {windows.map((x) => (
          <g key={x}>
            <path d={`M${x} 360V300a12 12 0 0 1 24 0v60Z`} fill="#2B1E1F" />
            <path data-us-window d={`M${x} 360V300a12 12 0 0 1 24 0v60Z`} fill="#FFC56B" opacity="0" />
          </g>
        ))}
        <circle data-us-window cx="300" cy="330" r="80" fill="url(#us-glow)" opacity="0" />
        {columns.map((x) => (
          <g key={x} data-us-col>
            <rect x={x} y="268" width="18" height="124" fill="#FFFFFF" />
            <rect x={x + 12} y="268" width="6" height="124" fill="#F2D3BC" />
            <rect x={x - 4} y="262" width="26" height="8" rx="2" fill="#F7E2D2" />
            <rect x={x - 4} y="386" width="26" height="6" rx="2" fill="#F7E2D2" />
          </g>
        ))}

        <rect data-us-beam x="150" y="240" width="300" height="22" fill="#FFFFFF" />
        <rect data-us-beam x="150" y="256" width="300" height="6" fill="#F2D3BC" />
        <g data-us-roof>
          <path d="M140 242 300 168 460 242Z" fill="#F47A2A" />
          <path d="M176 234 300 178 424 234Z" fill="#F7924F" />
          <circle cx="300" cy="214" r="12" fill="#FFF3E8" />
        </g>
      </g>
    </svg>
  );
}

export default function UniversitySelectionHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const visual = section.querySelector<HTMLElement>("[data-us-visual]")!;
      const counter = section.querySelector<HTMLElement>("[data-us-count]")!;
      const chips = gsap.utils.toArray<HTMLElement>("[data-us-chip]", section);

      // Ambient: the flag flutters and the chips bob while they wait.
      gsap.to("[data-us-flag]", { scaleX: 0.82, skewY: 6, svgOrigin: "302 28", duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.utils.toArray<HTMLElement>("[data-us-chip-bob]", section).forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 9 : -9, duration: 2.2 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");

        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.3 })
          .fromTo("[data-us-line-in]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0)
          .fromTo("[data-us-fade]", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.4)
          .fromTo("[data-us-chip]", { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.7, stagger: 0.08, ease: "back.out(2)" }, 0.6)
          .fromTo("[data-us-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0.5);

        const meter = { v: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, pin: true, start: "top top", end: "+=260%", scrub: 0.7, invalidateOnRefresh: true },
        });

        // 1. The campus builds over its blueprint, from the ground up.
        tl.fromTo("[data-us-step]", { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.08 }, 0)
          .fromTo("[data-us-podium]", { scaleX: 0, transformOrigin: "50% 50%" }, { scaleX: 1, duration: 0.3 }, 0.2)
          .fromTo("[data-us-wall]", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.35 }, 0.3)
          .fromTo("[data-us-col]", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.35, stagger: 0.06, ease: "back.out(1.6)" }, 0.38)
          .fromTo("[data-us-beam]", { y: -160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: "bounce.out" }, 0.72)
          .fromTo("[data-us-roof]", { y: -240, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "bounce.out" }, 0.85)
          .fromTo("[data-us-dome]", { scale: 0, svgOrigin: "300 174" }, { scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.8)" }, 1)
          .fromTo("[data-us-pole]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2 }, 1.25)
          .fromTo("[data-us-flag]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 1.4)
          .to("[data-us-blueprint]", { opacity: 0.18, duration: 0.3 }, 1.2);

        // 2. Each thing that matters to the student flies into the campus, and the match climbs.
        chips.forEach((chip, i) => {
          tl.to(
            chip,
            {
              x: () => visual.offsetWidth * 0.5 - (chip.offsetLeft + chip.offsetWidth / 2),
              y: () => visual.offsetHeight * 0.55 - (chip.offsetTop + chip.offsetHeight / 2),
              scale: 0.2,
              rotation: i % 2 ? 140 : -140,
              autoAlpha: 0,
              duration: 0.45,
              ease: "power2.in",
            },
            0.55 + i * 0.12,
          );
        });
        tl.fromTo("[data-us-meter]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25 }, 0.45)
          .fromTo("[data-us-ring]", { strokeDashoffset: 1 }, { strokeDashoffset: 1 - MATCH / 100, duration: 1.05, ease: "none" }, 0.6)
          .fromTo(
            meter,
            { v: 0 },
            { v: MATCH, duration: 1.05, ease: "none", onUpdate: () => (counter.textContent = String(Math.round(meter.v))) },
            0.6,
          );

        // 3. The lights come on and the shortlist fans out in front.
        tl.fromTo("[data-us-window]", { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.05, ease: "none" }, 1.5)
          .fromTo(
            "[data-us-card]",
            { x: 0, y: 80, rotation: 0, scale: 0.4, autoAlpha: 0 },
            { x: (i: number) => fan[i].x * visual.offsetWidth, y: (i: number) => fan[i].y, rotation: (i: number) => fan[i].rotation, scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.4)" },
            1.75,
          )
          .to({}, { duration: 0.3 });

        // The campus leans gently towards the cursor.
        const rx = gsap.quickTo("[data-us-tilt]", "rotationY", { duration: 1, ease: "power3.out" });
        const ry = gsap.quickTo("[data-us-tilt]", "rotationX", { duration: 1, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          rx((e.clientX / window.innerWidth - 0.5) * 10);
          ry(-(e.clientY / window.innerHeight - 0.5) * 6);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => {
          window.removeEventListener("pointermove", move);
          section.classList.remove("pinned");
        };
      });

      // Reduced motion: show the finished campus and shortlist straight away.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        counter.textContent = String(MATCH);
        gsap.set("[data-us-chip]", { autoAlpha: 0 });
        gsap.set("[data-us-window]", { opacity: 1 });
        gsap.set("[data-us-ring]", { strokeDashoffset: 1 - MATCH / 100 });
        gsap.set("[data-us-card]", { x: (i: number) => fan[i].x * visual.offsetWidth, y: (i: number) => fan[i].y, rotation: (i: number) => fan[i].rotation });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/us bg-white px-3 pt-3">
      <section
        aria-labelledby="us-title"
        className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(110%_90%_at_70%_40%,#FFF6EE_0%,#FFE3CC_55%,#FFC79E_100%)] group-[.pinned]/us:h-[calc(100svh-24px)] lg:min-h-[calc(100svh-24px)]"
      >
        <div className="mx-auto grid h-full max-w-6xl items-center gap-4 px-6 pb-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pb-10 lg:pt-28">
          {/* Copy */}
          <div className="relative z-10">
            <p data-us-fade className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand sm:text-sm">
              <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Our services
            </p>
            <h1 id="us-title" className="mt-4 text-[clamp(2.3rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
              {["Find the", "university", "that fits you"].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span data-us-line-in className={`block ${i === 1 ? "text-brand" : ""}`}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p data-us-fade className="mt-4 max-w-md text-sm leading-relaxed text-ink/70 sm:text-lg">
              Tell us what matters to you. We build a shortlist of programmes that fit your goals, grades and budget.
            </p>
            <div data-us-fade className="mt-6 hidden sm:block">
              <Link href="/consultation" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
                Get your shortlist
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="[perspective:1400px]">
            <div data-us-tilt data-us-visual className="relative mx-auto aspect-[600/560] w-full max-w-[min(600px,calc((100svh-520px)*1.07))] lg:max-w-[calc((100svh-210px)*1.07)]">
              <Campus />

              {criteria.map((c) => (
                <div key={c.label} data-us-chip className="absolute" style={{ left: `${c.pos[0]}%`, top: `${c.pos[1]}%` }}>
                  <div
                    data-us-chip-bob
                    className="flex items-center gap-2 rounded-full border border-white/80 bg-white/85 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-ink shadow-[0_14px_30px_-14px_rgba(120,60,20,0.6)] backdrop-blur-md sm:text-sm"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                      <Icon name={c.icon} className="h-4 w-4" />
                    </span>
                    {c.label}
                  </div>
                </div>
              ))}

              <div
                data-us-meter
                className="absolute right-[2%] top-[22%] flex items-center gap-3 rounded-2xl bg-ink p-3 pr-4 text-white shadow-[0_20px_40px_-18px_rgba(20,16,18,0.7)] sm:right-0"
              >
                <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-hidden>
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                  <circle data-us-ring cx="22" cy="22" r="18" fill="none" stroke="#F47A2A" strokeWidth="5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - MATCH / 100} />
                </svg>
                <span>
                  <span className="block text-xl font-semibold leading-none tabular-nums">
                    <span data-us-count>{MATCH}</span>%
                  </span>
                  <span className="mt-1 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/60">Best match</span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-[1%] flex justify-center">
                {shortlist.map((s, i) => (
                  <div
                    key={s.country}
                    data-us-card
                    className={`absolute bottom-0 w-[clamp(112px,30%,180px)] rounded-2xl bg-white p-3 text-ink shadow-[0_24px_40px_-18px_rgba(90,40,10,0.6)] sm:p-4 ${i === 1 ? "z-10" : ""}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="h-6 w-9 rounded-md shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" style={{ background: countries.find((c) => c.name === s.country)!.flag }} />
                      <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[0.65rem] font-bold text-brand">{s.match}%</span>
                    </span>
                    <span className="mt-3 block text-sm font-semibold leading-tight sm:text-base">{s.course}</span>
                    <span className="block text-xs text-ink/55">Study in {s.country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-4 left-6 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink/45 lg:block">
          Example shortlist, for illustration
        </p>
      </section>
    </div>
  );
}
