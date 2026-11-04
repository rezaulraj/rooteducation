"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries, services } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const company = [
  { label: "About us", href: "/about" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Book a consultation", href: "/consultation" },
  { label: "Contact us", href: "/contact" },
  { label: "Login", href: "/login" },
];

const offices = [
  { city: "London", address: "7 Kirkdale House, London, E11 1HP" },
  { city: "Dhaka", address: "Road 15, Sector 12, Uttara, Dhaka, Bangladesh-1230" },
];

// Deterministic positions, so server and browser draw the same sky.
const stars = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 137) % 1440,
  y: (i * 83) % 520,
  r: 0.7 + (i % 3) * 0.5,
}));

// The root system spreading down from the top edge: [path, stroke width, tip x, tip y].
const roots: [string, number, number, number][] = [
  ["M720 -10 C 716 90, 690 150, 610 220 S 470 330, 330 370", 5, 330, 370],
  ["M720 -10 C 724 100, 750 170, 840 230 S 1010 330, 1130 350", 5, 1130, 350],
  ["M720 -10 C 720 140, 716 260, 700 370 S 690 520, 640 640", 4, 640, 640],
  ["M610 220 C 540 240, 420 220, 250 150", 3, 250, 150],
  ["M840 230 C 930 240, 1060 210, 1250 130", 3, 1250, 130],
  ["M470 330 C 430 400, 340 470, 190 540", 2.5, 190, 540],
  ["M1010 330 C 1050 410, 1140 470, 1290 560", 2.5, 1290, 560],
  ["M700 370 C 760 430, 850 470, 960 610", 2.5, 960, 610],
  ["M250 150 C 190 130, 120 130, 50 90", 1.8, 50, 90],
  ["M1250 130 C 1310 110, 1360 100, 1420 60", 1.8, 1420, 60],
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center text-[0.95rem] text-white/65 transition-colors hover:text-white">
      <span aria-hidden className="mr-0 h-2.5 w-0 bg-brand transition-all duration-300 [clip-path:polygon(0_0,65%_0,100%_50%,65%_100%,0_100%)] group-hover:mr-2 group-hover:w-3.5" />
      {children}
    </Link>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div data-fl-col>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Jet() {
  return (
    <svg viewBox="0 0 200 84" className="h-full w-full" aria-hidden>
      <path d="M14 42 2 10h15l30 25Z" fill="#E4DCD4" />
      <path d="M2 10h15l8 7H6Z" fill="#F47A2A" />
      <path d="M10 43C40 30 120 26 170 30c20 2 28 10 26 14-6 8-76 10-136 8-25-1-42-4-50-9Z" fill="#FFFFFF" />
      <path d="M22 47c58 5 128 3 172-3" fill="none" stroke="#F47A2A" strokeWidth="3" />
      <path d="M172 32c9 1 16 5 19 9h-21Z" fill="#2B1E1F" />
      {Array.from({ length: 11 }, (_, i) => (
        <rect key={i} x={58 + i * 9.5} y="35" width="5" height="5" rx="1.5" fill="#2B1E1F" />
      ))}
      <path d="M92 47 60 80h20l50-33Z" fill="#D6CEC6" />
      <rect x="86" y="53" width="26" height="10" rx="5" fill="#B9B0A7" />
    </svg>
  );
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Read after mount: the page is prerendered, so a year read during render could go stale.
    const id = window.setTimeout(() => setYear(new Date().getFullYear()), 0);
    return () => window.clearTimeout(id);
  }, []);

  const toTop = () => {
    // SmoothScroll handles this; without it (reduced motion) it's a plain jump.
    if (document.documentElement.classList.contains("lenis")) window.dispatchEvent(new Event("scroll:top"));
    else window.scrollTo(0, 0);
  };

  useGSAP(
    () => {
      const section = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: section, start: "top bottom", end: "bottom bottom", scrub: 0.8 };

        // Scroll: the roots grow outwards, thickest first, and each tip lights up on arrival.
        gsap
          .timeline({ scrollTrigger: scrub, defaults: { ease: "none" } })
          .fromTo("[data-root]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, stagger: 0.09 }, 0)
          .fromTo("[data-root-tip]", { scale: 0 }, { scale: 1, duration: 0.15, stagger: 0.09, ease: "back.out(3)", transformOrigin: "50% 50%" }, 0.85)
          .fromTo("[data-fl-jet]", { x: "-30vw", y: 90, rotation: -2 }, { x: "64vw", y: -34, rotation: -9, duration: 0.85, ease: "power1.out" }, 0.96)
          .fromTo("[data-fl-cloud='near']", { xPercent: -30 }, { xPercent: 10, duration: 1.8 }, 0)
          .fromTo("[data-fl-cloud='far']", { xPercent: 20 }, { xPercent: -10, duration: 1.8 }, 0);

        // Arrival: columns rise in, the rule draws across, then the wordmark climbs over the horizon.
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: "[data-fl-grid]", start: "top 85%" } })
          .fromTo("[data-fl-col]", { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09 }, 0)
          .fromTo("[data-fl-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.35);
        gsap.fromTo(
          "[data-fl-letter]",
          { yPercent: 105 },
          { yPercent: 0, duration: 1.3, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: "[data-fl-word]", start: "top 96%" } },
        );

        // Ambient: stars twinkle and the jet rides a little turbulence.
        gsap.utils.toArray<SVGCircleElement>("[data-star]").forEach((s, i) => {
          if (i % 2) return;
          gsap.to(s, { opacity: 0.15, duration: 1.4 + (i % 5) * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: (i % 7) * 0.3 });
        });
        gsap.to("[data-fl-jet-body]", { y: 7, rotation: 1.5, duration: 2.1, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Each wordmark letter lifts as the cursor comes near, like wind passing over it.
        const word = section.querySelector<HTMLElement>("[data-fl-word]")!;
        const letters = gsap.utils.toArray<HTMLElement>("[data-fl-push]", word).map((el) => ({
          el,
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
        }));
        const move = (e: PointerEvent) => {
          letters.forEach(({ el, y }) => {
            const r = el.getBoundingClientRect();
            const d = Math.abs(e.clientX - (r.left + r.width / 2)) / r.width;
            y(-Math.max(0, 1 - d) * r.height * 0.14);
          });
        };
        const leave = () => letters.forEach(({ y }) => y(0));
        word.addEventListener("pointermove", move);
        word.addEventListener("pointerleave", leave);
        return () => {
          word.removeEventListener("pointermove", move);
          word.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative mx-3 mb-3 mt-3 overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#1A1214_0%,#141012_38%,#3A1C14_72%,#B5521F_90%,#F47A2A_100%)] text-white">
      {/* Night sky and root system */}
      <svg aria-hidden viewBox="0 0 1440 760" preserveAspectRatio="xMidYMin slice" className="pointer-events-none absolute inset-x-0 top-0 h-[760px] w-full">
        {stars.map((s, i) => (
          <circle key={i} data-star cx={s.x} cy={s.y} r={s.r} fill="#FFF3E8" opacity="0.7" />
        ))}
        <g fill="none" stroke="#F47A2A" strokeLinecap="round">
          {roots.map(([d, w], i) => (
            <path key={i} data-root d={d} strokeWidth={w} strokeOpacity="0.2" pathLength={1} strokeDasharray="1" />
          ))}
        </g>
        {roots.map(([, , x, y], i) => (
          <circle key={i} data-root-tip cx={x} cy={y} r="4" fill="#F47A2A" opacity="0.75" />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 sm:pt-24">
        <div data-fl-grid className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_0.9fr]">
          <div data-fl-col className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Root Education home" className="inline-block rounded-2xl bg-white px-4 py-2.5">
              <Image src="/logo.svg" alt="Root Education" width={110} height={44} unoptimized className="h-10 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-lg font-medium leading-snug tracking-tight text-white/90">Grow your future from strong roots.</p>
            <Link href="/consultation" className="group mt-7 inline-flex h-12 items-center gap-3 rounded-2xl bg-brand pl-5 pr-2 text-sm font-semibold text-white">
              Book a consultation
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#141012] transition-transform duration-300 group-hover:rotate-[-45deg]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>

          <Column title="Services">
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Countries">
            <ul className="space-y-2.5">
              {countries.map((c) => (
                <li key={c.href}>
                  <FooterLink href={c.href}>{c.tagline}</FooterLink>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Company">
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <FooterLink href={c.href}>{c.label}</FooterLink>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div data-fl-rule className="mt-14 h-px origin-left bg-white/20" />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_0.9fr]">
          <div data-fl-col>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Our offices</h2>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/65">Come and meet an advisor in person, in either city.</p>
          </div>
          {offices.map((o) => (
            <address key={o.city} data-fl-col className="not-italic">
              <p className="text-lg font-semibold tracking-tight">{o.city}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{o.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-white underline-offset-4 hover:text-brand hover:underline"
              >
                Get directions
              </a>
            </address>
          ))}
          <div data-fl-col className="lg:text-right">
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex h-12 items-center gap-3 rounded-2xl border border-white/25 pl-5 pr-2 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              Back to top
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M8 13V3M4 7l4-4 4 4" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizon: the jet, dusk clouds and the wordmark */}
      <div className="relative mt-20 sm:mt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
          <div data-fl-cloud="far" className="absolute -right-[5%] top-[8%] h-24 w-[38%] rounded-full bg-[#FFC79E]/20 blur-2xl" />
          <div data-fl-cloud="near" className="absolute -left-[6%] top-[34%] h-32 w-[42%] rounded-full bg-[#FFE3CC]/30 blur-2xl" />
        </div>

        <div aria-hidden data-fl-jet className="pointer-events-none absolute left-0 top-0 z-20 w-[clamp(110px,15vw,210px)]">
          <div data-fl-jet-body className="relative aspect-[200/84]">
            <span className="absolute right-[92%] top-[46%] h-0.5 w-[34vw] bg-gradient-to-r from-transparent to-white/55" />
            <Jet />
          </div>
        </div>

        <div data-fl-word aria-hidden className="relative z-10 flex select-none justify-center pt-12 text-[33vw] font-semibold leading-[0.78] tracking-[-0.05em] sm:pt-16">
          {"ROOT".split("").map((ch, i) => (
            <span key={i} data-fl-push className="block">
              <span className="block overflow-hidden pb-[0.02em]">
                <span
                  data-fl-letter
                  className="block bg-[linear-gradient(180deg,#FFF3E8_0%,#FFC79E_55%,#F47A2A_100%)] bg-clip-text pr-[0.05em] text-transparent"
                >
                  {ch}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-[#141012] px-6 py-4 text-xs text-white/60 sm:px-10">
        <p>
          © {year} Root Education. All rights reserved.
        </p>
        <p>London · Dhaka</p>
      </div>
    </footer>
  );
}
