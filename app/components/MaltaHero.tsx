"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmbroideryBand from "./EmbroideryBand";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Mediterranean palette: lagoon turquoise, deep sea, Maltese red and the sun on limestone.
const LAGOON = "#19B5C2";
const RED = "#CF142B";
const SUN = "#F6C453";

// Photos are free under the Unsplash License. The first card opens out to fill the screen.
const cards = [
  { id: "1669294841689-0ceb34ad40c1", place: "Valletta", note: "Grand Harbour", alt: "The Grand Harbour, with Fort St Angelo and Maltese balconies", x: 0, y: 0, r: 0 },
  { id: "1669718022108-505b40ed2e65", place: "Sliema", note: "Seafront", alt: "Aerial view of the Sliema seafront", x: -64, y: -10, r: -11 },
  { id: "1569227726523-5b0cdc550fd8", place: "Mdina", note: "Silent City", alt: "St Paul's Cathedral in Mdina at sunset", x: 62, y: -16, r: 10 },
  { id: "1668647184912-67da07256e3e", place: "Gozo", note: "Sister island", alt: "Ramla Bay on Gozo", x: -40, y: 34, r: -5 },
];

const chips = ["English-taught", "EU degrees", "300+ sunny days", "Schengen"];
const ticker = ["Study in English", "EU-recognised degrees", "Mediterranean lifestyle", "Work 20 hrs a week", "Schengen travel", "Safe island community"];

const facts = [
  { label: "Capital", value: "Valletta" },
  { label: "Currency", value: "Euro" },
  { label: "Languages", value: "Maltese & English" },
  { label: "In the EU", value: "Since 2004" },
];

/** The eight-pointed Maltese cross. */
function MalteseCross({ className = "", color = RED }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {[0, 90, 180, 270].map((a) => (
        <path key={a} fill={color} d="M50 50 33 6 50 18 67 6Z" transform={`rotate(${a} 50 50)`} />
      ))}
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function MaltaHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-mt-stage]")!;
      const lead = section.querySelector<HTMLElement>("[data-mt-card='0']")!;
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-mt-card]");

      // Every card is centred in the deck, then fanned out by its own offset.
      cardEls.forEach((el, i) => {
        const c = cards[i];
        gsap.set(el, { xPercent: -50 + c.x, yPercent: -50 + c.y, rotation: c.r });
      });

      // The ticker loops for everyone; it is purely decorative.
      gsap.to("[data-mt-ticker]", { xPercent: -50, duration: 40, ease: "none", repeat: -1 });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Where the lead card sits, as a clip-path inset of the stage, so the full photo can grow out of it.
        let box = { t: 0, r: 0, b: 0, l: 0 };
        // Measured from layout, not from bounding boxes, so the arrival, float and tilt transforms don't skew it.
        const deckEl = section.querySelector<HTMLElement>("[data-mt-deck]")!;
        const measure = () => {
          let x = 0;
          let y = 0;
          for (let el: HTMLElement | null = deckEl; el && el !== stage; el = el.offsetParent as HTMLElement | null) {
            x += el.offsetLeft;
            y += el.offsetTop;
          }
          const size = deckEl.offsetWidth;
          const w = lead.offsetWidth;
          const h = w * 1.25;
          const cx = x + size / 2;
          const cy = y + size / 2;
          box = { l: cx - w / 2, t: cy - h / 2, r: stage.offsetWidth - cx - w / 2, b: stage.offsetHeight - cy - h / 2 };
        };
        const clip = () => `inset(${box.t}px ${box.r}px ${box.b}px ${box.l}px round 22px)`;
        measure();

        // Arrival.
        gsap
          .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
          .fromTo("[data-mt-glow]", { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.4, stagger: 0.2 }, 0)
          .fromTo("[data-mt-cross]", { rotation: -180, scale: 0 }, { rotation: 0, scale: 1, duration: 1.4 }, 0.1)
          .fromTo("[data-mt-line]", { yPercent: 115, rotation: 4 }, { yPercent: 0, rotation: 0, duration: 1.3, stagger: 0.12 }, 0.15)
          .fromTo("[data-mt-fade]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.45)
          .fromTo("[data-mt-chip]", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: "back.out(2)" }, 0.75)
          .fromTo("[data-mt-deal]", { y: "55svh", scale: 0.7 }, { y: 0, scale: 1, duration: 1.5, stagger: { each: 0.12, from: "end" } }, 0.3)
          .fromTo("[data-mt-tag]", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 1.3)
          .fromTo("[data-mt-strip]", { yPercent: 100 }, { yPercent: 0, duration: 1.2, ease: "power3.out" }, 0.6)
          .fromTo("[data-mt-word]", { xPercent: 8, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 2.2, ease: "power3.out" }, 0.2);

        // Gentle idle drift, on inner wrappers so it never fights the scroll.
        gsap.utils.toArray<HTMLElement>("[data-mt-float]").forEach((el, i) => {
          gsap.to(el, { y: i % 2 ? 10 : -10, rotation: i % 2 ? 1.2 : -1.2, duration: 3 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
        });

        // Tilt the whole deck towards the pointer.
        const deck = deckEl;
        const rx = gsap.quickTo(deck, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(deck, "rotationY", { duration: 0.8, ease: "power3.out" });
        const gx = gsap.quickTo("[data-mt-glow='sun']", "x", { duration: 1.6, ease: "power3.out" });
        const gy = gsap.quickTo("[data-mt-glow='sun']", "y", { duration: 1.6, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          if (window.scrollY > 40) return;
          const px = e.clientX / window.innerWidth - 0.5;
          const py = e.clientY / window.innerHeight - 0.5;
          ry(px * 14);
          rx(-py * 10);
          gx(px * 60);
          gy(py * 40);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);

        // Scroll: the side cards scatter, the Valletta card opens to fill the screen, and the story rises.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: "+=200%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onRefresh: measure,
              onLeaveBack: onLeave,
            },
          })
          .to("[data-mt-intro]", { y: -60, autoAlpha: 0, duration: 0.18 }, 0)
          .to(deck, { rotationX: 0, rotationY: 0, duration: 0.1 }, 0)
          .to("[data-mt-strip]", { yPercent: 110, duration: 0.18, ease: "power2.in" }, 0)
          .to("[data-mt-word]", { xPercent: -25, duration: 0.6 }, 0)
          .to("[data-mt-tag]", { autoAlpha: 0, duration: 0.08 }, 0)
          .to(cardEls.slice(1), {
            xPercent: (i: number) => -50 + cards[i + 1].x * 4.5,
            yPercent: (i: number) => -50 + cards[i + 1].y * 3 - 20,
            rotation: (i: number) => cards[i + 1].r * 3,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
          }, 0.02)
          .set("[data-mt-full]", { autoAlpha: 1 }, 0.12)
          .set(lead, { autoAlpha: 0 }, 0.13)
          .fromTo("[data-mt-full]", { clipPath: clip }, { clipPath: "inset(0px 0px 0px 0px round 28px)", duration: 0.4, ease: "power2.inOut", immediateRender: false }, 0.12)
          .fromTo("[data-mt-full-img]", { scale: 1.35 }, { scale: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 0.12)
          .fromTo("[data-mt-shade]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.45)
          .set("[data-mt-final]", { autoAlpha: 1 }, 0.55)
          .fromTo("[data-mt-flag]", { scaleX: 0 }, { scaleX: 1, duration: 0.12, stagger: 0.04, ease: "power2.out" }, 0.56)
          .fromTo("[data-mt-final-line]", { yPercent: 115 }, { yPercent: 0, duration: 0.18, stagger: 0.05, ease: "power3.out" }, 0.6)
          .fromTo("[data-mt-copy]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" }, 0.7)
          .fromTo("[data-mt-fact]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.15, stagger: 0.04, ease: "power3.out" }, 0.74)
          .to({}, { duration: 0.12 });

        return () => {
          stage.removeEventListener("pointermove", onMove);
          stage.removeEventListener("pointerleave", onLeave);
        };
      });

      // Reduced motion: a still postcard deck, no pinning.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-mt-final], [data-mt-full]", { autoAlpha: 0 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-mt-stage
        aria-labelledby="mt-title"
        className="relative h-[calc(100svh-24px)] min-h-[720px] overflow-hidden rounded-[28px] text-white"
        style={{ background: "radial-gradient(90% 80% at 72% 38%, #0E7C8A 0%, #07434F 48%, #03212A 100%)" }}
      >
        {/* Light: the sun on the water, and the lagoon glowing up from below */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div data-mt-glow="sun" className="absolute -top-48 right-[6%] h-[34rem] w-[34rem] rounded-full opacity-40 mix-blend-screen blur-3xl" style={{ background: "radial-gradient(circle, #FFE7B0 0%, rgba(255,214,140,0.4) 35%, transparent 65%)" }} />
          <div data-mt-glow className="absolute -bottom-48 -left-24 h-[36rem] w-[36rem] rounded-full opacity-70 blur-3xl" style={{ background: `radial-gradient(circle, ${LAGOON} 0%, transparent 65%)` }} />
          {/* Fine sea lines */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" preserveAspectRatio="none" viewBox="0 0 1200 800">
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M-20 ${430 + i * 42} C 300 ${400 + i * 42}, 600 ${470 + i * 42}, 1220 ${420 + i * 42}`} fill="none" stroke="#fff" strokeWidth="1" />
            ))}
          </svg>
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
        </div>

        {/* Giant outlined name behind everything */}
        <p
          data-mt-word
          aria-hidden
          className="pointer-events-none absolute bottom-16 left-0 select-none whitespace-nowrap text-[26vw] font-semibold leading-none tracking-[-0.06em] text-transparent sm:bottom-12"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          MALTA · MALTA
        </p>

        <div className="relative z-10 mx-auto grid h-full max-w-6xl content-center items-center gap-6 px-6 pb-44 pt-24 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:pb-40">
          {/* Story */}
          <div data-mt-intro className="text-center lg:text-left">
            <p data-mt-fade className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] backdrop-blur-md sm:text-xs">
              <span data-mt-cross className="grid h-7 w-7 place-items-center rounded-full bg-white">
                <MalteseCross className="h-4 w-4" />
              </span>
              Studja f&apos;Malta
            </p>
            <h1 id="mt-title" className="mt-5 text-[clamp(2.9rem,7.2vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-mt-line className="block origin-bottom-left">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-mt-line
                  className="inline-block origin-bottom-left bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${LAGOON} 0%, #8BE8EC 45%, ${SUN} 100%)` }}
                >
                  Malta.
                </span>
              </span>
            </h1>
            <p data-mt-fade className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-lg lg:mx-0">
              English-taught, EU-recognised degrees on a safe, sunny island in the heart of the Mediterranean.
            </p>
            <ul className="mt-5 hidden flex-wrap justify-center gap-2 sm:flex lg:justify-start">
              {chips.map((c) => (
                <li key={c} data-mt-chip className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md">
                  {c}
                </li>
              ))}
            </ul>
            <div data-mt-fade className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link href="/consultation" className="group inline-flex h-12 items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Plan my move to Malta
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <Arrow />
                </span>
              </Link>
              <a href="#why" className="inline-flex h-12 items-center rounded-2xl border border-white/20 px-5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10">
                Explore the guide
              </a>
            </div>
          </div>

          {/* Postcard deck */}
          <div className="flex justify-center [perspective:1200px]">
            <div data-mt-deck className="relative aspect-square w-[min(74vw,34svh)] [transform-style:preserve-3d] lg:w-[min(40vw,62svh)]">
              {cards.map((c, i) => (
                <div
                  key={c.id}
                  data-mt-card={i}
                  className="absolute left-1/2 top-1/2 w-[48%]"
                  style={{ zIndex: i === 0 ? 4 : 3 - i }}
                >
                  <div data-mt-deal>
                    <div data-mt-float className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#07434F] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                      <Image src={u(c.id)} alt={c.alt} fill preload={i === 0} sizes="(min-width:1024px) 22vw, 40vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      <div data-mt-tag className={`absolute inset-x-3 bottom-3 flex items-end gap-2 ${c.x > 0 ? "flex-row-reverse text-right" : "justify-between"}`}>
                        <div>
                          <p className="text-sm font-semibold leading-tight sm:text-base">{c.place}</p>
                          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/70">{c.note}</p>
                        </div>
                        {i === 0 && (
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/90">
                            <MalteseCross className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* A cross-stitched band, sewn in above the ticker */}
        <div data-mt-strip className="pointer-events-none absolute inset-x-0 bottom-[60px] z-20 hidden sm:block">
          <EmbroideryBand id="malta" colors={["#F6E7C8", "#E8475A", "#F6C453"]} motifs={["cross", "star", "rhombus"]} size={5} />
        </div>

        {/* Ticker of reasons */}
        <div data-mt-strip aria-hidden className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-white/10 bg-black/20 py-3.5 backdrop-blur-md">
          <div data-mt-ticker className="flex w-max">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {ticker.map((t) => (
                  <span key={t} className="flex items-center gap-6 pr-6 text-sm font-medium tracking-tight text-white/80 sm:text-base">
                    {t}
                    <MalteseCross className="h-3.5 w-3.5" color={SUN} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* The Valletta card, opened to fill the screen */}
        <div data-mt-full aria-hidden className="invisible absolute inset-0 z-30">
          <div data-mt-full-img className="absolute inset-0">
            <Image src={u(cards[0].id, 2400)} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div data-mt-shade className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,22,28,0.92)_0%,rgba(3,22,28,0.45)_50%,rgba(3,22,28,0.15)_100%)] opacity-0" />
        </div>

        {/* After the dive */}
        <div data-mt-final className="invisible absolute inset-0 z-40">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div aria-hidden className="flex h-2 w-28 overflow-hidden rounded-full">
              {["#FFFFFF", RED].map((c) => (
                <span key={c} data-mt-flag className="h-full flex-1 origin-left" style={{ background: c }} />
              ))}
            </div>
            <p aria-hidden className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-mt-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-mt-final-line
                  className="inline-block bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(100deg, ${LAGOON} 0%, #8BE8EC 50%, ${SUN} 100%)` }}
                >
                  by the Mediterranean
                </span>
              </span>
            </p>
            <div data-mt-copy className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                EU-recognised degrees taught in English, a safe island community and easy access to the rest of Europe.
              </p>
              <Link href="/consultation" className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink">
                Talk to a Malta advisor
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <Arrow />
                </span>
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} data-mt-fact>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{f.label}</dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
