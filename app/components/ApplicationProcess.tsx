"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  { title: "Initial consultation", icon: "compass", copy: "A one-to-one session to understand your needs, goals and preferred study destinations." },
  { title: "Personalised action plan", icon: "document", copy: "A tailored roadmap with the key milestones and timelines for your applications." },
  { title: "Document preparation", icon: "document", copy: "Detailed checklists of the documents each university and programme asks for." },
  { title: "Application review", icon: "scholarship", copy: "A thorough review of every completed application, so each one meets all the criteria." },
  { title: "Submission guidance", icon: "university", copy: "Support while you submit, from deadlines and online portals to troubleshooting." },
  { title: "Post-submission support", icon: "plane", copy: "Ongoing help with university updates, additional requirements and responding to offers." },
];
const pad = (n: number) => String(n).padStart(2, "0");

export default function ApplicationProcess() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        // Pinned stepper: scroll advances through the steps one at a time.
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${steps.length * 60}%`,
          onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
        });
        gsap.fromTo("[data-ap-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${steps.length * 60}%`, scrub: true } });
        return () => section.classList.remove("pinned");
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ap-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });
      });
    },
    { scope: root },
  );

  // Each new step rolls its number in and rises its words.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const panel = root.current!.querySelector(`[data-ap-panel='${active}']`);
      if (!panel) return;
      gsap
        .timeline()
        .fromTo(panel.querySelector("[data-ap-num]"), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" })
        .fromTo(panel.querySelector("[data-ap-icon]"), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2.2)" }, 0.05)
        .fromTo(panel.querySelectorAll("[data-ap-word]"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.04, ease: "power3.out" }, 0.1)
        .fromTo(panel.querySelector("[data-ap-copy]"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.25);
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <section ref={root} aria-labelledby="ap-title" className="group/ap relative overflow-x-clip bg-[#141012] px-3 py-24 text-white lg:[&.pinned]:flex lg:[&.pinned]:h-svh lg:[&.pinned]:items-center lg:[&.pinned]:py-0">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-[120px]" />
      <div className="relative mx-auto w-full max-w-6xl px-3">
        <div data-ap-head>
          <p className="inline-flex rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">Application assistance process</p>
          <h2 id="ap-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Our step-by-step <span className="text-brand">application process</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Current step (desktop pinned); every step stacked on smaller screens */}
          <div className="relative lg:min-h-[340px]">
            {steps.map((s, i) => (
              <article
                key={s.title}
                data-ap-panel={i}
                className={`mb-10 last:mb-0 group-[.pinned]/ap:absolute group-[.pinned]/ap:inset-0 group-[.pinned]/ap:mb-0 group-[.pinned]/ap:transition-opacity group-[.pinned]/ap:duration-300 ${
                  i === active ? "" : "group-[.pinned]/ap:pointer-events-none group-[.pinned]/ap:opacity-0"
                }`}
              >
                <div className="flex items-end gap-6">
                  <span className="block overflow-hidden text-[clamp(5rem,11vw,10rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_#F47A2A]">
                    <span data-ap-num className="block">{pad(i + 1)}</span>
                  </span>
                  <span data-ap-icon className="mb-2 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                </div>
                <h3 className="mt-6 text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {s.title.split(" ").map((w, wi) => (
                    <span key={wi} className="mr-[0.25em] inline-block overflow-hidden pb-[0.06em] align-bottom">
                      <span data-ap-word className="inline-block">{w}</span>
                    </span>
                  ))}
                </h3>
                <p data-ap-copy className="mt-4 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">{s.copy}</p>
              </article>
            ))}
          </div>

          {/* Step list with a progress rail (desktop) */}
          <ol className="relative hidden pl-8 lg:block">
            <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-white/15">
              <span data-ap-fill className="absolute inset-0 origin-top bg-brand" />
            </span>
            {steps.map((s, i) => (
              <li key={s.title} className="relative py-3">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
                    i <= active ? "border-brand bg-brand" : "border-white/30 bg-[#141012]"
                  } ${i === active ? "scale-150" : ""}`}
                />
                <span className={`flex items-baseline gap-4 transition-all duration-300 ${i === active ? "translate-x-2 text-white" : "text-white/40"}`}>
                  <span className="font-mono text-sm">{pad(i + 1)}</span>
                  <span className="text-xl font-semibold tracking-tight">{s.title}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
