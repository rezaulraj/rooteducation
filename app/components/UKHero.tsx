"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The Radcliffe Camera and the colleges of Oxford. Free under the Unsplash License.
const PHOTO = "https://images.unsplash.com/photo-1612563958093-2c3bcfbd8760?w=2400&q=80&auto=format&fit=crop";
// Where the Radcliffe Camera sits in the photo, as fractions of the stage.
const DOME = [0.49, 0.42];
const PHOTO_ASPECT = 1.74;
/** Where the dome lands on a stage of w × h, allowing for how object-cover crops the photo. */
function domeAt(w: number, h: number) {
  const pw = Math.max(w, h * PHOTO_ASPECT);
  const ph = Math.max(h, w / PHOTO_ASPECT);
  return [(w - pw) / 2 + DOME[0] * pw, (h - ph) / 2 + DOME[1] * ph];
}

const NAVY = "#0E1B33";
const GREEN = "#1F5A43";
const RED = "#C8102E";
const GOLD = "#E2B44C";
const CREAM = "#F6E7C1";

const facts = [
  { label: "Capital", value: "London" },
  { label: "Currency", value: "Pound sterling" },
  { label: "Language", value: "English" },
  { label: "Universities", value: "160+" },
];

// ---- Tartan: one "sett" of threads, the same in the warp (vertical) and the weft (horizontal). ----
const SETT = 180;
const threads: [pos: number, width: number, color: string, alpha: number][] = [
  [0, 46, GREEN, 0.55],
  [58, 14, "#000", 0.4],
  [84, 4, RED, 0.85],
  [96, 46, GREEN, 0.55],
  [150, 3, GOLD, 0.9],
  [160, 10, "#000", 0.4],
  [176, 2, "#FFFFFF", 0.35],
];

/** The pointed (equilateral) Gothic arch, centred on (cx, cy) with half-width r, as an SVG/CSS path. */
const ARCH_H = 2.63; // height ÷ half-width
function arch(cx: number, cy: number, r: number) {
  const top = cy - (ARCH_H * r) / 2;
  const bottom = cy + (ARCH_H * r) / 2;
  const spring = top + Math.sqrt(3) * r;
  const f = (n: number) => Math.round(n * 10) / 10;
  return `M${f(cx - r)} ${f(bottom)}L${f(cx - r)} ${f(spring)}A${f(2 * r)} ${f(2 * r)} 0 0 1 ${f(cx)} ${f(top)}A${f(2 * r)} ${f(2 * r)} 0 0 1 ${f(cx + r)} ${f(spring)}L${f(cx + r)} ${f(bottom)}Z`;
}
// The arch drawn in a 200 × 263 box, for the frame.
const ARCH_BOX = arch(100, 131.5, 100);

export default function UKHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-uk-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-uk-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-uk-photo]")!;

      // The photo is clipped to the arch on the slot; `grow` takes it far past the stage edges.
      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        // The arch narrows to a point, so it needs to be far bigger than the stage to cover the top corners.
        const far = Math.max(st.width, st.height) * 1.9;
        // Shrink the photo so the whole Radcliffe Camera fits the arch, whatever the screen size.
        const peek = Math.min(0.6, (ARCH_H * (s.width / 2)) / (0.8 * Math.max(st.height, st.width / PHOTO_ASPECT)));
        return { cx, cy, r0: s.width / 2, far, peek };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        // As it grows, the arch sinks so its point clears the top of the stage.
        const cy = g.cy + (ARCH_H * r * 0.3 - ARCH_H * g.r0 * 0.3) * win.grow;
        photo.style.clipPath = r < 0.5 ? "path('M0 0Z')" : `path('${arch(g.cx, cy, r)}')`;
      };
      // The photo box keeps the photo's own shape and is centred on the stage.
      gsap.set("[data-uk-photo-img]", { xPercent: -50, yPercent: -50 });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Arrival: the tartan is woven thread by thread, the arch is traced in gold, and it opens on Oxford.
        gsap
          .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
          .fromTo("[data-uk-warp]", { attr: { height: 0 } }, { attr: { height: SETT }, duration: 1.6, stagger: 0.08, ease: "power3.inOut" }, 0)
          .fromTo("[data-uk-weft]", { attr: { width: 0 } }, { attr: { width: SETT }, duration: 1.6, stagger: 0.08, ease: "power3.inOut" }, 0.25)
          .fromTo("[data-uk-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.3)
          .fromTo("[data-uk-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.6)
          .fromTo("[data-uk-draw]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.15 }, 0.4)
          .fromTo("[data-uk-pop]", { scale: 0, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.8, ease: "back.out(2.4)", stagger: 0.1 }, 1.4)
          .fromTo(win, { show: 0 }, { show: 1, duration: 1.5, ease: "expo.out", onUpdate: paint }, 0.9)
          .fromTo("[data-uk-photo-img]", { scale: () => g.peek * 1.4 }, { scale: () => g.peek, duration: 2.4, ease: "power3.out" }, 0.9)
          .fromTo("[data-uk-sew]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2.6, ease: "power1.inOut" }, 0.3)
          .fromTo("[data-uk-needle]", { left: "0%" }, { left: "100%", duration: 2.6, ease: "power1.inOut" }, 0.3)
          .to("[data-uk-needle]", { autoAlpha: 0, duration: 0.3 }, 2.9);

        // A slow shimmer of light across the cloth.
        gsap.fromTo("[data-uk-sheen]", { xPercent: -60 }, { xPercent: 60, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Scroll: the arch opens out over the stage, the cloth falls away, and the story rises over Oxford.
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
          .to("[data-uk-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to("[data-uk-band]", { yPercent: 160, duration: 0.2, ease: "power2.in" }, 0)
          .to(win, { grow: 1, duration: 0.6, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-uk-frame]", { scale: 2.6, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.05)
          // Before the dive the photo is scaled down and slid so the dome sits in the arch; it settles to full size as the arch opens,
          // faster than the arch grows so the photo always covers it.
          .fromTo(
            "[data-uk-photo-img]",
            {
              scale: () => g.peek,
              x: () => g.cx - stage.offsetWidth / 2 - g.peek * (domeAt(stage.offsetWidth, stage.offsetHeight)[0] - stage.offsetWidth / 2),
              y: () => g.cy - stage.offsetHeight / 2 - g.peek * (domeAt(stage.offsetWidth, stage.offsetHeight)[1] - stage.offsetHeight / 2),
            },
            { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" },
            0.05,
          )
          .fromTo("[data-uk-shade]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-uk-final]", { autoAlpha: 1 }, 0.62)
          .fromTo("[data-uk-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.64)
          .fromTo("[data-uk-final-line]", { yPercent: 115 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.68)
          .fromTo("[data-uk-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.78)
          .fromTo("[data-uk-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.82)
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

      // Reduced motion: the destination photo and its details, without the weaving or the dive.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        photo.style.clipPath = "none";
        gsap.set("[data-uk-intro], [data-uk-frame], [data-uk-needle], [data-uk-band]", { autoAlpha: 0 });
        gsap.set("[data-uk-shade]", { opacity: 1 });
        gsap.set("[data-uk-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-uk-stage
        aria-labelledby="uk-title"
        className="relative h-[calc(100svh-24px)] min-h-[700px] overflow-hidden rounded-[28px] text-white [container-type:size]"
        style={{ backgroundColor: NAVY }}
      >
        {/* Tartan cloth, woven on arrival */}
        <svg aria-hidden className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="uk-tartan" width={SETT} height={SETT} patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
              {threads.map(([p, w, c, a], i) => (
                <rect key={`v${i}`} data-uk-warp x={p} y={0} width={w} height={SETT} fill={c} opacity={a} />
              ))}
              {threads.map(([p, w, c, a], i) => (
                <rect key={`h${i}`} data-uk-weft x={0} y={p} width={SETT} height={w} fill={c} opacity={a} />
              ))}
            </pattern>
            {/* The diagonal twill of the weave */}
            <pattern id="uk-twill" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="1.4" height="4" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#uk-tartan)" />
          <rect width="100%" height="100%" fill="url(#uk-twill)" />
        </svg>
        {/* Depth: darker at the edges and behind the copy, and a soft moving sheen */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_72%_45%,transparent_0%,rgba(8,14,28,0.55)_70%),linear-gradient(90deg,rgba(8,14,28,0.85)_0%,rgba(8,14,28,0.45)_45%,transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div data-uk-sheen className="absolute inset-y-0 left-1/4 w-1/2 bg-[linear-gradient(100deg,transparent,rgba(255,236,190,0.08),transparent)]" />
        </div>

        {/* The photo, clipped to the Gothic arch */}
        <div data-uk-photo className="absolute inset-0 z-10 [clip-path:path('M0_0Z')]">
          {/* Sized to the photo's own shape (never cropped), at least as big as the stage */}
          <div data-uk-photo-img className="absolute left-1/2 top-1/2 h-[max(100cqh,57.5cqw)] w-[max(100cqw,174cqh)]">
            <Image src={PHOTO} alt="The Radcliffe Camera among the colleges of Oxford" fill preload sizes="100vw" className="object-cover" />
          </div>
          <div data-uk-shade aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,24,0.85)_0%,rgba(8,12,24,0.5)_45%,rgba(8,12,24,0.1)_100%)] opacity-0" />
        </div>

        {/* Before the dive: the copy, and the gold-traced arch */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-14 px-6 pb-40 pt-24 lg:grid-cols-[1fr_0.8fr] lg:gap-10 lg:pb-32">
          <div data-uk-intro className="text-center lg:text-left">
            <p data-uk-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm" style={{ color: GOLD }}>
              <span aria-hidden className="grid h-6 w-6 grid-cols-2 overflow-hidden rounded-[5px] ring-1 ring-white/20">
                <span style={{ background: GREEN }} />
                <span style={{ background: RED }} />
                <span style={{ background: RED }} />
                <span style={{ background: GREEN }} />
              </span>
              The United Kingdom
            </p>
            <h1 id="uk-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-uk-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-uk-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${GOLD} 0%, ${CREAM} 55%, ${GOLD} 100%)` }}
                >
                  the UK
                </span>
              </span>
            </h1>
            <p data-uk-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              World-ranked universities, one-year master&apos;s degrees and a post-study work visa, where centuries of learning meet modern city life.
            </p>
          </div>

          <div className="flex justify-center">
            <div data-uk-slot className="relative aspect-[200/263] w-[min(40vw,22svh)] lg:w-[min(22vw,36svh)]">
              <svg data-uk-frame viewBox="0 0 200 263" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                {/* Gold moulding, a fine inner line, and an outer shadow line */}
                <path data-uk-draw d={ARCH_BOX} transform="translate(100 131.5) scale(1.09) translate(-100 -131.5)" fill="none" stroke={GOLD} strokeWidth="2.6" pathLength={1} strokeDasharray="1" />
                <path data-uk-draw d={ARCH_BOX} transform="translate(100 131.5) scale(1.16) translate(-100 -131.5)" fill="none" stroke={CREAM} strokeWidth="0.8" pathLength={1} strokeDasharray="1" opacity="0.7" />
                <path data-uk-draw d={ARCH_BOX} transform="translate(100 131.5) scale(1.03) translate(-100 -131.5)" fill="none" stroke={CREAM} strokeWidth="0.6" pathLength={1} strokeDasharray="1" opacity="0.6" />
                {/* Pinnacles either side, and a trefoil finial at the point */}
                {[-24, 224].map((x) => (
                  <g key={x} transform={`translate(${x} 0)`}>
                    <path data-uk-draw d="M0 270V90" stroke={GOLD} strokeWidth="1.4" pathLength={1} strokeDasharray="1" />
                    <g transform="translate(0 90)">
                      <g data-uk-pop>
                        <path d="M0-26L6-6H-6Z" fill={GOLD} />
                        <circle cy="-28" r="3" fill={GOLD} />
                      </g>
                    </g>
                  </g>
                ))}
                <g transform="translate(100 -24)">
                  <g data-uk-pop>
                    {[0, 120, 240].map((a) => (
                      <circle key={a} cx={Math.round(Math.sin((a * Math.PI) / 180) * 70) / 10} cy={Math.round(-Math.cos((a * Math.PI) / 180) * 70) / 10} r="6" fill="none" stroke={GOLD} strokeWidth="1.6" />
                    ))}
                    <circle r="2.4" fill={GOLD} />
                  </g>
                </g>
                {/* A sill */}
                <path data-uk-draw d="M-36 278H236" stroke={GOLD} strokeWidth="2" pathLength={1} strokeDasharray="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* A tartan ribbon with gold edges, sewn in by a needle */}
        <div data-uk-band aria-hidden className="absolute inset-x-0 bottom-5 z-20 sm:bottom-7">
          <div data-uk-sew className="relative">
            <svg className="block w-full" height="40">
              <defs>
                <pattern id="uk-ribbon" width={SETT} height={SETT} patternUnits="userSpaceOnUse" patternTransform="scale(0.32)">
                  <rect width={SETT} height={SETT} fill={NAVY} />
                  {threads.map(([p, w, c, a], i) => (
                    <rect key={`v${i}`} x={p} y={0} width={w} height={SETT} fill={c} opacity={a} />
                  ))}
                  {threads.map(([p, w, c, a], i) => (
                    <rect key={`h${i}`} x={0} y={p} width={SETT} height={w} fill={c} opacity={a} />
                  ))}
                </pattern>
              </defs>
              <rect y="4" width="100%" height="32" fill="url(#uk-ribbon)" />
              <line x1="0" x2="100%" y1="3" y2="3" stroke={GOLD} strokeWidth="2" />
              <line x1="0" x2="100%" y1="37" y2="37" stroke={GOLD} strokeWidth="2" />
              <line x1="0" x2="100%" y1="8" y2="8" stroke={CREAM} strokeWidth="1" strokeDasharray="5 4" opacity="0.8" />
              <line x1="0" x2="100%" y1="32" y2="32" stroke={CREAM} strokeWidth="1" strokeDasharray="5 4" opacity="0.8" />
            </svg>
          </div>
          <div data-uk-needle className="absolute top-1/2 -ml-1 -mt-10 h-20 w-3 motion-reduce:hidden">
            <svg viewBox="0 0 12 80" className="h-full w-full overflow-visible" aria-hidden>
              <path d="M6 2 L8 70 L6 78 L4 70 Z" fill="#D9D4CC" />
              <ellipse cx="6" cy="9" rx="1.2" ry="3.5" fill={NAVY} />
              <path d="M6 9 C 0 30, -40 40, -900 42" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* After the dive */}
        <div data-uk-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#012169", "#FFFFFF", RED].map((c) => (
                <span key={c} data-uk-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]" aria-hidden>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-uk-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-uk-final-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${GOLD} 0%, ${CREAM} 60%, ${GOLD} 100%)` }}
                >
                  made in Britain
                </span>
              </span>
            </p>
            <div data-uk-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                Globally respected degrees, shorter courses that save you time and money, and the Graduate Route to work in the UK after you finish.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to the UK
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-uk-fact>
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
