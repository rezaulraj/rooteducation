"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COUNTRIES, UNIVERSITIES } from "./universitiesData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const photo = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop&crop=faces`;

// Team photos shown in the hero's mouse trail (stock photos: replace with your own team).
const FACES = [
  { id: "1507003211169-0a1dd7228f2d", rest: [-118, -9], open: [-210, -6] },
  { id: "1531123897727-8f129e1688ce", rest: [-40, -3], open: [-72, -2] },
  { id: "1573496359142-b8d87734a5a2", rest: [40, 3], open: [72, 2] },
  { id: "1506794778202-cad84cf45f1d", rest: [118, 9], open: [210, 6] },
];

// The hero's mouse trail shows the team photos only.
const TRAIL = FACES.map((f) => f.id);

// What we do.
const SERVICES = [
  {
    label: "Profile & Country Shortlisting",
    img: "1600880292203-757bb62b4baf",
  },
  { label: "Application & Document Polish", img: "1586281380349-632531db7ed4" },
  { label: "Scholarships & Financial Aid", img: "1554224155-6726b3ff858f" },
  {
    label: "Visa Guidance & Interview Prep",
    img: "1530521954074-e64f6810b32d",
  },
  {
    label: "Pre-departure & Arrival Support",
    img: "1488085061387-422e29b40080",
  },
];

const VALUES = [
  {
    title: "Honest advice",
    text: "We recommend what fits your grades, budget and goals, even when that means a different country or course.",
    icon: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6zM9 12l2 2 4-4",
  },
  {
    title: "Students first",
    text: "Every plan starts with you: your dream, your family's questions and your timeline.",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21c1.2-4 4-6 7.5-6s6.3 2 7.5 6",
  },
  {
    title: "One team, start to finish",
    text: "The counsellor who first meets you stays with you through applications, visa and departure.",
    icon: "M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4M9 12l2 2 4-4",
  },
  {
    title: "Global and local",
    text: "Offices in London and Dhaka mean we understand both where you're from and where you're going.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18",
  },
];

// Figures also used on the home page; the first two are placeholders to confirm.
const STATS = [
  { n: 1000, suffix: "+", label: "Students guided" },
  { n: 13, suffix: "", label: "Years of experience" },
  { n: COUNTRIES.length, suffix: "", label: "Study destinations" },
  {
    n: UNIVERSITIES.length,
    suffix: "+",
    label: "Universities in our directory",
  },
];

const OFFICES = [
  {
    city: "London",
    country: "United Kingdom",
    flag: "gb",
    address: "7 Kirkdale House, London, E11 1HP",
    img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1000&q=80&auto=format&fit=crop",
  },
  {
    city: "Dhaka",
    country: "Bangladesh",
    flag: "bd",
    address: "Road 15, Sector 12, Uttara, Dhaka 1230",
    img: "https://images.unsplash.com/photo-1630987871777-f7b2d62894d0?w=1000&q=80&auto=format&fit=crop",
  },
];

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** The little arrow-tag used as a bullet. */
function TagMark({ className = "h-3 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden>
      <path
        d="M2 0H13Q14.5 0 15.4 1.2L19.4 6Q20 7 19.4 8L15.4 12.8Q14.5 14 13 14H2Q0 14 0 12V2Q0 0 2 0Z"
        fill="#F47A2A"
      />
    </svg>
  );
}

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-a-frame]",
            { clipPath: "inset(6% 4% 6% 4% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-a-tag]",
            { scale: 0, rotation: (i: number) => (i ? 20 : -20) },
            {
              scale: 1,
              rotation: (i: number) => (i ? 4 : -4),
              duration: 0.9,
              stagger: 0.15,
              ease: "back.out(2.2)",
            },
            0.9,
          )
          .fromTo(
            "[data-a-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.6,
          )
          .fromTo(
            "[data-a-chip]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 },
            1,
          )
          .fromTo(
            "[data-a-cta]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            1.3,
          );

        gsap.utils.toArray<HTMLElement>("[data-a-tag]").forEach((el, i) => {
          gsap.to(el, {
            y: i ? 6 : -6,
            duration: 2.6 + i * 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2,
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-a-head]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          );
        });
        gsap.fromTo(
          "[data-a-collage] > *",
          { y: 80, rotate: (i: number) => (i ? 6 : -6), autoAlpha: 0 },
          {
            y: 0,
            rotate: (i: number) => (i ? 3 : -3),
            autoAlpha: 1,
            duration: 1.3,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-a-collage]", start: "top 80%" },
          },
        );
        gsap.fromTo(
          "[data-a-stat]",
          { textContent: 0 },
          {
            textContent: (_: number, el: HTMLElement) => Number(el.dataset.to),
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-a-stats]", start: "top 85%" },
          },
        );
        ScrollTrigger.batch("[data-a-card]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 60, autoAlpha: 0, rotateX: -15 },
              {
                y: 0,
                autoAlpha: 1,
                rotateX: 0,
                duration: 1.1,
                stagger: 0.1,
                ease: "expo.out",
                transformPerspective: 900,
              },
            ),
        });
        gsap.utils.toArray<HTMLElement>("[data-a-office]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              delay: i * 0.15,
              ease: "power4.inOut",
              scrollTrigger: { trigger: "[data-a-offices]", start: "top 80%" },
            },
          );
        });
        gsap.fromTo(
          "[data-a-final]",
          { clipPath: "inset(18% 8% 18% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-a-final]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // Image trail: as the mouse moves over the hero, photos pop out along its path and fade away.
  // Nothing appears while the mouse is still.
  const last = useRef({ x: 0, y: 0, set: false });
  const nextImg = useRef(0);
  const layer = useRef(1);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !trail.current || !hero.current) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = hero.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const l = last.current;
    if (!l.set) {
      last.current = { x, y, set: true };
      return;
    }
    const dx = x - l.x;
    const dy = y - l.y;
    // A new photo every ~110px of movement.
    if (Math.hypot(dx, dy) < 110) return;
    last.current = { x, y, set: true };
    const imgs = trail.current.children;
    const el = imgs[nextImg.current % imgs.length] as HTMLElement;
    nextImg.current++;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    gsap.killTweensOf(el);
    if (calm) {
      // Reduced motion: the photo simply fades in place, then out.
      gsap
        .timeline()
        .set(el, {
          x: x - w / 2,
          y: y - h / 2,
          zIndex: layer.current++,
          scale: 1,
          rotation: 0,
          autoAlpha: 0,
        })
        .to(el, { autoAlpha: 1, duration: 0.25 })
        .to(el, { autoAlpha: 0, duration: 0.5 }, 0.9);
      return;
    }
    gsap
      .timeline()
      .set(el, {
        x: x - w / 2,
        y: y - h / 2,
        zIndex: layer.current++,
        autoAlpha: 1,
        scale: 0.3,
        rotation: gsap.utils.random(-14, 14),
      })
      // Pops out, carried a little further in the direction of travel.
      .to(el, {
        x: x - w / 2 + dx * 0.4,
        y: y - h / 2 + dy * 0.4,
        scale: 1,
        duration: 0.5,
        ease: "expo.out",
      })
      .to(
        el,
        {
          scale: 0.6,
          autoAlpha: 0,
          y: "+=40",
          duration: 0.6,
          ease: "power3.in",
        },
        0.55,
      );
  };
  const resetTrail = () => {
    last.current.set = false;
  };

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="px-3 pt-3">
        <div
          ref={hero}
          data-a-frame
          onPointerMove={move}
          onPointerLeave={resetTrail}
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FFD9BC_0%,#FFE9D9_22%,#FFF6EE_46%,#FFFFFF_72%)] px-6 pb-24 pt-40 text-center sm:px-10 lg:pb-28 lg:pt-48"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-[24rem] w-[24rem] rounded-full bg-white/70 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-brand/15 blur-[100px]"
          />

          {/* Image trail layer: photos appear here as the mouse moves */}
          <div
            ref={trail}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
          >
            {TRAIL.map((id) => (
              <div
                key={id}
                className="invisible absolute left-0 top-0 h-48 w-36 overflow-hidden rounded-[20px] shadow-[0_30px_60px_-24px_rgba(46,18,18,0.6)] ring-4 ring-white sm:h-56 sm:w-44"
              >
                <Image
                  src={photo(id, 500)}
                  alt=""
                  fill
                  sizes="176px"
                  loading="eager"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-5xl">
            <h1
              className="relative inline-block text-[clamp(2.3rem,5.6vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              {/* About us tag */}
              <span
                data-a-tag
                aria-hidden
                className="absolute -top-[1.35em] right-[-1.2em] hidden h-12 items-center pl-4 pr-7 text-[0.9rem] font-bold uppercase leading-none tracking-[0.02em] text-white md:inline-flex"
              >
                <svg
                  viewBox="0 0 160 52"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <path
                    d="M7 0H140Q144 0 146.6 3L158.6 23Q160 26 158.6 29L146.6 49Q144 52 140 52H7Q0 52 0 45V7Q0 0 7 0Z"
                    fill="#2E1212"
                  />
                </svg>
                <span className="relative whitespace-nowrap">About us</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-a-line className="block">
                  {/* Orange cap tag */}
                  <span
                    data-a-tag
                    aria-hidden
                    className="mr-[0.25em] hidden h-[0.78em] w-[1em] align-[-0.05em] md:inline-block"
                  >
                    <svg viewBox="0 0 80 64" className="h-full w-full">
                      <path
                        d="M6 0H58Q62 0 64.6 3.2L78.4 29Q80 32 78.4 35L64.6 60.8Q62 64 58 64H6Q0 64 0 58V6Q0 0 6 0Z"
                        fill="#F47A2A"
                      />
                      <path
                        d="M33 20 15 28l18 8 18-8Zm-11 11.5v7c0 2.6 5 4.8 11 4.8s11-2.2 11-4.8v-7l-11 5Z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                  Turning global ambition
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span data-a-line className="block">
                  into reality,{" "}
                  <span className="text-brand">one student at a time</span>
                </span>
              </span>
            </h1>

            {/* Services: hover a chip to see a photo of that step */}
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-2 gap-y-3">
              {SERVICES.map((s) => (
                <li key={s.label} data-a-chip>
                  <span
                    tabIndex={0}
                    className={`inline-flex cursor-default items-center gap-2.5 rounded-full px-4 py-2 text-[0.95rem] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand/50 text-[#2E1212]/80 hover:bg-[#2E1212] hover:text-white hover:shadow-[0_14px_30px_-14px_rgba(46,18,18,0.6)]`}
                  >
                    <TagMark />
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>

            <div
              data-a-cta
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/consultation"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-[#2E1212] px-9 text-[1.02rem] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand"
              >
                Start Your Journey Today
                <Arrow className="h-4 w-0 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div data-a-head>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Our story
            </p>
            <h2
              className="mt-4 text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              Grow your future from{" "}
              <span className="text-brand">strong roots.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-[#2E1212]/65">
              Root Education began with a simple belief: every student deserves
              honest, expert guidance on studying abroad, not a sales pitch. We
              help students choose the right country, course and university,
              then stay beside them through applications, scholarships, visas
              and departure.
            </p>
            <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-[#2E1212]/65">
              From our offices in London and Dhaka, our counsellors guide
              students to universities across {COUNTRIES.length} destinations,
              from the UK, Canada and Australia to Malta, Hungary and Lithuania.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/how-we-work"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#2E1212] pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand"
              >
                See how we work
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-brand">
                  <Arrow className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/counsellors"
                className="inline-flex h-12 items-center rounded-full border border-[#2E1212]/15 px-6 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#FBF6EF]"
              >
                Meet our counsellors
              </Link>
            </div>
          </div>
          <div
            data-a-collage
            className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[30rem]"
          >
            <div className="group absolute left-0 top-0 h-[72%] w-[68%] overflow-hidden rounded-[28px] border-4 border-white shadow-[0_40px_80px_-40px_rgba(46,18,18,0.55)]">
              <Image
                src="/study-abroad-consultation.png"
                alt="Students with landmarks from study destinations"
                fill
                sizes="(min-width:1024px) 30vw, 70vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
            </div>
            <div className="group absolute bottom-0 right-0 h-[58%] w-[56%] overflow-hidden rounded-[28px] border-4 border-white shadow-[0_40px_80px_-40px_rgba(46,18,18,0.55)]">
              <Image
                src="/consult.png"
                alt="A counsellor advising a student"
                fill
                sizes="(min-width:1024px) 24vw, 56vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="px-3">
        <div
          data-a-stats
          className="relative mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#2E1212]/10 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group bg-[#FBF6EF] px-6 py-10 text-center transition-colors duration-500 hover:bg-[#2E1212]"
            >
              <p className="text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none tracking-tight text-[#2E1212] transition-colors duration-500 group-hover:text-white">
                <span data-a-stat data-to={s.n}>
                  {s.n.toLocaleString("en-GB")}
                </span>
                <span className="text-brand">{s.suffix}</span>
              </p>
              <p className="mt-3 text-sm font-medium text-[#2E1212]/55 transition-colors duration-500 group-hover:text-white/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-a-head className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              What we believe
            </p>
            <h2
              className="mt-4 text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              The values behind every plan
            </h2>
          </div>
          <div className="mt-14 grid gap-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-a-card
                className="group relative overflow-hidden rounded-[26px] border border-[#2E1212]/8 bg-white p-7 transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-2 hover:bg-[#2E1212] hover:shadow-[0_40px_80px_-40px_rgba(46,18,18,0.7)]"
              >
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/0 blur-2xl transition-colors duration-700 group-hover:bg-brand/40"
                />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                  <Icon d={v.icon} />
                </span>
                <p className="relative mt-6 text-sm font-semibold text-[#2E1212]/30 transition-colors duration-500 group-hover:text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="relative mt-1 text-lg font-semibold tracking-tight text-[#2E1212] transition-colors duration-500 group-hover:text-white">
                  {v.title}
                </h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-[#2E1212]/60 transition-colors duration-500 group-hover:text-white/70">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-[#FBF6EF] px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div
            data-a-head
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Where we are
              </p>
              <h2
                className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
                style={{ color: MAROON }}
              >
                Two offices, one team
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2E1212] hover:text-brand"
            >
              Find us on the map{" "}
              <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div data-a-offices className="mt-12 grid gap-6 md:grid-cols-2">
            {OFFICES.map((o) => (
              <article
                key={o.city}
                data-a-office
                className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[28px] p-7 text-white sm:p-8"
              >
                <Image
                  src={o.img}
                  alt={o.city}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-linear-to-t from-[#140B09]/95 via-[#140B09]/40 to-transparent"
                />
                <div className="flex items-center gap-3">
                  <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/40">
                    <Image
                      src={`/flags/${o.flag}.svg`}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                      unoptimized
                    />
                  </span>
                  <span>
                    <span className="block text-2xl font-semibold leading-tight tracking-tight">
                      {o.city}
                    </span>
                    <span className="block text-sm text-white/65">
                      {o.country}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-white/80">{o.address}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-3 py-3">
        <div
          data-a-final
          className="relative overflow-hidden rounded-[32px] bg-[radial-gradient(120%_120%_at_20%_0%,#F47A2A_0%,#B5481A_45%,#2E1212_100%)] px-6 py-16 text-white sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                Let&apos;s plan your future together.
              </h2>
              <p className="mt-3 max-w-md text-white/75">
                Book a free consultation with a counsellor, online or in our
                offices.
              </p>
            </div>
            <Link
              href="/consultation"
              className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-white pl-7 pr-2 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#2E1212] hover:text-white"
            >
              Book a free consultation
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
