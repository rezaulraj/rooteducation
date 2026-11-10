"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type City = {
  name: string;
  region: string;
  tagline: string;
  known: string[];
  universities: string[];
  vibe: string;
  src: string;
  alt: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountryCities({ country, accent, cities }: { country: string; accent: string; cities: City[] }) {
  const RED = accent;
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = root.current!;
      const mm = gsap.matchMedia();

      // Desktop: pinned. Each new city wipes up over the last; the details swap with it.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        const frames = gsap.utils.toArray<HTMLElement>("[data-rc-frame]", section);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${(cities.length - 1) * 90}%`,
            scrub: 0.6,
            snap: { snapTo: 1 / (cities.length - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
            onUpdate: (self) => setActive(Math.round(self.progress * (cities.length - 1))),
          },
        });
        frames.slice(1).forEach((f, i) => {
          tl.fromTo(f, { clipPath: "inset(100% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1, ease: "power2.inOut" }, i)
            .fromTo(f.querySelector("[data-rc-img]"), { scale: 1.3 }, { scale: 1.05, duration: 1, ease: "power2.out" }, i)
            .to(frames[i].querySelector("[data-rc-img]"), { scale: 1.2, yPercent: -6, duration: 1 }, i);
        });
        tl.fromTo("[data-rc-progress]", { scaleX: 1 / cities.length }, { scaleX: 1, duration: cities.length - 1 }, 0);
        return () => section.classList.remove("pinned");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-rc-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });
      });

      // Smaller screens: each city card opens like a shutter as it arrives.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-rc-card]", section).forEach((card) => {
          gsap.fromTo(
            card,
            { clipPath: "inset(30% 0% 30% 0% round 24px)", autoAlpha: 0.4 },
            { clipPath: "inset(0% 0% 0% 0% round 24px)", autoAlpha: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } },
          );
        });
      });
    },
    { scope: root },
  );

  // When the city changes, its name rises letter by letter and the details follow.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const panel = root.current!.querySelector("[data-rc-panel]");
      if (!panel) return;
      gsap
        .timeline()
        .fromTo(panel.querySelectorAll("[data-rc-char]"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.03, ease: "power3.out" })
        .fromTo(panel.querySelectorAll("[data-rc-fade]"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }, 0.15);
    },
    { scope: root, dependencies: [active] },
  );

  const c = cities[active];

  return (
    <section
      ref={root}
      aria-labelledby="rc-title"
      className="group/rc overflow-x-clip bg-[#FBF6EF] px-3 py-24 lg:[&.pinned]:flex lg:[&.pinned]:h-svh lg:[&.pinned]:flex-col lg:[&.pinned]:justify-center lg:[&.pinned]:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-3">
        <div data-rc-head className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="inline-flex rounded-full border bg-white px-4 py-1.5 text-sm font-semibold" style={{ borderColor: `${RED}55`, color: RED }}>
              Best cities
            </p>
            <h2 id="rc-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
              Best cities for <span style={{ color: RED }}>studying in {country}</span>
            </h2>
          </div>
          <ol className="hidden items-center gap-1 lg:flex" aria-label="Cities">
            {cities.map((x, i) => (
              <li
                key={x.name}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${i === active ? "text-white" : "text-ink/45"}`}
                style={i === active ? { background: RED } : undefined}
              >
                {x.name}
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: one pinned stage */}
        <div className="mt-10 hidden gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-rc-panel key={c.name} aria-live="polite">
            <p data-rc-fade className="font-mono text-sm" style={{ color: RED }}>
              {pad(active + 1)} / {pad(cities.length)} · {c.region}
            </p>
            <h3 className="mt-3 text-[clamp(3rem,5.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">
              <span className="sr-only">{c.name}</span>
              <span aria-hidden className="inline-flex overflow-hidden pb-[0.08em]">
                {c.name.split("").map((ch, i) => (
                  <span key={i} data-rc-char className="inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            </h3>
            <p data-rc-fade className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
              {c.tagline}
            </p>
            <ul data-rc-fade className="mt-5 flex flex-wrap gap-2">
              {c.known.map((k) => (
                <li key={k} className="rounded-full border border-ink/15 bg-white px-3 py-1 text-sm text-ink/75">
                  {k}
                </li>
              ))}
            </ul>
            <div data-rc-fade className="mt-6 rounded-2xl bg-white p-5 shadow-[0_20px_40px_-30px_rgba(90,40,10,0.5)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Leading universities</p>
              <ul className="mt-3 space-y-2">
                {c.universities.map((un) => (
                  <li key={un} className="flex items-start gap-2.5 text-sm font-medium text-ink/85">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45" style={{ background: RED }} />
                    {un}
                  </li>
                ))}
              </ul>
            </div>
            <p data-rc-fade className="mt-5 text-sm text-ink/55">
              <span className="font-semibold text-ink/75">Student life:</span> {c.vibe}
            </p>
          </div>

          <div>
            <div className="relative h-[min(58svh,560px)] overflow-hidden rounded-[28px] bg-[#EFE6DD]">
              {cities.map((x, i) => (
                <div
                  key={x.name}
                  data-rc-frame
                  className="absolute inset-0 overflow-hidden rounded-[28px]"
                  style={i === 0 ? undefined : { clipPath: "inset(100% 0% 0% 0% round 28px)" }}
                >
                  <div data-rc-img className="absolute inset-0 scale-105">
                    <Image src={x.src} alt={x.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                    <p className="text-3xl font-semibold tracking-tight text-white">{x.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/10">
              <div data-rc-progress className="h-full origin-left rounded-full" style={{ background: RED }} />
            </div>
          </div>
        </div>

        {/* Smaller screens: stacked city cards */}
        <ul className="mt-10 space-y-6 lg:hidden">
          {cities.map((x, i) => (
            <li key={x.name} data-rc-card className="overflow-hidden rounded-[24px] bg-white shadow-[0_20px_40px_-30px_rgba(90,40,10,0.5)]">
              <div className="relative h-56 sm:h-72">
                <Image src={x.src} alt={x.alt} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-16">
                  <p className="font-mono text-xs text-white/70">
                    {pad(i + 1)} · {x.region}
                  </p>
                  <h3 className="text-3xl font-semibold tracking-tight text-white">{x.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-ink/70">{x.tagline}</p>
                <ul className="mt-4 space-y-1.5">
                  {x.universities.map((un) => (
                    <li key={un} className="flex items-start gap-2 text-sm font-medium text-ink/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: RED }} />
                      {un}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
