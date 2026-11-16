"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";

// The latest guides from /blog (see blogPosts.ts), shown with the site's own illustrations.
const POSTS: {
  date: string;
  title: string;
  by?: string;
  img: string;
  href: string;
  read: string;
}[] = [
  {
    date: "Nov 10, 2026",
    title: "How To Choose The Right Country For Your Degree In 2027",
    by: "By Root Education Counselling Team | Tuition, Living Costs, Work Rights And Post-Study Visas Compared",
    img: "/study-abroad.png",
    href: "/blog/choose-the-right-country-2027",
    read: "8 min read",
  },
  {
    date: "Nov 3, 2026",
    title: "What To Bring To Your First Study Abroad Consultation",
    by: "By Root Education Advisors | Grades, Test Scores And A Rough Budget",
    img: "/consult.png",
    href: "/blog/first-study-abroad-consultation",
    read: "4 min read",
  },
  {
    date: "Oct 27, 2026",
    title: "Student Visas Made Simple: A Step-By-Step Checklist",
    by: "By Root Education Visa Desk | Documents, Funds And Interview Tips",
    img: "/abroad.png",
    href: "/blog/student-visa-checklist",
    read: "6 min read",
  },
  {
    date: "Sep 22, 2026",
    title: "Campus Life In Europe: Your First Semester",
    img: "/card-bg-campus.webp",
    href: "/blog/your-first-semester-abroad",
    read: "6 min read",
  },
];

export default function Blog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: root.current, start: "top 75%" },
          })
          .fromTo(
            "[data-b-eyebrow]",
            { x: -20, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7 },
          )
          .fromTo(
            "[data-b-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.1, stagger: 0.1 },
            0.1,
          )
          .fromTo(
            "[data-b-tag]",
            { scale: 0, rotation: -12 },
            { scale: 1, rotation: 0, duration: 0.9, ease: "back.out(2.2)" },
            0.6,
          )
          .fromTo(
            "[data-b-side]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
            0.45,
          );

        // Each card rises in; its arrow-shaped cover slides out from the left edge.
        ScrollTrigger.batch("[data-b-card]", {
          start: "top 88%",
          once: true,
          onEnter: (cards) => {
            gsap.fromTo(
              cards,
              { y: 50, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                stagger: 0.12,
                ease: "expo.out",
              },
            );
            cards.forEach((c, i) => {
              gsap.fromTo(
                c.querySelector("[data-b-cover]"),
                { xPercent: -30, autoAlpha: 0 },
                {
                  xPercent: 0,
                  autoAlpha: 1,
                  duration: 1.2,
                  delay: 0.1 + i * 0.12,
                  ease: "expo.out",
                },
              );
              gsap.fromTo(
                c.querySelectorAll("[data-b-text] > *"),
                { y: 16, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                  stagger: 0.06,
                  delay: 0.25 + i * 0.12,
                  ease: "power3.out",
                },
              );
            });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="blog-title"
      className="bg-white px-6 py-24 sm:py-32"
    >
      {/* The arrow shape of the covers, with softly rounded corners */}
      <svg aria-hidden className="absolute h-0 w-0">
        <clipPath id="b-chev" clipPathUnits="objectBoundingBox">
          <path d="M0.035,0 H0.8 Q0.83,0 0.845,0.05 L0.99,0.455 Q1,0.5 0.99,0.545 L0.845,0.95 Q0.83,1 0.8,1 H0.035 Q0,1 0,0.94 V0.06 Q0,0 0.035,0 Z" />
        </clipPath>
      </svg>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-14">
        {/* Left: heading, stays in view while the posts scroll past */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p
            data-b-eyebrow
            className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-[#5A4FF0]"
          >
            <svg viewBox="0 0 26 18" className="h-3.5 w-5" aria-hidden>
              <path
                d="M3 0H18Q20 0 21.3 1.6L25.4 7.6Q26.4 9 25.4 10.4L21.3 16.4Q20 18 18 18H3Q0 18 0 15V3Q0 0 3 0Z"
                fill="#5A4FF0"
              />
            </svg>
            Blog &amp; guides
          </p>
          <h2
            id="blog-title"
            className="mt-4 text-[clamp(2.2rem,4.2vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
            style={{ color: MAROON }}
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-b-line className="block">
                Real Guides
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-b-line className="block">
                Helping Students
              </span>
            </span>
            <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="block overflow-hidden pb-[0.1em]">
                <span data-b-line className="block">
                  Go Abroad
                </span>
              </span>
              <span
                data-b-tag
                className="relative inline-flex h-9 items-center pl-4 pr-8 text-sm font-semibold uppercase tracking-[0.04em] text-[#2E1212]"
              >
                <svg
                  viewBox="0 0 120 36"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden
                >
                  <path
                    d="M3 0H100Q103 0 105 2.5L118.5 16Q120 18 118.5 20L105 33.5Q103 36 100 36H3Q0 36 0 33V3Q0 0 3 0Z"
                    fill="#FDB52C"
                  />
                </svg>
                <span className="relative">Study tips</span>
              </span>
            </span>
          </h2>
          <p
            data-b-side
            className="mt-6 max-w-sm text-base leading-relaxed text-[#2E1212]/55"
          >
            Free, practical guides from our counsellors. Get clarity on
            countries, costs and visas, and plan at your own pace.
          </p>
          <Link
            data-b-side
            href="/blog"
            className="group mt-8 inline-flex h-13 items-center gap-3 rounded-full bg-[#111] px-8 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand"
          >
            Explore All Guides
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Right: the posts */}
        <ul className="flex flex-col gap-5">
          {POSTS.map((p) => (
            <li key={p.title} data-b-card>
              <Link
                href={p.href}
                className="group flex flex-col gap-5 rounded-2xl bg-[#F2F2F2] p-4 transition-colors duration-500 hover:bg-[#ECEAE6] sm:flex-row sm:items-center sm:gap-7 sm:p-5"
              >
                {/* Arrow-shaped cover with a soft shadow behind it */}
                <div
                  data-b-cover
                  className="relative aspect-16/10 w-full shrink-0 sm:w-[44%]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-2 blur-[6px] transition-transform duration-500 group-hover:translate-x-4"
                  >
                    <div
                      className="h-full w-full bg-linear-to-r from-[#2E1212]/5 via-[#2E1212]/35 to-[#2E1212]/60"
                      style={{ clipPath: "url(#b-chev)" }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: "url(#b-chev)" }}
                  >
                    <Image
                      src={p.img}
                      alt=""
                      fill
                      sizes="(min-width:640px) 22rem, 90vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                <div data-b-text className="flex min-w-0 flex-1 flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.06em] text-[#2E1212]/70">
                    {p.date}
                  </span>
                  <h3
                    className="mt-3 text-base font-medium leading-snug sm:text-lg"
                    style={{ color: MAROON }}
                  >
                    {p.title}
                  </h3>
                  {p.by && (
                    <p className="mt-1.5 text-xs italic leading-relaxed text-[#2E1212]/60">
                      {p.by}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-4">
                    <span className="text-xs text-[#2E1212]/55">{p.read}</span>
                    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[#111] px-4 text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-brand">
                      Read Now
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-0 opacity-0 transition-all duration-300 group-hover:w-3 group-hover:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
