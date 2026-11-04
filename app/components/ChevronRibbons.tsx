"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const H = 120;
const indigo = "#6366F1";
const amber = "#FBB524";
const orange = "#F47A2A";
const peach = "#FFBC99";
const lilac = "#BFCBF5";

// [width, tip depth, colour] in a 120-unit-tall space. Deeper tips read as sharper arrows.
const segments: [number, number, string][] = [
  [360, 60, indigo],
  [270, 40, amber],
  [170, 25, orange],
  [260, 40, peach],
  [400, 60, indigo],
  [230, 40, amber],
  [340, 60, lilac],
  [190, 25, orange],
  [290, 40, peach],
  [380, 60, indigo],
  [210, 25, amber],
  [300, 40, orange],
];

/** A right-pointing arrow with softly rounded corners; its flat left edge sits under the previous tip. */
function chevron(w: number, tip: number) {
  const base = w - tip;
  return `M0 0H${base - 8}Q${base} 0 ${base + 6} 7L${w - 4} 53Q${w} 60 ${w - 4} 67L${base + 6} 113Q${base} 120 ${base - 8} 120H0Z`;
}

function Ribbon({ flip = false, offset = 0, tilt }: { flip?: boolean; offset?: number; tilt: number }) {
  const set = [...segments.slice(offset), ...segments.slice(0, offset)];
  const all = [...set, ...set];
  return (
    <div data-ribbon data-tilt={tilt} style={{ transform: `rotate(${tilt}deg)` }}>
      {/* Mirroring the whole row makes the second ribbon point and flow the other way. */}
      <div style={{ transform: flip ? "scaleX(-1)" : undefined }}>
        <div data-track className="flex w-max" style={{ height: "var(--h)" }}>
          {all.map(([w, tip, fill], i) => (
            <div
              key={i}
              data-seg
              className="relative shrink-0"
              style={{
                width: `calc(var(--h) * ${w / H})`,
                marginRight: `calc(var(--h) * ${-(tip + 2) / H})`,
                zIndex: all.length - i,
              }}
            >
              <svg viewBox={`0 0 ${w} ${H}`} className="block h-full w-full">
                <path d={chevron(w, tip)} fill={fill} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChevronRibbons() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const tracks = gsap.utils.toArray<HTMLElement>("[data-track]", section);
      gsap.set(tracks, { xPercent: -25 });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Assembly: each arrow flies in from above or below, spinning, and the ribbons level
        // out, finishing exactly as the page's scroll completes.
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 90%", end: "bottom bottom", scrub: 0.7 },
        });
        gsap.utils.toArray<HTMLElement>("[data-ribbon]", section).forEach((ribbon, r) => {
          const tilt = Number(ribbon.dataset.tilt);
          tl.fromTo(ribbon, { rotation: tilt + (r ? 9 : -9) }, { rotation: tilt, duration: 2, ease: "power1.inOut" }, 0).fromTo(
            ribbon.querySelectorAll("[data-seg]"),
            {
              y: (i: number) => (i % 2 ? 1 : -1) * section.offsetHeight * (0.7 + (i % 3) * 0.2),
              rotation: (i: number) => (i % 2 ? 26 : -26),
              scale: 0.7,
            },
            { y: 0, rotation: 0, scale: 1, duration: 0.8, ease: "power2.out", stagger: { amount: 1.2, from: "random" } },
            0,
          );
        });

        // Flow: a slow constant drift, boosted (and reversed) by how fast the page is scrolling.
        // Tracks hold two copies of the set, so wrapping at -50% is seamless.
        const wrap = gsap.utils.wrap(-50, 0);
        let pos = -25;
        let boost = 0;
        let visible = false;
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (visible = self.isActive),
          onUpdate: (self) => (boost = gsap.utils.clamp(-24, 24, self.getVelocity() / 90)),
        });
        const tick = (_: number, dt: number) => {
          if (!visible) return;
          boost *= 0.94;
          pos = wrap(pos + ((1.1 + boost) * dt) / 1000);
          gsap.set(tracks, { xPercent: pos });
        };
        gsap.ticker.add(tick);

        return () => {
          gsap.ticker.remove(tick);
          st.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-hidden
      className="relative flex min-h-[70svh] flex-col justify-center gap-1 overflow-hidden bg-white"
      style={{ "--h": "clamp(84px, 11vw, 200px)" } as CSSProperties}
    >
      <Ribbon tilt={-1.2} />
      <Ribbon tilt={-1.2} flip offset={5} />
    </section>
  );
}
