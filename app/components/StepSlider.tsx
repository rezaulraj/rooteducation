"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const photo = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

/** The eight steps, one full slide each: a big word, a photo for the slide and a second photo for the overlay. */
const SLIDES = [
  {
    word: "Chat",
    title: "Initial Chat",
    text: "We start with a friendly chat to learn about your dreams. This helps us know how best to support you.",
    bg: "#6D597A",
    img: "1522202176988-66273c2fd55f",
    ov: "1600880292203-757bb62b4baf",
  },
  {
    word: "Plan",
    title: "Personal Study Plan",
    text: "We design a study plan just for you. This plan lists the courses and programs that fit your goals.",
    bg: "#355070",
    img: "1484480974693-6ca0a78fb36b",
    ov: "1517842645767-c639042777db",
  },
  {
    word: "Choose",
    title: "Choosing the Right University",
    text: "We help you find universities that suit your needs. We consider location, reputation, and what they offer.",
    bg: "#B56576",
    img: "1562774053-701939374585",
    ov: "1529070538774-1843cb3265df",
  },
  {
    word: "Apply",
    title: "Application Help",
    text: "Our team guides you through the application steps. We make sure your documents are correct and on time.",
    bg: "#7A6C78",
    img: "1586281380349-632531db7ed4",
    ov: "1554224155-6726b3ff858f",
  },
  {
    word: "Fund",
    title: "Scholarship Support",
    text: "We assist you in finding scholarships to ease financial worries. Our guidance helps you secure the necessary funds.",
    bg: "#3D5A4C",
    img: "1541339907198-e08756dedf3f",
    ov: "1627556704302-624286467c65",
  },
  {
    word: "Visa",
    title: "Visa Process Made Simple",
    text: "We simplify the visa application process for you. Our experts are here to guide you every step of the way.",
    bg: "#8A5A44",
    img: "1530521954074-e64f6810b32d",
    ov: "1569949381669-ecf31ae8e613",
  },
  {
    word: "Prep",
    title: "Embassy Interview Prep",
    text: "We prepare you for embassy interviews with practice sessions. This boosts your confidence for the real meeting.",
    bg: "#4A4E69",
    img: "1521791136064-7986c2920216",
    ov: "1556761175-5973dc0f32e7",
  },
  {
    word: "Fly",
    title: "Getting Ready to Go",
    text: "Before you leave, we brief you on what to expect abroad. This ensures you're ready for your new adventure.",
    bg: "#C0763F",
    img: "1436491865332-7a61a109cc05",
    ov: "1488085061387-422e29b40080",
  },
];

const LAST = SLIDES.length - 1;
// How much page scroll each step takes, as a share of the window height.
const SCROLL_PER_STEP = 0.85;

const pad = (n: number) => String(n).padStart(2, "0");

function Chevron({ dir }: { dir: 1 | -1 }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 ${dir < 0 ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function StepSlider() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const jumpRef = useRef<(to: number) => void>(() => {});
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const slides = q("[data-s-slide]");
      const outers = q("[data-s-outer]");
      const inners = q("[data-s-inner]");
      const headings = q("[data-s-heading]");
      const slideImgs = q("[data-s-img]");
      const texts = slides.map((s) => s.querySelectorAll("[data-s-text] > *"));
      const overlays = q("[data-s-ov]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let index = 0;
      let wanted = 0;
      let animating = false;

      gsap.set(slides, { autoAlpha: 0, zIndex: 0 });
      gsap.set(overlays, { autoAlpha: 0, zIndex: 0 });
      gsap.set([slides[0], overlays[0]], { autoAlpha: 1, zIndex: 1 });
      gsap.set(outers, { xPercent: 100 });
      gsap.set(inners, { xPercent: -100 });
      gsap.set([outers[0], inners[0]], { xPercent: 0 });

      function go(to: number) {
        if (animating || to === index) return;
        animating = true;
        const from = index;
        const dir = to > from ? 1 : -1;

        gsap.set([slides, overlays], { zIndex: 0, autoAlpha: 0 });
        gsap.set([slides[from], overlays[to]], { zIndex: 1, autoAlpha: 1 });
        gsap.set([slides[to], overlays[from]], { zIndex: 2, autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "expo.inOut" },
          onComplete: () => {
            animating = false;
            // If the reader kept scrolling while this played, catch up.
            if (wanted !== index) go(wanted);
          },
        });
        tl.call(
          () => {
            if (count.current) count.current.textContent = pad(to + 1);
          },
          undefined,
          0.32,
        )
          // The new slide wipes in from the side, its inner layer counter-moving for a parallax reveal.
          .fromTo(outers[to], { xPercent: 100 * dir }, { xPercent: 0 }, 0)
          .fromTo(inners[to], { xPercent: -100 * dir }, { xPercent: 0 }, 0)
          // The old word thins out and drifts away; the new one arrives thin and gains weight.
          .to(
            headings[from],
            { fontWeight: 100, letterSpacing: "0.12em", xPercent: 30 * dir },
            0,
          )
          .fromTo(
            headings[to],
            { fontWeight: 100, letterSpacing: "0.12em", xPercent: -30 * dir },
            { fontWeight: 900, letterSpacing: "-0.04em", xPercent: 0 },
            0,
          )
          // The overlay photos cross, stretched as they move.
          .fromTo(
            overlays[to],
            { xPercent: 125 * dir, scaleX: 1.5, scaleY: 1.3 },
            { xPercent: 0, scaleX: 1, scaleY: 1 },
            0,
          )
          .fromTo(
            overlays[from],
            { xPercent: 0, scaleX: 1, scaleY: 1 },
            { xPercent: -125 * dir, scaleX: 1.5, scaleY: 1.3 },
            0,
          )
          .fromTo(slideImgs[to], { scale: 2 }, { scale: 1 }, 0)
          .fromTo(
            texts[to],
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.07,
              ease: "expo.out",
            },
            0.55,
          )
          // Skipping several steps at once plays a little faster.
          .timeScale(Math.abs(wanted - from) > 1 ? 1.4 : 0.9);
        if (reduce) tl.progress(1);

        index = to;
        setCurrent(to);
      }

      // Scroll drives the slides: the section stays pinned while each stretch of scrolling moves one step on,
      // and it settles on the nearest step when the reader stops.
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${LAST * window.innerHeight * SCROLL_PER_STEP}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / LAST,
          duration: { min: 0.25, max: 0.7 },
          delay: 0.08,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          gsap.set(bar.current, { scaleX: self.progress });
          const to = Math.round(self.progress * LAST);
          if (to === wanted) return;
          wanted = to;
          go(to);
        },
      });

      // Buttons, dots and keys scroll the page to that step, so scroll and slide always agree.
      jumpRef.current = (to: number) => {
        const target = Math.max(0, Math.min(LAST, to));
        const y = st.start + ((st.end - st.start) * target) / LAST;
        if (reduce) window.scrollTo({ top: y });
        else window.dispatchEvent(new CustomEvent("scroll:to", { detail: y }));
      };

      // The first slide's intro as the section arrives.
      if (!reduce) {
        const arrive = { trigger: root.current, start: "top 70%" };
        gsap.fromTo(
          headings[0],
          { fontWeight: 100, letterSpacing: "0.12em", xPercent: -10 },
          {
            fontWeight: 900,
            letterSpacing: "-0.04em",
            xPercent: 0,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: arrive,
          },
        );
        gsap.fromTo(
          slideImgs[0],
          { scale: 1.6 },
          { scale: 1, duration: 1.8, ease: "expo.out", scrollTrigger: arrive },
        );
        gsap.fromTo(
          overlays[0],
          { xPercent: 60, scaleX: 1.3 },
          {
            xPercent: 0,
            scaleX: 1,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: arrive,
          },
        );
      }
    },
    { scope: root },
  );

  const jump = (to: number) => jumpRef.current(to);

  return (
    <section
      id="journey"
      className="px-3"
      aria-label="How we work, step by step"
    >
      <div
        ref={root}
        tabIndex={0}
        aria-roledescription="carousel"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            jump(current + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            jump(current - 1);
          }
        }}
        className="relative h-[100svh] min-h-[600px] select-none overflow-hidden rounded-[28px] bg-[#2E1212] text-white outline-none focus-visible:ring-4 focus-visible:ring-brand/50"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.word}
            data-s-slide
            className="absolute inset-0"
            aria-hidden={i !== current}
          >
            <div data-s-outer className="h-full w-full overflow-hidden">
              <div data-s-inner className="h-full w-full overflow-hidden">
                <div className="absolute inset-0" style={{ background: s.bg }}>
                  {/* Soft light */}
                  <div
                    aria-hidden
                    className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-white/10 blur-[120px]"
                  />

                  {/* The big word */}
                  <h3
                    data-s-heading
                    className="absolute left-[5%] top-[13%] z-30 origin-left whitespace-nowrap text-[clamp(4.2rem,14vw,13rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.18)] lg:left-[4%] lg:top-[11%]"
                  >
                    {s.word}
                  </h3>

                  {/* The slide photo */}
                  <figure className="absolute inset-x-[5%] top-[30%] h-[30%] overflow-hidden rounded-[22px] lg:bottom-[13%] lg:left-[4%] lg:right-auto lg:top-[33%] lg:h-auto lg:w-[38%]">
                    <div data-s-img className="absolute inset-0">
                      <Image
                        src={photo(s.img, 1200)}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 40vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </figure>

                  {/* The step */}
                  <div
                    data-s-text
                    className="absolute inset-x-[5%] top-[64%] lg:left-[48%] lg:right-auto lg:top-[33%] lg:w-[30%]"
                  >
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
                      Step {pad(i + 1)}
                    </p>
                    <h4 className="mt-3 text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold leading-tight tracking-tight lg:mt-4">
                      {s.title}
                    </h4>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-white/80 lg:mt-3 lg:text-base">
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Overlay: the second photo and the counter sit above the slides */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <figure className="absolute bottom-[13%] left-[48%] right-[4%] top-[60%] hidden overflow-hidden rounded-[22px] lg:block">
            {SLIDES.map((s) => (
              <div key={s.word} data-s-ov className="absolute inset-0">
                <Image
                  src={photo(s.ov, 1400)}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </figure>
          <p className="absolute right-[4%] top-[33%] hidden border-b-[6px] border-white pb-1 text-right text-[clamp(2.6rem,4vw,4rem)] font-semibold leading-none tracking-tight lg:block">
            <span ref={count}>01</span>
            <span className="text-white/40">/{pad(SLIDES.length)}</span>
          </p>
        </div>

        {/* Scroll progress along the top */}
        <div className="absolute inset-x-0 top-0 z-30 h-1 bg-white/10">
          <span
            ref={bar}
            className="block h-full origin-left scale-x-0 bg-white"
          />
        </div>

        {/* Controls */}
        <div className="absolute inset-x-[5%] bottom-[4%] z-30 flex items-center justify-between gap-4 lg:inset-x-[4%]">
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Choose a step"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.word}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Step ${i + 1}: ${s.title}`}
                onClick={() => jump(i)}
                className="group grid h-8 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-white" : "w-4 bg-white/35 group-hover:bg-white/70"}`}
                />
              </button>
            ))}
            <span className="ml-3 hidden items-center gap-2 text-xs font-medium text-white/60 sm:inline-flex">
              <span className="relative h-5 w-3 rounded-full border border-white/50">
                <span className="absolute left-1/2 top-1 h-1.5 w-0.5 -translate-x-1/2 animate-bounce rounded-full bg-white/80" />
              </span>
              Scroll to explore
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/consultation"
              className="mr-2 hidden h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-brand hover:text-white md:inline-flex"
            >
              Start with step one
            </Link>
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => jump(current + dir)}
                disabled={
                  (dir < 0 && current === 0) || (dir > 0 && current === LAST)
                }
                aria-label={dir < 0 ? "Previous step" : "Next step"}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white transition-all duration-300 enabled:hover:scale-105 enabled:hover:border-white enabled:hover:bg-white enabled:hover:text-[#2E1212] disabled:opacity-30"
              >
                <Chevron dir={dir} />
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Step {current + 1} of {SLIDES.length}: {SLIDES[current].title}
        </p>
      </div>
    </section>
  );
}
