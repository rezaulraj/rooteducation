"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const CARD = "#3A0F10";
const PLATE = "#A9A6FF";

/** A fluffy cloud drawn from overlapping circles, with a warm shadow underneath. */
function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 110" className={className} aria-hidden>
      <defs>
        <linearGradient id="cloud-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCE8F4" />
        </linearGradient>
      </defs>
      <g fill="url(#cloud-shade)">
        <circle cx="62" cy="68" r="34" />
        <circle cx="104" cy="48" r="44" />
        <circle cx="152" cy="58" r="36" />
        <circle cx="188" cy="74" r="26" />
        <rect x="40" y="70" width="166" height="34" rx="17" />
      </g>
    </svg>
  );
}

// Cloud layers: [top, size, opacity, blur, drift seconds, scroll parallax]
const CLOUDS: [string, string, number, number, number, number][] = [
  ["8%", "w-[22rem]", 0.95, 0, 70, -30],
  ["30%", "w-[30rem]", 0.85, 2, 95, -55],
  ["58%", "w-[18rem]", 0.9, 0, 60, -20],
  ["74%", "w-[36rem]", 0.7, 6, 120, -80],
  ["44%", "w-[14rem]", 0.75, 1, 50, -10],
];
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&q=80&auto=format&fit=crop&crop=faces`;

// Placeholder stories: replace with real students' words, names, universities and photos (with their permission).
// Photos are free Unsplash portraits, used only as stand-ins.
const STORIES = [
  {
    quote: "From choosing a university to my visa interview, the team was with me at every step. I never felt lost, and I got my offer from my first-choice university.",
    name: "Arif Hossain",
    place: "Carol Davila University · Romania",
    photo: face("1611181355758-089959e2cfb2"),
  },
  {
    quote: "They found me a scholarship I didn't even know existed. My shortlist, SOP and finances were all planned out, so I could focus on getting ready to fly.",
    name: "Nadia Rahman",
    place: "University of Malta · Malta",
    photo: face("1749700332258-775b1b6b9cd5"),
  },
  {
    quote: "My journey was smooth from start to finish. The visa team responded quickly, my counsellor guided me clearly, and every question was handled with patience and care.",
    name: "Tasnim Akter",
    place: "University of Debrecen · Hungary",
    photo: face("1662850886700-4ec19bd30d11"),
  },
  {
    quote: "I wanted engineering in Europe on a real budget. Root showed me options I hadn't considered and helped me prepare every document before the deadline.",
    name: "Rafi Chowdhury",
    place: "University of Galway · Ireland",
    photo: face("1625241152315-4a698f74ceb7"),
  },
];
const DELAY = 6500;

function Seal() {
  const teeth = 24;
  const d = Array.from({ length: teeth * 2 }, (_, i) => {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const r = i % 2 ? 46 : 50;
    return `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`;
  }).join("L");
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_14px_20px_rgba(70,60,230,0.45)]" aria-hidden>
      <defs>
        <linearGradient id="seal-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8F86FF" />
          <stop offset="100%" stopColor="#4B3FE0" />
        </linearGradient>
        <path id="seal-text" d="M50 50m-33 0a33 33 0 1 1 66 0a33 33 0 1 1-66 0" />
      </defs>
      <path d={`M${d}Z`} fill="url(#seal-g)" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
      <g data-t-seal-text>
        <text fontSize="6.4" fontWeight="700" letterSpacing="1.6" fill="rgba(255,255,255,0.8)">
          <textPath href="#seal-text">VERIFIED STUDENT · ROOT EDUCATION ·</textPath>
        </text>
      </g>
      <circle cx="50" cy="50" r="22" fill="#5A4FF0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path data-t-tick d="M40 50.5l7 7 14-15" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" />
    </svg>
  );
}

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0); // the story we're moving to
  const [shown, setShown] = useState(0); // the story on screen
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const first = useRef(true);
  const s = STORIES[shown];

  // Leaving the current story: the quote lifts away and the portrait turns edge-on, then the next one is shown.
  const go = (to: number) => {
    const next = ((to % STORIES.length) + STORIES.length) % STORIES.length;
    if (next === shown || busy.current) return;
    setActive(next);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(next);
    busy.current = true;
    const q = root.current!;
    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
          setShown(next);
        },
      })
      .to(q.querySelectorAll("[data-t-word]"), { y: -14, autoAlpha: 0, duration: 0.3, stagger: 0.008, ease: "power2.in" }, 0)
      .to(q.querySelector("[data-t-portrait]"), { rotateY: 90, duration: 0.4, ease: "power2.in" }, 0)
      .to(q.querySelector("[data-t-seal]"), { scale: 0.4, rotation: -60, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0)
      .to(q.querySelectorAll("[data-t-plate]"), { rotation: -4, x: -6, duration: 0.45, ease: "power2.inOut", stagger: 0.05 }, 0)
      .to(q.querySelector("[data-t-tilt]"), { rotation: (window.innerWidth >= 768 ? -1 : 1), duration: 0.45, ease: "power2.inOut" }, 0);
  };

  // Advance on a timer. Hovering pauses it, and it resumes with the time it had left, in step with the timer line.
  const remaining = useRef(DELAY);
  useEffect(() => {
    remaining.current = DELAY;
  }, [shown]);
  useEffect(() => {
    if (paused) return;
    const started = Date.now();
    const t = setTimeout(() => go(shown + 1), remaining.current);
    return () => {
      clearTimeout(t);
      remaining.current = Math.max(0, remaining.current - (Date.now() - started));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, paused]);

  // Arriving: the portrait turns back, the quote writes itself in, the seal stamps down.
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline()
        .fromTo("[data-t-portrait]", { rotateY: -90 }, { rotateY: 0, duration: 0.7, ease: "back.out(1.4)" }, 0)
        .fromTo("[data-t-word]", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.025, ease: "power3.out" }, 0.1)
        .fromTo("[data-t-meta]", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.3)
        .to("[data-t-plate]", { rotation: 0, x: 0, duration: 0.9, ease: "elastic.out(1, 0.55)", stagger: 0.06 }, 0.1)
        .to("[data-t-tilt]", { rotation: () => (window.innerWidth >= 768 ? -2.5 : 0), duration: 0.9, ease: "elastic.out(1, 0.6)" }, 0.1)
        .fromTo("[data-t-photo]", { scale: 1.25, filter: "blur(6px)" }, { scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.1)
        .fromTo("[data-t-seal]", { scale: 1.8, rotation: 40, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(2.2)" }, 0.55)
        .fromTo("[data-t-tick]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, 0.9);
    },
    { scope: root, dependencies: [shown] },
  );

  // First appearance and ambient motion.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 70%" } })
          .fromTo("[data-t-eyebrow]", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" })
          .fromTo("[data-t-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" }, 0.1)
          .fromTo("[data-t-tag]", { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.7, stagger: 0.12, ease: "back.out(2.4)" }, 0.5)
          .fromTo("[data-t-plate]", { rotation: 10, scale: 0.85, autoAlpha: 0 }, { rotation: 0, scale: 1, autoAlpha: 1, duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.4)
          .fromTo("[data-t-card]", { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.5)
          .fromTo("[data-t-word]", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.025, ease: "power3.out" }, 0.9)
          .fromTo("[data-t-seal]", { scale: 1.8, rotation: 40, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(2.2)" }, 1.4)
          .fromTo("[data-t-tick]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45 }, 1.75)
          .fromTo("[data-t-nav]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 1.2);

        gsap.to("[data-t-seal-text]", { rotation: 360, svgOrigin: "50 50", duration: 18, ease: "none", repeat: -1 });
        gsap.to("[data-t-plane]", { x: 26, y: -18, rotation: -6, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        const W = () => root.current!.offsetWidth;
        CLOUDS.forEach(([, , , , secs], i) => {
          const el = root.current!.querySelector<HTMLElement>(`[data-t-drift="${i}"]`)!;
          // Start each cloud at a different point of its journey, then loop it across the full width.
          gsap.fromTo(
            el,
            { x: () => -el.offsetWidth },
            { x: () => W(), duration: secs, ease: "none", repeat: -1, delay: -secs * ((i * 0.37) % 1) },
          );
        });
        gsap.to("[data-t-bob]", { y: -10, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.9, from: "random" } });
        gsap.utils.toArray<HTMLElement>("[data-t-depth]").forEach((el) => {
          gsap.fromTo(el, { y: 0 }, { y: () => Number(el.dataset.tDepth) * 2.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.to("[data-t-glow]", { scale: 1.2, opacity: 0.7, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 2 });
        gsap.to("[data-t-float]", { y: -8, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.5 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="t-title"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #EEF4FA 30%, #D6E5F2 70%, #C3D8EB 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Warm light from the logo orange */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-t-glow className="absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-white/60 blur-[120px]" />
        <div data-t-glow className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#B9D3EC]/50 blur-[110px]" />
      </div>

      {/* A fine grid in the bottom-left corner */}
      <svg aria-hidden className="pointer-events-none absolute bottom-0 left-[8%] z-[1] hidden h-[48%] w-[24%] md:block" style={{ maskImage: "linear-gradient(90deg, transparent, black 25%, black 70%, transparent), linear-gradient(0deg, black 40%, transparent)", maskComposite: "intersect", WebkitMaskComposite: "source-in" }}>
        <defs>
          <pattern id="t-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#F0A070" strokeOpacity="0.7" strokeWidth="1" />
          </pattern>
        </defs>
        <rect data-t-grid width="100%" height="100%" fill="url(#t-grid)" />
      </svg>

      {/* Cloud layers: each drifts across the sky at its own pace, and moves with the scroll at its own depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {CLOUDS.map(([top, size, opacity, blur, , depth], i) => (
          <div key={i} data-t-depth={depth} className="absolute inset-x-0" style={{ top }}>
            <div data-t-drift={i} className={`absolute left-0 ${size}`} style={{ opacity, filter: blur ? `blur(${blur}px)` : undefined }}>
              <div data-t-bob>
                <Cloud className="h-auto w-full drop-shadow-[0_18px_24px_rgba(90,120,160,0.12)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-[2] mx-auto max-w-5xl">
        {/* Heading */}
        <div className="relative text-center">
          <p data-t-eyebrow className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-[#4F46E5]">
            <svg viewBox="0 0 26 18" className="h-[14px] w-[20px]" aria-hidden>
              <path d="M3 0H18Q20 0 21.3 1.6L25.4 7.6Q26.4 9 25.4 10.4L21.3 16.4Q20 18 18 18H3Q0 18 0 15V3Q0 0 3 0Z" fill="#4F46E5" />
            </svg>
            Testimonials
          </p>
          <h2 id="t-title" className="mt-4 text-[clamp(2rem,3.8vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.04em]" style={{ color: MAROON }}>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-t-line className="block">
                Hear From Students
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-t-line className="block">
                Who Want To Be Here
              </span>
            </span>
          </h2>
          {/* Floating tags */}
          <span aria-hidden className="absolute right-[12%] top-6 hidden md:block">
            <span data-t-tag className="block">
              <span data-t-float className="block bg-[#FFB321] px-4 py-1.5 pr-6 text-[0.7rem] font-bold uppercase tracking-wide text-[#2E1212] [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
                Scholarships
              </span>
            </span>
          </span>
          <span aria-hidden className="absolute left-[14%] top-[62%] hidden md:block">
            <span data-t-tag className="block">
              <span data-t-float className="grid h-9 w-11 place-items-center bg-[#6464FF] text-white [clip-path:polygon(0_0,75%_0,100%_50%,75%_100%,0_100%)]">
                <svg viewBox="0 0 24 24" className="-ml-1 h-4 w-4" fill="currentColor">
                  <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.2V16l6 3 6-3v-3.8l-6 3.3-6-3.3Z" />
                </svg>
              </span>
            </span>
          </span>
        </div>

        {/* The story: a slightly tilted pair of cards, each with its own plate behind it */}
        <div className="relative mx-auto mt-12 max-w-[42rem]" aria-live="polite">
          <div data-t-tilt className="relative md:-rotate-[2.5deg]">
            <div className="relative grid gap-5 md:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] md:gap-2.5 md:items-start">
              {/* Portrait card, sitting a little lower */}
              <figure data-t-card className="relative md:mt-5">
                <div aria-hidden className="absolute -left-5 -top-3 bottom-4 right-3 -rotate-[4deg] rounded-[20px]">
                  <div data-t-plate className="h-full w-full rounded-[24px]" style={{ background: PLATE, boxShadow: "0 30px 60px -30px rgba(80,70,200,0.35)" }} />
                </div>
                <div className="relative [perspective:900px]">
                  <div data-t-portrait className="flex flex-col rounded-[18px] p-3.5 pt-4 text-white shadow-[0_30px_60px_-30px_rgba(46,18,18,0.7)]" style={{ background: CARD }}>
                    <div className="relative mx-auto aspect-[4/5] w-full max-w-[8rem] overflow-hidden rounded-[50%] ring-4 ring-white/10">
                      <Image key={s.photo} data-t-photo src={s.photo} alt={`Portrait of ${s.name}`} fill unoptimized sizes="12rem" className="object-cover" />
                    </div>
                    <figcaption data-t-meta className="mt-4 px-1">
                      <span className="block text-sm font-semibold">{s.name}</span>
                      <span className="block text-[0.7rem] leading-snug text-white/60">{s.place}</span>
                    </figcaption>
                  </div>
                </div>
              </figure>

              {/* Quote card */}
              <div data-t-card className="relative">
                <div aria-hidden className="absolute -left-3 -right-3 -top-7 bottom-8 -rotate-[4.5deg] rounded-[22px]">
                  <div data-t-plate className="h-full w-full rounded-[26px]" style={{ background: PLATE, boxShadow: "0 40px 80px -40px rgba(80,70,200,0.35)" }} />
                </div>
                <div className="relative flex min-h-[15rem] items-center rounded-[18px] p-8 text-white shadow-[0_30px_60px_-30px_rgba(46,18,18,0.7)] sm:px-11 sm:py-10" style={{ background: CARD }}>
                  
                  <blockquote className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                    {`“${s.quote}”`.split(" ").map((w, i) => (
                      <span key={`${shown}-${i}`} data-t-word className="inline-block">
                        {w}&nbsp;
                      </span>
                    ))}
                  </blockquote>
                  {/* Verified seal */}
                  <div data-t-seal className="absolute -bottom-10 -right-6 h-24 w-24 sm:h-28 sm:w-28">
                    <Seal />
                  </div>
                </div>
              </div>
            </div>

            {/* Paper plane and confetti dots */}
            <svg data-t-plane aria-hidden viewBox="0 0 40 40" className="absolute -left-11 bottom-9 z-10 hidden h-12 w-12 -scale-x-100 drop-shadow-md md:block">
              <path d="M2 18 38 2 26 38 19 23Z" fill="#E6E8EE" />
              <path d="M19 23 38 2 12 21Z" fill="#9EA3B0" />
            </svg>
            <span aria-hidden className="absolute -left-12 bottom-24 hidden h-4 w-4 rounded-full bg-[#A9A6FF] md:block" />
            <span aria-hidden className="absolute -left-4 bottom-2 hidden h-2 w-2 rounded-full bg-[#4F46E5] md:block" />
            <span aria-hidden className="absolute -right-14 top-16 hidden h-2.5 w-2.5 rounded-full bg-[#F47A2A] md:block" />
          </div>
        </div>

        {/* Controls: ‹ 2/4 › with a slim timer line */}
        <div data-t-nav className="mt-20 flex flex-col items-center gap-3">
          <div className="flex items-center gap-5 text-[#2E1212]">
            <button type="button" onClick={() => go(active - 1)} aria-label="Previous story" className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-[#2E1212]/10">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <p className="min-w-[3rem] text-center font-mono text-sm tabular-nums" aria-live="polite">
              <span className="font-semibold">{active + 1}</span>
              <span className="text-[#2E1212]/50">/{STORIES.length}</span>
            </p>
            <button type="button" onClick={() => go(active + 1)} aria-label="Next story" className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-[#2E1212]/10">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
          <span aria-hidden className="relative h-[3px] w-24 overflow-hidden rounded-full bg-[#2E1212]/10">
            <span
              key={active}
              className="absolute inset-y-0 left-0 rounded-full bg-[#4F46E5]"
              style={{ animation: `t-progress ${DELAY}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
            />
          </span>
        </div>
      </div>
      <style>{`@keyframes t-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
