"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries, Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <article data-deal className={`group relative isolate min-h-[250px] overflow-hidden rounded-[28px] p-7 sm:p-8 ${className}`}>
      {children}
    </article>
  );
}

function SmallCard({ icon, title, copy, className, chip }: { icon: string; title: string; copy: string; className: string; chip: string }) {
  return (
    <Card className={`flex flex-col justify-between gap-8 ${className}`}>
      <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${chip}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed opacity-70">{copy}</p>
      </div>
    </Card>
  );
}

export default function StudyAbroadCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const grid = section.querySelector<HTMLElement>("[data-deal-grid]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-deal]", section);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-sac-head] > *",
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } },
        );

        // Scroll deals the cards out of one fanned deck in the middle into their places.
        const deal = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: grid, start: "top 92%", end: "top 12%", scrub: 0.7, invalidateOnRefresh: true },
        });
        cards.forEach((card, i) => {
          const mid = (cards.length - 1) / 2;
          deal.fromTo(
            card,
            {
              x: () => grid.offsetWidth / 2 - (card.offsetLeft + card.offsetWidth / 2),
              y: () => Math.min(grid.offsetHeight, window.innerHeight) * 0.35 - (card.offsetTop + card.offsetHeight / 2),
              rotation: (i - mid) * 7,
              scale: 0.62,
            },
            { x: 0, y: 0, rotation: 0, scale: 1, duration: 1 },
            (cards.length - 1 - i) * 0.07,
          );
        });

        // Then each student steps up inside their card.
        gsap.utils.toArray<HTMLElement>("[data-sac-student]").forEach((el) => {
          gsap.fromTo(el, { y: 90 }, { y: 0, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "center 55%", scrub: 0.7 } });
        });
        gsap.fromTo("[data-sac-flag]", { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(2.5)", scrollTrigger: { trigger: "[data-sac-flags]", start: "top 70%" } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="sac-title" className="overflow-hidden bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-sac-head className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
              What you get
            </p>
            <h2 id="sac-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
              One conversation, <span className="text-brand">a clear plan.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/60">
            Your consultation turns a big, confusing decision into a route you can actually follow.
          </p>
        </div>

        <div data-deal-grid className="relative mt-14 grid auto-rows-[minmax(250px,auto)] gap-4 md:grid-cols-12">
          <Card className="min-h-[480px] bg-[linear-gradient(160deg,#FFE3CC_0%,#F7924F_100%)] text-ink md:col-span-5 md:row-span-2">
            <h3 className="text-3xl font-semibold leading-[1.05] tracking-[-0.02em]">Your goals, mapped out</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">We start with your grades, budget and ambitions, then shape a plan around them.</p>
            <div className="absolute inset-x-0 bottom-0 h-[68%]">
              <div data-sac-student className="relative h-full">
                <Image src="/centerstudent.png" alt="Smiling graduate pointing to his diploma" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-contain object-bottom transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-between gap-8 bg-[#141012] text-white md:col-span-7">
            <div aria-hidden className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-brand/40 blur-[90px]" />
            <div data-sac-flags className="flex flex-wrap gap-2.5">
              {countries.map((c) => (
                <span key={c.name} data-sac-flag title={c.name} className="h-10 w-14 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" style={{ background: c.flag }} />
              ))}
            </div>
            <div>
              <h3 className="text-3xl font-semibold leading-[1.05] tracking-[-0.02em]">Six countries, compared for you</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">Romania, Malta, Hungary, Cyprus, the UK and Greece, side by side on courses, costs and lifestyle.</p>
            </div>
          </Card>

          <SmallCard icon="university" title="University match" copy="A shortlist of programmes that fit your profile." chip="bg-brand text-white" className="bg-[#FBF1E7] text-ink md:col-span-3" />
          <SmallCard icon="scholarship" title="Funding options" copy="Scholarships and aid worth applying for." chip="bg-ink text-white" className="bg-[linear-gradient(150deg,#FFF0E3,#FFC79E)] text-ink md:col-span-4" />

          <SmallCard icon="document" title="Application timeline" copy="What to prepare, and when, so no deadline slips." chip="bg-white/20 text-white" className="bg-[linear-gradient(150deg,#F7924F,#D9561A)] text-white md:col-span-4" />
          <SmallCard icon="passport" title="Visa roadmap" copy="The steps ahead, explained clearly from the start." chip="bg-brand text-white" className="bg-[#FBF1E7] text-ink md:col-span-3" />

          <Card className="min-h-[480px] bg-[linear-gradient(160deg,#2A2023_0%,#5A2A1A_100%)] text-white md:col-span-5 md:row-span-2">
            <h3 className="text-3xl font-semibold leading-[1.05] tracking-[-0.02em]">A plan you can follow</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">You leave knowing your next step, and the ones after it.</p>
            <div className="absolute inset-x-0 bottom-0 h-[72%]">
              <div data-sac-student className="relative h-full">
                <Image src="/rightstudent-cutout.png" alt="Smiling graduate holding her diploma" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-contain object-bottom transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-between gap-8 bg-brand text-white md:col-span-7">
            <div aria-hidden className="absolute -bottom-20 -right-16 -z-10 h-64 w-64 rounded-full border-[36px] border-white/15 transition-transform duration-700 group-hover:scale-125" />
            <p className="max-w-md text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">Ready when you are. Let&apos;s talk.</p>
            <Link href="/consultation" className="group/cta inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
              Book a consultation
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-ink transition-transform duration-300 group-hover/cta:rotate-[-45deg]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
