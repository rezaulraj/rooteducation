"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Aphrodite's Rock (Petra tou Romiou) on the south-west coast. Free under the Unsplash License.
const PHOTO = "https://images.unsplash.com/photo-1758789791158-71e81950f70f?w=2400&q=80&auto=format&fit=crop";
// Where the rock sits in the photo, as fractions of the stage.
const ROCK = [0.36, 0.45];
const PHOTO_ASPECT = 1.5;
/** Where the rock lands on a stage of w × h, allowing for how object-cover crops the photo. */
function rockAt(w: number, h: number) {
  const pw = Math.max(w, h * PHOTO_ASPECT);
  const ph = Math.max(h, w / PHOTO_ASPECT);
  return [(w - pw) / 2 + ROCK[0] * pw, (h - ph) / 2 + ROCK[1] * ph];
}
// Before the dive the photo is shown smaller, so the whole rock and the sea fit in the window.
const PEEK_MAX = 0.5;

// Cyprus is the "copper island": copper and terracotta, white Lefkara lace, and the olive of its flag.
const COPPER = "#D57800";
const LACE = "#FFF8EE";
const GOLD = "#F4C77B";
const OLIVE_DARK = "#4E5B31";

const facts = [
  { label: "Capital", value: "Nicosia" },
  { label: "Currency", value: "Euro" },
  { label: "Languages", value: "Greek & Turkish" },
  { label: "In the EU", value: "Since 2004" },
];

const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (deg: number, rad: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${r2(Math.cos(a) * rad)} ${r2(Math.sin(a) * rad)}`;
};

/** The window: a regular octagon of radius r round (cx, cy), as a CSS polygon. */
function octagon(cx: number, cy: number, r: number) {
  return `polygon(${Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 + 22.5) * Math.PI) / 180;
    return `${cx + Math.cos(a) * r}px ${cy + Math.sin(a) * r}px`;
  }).join(",")})`;
}

// ---- Lefkara lace, drawn as thread: every path is stroked, and "drawn" by its dash offset. ----

const octPath = (rad: number) => `M${Array.from({ length: 8 }, (_, i) => pt(i * 45 + 22.5 + 90, rad)).join("L")}Z`;

/** A ring of triangles ("trigona"), alternately pointing out and in. */
function triangles(n: number, inner: number, outer: number) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 360;
    const w = 360 / n / 2;
    d += i % 2 ? `M${pt(a - w, outer)}L${pt(a, inner)}L${pt(a + w, outer)}Z` : `M${pt(a - w, inner)}L${pt(a, outer)}L${pt(a + w, inner)}Z`;
  }
  return d;
}

/** The zigzag "potamos" (river) band. */
function zigzag(n: number, inner: number, outer: number) {
  let d = `M${pt(0, inner)}`;
  for (let i = 1; i <= n * 2; i++) d += `L${pt((i / (n * 2)) * 360, i % 2 ? outer : inner)}`;
  return d;
}

/** The scalloped edge, each scallop a small arc. */
function scallops(n: number, rad: number) {
  const seg = 360 / n;
  const chord = 2 * rad * Math.sin((seg * Math.PI) / 360);
  let d = `M${pt(0, rad)}`;
  for (let i = 1; i <= n; i++) d += `A${r2(chord / 2)} ${r2(chord / 2)} 0 0 1 ${pt(i * seg, rad)}`;
  return d;
}

const circle = (rad: number) => `M${pt(0, rad)}A${rad} ${rad} 0 1 1 ${pt(180, rad)}A${rad} ${rad} 0 1 1 ${pt(0, rad)}`;

function Thread({ d, w = 0.7, color = LACE, dash }: { d: string; w?: number; color?: string; dash?: string }) {
  // A dashed thread is drawn through a mask-free trick: the drawing dash sits on a solid copy, the pattern on top.
  return dash ? (
    <path data-cy-thread d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />
  ) : (
    <path data-cy-draw d={d} fill="none" stroke={color} strokeWidth={w} strokeLinejoin="round" pathLength={1} strokeDasharray="1" />
  );
}

/** The lace medallion round the photo window. */
function Doily() {
  const picots = Array.from({ length: 32 }, (_, i) => pt((i + 0.5) * (360 / 32), 70.2));
  const eyelets = Array.from({ length: 16 }, (_, i) => pt(i * 22.5 + 11.25, 52));
  return (
    <>
      <g data-cy-spin-a>
        <Thread d={octPath(45.5)} w={1.1} />
        <Thread d={circle(48)} w={0.5} dash="0.6 1.4" />
        <Thread d={triangles(32, 49.5, 56)} w={0.55} />
        {eyelets.map((p, i) => (
          <circle key={i} data-cy-dot cx={p.split(" ")[0]} cy={p.split(" ")[1]} r="0.9" fill={LACE} />
        ))}
      </g>
      <g data-cy-spin-b>
        <Thread d={circle(57.5)} w={0.45} />
        <Thread d={zigzag(48, 59, 63.5)} w={0.55} />
        <Thread d={circle(65)} w={0.45} />
        <Thread d={scallops(32, 66.5)} w={0.75} />
        {picots.map((p, i) => (
          <circle key={i} data-cy-dot cx={p.split(" ")[0]} cy={p.split(" ")[1]} r="1" fill={LACE} />
        ))}
      </g>
    </>
  );
}

// One repeat of the lace border: a scalloped edge, a zigzag river and a row of triangles.
const BAND_W = 48;
const BAND_H = 46;
function BandTile() {
  return (
    <g fill="none" stroke={LACE} strokeLinejoin="round">
      <path d="M0 4H48" strokeWidth="1" strokeDasharray="1.5 2.5" strokeLinecap="round" />
      <path d="M0 18L12 8L24 18L36 8L48 18" strokeWidth="1" />
      <path d="M0 22H48" strokeWidth="0.8" />
      <path d="M2 24L10 32L18 24ZM26 24L34 32L42 24Z" strokeWidth="0.9" />
      <circle cx="10" cy="27" r="1" fill={LACE} stroke="none" />
      <circle cx="34" cy="27" r="1" fill={LACE} stroke="none" />
      <path d="M0 34H48" strokeWidth="0.8" />
      <path d="M0 36A12 12 0 0 0 24 36A12 12 0 0 0 48 36" strokeWidth="1.1" />
      <circle cx="12" cy="44" r="1.2" fill={LACE} stroke="none" />
      <circle cx="36" cy="44" r="1.2" fill={LACE} stroke="none" />
    </g>
  );
}

export default function CyprusHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-cy-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-cy-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-cy-photo]")!;

      // The photo is clipped to an octagon on the slot; `grow` takes it out past the stage corners.
      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        // An octagon's flat sides sit at cos(22.5°) of its radius, so it needs a little extra to reach the corners.
        const far = Math.hypot(Math.max(cx, st.width - cx), Math.max(cy, st.height - cy)) / Math.cos(Math.PI / 8);
        // How far to shrink the photo so the rock and some sea fit the window, whatever the screen size.
        const peek = Math.min(PEEK_MAX, (s.width * 1.8) / Math.max(st.width, st.height * PHOTO_ASPECT));
        return { cx, cy, r0: s.width / 2, far, peek };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        photo.style.clipPath = octagon(g.cx, g.cy, r);
      };
      // The photo box keeps the photo's own shape and is centred on the stage.
      gsap.set("[data-cy-photo-img]", { xPercent: -50, yPercent: -50 });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Arrival: the lace is worked ring by ring, the window opens on Aphrodite's Rock, olive branches grow, the border is sewn.
        gsap
          .timeline({ delay: 0.2, defaults: { ease: "expo.out" } })
          .fromTo("[data-cy-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0)
          .fromTo("[data-cy-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.35)
          .fromTo("[data-cy-frame] [data-cy-draw]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.12 }, 0.2)
          .fromTo("[data-cy-corner] [data-cy-draw]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.04 }, 0.4)
          .fromTo("[data-cy-thread]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, stagger: 0.2, ease: "power1.out" }, 0.6)
          .fromTo("[data-cy-dot]", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: { each: 0.012, from: "random" } }, 1.2)
          .fromTo(win, { show: 0 }, { show: 1, duration: 1.4, ease: "expo.out", onUpdate: paint }, 0.7)
          .fromTo("[data-cy-photo-img]", { scale: () => g.peek * 1.6 }, { scale: () => g.peek, duration: 2.2, ease: "power3.out" }, 0.7)
          .fromTo("[data-cy-sew]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2.6, ease: "power1.inOut" }, 0.3)
          .fromTo("[data-cy-needle]", { left: "0%" }, { left: "100%", duration: 2.6, ease: "power1.inOut" }, 0.3)
          .to("[data-cy-needle]", { autoAlpha: 0, duration: 0.3 }, 2.9);

        // The lace rings turn slowly, in opposite directions.
        gsap.to("[data-cy-spin-a]", { rotation: 360, duration: 90, ease: "none", repeat: -1, svgOrigin: "0 0" });
        gsap.to("[data-cy-spin-b]", { rotation: -360, duration: 120, ease: "none", repeat: -1, svgOrigin: "0 0" });
        gsap.to("[data-cy-sun]", { scale: 1.08, opacity: 0.85, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Scroll: the window opens to the edges, the lace falls away, and the story rises over the sea.
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
          .to("[data-cy-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to("[data-cy-band]", { yPercent: 160, duration: 0.2, ease: "power2.in" }, 0)
          .to("[data-cy-corner]", { autoAlpha: 0, scale: 1.3, duration: 0.2, ease: "power2.in" }, 0)
          .to(win, { grow: 1, duration: 0.55, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-cy-frame]", { scale: 3.2, autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 0.05)
          // Before the dive the photo is scaled down and slid so the rock sits in the window; it settles to full size as the window opens.
          .fromTo(
            "[data-cy-photo-img]",
            {
              scale: () => g.peek,
              x: () => g.cx - stage.offsetWidth / 2 - g.peek * (rockAt(stage.offsetWidth, stage.offsetHeight)[0] - stage.offsetWidth / 2),
              y: () => g.cy - stage.offsetHeight / 2 - g.peek * (rockAt(stage.offsetWidth, stage.offsetHeight)[1] - stage.offsetHeight / 2),
            },
            // Faster than the window grows, so the photo always covers it.
            { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" },
            0.05,
          )
          .fromTo("[data-cy-shade]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-cy-final]", { autoAlpha: 1 }, 0.6)
          .fromTo("[data-cy-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.62)
          .fromTo("[data-cy-final-line]", { yPercent: 115 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.66)
          .fromTo("[data-cy-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.76)
          .fromTo("[data-cy-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.8)
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

      // Reduced motion: the destination photo and its details, without the lace-making or the dive.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        win.show = 1;
        win.grow = 1;
        g = geometry();
        paint();
        gsap.set("[data-cy-intro], [data-cy-frame], [data-cy-needle], [data-cy-band], [data-cy-corner]", { autoAlpha: 0 });
        gsap.set("[data-cy-shade]", { opacity: 1 });
        gsap.set("[data-cy-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-cy-stage
        aria-labelledby="cy-title"
        className="relative h-[calc(100svh-24px)] min-h-[700px] overflow-hidden rounded-[28px] text-white [container-type:size]"
        style={{
          backgroundColor: "#4A200E",
          // Warm copper light and a fine linen weave.
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,240,220,0.035) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(255,240,220,0.035) 0 1px, transparent 1px 4px), radial-gradient(75% 70% at 70% 45%, #B4561D 0%, #7A3312 45%, #3A180A 100%)",
        }}
      >
        {/* The Mediterranean sun */}
        <div
          data-cy-sun
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[10%] h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
          style={{ background: `radial-gradient(circle, ${GOLD} 0%, rgba(244,199,123,0.25) 40%, transparent 68%)` }}
        />

        {/* Lace corners */}
        {(["left-0 top-0", "right-0 bottom-0 rotate-180"] as const).map((pos) => (
          <div key={pos} className={`pointer-events-none absolute ${pos} z-[5] h-44 w-44 sm:h-60 sm:w-60`} aria-hidden>
            <svg data-cy-corner viewBox="0 0 120 120" className="h-full w-full opacity-70">
              {[0, 1, 2].map((k) => (
                <path key={k} data-cy-draw d={`M0 ${30 + k * 22}A${30 + k * 22} ${30 + k * 22} 0 0 0 ${30 + k * 22} 0`} fill="none" stroke={LACE} strokeWidth={k === 2 ? 0.9 : 0.6} pathLength={1} strokeDasharray="1" />
              ))}
              {Array.from({ length: 7 }, (_, i) => {
                const a = ((i + 0.5) / 7) * (Math.PI / 2);
                const p = (rad: number) => `${r2(Math.cos(a) * rad)} ${r2(Math.sin(a) * rad)}`;
                return <path key={i} data-cy-draw d={`M${p(52)}L${p(74)}`} stroke={LACE} strokeWidth="0.6" pathLength={1} strokeDasharray="1" />;
              })}
              {Array.from({ length: 9 }, (_, i) => {
                const a = ((i + 0.5) / 9) * (Math.PI / 2);
                return <circle key={i} data-cy-dot cx={r2(Math.cos(a) * 80)} cy={r2(Math.sin(a) * 80)} r="1.3" fill={LACE} />;
              })}
            </svg>
          </div>
        ))}

        {/* The photo, clipped to the octagonal window */}
        <div data-cy-photo className="absolute inset-0 z-10 [clip-path:polygon(0_0,0_0,0_0)]">
          {/* Sized to the photo's 3:2 shape (never cropped), at least as big as the stage */}
          <div data-cy-photo-img className="absolute left-1/2 top-1/2 h-[max(100cqh,66.67cqw)] w-[max(100cqw,150cqh)]">
            <Image src={PHOTO} alt="Aphrodite's Rock, Petra tou Romiou, on the coast of Cyprus" fill preload sizes="100vw" className="object-cover" />
          </div>
          <div data-cy-shade aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,10,6,0.85)_0%,rgba(20,10,6,0.5)_45%,rgba(20,10,6,0.1)_100%)] opacity-0" />
        </div>

        {/* Before the dive: the copy, and the lace medallion round the window */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-16 px-6 pb-40 pt-24 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:pb-32">
          <div data-cy-intro className="text-center lg:text-left">
            <p data-cy-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm" style={{ color: GOLD }}>
              <svg viewBox="-12 -12 24 24" className="h-6 w-6" aria-hidden>
                <path d={octPath(10)} fill="none" stroke={GOLD} strokeWidth="1.4" />
                <path d={triangles(8, 3, 7)} fill="none" stroke={GOLD} strokeWidth="0.9" />
              </svg>
              <span lang="el">ΣΠΟΥΔΑΣΕ ΣΤΗΝ ΚΥΠΡΟ</span>
            </p>
            <h1 id="cy-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-cy-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-cy-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${GOLD} 0%, #FFE9C7 45%, ${COPPER} 100%)` }}
                >
                  Cyprus
                </span>
              </span>
            </h1>
            <p data-cy-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              English-taught, EU-recognised degrees on a sunny Mediterranean island, where lace-making and hospitality are centuries old.
            </p>
          </div>

          <div className="flex justify-center">
            <div data-cy-slot className="relative aspect-square w-[min(44vw,26svh)] lg:w-[min(24vw,40svh)]">
              <svg data-cy-frame viewBox="-80 -80 160 160" className="pointer-events-none absolute -inset-[38%] h-[176%] w-[176%] overflow-visible" aria-hidden>
                <Doily />
              </svg>
            </div>
          </div>
        </div>

        {/* The lace border, sewn in by a needle */}
        <div data-cy-band aria-hidden className="absolute inset-x-0 bottom-5 z-20 sm:bottom-7">
          <div data-cy-sew className="relative">
            <svg className="block w-full" height={BAND_H}>
              <defs>
                <pattern id="cy-band" width={BAND_W} height={BAND_H} patternUnits="userSpaceOnUse">
                  <BandTile />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cy-band)" />
            </svg>
          </div>
          <div data-cy-needle className="absolute top-1/2 -ml-1 -mt-10 h-20 w-3 motion-reduce:hidden">
            <svg viewBox="0 0 12 80" className="h-full w-full overflow-visible" aria-hidden>
              <path d="M6 2 L8 70 L6 78 L4 70 Z" fill="#E6DED2" />
              <ellipse cx="6" cy="9" rx="1.2" ry="3.5" fill="#4A200E" />
              <path d="M6 9 C 0 30, -40 40, -900 42" fill="none" stroke={LACE} strokeWidth="1" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* After the dive */}
        <div data-cy-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#FFFFFF", COPPER, OLIVE_DARK].map((c) => (
                <span key={c} data-cy-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]" aria-hidden>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-cy-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-cy-final-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${GOLD} 0%, #FFE9C7 50%, ${COPPER} 100%)` }}
                >
                  under the island sun
                </span>
              </span>
            </p>
            <div data-cy-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                English-taught degrees, an EU qualification and over 300 days of sunshine a year, from Nicosia to the coast.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to Cyprus
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-cy-fact>
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
