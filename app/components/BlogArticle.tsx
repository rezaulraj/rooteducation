"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, BlogCard, CategoryChip } from "./BlogIndex";
import {
  CATEGORY_TINT,
  blogImage,
  formatDate,
  type BlogPost,
} from "./blogPosts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const anchor = (i: number) => `section-${i + 1}`;

export default function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const tint = CATEGORY_TINT[post.category];

  useGSAP(
    () => {
      // Reading progress along the top of the window.
      gsap.fromTo(
        "[data-a-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-a-body]",
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      // Highlight the section being read in the contents list.
      // The current section is the last one whose heading has passed 45% of the window.
      const sections = gsap.utils.toArray<HTMLElement>("[data-a-section]");
      const pick = () => {
        const line = window.innerHeight * 0.45;
        let i = 0;
        sections.forEach((el, k) => {
          if (el.getBoundingClientRect().top <= line) i = k;
        });
        setActive(i);
      };
      ScrollTrigger.create({ trigger: "[data-a-body]", start: "top bottom", end: "bottom top", onUpdate: pick, onRefresh: pick });

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
          .fromTo("[data-a-img]", { scale: 1.3 }, { scale: 1, duration: 2 }, 0)
          .fromTo(
            "[data-a-meta] > *",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            0.6,
          )
          .fromTo(
            "[data-a-line]",
            { yPercent: 110 },
            { yPercent: 0, duration: 1.2, stagger: 0.06 },
            0.7,
          );

        // The photo drifts as the hero scrolls away.
        gsap.to("[data-a-img]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-a-frame]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-a-section]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { y: 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 82%" },
            },
          );
        });
        gsap.fromTo(
          "[data-a-aside] > *",
          { x: 30, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            delay: 0.9,
          },
        );

        ScrollTrigger.batch("[data-a-related]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 60, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                stagger: 0.1,
                ease: "expo.out",
              },
            ),
        });
      });
    },
    { scope: root },
  );

  // Split the title into words so it can rise in line by line.
  const words = post.title.split(" ");

  return (
    <div ref={root}>
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div
          data-a-progress
          className="h-full origin-left scale-x-0"
          style={{ background: `linear-gradient(90deg, #F47A2A, ${tint})` }}
        />
      </div>

      {/* Hero */}
      <section className="px-3 pt-3">
        <div
          data-a-frame
          className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden rounded-[28px] px-6 pb-12 pt-36 text-white sm:px-10 lg:pb-16"
        >
          <div data-a-img className="absolute inset-0 -z-10">
            <Image
              src={blogImage(post.img, 2200)}
              alt=""
              fill
              sizes="100vw"
              preload
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#140B09]/95 via-[#140B09]/50 to-[#140B09]/20"
          />

          <div className="mx-auto w-full max-w-6xl">
            <div data-a-meta className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white hover:text-[#2E1212]"
              >
                <Arrow className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
                All guides
              </Link>
              <CategoryChip c={post.category} solid />
            </div>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.2rem,5.2vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {words.map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <span data-a-line className="inline-block">
                    {w}
                  </span>
                </span>
              ))}
            </h1>
            <div
              data-a-meta
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75"
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                  RE
                </span>
                {post.author}
              </span>
              <span>{formatDate(post.date)}</span>
              <span>{post.read} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_300px]">
          <article data-a-body className="max-w-2xl">
            <p
              className="text-[1.3rem] font-medium leading-relaxed tracking-tight"
              style={{ color: MAROON }}
            >
              {post.excerpt}
            </p>
            {post.sections.map((s, i) => (
              <div
                key={s.heading}
                id={anchor(i)}
                data-a-section
                className="mt-14 scroll-mt-28"
              >
                <p className="text-sm font-semibold" style={{ color: tint }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  className="mt-2 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.025em]"
                  style={{ color: MAROON }}
                >
                  {s.heading}
                </h2>
                {s.body.map((para, k) => (
                  <p
                    key={k}
                    className="mt-4 text-[1.05rem] leading-[1.8] text-[#2E1212]/70"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-16 rounded-[24px] border border-[#2E1212]/8 bg-[#FBF6EF] p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
                Next step
              </p>
              <p
                className="mt-2 text-xl font-semibold tracking-tight"
                style={{ color: MAROON }}
              >
                Want advice for your own plans?
              </p>
              <p className="mt-2 text-[#2E1212]/60">
                Every student is different. A counsellor can tell you exactly
                how this applies to you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={post.cta.href}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#2E1212] pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand"
                >
                  {post.cta.label}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-brand">
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex h-12 items-center rounded-full border border-[#2E1212]/15 px-6 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-white"
                >
                  More guides
                </Link>
              </div>
            </div>
          </article>

          {/* Contents and a quick call to action, following the reader */}
          <aside
            data-a-aside
            className="space-y-4 lg:sticky lg:top-28 lg:self-start"
          >
            <nav
              aria-label="In this guide"
              className="rounded-[24px] border border-[#2E1212]/8 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(46,18,18,0.45)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2E1212]/45">
                In this guide
              </p>
              <ol className="mt-4 space-y-1">
                {post.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${anchor(i)}`}
                      className={`flex gap-3 rounded-xl px-3 py-2.5 text-sm leading-snug transition-colors duration-300 ${active === i ? "bg-brand/10 font-semibold text-[#2E1212]" : "text-[#2E1212]/60 hover:bg-[#2E1212]/5 hover:text-[#2E1212]"}`}
                    >
                      <span
                        className={`mt-0.5 h-4 w-1 shrink-0 rounded-full transition-colors duration-300 ${active === i ? "bg-brand" : "bg-[#2E1212]/10"}`}
                      />
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="relative overflow-hidden rounded-[24px] bg-[#2E1212] p-6 text-white">
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/40 blur-3xl"
              />
              <p className="relative text-lg font-semibold leading-snug">
                Talk to a counsellor, free
              </p>
              <p className="relative mt-1.5 text-sm text-white/65">
                Online or at our London and Dhaka offices.
              </p>
              <Link
                href="/consultation"
                className="relative mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold transition-colors hover:bg-white hover:text-[#2E1212]"
              >
                Book a session <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-[#FBF6EF] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <h2
              className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              style={{ color: MAROON }}
            >
              Keep reading
            </h2>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2E1212] hover:text-brand"
            >
              All guides{" "}
              <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <div key={p.slug} data-a-related>
                <BlogCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
