"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The Hungarian Parliament on the Danube at sunset. Free under the Unsplash License.
const PHOTO = "https://images.unsplash.com/photo-1761157845019-11c2d237eb75?w=2400&q=80&auto=format&fit=crop";
// Where the Parliament's dome sits in the photo, as fractions of the stage.
const DOME = [0.47, 0.5];

// Matyó embroidery colours: vivid flowers stitched on black.
const RED = "#E0283E";
const PINK = "#F27BA5";
const BLUE = "#3E8FD8";
const YELLOW = "#F6C343";
const GREEN = "#3F9A57";
const LEAF = "#7BC86C";
const FELT = "#141011";

const facts = [
  { label: "Capital", value: "Budapest" },
  { label: "Currency", value: "Hungarian forint" },
  { label: "Language", value: "Hungarian" },
  { label: "In the EU", value: "Since 2004" },
];

// ---- Embroidered motifs. Each is drawn round (0, 0); a fine "satin" texture sits over the fills. ----

function Rose({ s = 1, outer = PINK }: { s?: number; outer?: string }) {
  return (
    <g transform={`scale(${s})`}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <circle key={i} cx={Math.round(Math.cos(a) * 1400) / 100} cy={Math.round(Math.sin(a) * 1400) / 100} r="6.2" fill={i % 2 ? outer : RED} />;
      })}
      <circle r="11.5" fill={RED} />
      <circle r="11.5" fill="url(#hu-satin)" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return <circle key={i} cx={Math.round(Math.cos(a) * 650) / 100} cy={Math.round(Math.sin(a) * 650) / 100} r="3.4" fill={YELLOW} />;
      })}
      <circle r="3.2" fill={FELT} />
      <circle r="1.3" fill={YELLOW} />
    </g>
  );
}

function Tulip({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 18V2" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M0 4C-10 2-13-8-10-18C-6-12-3-9 0-8Z" fill={PINK} />
      <path d="M0 4C10 2 13-8 10-18C6-12 3-9 0-8Z" fill={PINK} />
      <path d="M0 4C-6 0-6-12 0-20C6-12 6 0 0 4Z" fill={RED} />
      <path d="M0 4C-6 0-6-12 0-20C6-12 6 0 0 4Z" fill="url(#hu-satin)" />
      <circle cy="-4" r="2.2" fill={YELLOW} />
    </g>
  );
}

function Leaf({ s = 1, color = GREEN }: { s?: number; color?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 0C7-6 7-18 0-26C-7-18-7-6 0 0Z" fill={color} />
      <path d="M0 0C7-6 7-18 0-26C-7-18-7-6 0 0Z" fill="url(#hu-satin)" />
      <path d="M0-2V-22" stroke={FELT} strokeWidth="0.9" opacity="0.55" />
    </g>
  );
}

function Bud({ s = 1, color = BLUE }: { s?: number; color?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 0C-5-4-5-12 0-16C5-12 5-4 0 0Z" fill={color} />
      <circle cy="-8" r="1.6" fill={YELLOW} />
    </g>
  );
}

/** A motif placed at (x, y) and turned by r; the inner group is what GSAP blooms. */
function At({ x, y, r = 0, children, bloom = true }: { x: number; y: number; r?: number; children: React.ReactNode; bloom?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <g data-hu-bloom={bloom ? "" : undefined}>{children}</g>
    </g>
  );
}

const polar = (deg: number, rad: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [Math.round(Math.cos(a) * rad * 100) / 100, Math.round(Math.sin(a) * rad * 100) / 100];
};

/** The wreath round the photo window: roses at the four points, tulips between, leaves filling the gaps. */
function Wreath() {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < 8; i++) {
    const deg = i * 45;
    const [x, y] = polar(deg, 58);
    items.push(
      <At key={`m${i}`} x={x} y={y} r={i % 2 ? deg : 0}>
        {i % 2 ? <Tulip s={0.55} /> : <Rose s={0.52} outer={i % 4 ? BLUE : PINK} />}
      </At>,
    );
    for (const side of [-1, 1]) {
      const d = deg + side * 22.5;
      const [lx, ly] = polar(d, 56);
      items.push(
        <At key={`l${i}${side}`} x={lx} y={ly} r={d + side * 70}>
          <Leaf s={0.42} color={side > 0 ? GREEN : LEAF} />
        </At>,
      );
    }
  }
  return <>{items}</>;
}

/** A trailing spray: a stitched stem with leaves, buds and a rose at its tip. */
function Spray({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "translate(210 0) scale(-1 1)" : undefined}>
      <path data-hu-stem d="M0 210C40 170 50 120 95 95S170 40 200 10" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      <path data-hu-stem d="M70 112C60 80 72 55 60 30" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      <At x={40} y={168} r={-40}><Leaf s={0.8} /></At>
      <At x={58} y={140} r={60}><Leaf s={0.7} color={LEAF} /></At>
      <At x={120} y={84} r={-30}><Leaf s={0.75} color={LEAF} /></At>
      <At x={150} y={58} r={70}><Leaf s={0.7} /></At>
      <At x={60} y={30} r={-10}><Tulip s={1} /></At>
      <At x={98} y={100} r={20}><Bud s={1.1} color={BLUE} /></At>
      <At x={175} y={30} r={40}><Bud s={1} color={PINK} /></At>
      <At x={204} y={8}><Rose s={1.05} /></At>
    </g>
  );
}

// One repeat of the bottom border: a rose, a tulip, leaves and buds, between stitched rules.
const BAND_W = 150;
const BAND_H = 64;
function BandTile() {
  return (
    <>
      <At x={32} y={34} bloom={false}><Rose s={0.62} /></At>
      <At x={66} y={46} r={-55} bloom={false}><Leaf s={0.5} /></At>
      <At x={66} y={22} r={-125} bloom={false}><Leaf s={0.5} color={LEAF} /></At>
      <At x={98} y={42} bloom={false}><Tulip s={0.75} /></At>
      <At x={126} y={24} r={45} bloom={false}><Bud s={0.8} color={BLUE} /></At>
      <At x={126} y={48} r={135} bloom={false}><Bud s={0.8} color={PINK} /></At>
    </>
  );
}

export default function HungaryHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-hu-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-hu-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-hu-photo]")!;

      // The photo is clipped to a circle on the slot; `grow` takes it out past the stage corners.
      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        const far = Math.hypot(Math.max(cx, st.width - cx), Math.max(cy, st.height - cy));
        return { cx, cy, r0: s.width / 2, far };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        photo.style.clipPath = `circle(${r}px at ${g.cx}px ${g.cy}px)`;
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Arrival: the stems are stitched, every flower blooms, the window opens on Budapest, the border is sewn in.
        gsap
          .timeline({ delay: 0.2, defaults: { ease: "expo.out" } })
          .fromTo("[data-hu-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0)
          .fromTo("[data-hu-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.35)
          .fromTo("[data-hu-ring]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.15 }, 0.2)
          .fromTo(win, { show: 0 }, { show: 1, duration: 1.4, ease: "expo.out", onUpdate: paint }, 0.6)
          .fromTo("[data-hu-photo-img]", { scale: 1.6 }, { scale: 1.2, duration: 2.2, ease: "power3.out" }, 0.6)
          .fromTo("[data-hu-stem]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.1 }, 0.3)
          .fromTo(
            "[data-hu-bloom]",
            { scale: 0, rotation: -90, transformOrigin: "50% 50%" },
            { scale: 1, rotation: 0, duration: 1.1, ease: "back.out(1.8)", stagger: { each: 0.03, from: "random" } },
            0.7,
          )
          .fromTo("[data-hu-sew]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2.6, ease: "power1.inOut" }, 0.3)
          .fromTo("[data-hu-needle]", { left: "0%" }, { left: "100%", duration: 2.6, ease: "power1.inOut" }, 0.3)
          .to("[data-hu-needle]", { autoAlpha: 0, duration: 0.3 }, 2.9);

        // The wreath turns slowly, and the badge rose with it.
        gsap.to("[data-hu-wreath], [data-hu-emblem]", { rotation: 360, duration: 60, ease: "none", repeat: -1, svgOrigin: "0 0" });
        gsap.to("[data-hu-sway]", { rotation: 3, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "0% 100%" });

        // Scroll: the window opens to the edges, the embroidery falls away, and the story rises over Budapest.
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
          .to("[data-hu-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to("[data-hu-band]", { yPercent: 160, duration: 0.2, ease: "power2.in" }, 0)
          .to("[data-hu-spray-l]", { x: -160, y: 80, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
          .to("[data-hu-spray-r]", { x: 160, y: -80, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
          .to(win, { grow: 1, duration: 0.55, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-hu-frame]", { scale: 3.2, autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 0.05)
          .to("[data-hu-photo-img]", { scale: 1, duration: 0.6, ease: "power2.out" }, 0.05)
          // Before the dive the photo is slid so the dome sits in the window; it settles back as the window opens.
          .fromTo(
            "[data-hu-photo-img]",
            { x: () => g.cx - stage.offsetWidth * DOME[0], y: () => g.cy - stage.offsetHeight * DOME[1] },
            { x: 0, y: 0, duration: 0.55, ease: "power2.in" },
            0.05,
          )
          .fromTo("[data-hu-shade]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-hu-final]", { autoAlpha: 1 }, 0.6)
          .fromTo("[data-hu-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.62)
          .fromTo("[data-hu-final-line]", { yPercent: 115 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.66)
          .fromTo("[data-hu-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.76)
          .fromTo("[data-hu-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.8)
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
        gsap.set("[data-hu-intro], [data-hu-frame], [data-hu-needle], [data-hu-band], [data-hu-spray-l], [data-hu-spray-r]", { autoAlpha: 0 });
        gsap.set("[data-hu-shade]", { opacity: 1 });
        gsap.set("[data-hu-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-hu-stage
        aria-labelledby="hu-title"
        className="relative h-[calc(100svh-24px)] min-h-[700px] overflow-hidden rounded-[28px] text-white"
        style={{
          backgroundColor: FELT,
          // Black felt: a soft warm light and a fine weave.
          backgroundImage:
            "radial-gradient(70% 60% at 72% 45%, rgba(224,40,62,0.16) 0%, transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 4px)",
        }}
      >
        {/* Shared satin-stitch texture for the motifs */}
        <svg aria-hidden className="absolute h-0 w-0">
          <defs>
            <pattern id="hu-satin" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(55)">
              <rect width="1" height="2.4" fill="rgba(255,255,255,0.22)" />
            </pattern>
          </defs>
        </svg>

        {/* The photo, clipped to the round window */}
        <div data-hu-photo className="absolute inset-0 z-10 [clip-path:circle(0px_at_50%_50%)]">
          <div data-hu-photo-img className="absolute inset-0">
            <Image src={PHOTO} alt="The Hungarian Parliament on the Danube in Budapest at sunset" fill preload sizes="100vw" className="object-cover" />
          </div>
          <div data-hu-shade aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,10,11,0.85)_0%,rgba(14,10,11,0.5)_45%,rgba(14,10,11,0.1)_100%)] opacity-0" />
        </div>

        {/* Floral sprays in the corners */}
        <svg data-hu-spray-r aria-hidden viewBox="-20 -20 250 250" className="pointer-events-none absolute -right-6 top-16 z-[5] hidden w-[min(22vw,260px)] opacity-90 md:block">
          <g data-hu-sway>
            <Spray flip />
          </g>
        </svg>
        <svg data-hu-spray-l aria-hidden viewBox="-20 -20 250 250" className="pointer-events-none absolute -left-8 bottom-24 z-[5] hidden w-[min(26vw,200px)] opacity-80 sm:block lg:w-[150px] lg:opacity-90">
          <g data-hu-sway>
            <Spray />
          </g>
        </svg>

        {/* Before the dive: the copy, and the embroidered wreath round the window */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-16 px-6 pb-40 pt-24 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:pb-32">
          <div data-hu-intro className="text-center lg:text-left">
            <p data-hu-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F6C343] sm:text-sm">
              <svg viewBox="-24 -24 48 48" className="h-7 w-7" aria-hidden>
                <g data-hu-emblem>
                  <Rose s={1} />
                </g>
              </svg>
              Tanulj Magyarországon
            </p>
            <h1 id="hu-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hu-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-hu-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${RED} 0%, ${PINK} 55%, ${YELLOW} 100%)` }}
                >
                  Hungary
                </span>
              </span>
            </h1>
            <p data-hu-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-lg lg:mx-0">
              Medicine, engineering and business taught in English, in the heart of Europe, in a country whose culture is stitched in colour.
            </p>
          </div>

          <div className="flex justify-center">
            <div data-hu-slot className="relative aspect-square w-[min(46vw,27svh)] lg:w-[min(27vw,46svh)]">
              <svg data-hu-frame viewBox="-70 -70 140 140" className="pointer-events-none absolute -inset-[29.5%] h-[159%] w-[159%] overflow-visible" aria-hidden>
                <defs>
                  <mask id="hu-ring-a" maskUnits="userSpaceOnUse" x="-70" y="-70" width="140" height="140">
                    <path data-hu-ring d="M0-46A46 46 0 1 1 0 46A46 46 0 1 1 0-46" fill="none" stroke="#fff" strokeWidth="5" pathLength={1} strokeDasharray="1" />
                  </mask>
                  <mask id="hu-ring-b" maskUnits="userSpaceOnUse" x="-70" y="-70" width="140" height="140">
                    <path data-hu-ring d="M0 49A49 49 0 1 1 0-49A49 49 0 1 1 0 49" fill="none" stroke="#fff" strokeWidth="5" pathLength={1} strokeDasharray="1" />
                  </mask>
                </defs>
                <circle r="46" fill="none" stroke="#fff" strokeWidth="1.1" strokeDasharray="2.4 1.6" mask="url(#hu-ring-a)" />
                <circle r="49" fill="none" stroke={RED} strokeWidth="1" strokeDasharray="0.8 1.8" strokeLinecap="round" mask="url(#hu-ring-b)" />
                <g data-hu-wreath>
                  <Wreath />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* The embroidered border, sewn in by a needle */}
        <div data-hu-band aria-hidden className="absolute inset-x-0 bottom-5 z-20 sm:bottom-7">
          <div data-hu-sew className="relative">
            <svg className="block w-full" height={BAND_H}>
              <defs>
                <pattern id="hu-band" width={BAND_W} height={BAND_H} patternUnits="userSpaceOnUse">
                  <BandTile />
                </pattern>
              </defs>
              <line x1="0" x2="100%" y1="3" y2="3" stroke={RED} strokeWidth="2" strokeDasharray="6 4" />
              <line x1="0" x2="100%" y1={BAND_H - 3} y2={BAND_H - 3} stroke={GREEN} strokeWidth="2" strokeDasharray="6 4" />
              <rect y="6" width="100%" height={BAND_H - 12} fill="url(#hu-band)" />
            </svg>
          </div>
          <div data-hu-needle className="absolute top-1/2 -ml-1 -mt-10 h-20 w-3 motion-reduce:hidden">
            <svg viewBox="0 0 12 80" className="h-full w-full overflow-visible" aria-hidden>
              <path d="M6 2 L8 70 L6 78 L4 70 Z" fill="#C9C1B6" />
              <ellipse cx="6" cy="9" rx="1.2" ry="3.5" fill={FELT} />
              <path d="M6 9 C 0 30, -40 40, -900 42" fill="none" stroke={PINK} strokeWidth="1.2" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* After the dive */}
        <div data-hu-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#CE2939", "#FFFFFF", "#477050"].map((c) => (
                <span key={c} data-hu-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]" aria-hidden>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hu-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-hu-final-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${PINK} 0%, ${YELLOW} 100%)` }}
                >
                  in full bloom
                </span>
              </span>
            </p>
            <div data-hu-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                EU-recognised degrees, world-known medical schools and affordable living, from Budapest on the Danube to the university towns beyond.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to Hungary
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-hu-fact>
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
