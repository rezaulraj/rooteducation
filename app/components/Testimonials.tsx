"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Placeholder stories — replace with real students' words, names and destinations.
const stories = [
  {
    quote:
      "From choosing a university to my visa interview, the team was with me at every step. I never felt lost, and I got my offer from my first-choice university.",
    name: "Arif Hossain",
    detail: "Medicine · Study in Romania",
    country: "Romania",
    img: "/centerstudent.png",
    tone: "orange" as const,
  },
  {
    quote:
      "They found me a scholarship I didn't even know existed. My shortlist, SOP and finances were all planned out, so I could focus on getting ready to fly.",
    name: "Nadia Rahman",
    detail: "Business · Study in Malta",
    country: "Malta",
    img: "/rightstudent-cutout.png",
    tone: "ink" as const,
  },
];

const tones = {
  orange: "bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white",
  ink: "bg-[linear-gradient(150deg,#2A2023_0%,#141012_100%)] text-white",
};

// Cut corners, like a ticket: top-left and bottom-right are clipped.
const ticket = "polygon(48px 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%, 0 48px)";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Rotate on its own until the visitor takes over.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % stories.length), 6500);
    return () => window.clearInterval(id);
  }, [paused]);

  // Entrance: the cards fly in from opposite sides, spinning, and settle into their stagger.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 70%" } })
          .from("[data-tm-head] > *", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" })
          .from("[data-tm-slot='0']", { x: -500, rotation: -30, autoAlpha: 0, duration: 1.3, ease: "expo.out" }, 0.2)
          .from("[data-tm-slot='1']", { x: 500, rotation: 30, autoAlpha: 0, duration: 1.3, ease: "expo.out" }, 0.3)
          .from("[data-tm-controls]", { y: 20, autoAlpha: 0, duration: 0.6 }, 0.9);
      });
    },
    { scope: root },
  );

  // Each time the front card changes, its quote reveals word by word and the student rises.
  useGSAP(
    () => {
      const front = root.current!.querySelector(`[data-tm-card='${active}']`)!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(front.querySelectorAll("[data-tm-word]"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.018, ease: "power3.out", delay: 0.25 });
        gsap.fromTo(front.querySelector("[data-tm-photo]"), { y: 60, scale: 0.92 }, { y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)", delay: 0.15 });
      });
    },
    { scope: root, dependencies: [active] },
  );

  const go = (i: number) => {
    setPaused(true);
    setActive((i + stories.length) % stories.length);
  };

  return (
    <section ref={root} aria-labelledby="tm-title" className="overflow-hidden bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-tm-head className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Student stories
          </p>
          <h2 id="tm-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            Dreams that took <span className="text-brand">root.</span>
          </h2>
        </div>

        <div className="relative mx-auto mt-16 h-[640px] max-w-4xl sm:h-[560px]">
          {stories.map((s, i) => {
            const isFront = i === active;
            const side = i === 0 ? -1 : 1;
            return (
              // Outer slot carries the scroll entrance; inner card carries the stagger shuffle.
              <div key={s.name} data-tm-slot={i} className={`absolute inset-0 flex items-center justify-center ${isFront ? "z-10" : "z-0"}`}>
                <article
                  data-tm-card={i}
                  onClick={() => !isFront && go(i)}
                  aria-hidden={!isFront}
                  className={`relative grid h-full w-full max-w-[720px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] sm:h-[440px] sm:grid-cols-[1fr_250px] ${tones[s.tone]} ${
                    isFront ? "" : "cursor-pointer brightness-[0.82] hover:brightness-95"
                  }`}
                  style={{
                    clipPath: ticket,
                    transform: isFront
                      ? "translate(0, -24px) rotate(0deg) scale(1)"
                      : `translate(${side * 13}%, 28px) rotate(${side * 4}deg) scale(0.9)`,
                    filter: isFront ? "drop-shadow(0 30px 40px rgba(20,16,18,0.35))" : undefined,
                  }}
                >
                  <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
                  <div className="relative flex flex-col p-8 sm:p-12">
                    <svg viewBox="0 0 48 36" className="h-9 w-12 shrink-0 text-white/35" fill="currentColor" aria-hidden>
                      <path d="M0 36V22C0 9 7 2 19 0l2 5c-7 2-10 6-10 12h9v19H0Zm27 0V22C27 9 34 2 46 0l2 5c-7 2-10 6-10 12h9v19H27Z" />
                    </svg>
                    <blockquote className="mt-6 text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                      {s.quote.split(" ").map((w, wi) => (
                        <span key={wi} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                          <span data-tm-word className="inline-block">
                            {w}
                          </span>
                        </span>
                      ))}
                    </blockquote>
                    <div className="mt-auto flex items-center gap-3 pt-8">
                      <span
                        className="h-7 w-10 shrink-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                        style={{ background: countries.find((c) => c.name === s.country)!.flag }}
                        aria-hidden
                      />
                      <span>
                        <span className="block font-semibold">{s.name}</span>
                        <span className="block text-sm text-white/70">{s.detail}</span>
                      </span>
                    </div>
                  </div>

                  <div className="relative h-56 sm:h-auto">
                    <div aria-hidden className="absolute inset-x-6 bottom-0 top-10 rounded-t-full bg-white/15" />
                    <Image
                      data-tm-photo
                      src={s.img}
                      alt={s.name}
                      width={1368}
                      height={1150}
                      sizes="(min-width: 640px) 420px, 90vw"
                      className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                    />
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div data-tm-controls className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous story"
            className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-ink/10 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Stories">
            {stories.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={s.name}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-brand" : "w-2.5 bg-ink/20"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next story"
            className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-ink/10 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
