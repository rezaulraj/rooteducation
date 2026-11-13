"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmbroideryBand from "./EmbroideryBand";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The Sydney Opera House at sunset. Free under the Unsplash License.
const PHOTO = "https://images.unsplash.com/photo-1771760171302-2d60b9a3576f?w=2400&q=80&auto=format&fit=crop";
// Where the Opera House sits in the photo (as fractions of the photo), and the photo's shape.
const OPERA = [0.49, 0.46];
const PHOTO_ASPECT = 1.5;
/** Where the Opera House lands on a stage of w × h, allowing for how object-cover crops the photo. */
function operaAt(w: number, h: number) {
  const pw = Math.max(w, h * PHOTO_ASPECT);
  const ph = Math.max(h, w / PHOTO_ASPECT);
  return [(w - pw) / 2 + OPERA[0] * pw, (h - ph) / 2 + OPERA[1] * ph];
}

// Dusk over the outback, golden wattle, and the green and gold.
const WATTLE = "#F6C21C";
const OCHRE = "#E07A3A";
const CREAM = "#FFF1DA";
const GUM = "#8FB59A";

const facts = [
  { label: "Capital", value: "Canberra" },
  { label: "Currency", value: "Australian dollar" },
  { label: "Language", value: "English" },
  { label: "Universities", value: "40+" },
];

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A sail of the Opera House: a curved shell with its tip at the top right. Half-width r, height SAIL_H × r. */
const SAIL_H = 2.3;
function sail(cx: number, cy: number, r: number) {
  const H = SAIL_H * r;
  const x0 = cx - r;
  const x1 = cx + r;
  const top = cy - H / 2;
  const bot = cy + H / 2;
  return `M${r1(x0)} ${r1(bot)}C${r1(x0)} ${r1(top + 0.35 * H)} ${r1(cx)} ${r1(top)} ${r1(x1)} ${r1(top)}C${r1(x1 - 0.15 * r)} ${r1(top + 0.4 * H)} ${r1(x1 - 0.05 * r)} ${r1(bot - 0.3 * H)} ${r1(x1)} ${r1(bot)}Z`;
}
const SAIL_BOX = sail(100, 115, 100);

/** An n-pointed star, as on the Australian flag. */
function star(cx: number, cy: number, R: number, n = 7) {
  const pts = Array.from({ length: n * 2 }, (_, i) => {
    const a = (i * Math.PI) / n - Math.PI / 2;
    const rad = i % 2 ? R * 0.45 : R;
    return `${r1(cx + Math.cos(a) * rad)} ${r1(cy + Math.sin(a) * rad)}`;
  });
  return `M${pts.join("L")}Z`;
}

// The Southern Cross, laid out as on the flag: Gamma top, Alpha bottom, Beta left, Delta right, Epsilon small.
const CROSS: [x: number, y: number, R: number, n: number][] = [
  [55, 6, 5, 7],
  [52, 94, 5.5, 7],
  [16, 48, 5, 7],
  [88, 38, 4.4, 7],
  [71, 63, 2.8, 5],
];

// A fixed scatter of background stars (seeded, so the server and browser agree).
const SKY = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 46 }, () => [Math.round(rnd() * 1000) / 10, Math.round(rnd() * 600) / 10, Math.round((0.5 + rnd() * 1.4) * 10) / 10]);
})();

/** A sprig of golden wattle: a stem, narrow leaves, and round blossoms that bloom. */
function Wattle() {
  const puffs: [number, number, number][] = [
    [118, 18, 7],
    [132, 30, 6],
    [104, 8, 5.5],
    [140, 14, 5],
    [96, 44, 6],
    [112, 56, 5],
    [70, 66, 6.5],
    [84, 80, 5],
    [56, 92, 5.5],
  ];
  return (
    <g>
      <path data-au-draw d="M0 170C30 140 60 110 90 70S130 20 150 4" fill="none" stroke="#7A8F4A" strokeWidth="2.2" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      <path data-au-draw d="M62 110C80 100 100 70 118 50" fill="none" stroke="#7A8F4A" strokeWidth="1.6" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      {[
        [30, 140, -35],
        [48, 122, 40],
        [76, 92, -30],
        [100, 60, 45],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <g data-au-leaf>
            <path d="M0 0C10-3 26-3 38 0C26 3 10 3 0 0Z" fill={i % 2 ? GUM : "#6E9A72"} />
          </g>
        </g>
      ))}
      {puffs.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g data-au-puff>
            <circle r={r} fill={WATTLE} />
            <circle r={r} fill="url(#au-fluff)" />
          </g>
        </g>
      ))}
    </g>
  );
}

export default function AustraliaHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-au-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-au-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-au-photo]")!;

      // The photo is clipped to the sail on the slot; `grow` takes it far past the stage edges.
      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        const far = Math.max(st.width, st.height) * 2.6;
        // Shrink the photo so the whole Opera House fits the sail, whatever the screen size.
        const peek = Math.min(0.6, (SAIL_H * (s.width / 2) * 1.25) / Math.max(st.height, st.width / PHOTO_ASPECT));
        return { cx, cy, r0: s.width / 2, far, peek };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        photo.style.clipPath = r < 0.5 ? "path('M0 0Z')" : `path('${sail(g.cx, g.cy, r)}')`;
      };
      // The photo box keeps the photo's own shape and is centred on the stage.
      gsap.set("[data-au-photo-img]", { xPercent: -50, yPercent: -50 });

      // The stars twinkle for everyone; it is gentle and decorative.
      gsap.utils.toArray<SVGElement>("[data-au-twinkle]").forEach((el, i) => {
        gsap.to(el, { opacity: 0.25, duration: 1.4 + (i % 5) * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: (i % 7) * 0.3 });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Arrival: the dunes rise, the Southern Cross is joined up, the wattle blooms, and the sail opens on Sydney.
        gsap
          .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
          .fromTo("[data-au-dune]", { yPercent: 100 }, { yPercent: 0, duration: 1.6, stagger: 0.12 }, 0)
          .fromTo("[data-au-sky] circle", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.8, stagger: { each: 0.015, from: "random" }, ease: "back.out(3)" }, 0.2)
          .fromTo("[data-au-star]", { scale: 0, rotation: -120, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: 1, stagger: 0.12, ease: "back.out(2)" }, 0.4)
          .fromTo("[data-au-cross-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.2, ease: "power2.inOut" }, 1)
          .fromTo("[data-au-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.3)
          .fromTo("[data-au-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.6)
          .fromTo("[data-au-draw]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.08 }, 0.5)
          .fromTo("[data-au-leaf]", { scale: 0, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.8, stagger: 0.06, ease: "back.out(2)" }, 1.1)
          .fromTo("[data-au-puff]", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.7, stagger: { each: 0.04, from: "random" }, ease: "back.out(3)" }, 1.3)
          .fromTo(win, { show: 0 }, { show: 1, duration: 1.5, ease: "expo.out", onUpdate: paint }, 0.8)
          .fromTo("[data-au-photo-img]", { scale: () => g.peek * 1.4 }, { scale: () => g.peek, duration: 2.4, ease: "power3.out" }, 0.8);

        // The wattle sways in a warm breeze.
        gsap.to("[data-au-sway]", { rotation: 2.5, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "0% 100%" });

        // Scroll: the sail opens out over the stage, the land and sky fall away, and the story rises over the harbour.
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
          .to("[data-au-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to("[data-au-land]", { yPercent: 110, duration: 0.25, ease: "power2.in" }, 0)
          .to("[data-au-wattle]", { autoAlpha: 0, y: 60, duration: 0.2, ease: "power2.in" }, 0)
          .to("[data-au-cross]", { autoAlpha: 0, y: -60, duration: 0.2, ease: "power2.in" }, 0)
          .to(win, { grow: 1, duration: 0.6, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-au-frame]", { scale: 2.6, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.05)
          // Before the dive the photo is scaled down and slid so the Opera House sits in the sail; it settles to full size,
          // faster than the sail grows so the photo always covers it.
          .fromTo(
            "[data-au-photo-img]",
            {
              scale: () => g.peek,
              x: () => g.cx - stage.offsetWidth / 2 - g.peek * (operaAt(stage.offsetWidth, stage.offsetHeight)[0] - stage.offsetWidth / 2),
              y: () => g.cy - stage.offsetHeight / 2 - g.peek * (operaAt(stage.offsetWidth, stage.offsetHeight)[1] - stage.offsetHeight / 2),
            },
            { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" },
            0.05,
          )
          .fromTo("[data-au-shade]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-au-final]", { autoAlpha: 1 }, 0.62)
          .fromTo("[data-au-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.64)
          .fromTo("[data-au-final-line]", { yPercent: 115 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.68)
          .fromTo("[data-au-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.78)
          .fromTo("[data-au-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.82)
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

      // Reduced motion: the destination photo and its details, without the dusk scene or the dive.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        photo.style.clipPath = "none";
        gsap.set("[data-au-intro], [data-au-frame], [data-au-land], [data-au-wattle], [data-au-cross]", { autoAlpha: 0 });
        gsap.set("[data-au-shade]", { opacity: 1 });
        gsap.set("[data-au-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-au-stage
        aria-labelledby="au-title"
        className="relative h-[calc(100svh-24px)] min-h-[700px] overflow-hidden rounded-[28px] text-white [container-type:size]"
        style={{ background: "linear-gradient(180deg, #121836 0%, #2A2453 38%, #6A3456 64%, #C2552B 86%, #E58A45 100%)" }}
      >
        <svg aria-hidden className="absolute h-0 w-0">
          <defs>
            <radialGradient id="au-fluff">
              <stop offset="0%" stopColor="#FFE58A" />
              <stop offset="70%" stopColor="#F6C21C" stopOpacity="0" />
              <stop offset="100%" stopColor="#C98A00" stopOpacity="0.6" />
            </radialGradient>
          </defs>
        </svg>

        {/* Stars, and the Southern Cross */}
        <svg data-au-sky aria-hidden viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-x-0 top-0 h-[70%] w-full">
          {SKY.map(([x, y, r], i) => (
            <circle key={i} data-au-twinkle cx={x} cy={y} r={r / 10} fill="#FFF6E0" />
          ))}
        </svg>
        <svg data-au-cross aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute left-[42%] top-[12%] z-[5] hidden h-[30svh] w-[30svh] overflow-visible md:block">
          <path data-au-cross-line d="M55 6L52 94" fill="none" stroke={CREAM} strokeWidth="0.4" strokeDasharray="1" pathLength={1} opacity="0.4" />
          <path data-au-cross-line d="M16 48L88 38" fill="none" stroke={CREAM} strokeWidth="0.4" strokeDasharray="1" pathLength={1} opacity="0.4" />
          {CROSS.map(([x, y, R, n], i) => (
            <path key={i} data-au-star d={star(x, y, R, n)} fill="#FFFFFF" style={{ filter: "drop-shadow(0 0 3px rgba(255,240,200,0.9))" }} />
          ))}
        </svg>

        {/* Golden wattle */}
        <div data-au-wattle aria-hidden className="pointer-events-none absolute right-0 top-14 z-[5] hidden w-[min(22vw,250px)] md:block">
          <svg viewBox="-10 -10 170 190" className="w-full overflow-visible">
            {/* Mirrored so the sprig reaches in from the right edge */}
            <g transform="translate(150 0) scale(-1 1)">
              <g data-au-sway>
                <Wattle />
              </g>
            </g>
          </svg>
        </div>

        {/* The photo, clipped to the sail */}
        <div data-au-photo className="absolute inset-0 z-10 [clip-path:path('M0_0Z')]">
          <div data-au-photo-img className="absolute left-1/2 top-1/2 h-[max(100cqh,66.67cqw)] w-[max(100cqw,150cqh)]">
            <Image src={PHOTO} alt="The Sydney Opera House at sunset over the harbour" fill preload sizes="100vw" className="object-cover" />
          </div>
          <div data-au-shade aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,28,0.85)_0%,rgba(10,12,28,0.5)_45%,rgba(10,12,28,0.1)_100%)] opacity-0" />
        </div>

        {/* Before the dive: the copy, and the sail-shaped window with its smaller shells */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-14 px-6 pb-44 pt-24 lg:grid-cols-[1fr_0.85fr] lg:gap-10 lg:pb-40">
          <div data-au-intro className="text-center lg:text-left">
            <p data-au-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm" style={{ color: WATTLE }}>
              <svg viewBox="-12 -12 24 24" className="h-6 w-6" aria-hidden>
                <path d={star(0, 0, 11, 7)} fill={WATTLE} />
              </svg>
              Study down under
            </p>
            <h1 id="au-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-au-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-au-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${WATTLE} 0%, #FFD98A 45%, ${OCHRE} 100%)` }}
                >
                  Australia
                </span>
              </span>
            </h1>
            <p data-au-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              Top-ranked universities, post-study work rights and an outdoor lifestyle, from harbour cities to the red centre.
            </p>
          </div>

          <div className="flex justify-center">
            <div data-au-slot className="relative aspect-[200/230] w-[min(44vw,24svh)] lg:w-[min(24vw,40svh)]">
              <svg data-au-frame viewBox="0 0 200 230" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                {/* A smaller shell beside it, as on the Opera House */}
                <path data-au-draw d={SAIL_BOX} transform="translate(-118 96) scale(0.58)" fill="none" stroke={CREAM} strokeWidth="2.4" opacity="0.55" pathLength={1} strokeDasharray="1" />
                <path data-au-draw d={SAIL_BOX} transform="translate(100 115) scale(1.06) translate(-100 -115)" fill="none" stroke={CREAM} strokeWidth="2" pathLength={1} strokeDasharray="1" />
                <path data-au-draw d={SAIL_BOX} transform="translate(100 115) scale(1.13) translate(-100 -115)" fill="none" stroke={WATTLE} strokeWidth="1" opacity="0.8" pathLength={1} strokeDasharray="1" />
                {/* The podium */}
                <path data-au-draw d="M-130 236H228" stroke={CREAM} strokeWidth="2" pathLength={1} strokeDasharray="1" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* The red centre: layered dunes and Uluru */}
        <div data-au-land aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[24%] min-h-[150px]">
          {/* A cross-stitched hem in wattle gold, ochre and gum green */}
          <div className="absolute inset-x-0 bottom-5 z-10 sm:bottom-7">
            <EmbroideryBand id="australia" colors={["#F6C21C", "#E07A3A", "#8FB59A"]} motifs={["star", "flower", "rhombus"]} />
          </div>
          <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
            <g data-au-dune>
              <path d="M0 120C200 90 360 110 560 96S980 70 1180 92S1380 104 1440 96V220H0Z" fill="#D9784A" opacity="0.55" />
            </g>
            <g data-au-dune>
              <path d="M860 128C880 92 900 76 960 72S1110 70 1150 80S1190 104 1206 128Z" fill="#9C3F1E" />
              <path d="M0 150C240 120 420 140 640 128S1040 110 1260 130S1400 140 1440 136V220H0Z" fill="#A9461F" />
            </g>
            <g data-au-dune>
              <path d="M0 176C220 150 460 168 700 160S1120 146 1440 166V220H0Z" fill="#6E2A14" />
            </g>
            <g data-au-dune>
              <path d="M0 200C260 184 540 196 820 192S1240 186 1440 196V220H0Z" fill="#3A160B" />
            </g>
          </svg>
        </div>

        {/* After the dive */}
        <div data-au-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#00843D", "#FFCD00"].map((c) => (
                <span key={c} data-au-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]" aria-hidden>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-au-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-au-final-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${WATTLE} 0%, #FFD98A 50%, ${OCHRE} 100%)` }}
                >
                  down under
                </span>
              </span>
            </p>
            <div data-au-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                World-class degrees, part-time work while you study and a post-study work visa, in some of the world&apos;s most liveable cities.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to Australia
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-au-fact>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{f.label}</dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
