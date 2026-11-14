"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const ORANGE = "#F47A2A";

// The five steps. `at` is where each one floats around the photo at the start (desktop), as % of the stage.
const STEPS = [
  { text: "Find the right universities", at: ["61%", "44%"] },
  { text: "Prepare for exams", at: ["28%", "50%"] },
  { text: "Unlock scholarships", at: ["27%", "74%"] },
  { text: "Plan your finances", at: ["60%", "22%"] },
  { text: "Get visa ready", at: ["61%", "70%"] },
];
const PLAN = ["It's", "a", "plan."];

function Tag() {
  return (
    <svg viewBox="0 0 14 9" className="h-2 w-3 shrink-0" aria-hidden>
      <path d="M0 0h10l4 4.5-4 4.5H0z" fill={ORANGE} />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = root.current!.querySelector<HTMLElement>("[data-h-stage]")!;
      const card = stage.querySelector<HTMLElement>("[data-h-card]")!;
      const labels = gsap.utils.toArray<HTMLElement>("[data-h-label]");

      /** An anchor's box, relative to the stage. Anchors are never transformed, so this is their layout box. */
      const box = (sel: string) => {
        const s = stage.getBoundingClientRect();
        const r = stage
          .querySelector<HTMLElement>(sel)!
          .getBoundingClientRect();
        return {
          x: r.left - s.left,
          y: r.top - s.top,
          w: r.width,
          h: r.height,
        };
      };
      // Card targets as function-based values, so they are re-measured whenever the page is resized.
      const cardAt = (
        sel: string,
        radius: (b: { w: number; h: number }) => number,
      ) => ({
        x: () => box(sel).x,
        y: () => box(sel).y,
        width: () => box(sel).w,
        height: () => box(sel).h,
        borderRadius: () => radius(box(sel)),
      });
      const c0 = cardAt("[data-a-card0]", (b) => b.w / 2);
      const c1 = cardAt("[data-a-card1]", () => 56);
      const c2 = cardAt("[data-a-card2]", () => 28);

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as {
            desktop: boolean;
            motion: boolean;
          };

          // Without motion, show the finished layout.
          if (!motion) {
            gsap.set(card, c2);
            gsap.set(card, { boxShadow: "0 0 0 1px rgba(46,18,18,0.05)" });
            gsap.set(
              "[data-h-big], [data-h-cta0], [data-h-chip], [data-h-wave]",
              { autoAlpha: 0 },
            );
            gsap.set("[data-h-tint]", { opacity: 0 });
            gsap.set("[data-h-white]", { opacity: 1 });
            gsap.set("[data-h-final], [data-h-word]", { autoAlpha: 1 });
            gsap.set("[data-h-cap]", { y: 0, rotation: 0, autoAlpha: 1 });
            if (desktop) {
              labels.forEach((l, i) => {
                const a = box(`[data-a-step="${i}"]`);
                gsap.set(l, { x: a.x - l.offsetLeft, y: a.y - l.offsetTop });
              });
            } else gsap.set(labels, { autoAlpha: 0 });
            return;
          }

          gsap.set(card, c0);

          // Arrival: the capsule grows in, the heading rises, the steps drift in and the ribbon draws.
          gsap
            .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
            .fromTo(
              card,
              { scale: 0.6, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 1.4 },
              0,
            )
            .fromTo(
              "[data-h-student]",
              { yPercent: 25 },
              { yPercent: 0, duration: 1.4 },
              0.1,
            )
            .fromTo(
              "[data-h-line]",
              { yPercent: 115 },
              { yPercent: 0, duration: 1.2, stagger: 0.1 },
              0.2,
            )
            .fromTo(
              "[data-h-wave] path, [data-h-swoosh]",
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
              0,
            )
            .fromTo(
              labels,
              { scale: 0.8, autoAlpha: 0 },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                stagger: 0.08,
                ease: "power3.out",
              },
              0.6,
            )
            .fromTo(
              "[data-h-chip], [data-h-cta0]",
              { y: 16, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
              },
              0.9,
            );

          // While waiting, the steps float gently. This moves an inner wrapper so the scroll can move the outer one.
          const floatEls = gsap.utils.toArray<HTMLElement>("[data-h-float]");
          const floats = floatEls.map((el, i) =>
            gsap.to(el, {
              y: i % 2 ? 8 : -8,
              duration: 2.4 + i * 0.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1.4,
            }),
          );
          // Floating stops as soon as the scroll begins, so every step settles exactly into the list.
          let floating = true;
          const setFloating = (on: boolean) => {
            if (on === floating) return;
            floating = on;
            floats.forEach((t) => (on ? t.restart(true) : t.pause()));
            if (!on)
              gsap.to(floatEls, { y: 0, duration: 0.35, ease: "power2.out" });
          };

          // Scroll: capsule → wide card with the campus in blue → full card in warm colours → "It's a plan." and the cap.
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: stage,
              pin: true,
              start: "top top",
              end: "+=260%",
              scrub: 0.9,
              invalidateOnRefresh: true,
              onUpdate: (self) => setFloating(self.progress < 0.04),
            },
          });
          tl.fromTo(
            card,
            { ...c0, immediateRender: false },
            { ...c1, duration: 1 },
            0,
          )
            .fromTo(
              card,
              {
                boxShadow:
                  "0 0 0 10px rgba(255,255,255,0.92), 0 40px 80px -40px rgba(46,18,18,0.35)",
              },
              {
                boxShadow:
                  "0 0 0 0px rgba(255,255,255,0), 0 40px 80px -40px rgba(46,18,18,0.3)",
                duration: 0.5,
                ease: "power1.out",
              },
              0,
            )
            .fromTo(
              "[data-h-campus]",
              { opacity: 0 },
              { opacity: 1, duration: 0.8 },
              0.2,
            )
            .to("[data-h-tint]", { opacity: 0.55, duration: 0.8 }, 0.2)
            .to("[data-h-wave]", { autoAlpha: 0.35, duration: 0.8 }, 0.2)
            .to("[data-h-chip]", { autoAlpha: 0, y: 20, duration: 0.5 }, 0.7)
            // The big heading drifts into the card's corner and hands over to the small orange one.
            .to(
              "[data-h-big]",
              {
                x: () => box("[data-a-head]").x - box("[data-a-big]").x,
                y: () => box("[data-a-head]").y - box("[data-a-big]").y,
                scale: 0.55,
                autoAlpha: 0,
                duration: 1.4,
                transformOrigin: "0% 0%",
              },
              0.8,
            )
            .to(card, { ...c2, duration: 1.2 }, 1.1)
            // As the card fills the hero its shadow melts away, so the bottom blends into the white page below.
            .to(card, { boxShadow: "0 0 0 1px rgba(46,18,18,0.05), 0 0px 0px 0px rgba(46,18,18,0)", duration: 1 }, 1.3)
            .to("[data-h-tint]", { opacity: 0, duration: 1 }, 1.2)
            // The peach wash behind the card dissolves to pure white as the card fills the hero.
            .fromTo("[data-h-white]", { opacity: 0 }, { opacity: 1, duration: 1.3, ease: "power1.inOut" }, 0.9)
            .to("[data-h-wave]", { autoAlpha: 0, duration: 0.6 }, 1.3)
            .to("[data-h-cta0]", { autoAlpha: 0, y: 20, duration: 0.5 }, 1.1)
            .fromTo(
              "[data-h-head]",
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              1.8,
            )
            .fromTo(
              "[data-h-badge]",
              { autoAlpha: 0, x: 30 },
              { autoAlpha: 1, x: 0, duration: 0.6 },
              1.9,
            );

          if (desktop) {
            // Each floating step glides into its place in the list, then the timeline line is drawn behind them.
            labels.forEach((l, i) => {
              tl.to(
                l,
                {
                  x: () => box(`[data-a-step="${i}"]`).x - l.offsetLeft,
                  y: () => box(`[data-a-step="${i}"]`).y - l.offsetTop,
                  scale: 1.18,
                  transformOrigin: "0% 50%",
                  duration: 0.9,
                  ease: "power3.inOut",
                },
                1.55 + i * 0.1,
              );
            });
            tl.to("[data-h-tag]", { autoAlpha: 0, duration: 0.4 }, 1.5);

            tl.fromTo(
              "[data-h-rail]",
              { scaleY: 0 },
              { scaleY: 1, transformOrigin: "50% 0%", duration: 0.8 },
              2.25,
            ).fromTo(
              "[data-h-dot]",
              { scale: 0 },
              { scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(3)" },
              2.3,
            );
          } else {
            tl.to(
              labels,
              { autoAlpha: 0, y: -20, duration: 0.5, stagger: 0.03 },
              0.6,
            );
          }

          tl.fromTo(
            "[data-h-word]",
            { yPercent: 60, autoAlpha: 0, color: "#C9BEBC" },
            {
              yPercent: 0,
              autoAlpha: 1,
              color: MAROON,
              duration: 0.8,
              stagger: 0.35,
              ease: "power3.out",
            },
            2.5,
          )
            // The cap falls from above and settles on her head with a little bounce.
            .fromTo(
              "[data-h-cap]",
              {
                yPercent: -340,
                xPercent: -18,
                rotation: -32,
                scale: 0.85,
                autoAlpha: 0,
              },
              {
                yPercent: 6,
                xPercent: 2,
                rotation: 5,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: "power3.out",
              },
              2.9,
            )
            .to(
              "[data-h-cap]",
              {
                yPercent: 0,
                xPercent: 0,
                rotation: 0,
                duration: 0.45,
                ease: "back.out(2.2)",
              },
              3.9,
            )
            .fromTo(
              "[data-h-cta1]",
              { autoAlpha: 0, x: 30 },
              { autoAlpha: 1, x: 0, duration: 0.6 },
              3.3,
            )
            .to({}, { duration: 0.6 });

          return () => gsap.set(card, { clearProps: "all" });
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-h-stage
        aria-labelledby="hero-title"
        className="relative h-[calc(100svh-24px)] min-h-[640px] overflow-hidden rounded-[28px]"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, #FFD9BF 0%, rgba(255,217,191,0) 70%), linear-gradient(180deg, #FFE7D6 0%, #FFF4EC 30%, #FFFFFF 60%)",
        }}
      >
        {/* A white layer that fades in over the peach background while scrolling */}
        <div data-h-white aria-hidden className="pointer-events-none absolute inset-0 bg-white opacity-0" />

        {/* ---------- Anchors: invisible boxes that mark where things end up ---------- */}
        <div
          aria-hidden
          className="pointer-events-none invisible absolute inset-0"
        >
          <div
            data-a-card0
            className="absolute left-1/2 top-[32%] h-[min(52svh,400px)] w-[min(52vw,215px)] -translate-x-1/2 md:top-[22%] md:h-[min(60svh,440px)] md:w-[min(17vw,240px)]"
          />
          <div
            data-a-card1
            className="absolute left-1/2 top-[24%] h-[54svh] w-[88vw] -translate-x-1/2 md:top-[20%] md:h-[min(62svh,470px)] md:w-[min(54vw,720px)]"
          />
          <div
            data-a-card2
            className="absolute inset-x-3 bottom-3 top-[88px] sm:inset-x-6 sm:bottom-6"
          >
            <div
              data-a-head
              className="absolute left-[6%] top-[7%] h-10 w-40"
            />
            <ul className="absolute right-[4%] top-[34%] hidden w-[17rem] md:block">
              {STEPS.map((s, i) => (
                <li key={s.text} data-a-step={i} className="mb-4 h-6 pl-8" />
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- The peach ribbon ---------- */}
        <svg
          data-h-wave
          aria-hidden
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-[22%] h-[70%] w-full"
        >
          <path
            d="M-40 420C120 470 230 600 410 560S640 400 720 270 920 110 1110 140 1390 230 1490 250"
            fill="none"
            stroke="#FFD3B6"
            strokeWidth="34"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
          />
        </svg>

        {/* ---------- The big opening heading ---------- */}
        <div
          data-a-big
          className="absolute inset-x-6 top-[96px] z-20 text-center md:left-[max(24px,calc(50%-27rem))] md:right-auto md:top-[12%] md:text-left"
        >
          <h1
            id="hero-title"
            data-h-big
            className="text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            style={{ color: MAROON }}
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-h-line className="block">
                Your Dream
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-h-line className="block">
                University
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.18em]">
              <span data-h-line className="block">
                isn&apos;t{" "}
                <span
                  className="relative inline-block"
                  style={{ color: ORANGE }}
                >
                  luck.
                  {/* A hand-drawn underline that draws itself in */}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.16em] left-[-4%] h-[0.32em] w-[104%] overflow-visible"
                  >
                    <path
                      data-h-swoosh
                      d="M4 16C46 6 110 4 196 12"
                      fill="none"
                      stroke={ORANGE}
                      strokeWidth="6"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                    />
                  </svg>
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* ---------- The card ---------- */}
        <div
          data-h-card
          className="absolute left-0 top-0 z-10 overflow-hidden bg-[#9FB6FF] shadow-[0_0_0_10px_rgba(255,255,255,0.92),0_40px_80px_-40px_rgba(46,18,18,0.35)] will-change-transform"
        >
          <div data-h-campus className="absolute inset-0 opacity-0">
            <Image
              src="/card-bg-campus.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 96vw, 100vw"
              loading="eager"
              className="object-cover object-[70%_50%]"
            />
          </div>
          <div
            data-h-tint
            aria-hidden
            className="absolute inset-0 bg-[#A9BEFF]"
          />

          {/* Content that appears once the card is full size */}
          <div data-h-final className="pointer-events-none absolute inset-0">
            <div className="absolute left-[6%] right-[6%] top-[7%] md:right-auto">
              <p
                data-h-head
                className="invisible text-[clamp(1.5rem,2.7vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F47A2A]"
              >
                Your Dream
                <br />
                University isn&apos;t luck.
              </p>
              <p
                aria-label="It's a plan."
                className="mt-1 flex flex-wrap gap-x-[0.22em] text-[clamp(3rem,7.4vw,7rem)] font-semibold leading-[1] tracking-[-0.045em]"
              >
                {PLAN.map((w) => (
                  <span
                    key={w}
                    aria-hidden
                    className="overflow-hidden pb-[0.1em]"
                  >
                    <span data-h-word className="invisible inline-block">
                      {w}
                    </span>
                  </span>
                ))}
              </p>
            </div>
            <div
              data-h-badge
              className="invisible absolute right-[4%] top-[6%] hidden items-center gap-2.5 md:flex"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#232D4B] p-[7px] shadow-[0_0_0_3px_#E57200,0_8px_18px_-8px_rgba(0,0,0,0.5)]">
                <Image
                  src="/univercity/logos/uva-rotunda.png"
                  alt=""
                  width={30}
                  height={31}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-lg font-medium" style={{ color: MAROON }}>
                University Of Virginia
              </span>
            </div>
            {/* Timeline behind the listed steps */}
            <div className="absolute right-[4%] top-[34%] hidden w-[17rem] md:block">
              <ul className="relative">
                <span
                  data-h-rail
                  aria-hidden
                  className="absolute left-[6px] top-3 bottom-7 w-[2px] origin-top"
                  style={{ background: MAROON }}
                />
                {STEPS.map((s, i) => (
                  <li key={s.text} className="relative mb-4 h-6">
                    <span
                      data-h-dot
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full"
                      style={{
                        background: i === 0 ? ORANGE : MAROON,
                      }}
                    />
                  </li>
                ))}
              </ul>
              <Link
                data-h-cta1
                href="/consultation"
                className="pointer-events-auto invisible mt-2 inline-flex h-14 items-center gap-3 pl-7 pr-12 text-base font-semibold text-white transition-transform hover:translate-x-1 [clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)]"
                style={{ background: MAROON, borderRadius: "12px 0 0 12px" }}
              >
                Start Your Journey
              </Link>
            </div>
            <Link
              data-h-cta1
              href="/consultation"
              className="pointer-events-auto invisible absolute bottom-5 left-1/2 inline-flex h-12 -translate-x-1/2 items-center gap-2 rounded-2xl px-6 text-sm font-semibold text-white md:hidden"
              style={{ background: MAROON }}
            >
              Start Your Journey <Arrow />
            </Link>
          </div>

          {/* The student, with the cap that lands on her head */}
          <div className="absolute bottom-0 left-1/2 aspect-[760/910] h-[min(94%,34rem)] -translate-x-1/2">
            <div data-h-student className="relative h-full w-full">
              <Image
                src="/hero-student.webp"
                alt="A smiling student holding her books"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 30rem, 80vw"
                className="object-contain object-bottom"
              />
              <div
                data-h-cap
                className="invisible absolute left-[11.7%] top-[-13.4%] w-[75%]"
              >
                <Image
                  src="/grad-cap.webp"
                  alt=""
                  width={431}
                  height={388}
                  loading="eager"
                  className="h-auto w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>
          </div>

          {/* The university chip shown on the capsule */}
          <div className="absolute inset-x-0 bottom-[6%] flex justify-center px-3">
            <div
              data-h-chip
              className="invisible flex w-max max-w-full items-center gap-2 rounded-2xl bg-white/85 py-1.5 pl-1.5 pr-3 shadow-[0_12px_30px_-12px_rgba(35,45,75,0.55)] ring-1 ring-white/70 backdrop-blur-md"
            >
              <Image
                src="/univercity/logos/uva-rotunda.png"
                alt=""
                width={34}
                height={35}
                className="h-8 w-8 shrink-0 rounded-full bg-[#232D4B] object-contain p-1.5 ring-2 ring-[#E57200]"
              />
              <span className="min-w-0 text-left leading-tight">
                <Image
                  src="/univercity/logos/uva-wordmark.png"
                  alt="University of Virginia"
                  width={110}
                  height={35}
                  className="h-[0.95rem] w-auto"
                />
                <span className="mt-0.5 block whitespace-nowrap text-[0.52rem] font-semibold uppercase tracking-[0.04em] text-[#E57200]">
                  Placed with scholarship
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- The five steps ---------- */}
        <ul aria-label="How we help" className="contents">
          {STEPS.map((s, i) => (
            <li
              key={s.text}
              data-h-label
              className="invisible absolute z-20 hidden md:block"
              style={{ left: s.at[0], top: s.at[1] }}
            >
              <span
                data-h-float
                className="flex items-center gap-3 whitespace-nowrap pl-8 text-[0.78rem] font-medium uppercase tracking-[0.02em]"
                style={{ color: MAROON }}
              >
                <span
                  data-h-tag
                  className="-ml-8 mr-1 inline-flex w-4 justify-center"
                  aria-hidden
                >
                  <Tag />
                </span>
                {s.text}
              </span>
              <span className="sr-only">Step {i + 1}</span>
            </li>
          ))}
        </ul>

        {/* ---------- First call to action ---------- */}
        <div className="absolute inset-x-0 bottom-[6%] z-20 flex justify-center md:bottom-[9%] md:left-[60%] md:right-auto md:block">
          <Link
            data-h-cta0
            href="/consultation"
            className="invisible inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[#0B0B0C] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#2E1212]"
          >
            Get Your University Shortlist
          </Link>
        </div>
      </section>
    </div>
  );
}
