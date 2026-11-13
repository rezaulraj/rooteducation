"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmbroideryBand from "./EmbroideryBand";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Mitre Peak and Milford Sound, Fiordland. Free under the Unsplash License.
const PHOTO = "https://images.unsplash.com/photo-1775152052607-48028bea7938?w=2400&q=80&auto=format&fit=crop";
// The point of the photo to frame in the leaf (Mitre Peak and the water below it), and the photo's shape.
const FOCUS = [0.3, 0.46];
const PHOTO_ASPECT = 1.77;
/** Where the focus point lands on a stage of w × h, allowing for how object-cover crops the photo. */
function focusAt(w: number, h: number) {
  const pw = Math.max(w, h * PHOTO_ASPECT);
  const ph = Math.max(h, w / PHOTO_ASPECT);
  return [(w - pw) / 2 + FOCUS[0] * pw, (h - ph) / 2 + FOCUS[1] * ph];
}

const SILVER = "#DDE9E3";
const AURORA = "#7FE0C2";
const SKYBLUE = "#8FD3FF";

const facts = [
  { label: "Capital", value: "Wellington" },
  { label: "Currency", value: "NZ dollar" },
  { label: "Languages", value: "English, te reo Māori, NZSL" },
  { label: "Universities", value: "8" },
];

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A fern leaf: pointed at both ends, widest in the middle. Half-width r, height LEAF_H × r. */
const LEAF_H = 2.9;
function leaf(cx: number, cy: number, r: number) {
  const H = LEAF_H * r;
  const top = cy - H / 2;
  const bot = cy + H / 2;
  const w = 1.15 * r;
  return `M${r1(cx)} ${r1(top)}C${r1(cx + w)} ${r1(top + 0.3 * H)} ${r1(cx + w)} ${r1(bot - 0.3 * H)} ${r1(cx)} ${r1(bot)}C${r1(cx - w)} ${r1(bot - 0.3 * H)} ${r1(cx - w)} ${r1(top + 0.3 * H)} ${r1(cx)} ${r1(top)}Z`;
}
const LEAF_BOX = leaf(100, 145, 100);

/** A silver fern frond: a curving stem, pairs of leaflets from base to tip, and a koru unfurling at the end. */
function Frond() {
  const pairs = Array.from({ length: 11 }, (_, i) => {
    const t = i / 11;
    // Points along the stem, which curves from (0, 300) up towards (150, 30).
    const x = r1(150 * t * t * 0.4 + 150 * t * 0.6);
    const y = r1(300 - 270 * t);
    const len = r1(46 * (1 - t * 0.75));
    return { x, y, len, a: -60 + t * 30 };
  });
  return (
    <g>
      <path data-nz-draw d="M0 300C40 230 80 160 110 110S150 40 150 30" fill="none" stroke={SILVER} strokeWidth="2.4" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
      {pairs.map((p, i) =>
        [-1, 1].map((side) => (
          <g key={`${i}${side}`} transform={`translate(${p.x} ${p.y}) rotate(${p.a + side * 62})`}>
            <g data-nz-pinna>
              <path d={`M0 0C${r1(p.len * 0.3)} -5 ${r1(p.len * 0.7)} -5 ${p.len} 0C${r1(p.len * 0.7)} 4 ${r1(p.len * 0.3)} 4 0 0Z`} fill={side > 0 ? SILVER : "#B9D4C7"} opacity={0.92} />
            </g>
          </g>
        )),
      )}
      {/* The koru: the young frond still curled at the tip */}
      <path data-nz-draw d="M150 30C156 14 176 12 180 26C184 40 166 46 160 36C156 29 164 24 169 29" fill="none" stroke={SILVER} strokeWidth="2.2" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
    </g>
  );
}

export default function NewZealandHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-nz-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-nz-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-nz-photo]")!;

      // The photo is clipped to the leaf on the slot; `grow` takes it far past the stage edges.
      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        const far = Math.max(st.width, st.height) * 2.4;
        // Shrink the photo so Mitre Peak and the sound fit the leaf, whatever the screen size.
        const peek = Math.min(0.6, (LEAF_H * (s.width / 2) * 1.15) / Math.max(st.height, st.width / PHOTO_ASPECT));
        return { cx, cy, r0: s.width / 2, far, peek };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        photo.style.clipPath = r < 0.5 ? "path('M0 0Z')" : `path('${leaf(g.cx, g.cy, r)}')`;
      };
      gsap.set("[data-nz-photo-img]", { xPercent: -50, yPercent: -50 });

      // The long white clouds drift slowly across, and the aurora breathes. Gentle, so they run for everyone.
      gsap.utils.toArray<HTMLElement>("[data-nz-cloud]").forEach((el, i) => {
        gsap.fromTo(el, { xPercent: -30 - i * 10 }, { xPercent: 30 + i * 10, duration: 40 + i * 12, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      gsap.to("[data-nz-aurora]", { skewX: 8, xPercent: 6, opacity: 0.75, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 1.5 });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Arrival: the Alps rise, the clouds and aurora appear, the ferns unfurl, and the leaf opens on Milford Sound.
        gsap
          .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
          .fromTo("[data-nz-range]", { yPercent: 100 }, { yPercent: 0, duration: 1.7, stagger: 0.12 }, 0)
          .fromTo("[data-nz-aurora-wrap]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.4, ease: "power2.out" }, 0)
          .fromTo("[data-nz-cloud-wrap]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 2, stagger: 0.2, ease: "power2.out" }, 0.3)
          .fromTo("[data-nz-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.3)
          .fromTo("[data-nz-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.6)
          .fromTo("[data-nz-draw]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.1 }, 0.4)
          .fromTo("[data-nz-pinna]", { scale: 0, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.6, stagger: 0.025, ease: "back.out(2)" }, 0.8)
          .fromTo(win, { show: 0 }, { show: 1, duration: 1.5, ease: "expo.out", onUpdate: paint }, 0.8)
          .fromTo("[data-nz-photo-img]", { scale: () => g.peek * 1.4 }, { scale: () => g.peek, duration: 2.4, ease: "power3.out" }, 0.8);

        gsap.to("[data-nz-sway]", { rotation: 2, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "0% 100%" });

        // Scroll: the leaf opens out over the stage, the land and sky fall away, and the story rises over the fiord.
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
          .to("[data-nz-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to("[data-nz-alps]", { yPercent: 110, duration: 0.25, ease: "power2.in" }, 0)
          .to("[data-nz-fern]", { autoAlpha: 0, y: 60, duration: 0.2, ease: "power2.in" }, 0)
          .to(win, { grow: 1, duration: 0.6, ease: "power2.in", onUpdate: paint }, 0.05)
          .to("[data-nz-frame]", { scale: 2.6, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.05)
          // Before the dive the photo is scaled down and slid so Mitre Peak sits in the leaf; it settles to full size,
          // faster than the leaf grows so the photo always covers it.
          .fromTo(
            "[data-nz-photo-img]",
            {
              scale: () => g.peek,
              x: () => g.cx - stage.offsetWidth / 2 - g.peek * (focusAt(stage.offsetWidth, stage.offsetHeight)[0] - stage.offsetWidth / 2),
              y: () => g.cy - stage.offsetHeight / 2 - g.peek * (focusAt(stage.offsetWidth, stage.offsetHeight)[1] - stage.offsetHeight / 2),
            },
            { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" },
            0.05,
          )
          .fromTo("[data-nz-shade]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
          .set("[data-nz-final]", { autoAlpha: 1 }, 0.62)
          .fromTo("[data-nz-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" }, 0.64)
          .fromTo("[data-nz-final-line]", { yPercent: 115 }, { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" }, 0.68)
          .fromTo("[data-nz-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.78)
          .fromTo("[data-nz-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.82)
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

      // Reduced motion: the destination photo and its details, without the scene or the dive.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        photo.style.clipPath = "none";
        gsap.set("[data-nz-intro], [data-nz-frame], [data-nz-alps], [data-nz-fern]", { autoAlpha: 0 });
        gsap.set("[data-nz-shade]", { opacity: 1 });
        gsap.set("[data-nz-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-nz-stage
        aria-labelledby="nz-title"
        className="relative h-[calc(100svh-24px)] min-h-[700px] overflow-hidden rounded-[28px] text-white [container-type:size]"
        style={{ background: "linear-gradient(180deg, #0A1B2A 0%, #0F3140 40%, #17484C 70%, #22594F 100%)" }}
      >
        {/* Aurora australis */}
        <div data-nz-aurora-wrap aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] overflow-hidden">
          <div data-nz-aurora className="absolute -left-[10%] top-[6%] h-40 w-[70%] rotate-[-8deg] rounded-full opacity-50 blur-3xl" style={{ background: `linear-gradient(90deg, transparent, ${AURORA}, #4FB8A0, transparent)` }} />
          <div data-nz-aurora className="absolute right-[-10%] top-[16%] h-32 w-[60%] rotate-[6deg] rounded-full opacity-40 blur-3xl" style={{ background: "linear-gradient(90deg, transparent, #B48CFF, #FF8FC8, transparent)" }} />
        </div>

        {/* The long white clouds */}
        {[
          ["top-[30%]", "h-10 w-[46%]", "left-[2%]", 0.5],
          ["top-[44%]", "h-8 w-[38%]", "left-[40%]", 0.35],
          ["top-[56%]", "h-12 w-[55%]", "left-[18%]", 0.3],
        ].map(([top, size, left, op], i) => (
          <div key={i} data-nz-cloud-wrap aria-hidden className={`pointer-events-none absolute ${top} ${left} ${size}`}>
            <div data-nz-cloud className="h-full w-full rounded-full bg-white blur-2xl" style={{ opacity: op as number }} />
          </div>
        ))}

        {/* Silver fern fronds */}
        <div data-nz-fern aria-hidden className="pointer-events-none absolute bottom-20 left-0 z-[5] hidden w-[min(12vw,130px)] md:block">
          <svg viewBox="-20 -10 220 320" className="w-full overflow-visible">
            <g data-nz-sway>
              <Frond />
            </g>
          </svg>
        </div>
        <div data-nz-fern aria-hidden className="pointer-events-none absolute right-0 top-16 z-[5] hidden w-[min(14vw,150px)] md:block">
          <svg viewBox="-20 -10 220 320" className="w-full overflow-visible">
            <g transform="translate(180 0) scale(-1 1)">
              <g data-nz-sway>
                <Frond />
              </g>
            </g>
          </svg>
        </div>

        {/* The photo, clipped to the leaf */}
        <div data-nz-photo className="absolute inset-0 z-10 [clip-path:path('M0_0Z')]">
          <div data-nz-photo-img className="absolute left-1/2 top-1/2 h-[max(100cqh,56.5cqw)] w-[max(100cqw,177cqh)]">
            <Image src={PHOTO} alt="Mitre Peak rising above Milford Sound in Fiordland, New Zealand" fill preload sizes="100vw" className="object-cover" />
          </div>
          <div data-nz-shade aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,22,0.85)_0%,rgba(6,16,22,0.5)_45%,rgba(6,16,22,0.1)_100%)] opacity-0" />
        </div>

        {/* Before the dive */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-14 px-6 pb-44 pt-24 lg:grid-cols-[1fr_0.8fr] lg:gap-10 lg:pb-40">
          <div data-nz-intro className="text-center lg:text-left">
            <p data-nz-fade className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm" style={{ color: AURORA }}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                <path d="M6 20C8 14 12 9 18 5M9 15l-4-1M11 12l-4-2M13 10l-3-3M10 16l1 3M13 13l2 3M15 10l3 2" fill="none" stroke={AURORA} strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Kia ora, future student
            </p>
            <h1 id="nz-title" className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-nz-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-nz-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${SILVER} 0%, ${AURORA} 50%, ${SKYBLUE} 100%)` }}
                >
                  New Zealand
                </span>
              </span>
            </h1>
            <p data-nz-fade className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              Eight world-ranked universities, generous work rights and up to three years of post-study work, in the land of the long white cloud.
            </p>
          </div>

          <div className="flex justify-center">
            <div data-nz-slot className="relative aspect-[200/290] w-[min(36vw,20svh)] lg:w-[min(20vw,33svh)]">
              <svg data-nz-frame viewBox="0 0 200 290" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <path data-nz-draw d={LEAF_BOX} transform="translate(100 145) scale(1.07) translate(-100 -145)" fill="none" stroke={SILVER} strokeWidth="2.2" pathLength={1} strokeDasharray="1" />
                <path data-nz-draw d={LEAF_BOX} transform="translate(100 145) scale(1.15) translate(-100 -145)" fill="none" stroke={AURORA} strokeWidth="1" opacity="0.7" pathLength={1} strokeDasharray="1" />
                {/* The stem below the leaf */}
                <path data-nz-draw d="M100 300C100 318 94 330 84 340" fill="none" stroke={SILVER} strokeWidth="2.2" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* The Southern Alps */}
        <div data-nz-alps aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[26%] min-h-[160px]">
          {/* A cross-stitched hem in silver, aurora green and sky blue */}
          <div className="absolute inset-x-0 bottom-5 z-10 sm:bottom-7">
            <EmbroideryBand id="new-zealand" colors={["#DDE9E3", "#7FE0C2", "#8FD3FF"]} motifs={["star", "tree"]} />
          </div>
          <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
            <g data-nz-range>
              <path d="M0 150L120 90L210 130L330 50L430 120L540 70L660 140L780 40L900 110L1010 60L1130 130L1250 70L1360 120L1440 90V240H0Z" fill="#2F5E66" opacity="0.7" />
              {/* Snow on the high peaks */}
              <path d="M330 50L304 66L320 64L334 74L350 62L362 70ZM780 40L752 58L770 56L784 66L800 54L814 62ZM1010 60L986 75L1002 73L1014 82L1028 70L1040 78Z" fill="#F2F7F7" opacity="0.85" />
            </g>
            <g data-nz-range>
              <path d="M0 180L150 120L260 170L400 110L520 160L640 120L760 175L880 125L1000 170L1130 115L1260 165L1380 130L1440 150V240H0Z" fill="#214A4E" />
              <path d="M400 110L380 124L394 122L404 130L416 120L426 126ZM1130 115L1110 129L1124 127L1134 135L1146 125L1156 131Z" fill="#E6EFEF" opacity="0.8" />
            </g>
            <g data-nz-range>
              <path d="M0 210C200 190 360 205 560 196S960 184 1180 200S1380 206 1440 200V240H0Z" fill="#163633" />
            </g>
            <g data-nz-range>
              <path d="M0 228C280 218 560 226 860 222S1300 216 1440 224V240H0Z" fill="#0E2522" />
            </g>
          </svg>
        </div>

        {/* After the dive */}
        <div data-nz-final className="invisible absolute inset-0 z-30 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#012169", "#FFFFFF", "#C8102E"].map((c) => (
                <span key={c} data-nz-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]" aria-hidden>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-nz-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-nz-final-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${SILVER} 0%, ${AURORA} 50%, ${SKYBLUE} 100%)` }}
                >
                  in Aotearoa
                </span>
              </span>
            </p>
            <div data-nz-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                Every New Zealand university ranks in the world&apos;s top 3%, in a safe, welcoming country of mountains, lakes and coast.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to New Zealand
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-nz-fact>
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
