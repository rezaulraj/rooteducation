"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries, Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type WheelItem = { label: string; mark: ReactNode; tint: string };

const iconMark = (name: string) => <Icon name={name} className="h-6 w-6" />;
const flagMark = (flag: string) => (
  <span className="h-6 w-9 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]" style={{ background: flag }} />
);
const flagOf = (name: string) => countries.find((c) => c.name === name)!.flag;

// Placeholder copy — adjust the wording to match your voice.
const cards: {
  kicker: string;
  title: string;
  copy: string;
  theme: "ink" | "orange" | "peach" | "light";
  items?: WheelItem[];
}[] = [
  {
    kicker: "Services",
    title: "Find where your goals take you",
    copy: "Every student starts with a dream. We map the route, from the first conversation to the right course.",
    theme: "ink",
    items: [
      { label: "Study abroad consultation", mark: iconMark("compass"), tint: "#F47A2A" },
      { label: "University selection", mark: iconMark("university"), tint: "#7FB59C" },
      { label: "Application assistance", mark: iconMark("document"), tint: "#FBB524" },
      { label: "Visa guidance", mark: iconMark("passport"), tint: "#6C7BEA" },
      { label: "Scholarships & aid", mark: iconMark("scholarship"), tint: "#E0663B" },
      { label: "Pre-departure briefing", mark: iconMark("plane"), tint: "#5AA0E6" },
    ],
  },
  {
    kicker: "Destinations",
    title: "Six countries. One clear plan.",
    copy: "Compare courses, costs and lifestyles across Europe and the UK, with advisors who know each system.",
    theme: "orange",
    items: countries.map((c) => ({ label: c.tagline, mark: flagMark(c.flag), tint: "rgba(255,255,255,0.18)" })),
  },
  {
    kicker: "Your journey",
    title: "With you from first call to first lecture",
    copy: "One team and one timeline, so nothing slips between application, visa and departure.",
    theme: "peach",
    items: [
      { label: "Free consultation", mark: iconMark("compass"), tint: "#141012" },
      { label: "Shortlist universities", mark: iconMark("university"), tint: "#F47A2A" },
      { label: "Apply with confidence", mark: iconMark("document"), tint: "#141012" },
      { label: "Receive your offer", mark: iconMark("scholarship"), tint: "#F47A2A" },
      { label: "Secure your visa", mark: iconMark("passport"), tint: "#141012" },
      { label: "Take off", mark: iconMark("plane"), tint: "#F47A2A" },
    ],
  },
  {
    kicker: "University shortlist",
    title: "Find the right university for you",
    copy: "Get a shortlist matched to your grades, budget and goals, and see your admit chances before you apply.",
    theme: "light",
  },
];

// Example institutions in your destinations — replace with your actual partner list.
const universityRows: { name: string; country: string }[][] = [
  [
    { name: "University of Bucharest", country: "Romania" },
    { name: "University of Malta", country: "Malta" },
    { name: "Semmelweis University", country: "Hungary" },
    { name: "University of Manchester", country: "UK" },
    { name: "University of Cyprus", country: "Cyprus" },
  ],
  [
    { name: "Aristotle University of Thessaloniki", country: "Greece" },
    { name: "Babeș-Bolyai University", country: "Romania" },
    { name: "King's College London", country: "UK" },
    { name: "University of Debrecen", country: "Hungary" },
    { name: "University of Nicosia", country: "Cyprus" },
  ],
  [
    { name: "University of Glasgow", country: "UK" },
    { name: "University of Szeged", country: "Hungary" },
    { name: "Carol Davila University", country: "Romania" },
    { name: "University of Athens", country: "Greece" },
    { name: "MCAST", country: "Malta" },
  ],
];

const themes = {
  ink: { card: "bg-[#141012] text-white", copy: "text-white/60", kicker: "text-brand" },
  orange: { card: "bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white", copy: "text-white/75", kicker: "text-[#141012]" },
  peach: { card: "bg-[linear-gradient(150deg,#FFF0E3_0%,#FFC79E_100%)] text-ink", copy: "text-ink/65", kicker: "text-brand" },
  light: { card: "bg-[#FBF7F2] text-ink", copy: "text-ink/65", kicker: "text-brand" },
};

// Floating keyword tags around the headline, as [left %, top %, rotation].
const tags: { label: ReactNode; bg: string; fg: string; pos: [number, number, number] }[] = [
  { label: "Universities", bg: "#F47A2A", fg: "#141012", pos: [4, 4, -6] },
  { label: "Scholarships", bg: "#FBB524", fg: "#141012", pos: [44, 30, 4] },
  { label: <span className="text-xl font-bold">$</span>, bg: "#FFC79E", fg: "#141012", pos: [86, -4, 8] },
  { label: <Icon name="scholarship" className="h-5 w-5" />, bg: "#141012", fg: "#FFFFFF", pos: [12, 58, -4] },
  { label: "Visa", bg: "#7FB59C", fg: "#141012", pos: [80, 70, -8] },
];

// What each tag becomes (indices into `tags`): the first card, the two backing plates,
// and the tags that are simply absorbed.
const firstCardTag = 3;
const plateTags = [0, 2];
const absorbed = [1, 4];
// When a card finishes it shrinks back into this tag (by card index); the last card stays.
const returnTag = [3, 0, 2];

/** Layout box of `el` relative to `root`, ignoring transforms in between. */
function layoutRect(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

// The front slot, and the two tilted plates that sit behind every card.
const slots = [
  { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1 },
  { x: -18, y: 26, rotation: -3, scaleX: 0.97, scaleY: 0.97 },
  { x: -36, y: 52, rotation: -6, scaleX: 0.94, scaleY: 0.94 },
];

const ITEM = 76;

function UniversityPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#8EC1F2_0%,#CFE5FA_70%,#E8F2FC_100%)]">
      <div aria-hidden className="absolute -left-10 top-10 h-24 w-64 rounded-full bg-white/70 blur-2xl" />
      <div aria-hidden className="absolute right-0 top-24 h-20 w-56 rounded-full bg-white/60 blur-2xl" />
      <Image
        src="/centerstudent.png"
        alt="Graduate smiling with his diploma"
        width={1368}
        height={1150}
        sizes="(min-width: 768px) 40vw, 90vw"
        className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 bg-gradient-to-t from-[#141012]/55 via-[#141012]/15 to-transparent pb-5 pt-16">
        {universityRows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div data-uni-row={r % 2 ? "rev" : "fwd"} className="flex w-max gap-2.5">
              {[...row, ...row].map((u, i) => (
                <span
                  key={i}
                  aria-hidden={i >= row.length}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/60 bg-white/75 py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink shadow-[0_8px_20px_-12px_rgba(20,16,18,0.5)] backdrop-blur-md"
                >
                  <span className="h-7 w-7 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" style={{ background: flagOf(u.country) }} />
                  {u.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhyRoot() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-why-card]", section);
      const plateEls = gsap.utils.toArray<HTMLElement>("[data-why-plate]", section);

      // Wheel: items sit on a gentle arc; the centred one is brightest and furthest out.
      const wheels = cardEls.map((card) => gsap.utils.toArray<HTMLElement>("[data-wheel-item]", card));
      const spin = (k: number, pos: number) => {
        wheels[k].forEach((el, i) => {
          const d = i - pos;
          const a = Math.min(Math.abs(d), 3);
          gsap.set(el, { y: d * ITEM, x: -a * a * 14, scale: 1 - a * 0.08, opacity: Math.max(0, 1 - a * 0.32) });
        });
      };
      wheels.forEach((_, k) => spin(k, 0));

      // Keyword tags bob gently around the headline the whole time.
      gsap.utils.toArray<HTMLElement>("[data-tag-float]", section).forEach((el, i) => {
        const tilt = tags[i].pos[2];
        gsap.fromTo(
          el,
          { y: i % 2 ? -8 : 8, rotation: tilt - 3 },
          { y: i % 2 ? 8 : -8, rotation: tilt + 3, duration: 2.4 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      });

      // University names glide past in alternating directions.
      gsap.utils.toArray<HTMLElement>("[data-uni-row]", section).forEach((row, i) => {
        const rev = row.dataset.uniRow === "rev";
        gsap.fromTo(row, { xPercent: rev ? -50 : 0 }, { xPercent: rev ? 0 : -50, duration: 26 + i * 6, ease: "none", repeat: -1 });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");

        const tagEls = gsap.utils.toArray<HTMLElement>("[data-tag]", section);
        const front = cardEls[0];
        const box = (el: HTMLElement) => {
          const r = layoutRect(el, section);
          return { cx: r.x + r.w / 2, cy: r.y + r.h / 2, w: r.w, h: r.h };
        };
        // Where a tag appears once the headline has shrunk: its layout box scaled about the
        // headline's top-centre origin, then shifted by the headline's lift.
        const intro = section.querySelector<HTMLElement>("[data-why-intro]")!;
        const INTRO_SCALE = 0.5;
        const introLift = () => -window.innerHeight * 0.05;
        const tagOnTitle = (t: number) => {
          const i = layoutRect(intro, section);
          const g = box(tagEls[t]);
          const ox = i.x + i.w / 2;
          return {
            cx: ox + (g.cx - ox) * INTRO_SCALE,
            cy: i.y + (g.cy - i.y) * INTRO_SCALE + introLift(),
            w: g.w * INTRO_SCALE,
            h: g.h * INTRO_SCALE,
          };
        };

        // Morph `el` out of its tag's box (position, size, tilt) into a resting slot.
        const fromTag = (el: HTMLElement, t: number) => ({
          x: () => box(tagEls[t]).cx - box(el).cx,
          y: () => box(tagEls[t]).cy - box(el).cy,
          scaleX: () => box(tagEls[t]).w / box(el).w,
          scaleY: () => box(tagEls[t]).h / box(el).h,
          rotation: tags[t].pos[2],
        });

        gsap.set([...cardEls, ...plateEls], { autoAlpha: 0 });
        cardEls.forEach((el, i) => gsap.set(el, { zIndex: 10 + i }));

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${cardEls.length * 140}%`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // 1. The headline shrinks into a title while its tags stretch into the stack:
        //    the cap becomes the first card, Universities and "$" become the plates behind it.
        tl.fromTo(
          "[data-why-intro]",
          { y: 0, scale: 1 },
          { y: introLift, scale: INTRO_SCALE, transformOrigin: "50% 0%", duration: 1.1 },
          0,
        )
          .set([firstCardTag, ...plateTags].map((t) => tagEls[t]), { autoAlpha: 0 }, 0.02)
          .set([front, ...plateEls, ...cardEls.slice(1)], { autoAlpha: 1 }, 0.02)
          .fromTo(front, fromTag(front, firstCardTag), { ...slots[0], duration: 1.1, ease: "power3.inOut" }, 0.05)
          .fromTo(front.querySelector("[data-why-skin]"), { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "power1.in" }, 0.7);
        plateEls.forEach((plate, n) => {
          tl.fromTo(plate, fromTag(plate, plateTags[n]), { ...slots[n + 1], duration: 1.1, ease: "power3.inOut" }, 0.17 + n * 0.12);
        });
        absorbed.forEach((t, n) => {
          tl.to(
            tagEls[t],
            {
              x: () => (box(front).cx - box(tagEls[t]).cx) * 2,
              y: () => (box(front).cy - box(tagEls[t]).cy) * 2,
              scale: 0,
              rotation: n % 2 ? 160 : -160,
              duration: 0.9,
              ease: "power2.in",
            },
            0.15 + n * 0.1,
          );
        });

        // 2. Each card plays its content, then the next card scrolls up from below as the
        //    finished one shrinks back into a floating tag, so only one card is ever on screen.
        cardEls.forEach((card, k) => {
          const at = tl.duration();
          const q = (sel: string) => card.querySelectorAll(sel);
          tl.fromTo(q("[data-why-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }, at)
            .fromTo(q("[data-why-copy]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, at + 0.2)
            .fromTo(q("[data-wheel]"), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, at + 0.15);

          if (wheels[k].length) {
            const proxy = { pos: 0 };
            tl.to(proxy, { pos: wheels[k].length - 1, duration: 1.6, ease: "none", onUpdate: () => spin(k, proxy.pos) }, at + 0.5);
          } else {
            tl.to({}, { duration: 1.4 }, at + 0.5);
          }

          if (k < cardEls.length - 1) {
            const out = at + 2.2;
            // The finished card folds back into a floating tag beside the headline: its colour
            // washes over it, it shrinks into the tag's exact spot, then the tag takes over.
            const t = returnTag[k];
            tl.fromTo(card.querySelector("[data-why-skin]"), { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out", immediateRender: false }, out)
              .to(
                card,
                {
                  x: () => tagOnTitle(t).cx - box(card).cx,
                  y: () => tagOnTitle(t).cy - box(card).cy,
                  scaleX: () => tagOnTitle(t).w / box(card).w,
                  scaleY: () => tagOnTitle(t).h / box(card).h,
                  rotation: tags[t].pos[2],
                  duration: 0.95,
                  ease: "power3.inOut",
                },
                out,
              )
              .set(card, { autoAlpha: 0 }, out + 0.95)
              .set(tagEls[t], { autoAlpha: 1 }, out + 0.95);
            // The tags the first card absorbed are released again with it.
            if (k === 0) {
              absorbed.forEach((a, n) => {
                tl.to(tagEls[a], { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.6)" }, out + 0.4 + n * 0.12);
              });
            }
            tl.fromTo(
              cardEls[k + 1],
              { y: () => section.offsetHeight, rotation: 3, x: 0, scaleX: 1, scaleY: 1 },
              { y: 0, rotation: 0, duration: 0.9, ease: "power3.out" },
              out,
            );
          }
        });

        tl.to({}, { duration: 0.4 });

        return () => section.classList.remove("pinned");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="group/why relative overflow-hidden bg-white [&.pinned]:h-svh">
      {/* Headline with floating keyword tags */}
      <div
        data-why-intro
        className="relative px-6 pb-12 pt-24 text-center group-[.pinned]/why:absolute group-[.pinned]/why:inset-x-0 group-[.pinned]/why:top-0 group-[.pinned]/why:pt-[20vh]"
      >
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
          Why choose Root Education
        </p>
        <div className="relative mx-auto mt-6 max-w-5xl">
          <h2 id="why-title" className="text-[clamp(3rem,9vw,8.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
            Everything you need. All in one place.
          </h2>
          {tags.map((t, i) => (
            <span
              key={i}
              data-tag
              aria-hidden
              className="pointer-events-none absolute hidden sm:block"
              style={{ left: `${t.pos[0]}%`, top: `${t.pos[1]}%` }}
            >
              <span
                data-tag-float
                className="flex h-11 items-center gap-2 pl-4 pr-7 text-sm font-semibold uppercase tracking-wide shadow-[0_14px_30px_-12px_rgba(20,16,18,0.45)] [clip-path:polygon(0_0,82%_0,100%_50%,82%_100%,0_100%)]"
                style={{ background: t.bg, color: t.fg, transform: `rotate(${t.pos[2]}deg)` }}
              >
                {t.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Stacked cards */}
      <div
        data-why-stack
        className="relative mx-auto max-w-5xl px-4 pb-24 group-[.pinned]/why:absolute group-[.pinned]/why:inset-x-0 group-[.pinned]/why:top-[33vh] group-[.pinned]/why:h-[58vh] group-[.pinned]/why:pb-0"
      >
        {/* Backing plates, grown from the Universities and "$" tags */}
        {plateTags.map((t) => (
          <div
            key={t}
            data-why-plate
            aria-hidden
            className="absolute inset-x-4 inset-y-0 hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(20,16,18,0.45)] group-[.pinned]/why:block"
            style={{ background: tags[t].bg }}
          />
        ))}

        {cards.map((c, k) => {
          const t = themes[c.theme];
          return (
            <article
              key={c.kicker}
              data-why-card
              className={`relative mb-6 grid overflow-hidden rounded-[28px] shadow-[0_40px_90px_-30px_rgba(20,16,18,0.5)] md:grid-cols-2 ${t.card} group-[.pinned]/why:absolute group-[.pinned]/why:inset-x-4 group-[.pinned]/why:inset-y-0 group-[.pinned]/why:mb-0`}
            >
              {k < returnTag.length && (
                // Tag-coloured skin: shown while the card is (or is becoming) a tag.
                <div data-why-skin aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-0" style={{ background: tags[returnTag[k]].bg }} />
              )}
              {c.theme === "ink" && <div aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/30 blur-[100px]" />}
              <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-12">
                <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${t.kicker}`}>{c.kicker}</p>
                <h3 className="text-[clamp(2rem,3.6vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                  {c.title.split(" ").map((w, i) => (
                    <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.06em] align-bottom">
                      <span data-why-line className="inline-block">
                        {w}
                      </span>
                    </span>
                  ))}
                </h3>
                <div data-why-copy className="flex flex-col items-start gap-6">
                  <p className={`max-w-sm text-base leading-relaxed ${t.copy}`}>{c.copy}</p>
                  {!c.items && (
                    <Link
                      href="/services/university-selection"
                      className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-2 text-sm font-semibold text-white"
                    >
                      University shortlist
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {c.items ? (
                <div data-wheel className="relative h-[300px] overflow-hidden md:h-auto" aria-label={`${c.kicker} highlights`}>
                  <ul>
                    {c.items.map((item) => (
                      <li
                        key={item.label}
                        data-wheel-item
                        className="absolute right-8 top-1/2 -mt-[30px] flex h-[60px] origin-right items-center gap-5 sm:right-12"
                      >
                        <span className="whitespace-nowrap text-xl font-medium tracking-tight sm:text-[1.75rem]">{item.label}</span>
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-white" style={{ background: item.tint }}>
                          {item.mark}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div data-wheel className="relative h-[320px] md:h-auto">
                  <UniversityPanel />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
