"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Capitals and currencies are plain facts; the one-line pitches are placeholder copy to adjust.
const facts: Record<string, { capital: string; currency: string; pitch: string; glow: string }> = {
  Romania: { capital: "Bucharest", currency: "Romanian leu", pitch: "English-taught degrees, EU recognition and some of Europe's lowest living costs.", glow: "#FCD116" },
  Malta: { capital: "Valletta", currency: "Euro", pitch: "An English-speaking EU island with small classes and Mediterranean life.", glow: "#CF142B" },
  Hungary: { capital: "Budapest", currency: "Hungarian forint", pitch: "Historic universities in the heart of Central Europe, with scholarship routes.", glow: "#477050" },
  Cyprus: { capital: "Nicosia", currency: "Euro", pitch: "Sunny campuses and English-taught programmes at a relaxed pace.", glow: "#D57800" },
  UK: { capital: "London", currency: "Pound sterling", pitch: "World-ranked universities and one-year master's degrees.", glow: "#C8102E" },
  Greece: { capital: "Athens", currency: "Euro", pitch: "Where Western academia began, with a warm and affordable lifestyle.", glow: "#0D5EAF" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountriesWeWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const track = section.querySelector<HTMLElement>("[data-cw-track]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-cw-card]", section);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        const distance = () => track.scrollWidth - section.offsetWidth;

        // Scrolling down slides the row of countries sideways.
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Lean into the motion, settling back when scrolling stops.
              gsap.to(track, {
                skewX: gsap.utils.clamp(-6, 6, self.getVelocity() / -400),
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
                onComplete: () => gsap.to(track, { skewX: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" }),
              });
            },
          },
        });
        gsap.fromTo("[data-cw-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } });

        // As each card reaches the middle, its flag opens up from a stripe and its name rises.
        cards.forEach((card) => {
          // Cards already in view when the slide starts reveal as the section arrives instead.
          const onScreen = card.offsetLeft < section.offsetWidth * 0.85;
          const at = onScreen
            ? { trigger: section, start: "top 70%", end: "top top", scrub: true }
            : { trigger: card, containerAnimation: slide, start: "left 85%", end: "left 35%", scrub: true };
          gsap.fromTo(card.querySelector("[data-cw-flag]"), { clipPath: "inset(46% 0% 46% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: at });
          gsap.fromTo(card.querySelectorAll("[data-cw-char]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.06, ease: "power3.out", scrollTrigger: at });
          gsap.fromTo(card.querySelectorAll("[data-cw-fade]"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out", scrollTrigger: at });
          gsap.fromTo(card.querySelector("[data-cw-glow]"), { scale: 0.4 }, { scale: 1.2, ease: "none", scrollTrigger: onScreen ? at : { ...at, end: "right 0%" } });
        });

        return () => section.classList.remove("pinned");
      });

      // Phones: cards stack, and each rises in as it arrives.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card) => {
          gsap.from(card, { y: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cw-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="cw-title"
      className="group/cw relative overflow-hidden bg-[#141012] py-20 text-white md:[&.pinned]:flex md:[&.pinned]:h-svh md:[&.pinned]:flex-col md:[&.pinned]:justify-center md:[&.pinned]:py-0"
    >
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand/25 blur-[120px]" />

      <div data-cw-head className="relative mx-auto flex w-full max-w-6xl flex-col justify-between gap-5 px-6 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Countries we work in
          </p>
          <h2 id="cw-title" className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Six countries. <span className="text-brand">One advisor.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 md:w-64">
          <span className="font-mono text-sm text-white/50">01</span>
          <span className="relative h-px flex-1 bg-white/15">
            <span data-cw-progress className="absolute inset-0 origin-left bg-brand" />
          </span>
          <span className="font-mono text-sm text-white/50">{pad(countries.length)}</span>
        </div>
      </div>

      <div className="relative mt-10 md:mt-12">
        <div data-cw-track className="flex flex-col gap-4 px-6 md:w-max md:flex-row md:gap-5 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:pr-[12vw]">
          {countries.map((c, i) => {
            const f = facts[c.name];
            return (
              <Link
                key={c.name}
                href={c.href}
                data-cw-card
                className="group relative flex h-[440px] w-full shrink-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#1E1719] p-7 md:h-[min(62vh,520px)] md:w-[min(30rem,40vw)] md:p-8"
              >
                <div data-cw-glow aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-40 blur-[80px]" style={{ background: f.glow }} />

                <div className="relative flex items-start justify-between">
                  <span className="font-mono text-sm text-white/45">{pad(i + 1)}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-brand group-hover:bg-brand">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </div>

                <div
                  data-cw-flag
                  aria-hidden
                  className="relative mt-6 h-28 w-44 rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
                  style={{ background: c.flag }}
                />

                <h3 className="relative mt-auto text-[clamp(2.6rem,4.4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                  <span className="sr-only">{c.name}</span>
                  <span aria-hidden className="inline-flex overflow-hidden pb-[0.06em]">
                    {c.name.split("").map((ch, ci) => (
                      <span key={ci} data-cw-char className="inline-block">
                        {ch}
                      </span>
                    ))}
                  </span>
                </h3>
                <p data-cw-fade className="relative mt-3 max-w-sm text-sm leading-relaxed text-white/65">
                  {f.pitch}
                </p>
                <dl data-cw-fade className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">Capital</dt>
                    <dd className="mt-1 font-medium">{f.capital}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">Currency</dt>
                    <dd className="mt-1 font-medium">{f.currency}</dd>
                  </div>
                </dl>
              </Link>
            );
          })}

          <Link
            href="/consultation"
            className="group relative flex h-[300px] w-full shrink-0 flex-col justify-between overflow-hidden rounded-[28px] bg-brand p-8 md:h-[min(62vh,520px)] md:w-[min(24rem,32vw)]"
          >
            <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[40px] border-white/15 transition-transform duration-700 group-hover:scale-125" />
            <span className="relative text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Not sure yet?</span>
            <span className="relative">
              <span className="block text-[clamp(2rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.03em]">Let&apos;s find the one that fits you.</span>
              <span className="mt-6 inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold">
                Book a consultation
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-ink transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
