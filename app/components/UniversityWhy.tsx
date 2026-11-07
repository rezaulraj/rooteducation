"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reasons = [
  { title: "Comprehensive research", icon: "compass", copy: "In-depth analysis and support, so every university decision is an informed one.", tone: "bg-[#141012] text-white", muted: "text-white/65" },
  { title: "Scholarship assistance", icon: "scholarship", copy: "Expert guidance in finding the scholarships you qualify for, and applying for them.", tone: "bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white", muted: "text-white/80" },
  { title: "Global connections", icon: "university", copy: "Access to a wide network of universities and alumni across our destinations.", tone: "bg-[linear-gradient(150deg,#FFF0E3_0%,#FFC79E_100%)] text-ink", muted: "text-ink/65" },
  { title: "Support beyond selection", icon: "plane", copy: "Help with visas, housing and travel arrangements once your university is chosen.", tone: "bg-[#FBF1E7] text-ink", muted: "text-ink/65" },
];

// Words the headline cycles through.
const words = ["guidance", "research", "support", "confidence"];

export default function UniversityWhy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-uw-intro] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });

        // The highlighted word rolls through what we offer.
        const track = root.current!.querySelector<HTMLElement>("[data-uw-words]")!;
        const roll = gsap.timeline({ repeat: -1 });
        words.forEach((_, i) => roll.to(track, { yPercent: -(100 / (words.length + 1)) * (i + 1), duration: 0.7, ease: "expo.inOut" }, i * 2 + 1.6));
        roll.set(track, { yPercent: 0 });

        // Cards flip up out of the page one after another, like turning over index cards.
        gsap.utils.toArray<HTMLElement>("[data-uw-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { rotationX: -70, y: 80, autoAlpha: 0, transformOrigin: "50% 100%" },
            { rotationX: 0, y: 0, autoAlpha: 1, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 95%", end: "top 60%", scrub: 0.6 } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="uw-title" className="overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-3 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div data-uw-intro className="lg:sticky lg:top-28 lg:self-start">
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">Why choose us</p>
          <h2 id="uw-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            University selection, built on{" "}
            <span className="inline-flex h-[1em] overflow-hidden align-bottom leading-none text-brand">
              <span data-uw-words className="flex flex-col">
                {[...words, words[0]].map((w, i) => (
                  <span key={i} className="block h-[1em] pb-[0.1em]">
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65">
            Personal guidance, expert support, a wide network of universities, scholarship help and the resources to make confident decisions about your study abroad journey.
          </p>
          <Link href="/consultation" className="group mt-8 inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
            Book a consultation
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid gap-4 [perspective:1200px] sm:grid-cols-2">
          {reasons.map((r, i) => (
            <article key={r.title} data-uw-card className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-8 ${r.tone} ${i % 2 ? "sm:translate-y-12" : ""}`}>
              <div aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border-[28px] border-current opacity-[0.07] transition-transform duration-700 group-hover:scale-150" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 ring-1 ring-current/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={r.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight">{r.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${r.muted}`}>{r.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
