"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Back to front; depth drives pointer parallax.
const ridges = [
  { depth: 0.2, fill: "#F2A97C", d: "M-100 620 L120 540 L300 600 L470 500 L640 590 L830 490 L1010 590 L1190 510 L1540 600 V1000 H-100Z" },
  { depth: 0.45, fill: "#C96B46", d: "M-100 720 L180 630 L380 700 L580 610 L780 710 L990 620 L1210 710 L1540 640 V1000 H-100Z" },
  { depth: 0.8, fill: "#2B1E1F", d: "M-100 830 C240 760 520 810 760 790 C1020 770 1240 750 1540 810 V1000 H-100Z" },
];

const clouds = [
  { left: "6%", top: "20%", w: 260 },
  { left: "72%", top: "14%", w: 320 },
  { left: "82%", top: "46%", w: 200 },
];

function Globe() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id="nf-globe" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FFB27A" />
          <stop offset="0.55" stopColor="#F47A2A" />
          <stop offset="1" stopColor="#B8461A" />
        </radialGradient>
        <clipPath id="nf-globe-clip">
          <circle cx="200" cy="200" r="150" />
        </clipPath>
      </defs>

      <circle cx="200" cy="200" r="150" fill="url(#nf-globe)" />
      <g clipPath="url(#nf-globe-clip)" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.5">
        {/* Meridians widening and narrowing in turn read as the globe spinning. */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} data-meridian cx="200" cy="200" rx={40 + i * 35} ry="150" />
        ))}
        <path d="M50 200H350M68 130H332M68 270H332" />
      </g>

      {/* The lost plane circling, trailing a dashed route */}
      <g data-orbit>
        <circle cx="200" cy="200" r="186" fill="none" stroke="#141012" strokeOpacity="0.45" strokeWidth="2.5" strokeDasharray="3 12" strokeLinecap="round" />
        <g transform="translate(200 14) scale(1.5) translate(-16 -16)">
          <path d="M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z" fill="#141012" />
        </g>
      </g>
    </svg>
  );
}

export default function NotFoundScene() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.3 })
          .fromTo("[data-nf-ridge]", { y: 340 }, { y: 0, duration: 1.5, stagger: 0.12 }, 0)
          .fromTo("[data-nf-cloud]", { x: -90, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.5, stagger: 0.12 }, 0.2)
          .fromTo("[data-nf-four]", { yPercent: 115, rotation: 8 }, { yPercent: 0, rotation: 0, duration: 1.1, stagger: 0.18 }, 0.4)
          .fromTo("[data-nf-globe]", { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: 1.3, ease: "back.out(1.5)" }, 0.55)
          .fromTo("[data-nf-text]", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 1)
          // The stamp slams down and the digits recoil from the impact.
          .fromTo("[data-nf-stamp]", { scale: 3.2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.32, ease: "power4.in" }, 1.5)
          .fromTo("[data-nf-digits]", { y: 0 }, { y: 12, duration: 0.07, ease: "power2.out", yoyo: true, repeat: 3 }, 1.82);

        gsap.to("[data-orbit]", { rotation: 360, svgOrigin: "200 200", duration: 11, ease: "none", repeat: -1 });
        gsap.utils.toArray<SVGEllipseElement>("[data-meridian]").forEach((el, i) => {
          gsap.fromTo(el, { attr: { rx: 0 } }, { attr: { rx: 150 }, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: -i });
        });
        gsap.utils.toArray<HTMLElement>("[data-nf-cloud]").forEach((el, i) => {
          gsap.to(el.firstElementChild, { x: 50 + i * 20, duration: 9 + i * 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });

        // Pointer parallax: everything leans away from the cursor by its depth.
        const movers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(-nx * 70 * m.depth);
            m.y(-ny * 30 * m.depth);
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="nf-title"
      className="relative mx-3 my-3 flex min-h-[calc(100svh-24px)] flex-col items-center overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FFF3E8_0%,#FFDDBF_40%,#FCB383_72%,#F58A45_100%)] px-6 pb-16 pt-28 text-center sm:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {clouds.map((c, i) => (
          <div key={i} data-nf-cloud className="absolute" style={{ left: c.left, top: c.top, width: c.w }}>
            <div className="h-16 rounded-full bg-white/70 blur-xl" />
          </div>
        ))}
      </div>

      <svg aria-hidden viewBox="0 400 1440 400" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] w-full overflow-visible">
        {ridges.map((r) => (
          <g key={r.depth} data-depth={r.depth}>
            <path data-nf-ridge d={r.d} fill={r.fill} />
          </g>
        ))}
      </svg>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div data-depth="-0.35" className="relative">
          <div data-nf-digits className="flex items-center justify-center text-[clamp(7rem,25vw,19rem)] font-semibold leading-none tracking-[-0.05em] text-ink" aria-label="404">
            <span aria-hidden className="block overflow-hidden px-[0.04em] pb-[0.04em]">
              <span data-nf-four className="block">4</span>
            </span>
            <span aria-hidden data-nf-globe className="mx-[0.06em] block h-[0.86em] w-[0.86em]">
              <Globe />
            </span>
            <span aria-hidden className="block overflow-hidden px-[0.04em] pb-[0.04em]">
              <span data-nf-four className="block">4</span>
            </span>
          </div>

          <div aria-hidden className="absolute -right-2 top-[6%] rotate-[-12deg] sm:right-[-4%]">
            <div
              data-nf-stamp
              className="rounded-xl border-[3px] border-[#C8102E] bg-[#FFF3E8] px-3 py-1.5 text-center font-mono text-[0.62rem] font-bold uppercase leading-tight tracking-[0.14em] text-[#C8102E] sm:px-4 sm:py-2 sm:text-sm"
            >
              Destination
              <br />
              not found
            </div>
          </div>
        </div>

        <h1 id="nf-title" data-nf-text className="mt-6 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
          This flight lost its <span className="text-brand">route.</span>
        </h1>
        <p data-nf-text className="mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
          The page you&apos;re looking for has moved, or never took off. Let&apos;s get you back on course.
        </p>
        <div data-nf-text className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(20,16,18,0.6)]">
            Back to home
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-12 items-center rounded-2xl border border-white bg-white/85 px-5 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            Go back
          </button>
        </div>
      </div>
    </section>
  );
}
