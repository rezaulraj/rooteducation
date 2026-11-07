"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const benefits = [
  { title: "Tailored guidance", icon: "compass", copy: "University recommendations matched to your academic goals, career plans and study preferences." },
  { title: "Expert support", icon: "document", copy: "Dedicated help with applications, visa requirements and settling into a new culture." },
  { title: "Global opportunities", icon: "university", copy: "Programmes and experiences across six countries that broaden your horizons and your career." },
  { title: "Financial aid insights", icon: "scholarship", copy: "Clear guidance on scholarships, grants and funding options for studying abroad." },
  { title: "Informed decisions", icon: "passport", copy: "Compare programmes with real data, clear options and expert recommendations." },
  { title: "Comprehensive support", icon: "plane", copy: "Guidance through applications, cultural adaptation and beyond, for a successful journey." },
];

// One pattern tile of pointy-top hexagons (circumradius r, so each is 60 wide).
const R = 34.64;
const hex = (cx: number, cy: number) =>
  `M${cx} ${cy - R}L${cx + 30} ${cy - R / 2}V${cy + R / 2}L${cx} ${cy + R}L${cx - 30} ${cy + R / 2}V${cy - R / 2}Z`;
const tile = [hex(30, R), hex(0, R * 2.5), hex(60, R * 2.5), hex(0, -R / 2), hex(60, -R / 2)].join("");

function Honeycomb({ id, stroke, width }: { id: string; stroke: string; width: number }) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id={id} width="60" height={R * 3} patternUnits="userSpaceOnUse">
          <path d={tile} fill="none" stroke={stroke} strokeWidth={width} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function UniversityBenefits() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const glow = section.querySelector<HTMLElement>("[data-ub-glow]")!;
      const pos = { x: section.offsetWidth * 0.3, y: section.offsetHeight * 0.4 };
      const paint = () => {
        glow.style.setProperty("--mx", `${pos.x}px`);
        glow.style.setProperty("--my", `${pos.y}px`);
      };
      paint();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // A light wanders the honeycomb on its own, and follows the cursor when it's over the section.
        const wander = gsap.to(pos, {
          keyframes: [
            { x: () => section.offsetWidth * 0.8, y: () => section.offsetHeight * 0.3 },
            { x: () => section.offsetWidth * 0.6, y: () => section.offsetHeight * 0.8 },
            { x: () => section.offsetWidth * 0.2, y: () => section.offsetHeight * 0.6 },
            { x: () => section.offsetWidth * 0.3, y: () => section.offsetHeight * 0.4 },
          ],
          duration: 16,
          ease: "sine.inOut",
          repeat: -1,
          onUpdate: paint,
        });
        const toX = gsap.quickTo(pos, "x", { duration: 0.8, ease: "power3.out", onUpdate: paint });
        const toY = gsap.quickTo(pos, "y", { duration: 0.8, ease: "power3.out", onUpdate: paint });
        const move = (e: PointerEvent) => {
          wander.pause();
          const r = section.getBoundingClientRect();
          toX(e.clientX - r.left);
          toY(e.clientY - r.top);
        };
        const leave = () => wander.resume();
        section.addEventListener("pointermove", move);
        section.addEventListener("pointerleave", leave);

        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: section, start: "top 65%" } })
          .from("[data-ub-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1 })
          .fromTo("[data-ub-card]", { y: 60, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, stagger: { each: 0.08, grid: [2, 3], from: "center" } }, 0.3)
          .fromTo("[data-ub-icon]", { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(2.5)" }, 0.6);

        return () => {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="ub-title" className="relative mx-3 overflow-hidden rounded-[28px] bg-[#100C0D] px-3 py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Honeycomb id="ub-dim" stroke="rgba(255,255,255,0.06)" width={1} />
        <div
          data-ub-glow
          className="absolute inset-0 [mask-image:radial-gradient(circle_300px_at_var(--mx)_var(--my),#000_0%,transparent_100%)]"
        >
          <Honeycomb id="ub-lit" stroke="#F47A2A" width={1.6} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_220px_at_var(--mx)_var(--my),rgba(244,122,42,0.18),transparent)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,#100C0D_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-3">
        <div data-ub-head className="text-center">
          <p className="inline-flex rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">Service benefits</p>
          <h2 id="ub-title" className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em]">
            What you gain from <span className="text-brand">our service</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <article
              key={b.title}
              data-ub-card
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-brand/60 hover:bg-white/[0.07]"
            >
              <span
                data-ub-icon
                className="grid h-12 w-12 place-items-center bg-brand text-white [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] transition-transform duration-300 group-hover:rotate-[30deg]"
              >
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{b.copy}</p>
              <span aria-hidden className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
