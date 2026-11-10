"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PHOTO = "https://images.unsplash.com/photo-1669294841689-0ceb34ad40c1?w=2400&q=80&auto=format&fit=crop";
// Colours of the painted luzzu fishing boats.
const BLUE = "#0A8A9C"; // Blue Lagoon turquoise
const DEEP = "#064A5C";
const YELLOW = "#F2BE2E";
const RED = "#CF142B";
const GREEN = "#2E8B57";
const STONE = "#EAD3A6";

const facts = [
  { label: "Capital", value: "Valletta" },
  { label: "Currency", value: "Euro" },
  { label: "Languages", value: "Maltese & English" },
  { label: "In the EU", value: "Since 2004" },
];

/** The almond of the luzzu's "Eye of Osiris", centred on (cx, cy), half-width r, opened by k (0 shut, 1 open). */
function almond(cx: number, cy: number, r: number, k: number) {
  const h = r * 0.62 * k;
  return `M${cx - r} ${cy}C${cx - r * 0.45} ${cy - h} ${cx + r * 0.45} ${cy - h} ${cx + r} ${cy}C${cx + r * 0.45} ${cy + h} ${cx - r * 0.45} ${cy + h} ${cx - r} ${cy}Z`;
}

/** The eight-pointed Maltese cross. */
function MalteseCross({ className = "", color = RED }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {/* Four arms, each a wedge with the characteristic V-notch at its outer edge. */}
      {[0, 90, 180, 270].map((a) => (
        <path key={a} fill={color} d="M50 50 33 6 50 18 67 6Z" transform={`rotate(${a} 50 50)`} />
      ))}
    </svg>
  );
}

function Waves() {
  // Each band is two copies of one wave, so sliding it by half its width loops seamlessly.
  const wave = (y: number, amp: number) => {
    let d = `M0 ${y}`;
    for (let x = 0; x < 2400; x += 200) d += ` q50 ${-amp} 100 0 t100 0`;
    return `${d} V240 H0Z`;
  };
  const bands = [
    { color: BLUE, y: 40, amp: 16, speed: 18 },
    { color: YELLOW, y: 90, amp: 12, speed: 13 },
    { color: RED, y: 130, amp: 14, speed: 16 },
    { color: GREEN, y: 170, amp: 10, speed: 11 },
    { color: BLUE, y: 205, amp: 12, speed: 9 },
  ];
  return (
    <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="h-full w-full overflow-hidden" aria-hidden>
      {bands.map((b, i) => (
        <path key={i} data-mt-wave={b.speed} d={wave(b.y, b.amp)} fill={b.color} opacity={i === 0 ? 0.9 : 1} />
      ))}
    </svg>
  );
}

export default function MaltaHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-mt-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-mt-slot]")!;
      const hole = section.querySelector<SVGPathElement>("[data-mt-hole]")!;
      const lid = section.querySelector<SVGPathElement>("[data-mt-lid]")!;
      const lidInner = section.querySelector<SVGPathElement>("[data-mt-lid-inner]")!;

      const eye = { open: 0, grow: 0 };
      let g = { cx: 0, cy: 0, r0: 1, far: 1 };
      const measure = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        // Big enough that the almond's narrow height still covers every corner.
        const far = (Math.max(cx, st.width - cx) + Math.max(cy, st.height - cy) / 0.62) * 1.25;
        g = { cx, cy, r0: s.width / 2, far };
      };
      const paint = () => {
        const r = g.r0 + (g.far - g.r0) * eye.grow;
        hole.setAttribute("d", almond(g.cx, g.cy, r, eye.open));
        lid.setAttribute("d", almond(g.cx, g.cy, r * 1.06, Math.max(eye.open, 0.02)));
        lidInner.setAttribute("d", almond(g.cx, g.cy, r * 1.14, Math.max(eye.open, 0.02)));
      };

      gsap.utils.toArray<SVGPathElement>("[data-mt-wave]").forEach((w) => {
        gsap.fromTo(w, { x: 0 }, { x: -200, duration: Number(w.dataset.mtWave) / 5, ease: "none", repeat: -1 });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        measure();
        paint();

        // Arrival: the cross turns in, the heading rises, then the eye blinks open onto Valletta.
        gsap
          .timeline({ delay: 0.2, defaults: { ease: "expo.out" } })
          .fromTo("[data-mt-cross]", { rotation: -180, scale: 0 }, { rotation: 0, scale: 1, duration: 1.4 }, 0)
          .fromTo("[data-mt-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.1)
          .fromTo("[data-mt-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.4)
          .fromTo("[data-mt-sea-in]", { yPercent: 100 }, { yPercent: 0, duration: 1.6, ease: "power3.out" }, 0.2)
          .to(eye, { open: 1, duration: 1.1, ease: "power3.inOut", onUpdate: paint }, 0.7)
          .to(eye, { open: 0.08, duration: 0.14, ease: "power2.in", onUpdate: paint }, 2.1)
          .to(eye, { open: 1, duration: 0.3, ease: "power2.out", onUpdate: paint }, 2.24)
          .fromTo("[data-mt-photo-img]", { scale: 1.5 }, { scale: 1.2, duration: 2.4, ease: "power3.out" }, 0.7);

        // Scroll: the eye opens out to the edges; the sea and the stone fall away; the story rises.
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
                measure();
                paint();
              },
            },
          })
          .to("[data-mt-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          // Scroll moves the outer band and the arrival moves the inner one, so the two never fight.
          .to("[data-mt-sea]", { yPercent: 120, duration: 0.25, ease: "power2.in" }, 0)
          .to(eye, { grow: 1, open: 1, duration: 0.55, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-mt-lids]", { autoAlpha: 0, duration: 0.25 }, 0.1)
          .fromTo(
            "[data-mt-photo-img]",
            { x: () => g.cx - stage.offsetWidth / 2, y: () => g.cy - stage.offsetHeight / 2, scale: 1.2 },
            { x: 0, y: 0, scale: 1, duration: 0.6, ease: "power2.in", immediateRender: false },
            0.05,
          )
          .fromTo("[data-mt-shade], [data-mt-credit]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-mt-final]", { autoAlpha: 1 }, 0.6)
          .fromTo("[data-mt-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.62)
          .fromTo("[data-mt-final-line]", { yPercent: 110 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.66)
          .fromTo("[data-mt-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.76)
          .fromTo("[data-mt-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.8)
          .to({}, { duration: 0.1 });

        // Before the dive, the photo sits centred in the eye.
        gsap.set("[data-mt-photo-img]", { x: g.cx - stage.offsetWidth / 2, y: g.cy - stage.offsetHeight / 2 });

        const onResize = () => {
          measure();
          paint();
        };
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          section.classList.remove("pinned");
        };
      });

      // Reduced motion: the destination photo and its details, without the eye or the dive.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        measure();
        eye.open = 1;
        eye.grow = 1;
        paint();
        gsap.set("[data-mt-intro], [data-mt-lids], [data-mt-sea]", { autoAlpha: 0 });
        gsap.set("[data-mt-shade], [data-mt-credit]", { opacity: 1 });
        gsap.set("[data-mt-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/mt overflow-hidden bg-white px-3 pt-3">
      <section
        data-mt-stage
        aria-labelledby="mt-title"
        className="relative h-[calc(100svh-24px)] min-h-[680px] overflow-hidden rounded-[28px] text-ink"
        style={{ background: `radial-gradient(120% 90% at 70% 30%, #F6E7C8 0%, ${STONE} 55%, #D9B67C 100%)` }}
      >
        {/* Limestone grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* The photo, seen through the eye */}
        <div className="absolute inset-0 z-10">
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <clipPath id="mt-eye">
                <path data-mt-hole d="M0 0Z" />
              </clipPath>
            </defs>
            <foreignObject width="100%" height="100%" clipPath="url(#mt-eye)">
              <div className="relative h-full w-full">
                <div data-mt-photo-img className="absolute inset-0">
                  <Image src={PHOTO} alt="" fill preload sizes="100vw" className="object-cover" />
                </div>
                <div data-mt-shade className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,10,11,0.85)_0%,rgba(14,10,11,0.5)_45%,rgba(14,10,11,0.1)_100%)] opacity-0" />
              </div>
            </foreignObject>
            {/* Painted eyelids: a yellow rim and a dark outline, as on the boats */}
            <g data-mt-lids fill="none">
              <path data-mt-lid-inner d="M0 0Z" stroke={YELLOW} strokeWidth="7" />
              <path data-mt-lid d="M0 0Z" stroke="#141012" strokeWidth="9" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        {/* Before the dive */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-14 px-6 pb-44 pt-24 lg:grid-cols-[1fr_0.95fr] lg:gap-10 lg:pb-36">
          <div data-mt-intro className="text-center lg:text-left">
            <p data-mt-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm" style={{ color: RED }}>
              <span data-mt-cross className="block h-7 w-7">
                <MalteseCross className="h-full w-full" />
              </span>
              Studja f&apos;Malta
            </p>
            <h1 id="mt-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-mt-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-mt-line className="inline-block bg-clip-text pb-[0.06em] text-transparent" style={{ backgroundImage: `linear-gradient(100deg, ${DEEP} 0%, ${BLUE} 45%, #19B5C2 100%)` }}>
                  Malta
                </span>
              </span>
            </h1>
            <p data-mt-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-lg lg:mx-0">
              An English-speaking EU island in the heart of the Mediterranean, with sunshine, history and a growing economy.
            </p>
          </div>
          <div className="flex justify-center">
            <div data-mt-slot className="aspect-[1/0.62] w-[min(70vw,42svh)] lg:w-[min(34vw,60svh)]" />
          </div>
        </div>

        {/* The sea of luzzu colours */}
        <div data-mt-sea aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-32 sm:h-40">
          <div data-mt-sea-in className="h-full w-full">
            <Waves />
          </div>
        </div>

        {/* After the dive */}
        <div data-mt-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#FFFFFF", RED].map((c) => (
                <span key={c} data-mt-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p aria-hidden className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-mt-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-mt-final-line className="block text-brand">
                  by the Mediterranean
                </span>
              </span>
            </p>
            <div data-mt-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                EU-recognised degrees taught in English, a safe island community and easy access to the rest of Europe.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to Malta
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-mt-fact>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{f.label}</dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p data-mt-credit className="absolute right-4 top-24 z-30 text-[0.6rem] text-white/50 opacity-0 sm:right-6">
          Valletta · Photo: Michail Tsapas / Unsplash
        </p>
      </section>
    </div>
  );
}
