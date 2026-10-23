"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const help = [
  "Get one-on-one guidance",
  "Get a personalised roadmap",
  "Find the right universities with admit chances",
  "Prepare for exams",
  "Build your application",
  "Plan your finances",
  "Unlock scholarships",
  "Get visa ready",
];

// Floating status chips over the illustration, as [left %, top %].
const chips: { label: string; icon: string; pos: [number, number]; tint: string }[] = [
  { label: "1-on-1 guidance", icon: "compass", pos: [6, 18], tint: "#F47A2A" },
  { label: "Personalised roadmap", icon: "plane", pos: [58, 34], tint: "#141012" },
  { label: "Scholarship unlocked", icon: "scholarship", pos: [10, 66], tint: "#7FB59C" },
];

const BARS = 36;
const headline = ["We've got you covered", "from day one"];

function Bars({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 z-30 hidden w-1/2 flex-col group-[.pinned]/how:flex ${side === "left" ? "left-0" : "right-0"}`}
    >
      {Array.from({ length: BARS }, (_, i) => (
        <div
          key={i}
          data-bar={side}
          className="-mb-px flex-1"
          style={{ background: i % 6 === 3 ? "#2A1A1C" : "#141012" }}
        />
      ))}
    </div>
  );
}

export default function HowWeHelp() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;

      // Ambient motion that runs regardless of scroll: drifting colour, sliding dot grid,
      // turning orbit rings and bobbing chips.
      gsap.to("[data-blob='a']", { x: 120, y: -80, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-blob='b']", { x: -140, y: 90, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-dots]", { backgroundPosition: "120px 120px", duration: 20, ease: "none", repeat: -1 });
      gsap.to("[data-orbit]", { rotation: 360, duration: 60, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.utils.toArray<HTMLElement>("[data-chip-float]").forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 10 : -10, duration: 2.6 + i * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      const mm = gsap.matchMedia();

      // Desktop: pinned twisting-slat curtain that opens onto the image and the copy.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, pin: true, start: "top top", end: "+=180%", scrub: 0.5 },
        });

        // Slats sweep outwards, twisting to 45° and back on the way, one after another.
        tl.to("[data-bar='left']", { xPercent: -101, duration: 1, ease: "power1.inOut", stagger: { amount: 0.8, from: "start" } }, 0)
          .to("[data-bar='right']", { xPercent: 101, duration: 1, ease: "power1.inOut", stagger: { amount: 0.8, from: "end" } }, 0)
          .to("[data-bar]", { rotation: 45, duration: 0.9, ease: "power1.out", stagger: { amount: 0.8 } }, 0)
          .to("[data-bar]", { rotation: 0, duration: 0.9, ease: "power1.in", stagger: { amount: 0.8 } }, 0.9)
          .to("[data-curtain-word='left']", { xPercent: -60, autoAlpha: 0, duration: 0.9, ease: "power1.in" }, 0)
          .to("[data-curtain-word='right']", { xPercent: 60, autoAlpha: 0, duration: 0.9, ease: "power1.in" }, 0)
          // What the curtain uncovers settles into place.
          .fromTo("[data-how-art]", { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0)
          .fromTo("[data-chip]", { scale: 0, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)" }, 1)
          .fromTo("[data-how-path]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" }, 0.9)
          .fromTo("[data-how-kicker]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.8)
          .fromTo("[data-how-line]", { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }, 0.9)
          .fromTo("[data-how-copy]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.1, ease: "power3.out" }, 1.15)
          .fromTo("[data-how-item]", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.07, ease: "power3.out" }, 1.3)
          .fromTo("[data-how-tick]", { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.07, ease: "back.out(3)" }, 1.4)
          .to({}, { duration: 0.4 });

        return () => section.classList.remove("pinned");
      });

      // Smaller screens: a simple rise-in as the section arrives.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-how-kicker], [data-how-line], [data-how-copy], [data-how-item]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="how-title"
      className="group/how relative overflow-hidden bg-white px-3 py-3 [&.pinned]:h-svh"
    >
      <div className="relative grid gap-3 lg:h-full lg:grid-cols-2">
        {/* Illustration */}
        <div className="relative h-[460px] overflow-hidden rounded-[28px] bg-[radial-gradient(120%_90%_at_30%_20%,#FFE3CC_0%,#FFC79E_45%,#F59A5C_100%)] lg:h-auto">
          <div data-how-art className="absolute inset-0">
            <div aria-hidden className="absolute left-1/2 top-[44%] h-[120%] -translate-x-1/2 -translate-y-1/2 opacity-70">
            <svg data-orbit viewBox="0 0 600 600" className="h-full w-auto">
              <circle cx="300" cy="300" r="180" fill="none" stroke="#fff" strokeOpacity="0.55" strokeDasharray="3 10" />
              <circle cx="300" cy="300" r="250" fill="none" stroke="#fff" strokeOpacity="0.35" />
              <circle cx="300" cy="50" r="7" fill="#fff" />
              <circle cx="480" cy="300" r="5" fill="#141012" />
              <circle cx="120" cy="300" r="5" fill="#F47A2A" />
            </svg>
            </div>
            <div aria-hidden className="absolute left-1/2 top-[18%] h-[62%] w-[62%] -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path
                data-how-path
                d="M12 78 C 30 60, 18 40, 40 30 S 70 30, 78 14"
                fill="none"
                stroke="#141012"
                strokeOpacity="0.35"
                strokeWidth="0.5"
                strokeDasharray="1.5 1.5"
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <Image
              src="/centerstudent.png"
              alt="Graduate pointing at his diploma"
              width={1368}
              height={1150}
              sizes="(min-width: 1024px) 45vw, 95vw"
              className="absolute bottom-0 left-1/2 h-[82%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(20,16,18,0.35)]"
            />
          </div>
          {chips.map((c) => (
            <div key={c.label} className="absolute" style={{ left: `${c.pos[0]}%`, top: `${c.pos[1]}%` }}>
              <div data-chip>
                <div
                  data-chip-float
                  className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 py-2.5 pl-2.5 pr-4 text-sm font-semibold text-ink shadow-[0_18px_40px_-18px_rgba(20,16,18,0.55)] backdrop-blur-md"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: c.tint }}>
                    <Icon name={c.icon} className="h-[18px] w-[18px]" />
                  </span>
                  {c.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Copy, over a slowly moving background */}
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#FBF7F2] px-7 py-14 sm:px-12 lg:flex lg:flex-col lg:justify-center lg:px-16">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div data-blob="a" className="absolute -left-20 -top-24 h-96 w-96 rounded-full bg-[#FFC79E]/70 blur-[90px]" />
            <div data-blob="b" className="absolute -bottom-28 -right-16 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[100px]" />
            <div
              data-dots
              className="absolute inset-0 opacity-[0.35]"
              style={{ backgroundImage: "radial-gradient(rgba(20,16,18,0.18) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
          </div>

          <p data-how-kicker className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            <span className="h-px w-10 bg-brand" />
            How we help you
          </p>
          <h2 id="how-title" className="mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            {headline.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-how-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p data-how-copy className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
            Every student starts with a dream. Root Education makes it reality.
          </p>
          <div data-how-copy className="mt-8">
            <Link
              href="/consultation"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-2 text-sm font-semibold text-white"
            >
              Start your journey
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {help.map((item) => (
              <li key={item} data-how-item className="flex items-start gap-3 text-[0.95rem] font-medium leading-snug text-ink/85">
                <span data-how-tick className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.2 5 8.5l4.5-5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The curtain: twisting slats with the title split across them */}
      <Bars side="left" />
      <Bars side="right" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-40 hidden items-center group-[.pinned]/how:flex">
        <span data-curtain-word="left" className="w-1/2 text-center text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
          How we
        </span>
        <span data-curtain-word="right" className="w-1/2 text-center text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
          <span className="text-brand">Help</span> you
        </span>
      </div>
    </section>
  );
}
