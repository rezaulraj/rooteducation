"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { countries } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const VIEW = { w: 1200, h: 800 };

// Simple equirectangular projection covering Western Europe to South Asia.
const project = (lon: number, lat: number) => [Math.round((lon + 22) * 9), Math.round((65 - lat) * 11)];
const shape = (coords: number[]) => {
  const pts: string[] = [];
  for (let i = 0; i < coords.length; i += 2) pts.push(project(coords[i], coords[i + 1]).join(","));
  return pts.join(" ");
};

// Deliberately coarse coastlines, as lon,lat pairs: the hatching hides the simplification.
const land = [
  // Eurasia
  [-9, 37, -9, 43, -2, 43.5, -1, 46, -4.5, 48.5, 2, 51, 4, 52, 8, 54, 8.5, 57, 10.5, 57.5, 10, 54.5, 14, 54, 19, 54.5, 21, 57, 24, 59, 30, 60, 23, 60, 21.5, 63, 25, 67, 125, 67, 125, 21, 106, 19, 109, 12, 105, 9, 103, 11, 100, 13, 99, 10, 100.5, 6, 102, 3, 100, 3, 98, 8, 98.5, 15, 97, 17, 94.5, 16, 94, 19, 92, 21.5, 90, 22, 87, 21, 85, 19.5, 80.5, 15, 80, 10, 77.5, 8, 76, 11, 73, 18, 72.5, 21, 70, 21, 67, 25, 61, 25, 57, 26.5, 56.5, 27, 51, 28, 48, 30, 50, 26, 52, 24, 56, 26, 59, 22.5, 55, 17, 45, 13, 43, 13, 39, 21, 35, 28, 34.5, 31, 36, 36, 30, 36.5, 27, 37, 26.5, 40, 23, 40, 24, 38, 22.5, 36.5, 20, 39.5, 19, 42, 14, 45, 18, 40, 16, 38, 12, 42, 9, 44, 3, 43, 0, 39, -2, 36.8, -5.5, 36],
  // Scandinavia
  [5, 59, 7, 58, 11, 59, 12.5, 56, 14.5, 56, 17, 59, 18, 62, 22, 67, 13, 67, 6, 62.5],
  // Great Britain, Ireland, Sri Lanka
  [-5.5, 50, 1.5, 51, 0, 54, -2, 56, -3, 58.5, -6, 58, -5, 55, -3.5, 53.5, -5, 52],
  [-10, 52, -6, 52, -6, 55, -8, 55.3, -10, 54],
  [80, 9.5, 82, 7.5, 80.5, 6],
  // Africa
  [-16, 30, -6, 35.7, 10, 37, 11, 33, 20, 31, 25, 31.5, 34, 31, 32.5, 29.5, 36, 22, 39, 15, 43, 11.5, 51, 11.5, 47, 4, 42, -4, 39, -10, 13, -10, 9, 4, 5, 6, -8, 4.5, -13, 8, -17, 14.7, -17, 21, -13, 27],
];
const seas = [
  [28, 41.5, 31, 46, 37, 45.5, 41, 42, 35, 42],
  [47, 45, 53, 46, 53, 39, 50, 37, 49, 40],
];

const offices = [
  {
    city: "London",
    region: "United Kingdom",
    address: "7 Kirkdale House, London, E11 1HP",
    timeZone: "Europe/London",
    flag: countries.find((c) => c.name === "UK")!.flag,
    at: project(0, 51.57),
    label: [-30, 30],
    card: "bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white",
    muted: "text-white/75",
  },
  {
    city: "Dhaka",
    region: "Bangladesh",
    address: "Road 15, Sector 12, Uttara, Dhaka, Bangladesh-1230",
    timeZone: "Asia/Dhaka",
    flag: "radial-gradient(circle at 45% 50%,#F42A41 32%,#006A4E 33%)",
    at: project(90.4, 23.87),
    label: [-170, 30],
    card: "bg-[linear-gradient(150deg,#2A2023_0%,#141012_100%)] text-white",
    muted: "text-white/65",
  },
];

const [a, b] = offices.map((o) => o.at);
const routePath = `M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2} ${Math.min(a[1], b[1]) - 150} ${b[0]} ${b[1]}`;

function LocalTime({ now, timeZone }: { now: Date | null; timeZone: string }) {
  // Rendered only after mount, so server and browser markup always agree.
  if (!now) return <span className="invisible">00:00</span>;
  return <span>{now.toLocaleTimeString("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" })}</span>;
}

export default function Offices() {
  const root = useRef<HTMLElement>(null);
  const camera = useRef({ s: 1, x: 0, y: 0 });
  const [active, setActive] = useState<number | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const [lx, ly] = offices[0].at;
        gsap.set("[data-land-mask]", { attr: { cx: lx, cy: ly } });

        // On arrival: the map opens, land spreads out from London, then the route flies to Dhaka.
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root.current, start: "top 65%" } })
          .from("[data-off-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1 })
          .fromTo("[data-map-card]", { clipPath: "inset(12% 12% 12% 12% round 60px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.2, ease: "expo.out" }, 0.1)
          .fromTo("[data-land-mask]", { attr: { r: 0 } }, { attr: { r: 1500 }, duration: 2, ease: "power2.inOut" }, 0.2)
          .fromTo("[data-pin='0']", { scale: 0, svgOrigin: offices[0].at.join(" ") }, { scale: 1, duration: 0.6, ease: "back.out(3)" }, 0.5)
          .fromTo("[data-route]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.9)
          .fromTo("[data-pin='1']", { scale: 0, svgOrigin: offices[1].at.join(" ") }, { scale: 1, duration: 0.6, ease: "back.out(3)" }, 2)
          .fromTo("[data-map-label]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.4 }, 1.1)
          .fromTo("[data-office]", { x: 70, rotation: 3, autoAlpha: 0 }, { x: 0, rotation: 0, autoAlpha: 1, duration: 1, stagger: 0.15 }, 0.5);

        gsap.to("[data-pin-pulse]", { scale: 2.6, opacity: 0, duration: 2, ease: "power1.out", repeat: -1, stagger: 0.6, transformOrigin: "50% 50%" });
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.8, scrollTrigger: { trigger: root.current, start: "top 40%" } })
          .set("[data-off-plane]", { opacity: 1 })
          .to("[data-off-plane]", {
            motionPath: { path: "[data-route]", align: "[data-route]", alignOrigin: [0.5, 0.5], autoRotate: true },
            duration: 6,
            ease: "power1.inOut",
          })
          .to("[data-off-plane]", { opacity: 0, duration: 0.3 });
      });
    },
    { scope: root },
  );

  // Choosing an office flies the map's camera to its pin, clamped so the map still fills the card.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const s = active === null ? 1 : 1.9;
      const [px, py] = active === null ? [VIEW.w / 2, VIEW.h / 2] : offices[active].at;
      gsap.to(camera.current, {
        s,
        x: gsap.utils.clamp(VIEW.w - VIEW.w * s, 0, VIEW.w / 2 - px * s),
        y: gsap.utils.clamp(VIEW.h - VIEW.h * s, 0, VIEW.h / 2 - py * s),
        duration: reduce ? 0 : 1.3,
        ease: "power3.inOut",
        overwrite: true,
        onUpdate: () => {
          const c = camera.current;
          root.current?.querySelector("[data-map-camera]")?.setAttribute("transform", `translate(${c.x} ${c.y}) scale(${c.s})`);
        },
      });
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <section ref={root} aria-labelledby="offices-title" className="overflow-hidden bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-off-head className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              Our offices
            </p>
            <h2 id="offices-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
              Come and <span className="text-brand">meet us.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-base leading-relaxed text-ink/60">
              Sit down with an advisor in person, ask your questions and leave with a clear next step.
            </p>
            <Link href="/contact" className="mt-5 inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-brand">
              Plan your visit
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* Map */}
          <div data-map-card className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-[#FFEBDC] lg:col-span-8 lg:aspect-auto lg:min-h-[560px]">
            <svg
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Map showing our offices in London and Dhaka, joined by a flight route"
            >
              <defs>
                <pattern id="land-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
                  <rect width="7" height="7" fill="#FFD2B0" />
                  <line x1="0" y1="2" x2="7" y2="2" stroke="#F47A2A" strokeWidth="2.4" />
                </pattern>
                <pattern id="sea-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M80 0H0V80" fill="none" stroke="#F47A2A" strokeOpacity="0.12" />
                </pattern>
                <mask id="land-reveal" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1600" height="1200">
                  <circle data-land-mask cx="150" cy="148" r="1500" fill="#fff" />
                </mask>
              </defs>
              <g data-map-camera>
                <rect x="-200" y="-200" width="1600" height="1200" fill="url(#sea-grid)" />
                <g mask="url(#land-reveal)">
                  {land.map((c, i) => (
                    <polygon key={i} points={shape(c)} fill="url(#land-hatch)" stroke="#F47A2A" strokeOpacity="0.5" strokeLinejoin="round" />
                  ))}
                  {seas.map((c, i) => (
                    <polygon key={i} points={shape(c)} fill="#FFEBDC" />
                  ))}
                </g>

                <path data-route d={routePath} fill="none" stroke="#141012" strokeWidth="3" pathLength={1} strokeDasharray="1" />
                <g data-off-plane opacity="0" fill="#141012">
                  <g transform="translate(-16 -16)">
                    <path d="M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z" />
                  </g>
                </g>

                {offices.map((o, i) => (
                  <g key={o.city}>
                    <g data-pin={i}>
                      <circle data-pin-pulse cx={o.at[0]} cy={o.at[1]} r="15" fill="#141012" opacity="0.35" />
                      <circle cx={o.at[0]} cy={o.at[1]} r="17" fill="#fff" />
                      <circle cx={o.at[0]} cy={o.at[1]} r="10" fill={active === i ? "#F47A2A" : "#141012"} />
                    </g>
                    <g className="hidden sm:block" transform={`translate(${o.at[0] + o.label[0]} ${o.at[1] + o.label[1]})`}>
                      <g data-map-label>
                      <rect width="200" height="68" rx="20" fill="#fff" fillOpacity="0.94" />
                      <text x="20" y="30" fontSize="23" fontWeight="600" fill="#0b0b0c">
                        {o.city}
                      </text>
                      <text x="20" y="52" fontSize="16" fill="#0b0b0c" fillOpacity="0.6">
                        {o.region}
                      </text>
                      </g>
                    </g>
                  </g>
                ))}
              </g>
            </svg>
            {active !== null && (
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute bottom-5 left-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
              >
                Show both offices
              </button>
            )}
          </div>

          {/* Office cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {offices.map((o, i) => (
              <article
                key={o.city}
                data-office
                className={`relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-[translate] duration-500 ${o.card} ${active === i ? "-translate-y-1" : ""}`}
              >
                <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                <button type="button" aria-pressed={active === i} onClick={() => setActive(i)} className="group relative flex-1 text-left">
                  <span className="flex items-center justify-between gap-3">
                    <span className="h-8 w-12 rounded-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" style={{ background: o.flag }} aria-hidden />
                    <span className={`font-mono text-sm tabular-nums ${o.muted}`}>
                      <LocalTime now={now} timeZone={o.timeZone} /> local
                    </span>
                  </span>
                  <span className="mt-8 block text-4xl font-semibold tracking-tight">{o.city}</span>
                  <span className={`mt-3 block text-[0.95rem] leading-relaxed ${o.muted}`}>{o.address}</span>
                  <span className="mt-4 block text-sm font-semibold underline-offset-4 group-hover:underline">
                    {active === i ? "Showing on map" : "View on map"}
                  </span>
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-5 inline-flex h-11 items-center justify-between rounded-full bg-white pl-5 pr-1.5 text-sm font-semibold text-ink"
                >
                  Get directions
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 12l8-8M6 4h6v6" />
                    </svg>
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
