"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Card =
  | { kind: "photo"; src: string; pos: string; bg?: string; contain?: boolean; label: string }
  | { kind: "doc"; label: string; icon: string; tone: string };

// Twenty cards: crops of the site's photos, mixed with designed document cards.
// The same few sources are reused, so the browser only downloads each once.
const cards: Card[] = [
  { kind: "photo", src: "/abroad.png", pos: "35% 35%", label: "Your journey" },
  { kind: "doc", label: "SOP", icon: "document", tone: "bg-[linear-gradient(160deg,#F7924F,#D9561A)] text-white" },
  { kind: "photo", src: "/consult.png", pos: "38% 40%", label: "One-to-one" },
  { kind: "photo", src: "/centerstudent.png", pos: "50% 100%", contain: true, bg: "bg-[linear-gradient(170deg,#FFE3CC,#F7924F)]", label: "Graduate" },
  { kind: "photo", src: "/study-abroad.png", pos: "18% 45%", label: "Dream big" },
  { kind: "doc", label: "Transcripts", icon: "document", tone: "bg-white text-ink" },
  { kind: "photo", src: "/abroad.png", pos: "70% 55%", label: "Destinations" },
  { kind: "photo", src: "/consult.png", pos: "80% 45%", label: "Advice" },
  { kind: "doc", label: "Passport", icon: "passport", tone: "bg-[linear-gradient(160deg,#2A2023,#141012)] text-white" },
  { kind: "photo", src: "/rightstudent-cutout.png", pos: "50% 100%", contain: true, bg: "bg-[linear-gradient(170deg,#2A2023,#5A2A1A)]", label: "Your big day" },
  { kind: "photo", src: "/study-abroad-consultation.png", pos: "10% 60%", label: "Together" },
  { kind: "doc", label: "IELTS", icon: "scholarship", tone: "bg-[linear-gradient(160deg,#FFF0E3,#FFC79E)] text-ink" },
  { kind: "photo", src: "/abroad.png", pos: "12% 40%", label: "Friends" },
  { kind: "photo", src: "/study-abroad.png", pos: "75% 30%", label: "Take off" },
  { kind: "doc", label: "LOR", icon: "university", tone: "bg-[linear-gradient(160deg,#F7924F,#D9561A)] text-white" },
  { kind: "photo", src: "/consult.png", pos: "15% 25%", label: "Your plan" },
  { kind: "photo", src: "/study-abroad-consultation.png", pos: "88% 40%", label: "The world" },
  { kind: "doc", label: "Offer", icon: "plane", tone: "bg-white text-ink" },
  { kind: "photo", src: "/abroad.png", pos: "90% 70%", label: "Landmarks" },
  { kind: "photo", src: "/study-abroad.png", pos: "45% 60%", label: "Campus life" },
];
const N = cards.length;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
// Fixed pseudo-random scatter, so server and browser agree and every visit opens the same way.
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function ApplicationHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-ah-stage]")!;
      const els = gsap.utils.toArray<HTMLElement>("[data-ah-card]", section);
      const state = { phase: "scatter" as "scatter" | "line" | "circle", morph: 0, roll: 0, px: 0 };

      // Each card chases its target with a soft, spring-like follow.
      const follow = (instant: boolean) =>
        els.map((el) =>
          (["x", "y", "rotation", "scaleX", "scaleY", "opacity"] as const).reduce(
            (acc, p) => ({ ...acc, [p]: instant ? (v: number) => gsap.set(el, { [p]: v }) : gsap.quickTo(el, p, { duration: 1.4, ease: "power3.out" }) }),
            {} as Record<"x" | "y" | "rotation" | "scaleX" | "scaleY" | "opacity", (v: number) => void>,
          ),
        );

      const targets = (i: number) => {
        const W = stage.offsetWidth;
        const H = stage.offsetHeight;
        const mobile = W < 768;
        if (state.phase === "scatter") {
          return { x: (rand(i, 1) - 0.5) * 1500, y: (rand(i, 2) - 0.5) * 1000, rotation: (rand(i, 3) - 0.5) * 180, scale: 0.6, opacity: 0 };
        }
        if (state.phase === "line") {
          const spacing = mobile ? 44 : 70;
          return { x: i * spacing - (N * spacing) / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
        }
        // Circle, morphing into a rainbow arch along the bottom as you scroll.
        const radius = Math.min(Math.min(W, H) * 0.35, 350);
        const ca = (i / N) * 360;
        const circle = { x: Math.cos((ca * Math.PI) / 180) * radius, y: Math.sin((ca * Math.PI) / 180) * radius, rotation: ca + 90 };

        const arcR = Math.min(W, H * 1.5) * (mobile ? 1.4 : 1.1);
        // Offsets are from the middle of the stage: the arch's peak sits a quarter-height below it.
        const centreY = H * (mobile ? 0.35 : 0.25) + arcR;
        const spread = mobile ? 100 : 130;
        const start = -90 - spread / 2;
        const aa = start + (i * spread) / (N - 1) - state.roll * spread * 0.8 + spread * 0.4;
        const ar = (aa * Math.PI) / 180;
        const arc = { x: Math.cos(ar) * arcR + state.px, y: Math.sin(ar) * arcR + centreY, rotation: aa + 90 };

        const m = state.morph;
        return {
          x: lerp(circle.x, arc.x, m),
          y: lerp(circle.y, arc.y, m),
          rotation: lerp(circle.rotation, arc.rotation, m),
          scale: lerp(1, mobile ? 1.15 : 1.8, m),
          opacity: 1,
        };
      };

      let setters = follow(false);
      // quickTo can't drive the "scale" shorthand, so it is split into its two axes.
      const draw = () =>
        setters.forEach((s, i) => {
          const { scale, ...rest } = targets(i);
          Object.entries({ ...rest, scaleX: scale, scaleY: scale }).forEach(([p, v]) => s[p as keyof typeof s](v));
        });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        gsap.set(els, { xPercent: -50, yPercent: -50 });
        setters = follow(true);
        draw();
        setters = follow(false);

        // Intro: scatter → line → circle, then the opening line appears inside the ring.
        const t1 = window.setTimeout(() => {
          state.phase = "line";
          draw();
        }, 500);
        const t2 = window.setTimeout(() => {
          state.phase = "circle";
          draw();
          gsap.to("[data-ah-intro]", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" });
        }, 2500);

        // Scroll: the first fifth opens the circle into the arch; the rest rolls cards along it.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: "+=300%",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              state.morph = clamp01(p / 0.2);
              state.roll = clamp01((p - 0.2) / 0.8);
              if (state.phase === "circle") draw();
            },
          },
        });
        tl.fromTo("[data-ah-intro-move]", { autoAlpha: 1 }, { autoAlpha: 0, filter: "blur(10px)", duration: 0.1, ease: "none" }, 0)
          .fromTo("[data-ah-content]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.05, ease: "none" }, 0.16)
          .to({}, { duration: 0.84 }, 0.16);

        // The arch drifts with the cursor.
        const move = (e: MouseEvent) => {
          const r = stage.getBoundingClientRect();
          state.px = ((e.clientX - r.left) / r.width) * 2 * 100 - 100;
          if (state.phase === "circle" && state.morph > 0) draw();
        };
        stage.addEventListener("mousemove", move);
        window.addEventListener("resize", draw);

        return () => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
          stage.removeEventListener("mousemove", move);
          window.removeEventListener("resize", draw);
          section.classList.remove("pinned");
        };
      });

      // Reduced motion: the finished arch with its content, no movement.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        Object.assign(state, { phase: "circle", morph: 1, roll: 0.5 });
        gsap.set(els, { xPercent: -50, yPercent: -50 });
        setters = follow(true);
        draw();
        gsap.set("[data-ah-content]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/ah overflow-hidden bg-white px-3 pt-3">
      <section
        data-ah-stage
        aria-labelledby="ah-title"
        className="relative h-[calc(100svh-24px)] min-h-[560px] overflow-hidden rounded-[28px] bg-[#FBF8F5] [perspective:1000px]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_45%,rgba(255,199,158,0.45),transparent_70%)]" />

        {/* Opening line, inside the ring */}
        <div data-ah-intro-move className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div data-ah-intro className="invisible flex translate-y-5 flex-col items-center px-6 text-center blur-[10px]">
            <p className="text-2xl font-medium tracking-tight text-ink md:text-4xl">
              Every piece of your application.
            </p>
            <p className="mt-4 text-xs font-bold tracking-[0.2em] text-ink/45">SCROLL TO EXPLORE</p>
          </div>
        </div>

        {/* Content once the arch has formed */}
        <div data-ah-content className="invisible absolute inset-x-0 top-[10%] z-10 flex flex-col items-center px-4 text-center">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Application assistance
          </p>
          <h1 id="ah-title" className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Every document, <span className="text-brand">done right.</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60 md:text-base">
            Reviews, personal statements and submission guidance,
            <br className="hidden md:block" /> so your application is complete, polished and on time.
          </p>
          <Link href="/consultation" className="group mt-6 inline-flex h-11 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
            Start your application
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>

        {/* The cards */}
        <ul aria-hidden className="absolute inset-0">
          {cards.map((c, i) => (
            <li
              key={i}
              data-ah-card
              className="group absolute left-1/2 top-1/2 h-[85px] w-[60px] cursor-pointer opacity-0 [perspective:1000px] [transform-style:preserve-3d]"
            >
              <div className="relative h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(.34,1.4,.64,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className={`absolute inset-0 overflow-hidden rounded-xl shadow-lg [backface-visibility:hidden] ${c.kind === "photo" ? c.bg ?? "bg-[#F3E9E1]" : c.tone}`}>
                  {c.kind === "photo" ? (
                    <>
                      <Image src={c.src} alt="" fill sizes="160px" className={c.contain ? "object-contain" : "object-cover"} style={{ objectPosition: c.pos }} />
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full flex-col justify-between p-1.5">
                      <Icon name={c.icon} className="h-3.5 w-3.5 opacity-80" />
                      <span className="space-y-0.5">
                        <span className="block h-[2px] w-full rounded-full bg-current opacity-20" />
                        <span className="block h-[2px] w-3/4 rounded-full bg-current opacity-20" />
                      </span>
                      <span className="text-[0.5rem] font-bold leading-none">{c.label}</span>
                    </div>
                  )}
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#141012] p-1 text-center shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="mb-0.5 text-[6px] font-bold uppercase tracking-widest text-brand">View</p>
                  <p className="text-[8px] font-medium leading-tight text-white">{c.label}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
