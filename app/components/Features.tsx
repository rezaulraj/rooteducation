"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries, Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const flagOf = (name: string) => countries.find((c) => c.name === name)!.flag;
const exams = ["IELTS", "TOEFL", "PTE", "Duolingo", "GRE", "GMAT", "SAT"];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function Feature({
  title,
  copy,
  cta,
  href,
  className = "",
  dark = false,
  children,
}: {
  title: string;
  copy: string;
  cta: string;
  href: string;
  className?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <article data-feature className={`group relative isolate flex min-h-[340px] overflow-hidden rounded-[28px] ${className}`}>
      {children}
      <div className="relative z-10 mt-auto max-w-sm p-7 sm:p-8">
        <h3 className={`text-2xl font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/65" : "text-ink/65"}`}>{copy}</p>
        <Link href={href} className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>
          {cta}
          <Arrow />
        </Link>
      </div>
    </article>
  );
}

/** A small illustrated university "photo" card: sky, building, flag. */
function UniCard({ name, country, className = "" }: { name: string; country: string; className?: string }) {
  return (
    <div className={`w-44 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_24px_40px_-18px_rgba(20,16,18,0.55)] ${className}`}>
      <div className="relative h-32 bg-[linear-gradient(180deg,#9FCBF2_0%,#E1EEFA_100%)]">
        <svg viewBox="0 0 160 110" className="absolute inset-x-0 bottom-0 h-full w-full" aria-hidden>
          <rect x="22" y="48" width="116" height="62" fill="#C9774A" />
          <rect x="22" y="48" width="116" height="8" fill="#A9603A" />
          <rect x="66" y="18" width="28" height="34" fill="#B96A40" />
          <path d="M62 18 L80 4 L98 18 Z" fill="#8E4B2D" />
          {[32, 52, 98, 118].map((x) => (
            <rect key={x} x={x} y="64" width="10" height="16" rx="5" fill="#F6D9B8" />
          ))}
          {[32, 52, 98, 118].map((x) => (
            <rect key={`b${x}`} x={x} y="88" width="10" height="16" rx="5" fill="#F6D9B8" />
          ))}
          <rect x="72" y="80" width="16" height="30" rx="8" fill="#6E3A22" />
          <rect x="0" y="104" width="160" height="6" fill="#7FB59C" />
        </svg>
      </div>
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span className="h-5 w-5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" style={{ background: flagOf(country) }} />
        <span className="truncate text-[11px] font-semibold text-ink">{name}</span>
      </div>
    </div>
  );
}

export default function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const grid = section.querySelector<HTMLElement>("[data-feature-grid]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-feature]", section);

      // Always-on details inside the cards.
      gsap.to("[data-exam-track]", { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
      gsap.to("[data-radar-ring]", { scale: 2.2, opacity: 0, duration: 2.6, ease: "power1.out", repeat: -1, stagger: 0.85, transformOrigin: "50% 50%" });
      gsap.to("[data-orbit-dot]", { rotation: 360, duration: 14, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to("[data-coin-float]", { y: -8, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Each card's home position relative to the grid centre (layout boxes, transforms ignored).
        const homes = () =>
          cards.map((c) => ({
            x: c.offsetLeft + c.offsetWidth / 2 - grid.offsetWidth / 2,
            y: c.offsetTop + c.offsetHeight / 2 - grid.offsetHeight / 2,
          }));
        let home = homes();

        // Orbit → land: every card starts on a ring around the grid centre, swings round it,
        // then spirals out into its bento slot as the ring opens up.
        const state = { p: 0 };
        const ease = gsap.parseEase("power2.inOut");
        const draw = () => {
          const t = ease(state.p);
          const radius = Math.min(grid.offsetWidth, grid.offsetHeight) * 0.28;
          cards.forEach((card, i) => {
            const base = (i / cards.length) * Math.PI * 2;
            const angle = base + (1 - t) * Math.PI * 1.25;
            const ox = Math.cos(angle) * radius;
            const oy = Math.sin(angle) * radius * 0.7;
            gsap.set(card, {
              x: (ox - home[i].x) * (1 - t),
              y: (oy - home[i].y) * (1 - t),
              rotation: (1 - t) * ((angle * 180) / Math.PI + 90) * 0.12,
              scale: 0.36 + 0.64 * t,
              autoAlpha: Math.min(1, state.p * 4),
              zIndex: Math.round(t * 10 + i),
            });
          });
        };
        draw();

        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: draw,
          scrollTrigger: {
            trigger: grid,
            start: "top 95%",
            end: "top 20%",
            scrub: 0.8,
            onRefresh: () => {
              home = homes();
              draw();
            },
          },
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-feature-head] > *", {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        });

        // Once landed, each card plays its own small scene.
        const scene = (sel: string, build: (tl: gsap.core.Timeline) => void) => {
          const el = section.querySelector(sel);
          if (!el) return;
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" } });
          build(tl);
        };
        scene("[data-scene='shortlist']", (tl) =>
          tl
            .from("[data-uni='left']", { rotation: 0, x: 60, duration: 0.8, ease: "back.out(1.6)" })
            .from("[data-uni='right']", { rotation: 0, x: -60, duration: 0.8, ease: "back.out(1.6)" }, 0)
            .from("[data-uni='center']", { y: 40, scale: 0.9, duration: 0.8, ease: "back.out(1.6)" }, 0)
            .from("[data-uni-pill]", { y: -16, autoAlpha: 0, duration: 0.5 }, 0.4),
        );
        scene("[data-scene='finance']", (tl) =>
          tl
            .from("[data-coin]", { y: -120, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "bounce.out" })
            .fromTo("[data-eligibility]", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.out", transformOrigin: "0% 50%" }, 0.3),
        );
        scene("[data-scene='admit']", (tl) =>
          tl
            .from("[data-cap]", { y: -80, rotation: -40, duration: 0.9, ease: "back.out(2)" })
            .from("[data-congrats]", { y: 30, scale: 0.8, autoAlpha: 0, duration: 0.6, ease: "back.out(2)" }, 0.35),
        );
        scene("[data-scene='application']", (tl) =>
          tl
            .from("[data-doc]", { y: 60, rotation: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.8)" })
            .from("[data-avatar]", { scale: 0, duration: 0.5, stagger: 0.12, ease: "back.out(3)" }, 0.2),
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="features-title" className="bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-feature-head>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Features
          </p>
          <h2 id="features-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            All the right support,
            <span className="mx-3 inline-grid h-[0.8em] w-[1.2em] translate-y-[0.05em] place-items-center bg-brand pr-[0.18em] align-middle text-white [clip-path:polygon(0_0,75%_0,100%_50%,75%_100%,0_100%)]">
              <Icon name="scholarship" className="h-[0.45em] w-[0.45em]" />
            </span>
            <br />
            in one place
          </h2>
        </div>

        <div data-feature-grid className="relative mt-14 grid gap-4 md:grid-cols-12">
          {/* University shortlist */}
          <Feature
            title="University shortlist"
            copy="Find best-fit universities with admit chances, clear reasons and scholarships to consider."
            cta="Get your shortlist"
            href="/services/university-selection"
            className="bg-[linear-gradient(135deg,#FFE3CC_0%,#F7924F_100%)] md:col-span-8"
          >
            <div data-scene="shortlist" aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] sm:block">
              <div data-uni="left" className="absolute left-[4%] top-[20%]" style={{ transform: "rotate(-12deg)" }}>
                <UniCard name="University of Malta" country="Malta" />
              </div>
              <div data-uni="right" className="absolute right-[2%] top-[20%]" style={{ transform: "rotate(12deg)" }}>
                <UniCard name="Semmelweis University" country="Hungary" />
              </div>
              <div data-uni="center" className="absolute left-1/2 top-[12%] z-10 -ml-[88px]">
                <span data-uni-pill className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[10px] font-semibold text-white">
                  Shortlist ready
                </span>
                <UniCard name="University of Bucharest" country="Romania" className="scale-110" />
              </div>
            </div>
          </Feature>

          {/* Finances */}
          <Feature
            title="Secure finances"
            copy="Unlock scholarships, find the right loan and plan your costs without the guesswork."
            cta="Explore now"
            href="/services/scholarship-financial-aid"
            className="bg-[linear-gradient(160deg,#DCEBE3_0%,#9CCBB2_100%)] md:col-span-4"
          >
            <div data-scene="finance" aria-hidden className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
              <div data-coin-float className="relative h-36 w-64">
                {[0, 1, 2, 3].map((n) => (
                  <span
                    key={n}
                    data-coin
                    className="absolute left-4 h-10 w-24 rounded-[50%] border-b-[6px] shadow-[0_6px_10px_-6px_rgba(20,16,18,0.5)]"
                    style={{
                      top: 70 - n * 16,
                      background: n % 2 ? "linear-gradient(180deg,#FFD59E,#F2A65A)" : "linear-gradient(180deg,#DDE3EA,#AEB8C4)",
                      borderColor: n % 2 ? "#C9773F" : "#7D8794",
                    }}
                  />
                ))}
                <div className="absolute right-0 top-4 w-40 rounded-xl bg-white/90 p-3 shadow-[0_14px_30px_-14px_rgba(20,16,18,0.45)] backdrop-blur">
                  <p className="text-[11px] font-semibold text-ink">Scholarship eligibility</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <div data-eligibility className="h-full w-[68%] rounded-full bg-brand" />
                  </div>
                </div>
              </div>
            </div>
          </Feature>

          {/* Admit chances */}
          <Feature
            dark
            title="Better admit chances"
            copy="Stand out with strong SOPs, LORs and a polished profile, guided by experts."
            cta="Explore now"
            href="/services/application-assistance"
            className="bg-[linear-gradient(160deg,#2A2023_0%,#141012_100%)] md:col-span-4"
          >
            <div data-scene="admit" aria-hidden className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
              <div className="relative h-40 w-60">
                <div aria-hidden className="absolute left-1/2 top-4 h-32 w-32 -translate-x-1/2 rounded-full bg-brand/40 blur-2xl" />
                <div data-cap className="absolute left-1/2 top-0 -ml-12 text-white">
                  <svg viewBox="0 0 96 70" className="h-20 w-24" fill="none">
                    <path d="M48 6 92 26 48 46 4 26Z" fill="#FFFFFF" />
                    <path d="M24 36v14c0 6 11 12 24 12s24-6 24-12V36L48 48Z" fill="#E9DED4" />
                    <path d="M86 28v22" stroke="#F47A2A" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="86" cy="54" r="4" fill="#F47A2A" />
                  </svg>
                </div>
                <div data-congrats className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-white">
                    <Icon name="scholarship" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-brand">Congratulations!</span>
                    <span className="block text-[11px] text-ink/60">Your offer letter has arrived</span>
                  </span>
                </div>
              </div>
            </div>
          </Feature>

          {/* Application */}
          <Feature
            title="Build your application"
            copy="Strong SOPs, LORs and a polished profile, shaped by advisors who know what works."
            cta="Build now"
            href="/services/application-assistance"
            className="bg-[#FBF1E7] md:col-span-8"
          >
            <div data-scene="application" aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block">
              <div className="absolute right-[12%] top-[16%] h-48 w-64">
                <div className="absolute inset-x-0 bottom-0 h-36 rounded-2xl bg-[linear-gradient(160deg,#F7924F,#D9561A)] shadow-[0_24px_40px_-20px_rgba(20,16,18,0.6)]" />
                {[0, 1, 2].map((n) => (
                  <div
                    key={n}
                    data-doc
                    className="absolute bottom-10 left-6 h-36 w-48 rounded-xl border border-ink/10 bg-white p-3 shadow-sm"
                    style={{ transform: `rotate(${-8 + n * 7}deg) translateX(${n * 14}px)` }}
                  >
                    <span className="block h-2 w-20 rounded-full bg-ink/15" />
                    <span className="mt-2 block h-2 w-28 rounded-full bg-ink/10" />
                    <span className="mt-2 block h-2 w-24 rounded-full bg-ink/10" />
                    <span className="mt-4 block h-2 w-16 rounded-full bg-brand/40" />
                  </div>
                ))}
                <div className="absolute inset-x-0 bottom-0 h-24 rounded-2xl bg-[linear-gradient(160deg,#FFB27A,#F47A2A)]" />
              </div>
              {[
                { i: "SN", bg: "#7FB59C", pos: "left-[6%] top-[14%]" },
                { i: "AR", bg: "#FFC79E", pos: "left-[16%] top-[52%]" },
                { i: "MK", bg: "#141012", pos: "right-[4%] top-[8%]" },
              ].map((a) => (
                <span
                  key={a.i}
                  data-avatar
                  className={`absolute grid h-14 w-14 place-items-center rounded-2xl text-sm font-semibold ring-4 ring-white ${a.pos} ${a.bg === "#141012" ? "text-white" : "text-ink"}`}
                  style={{ background: a.bg }}
                >
                  {a.i}
                </span>
              ))}
            </div>
          </Feature>

          {/* Visa */}
          <Feature
            title="Get visa ready"
            copy="Document checklists, mock interviews and step-by-step filing, so nothing catches you out."
            cta="Explore now"
            href="/services/visa-guidance"
            className="bg-[linear-gradient(160deg,#E9EEFF_0%,#C9D3FA_100%)] md:col-span-4"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
              <div className="relative grid h-36 w-36 place-items-center">
                {[0, 1, 2].map((n) => (
                  <span key={n} data-radar-ring className="absolute inset-6 rounded-full border-2 border-[#6C7BEA]/60" />
                ))}
                <div data-orbit-dot className="absolute inset-0">
                  <span className="absolute -top-1 left-1/2 h-3 w-3 -ml-1.5 rounded-full bg-brand" />
                </div>
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[#6C7BEA] text-white shadow-[0_14px_30px_-10px_rgba(108,123,234,0.8)]">
                  <Icon name="passport" className="h-7 w-7" />
                </span>
              </div>
            </div>
          </Feature>

          {/* Exams */}
          <Feature
            dark
            title="Prepare for exams"
            copy="Structured prep and practice tests for the exams your universities ask for."
            cta="Start preparing"
            href="/services/study-abroad-consultation"
            className="bg-[radial-gradient(120%_120%_at_80%_0%,#5A2A1A_0%,#2A1512_45%,#141012_100%)] md:col-span-8"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 overflow-hidden">
              <div data-exam-track className="flex w-max items-center gap-4">
                {[...exams, ...exams].map((e, i) => (
                  <span key={i} className="flex items-center gap-4">
                    <span className="text-brand">✦</span>
                    <span className="rounded-full border border-white/25 px-7 py-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      {e}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </Feature>
        </div>
      </div>
    </section>
  );
}
