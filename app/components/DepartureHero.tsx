"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// A decorative board of flights to our six destinations, not a real timetable.
const flights = [
  { city: "LONDON", code: "RE101", gate: "A1" },
  { city: "BUCHAREST", code: "RE204", gate: "B4" },
  { city: "VALLETTA", code: "RE310", gate: "C2" },
  { city: "BUDAPEST", code: "RE415", gate: "A7" },
  { city: "NICOSIA", code: "RE522", gate: "D3" },
  { city: "ATHENS", code: "RE630", gate: "B9" },
];
const STATUS = ["CHECK IN", "BOARDING", "DEPARTED"];
const CITY_W = 9;
const STATUS_W = 8;
const pad = (s: string, n: number) => s.padEnd(n, " ").slice(0, n);

function Flaps({ text, row, field }: { text: string; row: number; field: string }) {
  return (
    <span className="flex gap-[2px]" data-dh-field={`${field}-${row}`}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="relative grid h-[1.55em] w-[1.05em] place-items-center overflow-hidden rounded-[3px] bg-[#211819] font-mono font-bold text-[#FFE9D2] shadow-[inset_0_-1px_0_rgba(0,0,0,0.6)] [perspective:200px]"
        >
          <span aria-hidden className="absolute inset-x-0 top-1/2 z-10 h-px bg-black/60" />
          <span data-dh-char className="block will-change-transform">{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

export default function DepartureHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Flip each cell of a field through a few random letters before it settles on the target.
      const flip = (field: string, target: string, delay = 0) => {
        const chars = section.querySelectorAll<HTMLElement>(`[data-dh-field='${field}'] [data-dh-char]`);
        chars.forEach((el, i) => {
          const final = target[i] === " " ? " " : target[i];
          gsap.killTweensOf(el);
          if (reduce) {
            el.textContent = final;
            return;
          }
          const turns = 3 + Math.floor(Math.random() * 4);
          gsap.fromTo(
            el,
            { rotationX: 0 },
            {
              rotationX: -90,
              duration: 0.05,
              repeat: turns * 2 - 1,
              yoyo: true,
              ease: "none",
              delay: delay + i * 0.03,
              onRepeat() {
                el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              },
              onComplete() {
                el.textContent = final;
                gsap.set(el, { rotationX: 0 });
              },
            },
          );
        });
      };

      const status = flights.map(() => -1);
      const setStatus = (row: number, s: number, delay = 0) => {
        if (status[row] === s) return;
        status[row] = s;
        flip(`status-${row}`, pad(STATUS[s], STATUS_W), delay);
        const dot = section.querySelector<HTMLElement>(`[data-dh-dot='${row}']`)!;
        dot.style.backgroundColor = ["#FBB524", "#F47A2A", "#2F7A56"][s];
        dot.classList.toggle("animate-pulse", s === 1);
      };

      // Arrival: the board clatters into place, row by row.
      flights.forEach((f, r) => {
        flip(`city-${r}`, pad(f.city, CITY_W), 0.5 + r * 0.15);
        setStatus(r, 0, 0.8 + r * 0.15);
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        gsap
          .timeline({ delay: 0.2, defaults: { ease: "expo.out" } })
          .fromTo("[data-dh-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0)
          .fromTo("[data-dh-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.4)
          .fromTo("[data-dh-board]", { y: 60, rotationX: 18, autoAlpha: 0 }, { y: 0, rotationX: 0, autoAlpha: 1, duration: 1.4 }, 0.2);

        // Scroll: each flight goes to boarding, then departs, top to bottom; a plane takes off at the end.
        const n = flights.length;
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=220%",
          onUpdate: (self) => {
            const p = self.progress;
            flights.forEach((_, r) => {
              const boardAt = (r / n) * 0.55;
              const departAt = 0.3 + (r / n) * 0.6;
              setStatus(r, p >= departAt ? 2 : p >= boardAt ? 1 : 0);
            });
          },
        });
        gsap.fromTo(
          "[data-dh-plane]",
          { x: "-15vw", y: 120, rotation: -6, autoAlpha: 0 },
          {
            x: "105vw",
            y: -260,
            rotation: -18,
            autoAlpha: 1,
            ease: "power1.in",
            scrollTrigger: { trigger: section, start: "top top", end: "+=220%", scrub: 0.8 },
          },
        );
        return () => section.classList.remove("pinned");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        flights.forEach((_, r) => setStatus(r, 1));
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/dh overflow-hidden bg-white px-3 pt-3">
      <section
        aria-labelledby="dh-title"
        className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FFE9D6_0%,#FFD0A8_55%,#F7A56B_100%)] group-[.pinned]/dh:h-[calc(100svh-24px)] lg:min-h-[calc(100svh-24px)]"
      >
        {/* Runway lines receding at the bottom */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] [perspective:500px]">
          <div className="absolute inset-x-[-30%] bottom-[-10%] h-[160%] origin-bottom bg-[#2B1E1F] [transform:rotateX(62deg)]">
            <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-[repeating-linear-gradient(180deg,#FFE9D2_0_40px,transparent_40px_80px)] opacity-70" />
            <div className="absolute inset-y-0 left-[30%] w-1 bg-[#F47A2A]/50" />
            <div className="absolute inset-y-0 right-[30%] w-1 bg-[#F47A2A]/50" />
          </div>
        </div>
        <svg data-dh-plane aria-hidden viewBox="0 0 32 32" className="invisible pointer-events-none absolute left-0 top-[55%] z-20 h-20 w-20 text-ink" fill="currentColor">
          <path d="M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z" />
        </svg>

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 pb-14 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:pb-24">
          <div className="relative z-10">
            <p data-dh-fade className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand sm:text-sm">
              <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Pre-departure briefing
            </p>
            <h1 id="dh-title" className="mt-4 text-[clamp(2.4rem,5.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
              {["Pack your bags.", "We'll handle", "the rest."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <span data-dh-line className={`block ${i === 2 ? "text-brand" : ""}`}>{l}</span>
                </span>
              ))}
            </h1>
            <p data-dh-fade className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-lg">
              Everything you need to know before you fly: accommodation, banking, travel, health and settling into a new country.
            </p>
            <div data-dh-fade className="mt-7">
              <Link href="/consultation" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
                Book my briefing
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Departures board */}
          <div className="[perspective:1200px]">
            <div
              data-dh-board
              role="img"
              aria-label="A departures board showing flights to London, Bucharest, Valletta, Budapest, Nicosia and Athens"
              className="rounded-[24px] bg-[#120D0E] p-4 text-[clamp(0.62rem,1.15vw,0.95rem)] shadow-[0_40px_80px_-30px_rgba(60,20,0,0.8)] ring-1 ring-white/10 sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#FBB524]">
                  <svg viewBox="0 0 32 32" className="h-4 w-4 -rotate-45" fill="currentColor" aria-hidden>
                    <path d="M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z" />
                  </svg>
                  Departures
                </p>
                <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40 sm:block">From Dhaka · London</p>
              </div>
              <div aria-hidden className="mb-2 grid grid-cols-[auto_1fr_auto_auto] gap-x-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/35 sm:gap-x-5">
                <span>Flight</span>
                <span>Destination</span>
                <span>Gate</span>
                <span>Status</span>
              </div>
              <ul aria-hidden className="space-y-1.5">
                {flights.map((f, r) => (
                  <li key={f.code} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 sm:gap-x-5">
                    <span className="font-mono text-[0.85em] font-semibold text-white/55">{f.code}</span>
                    <Flaps text={" ".repeat(CITY_W)} row={r} field="city" />
                    <span className="font-mono font-bold text-[#FBB524]">{f.gate}</span>
                    <span className="flex items-center gap-2">
                      <span data-dh-dot={r} className="h-2 w-2 rounded-full bg-white/20 transition-colors duration-500" />
                      <Flaps text={" ".repeat(STATUS_W)} row={r} field="status" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
