"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FAQS,
  FAQ_TOPICS,
  type Faq as FaqItem,
  type FaqTopic,
} from "./faqData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";
const keyOf = (f: FaqItem) => f.q;

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

/** Wraps matches of the search words in a soft highlight. */
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const re = new RegExp(
    `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="rounded bg-brand/20 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Item({
  f,
  open,
  onToggle,
  words,
  index,
}: {
  f: FaqItem;
  open: boolean;
  onToggle: () => void;
  words: string[];
  index: number;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const id = `faq-${index}`;

  // Open and close by animating the panel's real height.
  useGSAP(
    () => {
      const el = panel.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { height: open ? "auto" : 0 });
        return;
      }
      if (open) {
        gsap.to(el, { height: "auto", duration: 0.6, ease: "expo.out" });
        gsap.fromTo(
          el.firstElementChild,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", delay: 0.05 },
        );
      } else {
        gsap.to(el, { height: 0, duration: 0.45, ease: "power3.inOut" });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div
      data-f-item
      className={`group rounded-[22px] border transition-[background-color,border-color,box-shadow] duration-500 ${open ? "border-transparent bg-white shadow-[0_30px_60px_-34px_rgba(46,18,18,0.4)]" : "border-[#2E1212]/8 bg-white/60 hover:bg-white"}`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
        >
          <span
            className={`hidden h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold transition-colors duration-500 sm:grid ${open ? "bg-brand text-white" : "bg-[#2E1212]/5 text-[#2E1212]/50"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="flex-1 text-[1.05rem] font-semibold leading-snug tracking-tight"
            style={{ color: MAROON }}
          >
            <Highlight text={f.q} words={words} />
          </span>
          <span
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${open ? "rotate-45 bg-[#2E1212] text-white" : "bg-[#2E1212]/6 text-[#2E1212] group-hover:bg-brand group-hover:text-white"}`}
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        ref={panel}
        id={id}
        role="region"
        aria-labelledby={`${id}-q`}
        className="overflow-hidden"
        style={{ height: open ? "auto" : 0 }}
      >
        <div className="px-5 pb-6 sm:pl-[4.75rem] sm:pr-16">
          <p className="leading-relaxed text-[#2E1212]/65">
            <Highlight text={f.a} words={words} />
          </p>
          {f.link && (
            <Link
              href={f.link.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              {f.link.label}
              <Arrow className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState<FaqTopic | "All">("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(keyOf(FAQS[0]));

  const words = useMemo(
    () =>
      query
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 1),
    [query],
  );
  const shown = FAQS.filter(
    (f) =>
      (topic === "All" || f.topic === topic) &&
      words.every((w) => `${f.q} ${f.a}`.toLowerCase().includes(w)),
  );
  const count = (t: FaqTopic) => FAQS.filter((f) => f.topic === t).length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-f-frame]",
            { clipPath: "inset(6% 4% 6% 4% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-f-eyebrow]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.5,
          )
          .fromTo(
            "[data-f-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.55,
          )
          .fromTo(
            "[data-f-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            0.85,
          )
          .fromTo(
            "[data-f-q]",
            { scale: 0, rotate: (i: number) => (i % 2 ? 20 : -20) },
            {
              scale: 1,
              rotate: (i: number) => [-12, 10, -6, 14][i] ?? 0,
              duration: 1,
              stagger: 0.12,
              ease: "back.out(2)",
            },
            0.8,
          );
        gsap.utils.toArray<HTMLElement>("[data-f-q]").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 14 : -14,
            duration: 3 + i * 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2,
          });
        });
        gsap.fromTo(
          "[data-f-side] > *",
          { x: -30, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-f-body]", start: "top 80%" },
          },
        );
        gsap.fromTo(
          "[data-f-cta]",
          { clipPath: "inset(18% 8% 18% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-f-cta]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // When the topic or search changes, the questions cascade in.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-f-item]",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: list.current, start: "top 85%" },
        },
      );
    },
    { scope: root, dependencies: [topic, words.join(" ")] },
  );

  const pick = (t: FaqTopic | "All") => {
    setTopic(t);
    const first = FAQS.find((f) => t === "All" || f.topic === t);
    setOpen(first ? keyOf(first) : null);
  };

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="px-3 pt-3">
        <div
          data-f-frame
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#FFF5EC_0%,#FFE6D2_55%,#FFD3B0_100%)] px-6 pb-16 pt-32 text-center sm:px-10 lg:pb-20 lg:pt-36"
        >
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/60 blur-[90px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 right-[10%] h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[100px]"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              maskImage:
                "radial-gradient(55% 60% at 50% 45%, black, transparent 75%)",
            }}
          >
            <defs>
              <pattern
                id="f-grid"
                width="34"
                height="34"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M34 0H0V34"
                  fill="none"
                  stroke="#F47A2A"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#f-grid)" />
          </svg>
          {/* Floating question marks */}
          {[
            ["left-[8%] top-[30%] h-16 w-16 bg-brand text-white text-3xl", "?"],
            [
              "right-[9%] top-[24%] h-20 w-20 bg-[#2E1212] text-white text-4xl",
              "?",
            ],
            [
              "left-[14%] bottom-[14%] h-12 w-12 bg-white text-brand text-2xl",
              "!",
            ],
            [
              "right-[15%] bottom-[18%] h-14 w-14 bg-[#FBB524] text-[#2E1212] text-2xl",
              "?",
            ],
          ].map(([cls, ch], i) => (
            <span
              key={i}
              data-f-q
              aria-hidden
              className={`absolute hidden place-items-center rounded-2xl font-bold shadow-[0_20px_40px_-18px_rgba(46,18,18,0.5)] md:grid ${cls}`}
            >
              {ch}
            </span>
          ))}

          <div className="relative mx-auto max-w-3xl">
            <p
              data-f-eyebrow
              className="inline-flex items-center gap-2 rounded-full border border-[#2E1212]/10 bg-white/70 px-4 py-1.5 text-sm font-semibold text-[#2E1212] backdrop-blur"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-[0.7rem] font-bold text-white">
                ?
              </span>
              Frequently asked questions
            </p>
            <h1
              className="mt-6 text-[clamp(2.6rem,6.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
              style={{ color: MAROON }}
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-f-line className="block">
                  Questions? We&apos;ve got
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <span data-f-line className="block text-brand">
                  answers.
                </span>
              </span>
            </h1>
            <p
              data-f-sub
              className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-relaxed text-[#2E1212]/65"
            >
              Everything students ask us about studying abroad, from your first
              consultation to the day you fly.
            </p>
            <label
              data-f-sub
              className="mx-auto mt-9 flex h-16 max-w-xl items-center gap-3 rounded-full border border-[#2E1212]/10 bg-white pl-6 pr-2 shadow-[0_24px_50px_-26px_rgba(46,18,18,0.5)] transition-shadow focus-within:shadow-[0_0_0_5px_rgba(244,122,42,0.18)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 text-[#2E1212]/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTopic("All");
                  setOpen(null);
                }}
                placeholder="Search, e.g. scholarship, visa, IELTS"
                aria-label="Search questions"
                className="h-full min-w-0 flex-1 bg-transparent text-base text-[#2E1212] outline-none placeholder:text-[#2E1212]/35"
              />
              <a
                href="#questions"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2E1212] text-white transition-colors hover:bg-brand"
                aria-label="Go to questions"
              >
                <Arrow />
              </a>
            </label>
            <p data-f-sub className="mt-4 text-sm text-[#2E1212]/50">
              {FAQS.length} answers across {FAQ_TOPICS.length} topics
            </p>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section id="questions" className="scroll-mt-24 px-6 py-20 sm:py-24">
        <div
          data-f-body
          className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[17rem_1fr] lg:gap-14"
        >
          {/* Topics */}
          <nav
            aria-label="Topics"
            className="min-w-0 lg:sticky lg:top-28 lg:self-start"
          >
            <div
              data-f-side
              className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {(
                ["All", ...FAQ_TOPICS.map((t) => t.key)] as (FaqTopic | "All")[]
              ).map((t) => {
                const on = topic === t;
                const icon =
                  FAQ_TOPICS.find((x) => x.key === t)?.icon ??
                  "M4 6h16M4 12h16M4 18h16";
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(t)}
                    className={`group flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-all duration-300 lg:w-full ${on ? "bg-[#2E1212] text-white shadow-[0_14px_30px_-16px_rgba(46,18,18,0.7)]" : "bg-white text-[#2E1212]/70 hover:bg-[#FBF0E6] hover:text-[#2E1212] lg:bg-transparent"}`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${on ? "bg-brand text-white" : "bg-[#FBF0E6] text-brand group-hover:bg-white"}`}
                    >
                      <Icon d={icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex-1 whitespace-nowrap">
                      {t === "All" ? "All questions" : t}
                    </span>
                    <span
                      className={`rounded-full px-2 text-xs ${on ? "bg-white/15" : "bg-[#2E1212]/6"}`}
                    >
                      {t === "All" ? FAQS.length : count(t)}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              data-f-side
              className="mt-6 hidden rounded-[22px] bg-[#FBF6EF] p-5 lg:block"
            >
              <p className="text-sm font-semibold" style={{ color: MAROON }}>
                Can&apos;t find it?
              </p>
              <p className="mt-1 text-sm text-[#2E1212]/55">
                Ask a counsellor directly. It&apos;s free.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                Contact us <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </nav>

          {/* Answers */}
          <div ref={list} className="min-w-0">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]"
                style={{ color: MAROON }}
              >
                {topic === "All" ? "All questions" : topic}
              </h2>
              <p className="text-sm text-[#2E1212]/50" aria-live="polite">
                {shown.length} {shown.length === 1 ? "answer" : "answers"}
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {shown.map((f) => (
                <Item
                  key={keyOf(f)}
                  f={f}
                  index={FAQS.indexOf(f)}
                  words={words}
                  open={open === keyOf(f)}
                  onToggle={() => setOpen(open === keyOf(f) ? null : keyOf(f))}
                />
              ))}
            </div>
            {shown.length === 0 && (
              <div className="mt-6 rounded-[26px] border border-dashed border-[#2E1212]/15 bg-[#FBF6EF] p-12 text-center">
                <p className="text-lg font-semibold" style={{ color: MAROON }}>
                  No answers match &ldquo;{query.trim()}&rdquo;.
                </p>
                <p className="mt-2 text-[#2E1212]/60">
                  Try a different word, or send us your question.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      pick("All");
                    }}
                    className="inline-flex h-11 items-center rounded-full bg-[#2E1212] px-6 text-sm font-semibold text-white transition-colors hover:bg-brand"
                  >
                    Show all questions
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center rounded-full border border-[#2E1212]/15 px-6 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-white"
                  >
                    Ask us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still have a question */}
      <section className="px-3 pb-3">
        <div
          data-f-cta
          className="relative overflow-hidden rounded-[32px] bg-[#2E1212] px-6 py-16 text-white sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#6464FF]/25 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                Still have a question?
              </h2>
              <p className="mt-3 max-w-md text-white/65">
                Every plan is different. Talk to a counsellor and get answers
                for your grades, budget and goals.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  label: "Book a free consultation",
                  href: "/consultation",
                  primary: true,
                },
                { label: "Send us a message", href: "/contact" },
                { label: "Join a free webinar", href: "/events" },
              ].map((b) => (
                <Link
                  key={b.label}
                  href={b.href}
                  className={`group inline-flex h-14 items-center justify-between rounded-full pl-6 pr-2 text-sm font-semibold transition-colors ${b.primary ? "bg-brand hover:bg-white hover:text-[#2E1212]" : "border border-white/20 hover:bg-white/10"}`}
                >
                  {b.label}
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-45 ${b.primary ? "bg-white text-brand" : "bg-white/10"}`}
                  >
                    <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
