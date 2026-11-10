"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { universityDetails } from "./romaniaUniversityDetails";
import UniversityModal, { UniversityLogo, type Logo } from "./UniversityModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const RED = "#B3132B";

// Partner institutions, with their official logos.
const institutions: {
  name: string;
  short: string;
  city: string;
  type: string;
  focus: string[];
  copy: string;
  logo: Logo;
  tone: { bg: string; fg: string; seal: string };
}[] = [
  {
    name: "Spiru Haret University",
    short: "SH",
    logo: { src: "/univercity/logo_ush.png", width: 300, height: 261, chip: "circle" },
    city: "Bucharest",
    type: "Private university",
    focus: ["Law", "Economics", "Psychology", "Sciences"],
    copy: "One of Romania's largest private universities, with faculties across many fields.",
    tone: { bg: "#141012", fg: "#FFFFFF", seal: "#F47A2A" },
  },
  {
    name: "Constanța Maritime University",
    short: "CMU",
    logo: { src: "/univercity/logo_cmu.png", width: 350, height: 100, chip: "pill" },
    city: "Constanța",
    type: "Public university",
    focus: ["Navigation", "Marine engineering", "Electrical engineering", "Port management"],
    copy: "Specialist maritime training on the Black Sea coast, preparing officers and engineers for the shipping industry.",
    tone: { bg: "#0D3B66", fg: "#FFFFFF", seal: "#7FB5E6" },
  },
  {
    name: "Romanian-American University",
    short: "RAU",
    // Drawn in white for dark backgrounds, so it sits straight on the red card.
    logo: { src: "/univercity/logo_RAU.png", width: 187, height: 86, chip: "none" },
    city: "Bucharest",
    type: "Private university",
    focus: ["Business", "Economics", "Computer science", "Law"],
    copy: "A Bucharest university built on an American-style academic model, with a strong business focus.",
    tone: { bg: RED, fg: "#FFFFFF", seal: "#FFD8DE" },
  },
];

export default function RomaniaInstitutions() {
  const root = useRef<HTMLElement>(null);
  // The popup grows out of the point that was clicked (keyboard: the middle of the screen).
  const [open, setOpen] = useState<{ i: number; x: number; y: number } | null>(null);
  const openAt = (i: number, e: MouseEvent<HTMLElement>) => setOpen({ i, x: e.clientX || window.innerWidth / 2, y: e.clientY || window.innerHeight / 2 });

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root.current, start: "top 70%" } })
          .from("[data-ri-head] > *", { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.1 })
          .fromTo("[data-ri-path]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.3)
          .fromTo("[data-ri-card]", { y: 80, rotationX: -35, autoAlpha: 0 }, { y: 0, rotationX: 0, autoAlpha: 1, duration: 1.1, stagger: 0.15, ease: "expo.out" }, 0.4)
          .fromTo("[data-ri-seal]", { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 1, stagger: 0.15, ease: "back.out(1.6)" }, 0.6)
          .fromTo("[data-ri-tag]", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.03 }, 1);
      });
    },
    { scope: root },
  );

  // Cards tilt towards the pointer.
  const tilt = contextSafe((e: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      rotationY: ((e.clientX - r.left) / r.width - 0.5) * 10,
      rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8,
      duration: 0.6,
      ease: "power3.out",
    });
  });
  const reset = contextSafe((e: PointerEvent<HTMLElement>) => gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" }));

  return (
    <section ref={root} aria-labelledby="ri-title" className="relative overflow-x-clip bg-white px-3 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-3">
        <div data-ri-head className="text-center">
          <p className="inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold" style={{ borderColor: `${RED}55`, color: RED }}>
            Our partners in Romania
          </p>
          <h2 id="ri-title" className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            Leading institutions <span style={{ color: RED }}>we represent</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/60">
            Apply through Root Education and our advisors guide your application to these universities from start to finish.
          </p>
        </div>

        <div className="relative mt-16">
          {/* A route linking the three, drawn as the section arrives */}
          <svg aria-hidden viewBox="0 0 1000 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-12 hidden h-24 w-full lg:block">
            <path data-ri-path d="M120 70 C 300 -10, 400 -10, 500 50 S 700 110, 880 30" fill="none" stroke={RED} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" pathLength={1} />
          </svg>

          <ul className="relative grid grid-cols-[minmax(0,1fr)] gap-6 [perspective:1200px] md:grid-cols-3">
            {institutions.map((u, idx) => (
              // The click lives on the wrapper: while a card is tilted in 3D, clicks can land on the
              // wrapper instead of the card itself.
              <li key={u.name} data-ri-card onClick={(e) => openAt(idx, e)} className="cursor-pointer [transform-style:preserve-3d]">
                <article
                  onPointerMove={tilt}
                  onPointerLeave={reset}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] p-7 shadow-[0_40px_70px_-40px_rgba(20,16,18,0.6)] [transform-style:preserve-3d] sm:p-8"
                  style={{ background: u.tone.bg, color: u.tone.fg }}
                >
                  <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="flex min-h-24 flex-wrap items-start justify-between gap-3">
                    <span data-ri-seal className="block [transform:translateZ(40px)]">
                      <UniversityLogo name={u.name} logo={u.logo} />
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{u.type}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight [transform:translateZ(30px)]">{u.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium opacity-80">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.5 8.5 4.5 8.5s4.5-5.3 4.5-8.5A4.5 4.5 0 0 0 8 1.5Zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Z" />
                    </svg>
                    {u.city}, Romania
                  </p>
                  <p className="mt-4 text-sm leading-relaxed opacity-75">{u.copy}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {u.focus.map((f) => (
                      <li key={f} data-ri-tag className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAt(idx, e);
                    }}
                    className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-sm font-semibold underline-offset-4 group-hover:underline"
                  >
                    View programmes &amp; eligibility
                    <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && (
        <UniversityModal
          uni={{ ...institutions[open.i], ...universityDetails[institutions[open.i].short] }}
          origin={{ x: open.x, y: open.y }}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
