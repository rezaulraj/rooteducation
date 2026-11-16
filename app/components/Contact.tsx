"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpinningGlobe from "./SpinningGlobe";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAROON = "#2E1212";

/**
 * YOUR CONTACT DETAILS: fill these in. Each card on the page only appears once its value is set,
 * so nothing made-up is ever shown to visitors.
 * - phone: in international format, e.g. "+44 20 0000 0000"
 * - whatsapp: digits only with country code, e.g. "8801700000000"
 */
const CONTACT = {
  email: "",
  phone: "",
  whatsapp: "",
};

const OFFICES = [
  {
    city: "London",
    country: "United Kingdom",
    flag: "gb",
    address: "7 Kirkdale House, London, E11 1HP",
    timeZone: "Europe/London",
    img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&q=80&auto=format&fit=crop",
  },
  {
    city: "Dhaka",
    country: "Bangladesh",
    flag: "bd",
    address: "Road 15, Sector 12, Uttara, Dhaka 1230, Bangladesh",
    timeZone: "Asia/Dhaka",
    img: "https://images.unsplash.com/photo-1630987871777-f7b2d62894d0?w=1200&q=80&auto=format&fit=crop",
  },
];

const TOPICS = [
  "Study abroad",
  "Consultation",
  "Test prep",
  "Events",
  "Partnership",
  "Something else",
];

const QUICK = [
  {
    title: "Book a free consultation",
    text: "Pick a time for a 1:1 call with a counsellor.",
    href: "/consultation",
    icon: "M3.5 5h17v15h-17zM3.5 10h17M8 3v4M16 3v4",
  },
  {
    title: "Read our guides",
    text: "Answers on countries, visas and scholarships.",
    href: "/blog",
    icon: "M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z",
  },
  {
    title: "Join a free event",
    text: "Webinars, fairs and workshops every month.",
    href: "/events",
    icon: "M4 5h16v11H4zM2 19h20",
  },
];

// The clock, read only in the browser so server and browser render the same HTML.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 15000);
  return () => clearInterval(t);
};
const nowMinute = () => Math.floor(Date.now() / 60000);

function LocalTime({ timeZone }: { timeZone: string }) {
  const m = useSyncExternalStore(subscribe, nowMinute, () => null);
  if (m === null) return <span className="invisible">00:00</span>;
  return (
    <>
      {new Date(m * 60000).toLocaleTimeString("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      })}
    </>
  );
}

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

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  const nameOk = name.trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const messageOk = message.trim().length >= 5;

  const channels = [
    CONTACT.email && {
      label: "Email us",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: "M3 6h18v12H3zM3 7l9 6 9-6",
    },
    CONTACT.phone && {
      label: "Call us",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
      icon: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
    },
    CONTACT.whatsapp && {
      label: "WhatsApp",
      value: "Chat with an advisor",
      href: `https://wa.me/${CONTACT.whatsapp}`,
      icon: "M4 20l1.4-4A8 8 0 1 1 8 18.6zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z",
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    icon: string;
  }[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: the frame opens, the headline rises, then a short conversation types itself out.
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-c-frame]",
            { clipPath: "inset(6% 4% 6% 4% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-c-eyebrow]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.5,
          )
          .fromTo(
            "[data-c-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.55,
          )
          .fromTo(
            "[data-c-sub]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
            0.85,
          )
          .fromTo(
            "[data-c-globe]",
            { y: 120, scale: 0.82, rotate: -10, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              rotate: 0,
              autoAlpha: 1,
              duration: 2,
              ease: "expo.out",
            },
            0.35,
          )
          .fromTo(
            "[data-c-chat]",
            { y: 60, autoAlpha: 0, rotate: 3 },
            { y: 0, autoAlpha: 1, rotate: 0, duration: 1.2 },
            0.9,
          )
          .fromTo(
            "[data-c-orbit]",
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(2)",
            },
            1.3,
          );
        gsap.utils.toArray<HTMLElement>("[data-c-orbit]").forEach((el, i) => {
          gsap.to(el, {
            y: i ? 10 : -10,
            x: i ? -6 : 6,
            duration: 3 + i,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2.2,
          });
        });

        // Each bubble: a typing indicator first, then the message pops in.
        const chat = gsap.timeline({ delay: 1.4 });
        gsap.utils.toArray<HTMLElement>("[data-c-bubble]").forEach((b) => {
          const typing = b.previousElementSibling as HTMLElement | null;
          if (typing?.dataset.cTyping !== undefined) {
            chat
              .fromTo(
                typing,
                { autoAlpha: 0, scale: 0.6 },
                { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
              )
              .to(typing, { autoAlpha: 0, scale: 0.6, duration: 0.2 }, "+=0.7")
              // Collapse it so the reply takes its place.
              .set(typing, { display: "none" });
          }
          chat.fromTo(
            b,
            {
              autoAlpha: 0,
              y: 14,
              scale: 0.92,
              transformOrigin:
                b.dataset.side === "me" ? "100% 100%" : "0% 100%",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.8)",
            },
            "+=0.15",
          );
        });
        gsap.to("[data-c-dot]", {
          y: -3,
          duration: 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.12,
        });
        gsap.to("[data-c-orb]", {
          scale: 1.15,
          xPercent: 8,
          yPercent: -6,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 1.5,
        });

        gsap.utils.toArray<HTMLElement>("[data-c-head]").forEach((el) => {
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
          "[data-c-form]",
          { y: 70, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-c-form]", start: "top 85%" },
          },
        );
        gsap.fromTo(
          "[data-c-field]",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-c-form]", start: "top 75%" },
          },
        );
        ScrollTrigger.batch("[data-c-side]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { x: 50, autoAlpha: 0 },
              {
                x: 0,
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

  // The thank-you card pops in after sending.
  useGSAP(
    () => {
      if (
        !sent ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          "[data-c-done]",
          { scale: 0.92, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.8 },
        )
        .fromTo(
          "[data-c-tick]",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
          0.3,
        )
        .fromTo(
          "[data-c-done] > *:not(:first-child)",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
          0.4,
        );
    },
    { scope: root, dependencies: [sent] },
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!nameOk || !emailOk || !messageOk || busy) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error();
      setSent(j.reference);
    } catch {
      setError("We couldn't send your message. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const input =
    "w-full rounded-2xl border border-[#2E1212]/10 bg-[#FBF6EF] px-4 text-[0.95rem] text-[#2E1212] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#2E1212]/35 focus:border-brand focus:bg-white focus:shadow-[0_0_0_4px_rgba(244,122,42,0.14)]";
  const err = "mt-1.5 block text-xs font-medium text-[#D93636]";

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="px-3 pt-3">
        <div
          data-c-frame
          className="relative isolate overflow-hidden rounded-[28px] bg-[radial-gradient(120%_110%_at_88%_62%,#EE6A1C_0%,#F68A45_24%,#FBB98A_44%,#FFE4D0_64%,#FFF6EE_84%)] px-6 pb-[26rem] pt-32 sm:px-10 lg:min-h-[44rem] lg:pb-24 lg:pt-36"
        >
          <div
            data-c-orb
            aria-hidden
            className="absolute -left-24 -top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-white/70 blur-[90px]"
          />
          {/* The globe, with our two offices orbiting it */}
          <div
            data-c-globe
            aria-hidden
            className="pointer-events-none absolute bottom-[-12rem] left-[calc(50%-19rem)] -z-10 h-[38rem] w-[38rem] lg:bottom-auto lg:left-auto lg:right-[-13%] lg:top-[-3%] lg:h-[112%] lg:w-[68%]"
          >
            <SpinningGlobe cx={0.5} cy={0.5} r={0.36} />
          </div>
          {OFFICES.map((o, i) => (
            <span
              key={o.city}
              data-c-orbit
              aria-hidden
              className={`absolute z-10 hidden items-center gap-2.5 rounded-full border border-white/40 bg-white/85 py-1.5 pl-1.5 pr-4 text-sm shadow-[0_18px_40px_-16px_rgba(46,18,18,0.55)] backdrop-blur lg:inline-flex ${i ? "bottom-[10%] right-[5%]" : "right-[24%] top-[16%]"}`}
            >
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image
                  src={`/flags/${o.flag}.svg`}
                  alt=""
                  fill
                  sizes="28px"
                  className="object-cover"
                  unoptimized
                />
              </span>
              <span className="font-semibold" style={{ color: MAROON }}>
                {o.city}
              </span>
              <span className="tabular-nums text-[#2E1212]/55">
                <LocalTime timeZone={o.timeZone} />
              </span>
            </span>
          ))}

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p
                data-c-eyebrow
                className="inline-flex items-center gap-2 rounded-full border border-[#2E1212]/10 bg-white/70 px-4 py-1.5 text-sm font-semibold text-[#2E1212] backdrop-blur"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
                </span>
                Contact us
              </p>
              <h1
                className="mt-6 text-[clamp(2.8rem,6.6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.045em]"
                style={{ color: MAROON }}
              >
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-c-line className="block">
                    Let&apos;s talk about
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.12em]">
                  <span data-c-line className="block">
                    your <span className="text-brand">future.</span>
                  </span>
                </span>
              </h1>
              <p
                data-c-sub
                className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#2E1212]/65"
              >
                Questions about a country, a course or your application? Send us
                a message, book a call, or visit us in London or Dhaka.
              </p>
              <div data-c-sub className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#message"
                  className="group inline-flex h-13 items-center gap-3 rounded-full bg-[#2E1212] pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand"
                >
                  Send a message
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand transition-all duration-300 group-hover:rotate-90 group-hover:bg-white group-hover:text-brand">
                    <Arrow />
                  </span>
                </a>
                <Link
                  href="/consultation"
                  className="inline-flex h-13 items-center rounded-full border border-[#2E1212]/15 bg-white/60 px-7 text-sm font-semibold text-[#2E1212] backdrop-blur transition-colors hover:bg-white"
                >
                  Book a free call
                </Link>
              </div>
            </div>

            {/* A short conversation */}
            <div
              data-c-chat
              aria-hidden
              className="relative mx-auto w-full max-w-md rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_50px_100px_-40px_rgba(46,18,18,0.65)] backdrop-blur-md sm:p-6 lg:mx-0 lg:mt-24 lg:max-w-[23rem] lg:justify-self-start"
            >
              <div className="flex items-center gap-3 border-b border-[#2E1212]/8 pb-4">
                <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#2E1212] text-sm font-bold text-white">
                  RE
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22C55E]" />
                </span>
                <span>
                  <span
                    className="block text-sm font-semibold"
                    style={{ color: MAROON }}
                  >
                    Root Education
                  </span>
                  <span className="block text-xs text-[#2E1212]/50">
                    Counselling team
                  </span>
                </span>
              </div>
              <div className="mt-5 flex min-h-[17rem] flex-col gap-3">
                <p
                  data-c-bubble
                  data-side="me"
                  className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm text-white"
                >
                  Hi! I want to study a master&apos;s in Europe next September.
                  Where do I start?
                </p>
                <span
                  data-c-typing
                  className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#FBF0E6] px-4 py-3.5 motion-reduce:hidden"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      data-c-dot
                      className="h-1.5 w-1.5 rounded-full bg-[#2E1212]/40"
                    />
                  ))}
                </span>
                <p
                  data-c-bubble
                  className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#FBF0E6] px-4 py-2.5 text-sm text-[#2E1212]"
                >
                  Great timing! Tell us your grades and budget, and we&apos;ll
                  shortlist universities and scholarships for you.
                </p>
                <p
                  data-c-bubble
                  data-side="me"
                  className="max-w-[60%] self-end rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm text-white"
                >
                  Perfect, let&apos;s do it 🎓
                </p>
                <span
                  data-c-typing
                  className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#FBF0E6] px-4 py-3.5 motion-reduce:hidden"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      data-c-dot
                      className="h-1.5 w-1.5 rounded-full bg-[#2E1212]/40"
                    />
                  ))}
                </span>
                <p
                  data-c-bubble
                  className="flex max-w-[85%] items-center gap-2 rounded-2xl rounded-bl-md bg-[#2E1212] px-4 py-2.5 text-sm text-white"
                >
                  <Icon
                    d="M3.5 5h17v15h-17zM3.5 10h17M8 3v4M16 3v4"
                    className="h-4 w-4 text-brand"
                  />
                  Free consultation booked ✓
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to reach us */}
      {channels.length > 0 && (
        <section className="px-6 pt-16">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                data-c-side
                className="group flex items-center gap-4 rounded-[22px] border border-[#2E1212]/8 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(46,18,18,0.35)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon d={c.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#2E1212]/45">
                    {c.label}
                  </span>
                  <span
                    className="block truncate font-semibold"
                    style={{ color: MAROON }}
                  >
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Message form + quick links */}
      <section id="message" className="scroll-mt-24 px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div
            data-c-form
            className="relative overflow-hidden rounded-[30px] border border-[#2E1212]/8 bg-white p-6 shadow-[0_40px_90px_-50px_rgba(46,18,18,0.45)] sm:p-10"
          >
            {sent ? (
              <div
                data-c-done
                className="flex min-h-[28rem] flex-col items-center justify-center text-center"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-[#22C55E]/12">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-10 w-10"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path
                      data-c-tick
                      d="M5 12.5 10 17l9-10"
                      pathLength={1}
                      strokeDasharray="1"
                    />
                  </svg>
                </span>
                <h2
                  className="mt-6 text-3xl font-semibold tracking-tight"
                  style={{ color: MAROON }}
                >
                  Thank you, {name.trim().split(" ")[0]}!
                </h2>
                <p className="mt-3 max-w-sm leading-relaxed text-[#2E1212]/60">
                  Your message is with our team (reference{" "}
                  <b className="text-[#2E1212]">{sent}</b>). An advisor will
                  reply to {email.trim()}.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/consultation"
                    className="inline-flex h-12 items-center rounded-full bg-[#2E1212] px-6 text-sm font-semibold text-white transition-colors hover:bg-brand"
                  >
                    Book a free call
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSent("");
                      setMessage("");
                      setTouched(false);
                    }}
                    className="inline-flex h-12 items-center rounded-full border border-[#2E1212]/15 px-6 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#FBF6EF]"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div data-c-field>
                  <h2
                    className="text-[clamp(1.8rem,3.2vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]"
                    style={{ color: MAROON }}
                  >
                    Send us a message
                  </h2>
                  <p className="mt-2 text-[#2E1212]/55">
                    We read every message and reply personally.
                  </p>
                </div>

                <fieldset data-c-field className="mt-8">
                  <legend
                    className="text-sm font-semibold"
                    style={{ color: MAROON }}
                  >
                    What&apos;s it about?
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={topic === t}
                        onClick={() => setTopic(t)}
                        className={`h-10 rounded-full px-4 text-sm font-semibold transition-all duration-300 active:scale-95 ${topic === t ? "bg-[#2E1212] text-white shadow-[0_10px_24px_-12px_rgba(46,18,18,0.6)]" : "bg-[#FBF6EF] text-[#2E1212]/70 hover:bg-[#F5EBDF] hover:text-[#2E1212]"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label data-c-field className="block">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: MAROON }}
                    >
                      Your name
                    </span>
                    <input
                      className={`${input} mt-2 h-13`}
                      autoComplete="name"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={80}
                      aria-invalid={touched && !nameOk}
                    />
                    {touched && !nameOk && (
                      <span className={err}>Please enter your name.</span>
                    )}
                  </label>
                  <label data-c-field className="block">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: MAROON }}
                    >
                      Email
                    </span>
                    <input
                      className={`${input} mt-2 h-13`}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={120}
                      aria-invalid={touched && !emailOk}
                    />
                    {touched && !emailOk && (
                      <span className={err}>Please enter a valid email.</span>
                    )}
                  </label>
                  <label data-c-field className="block sm:col-span-2">
                    <span
                      className="flex justify-between text-sm font-semibold"
                      style={{ color: MAROON }}
                    >
                      Phone or WhatsApp
                      <span className="font-normal text-[#2E1212]/40">
                        Optional
                      </span>
                    </span>
                    <input
                      className={`${input} mt-2 h-13`}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+880 1XXX XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={30}
                    />
                  </label>
                  <label data-c-field className="block sm:col-span-2">
                    <span
                      className="flex justify-between text-sm font-semibold"
                      style={{ color: MAROON }}
                    >
                      Your message
                      <span className="font-normal text-[#2E1212]/40">
                        {message.length}/2000
                      </span>
                    </span>
                    <textarea
                      className={`${input} mt-2 min-h-36 resize-y py-3.5 leading-relaxed`}
                      placeholder="Tell us where and what you'd like to study, or ask us anything."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={2000}
                      aria-invalid={touched && !messageOk}
                    />
                    {touched && !messageOk && (
                      <span className={err}>Please write a short message.</span>
                    )}
                  </label>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-5 text-sm font-medium text-[#D93636]"
                  >
                    {error}
                  </p>
                )}
                <div
                  data-c-field
                  className="mt-7 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center"
                >
                  <p className="max-w-xs text-xs leading-relaxed text-[#2E1212]/45">
                    We&apos;ll only use your details to reply to you about your
                    studies.
                  </p>
                  <button
                    type="submit"
                    disabled={busy}
                    className="group inline-flex h-14 items-center gap-3 rounded-full bg-brand pl-7 pr-2 text-sm font-semibold text-white shadow-[0_18px_36px_-16px_rgba(244,122,42,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2E1212] disabled:opacity-70"
                  >
                    {busy ? "Sending…" : "Send message"}
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:-rotate-45">
                      {busy ? (
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
                          aria-hidden
                        />
                      ) : (
                        <Arrow />
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick links */}
          <aside className="flex flex-col gap-4">
            <div
              data-c-side
              className="relative overflow-hidden rounded-[26px] bg-[#2E1212] p-7 text-white"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/40 blur-3xl"
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Prefer to talk?
              </p>
              <p className="relative mt-3 text-2xl font-semibold leading-snug tracking-tight">
                A free 30-minute call with a counsellor.
              </p>
              <Link
                href="/consultation"
                className="group relative mt-6 inline-flex h-12 items-center gap-3 rounded-full bg-brand pl-6 pr-1.5 text-sm font-semibold transition-colors hover:bg-white hover:text-[#2E1212]"
              >
                Choose a time
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:-rotate-45">
                  <Arrow className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
            {QUICK.slice(1).map((q) => (
              <Link
                key={q.title}
                href={q.href}
                data-c-side
                className="group flex items-center gap-4 rounded-[22px] border border-[#2E1212]/8 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(46,18,18,0.35)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#FBF6EF] text-brand transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                  <Icon d={q.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block font-semibold"
                    style={{ color: MAROON }}
                  >
                    {q.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-[#2E1212]/55">
                    {q.text}
                  </span>
                </span>
                <Arrow className="h-4 w-4 shrink-0 text-[#2E1212]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("signup:open"))}
              data-c-side
              className="group flex items-center gap-4 rounded-[22px] border border-dashed border-brand/40 bg-brand/[0.05] p-5 text-left transition-colors hover:bg-brand/10"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                <Icon d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold" style={{ color: MAROON }}>
                  Agencies &amp; partners
                </span>
                <span className="mt-0.5 block text-sm text-[#2E1212]/55">
                  Apply to become a recruitment partner.
                </span>
              </span>
              <Arrow className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </aside>
        </div>
      </section>

      <OfficeMap />
    </div>
  );
}

/**
 * "Find us": a live Google Map of each office, tinted in Root's warm colours.
 * Switching city reveals the other map with a circular wipe; a floating card holds the details.
 */
function OfficeMap() {
  const root = useRef<HTMLElement>(null);
  const [sel, setSel] = useState(0);
  const o = OFFICES[sel];

  // Arrival: the map frame opens up and the card slides in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: "[data-m-frame]", start: "top 80%" },
          })
          .fromTo(
            "[data-m-frame]",
            { clipPath: "inset(12% 10% 12% 10% round 48px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 32px)",
              duration: 1.5,
              ease: "expo.inOut",
            },
          )
          .fromTo(
            "[data-m-card]",
            { x: -60, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1.1 },
            0.9,
          )
          .fromTo(
            "[data-m-switch]",
            { y: -30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9 },
            1,
          )
          .fromTo(
            "[data-m-compass]",
            { rotate: -180, scale: 0 },
            { rotate: 0, scale: 1, duration: 1.2, ease: "back.out(1.6)" },
            1.1,
          );
        gsap.to("[data-m-needle]", {
          rotate: 12,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });
    },
    { scope: root },
  );

  // Switching city: the new map opens as a growing circle; the card's details rise in.
  useGSAP(
    () => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-m-layer]");
      layers.forEach((l, i) => gsap.set(l, { zIndex: i === sel ? 2 : 1 }));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        layers.forEach((l, i) =>
          gsap.set(l, {
            clipPath:
              i === sel ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          }),
        );
        return;
      }
      gsap.fromTo(
        layers[sel],
        { clipPath: "circle(0% at 50% 45%)" },
        {
          clipPath: "circle(150% at 50% 45%)",
          duration: 1.3,
          ease: "power3.inOut",
        },
      );
      gsap.fromTo(
        "[data-m-detail]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.25,
        },
      );
      gsap.fromTo(
        "[data-m-photo]",
        { scale: 1.25 },
        { scale: 1, duration: 1.2, ease: "expo.out" },
      );
    },
    { scope: root, dependencies: [sel] },
  );

  return (
    <section ref={root} className="bg-[#FBF6EF] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div
          data-c-head
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Find us
            </p>
            <h2
              className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ color: MAROON }}
            >
              Two offices, one team
            </h2>
          </div>
          <p className="max-w-sm text-[#2E1212]/60">
            Meet an advisor in person. Book a time first so the right counsellor
            is there for you.
          </p>
        </div>

        <div
          data-m-frame
          className="relative mt-12 h-[36rem] overflow-hidden rounded-[32px] bg-[#EFE3D6] shadow-[0_50px_100px_-50px_rgba(46,18,18,0.55)] sm:h-[40rem]"
        >
          {/* One live map per office, stacked; the selected one is revealed on top. */}
          {OFFICES.map((x, i) => (
            <div
              key={x.city}
              data-m-layer
              className="absolute inset-0"
              style={{
                clipPath:
                  i === 0 ? "circle(150% at 50% 45%)" : "circle(0% at 50% 45%)",
              }}
            >
              <iframe
                title={`Map of our ${x.city} office`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(x.address)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 [filter:grayscale(0.35)_sepia(0.3)_saturate(1.25)_contrast(1.03)]"
              />
            </div>
          ))}
          {/* Warm wash and soft vignette over the map, letting clicks through */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3] bg-[#F47A2A]/[0.06] mix-blend-multiply"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3] shadow-[inset_0_0_120px_rgba(46,18,18,0.28)]"
          />

          {/* City switch */}
          <div
            data-m-switch
            className="absolute left-1/2 top-5 z-10 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0"
          >
            <div
              role="tablist"
              aria-label="Choose an office"
              className="flex rounded-full bg-white/90 p-1 shadow-[0_18px_40px_-18px_rgba(46,18,18,0.5)] backdrop-blur"
            >
              {OFFICES.map((x, i) => (
                <button
                  key={x.city}
                  type="button"
                  role="tab"
                  aria-selected={sel === i}
                  onClick={() => setSel(i)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full pl-1.5 pr-4 text-sm font-semibold transition-all duration-500 ${sel === i ? "bg-[#2E1212] text-white" : "text-[#2E1212]/70 hover:text-[#2E1212]"}`}
                >
                  <span className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white/60">
                    <Image
                      src={`/flags/${x.flag}.svg`}
                      alt=""
                      fill
                      sizes="28px"
                      className="object-cover"
                      unoptimized
                    />
                  </span>
                  {x.city}
                </button>
              ))}
            </div>
          </div>

          {/* Compass */}
          <div
            data-m-compass
            aria-hidden
            className="absolute bottom-5 right-5 z-10 hidden h-16 w-16 place-items-center rounded-full bg-white/90 shadow-[0_18px_40px_-18px_rgba(46,18,18,0.5)] backdrop-blur sm:grid"
          >
            <svg viewBox="0 0 48 48" className="h-11 w-11">
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="#2E1212"
                strokeOpacity="0.12"
              />
              <text
                x="24"
                y="9"
                textAnchor="middle"
                fontSize="7"
                fontWeight="700"
                fill="#2E1212"
              >
                N
              </text>
              <g data-m-needle>
                <path d="M24 11 28 24H20Z" fill="#F47A2A" />
                <path d="M24 37 20 24H28Z" fill="#2E1212" opacity="0.7" />
              </g>
            </svg>
          </div>

          {/* Office card */}
          <div
            data-m-card
            className="absolute inset-x-4 bottom-4 z-10 overflow-hidden rounded-[26px] bg-white/95 shadow-[0_40px_80px_-30px_rgba(46,18,18,0.55)] backdrop-blur sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[23rem]"
          >
            <div className="relative h-32 overflow-hidden sm:h-36">
              <div data-m-photo className="absolute inset-0">
                <Image
                  src={o.img}
                  alt={o.city}
                  fill
                  sizes="23rem"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-[#140B09]/70 to-transparent"
              />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                <LocalTime timeZone={o.timeZone} /> local
              </span>
              <p
                data-m-detail
                className="absolute bottom-3 left-4 text-2xl font-semibold tracking-tight text-white"
              >
                {o.city}
                <span className="ml-2 text-sm font-medium text-white/70">
                  {o.country}
                </span>
              </p>
            </div>
            <div className="p-5">
              <p
                data-m-detail
                className="flex gap-2.5 text-[0.95rem] leading-relaxed text-[#2E1212]/75"
              >
                <Icon
                  d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12ZM12 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                />
                {o.address}
              </p>
              <div data-m-detail className="mt-4 flex gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#2E1212] text-sm font-semibold text-white transition-colors hover:bg-brand"
                >
                  Get directions
                  <Arrow className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  href="/consultation"
                  className="inline-flex h-11 items-center rounded-full border border-[#2E1212]/15 px-5 text-sm font-semibold text-[#2E1212] transition-colors hover:bg-[#FBF6EF]"
                >
                  Book a visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
