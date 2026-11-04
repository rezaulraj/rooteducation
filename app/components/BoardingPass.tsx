"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const dialCodes = [
  { code: "+880", from: "Bangladesh", pattern: /^0?1[3-9]\d{8}$/ },
  { code: "+44", from: "United Kingdom", pattern: /^0?\d{10}$/ },
];

// Fixed widths so server and browser draw the same barcode.
const bars = Array.from({ length: 34 }, (_, i) => ((i * 7 + 3) % 5) + 1);

const clouds = [
  { left: "3%", top: "14%", w: 240, depth: 60 },
  { left: "78%", top: "10%", w: 300, depth: 110 },
  { left: "88%", top: "58%", w: 220, depth: 40 },
  { left: "-4%", top: "66%", w: 300, depth: 90 },
];

const planePath = "M30 16c0-1.1-.9-2-2-2h-8.5L12 3.5H9.2L12.8 14H6.5L4 10.8H2l1.6 5.2L2 21.2h2l2.5-3.2h6.3L9.2 28.5H12l7.5-10.5H28c1.1 0 2-.9 2-2z";

/**
 * NOT CONNECTED YET: this only resolves, the number is not sent or stored anywhere.
 * Point it at your CRM or an API route before launch, or visitors will see a
 * confirmation while nobody receives their details.
 */
async function submitLead(lead: { phone: string }) {
  void lead;
}

export default function BoardingPass() {
  const root = useRef<HTMLElement>(null);
  const [dial, setDial] = useState(0);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const section = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Arrival: the two halves of the pass meet in the middle, then it "prints".
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: section, start: "top 65%" } })
          .fromTo("[data-bp-word]", { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.07 }, 0)
          .fromTo("[data-bp-stub]", { x: -180, rotation: -7, autoAlpha: 0 }, { x: 0, rotation: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out" }, 0.25)
          .fromTo("[data-bp-main]", { x: 180, rotation: 7, autoAlpha: 0 }, { x: 0, rotation: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out" }, 0.25)
          .fromTo("[data-bp-tag]", { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2.5)" }, 0.9)
          .fromTo("[data-bp-row]", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 0.75)
          .fromTo("[data-bp-bar]", { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.018, ease: "power2.out" }, 0.8)
          .fromTo("[data-bp-scan]", { top: "0%", autoAlpha: 1 }, { top: "100%", autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, 1.4);

        // A plane keeps crossing the route between FROM and TO.
        gsap.fromTo("[data-bp-route-plane]", { left: "0%" }, { left: "100%", duration: 3.6, ease: "sine.inOut", repeat: -1, repeatDelay: 0.5 });

        // Clouds slide at their own depth while scrolling, and drift gently all the time.
        gsap.utils.toArray<HTMLElement>("[data-bp-cloud]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: Number(el.dataset.depth) },
            { y: -Number(el.dataset.depth), ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } },
          );
          gsap.to(el.firstElementChild, { x: 60 + i * 15, duration: 10 + i * 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });

        // The pass leans gently towards the cursor.
        const pass = section.querySelector<HTMLElement>("[data-bp-tilt]")!;
        const rx = gsap.quickTo(pass, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(pass, "rotationY", { duration: 0.8, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = pass.getBoundingClientRect();
          rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
          ry(((e.clientX - r.left) / r.width - 0.5) * 5);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        pass.addEventListener("pointermove", move);
        pass.addEventListener("pointerleave", leave);
        return () => {
          pass.removeEventListener("pointermove", move);
          pass.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  // Confirmation: the barcode is scanned, the stamp lands and a plane takes off across the sky.
  useGSAP(
    () => {
      if (!done) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .fromTo("[data-bp-scan]", { top: "0%", autoAlpha: 1 }, { top: "100%", autoAlpha: 0, duration: 0.6, ease: "power1.inOut" }, 0)
          .fromTo("[data-bp-status]", { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: "power3.out" }, 0.3)
          .fromTo("[data-bp-stamp]", { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power4.in" }, 0.45)
          .fromTo("[data-bp-tilt]", { y: 0 }, { y: 8, duration: 0.07, yoyo: true, repeat: 3 }, 0.75)
          .fromTo("[data-bp-takeoff]", { x: "-10vw", y: 160, rotation: -14, autoAlpha: 1 }, { x: "110vw", y: -220, rotation: -22, duration: 2.6, ease: "power1.in" }, 0.7)
          .set("[data-bp-takeoff]", { autoAlpha: 0 });
      });
    },
    { scope: root, dependencies: [done] },
  );

  const shake = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("[data-bp-field]", { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1.2, 0.3)" });
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!dialCodes[dial].pattern.test(phone.replace(/[\s-]/g, ""))) {
      setError(true);
      shake();
      return;
    }
    await submitLead({ phone: `${dialCodes[dial].code}${phone.replace(/[\s-]/g, "")}` });
    setDone(true);
  };

  return (
    <section
      ref={root}
      aria-labelledby="bp-title"
      className="relative mx-3 overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FFF6EE_0%,#FFE3CC_45%,#FFC79E_100%)] px-4 py-20 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {clouds.map((c, i) => (
          <div key={i} data-bp-cloud data-depth={c.depth} className="absolute" style={{ left: c.left, top: c.top, width: c.w }}>
            <div className="h-16 rounded-full bg-white/75 blur-xl" />
          </div>
        ))}
      </div>

      <div aria-hidden data-bp-takeoff className="invisible pointer-events-none absolute left-0 top-1/2 z-20">
        <svg viewBox="0 0 32 32" className="h-16 w-16" fill="#141012">
          <path d={planePath} />
        </svg>
      </div>

      <h2 id="bp-title" className="relative text-center text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
        <span className="block overflow-hidden pb-[0.08em]">
          <span data-bp-word className="block">Ready to</span>
        </span>
        <span className="block overflow-hidden pb-[0.08em]">
          <span data-bp-word className="block">
            take <span className="text-brand">off?</span>
          </span>
        </span>
      </h2>

      <div className="relative mx-auto mt-12 max-w-4xl [perspective:1400px]">
        <div data-bp-tilt className="grid gap-2 drop-shadow-[0_30px_40px_rgba(120,60,20,0.28)] sm:grid-cols-[300px_1fr] sm:gap-1">
          {/* Stub: the form */}
          <form
            data-bp-stub
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col rounded-[24px] bg-white p-3 sm:[mask-composite:intersect] sm:[mask-image:radial-gradient(circle_14px_at_100%_0,transparent_97%,#000),radial-gradient(circle_14px_at_100%_100%,transparent_97%,#000)]"
          >
            <div className="px-3 pt-4">
              <Image src="/logo.svg" alt="Root Education" width={110} height={44} unoptimized className="h-11 w-auto" />
            </div>

            <div className="px-3 pb-6 pt-9">
              <div data-bp-field className={`flex items-center gap-2 border-b-2 pb-2 transition-colors ${error ? "border-[#C8102E]" : "border-ink/15 focus-within:border-brand"}`}>
                <label htmlFor="bp-dial" className="sr-only">Country code</label>
                <select
                  id="bp-dial"
                  value={dial}
                  disabled={done}
                  onChange={(e) => {
                    setDial(Number(e.target.value));
                    setError(false);
                  }}
                  className="bg-transparent text-sm font-medium text-ink outline-none"
                >
                  {dialCodes.map((d, i) => (
                    <option key={d.code} value={i}>{d.code}</option>
                  ))}
                </select>
                <span aria-hidden className="h-5 w-px bg-ink/15" />
                <label htmlFor="bp-phone" className="sr-only">Phone number</label>
                <input
                  id="bp-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Phone number"
                  value={phone}
                  disabled={done}
                  aria-invalid={error}
                  aria-describedby={error ? "bp-error" : undefined}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(false);
                  }}
                  className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                />
              </div>
              <p id="bp-error" role="alert" className="mt-2 min-h-4 text-xs text-[#C8102E]">
                {error ? "Enter a valid phone number" : ""}
              </p>
            </div>

            <button
              type="submit"
              disabled={done}
              className="group mt-auto flex h-20 items-center justify-center gap-3 rounded-[18px] bg-ink text-lg font-semibold text-white transition-colors hover:bg-brand disabled:bg-[#3F7D5E]"
            >
              {done ? "You're on board" : "Start your journey"}
              {!done && (
                <svg viewBox="0 0 16 16" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              )}
            </button>
          </form>

          {/* Main ticket */}
          <div
            data-bp-main
            className="relative flex overflow-hidden rounded-[24px] bg-white sm:[mask-composite:intersect] sm:[mask-image:radial-gradient(circle_14px_at_0_0,transparent_97%,#000),radial-gradient(circle_14px_at_0_100%,transparent_97%,#000)]"
          >
            <div className="relative min-w-0 flex-1 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">Get your boarding pass</p>
                <span data-bp-tag aria-hidden className="grid h-14 w-[4.5rem] shrink-0 place-items-center bg-brand pr-3 text-white [clip-path:polygon(0_0,75%_0,100%_50%,75%_100%,0_100%)]">
                  <Icon name="scholarship" className="h-7 w-7" />
                </span>
              </div>

              <div data-bp-row className="mt-6 flex items-center gap-4">
                <div className="shrink-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">From</p>
                  <p className="text-sm font-semibold text-ink">{dialCodes[dial].from}</p>
                </div>
                <div aria-hidden className="relative h-5 flex-1 min-w-10">
                  <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-brand/50" />
                  <svg data-bp-route-plane viewBox="0 0 32 32" className="absolute top-0 -ml-2.5 h-5 w-5" fill="#F47A2A">
                    <path d={planePath} />
                  </svg>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">To</p>
                  <p className="text-sm font-semibold text-ink">Dream university</p>
                </div>
              </div>

              <dl data-bp-row className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/15 pt-3">
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">Status</dt>
                  <dd className="mt-1 overflow-hidden text-sm font-semibold text-ink">
                    <span data-bp-status className={`block ${done ? "text-[#2F7A56]" : ""}`}>{done ? "Confirmed" : "Now boarding"}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">Seat</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">1A</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/45">Group</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">First class</dd>
                </div>
              </dl>

              <p data-bp-row className="mt-5 text-xs leading-relaxed text-ink/55 sm:max-w-[19rem]">
                From your first consultation to your first lecture, Root Education guides you through universities, applications, scholarships and visas across Europe and the UK.
              </p>

              {done && (
                <div className="mt-4 w-fit rotate-[-6deg] sm:absolute sm:bottom-5 sm:right-5 sm:mt-0 sm:rotate-[-10deg]">
                  <p data-bp-stamp role="status" className="rounded-xl border-[3px] border-[#2F7A56] bg-white/90 px-3 py-1.5 text-center font-mono text-xs font-bold uppercase leading-tight tracking-[0.14em] text-[#2F7A56]">
                    Boarding
                    <br />
                    confirmed
                  </p>
                </div>
              )}
            </div>

            {/* Barcode */}
            <div aria-hidden className="relative hidden w-14 shrink-0 flex-col justify-between overflow-hidden bg-brand px-2 py-3 sm:flex">
              {bars.map((h, i) => (
                <span key={i} data-bp-bar className="block origin-left bg-[#3A1E12]" style={{ height: h + 1 }} />
              ))}
              <span data-bp-scan className="invisible absolute inset-x-0 h-1 bg-white shadow-[0_0_14px_4px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
