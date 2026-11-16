"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import {
  KIND_TINT,
  PAST,
  UPCOMING,
  dayOf,
  duration,
  eventImage,
  fullDate,
  icsFor,
  monthKey,
  monthOf,
  timeIn,
  weekdayOf,
  type EventKind,
  type RootEvent,
} from "./eventsData";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const MAROON = "#2E1212";
const NIGHT = "#140E0D";
type Filter = "All" | EventKind | "Online" | "In person";
const FILTERS: Filter[] = [
  "All",
  "Webinar",
  "Workshop",
  "Education fair",
  "Online",
  "In person",
];

const matches = (e: RootEvent, f: Filter) =>
  f === "All" ||
  e.kind === f ||
  (f === "Online" && e.mode === "Online") ||
  (f === "In person" && e.mode !== "Online");

// The clock, read only in the browser so the server and browser render the same HTML.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
};
const nowSecond = () => Math.floor(Date.now() / 1000);

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

function Pin({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function Screen({ className = "h-4 w-4" }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function Flags({
  codes,
  ring = "ring-white",
}: {
  codes: string[];
  ring?: string;
}) {
  if (!codes.length) return null;
  return (
    <span className="flex -space-x-1.5">
      {codes.map((c) => (
        <span
          key={c}
          className={`relative h-6 w-6 overflow-hidden rounded-full ring-2 ${ring}`}
        >
          <Image
            src={`/flags/${c}.svg`}
            alt=""
            fill
            sizes="24px"
            className="object-cover"
            unoptimized
          />
        </span>
      ))}
    </span>
  );
}

function Countdown({ start }: { start: string }) {
  const now = useSyncExternalStore(subscribe, nowSecond, () => null);
  const left =
    now === null
      ? null
      : Math.max(0, Math.floor(new Date(start).getTime() / 1000) - now);
  const parts: [string, number | null][] = [
    ["Days", left === null ? null : Math.floor(left / 86400)],
    ["Hours", left === null ? null : Math.floor((left % 86400) / 3600)],
    ["Mins", left === null ? null : Math.floor((left % 3600) / 60)],
    ["Secs", left === null ? null : left % 60],
  ];
  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-3"
      aria-label="Time until the event"
    >
      {parts.map(([label, n]) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-white/[0.06] px-2 py-3 text-center backdrop-blur sm:py-4"
        >
          <p className="font-mono text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-none tabular-nums">
            {n === null ? "--" : String(n).padStart(2, "0")}
          </p>
          <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** The registration popup: details, then a confirmation with "Add to calendar". */
function Register({ e, onClose }: { e: RootEvent; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");

  useEffect(() => {
    window.dispatchEvent(new Event("scroll:lock"));
    document.documentElement.style.overflow = "hidden";
    const onKey = (k: KeyboardEvent) => k.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.dispatchEvent(new Event("scroll:unlock"));
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          "[data-r-veil]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 },
        )
        .fromTo(
          "[data-r-card]",
          { y: 60, scale: 0.94, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.8 },
          0.05,
        )
        .fromTo(
          "[data-r-in]",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05 },
          0.25,
        );
    },
    { scope: root, dependencies: [ref] },
  );

  const valid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phone.replace(/\D/g, "").length >= 7;

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: e.slug,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error();
      setRef(j.reference);
    } catch {
      setError("We couldn't save your place. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    const url = URL.createObjectURL(
      new Blob([icsFor(e)], { type: "text/calendar" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${e.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const input =
    "h-12 w-full rounded-xl border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/35 focus:border-brand focus:shadow-[0_0_0_4px_rgba(244,122,42,0.15)]";

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
    >
      <div
        data-r-veil
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[#1B1214]/55 backdrop-blur-[6px]"
      />
      <div
        data-r-card
        role="dialog"
        aria-modal="true"
        aria-labelledby="reg-title"
        className="relative grid max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(20,10,10,0.6)] md:grid-cols-[0.9fr_1.1fr]"
        data-lenis-prevent
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink/70 backdrop-blur transition-all duration-300 hover:rotate-90 hover:text-ink"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M3 3l10 10M13 3 3 13" />
          </svg>
        </button>

        {/* Event summary */}
        <div className="relative isolate flex min-h-[14rem] flex-col justify-end overflow-hidden p-6 text-white">
          <Image
            src={eventImage(e.img, 900)}
            alt=""
            fill
            sizes="(min-width:768px) 40vw, 100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#140B09]/95 via-[#140B09]/55 to-[#140B09]/10"
          />
          <span
            className="w-fit rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]"
            style={{ background: KIND_TINT[e.kind] }}
          >
            {e.kind}
          </span>
          <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
            {e.title}
          </p>
          <p className="mt-2 text-sm text-white/75">{fullDate(e.start)}</p>
          <p className="text-sm text-white/75">
            {timeIn(e.start, "Europe/London")} London ·{" "}
            {timeIn(e.start, "Asia/Dhaka")} Dhaka
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {ref ? (
            <div>
              <span
                data-r-in
                className="grid h-14 w-14 place-items-center rounded-2xl bg-[#22C55E] text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12.5 10 17l9-10" />
                </svg>
              </span>
              <h2
                data-r-in
                id="reg-title"
                className="mt-5 text-2xl font-semibold tracking-tight text-ink"
              >
                You&apos;re in, {name.trim().split(" ")[0]}!
              </h2>
              <p data-r-in className="mt-2 text-sm leading-relaxed text-ink/60">
                Your place is saved (reference <b className="text-ink">{ref}</b>
                ).{" "}
                {e.mode === "Online"
                  ? "We'll email you the joining link before the session."
                  : `We'll see you at our ${e.mode.replace(" office", "")} office.`}
              </p>
              <button
                data-r-in
                type="button"
                onClick={download}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition-colors hover:bg-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                  <path d="M3.5 10h17M8 3v4M16 3v4M12 13v4M10 15h4" />
                </svg>
                Add to calendar
              </button>
              <button
                data-r-in
                type="button"
                onClick={onClose}
                className="mt-3 h-11 w-full text-sm font-medium text-ink/60 transition-colors hover:text-ink"
              >
                Back to events
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h2
                data-r-in
                id="reg-title"
                className="text-2xl font-semibold tracking-tight text-ink"
              >
                Save your free place
              </h2>
              <p data-r-in className="text-sm text-ink/55">
                {e.seats ? `Only ${e.seats} places. ` : ""}It takes 20 seconds.
              </p>
              <label data-r-in className="block">
                <span className="text-sm font-semibold text-ink">
                  Full name
                </span>
                <input
                  className={`${input} mt-1.5`}
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(x) => setName(x.target.value)}
                  maxLength={80}
                />
              </label>
              <label data-r-in className="block">
                <span className="text-sm font-semibold text-ink">Email</span>
                <input
                  className={`${input} mt-1.5`}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(x) => setEmail(x.target.value)}
                  maxLength={120}
                />
              </label>
              <label data-r-in className="block">
                <span className="text-sm font-semibold text-ink">
                  Phone or WhatsApp
                </span>
                <input
                  className={`${input} mt-1.5`}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+880 1XXX XXXXXX"
                  value={phone}
                  onChange={(x) => setPhone(x.target.value)}
                  maxLength={30}
                />
              </label>
              {error && (
                <p role="alert" className="text-sm font-medium text-[#D93636]">
                  {error}
                </p>
              )}
              <button
                data-r-in
                type="submit"
                disabled={!valid || busy}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(244,122,42,0.9)] transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:bg-[#E2681A] disabled:cursor-not-allowed disabled:bg-[#E3E3E3] disabled:text-ink/35 disabled:shadow-none"
              >
                {busy ? (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                ) : (
                  "Register for free"
                )}
              </button>
              <p data-r-in className="text-center text-xs text-ink/45">
                We&apos;ll only contact you about this event and your study
                plans.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  e,
  onRegister,
}: {
  e: RootEvent;
  onRegister: () => void;
}) {
  const tint = KIND_TINT[e.kind];
  return (
    <article className="group relative grid overflow-hidden rounded-[26px] border border-[#2E1212]/8 bg-white transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_34px_70px_-34px_rgba(46,18,18,0.4)] sm:grid-cols-[7.5rem_1fr] lg:grid-cols-[7.5rem_1fr_16rem]">
      {/* Date block */}
      <div className="flex items-center gap-4 border-b border-[#2E1212]/8 p-5 sm:flex-col sm:justify-center sm:gap-0 sm:border-b-0 sm:border-r sm:p-0">
        <span
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: tint }}
        >
          {monthOf(e.start)}
        </span>
        <span
          className="text-[2.6rem] font-semibold leading-none tracking-tight sm:mt-1 sm:text-[3.2rem]"
          style={{ color: MAROON }}
        >
          {dayOf(e.start)}
        </span>
        <span className="text-xs text-[#2E1212]/50 sm:mt-1.5">
          {weekdayOf(e.start).slice(0, 3)}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className="rounded-full px-2.5 py-1 font-semibold uppercase tracking-[0.1em] text-white"
            style={{ background: tint }}
          >
            {e.kind}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2E1212]/5 px-2.5 py-1 font-medium text-[#2E1212]/70">
            {e.mode === "Online" ? (
              <Screen className="h-3.5 w-3.5" />
            ) : (
              <Pin className="h-3.5 w-3.5" />
            )}
            {e.mode}
          </span>
          {e.seats && (
            <span className="rounded-full bg-[#FFF1E6] px-2.5 py-1 font-semibold text-[#C95A14]">
              {e.seats} places
            </span>
          )}
        </div>
        <h3
          className="mt-3 text-[1.25rem] font-semibold leading-snug tracking-tight"
          style={{ color: MAROON }}
        >
          {e.title}
        </h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-[#2E1212]/60">
          {e.blurb}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#2E1212]/65">
          <span className="inline-flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {timeIn(e.start, "Europe/London")} London ·{" "}
            {timeIn(e.start, "Asia/Dhaka")} Dhaka
          </span>
          <span>{duration(e.minutes)}</span>
          <Flags codes={e.flags} />
        </div>
      </div>

      {/* Photo and action */}
      <div className="relative min-h-[9rem] overflow-hidden lg:min-h-0">
        <Image
          src={eventImage(e.img, 700)}
          alt=""
          fill
          sizes="(min-width:1024px) 16rem, 100vw"
          className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-[#140B09]/70 to-transparent"
        />
        <button
          type="button"
          onClick={onRegister}
          className="absolute bottom-4 left-4 right-4 inline-flex h-11 items-center justify-between rounded-full bg-white pl-5 pr-1.5 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-brand hover:text-white"
        >
          Register free
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#2E1212] text-white transition-transform duration-300 group-hover:-rotate-45">
            <Arrow className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </article>
  );
}

export default function Events() {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<RootEvent | null>(null);
  const next = UPCOMING[0];
  const later = UPCOMING.slice(1);
  const count = (f: Filter) => later.filter((e) => matches(e, f)).length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: the headline rises line by line, the tags pop on, then the next event card lifts in.
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-e-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.12 },
            0.2,
          )
          .fromTo(
            "[data-e-tag]",
            { scale: 0, rotation: (i: number) => (i ? 18 : -18) },
            {
              scale: 1,
              rotation: (i: number) => (i ? 4 : -4),
              duration: 0.9,
              stagger: 0.15,
              ease: "back.out(2.2)",
            },
            0.75,
          )
          .fromTo(
            "[data-e-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 },
            0.8,
          )
          .fromTo(
            "[data-e-next]",
            { y: 90, scale: 0.96, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 1.3 },
            1,
          )
          .fromTo(
            "[data-e-next-in] > *",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 },
            1.4,
          );

        // The tags bob gently, the clouds drift, the "Next up" dot pulses.
        gsap.utils.toArray<HTMLElement>("[data-e-tag]").forEach((el, i) => {
          gsap.to(el, {
            y: i ? 6 : -6,
            duration: 2.4 + i * 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.8,
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-e-cloud]").forEach((el, i) => {
          gsap.to(el, {
            xPercent: i % 2 ? -25 : 25,
            duration: 12 + i * 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
        gsap.to("[data-e-pulse]", {
          scale: 2.4,
          autoAlpha: 0,
          duration: 1.6,
          ease: "power1.out",
          repeat: -1,
        });

        gsap.utils.toArray<HTMLElement>("[data-e-head]").forEach((el) => {
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
        ScrollTrigger.batch("[data-e-card]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { x: -60, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                duration: 1.1,
                stagger: 0.1,
                ease: "expo.out",
                overwrite: true,
              },
            ),
        });
        ScrollTrigger.batch("[data-e-past]", {
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
        gsap.fromTo(
          "[data-e-cta]",
          { clipPath: "inset(18% 8% 18% 8% round 40px)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            autoAlpha: 1,
            duration: 1.3,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-e-cta]", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  // Filter changes: the pill slides, cards glide to their new places.
  useGSAP(
    () => {
      const t = tabs.current[filter];
      if (t && pill.current)
        gsap.to(pill.current, {
          x: t.offsetLeft,
          width: t.offsetWidth,
          duration: 0.6,
          ease: "expo.out",
        });
      const state = flipState.current;
      flipState.current = null;
      if (
        !state ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      Flip.from(state, {
        duration: 0.7,
        ease: "expo.out",
        absolute: true,
        stagger: 0.04,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" },
          ),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.3 }),
      });
    },
    { scope: root, dependencies: [filter] },
  );

  // Group the visible events by month.
  const months: string[] = [];
  later.forEach((e) => {
    const m = monthKey(e.start);
    if (!months.includes(m)) months.push(m);
  });

  return (
    <div ref={root}>
      {/* Hero: a warm peach sky in a rounded frame, the headline with its tags, then the next event */}
      <section className="px-3 pt-3">
        <div
          data-e-frame
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FFD7BA_0%,#FFE7D6_26%,#FFF5EC_55%,#FFFAF5_100%)] px-6 pb-16 pt-40 sm:pb-20 sm:pt-44"
        >
          {/* Warm glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-[30%] h-[26rem] w-[26rem] rounded-full bg-brand/15 blur-[110px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-[8%] h-[22rem] w-[22rem] rounded-full bg-[#FF9B5E]/20 blur-[100px]"
          />
          {/* A fine orange grid fading out from the centre */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              maskImage:
                "radial-gradient(60% 50% at 50% 30%, black, transparent 75%)",
            }}
          >
            <defs>
              <pattern
                id="e-grid"
                width="36"
                height="36"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M36 0H0V36"
                  fill="none"
                  stroke="#F47A2A"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#e-grid)" />
          </svg>
          {/* Soft clouds drifting along the top */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[45%]"
          >
            <div
              data-e-cloud
              className="absolute left-[6%] top-[22%] h-16 w-64 rounded-full bg-white/70 blur-2xl"
            />
            <div
              data-e-cloud
              className="absolute right-[8%] top-[12%] h-20 w-80 rounded-full bg-white/60 blur-2xl"
            />
            <div
              data-e-cloud
              className="absolute left-[42%] top-[4%] h-14 w-56 rounded-full bg-white/50 blur-2xl"
            />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="relative inline-block text-[clamp(2.5rem,6.2vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#2E1212]">
              {/* Orange tag with a cap, pinned to the first line */}
              <span
                data-e-tag
                aria-hidden
                className="absolute -left-[0.95em] top-[0.08em] hidden h-[0.82em] w-[1.05em] sm:block"
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
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-e-line className="block">
                  Study abroad events,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span data-e-line className="block">
                  for global aspirants
                </span>
              </span>
              {/* Maroon SCHOLARSHIPS tag, hanging off the second line */}
              <span
                data-e-tag
                aria-hidden
                className="absolute bottom-[-0.6rem] left-[calc(100%-2.2rem)] hidden h-[clamp(2.4rem,3.8vw,3.3rem)] items-center pl-4 pr-7 text-[clamp(0.85rem,1.25vw,1.05rem)] font-bold uppercase leading-none tracking-[0.04em] text-white sm:inline-flex"
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
                <span className="relative whitespace-nowrap">Scholarships</span>
              </span>
            </h1>
            <p
              data-e-sub
              className="mx-auto mt-6 max-w-md text-[1.08rem] leading-relaxed text-[#2E1212]/80"
            >
              Meet our experts and top-ranked university representatives to plan
              your study abroad journey.
            </p>
            <div
              data-e-sub
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#upcoming"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-[#2E1212] px-9 text-[1.02rem] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand"
              >
                Start My Journey
                <Arrow className="h-4 w-0 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Next event, with a live countdown */}
          <div
            data-e-next
            className="relative mx-auto mt-16 grid max-w-5xl sm:mt-20 overflow-hidden rounded-[28px] p-2 text-white shadow-[0_40px_90px_-40px_rgba(20,14,13,0.6)] md:grid-cols-[1fr_1.1fr]"
            style={{
              background: `radial-gradient(120% 120% at 100% 0%, #5B2410 0%, ${NIGHT} 60%)`,
            }}
          >
            <div className="relative min-h-[15rem] overflow-hidden rounded-[22px]">
              <Image
                src={eventImage(next.img, 1400)}
                alt=""
                fill
                sizes="(min-width:768px) 45vw, 100vw"
                preload
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-[#140B09]/80 to-transparent"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2E1212]">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    data-e-pulse
                    className="absolute inset-0 rounded-full bg-brand"
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                Next up
              </span>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <span
                  className="rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]"
                  style={{ background: KIND_TINT[next.kind] }}
                >
                  {next.kind} · {next.mode}
                </span>
                <Flags codes={next.flags} ring="ring-[#140B09]" />
              </div>
            </div>
            <div data-e-next-in className="p-5 sm:p-7">
              <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-tight tracking-tight">
                {next.title}
              </h2>
              <p className="mt-2 text-sm text-white/60">
                {fullDate(next.start)} · {timeIn(next.start, "Europe/London")}{" "}
                London · {timeIn(next.start, "Asia/Dhaka")} Dhaka
              </p>
              <div className="mt-5">
                <Countdown start={next.start} />
              </div>
              <button
                type="button"
                onClick={() => setOpen(next)}
                className="group mt-5 flex h-13 w-full items-center justify-between rounded-2xl bg-white pl-6 pr-2 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-brand hover:text-white"
              >
                Save my free place
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2E1212] text-white transition-transform duration-300 group-hover:-rotate-45">
                  <Arrow />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section id="upcoming" className="scroll-mt-24 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div
            data-e-head
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Coming up
              </p>
              <h2
                className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
                style={{ color: MAROON }}
              >
                Upcoming events
              </h2>
            </div>
            <div className="-mx-6 overflow-x-auto px-6 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
              <div
                role="tablist"
                aria-label="Filter events"
                className="relative inline-flex rounded-full border border-[#2E1212]/10 bg-white p-1 shadow-[0_10px_30px_-20px_rgba(46,18,18,0.4)]"
              >
                <span
                  ref={pill}
                  aria-hidden
                  className="absolute bottom-1 left-0 top-1 rounded-full bg-[#2E1212]"
                  style={{ width: 0 }}
                />
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    ref={(el) => {
                      tabs.current[f] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={filter === f}
                    onClick={() => {
                      if (f === filter) return;
                      if (list.current)
                        flipState.current = Flip.getState(
                          list.current.querySelectorAll(
                            "[data-e-card], [data-e-month]",
                          ),
                        );
                      setFilter(f);
                    }}
                    className={`relative z-10 inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${filter === f ? "text-white" : "text-[#2E1212]/65 hover:text-[#2E1212]"}`}
                  >
                    {f}
                    <span
                      className={`rounded-full px-1.5 text-xs ${filter === f ? "bg-white/20" : "bg-[#2E1212]/8"}`}
                    >
                      {count(f)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div ref={list} className="mt-12 space-y-12">
            {months.map((m) => {
              const inMonth = later.filter((e) => monthKey(e.start) === m);
              const visible = inMonth.some((e) => matches(e, filter));
              return (
                <div key={m} data-e-month className={visible ? "" : "hidden"}>
                  <div className="flex items-center gap-4">
                    <h3
                      className="text-lg font-semibold tracking-tight"
                      style={{ color: MAROON }}
                    >
                      {m}
                    </h3>
                    <span className="h-px flex-1 bg-[#2E1212]/10" />
                  </div>
                  <div className="mt-5 space-y-4">
                    {inMonth.map((e) => (
                      <div
                        key={e.slug}
                        data-e-card
                        className={matches(e, filter) ? "" : "hidden"}
                      >
                        <EventCard e={e} onRegister={() => setOpen(e)} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {count(filter) === 0 && (
              <div className="rounded-[26px] border border-dashed border-[#2E1212]/15 bg-[#FBF6EF] p-12 text-center">
                <p className="text-lg font-semibold" style={{ color: MAROON }}>
                  Nothing in this category right now.
                </p>
                <p className="mt-2 text-[#2E1212]/60">
                  New events are added every month. In the meantime, talk to a
                  counsellor one-to-one.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past sessions */}
      <section className="bg-[#FBF6EF] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div
            data-e-head
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Missed one?
              </p>
              <h2
                className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
                style={{ color: MAROON }}
              >
                Watch past sessions
              </h2>
            </div>
            <p className="max-w-sm text-[#2E1212]/60">
              Ask a counsellor for the recording of any past webinar, free.
            </p>
          </div>
          <div className="mt-12 grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
            {PAST.map((p) => (
              <Link
                key={p.title}
                href="/consultation"
                data-e-past
                className="group overflow-hidden rounded-[26px] bg-white p-2.5 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-34px_rgba(46,18,18,0.4)]"
              >
                <div className="relative aspect-video overflow-hidden rounded-[20px]">
                  <Image
                    src={eventImage(p.img, 800)}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 30vw, 92vw"
                    className="object-cover grayscale-[0.3] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[#140B09]/30 transition-colors duration-500 group-hover:bg-[#140B09]/10"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[#2E1212] shadow-lg backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-0.5 h-5 w-5"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M7 4.5v15l13-7.5Z" />
                      </svg>
                    </span>
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">
                    {p.minutes} min
                  </span>
                </div>
                <div className="px-3 pb-3 pt-4">
                  <p
                    className="text-xs font-medium"
                    style={{ color: KIND_TINT[p.kind] }}
                  >
                    {p.kind} · {fullDate(p.date)}
                  </p>
                  <h3
                    className="mt-1.5 text-[1.1rem] font-semibold leading-snug tracking-tight"
                    style={{ color: MAROON }}
                  >
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Host an event / call to action */}
      <section className="px-3 py-3">
        <div
          data-e-cta
          className="relative overflow-hidden rounded-[32px] bg-brand px-6 py-16 text-white sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[#2E1212]/25 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                Can&apos;t make a date?
              </h2>
              <p className="mt-3 max-w-md text-white/85">
                Book a free one-to-one session at a time that suits you, online
                or in our offices.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/consultation"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white pl-7 pr-2 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#2E1212] hover:text-white"
              >
                Book a free session
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2E1212] text-white transition-transform duration-300 group-hover:-rotate-45">
                  <Arrow />
                </span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-14 items-center rounded-full border border-white/50 px-7 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Read our guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {open && <Register e={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
