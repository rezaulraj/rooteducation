"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const wiki = (path: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`;
const face = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=240&h=240&q=80&auto=format&fit=crop&crop=faces`;

// Campus photos from Wikimedia Commons (credited in the title attribute), and student portraits from Unsplash.
const CAMPUS = [
  {
    name: "Trinity College Dublin",
    src: wiki(
      "e/e0/Trinity_College_-_Parliament_Square_-_October_2023.jpg/500px-Trinity_College_-_Parliament_Square_-_October_2023.jpg",
    ),
    credit: "David Kernan, CC BY 4.0",
  },
  {
    name: "University of Oxford",
    src: wiki("5/5a/Bibliotheca_Bodleiana.jpg/500px-Bibliotheca_Bodleiana.jpg"),
    credit: "Honcques Laus, CC0",
  },
  {
    name: "McGill University",
    src: wiki(
      "b/bf/Redpath_Museum_and_Lower_Field%2C_McGill_University%2C_July_18%2C_2024.jpg/500px-Redpath_Museum_and_Lower_Field%2C_McGill_University%2C_July_18%2C_2024.jpg",
    ),
    credit: "D. Benjamin Miller, CC0",
  },
];
const PEOPLE = {
  amara: face("1662850886700-4ec19bd30d11"),
  rayan: face("1625241152315-4a698f74ceb7"),
  kofi: face("1492462543947-040389c4a66c"),
};
const TESTS = [
  ["IELTS", "TOEFL", "PTE", "DET", "IELTS", "TOEFL", "PTE", "DET"],
  ["GMAT", "GRE", "SAT", "GMAT", "GRE", "SAT", "GMAT", "GRE"],
];

function More({
  href,
  label,
  light,
}: {
  href: string;
  label: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group/l relative z-10 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${light ? "text-white" : ""}`}
      style={light ? undefined : { color: MAROON }}
    >
      {label}
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/l:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 3l5 5-5 5" />
      </svg>
    </Link>
  );
}

function Card({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <li
      data-f-card
      className={`group relative isolate flex min-h-[19rem] flex-col overflow-hidden rounded-[22px] p-6 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_35px_60px_-35px_rgba(46,18,18,0.45)] sm:p-7 ${className ?? ""}`}
      style={style}
    >
      {children}
    </li>
  );
}

function Title({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <h3
      className={`relative z-10 text-xl font-semibold tracking-tight ${light ? "text-white" : ""}`}
      style={light ? undefined : { color: MAROON }}
    >
      {children}
    </h3>
  );
}
function Copy({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`relative z-10 mt-2 max-w-xs text-sm leading-relaxed ${light ? "text-white/75" : "text-[#2E1212]/70"}`}
    >
      {children}
    </p>
  );
}

export default function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: "[data-f-head]", start: "top 80%" },
          })
          .fromTo(
            "[data-f-eyebrow]",
            { x: -20, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          )
          .fromTo(
            "[data-f-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" },
            0.1,
          )
          .fromTo(
            "[data-f-badge]",
            { scale: 0, rotation: -40 },
            { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2.4)" },
            0.6,
          );

        // Cards rise one by one, then each illustration plays.
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: "[data-f-grid]", start: "top 78%" },
        });
        tl.fromTo(
          "[data-f-card]",
          { y: 70, autoAlpha: 0, clipPath: "inset(18% 0% 0% 0% round 22px)" },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0% round 22px)",
            duration: 1.1,
            stagger: 0.1,
          },
        )
          // The campus photos fan out from a stack.
          .fromTo(
            "[data-f-photo='0']",
            { x: 70, rotation: 0 },
            { x: 0, rotation: -9, duration: 1.1 },
            0.4,
          )
          .fromTo(
            "[data-f-photo='2']",
            { x: -70, rotation: 0 },
            { x: 0, rotation: 9, duration: 1.1 },
            0.4,
          )
          .fromTo(
            "[data-f-photo='1']",
            { y: 30, scale: 0.9 },
            { y: 0, scale: 1, duration: 1.1 },
            0.35,
          )
          .fromTo(
            "[data-f-pill]",
            { y: -14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6 },
            0.9,
          )
          // Coins drop onto the stack.
          .fromTo(
            "[data-f-coin]",
            { y: -120, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: { each: 0.12, from: "end" },
              ease: "bounce.out",
            },
            0.55,
          )
          .fromTo(
            "[data-f-meter]",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, transformOrigin: "0% 50%" },
            1,
          )
          // The cap lands on the admission card.
          .fromTo(
            "[data-f-cap]",
            { y: -90, rotation: -30, autoAlpha: 0 },
            {
              y: 0,
              rotation: -8,
              autoAlpha: 1,
              duration: 1,
              ease: "back.out(1.6)",
            },
            0.6,
          )
          .fromTo(
            "[data-f-admit]",
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.75,
          )
          // Mentors pop in; the envelope opens and the offer letter slides out.
          .fromTo(
            "[data-f-face]",
            { scale: 0 },
            { scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(2)" },
            0.7,
          )
          .fromTo(
            "[data-f-flap]",
            { rotationX: 0 },
            {
              rotationX: 180,
              duration: 0.7,
              ease: "power2.inOut",
              transformOrigin: "50% 0%",
            },
            1,
          )
          .fromTo(
            "[data-f-letter]",
            { yPercent: 40 },
            { yPercent: -38, duration: 0.9 },
            1.35,
          )
          .fromTo(
            "[data-f-ring]",
            { scale: 0.4, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.12 },
            0.7,
          )
          .fromTo(
            "[data-f-test]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1 },
            0.8,
          );

        // Ambient motion.
        gsap.to("[data-f-orbit]", {
          scale: 1.35,
          opacity: 0,
          duration: 2.4,
          ease: "power1.out",
          repeat: -1,
          stagger: 0.8,
        });
        gsap.to("[data-f-float]", {
          y: -8,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.4,
        });
        gsap.to("[data-f-row='0']", {
          xPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
        gsap.fromTo(
          "[data-f-row='1']",
          { xPercent: -50 },
          { xPercent: 0, duration: 22, ease: "none", repeat: -1 },
        );
        gsap.to("[data-f-spark]", {
          rotation: 360,
          duration: 8,
          ease: "none",
          repeat: -1,
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="features-title"
      className="overflow-hidden bg-white px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div data-f-head>
          <p
            data-f-eyebrow
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.04em] text-[#6464FF]"
          >
            <svg viewBox="0 0 26 18" className="h-[16px] w-[23px]" aria-hidden>
              <path
                d="M3 0H18Q20 0 21.3 1.6L25.4 7.6Q26.4 9 25.4 10.4L21.3 16.4Q20 18 18 18H3Q0 18 0 15V3Q0 0 3 0Z"
                fill="#6464FF"
              />
            </svg>
            Features
          </p>
          <h2
            id="features-title"
            className="mt-4 text-[clamp(2.4rem,5.4vw,4.4rem)] font-semibold leading-[1] tracking-[-0.045em]"
            style={{ color: MAROON }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-f-line className="inline-flex items-center gap-4">
                All the right support,
                <span
                  data-f-badge
                  aria-hidden
                  className="hidden h-[0.8em] w-[1.2em] place-items-center bg-[#6464FF] sm:inline-grid text-white [clip-path:polygon(0_0,72%_0,100%_50%,72%_100%,0_100%)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[0.42em] w-[0.42em] -translate-x-[0.08em]"
                    fill="currentColor"
                  >
                    <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.2V16l6 3 6-3v-3.8l-6 3.3-6-3.3Z" />
                  </svg>
                </span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-f-line className="block">
                in one place
              </span>
            </span>
          </h2>
        </div>

        <ul data-f-grid className="mt-12 grid gap-4 md:grid-cols-3">
          {/* University shortlist */}
          <Card
            className="md:col-span-2"
            style={{
              background:
                "linear-gradient(120deg, #FFE7D6 0%, #FFB27F 55%, #FF8A47 100%)",
            }}
          >
            <div className="grid flex-1 gap-6 sm:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col">
                <Title>University Shortlist</Title>
                <Copy>
                  Find best-fit universities with admit chances, clear reasons
                  and the scholarships to consider.
                </Copy>
                <More href="/universities" label="Get your shortlist" />
              </div>
              <div className="relative h-56 sm:h-auto">
                <span
                  data-f-pill
                  className="absolute left-1/2 top-0 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2E1212] px-3 py-1 text-[0.68rem] font-semibold text-white shadow-lg"
                >
                  96+ universities
                </span>
                {CAMPUS.map((c, i) => (
                  <div
                    key={c.name}
                    className="absolute top-7"
                    style={{
                      left: `${[22, 50, 78][i]}%`,
                      width: i === 1 ? "46%" : "34%",
                      zIndex: i === 1 ? 20 : 10,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <figure
                      data-f-photo={i}
                      className={`overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_20px_40px_-18px_rgba(46,18,18,0.5)] transition-transform duration-500 ${i === 1 ? "group-hover:-translate-y-2" : i === 0 ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
                    >
                      <div
                        className={`relative ${i === 1 ? "aspect-[4/4.6]" : "aspect-[4/4.4]"}`}
                      >
                        <Image
                          src={c.src}
                          alt={c.name}
                          title={`Photo: ${c.credit}`}
                          fill
                          unoptimized
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                      {i === 1 && (
                        <figcaption className="flex items-center gap-2 px-2 py-2">
                          <Image
                            src="/univercity/logos/university-of-oxford.png"
                            alt=""
                            width={20}
                            height={25}
                            className="object-contain"
                          />
                          <span className="leading-tight">
                            <span
                              className="block text-[0.7rem] font-semibold"
                              style={{ color: MAROON }}
                            >
                              University of Oxford
                            </span>
                            <span className="block text-[0.6rem] text-[#2E1212]/55">
                              Shortlisted for you
                            </span>
                          </span>
                        </figcaption>
                      )}
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Secure finances */}
          <Card
            style={{
              background: "linear-gradient(160deg, #C9D4FF 0%, #A9B9FF 100%)",
            }}
          >
            <div className="relative mb-4 h-32">
              {/* A stack of coins */}
              {[
                ["#F07B3B", "#C95B22"],
                ["#3C5BD8", "#2A44AE"],
                ["#E9EDF5", "#B9C1D0"],
              ].map(([top, side], i) => (
                <div
                  key={i}
                  data-f-coin
                  className="absolute left-4"
                  style={{ bottom: `${i * 24}px`, zIndex: 3 - i }}
                >
                  <div className="relative h-12 w-24">
                    <div
                      className="absolute inset-x-0 bottom-0 h-8 rounded-[50%]"
                      style={{ background: side }}
                    />
                    <div
                      className="absolute inset-x-0 top-0 h-8 rounded-[50%] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.15)]"
                      style={{ background: top }}
                    />
                  </div>
                </div>
              ))}
              <div
                data-f-float
                className="absolute right-0 top-4 w-[58%] rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur"
              >
                <p
                  className="text-[0.65rem] font-semibold"
                  style={{ color: MAROON }}
                >
                  Scholarship eligibility
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E3E8FF]">
                    <span
                      data-f-meter
                      className="block h-full w-2/3 rounded-full bg-[#3C5BD8]"
                    />
                  </span>
                  <span className="font-mono text-[0.6rem] text-[#2E1212]/60">
                    2/3
                  </span>
                </div>
              </div>
            </div>
            <Title>Secure Finances</Title>
            <Copy>
              Unlock scholarships, find the right loan and plan your return on
              investment without the guesswork.
            </Copy>
            <More
              href="/services/scholarship-financial-aid"
              label="Explore now"
            />
          </Card>

          {/* Better admit chances */}
          <Card
            style={{
              background: "linear-gradient(160deg, #8F86FF 0%, #6A5CF5 100%)",
            }}
          >
            <div className="relative mb-4 h-36">
              <div
                data-f-admit
                className="absolute inset-x-2 bottom-0 rounded-2xl bg-white/95 p-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Image
                    data-f-face
                    src={PEOPLE.kofi}
                    alt="A student"
                    width={44}
                    height={44}
                    unoptimized
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#6A5CF5]/30"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-semibold"
                      style={{ color: MAROON }}
                    >
                      Admission secured
                    </p>
                    <p className="text-[0.65rem] text-[#2E1212]/55">
                      MSc Computer Science
                    </p>
                  </div>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M2.5 6.2 5 8.5l4.5-5" />
                    </svg>
                  </span>
                </div>
              </div>
              <div data-f-cap className="absolute -top-2 left-0 w-32">
                <Image
                  src="/grad-cap.webp"
                  alt=""
                  width={431}
                  height={388}
                  loading="eager"
                  className="h-auto w-full drop-shadow-[0_14px_14px_rgba(30,20,90,0.4)]"
                />
              </div>
            </div>
            <Title light>Better Admit Chances</Title>
            <Copy light>
              Stand out with strong SOPs, LORs and a polished profile, guided by
              experts.
            </Copy>
            <More
              href="/services/application-assistance"
              label="Explore now"
              light
            />
          </Card>

          {/* Build your application */}
          <Card
            className="md:col-span-2"
            style={{
              background: "linear-gradient(120deg, #FFF6EE 0%, #FFE9DA 100%)",
            }}
          >
            <div className="grid flex-1 gap-6 sm:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-end">
                <Title>Build Your Application</Title>
                <Copy>
                  Stand out with strong SOPs, LORs and a polished profile,
                  guided by experts who know what works.
                </Copy>
                <More
                  href="/services/application-assistance"
                  label="Build now"
                />
              </div>
              <div className="relative h-56 sm:h-auto">
                {/* Mentors */}
                <figure
                  data-f-face
                  className="absolute left-[4%] top-[6%] z-20"
                >
                  <Image
                    src={PEOPLE.amara}
                    alt="An application mentor"
                    width={84}
                    height={84}
                    unoptimized
                    className="h-20 w-20 rounded-2xl object-cover shadow-xl ring-4 ring-white"
                  />
                </figure>
                <figure
                  data-f-face
                  className="absolute bottom-[10%] left-[20%] z-20"
                >
                  <Image
                    src={PEOPLE.rayan}
                    alt="A student"
                    width={64}
                    height={64}
                    unoptimized
                    className="h-16 w-16 rounded-2xl object-cover shadow-xl ring-4 ring-white"
                  />
                </figure>
                <span
                  aria-hidden
                  className="absolute left-[38%] top-[10%] h-3 w-3 rounded-full bg-[#FFB321]"
                />
                <span
                  aria-hidden
                  className="absolute bottom-[6%] right-[8%] h-3 w-3 rounded-full bg-[#FFB321]"
                />
                <span
                  aria-hidden
                  className="absolute right-[4%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#F47A2A]"
                />

                {/* An envelope that opens to reveal the offer letter */}
                <div className="absolute bottom-[8%] right-[10%] h-[58%] w-[56%] [perspective:600px]">
                  <div
                    data-f-letter
                    className="absolute inset-x-[8%] bottom-[20%] z-10 h-[90%] rounded-lg bg-white p-3 shadow-md"
                  >
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#F47A2A]">
                      Offer letter
                    </p>
                    <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-[#2E1212]/15" />
                    <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-[#2E1212]/10" />
                  </div>
                  <div className="absolute inset-0 z-20 rounded-xl bg-[linear-gradient(160deg,#FF9A5C,#F26B1D)] shadow-[0_25px_40px_-20px_rgba(242,107,29,0.8)] [clip-path:polygon(0_0,50%_45%,100%_0,100%_100%,0_100%)]" />
                  <div
                    data-f-flap
                    className="absolute inset-x-0 top-0 z-30 h-[55%] origin-top bg-[#E85E14] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-[18%] left-1/2 z-30 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white/90 text-[0.6rem] font-bold text-[#F26B1D]"
                  >
                    RE
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Visa and beyond */}
          <Card
            style={{
              background: "linear-gradient(160deg, #EEF0FF 0%, #DCE1FF 100%)",
            }}
          >
            <div className="relative mb-4 grid h-36 place-items-center">
              {[1, 0.74, 0.5].map((s, i) => (
                <span
                  key={i}
                  data-f-ring
                  aria-hidden
                  className="absolute rounded-full border border-[#6464FF]/30 bg-[#6464FF]/5"
                  style={{ width: `${s * 9}rem`, height: `${s * 9}rem` }}
                />
              ))}
              {[0, 1].map((i) => (
                <span
                  key={i}
                  data-f-orbit
                  aria-hidden
                  className="absolute h-24 w-24 rounded-full border-2 border-[#6464FF]/50"
                />
              ))}
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[#6464FF] text-white shadow-[0_16px_30px_-10px_rgba(100,100,255,0.9)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 3h12v18H6zM9.5 17h5M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </span>
            </div>
            <Title>Visa & Beyond</Title>
            <Copy>
              From documentation to interview prep, land your visa and your
              first weeks abroad.
            </Copy>
            <More href="/services/visa-guidance" label="Explore now" />
          </Card>

          {/* Test prep */}
          <Card
            className="md:col-span-2"
            style={{
              background: "linear-gradient(120deg, #3A1512 0%, #241010 100%)",
            }}
          >
            <div
              data-f-test
              aria-hidden
              className="relative -mx-7 mb-6 flex-1 space-y-3 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
            >
              {TESTS.map((row, r) => (
                <div key={r} data-f-row={r} className="flex w-max gap-3">
                  {[...row, ...row].map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/25 px-6 py-2.5 text-2xl font-semibold tracking-tight text-white/85 sm:text-3xl"
                      style={
                        i % 4 === 1
                          ? {
                              color: "#FFB27F",
                              borderColor: "rgba(255,178,127,0.45)",
                            }
                          : undefined
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ))}
              <svg
                data-f-spark
                viewBox="0 0 24 24"
                className="absolute left-[18%] top-1/2 h-10 w-10 -translate-y-1/2 text-white"
                aria-hidden
              >
                <path
                  d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <Title light>Test Prep</Title>
            <Copy light>
              Prepare smarter with practice tests and expert feedback for IELTS,
              TOEFL, GMAT, GRE, SAT, PTE and DET.
            </Copy>
            <More href="/consultation" label="Prepare for exams" light />
          </Card>
        </ul>
      </div>
    </section>
  );
}
