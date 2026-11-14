"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAP_H, project } from "./officeMap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const ORANGE = "#F47A2A";

const OFFICES = [
  {
    city: "London",
    country: "United Kingdom",
    address: "7 Kirkdale House, London, E11 1HP",
    timeZone: "Europe/London",
    at: project(-0.006, 51.567),
    photo: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=900&q=80&auto=format&fit=crop",
    alt: "Tower Bridge and the City of London",
  },
  {
    city: "Dhaka",
    country: "Bangladesh",
    address: "Road 15, Sector 12, Uttara, Dhaka 1230",
    timeZone: "Asia/Dhaka",
    at: project(90.4, 23.87),
    photo: "https://images.unsplash.com/photo-1630987871777-f7b2d62894d0?w=900&q=80&auto=format&fit=crop",
    alt: "The Dhaka skyline under a blue sky",
  },
];

// Study destinations our routes lead to.
const DESTINATIONS: [string, number, number][] = [
  ["Dublin", -6.26, 53.35],
  ["Madrid", -3.7, 40.42],
  ["Rome", 12.5, 41.9],
  ["Valletta", 14.51, 35.9],
  ["Budapest", 19.04, 47.5],
  ["Vilnius", 25.28, 54.69],
  ["Athens", 23.73, 37.98],
  ["Bucharest", 26.1, 44.43],
  ["Nicosia", 33.38, 35.17],
];

const r1 = (n: number) => Math.round(n * 10) / 10;
const ZOOM = { w: 300, h: 240 };
const viewOf = (i: number) => {
  const [x, y] = OFFICES[i].at;
  // Dhaka sits near the map's eastern edge, so it is framed towards the right, with routes fanning in from the west.
  const fx = i === 0 ? 0.45 : 0.8;
  return `${r1(x - ZOOM.w * fx)} ${r1(y - ZOOM.h * 0.6)} ${ZOOM.w} ${ZOOM.h}`;
};
/** A curved route between two map points, bowing upwards. */
function arc([x1, y1]: number[], [x2, y2]: number[]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.28;
  return `M${r1(x1)} ${r1(y1)}Q${r1(mx)} ${r1(my)} ${r1(x2)} ${r1(y2)}`;
}

function LocalTime({ timeZone }: { timeZone: string }) {
  // Read the clock only in the browser, so the server and browser markup agree.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className={now ? "" : "invisible"}>{(now ?? new Date(0)).toLocaleTimeString("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" })}</span>;
}

export default function Offices() {
  const root = useRef<HTMLElement>(null);
  const [sel, setSel] = useState(0);
  const mapRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState(false);
  const pick = (i: number) => setSel(((i % OFFICES.length) + OFFICES.length) % OFFICES.length);

  // Cycle between offices on its own, unless the reader is hovering.
  useEffect(() => {
    if (hover) return;
    const t = setTimeout(() => pick(sel + 1), 5000);
    return () => clearTimeout(t);
     
  }, [sel, hover]);
  const o = OFFICES[sel];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
          .fromTo("[data-o-eyebrow]", { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" })
          .fromTo("[data-o-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" }, 0.1)
          .fromTo("[data-o-side]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3);

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: "[data-o-grid]", start: "top 78%" } });
        tl.fromTo("[data-o-card]", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12 })
          .fromTo("[data-o-land]", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power1.out" }, 0.2)
          .fromTo("[data-o-route]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.07, ease: "power2.inOut" }, 0.8)
          .fromTo("[data-o-dest]", { attr: { r: 0 } }, { attr: { r: 2.4 }, duration: 0.5, stagger: 0.07, ease: "back.out(3)" }, 1.6)
          .fromTo("[data-o-dot]", { attr: { r: 0 } }, { attr: { r: 4 }, duration: 0.7, stagger: 0.2, ease: "back.out(3)" }, 1)
          .fromTo("[data-o-count]", { textContent: 0 }, { textContent: OFFICES.length, duration: 1.4, snap: { textContent: 1 }, ease: "power2.out" }, 0.5);

        gsap.to("[data-o-pulse]", { attr: { r: 14 }, opacity: 0, duration: 2, ease: "power1.out", repeat: -1, stagger: 0.7 });
      });
    },
    { scope: root },
  );

  // Switching office: the photo and details crossfade.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(mapRef.current, { attr: { viewBox: viewOf(sel) }, duration: 1.6, ease: "power3.inOut" });
      gsap.fromTo("[data-o-city]", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" });
      gsap.fromTo("[data-o-photo]", { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" });
      gsap.fromTo("[data-o-info] > *", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" });
    },
    { scope: root, dependencies: [sel], revertOnUpdate: true },
  );


  return (
    <section ref={root} aria-labelledby="offices-title" className="overflow-hidden bg-white px-6 py-24 sm:py-32" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p data-o-eyebrow className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-[#5A4FF0]">
              <svg viewBox="0 0 26 18" className="h-[14px] w-[20px]" aria-hidden>
                <path d="M3 0H18Q20 0 21.3 1.6L25.4 7.6Q26.4 9 25.4 10.4L21.3 16.4Q20 18 18 18H3Q0 18 0 15V3Q0 0 3 0Z" fill="#5A4FF0" />
              </svg>
              Our offices
            </p>
            <h2 id="offices-title" className="mt-4 text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]" style={{ color: MAROON }}>
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-o-line className="block">
                  Find Your Nearest
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span data-o-line className="block">
                  Root Education Office
                </span>
              </span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p data-o-side className="text-base leading-relaxed text-[#2E1212]/70">
              Visit us in London or Dhaka. Meet an advisor in person, ask your questions and leave with a clear plan at your own pace.
            </p>
            <Link
              data-o-side
              href="/consultation"
              className="group mt-5 inline-flex h-12 items-center gap-3 rounded-full bg-[#0B0B0C] pl-6 pr-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Book an office visit
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div data-o-grid className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
          {/* The map, zoomed in on the selected office */}
          <div data-o-card className="relative h-[24rem] overflow-hidden rounded-[22px] sm:h-[30rem] lg:row-span-2 lg:h-auto lg:min-h-[32rem]" style={{ background: "#E3E1FF" }}>
            <svg
              ref={mapRef}
              viewBox={viewOf(0)}
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              aria-label={`Map showing our ${o.city} office and routes to our study destinations`}
              role="img"
            >
              <defs>
                <pattern id="o-grid" width="9" height="9" patternUnits="userSpaceOnUse">
                  <path d="M9 0H0V9" fill="none" stroke="#CFCCFF" strokeWidth="0.35" />
                </pattern>
              </defs>
              <rect x="-200" y="-200" width="1400" height={MAP_H + 400} fill="url(#o-grid)" />
              <image data-o-land href="/offices-map.svg" x="0" y="0" width="1000" height={MAP_H} />
              {/* Routes from both offices to our destinations */}
              <g fill="none" stroke={ORANGE} strokeWidth="0.8" strokeLinecap="round">
                {OFFICES.map((of) =>
                  DESTINATIONS.map(([name, x, y]) => (
                    <path key={of.city + name} data-o-route d={arc(of.at, project(x, y))} pathLength={1} strokeDasharray="1" opacity="0.75" />
                  )),
                )}
                <path data-o-route d={arc(OFFICES[0].at, OFFICES[1].at)} pathLength={1} strokeDasharray="1" />
              </g>
              {DESTINATIONS.map(([name, x, y]) => {
                const [px, py] = project(x, y);
                return <circle key={name} data-o-dest cx={px} cy={py} r="2.4" fill="#F8935A" />;
              })}
              {/* Office dots */}
              {OFFICES.map((of) => {
                const [px, py] = of.at;
                return (
                  <g key={of.city}>
                    <circle data-o-pulse cx={px} cy={py} r="4" fill={ORANGE} opacity="0.45" />
                    <circle data-o-dot cx={px} cy={py} r="4" fill={ORANGE} stroke="#FFFFFF" strokeWidth="1" />
                  </g>
                );
              })}
            </svg>

            {/* The location pill */}
            <div className="absolute inset-x-4 bottom-5 flex items-center rounded-full border border-[#2E1212]/10 bg-white py-1.5 pl-5 pr-1.5 shadow-[0_18px_40px_-18px_rgba(46,18,18,0.45)] sm:inset-x-auto sm:left-[10%] sm:w-[22rem]">
              <span data-o-city className="flex-1 truncate text-base text-[#B45A1E]">
                {o.city}
              </span>
              <span className="flex gap-1">
                {[-1, 1].map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => pick(sel + dir)}
                    aria-label={dir < 0 ? "Previous office" : "Next office"}
                    className="grid h-8 w-8 place-items-center rounded-full text-[#2E1212]/60 transition-colors hover:bg-[#2E1212]/5 hover:text-[#2E1212]"
                  >
                    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${dir < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </button>
                ))}
              </span>
            </div>
          </div>

          {/* Presence */}
          <div data-o-card className="relative overflow-hidden rounded-[22px] p-6 sm:p-7" style={{ background: "#FFC19A" }}>
            <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
            <p className="relative text-6xl font-semibold tracking-tight" style={{ color: MAROON }}>
              <span data-o-count>{OFFICES.length}</span>
            </p>
            <p className="relative mt-6 text-xl font-semibold tracking-tight" style={{ color: MAROON }}>
              Offices across two continents
            </p>
            <p className="relative mt-2 text-sm leading-relaxed text-[#2E1212]/70">Face-to-face support in London and Dhaka, with advisors who know each destination.</p>
          </div>

          {/* The selected office */}
          <div data-o-card className="relative min-h-[17rem] overflow-hidden rounded-[22px] border border-[#2E1212]/15 bg-white p-2">
            <div className="relative h-full min-h-[16rem] overflow-hidden rounded-[16px]">
              <Image key={o.photo} data-o-photo src={o.photo} alt={o.alt} fill sizes="(min-width:1024px) 22rem, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div data-o-info className="absolute inset-x-4 bottom-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{o.country}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{o.city} office</p>
                <p className="mt-1 text-sm text-white/80">{o.address}</p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Local time <LocalTime timeZone={o.timeZone} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
