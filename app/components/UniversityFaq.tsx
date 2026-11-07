"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Answers are placeholder copy: check them against how your service actually works.
const universityFaqs = [
  { q: "How do you help me choose the right university?", a: "We start with your goals, grades, budget and preferred countries, then compare programmes that fit and explain the trade-offs so you can choose with confidence." },
  { q: "What factors are considered in the selection process?", a: "Your course, academic record, budget, preferred city and lifestyle, language requirements, scholarship options and your career plans after graduation." },
  { q: "Do you assist with applications after university selection?", a: "Yes. We help you prepare documents, write personal statements and submit applications, and we keep track of deadlines with you." },
  { q: "How long does the university selection process take?", a: "It depends on your intake and how quickly your documents come together. Your advisor will give you a timeline at your first meeting." },
  { q: "Can I apply to multiple universities at the same time?", a: "Yes, and we usually recommend it. We help you build a balanced list and manage each application side by side." },
  { q: "Do you offer guidance for specific programmes or degrees?", a: "Yes. Whether it's medicine, engineering, business or another field, we look at programmes and entry requirements specific to your subject." },
  { q: "Is there a fee for the university selection service?", a: "Your advisor will explain exactly what's included, and any fees, before you commit to anything." },
  { q: "What if I need help with scholarships?", a: "We identify scholarships you're eligible for and help you prepare strong applications for them alongside your university applications." },
  { q: "What is the success rate of students using this service?", a: "Ask your advisor for recent outcomes for students with a profile like yours, so you get an answer that's actually relevant to you." },
  { q: "What if I already have a list of universities?", a: "Great, bring it along. We'll review it against your goals and profile, and suggest any changes or additions worth considering." },
];

export type Faq = { q: string; a: string };

export default function UniversityFaq({
  faqs = universityFaqs,
  intro = "The things students ask us most about choosing a university abroad.",
}: {
  faqs?: Faq[];
  intro?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root.current, start: "top 70%" } })
          .from("[data-uf-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1 })
          .fromTo("[data-uf-item]", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05 }, 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="uf-title" className="bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-3 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div data-uf-head className="lg:sticky lg:top-28 lg:self-start">
          <p className="inline-flex rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand">FAQ</p>
          <h2 id="uf-title" className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Questions, <span className="text-brand">answered.</span>
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/65">{intro}</p>
          <div className="mt-8 rounded-[24px] bg-[#FBF1E7] p-6">
            <p className="text-lg font-semibold tracking-tight text-ink">Still have a question?</p>
            <p className="mt-1 text-sm text-ink/60">Talk it through with an advisor.</p>
            <Link href="/contact" className="mt-4 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-brand">
              Contact us
            </Link>
          </div>
        </div>

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} data-uf-item>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`uf-a-${i}`}
                    id={`uf-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span className={`font-mono text-sm transition-colors ${isOpen ? "text-brand" : "text-ink/35"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`flex-1 text-lg font-semibold leading-snug tracking-tight transition-colors sm:text-xl ${isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"}`}>{f.q}</span>
                    <span
                      aria-hidden
                      className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
                        isOpen ? "rotate-[135deg] bg-brand text-white" : "bg-ink/5 text-ink group-hover:bg-ink/10"
                      }`}
                    >
                      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                      <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`uf-a-${i}`}
                  role="region"
                  aria-labelledby={`uf-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className={`pb-6 pl-11 pr-14 text-base leading-relaxed text-ink/65 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
