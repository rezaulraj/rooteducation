"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  { title: "Document preparation", icon: "document", copy: "Help gathering and formatting your transcripts, recommendation letters and identification documents." },
  { title: "Personal statement review", icon: "compass", copy: "Feedback on your drafts for clarity, engagement and fit with your chosen programme's values." },
  { title: "Application submission", icon: "university", copy: "Accurate, on-time submission that gives your application the best chance of acceptance." },
  { title: "Interview preparation", icon: "scholarship", copy: "Mock interviews that feel like the real thing, with honest feedback on how you did." },
  { title: "Visa guidance", icon: "passport", copy: "Support with your visa application so you meet every requirement and move through it smoothly." },
  { title: "Follow-up support", icon: "plane", copy: "We stay in touch after you submit, handling any extra requirements or updates from universities." },
];
const tabs = ["bg-brand", "bg-ink", "bg-[#FFC79E]"];

export default function ApplicationServices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-as-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });

        // Folders slide up out of a drawer: the tab peeks first, then the folder follows.
        gsap.utils.toArray<HTMLElement>("[data-as-row]").forEach((row) => {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none reverse" } })
            .fromTo(row.querySelectorAll("[data-as-folder]"), { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "expo.out" })
            .fromTo(row.querySelectorAll("[data-as-sheet]"), { yPercent: 40 }, { yPercent: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.6)" }, 0.35);
        });
      });
    },
    { scope: root },
  );

  const rows = [services.slice(0, 3), services.slice(3)];
  return (
    <section ref={root} aria-labelledby="as-title" className="overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-as-head className="text-center">
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">Services included</p>
          <h2 id="as-title" className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Everything in your <span className="text-brand">application file</span>
          </h2>
        </div>

        <div className="mt-16 space-y-6">
          {rows.map((row, r) => (
            <ul key={r} data-as-row className="grid gap-6 md:grid-cols-3">
              {row.map((s, i) => {
                const n = r * 3 + i;
                return (
                  <li key={s.title} data-as-folder className="group relative pt-7">
                    {/* Folder tab */}
                    <span className={`absolute left-0 top-0 flex h-8 w-36 items-center rounded-t-2xl pl-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] ${tabs[n % 3]} ${n % 3 === 1 ? "text-white" : "text-ink"}`}>
                      File {String(n + 1).padStart(2, "0")}
                    </span>
                    {/* A sheet of paper tucked inside, which rises on hover */}
                    <span data-as-sheet aria-hidden className="absolute left-40 right-6 top-3 h-24 rounded-xl border border-ink/10 bg-white shadow-sm transition-transform duration-500 group-hover:-translate-y-4">
                      <span className="mx-4 mt-3 block h-1.5 w-20 rounded-full bg-ink/10" />
                      <span className="mx-4 mt-2 block h-1.5 w-28 rounded-full bg-ink/10" />
                    </span>
                    <article className="relative flex h-full flex-col rounded-[24px] rounded-tl-none border border-ink/10 bg-[#FBF5EE] p-7 shadow-[0_24px_40px_-30px_rgba(90,40,10,0.5)] transition-colors duration-300 group-hover:bg-white">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon name={s.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-ink">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.copy}</p>
                    </article>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
