"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Campus from "./Campus";
import DestinationReel from "./DestinationReel";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const headingLines = [
  [{ text: "Study" }, { text: "in" }, { text: "Europe." }],
  [{ text: "Grow" }, { text: "from" }, { text: "strong" }, { text: "roots.", accent: true }],
];

// Back to front; depth drives parallax strength.
const ridges = [
  {
    depth: 0.15,
    from: "#F6B48A",
    to: "#EE9566",
    d: "M-100 560 L60 520 L180 545 L320 450 L440 515 L560 470 L690 540 L830 425 L960 515 L1090 455 L1210 525 L1330 465 L1540 520 V1400 H-100Z",
  },
  {
    depth: 0.35,
    from: "#D9774F",
    to: "#B85A3E",
    d: "M-100 650 L120 570 L250 620 L390 520 L520 610 L650 555 L770 630 L910 535 L1050 620 L1190 550 L1320 610 L1540 565 V1400 H-100Z",
  },
  {
    depth: 0.6,
    from: "#7A3F33",
    to: "#4E2B28",
    d: "M-100 745 L150 680 L300 730 L470 650 L640 735 L820 660 L990 745 L1160 675 L1320 735 L1540 690 V1400 H-100Z",
  },
  {
    depth: 0.9,
    from: "#2B1E1F",
    to: "#141012",
    d: "M-100 830 C200 770 420 805 640 795 C880 785 1100 745 1540 805 V1400 H-100Z",
  },
];

const clouds = [
  { x: 140, y: 170, s: 1.1, o: 0.85 },
  { x: 1060, y: 130, s: 1.3, o: 0.75 },
  { x: 560, y: 300, s: 0.7, o: 0.55 },
  { x: 1250, y: 330, s: 0.8, o: 0.6 },
];

const flightPath = "M-60 640 C 220 470, 480 330, 760 320 S 1240 210, 1520 110";

// What the journey covers: scattered around the graduate, then gathered into one list.
const steps = ["Find the right universities", "Unlock scholarships", "Plan your finances", "Prepare for exams", "Get visa ready"];
// Where each label floats before gathering, as [left %, top %] of the hero.
const scatter: [number, number][] = [
  [63, 50],
  [9, 62],
  [72, 38],
  [13, 46],
  [74, 64],
];
const LIST = { left: 71, top: 47, gap: 40 };

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance: landscape rises layer by layer, then the heading types itself up from a mask.
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.5 });
        tl.from("[data-ridge]", { y: 260, duration: 1.6, stagger: 0.12 })
          .from("[data-sun]", { y: 220, scale: 0.6, duration: 2, transformOrigin: "50% 50%" }, 0.1)
          .from("[data-cloud]", { autoAlpha: 0, x: -60, duration: 1.6, stagger: 0.15 }, 0.3)
          .from("[data-eyebrow]", { y: 20, autoAlpha: 0, duration: 0.9 }, 0.5)
          .from("[data-char]", { yPercent: 115, rotate: 12, duration: 1.1, stagger: 0.022 }, 0.6)
          .fromTo("[data-underline]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, "-=0.5")
          .from("[data-fade]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, "-=0.7");

        // Ambient: drifting clouds and a breathing sun.
        gsap.utils.toArray<SVGGElement>("[data-cloud]").forEach((c, i) => {
          gsap.to(c, { x: `+=${70 + i * 25}`, duration: 9 + i * 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
        gsap.to("[data-sun-glow]", { scale: 1.12, opacity: 0.75, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });

        // A plane draws its route across the sky, on loop.
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.5, delay: 2 })
          .set(["[data-trail]", "[data-plane]"], { opacity: 1 })
          .fromTo("[data-trail-mask]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 7, ease: "none" }, 0)
          .to(
            "[data-plane]",
            {
              motionPath: { path: "[data-flight]", align: "[data-flight]", alignOrigin: [0.5, 0.5], autoRotate: true },
              duration: 7,
              ease: "none",
            },
            0,
          )
          .to(["[data-trail]", "[data-plane]"], { opacity: 0, duration: 1 }, "+=0.2");

        // Pointer parallax.
        const movers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          movers.forEach((m) => m.x(-nx * 60 * m.depth));
        };
        window.addEventListener("pointermove", onMove);

        // Scroll parallax: the hero holds still while its layers travel at their own depth.
        // The sun sets, ridges rise and the graduate steps up from behind the cards, just under the text,
        // while his institute rises into the sunset behind him.
        // Everything moves; nothing fades.
        const scene = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=230%", pin: true, scrub: 0.6, invalidateOnRefresh: true },
        });
        scene
          .to("[data-content]", { y: -110, scale: 0.8, transformOrigin: "50% 0%", duration: 1, ease: "power1.inOut" }, 0)
          .to("[data-sunset]", { y: 120, duration: 1 }, 0)
          .to("[data-ridge-wrap]", { y: (i, el) => -60 - Number((el as HTMLElement).dataset.lift) * 90, duration: 1 }, 0)
          .to("[data-sky]", { y: 40, duration: 1 }, 0)
          .fromTo("[data-student]", { y: 0, yPercent: 100, scale: 0.92 }, { y: 0, yPercent: 0, scale: 1, transformOrigin: "50% 100%", duration: 0.75, ease: "power2.out" }, 0.2)
          .fromTo("[data-halo]", { scale: 0.4 }, { scale: 1, duration: 0.8, ease: "power2.out" }, 0.2)
          // The institute climbs out from behind the hills; the far tower lags for depth,
          // then the windows light up against the sunset.
          .fromTo("[data-institute]", { y: 420 }, { y: 0, duration: 0.85, ease: "power2.out" }, 0.25)
          .fromTo("[data-institute-far]", { y: 300 }, { y: 0, duration: 1, ease: "power2.out" }, 0.3)
          .fromTo("[data-institute-glow]", { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.8)
          .fromTo("[data-institute-mist]", { x: 160 }, { x: -80, duration: 1.2 }, 0.25);

        // Steps: each label sits in the list slot it will end in, offset out to its scattered spot.
        // They reveal while the graduate rises, drift gently, then glide home and join up.
        const hero = root.current!.firstElementChild as HTMLElement;
        const offset = (i: number) => ({
          x: ((scatter[i][0] - LIST.left) / 100) * hero.offsetWidth,
          y: ((scatter[i][1] - LIST.top) / 100) * hero.offsetHeight - i * LIST.gap,
        });
        const drift = { k: 1 };
        scene
          .fromTo("[data-step-text]", { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.3, stagger: 0.07, ease: "power3.out" }, 0.4)
          .fromTo("[data-step-dot]", { scale: 0 }, { scale: 1, duration: 0.25, stagger: 0.07, ease: "back.out(2)" }, 0.4)
          .fromTo(
            "[data-step]",
            { x: (i: number) => offset(i).x, y: (i: number) => offset(i).y },
            { x: 0, y: 0, duration: 0.45, stagger: 0.05, ease: "power3.inOut" },
            1.1,
          )
          .to(drift, { k: 0, duration: 0.35, ease: "power2.out" }, 1.1)
          .to("[data-step-dot]", {
            width: 14,
            height: 14,
            backgroundColor: (i: number) => (i === 0 ? "#F47A2A" : "#2A1A1C"),
            duration: 0.3,
            stagger: 0.05,
          }, 1.25)
          .fromTo("[data-steps-line]", { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: "power2.inOut" }, 1.4);

        // Slow, independent drift for each label while scattered; fades to stillness as they gather.
        const floats = gsap.utils.toArray<HTMLElement>("[data-step-float]");
        const bob = (time: number) => {
          floats.forEach((el, i) => {
            gsap.set(el, {
              x: Math.cos(time * 0.55 + i * 1.3) * 5 * drift.k,
              y: Math.sin(time * 0.8 + i * 1.7) * 8 * drift.k,
            });
          });
        };
        gsap.ticker.add(bob);

        return () => {
          window.removeEventListener("pointermove", onMove);
          gsap.ticker.remove(bob);
        };
      });
    },
    { scope: root },
  );

  return (
    // The padded wrapper is what pins, so the white gutter around the rounded scene stays put.
    <div ref={root} className="bg-white px-3 pt-3">
    <section className="relative h-[calc(100svh-24px)] min-h-[780px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FFF3E8_0%,#FFDDBF_38%,#FCB383_68%,#F58A45_100%)] sm:min-h-[800px]">
      {/* Sky: clouds + flight route */}
      <svg
        data-sky
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <mask id="trail-mask" maskUnits="userSpaceOnUse">
            <path
              data-trail-mask
              d={flightPath}
              fill="none"
              stroke="#fff"
              strokeWidth="8"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </mask>
          <filter id="cloud-blur" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <g data-depth="0.25">
          {clouds.map((c, i) => (
            <g key={i} data-cloud opacity={c.o} transform={`translate(${c.x} ${c.y}) scale(${c.s})`}>
              <g fill="#fff" filter="url(#cloud-blur)">
                <ellipse cx="0" cy="18" rx="120" ry="26" />
                <ellipse cx="-40" cy="2" rx="52" ry="34" />
                <ellipse cx="25" cy="-8" rx="62" ry="44" />
                <ellipse cx="80" cy="10" rx="44" ry="28" />
              </g>
            </g>
          ))}
        </g>

        <g data-depth="0.45">
          <path data-flight d={flightPath} fill="none" stroke="none" />
          <path
            data-trail
            opacity="0"
            d={flightPath}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.85"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="2 12"
            mask="url(#trail-mask)"
          />
          <g data-plane opacity="0">
            <g transform="translate(-16 -16)">
              <path
                d="M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z"
                fill="#141012"
              />
            </g>
          </g>
        </g>
      </svg>

      {/* Content */}
      <div
        data-content
        className="relative z-30 mx-auto flex max-w-5xl flex-col items-center px-6 pt-[clamp(120px,16vh,170px)] text-center"
      >
        <span
          data-eyebrow
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-1.5 text-[0.8rem] font-medium text-ink/75 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
            <span className="relative h-2 w-2 rounded-full bg-brand" />
          </span>
          Admissions open for 2027 intakes
        </span>

        <h1 className="mt-6 text-[clamp(2.5rem,6.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
          {headingLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <Fragment key={wi}>
                {wi > 0 && " "}
                <span className="relative inline-block">
                  <span className={`inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] ${word.accent ? "text-brand" : ""}`}>
                    {word.text.split("").map((ch, ci) => (
                      <span key={ci} data-char className="inline-block will-change-transform">
                        {ch}
                      </span>
                    ))}
                  </span>
                  {word.accent && (
                    <svg
                      viewBox="0 0 300 30"
                      preserveAspectRatio="none"
                      className="absolute -bottom-[0.14em] left-0 h-[0.22em] w-full overflow-visible"
                      aria-hidden
                    >
                      <path
                        data-underline
                        d="M4 20 C 70 6, 150 4, 296 14"
                        fill="none"
                        stroke="#141012"
                        strokeWidth="7"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray="1"
                      />
                    </svg>
                  )}
                </span>
                </Fragment>
              ))}
            </span>
          ))}
        </h1>

        <p data-fade className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink/70 sm:text-lg">
          Expert guidance from your first question to your first lecture — universities, applications, scholarships
          and visas, handled with care.
        </p>

        <div data-fade className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/consultation"
            className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(20,16,18,0.6)] transition-transform hover:-translate-y-0.5"
          >
            Book a free consultation
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <Link
            href="/countries"
            className="inline-flex h-12 items-center rounded-2xl border border-white bg-white/85 px-5 text-sm font-semibold text-ink backdrop-blur-md transition-colors hover:bg-white/80"
          >
            Explore countries
          </Link>
        </div>
      </div>

      {/* Landscape */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[50%] w-full"
        viewBox="0 380 1440 520"
        preserveAspectRatio="xMidYMin slice"
        overflow="visible"
        aria-hidden
      >
        <defs>
          {ridges.map((r, i) => (
            <linearGradient key={i} id={`ridge-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={r.from} />
              <stop offset="1" stopColor={r.to} />
            </linearGradient>
          ))}
          <radialGradient id="sun-glow">
            <stop offset="0" stopColor="#FFF4E2" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#FFD2A3" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFB37A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g data-depth="0.08">
          <g data-sunset>
          <g data-sun>
            <circle data-sun-glow cx="720" cy="480" r="260" fill="url(#sun-glow)" opacity="0.6" />
            <circle cx="720" cy="480" r="92" fill="#FFE6C7" />
          </g>
          </g>
        </g>

        {ridges.slice(0, -1).map((r, i) => (
          <g key={i} data-ridge-wrap data-lift={r.depth}>
            <g data-depth={r.depth}>
              <path data-ridge d={r.d} fill={`url(#ridge-${i})`} />
            </g>
          </g>
        ))}
      </svg>

      {/* The institute rises between the far ridges and the front hill */}
      <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
        <Campus />
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 h-[50%] w-full"
        viewBox="0 380 1440 520"
        preserveAspectRatio="xMidYMin slice"
        overflow="visible"
        aria-hidden
      >
        {ridges.slice(-1).map((r) => (
          <g key="front" data-ridge-wrap data-lift={r.depth}>
            <g data-depth={r.depth}>
              <path data-ridge d={r.d} fill={`url(#ridge-${ridges.length - 1})`} />
            </g>
          </g>
        ))}
      </svg>

      {/* Painterly grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{ backgroundImage: grain }}
      />

      {/* Curved reel of destinations and services */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#141012]/80 via-[#141012]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[25] h-[210px] sm:h-[290px]">
        <DestinationReel className="absolute inset-0" />
      </div>

      {/* Journey steps: scattered around the graduate, then gathered into a timeline list */}
      <div aria-label="How we help" className="pointer-events-none absolute inset-0 z-[28] hidden motion-reduce:hidden lg:block">
        <span
          data-steps-line
          aria-hidden
          className="absolute w-[2px] origin-top scale-y-0 rounded-full bg-[#2A1A1C]/80"
          style={{ left: `calc(${LIST.left}% + 6px)`, top: `calc(${LIST.top}% + 10px)`, height: (steps.length - 1) * LIST.gap }}
        />
        <ol>
          {steps.map((step, i) => (
            <li
              key={step}
              data-step
              className="absolute"
              style={{ left: `${LIST.left}%`, top: `calc(${LIST.top}% + ${i * LIST.gap}px)` }}
            >
              <div data-step-float className="flex h-5 items-center gap-3">
                <span className="flex w-[14px] justify-center">
                  <span data-step-dot className="block h-1.5 w-3 scale-0 rounded-full bg-brand" />
                </span>
                <span className="block overflow-hidden">
                  <span
                    data-step-text
                    className="block translate-y-full whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.06em] text-ink [text-shadow:0_1px_12px_rgba(255,236,214,0.9)]"
                  >
                    {step}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* The graduate: rises between the scenery and the text, in front of a warm halo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[56%] justify-center motion-reduce:hidden sm:h-[67%]">
        <div
          data-halo
          aria-hidden
          className="absolute left-1/2 top-[8%] -ml-[min(32vw,340px)] aspect-square w-[min(64vw,680px)] rounded-full bg-[radial-gradient(circle,rgba(255,244,226,0.95)_0%,rgba(255,200,150,0.55)_38%,rgba(244,122,42,0)_70%)]"
        />
        <Image
          data-student="center"
          src="/centerstudent.png"
          alt="Smiling graduate pointing to his diploma"
          width={1368}
          height={1150}
          loading="eager"
          sizes="(min-width: 640px) 70vw, 120vw"
          className="relative h-full w-auto max-w-none translate-y-full drop-shadow-[0_30px_50px_rgba(20,16,18,0.45)]"
        />
      </div>
    </section>
    </div>
  );
}
