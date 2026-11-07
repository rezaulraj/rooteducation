"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const topics = [
  { title: "Accommodation", icon: "university", copy: "Finding a place, understanding contracts and what to check before you sign.", stamp: "#F47A2A" },
  { title: "Money & banking", icon: "scholarship", copy: "Opening a bank account, managing currency and budgeting for your first month.", stamp: "#2F7A56" },
  { title: "Health & insurance", icon: "compass", copy: "Insurance cover, registering with a doctor and looking after yourself abroad.", stamp: "#C8102E" },
  { title: "Travel & arrival", icon: "plane", copy: "Booking flights, airport pickup and what to do on your first day.", stamp: "#0D5EAF" },
  { title: "Culture & daily life", icon: "passport", copy: "Local customs, public transport, phone plans and making new friends.", stamp: "#D57800" },
  { title: "Study & work rules", icon: "document", copy: "Your visa conditions, part-time work limits and university registration.", stamp: "#141012" },
];
const tilt = [-5, 3, -2, 4, -4, 2];

export default function DepartureTopics() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const grid = section.querySelector<HTMLElement>("[data-dt-grid]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-dt-card]", section);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-dt-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });

        // Postcards start as one messy pile in the middle, then get laid out across the table.
        const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 90%", end: "top 25%", scrub: 0.7, invalidateOnRefresh: true } });
        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            {
              x: () => grid.offsetWidth / 2 - (card.offsetLeft + card.offsetWidth / 2),
              y: () => grid.offsetHeight / 2 - (card.offsetTop + card.offsetHeight / 2),
              rotation: (i - 2.5) * 9,
            },
            { x: 0, y: 0, rotation: tilt[i], duration: 1, ease: "power2.inOut" },
            (cards.length - 1 - i) * 0.06,
          ).fromTo(card.querySelector("[data-dt-stamp]"), { scale: 2.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.2, ease: "power4.in" }, 0.9 + i * 0.04);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="dt-title" className="overflow-x-clip bg-[#FBF1E7] px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-dt-head className="text-center">
          <p className="inline-flex rounded-full border border-brand/40 bg-white px-4 py-1.5 text-sm font-semibold text-brand">Your briefing covers</p>
          <h2 id="dt-title" className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Ready for <span className="text-brand">day one</span>
          </h2>
        </div>

        <ul data-dt-grid className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, i) => (
            <li
              key={t.title}
              data-dt-card
              className="group relative rounded-[18px] bg-white p-6 shadow-[0_24px_40px_-24px_rgba(90,40,10,0.45)] transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.03] sm:p-7"
              style={{ transform: `rotate(${tilt[i]}deg)` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Icon name={t.icon} className="h-6 w-6" />
                </span>
                {/* Postage stamp */}
                <span
                  data-dt-stamp
                  aria-hidden
                  className="grid h-14 w-12 rotate-6 place-items-center bg-white p-1 [mask-image:radial-gradient(circle_3px,transparent_97%,#000)] [mask-position:-3px_-3px] [mask-size:8px_8px]"
                >
                  <span className="grid h-full w-full place-items-center text-white" style={{ background: t.stamp }}>
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{t.copy}</p>
              <div aria-hidden className="mt-5 space-y-2 border-t border-dashed border-ink/15 pt-4">
                <span className="block h-px w-full bg-ink/10" />
                <span className="block h-px w-4/5 bg-ink/10" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
