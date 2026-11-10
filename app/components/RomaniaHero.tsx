"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PHOTO = "https://images.unsplash.com/photo-1634491996455-a7a91dd17d4f?w=2400&q=80&auto=format&fit=crop";
// Where the castle sits in the photo, as fractions of the stage.
const CASTLE = [0.36, 0.5];
const RED = "#B3132B";
const BLACK = "#1A1214";

const facts = [
  { label: "Capital", value: "Bucharest" },
  { label: "Currency", value: "Romanian leu" },
  { label: "Language", value: "Romanian" },
  { label: "In the EU", value: "Since 2007" },
];

// ---- Cross-stitch motifs, in the red and black of the Romanian "ie" blouse ----
type Stitch = [x: number, y: number, color: string];
const C = 7; // one stitch cell, in px

/** The rhombus ("romb"): nested diamonds, red and black in turn. */
function rhombus(ox: number, oy: number): Stitch[] {
  const out: Stitch[] = [];
  for (let y = 0; y < 13; y++)
    for (let x = 0; x < 13; x++) {
      const d = Math.abs(x - 6) + Math.abs(y - 6);
      if (d === 6 || d === 2) out.push([ox + x, oy + y, RED]);
      else if (d === 4 || d === 0) out.push([ox + x, oy + y, BLACK]);
    }
  return out;
}

/** The eight-pointed star ("steaua"). */
function star(ox: number, oy: number): Stitch[] {
  const out: Stitch[] = [];
  for (let y = 0; y < 7; y++)
    for (let x = 0; x < 7; x++) {
      if (x === 3 && y === 3) out.push([ox + x, oy + y, RED]);
      else if (x === 3 || y === 3 || x === y || x + y === 6) out.push([ox + x, oy + y, x === 3 || y === 3 ? BLACK : RED]);
    }
  return out;
}

// One repeat of the band: borders top and bottom, a rhombus and a star between them.
const TILE_W = 24;
const TILE_H = 19;
const tile: Stitch[] = [
  ...Array.from({ length: TILE_W }, (_, x): Stitch => [x, 0, RED]),
  ...Array.from({ length: TILE_W / 2 }, (_, x): Stitch => [x * 2, 1, BLACK]),
  ...rhombus(0, 3),
  ...star(15, 6),
  ...Array.from({ length: TILE_W / 2 }, (_, x): Stitch => [x * 2 + 1, TILE_H - 2, BLACK]),
  ...Array.from({ length: TILE_W }, (_, x): Stitch => [x, TILE_H - 1, RED]),
];

function Stitches({ cells, size = C }: { cells: Stitch[]; size?: number }) {
  const p = size * 0.2;
  return cells.map(([x, y, color], i) => (
    <path
      key={i}
      d={`M${x * size + p} ${y * size + p}L${(x + 1) * size - p} ${(y + 1) * size - p}M${(x + 1) * size - p} ${y * size + p}L${x * size + p} ${(y + 1) * size - p}`}
      stroke={color}
      strokeWidth={size * 0.24}
      strokeLinecap="round"
    />
  ));
}

export default function RomaniaHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-ro-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-ro-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-ro-photo]")!;
      const band = section.querySelector<HTMLElement>("[data-ro-band]")!;

      // The photo is clipped to a rhombus centred on the slot; `grow` takes it to the stage corners.
      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        const r0 = s.width / 2;
        const far = Math.max(cx + cy, st.width - cx + cy, cx + st.height - cy, st.width - cx + st.height - cy);
        return { cx, cy, r0, far };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        photo.style.clipPath = `polygon(${g.cx}px ${g.cy - r}px, ${g.cx + r}px ${g.cy}px, ${g.cx}px ${g.cy + r}px, ${g.cx - r}px ${g.cy}px)`;
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Arrival: the needle stitches the band across, the rhombus is stitched round, the photo opens inside it.
        gsap
          .timeline({ delay: 0.2, defaults: { ease: "expo.out" } })
          .fromTo("[data-ro-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0)
          .fromTo("[data-ro-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.35)
          .fromTo("[data-ro-sew]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2.6, ease: "power1.inOut" }, 0.2)
          .fromTo("[data-ro-needle]", { left: "0%" }, { left: "100%", duration: 2.6, ease: "power1.inOut" }, 0.2)
          .to("[data-ro-needle]", { autoAlpha: 0, duration: 0.3 }, 2.8)
          .fromTo("[data-ro-outline-draw]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.2 }, 0.3)
          .fromTo(win, { show: 0 }, { show: 1, duration: 1.4, ease: "expo.out", onUpdate: paint }, 0.8)
          .fromTo("[data-ro-photo-img]", { scale: 1.5 }, { scale: 1.15, duration: 2.2, ease: "power3.out" }, 0.8);
        gsap.to("[data-ro-emblem]", { rotation: 360, duration: 24, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

        // Scroll: the rhombus opens out to the edges, the band falls away, and the story rises over the photo.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: "+=220%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onRefresh: () => {
                g = geometry();
                paint();
              },
            },
          })
          .to("[data-ro-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to(band, { yPercent: 140, duration: 0.2, ease: "power2.in" }, 0)
          .to(win, { grow: 1, duration: 0.55, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-ro-outline]", { scale: 3, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.05)
          .to("[data-ro-photo-img]", { scale: 1, duration: 0.6, ease: "power2.out" }, 0.05)
          // Before the dive the photo is slid so Peleș Castle sits in the rhombus; it settles back as the window opens.
          .fromTo(
            "[data-ro-photo-img]",
            { x: () => g.cx - stage.offsetWidth * CASTLE[0], y: () => g.cy - stage.offsetHeight * CASTLE[1] },
            { x: 0, y: 0, duration: 0.55, ease: "power2.in" },
            0.05,
          )
          .fromTo("[data-ro-shade], [data-ro-credit]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-ro-final]", { autoAlpha: 1 }, 0.6)
          .fromTo("[data-ro-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.62)
          .fromTo("[data-ro-final-line]", { yPercent: 110 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.66)
          .fromTo("[data-ro-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.76)
          .fromTo("[data-ro-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.8)
          .to({}, { duration: 0.1 });

        const onResize = () => {
          g = geometry();
          paint();
        };
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          section.classList.remove("pinned");
        };
      });

      // Reduced motion: the destination photo and its details, without the stitching or the dive.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        win.show = 1;
        win.grow = 1;
        g = geometry();
        paint();
        gsap.set("[data-ro-intro], [data-ro-outline], [data-ro-needle]", { autoAlpha: 0 });
        gsap.set(band, { yPercent: 140 });
        gsap.set("[data-ro-shade], [data-ro-credit]", { opacity: 1 });
        gsap.set("[data-ro-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/ro overflow-hidden bg-white px-3 pt-3">
      <section
        data-ro-stage
        aria-labelledby="ro-title"
        className="relative h-[calc(100svh-24px)] min-h-[680px] overflow-hidden rounded-[28px] bg-[#F6EEE2] text-ink"
        style={{
          // A hint of linen weave.
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(90,60,30,0.04) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(90,60,30,0.04) 0 1px, transparent 1px 4px)",
        }}
      >
        {/* The photo, clipped to the rhombus window */}
        <div data-ro-photo className="absolute inset-0 z-10 [clip-path:polygon(0_0,0_0,0_0,0_0)]">
          <div data-ro-photo-img className="absolute inset-0">
            <Image src={PHOTO} alt="Aerial view of Peleș Castle in the Carpathian forest, Sinaia, Romania" fill preload sizes="100vw" className="object-cover" />
          </div>
          <div data-ro-shade aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,10,11,0.85)_0%,rgba(14,10,11,0.55)_45%,rgba(14,10,11,0.1)_100%)] opacity-0" />
        </div>

        {/* Before the dive: the copy, and the stitched rhombus that holds the photo */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-14 px-6 pb-44 pt-24 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:pb-32">
          <div data-ro-intro className="text-center lg:text-left">
            <p data-ro-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm" style={{ color: RED }}>
              <svg data-ro-emblem viewBox={`0 0 ${7 * 4} ${7 * 4}`} className="h-6 w-6" aria-hidden>
                <Stitches cells={star(0, 0)} size={4} />
              </svg>
              Studiază în România
            </p>
            <h1 id="ro-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-ro-line className="block">Study in</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-ro-line className="block" style={{ color: RED }}>
                  Romania
                </span>
              </span>
            </h1>
            <p data-ro-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-lg lg:mx-0">
              Medicine, engineering and business, taught in English, in a country whose traditions are stitched into everyday life.
            </p>
          </div>

          <div className="flex justify-center">
            <div data-ro-slot className="relative aspect-square w-[min(50vw,30svh)] lg:w-[min(30vw,52svh)]">
              <svg data-ro-outline viewBox="0 0 100 100" className="pointer-events-none absolute -inset-[9%] h-[118%] w-[118%] overflow-visible" aria-hidden>
                <defs>
                  <mask id="ro-outline-mask-a" maskUnits="userSpaceOnUse">
                    <path data-ro-outline-draw d="M50 0L100 50L50 100L0 50Z" fill="none" stroke="#fff" strokeWidth="6" pathLength={1} strokeDasharray="1" />
                  </mask>
                  <mask id="ro-outline-mask-b" maskUnits="userSpaceOnUse">
                    <path data-ro-outline-draw d="M50 4L96 50L50 96L4 50Z" fill="none" stroke="#fff" strokeWidth="6" pathLength={1} strokeDasharray="1" />
                  </mask>
                </defs>
                <path d="M50 0L100 50L50 100L0 50Z" fill="none" stroke={RED} strokeWidth="1.4" strokeDasharray="2.2 1.4" mask="url(#ro-outline-mask-a)" />
                <path d="M50 4L96 50L50 96L4 50Z" fill="none" stroke={BLACK} strokeWidth="0.9" strokeDasharray="0.9 1.6" strokeLinecap="round" mask="url(#ro-outline-mask-b)" />
                {/* Hooks ("cârlige") at the four points */}
                {[
                  [50, -6],
                  [106, 50],
                  [50, 106],
                  [-6, 50],
                ].map(([x, y]) => (
                  // GSAP animates the inner group, so it can't overwrite the outer group's placement.
                  <g key={`${x}-${y}`} transform={`translate(${x - 6} ${y - 6})`}>
                    <g data-ro-fade>
                      <Stitches cells={star(0, 0)} size={12 / 7} />
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* The embroidered band, stitched in by a needle */}
        <div data-ro-band aria-hidden className="absolute inset-x-0 bottom-6 z-20 sm:bottom-8">
          <div data-ro-sew className="relative">
            <svg className="block w-full" height={TILE_H * C}>
              <defs>
                <pattern id="ro-band" width={TILE_W * C} height={TILE_H * C} patternUnits="userSpaceOnUse">
                  <Stitches cells={tile} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ro-band)" />
            </svg>
          </div>
          <div data-ro-needle className="absolute top-1/2 -ml-1 -mt-10 h-20 w-3 motion-reduce:hidden">
            <svg viewBox="0 0 12 80" className="h-full w-full" aria-hidden>
              <path d="M6 2 L8 70 L6 78 L4 70 Z" fill="#9C9389" />
              <ellipse cx="6" cy="9" rx="1.2" ry="3.5" fill="#F6EEE2" />
              <path d="M6 9 C 0 30, -40 40, -900 42" fill="none" stroke={RED} strokeWidth="1.2" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* After the dive */}
        <div data-ro-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#002B7F", "#FCD116", "#CE1126"].map((c) => (
                <span key={c} data-ro-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]" aria-hidden>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-ro-final-line className="block">Your future,</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-ro-final-line className="block text-brand">rooted here</span>
              </span>
            </p>
            <div data-ro-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                EU-recognised degrees, English-taught programmes and an affordable cost of living, from historic cities to the Carpathian mountains.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to Romania
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-ro-fact>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{f.label}</dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p data-ro-credit className="absolute right-4 top-24 z-30 text-[0.6rem] text-white/50 opacity-0 sm:right-6">
          Peleș Castle, Sinaia · Photo: Alex Sanislav / Unsplash
        </p>
      </section>
    </div>
  );
}
