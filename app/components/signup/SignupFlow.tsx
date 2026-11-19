"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Close, DIAL, Flag, PrimaryButton, type Dial } from "./ui";
import StudentJourney from "./StudentJourney";
import PartnerJourney from "./PartnerJourney";

gsap.registerPlugin(useGSAP);

type Phase = "phone" | "otp" | "choose" | "student" | "partner";
const RESEND = 30;

function Consent() {
  return (
    <p className="text-center text-xs leading-relaxed text-ink/45">
      By submitting this form, you consent to our{" "}
      <Link
        href="/terms"
        className="underline underline-offset-2 hover:text-ink"
      >
        Terms of service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="underline underline-offset-2 hover:text-ink"
      >
        Privacy policy
      </Link>{" "}
      and to be contacted by us via Call/Email/WhatsApp/SMS
    </p>
  );
}

function Mark({ className = "w-32" }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Root Education"
      width={128}
      height={50}
      className={`h-auto ${className}`}
    />
  );
}

async function post(body: object) {
  try {
    const r = await fetch("/api/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await r.json()) as {
      ok: boolean;
      error?: string;
      devCode?: string;
      token?: string;
      retryIn?: number;
    };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Please check your connection.",
    };
  }
}

export default function SignupFlow({ onClose }: { onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const [phase, setPhase] = useState<Phase>("phone");
  const [dial, setDial] = useState<Dial>(DIAL[0]);
  const [dialOpen, setDialOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  // Signed proof from the server that a code was sent; sent back when verifying.
  const [token, setToken] = useState("");
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(0);

  const national = number.replace(/^0+/, "");
  const valid = national.length >= 7 && national.length <= 12;
  const full = `${dial.dial}${national}`;
  const pretty = `${dial.dial} ${national}`;
  const left = Math.max(0, Math.ceil((resendAt - now) / 1000));

  // Keep the page still underneath, and close on Escape.
  useEffect(() => {
    window.dispatchEvent(new Event("scroll:lock"));
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.dispatchEvent(new Event("scroll:unlock"));
      document.documentElement.style.overflow = "";
    };
  }, []);

  // The resend countdown.
  useEffect(() => {
    if (phase !== "otp") return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [phase]);

  const close = () => {
    if (
      !root.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return onClose();
    gsap
      .timeline({ onComplete: onClose })
      .to(card.current, {
        y: 30,
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power3.in",
      })
      .to("[data-m-veil]", { autoAlpha: 0, duration: 0.3 }, 0.1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" &&
        (phase === "phone" || phase === "otp" || phase === "choose")
      )
        close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Opening: the veil fades in and the card springs up.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          "[data-m-veil]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
        )
        .fromTo(
          card.current,
          { y: 60, scale: 0.9, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.9 },
          0.05,
        );
    },
    { scope: root },
  );

  // Each step of the popup: its pieces rise in one after another; focus the first field.
  useGSAP(
    () => {
      if (phase === "phone") phoneInput.current?.focus();
      if (phase === "otp") boxes.current[0]?.focus();
      if (phase === "student" || phase === "partner") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-m-in]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.12,
        },
      );
      if (phase === "choose")
        gsap.fromTo(
          "[data-m-art]",
          { y: 30, rotation: -10, scale: 0.7 },
          {
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "back.out(1.8)",
            delay: 0.3,
          },
        );
    },
    { scope: root, dependencies: [phase] },
  );

  const shake = () =>
    gsap.fromTo(
      "[data-m-otp]",
      { x: -10 },
      { x: 0, duration: 0.5, ease: "elastic.out(1.2, 0.3)" },
    );

  const sendCode = async () => {
    setBusy(true);
    setError("");
    const r = await post({ action: "send", phone: full });
    setBusy(false);
    if (!r.ok) {
      setError(r.error ?? "Something went wrong. Please try again.");
      if (r.retryIn) {
        setResendAt(Date.now() + r.retryIn * 1000);
        setNow(Date.now());
      }
      return false;
    }
    setDevCode(r.devCode ?? "");
    setToken(r.token ?? "");
    setResendAt(Date.now() + RESEND * 1000);
    setNow(Date.now());
    return true;
  };

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || busy) return;
    if (await sendCode()) {
      setDigits(Array(6).fill(""));
      setPhase("otp");
    }
  };

  const verify = async (code: string) => {
    setBusy(true);
    setError("");
    const r = await post({ action: "verify", phone: full, code, token });
    setBusy(false);
    if (r.ok) {
      // A small celebration before moving on.
      gsap.to("[data-m-otp] input", {
        borderColor: "#22C55E",
        backgroundColor: "#ECFDF3",
        duration: 0.25,
        stagger: 0.04,
      });
      setTimeout(() => setPhase("choose"), 550);
      return;
    }
    setError(r.error ?? "That code isn't right. Please try again.");
    shake();
    setDigits(Array(6).fill(""));
    boxes.current[0]?.focus();
  };

  const fill = (start: number, text: string) => {
    const chars = text.replace(/\D/g, "").split("");
    if (!chars.length) return;
    const next = [...digits];
    let i = start;
    for (const c of chars) {
      if (i > 5) break;
      next[i++] = c;
    }
    setDigits(next);
    setError("");
    boxes.current[Math.min(i, 5)]?.focus();
    if (next.every(Boolean)) verify(next.join(""));
  };

  const onBoxKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
      boxes.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) boxes.current[i + 1]?.focus();
  };

  if (phase === "student")
    return <StudentJourney phone={pretty} onClose={onClose} />;
  if (phase === "partner")
    return <PartnerJourney phone={pretty} onClose={onClose} />;

  const wide = phase === "choose";

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
    >
      <div
        data-m-veil
        aria-hidden
        onClick={close}
        className="absolute inset-0 bg-[#1B1838]/45 backdrop-blur-[6px]"
      />

      <div
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        className={`relative w-full overflow-hidden rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(20,16,60,0.55)] transition-[max-width] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${wide ? "max-w-[52rem]" : "max-w-[25rem]"}`}
      >
        <div className="absolute right-3 top-3 z-10">
          <Close onClick={close} />
        </div>

        {phase === "phone" && (
          <form onSubmit={submitPhone} className="px-7 pb-7 pt-9 sm:px-9">
            <div data-m-in className="flex justify-center">
              <Mark />
            </div>
            <h2
              data-m-in
              id="signup-title"
              className="mt-5 text-center text-[1.75rem] font-bold tracking-tight text-ink"
            >
              Sign up
            </h2>
            <p data-m-in className="mt-1 text-center text-sm text-ink/55">
              Enter your mobile number to get started
            </p>

            <div data-m-in className="relative mt-7">
              <div className="flex h-13 items-center rounded-xl border border-ink/15 bg-white transition-[border-color,box-shadow] focus-within:border-[#5A4FF0] focus-within:shadow-[0_0_0_4px_rgba(90,79,240,0.12)]">
                <button
                  type="button"
                  onClick={() => setDialOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={dialOpen}
                  aria-label={`Country code ${dial.name} ${dial.dial}`}
                  className="flex h-full items-center gap-2 rounded-l-xl pl-3.5 pr-3 text-sm font-medium text-ink"
                >
                  <Flag code={dial.code} />
                  {dial.dial}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 text-ink/50 transition-transform ${dialOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M3 4.5 6 7.5l3-3" />
                  </svg>
                </button>
                <span className="h-6 w-px bg-ink/12" aria-hidden />
                <input
                  ref={phoneInput}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Mobile Number"
                  aria-label="Mobile number"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value.replace(/\D/g, "").slice(0, 13));
                    setError("");
                  }}
                  className="h-full min-w-0 flex-1 rounded-r-xl bg-transparent px-3.5 text-[0.95rem] text-ink outline-none placeholder:text-ink/35"
                />
              </div>

              {dialOpen && (
                <ul
                  role="listbox"
                  aria-label="Country code"
                  className="absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-64 overflow-y-auto rounded-xl border border-ink/10 bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(14,14,40,0.4)]"
                  data-lenis-prevent
                >
                  {DIAL.map((d) => (
                    <li key={d.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={d.code === dial.code}
                        onClick={() => {
                          setDial(d);
                          setDialOpen(false);
                          phoneInput.current?.focus();
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${d.code === dial.code ? "bg-[#EEEDFF] text-ink" : "text-ink/80 hover:bg-ink/5"}`}
                      >
                        <Flag code={d.code} />
                        <span className="flex-1">{d.name}</span>
                        <span className="text-ink/50">{d.dial}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && (
              <p
                role="alert"
                className="mt-2 text-xs font-medium text-[#D93636]"
              >
                {error}
              </p>
            )}

            <div data-m-in className="mt-4">
              <PrimaryButton type="submit" disabled={!valid} busy={busy}>
                Continue
              </PrimaryButton>
            </div>
            <div data-m-in className="mt-8">
              <Consent />
            </div>
          </form>
        )}

        {phase === "otp" && (
          <div className="px-7 pb-7 pt-9 sm:px-9">
            <div data-m-in>
              <Mark className="w-24" />
            </div>
            <h2
              data-m-in
              id="signup-title"
              className="mt-5 text-center text-[1.75rem] font-bold tracking-tight text-ink"
            >
              Verify your number
            </h2>
            <p
              data-m-in
              className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-center text-sm text-ink/70"
            >
              <span>
                OTP sent to <b className="font-semibold text-ink">{pretty}</b>
              </span>
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setPhase("phone");
                }}
                className="inline-flex items-center gap-1 font-medium text-[#5A4FF0] hover:underline"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M11 2.5 13.5 5 6 12.5H3.5V10z" />
                </svg>
                Edit
              </button>
            </p>

            <div data-m-in>
              <div
                data-m-otp
                className="mt-7 flex justify-center gap-2 sm:gap-2.5"
                onPaste={(e) => {
                  e.preventDefault();
                  fill(0, e.clipboardData.getData("text"));
                }}
              >
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      boxes.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={6}
                    aria-label={`Digit ${i + 1}`}
                    value={d}
                    disabled={busy}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      if (!v) {
                        const next = [...digits];
                        next[i] = "";
                        setDigits(next);
                        return;
                      }
                      fill(i, v.length > 1 && d ? v.replace(d, "") || v : v);
                    }}
                    onKeyDown={(e) => onBoxKey(i, e)}
                    onFocus={(e) => e.target.select()}
                    className={`h-13 w-11 rounded-xl border text-center text-xl font-semibold text-ink caret-[#5A4FF0] outline-none transition-all duration-200 focus:border-[#5A4FF0] focus:shadow-[0_0_0_4px_rgba(90,79,240,0.12)] sm:w-12 ${
                      error
                        ? "border-[#D93636]/60"
                        : d
                          ? "border-ink/30"
                          : "border-ink/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div data-m-in className="mt-5 min-h-5 text-center text-sm">
              {error ? (
                <p role="alert" className="font-medium text-[#D93636]">
                  {error}
                </p>
              ) : busy ? (
                <p className="text-ink/55">Checking…</p>
              ) : (
                <p className="text-ink/80">
                  Didn&apos;t get OTP?{" "}
                  {left > 0 ? (
                    <span className="text-ink/55">
                      Resend OTP in 00:{String(left).padStart(2, "0")}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        if (await sendCode()) {
                          setDigits(Array(6).fill(""));
                          boxes.current[0]?.focus();
                        }
                      }}
                      className="font-semibold text-[#5A4FF0] hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              )}
            </div>
            {devCode && (
              // Demo mode: no SMS service is connected yet, so the code is shown here instead.
              <div
                data-m-in
                className="mx-auto mt-4 flex w-full items-center gap-3 rounded-2xl border border-dashed border-[#F5B25C] bg-[#FFF6E8] px-4 py-3 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#B26B00]">
                    Demo mode · no SMS sent
                  </span>
                  <span className="mt-0.5 block text-sm text-[#7A4A00]">
                    Your code is{" "}
                    <b className="font-mono text-lg tracking-[0.25em] text-[#2E1212]">
                      {devCode}
                    </b>
                  </span>
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => fill(0, devCode)}
                  className="shrink-0 rounded-full bg-[#2E1212] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand disabled:opacity-50"
                >
                  Use code
                </button>
              </div>
            )}
            <div data-m-in className="mt-7">
              <Consent />
            </div>
          </div>
        )}

        {phase === "choose" && (
          <div className="px-5 pb-6 pt-8 sm:px-8 sm:pb-8">
            <h2
              data-m-in
              id="signup-title"
              className="text-center text-xl font-bold tracking-tight text-ink sm:text-[1.4rem]"
            >
              What do you want to explore?
            </h2>
            <p data-m-in className="mt-1 text-center text-sm text-ink/55">
              Your number is verified. Choose how we can help.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  key: "student" as const,
                  title: "Student Consultation",
                  text: "Speak with an education counsellor about countries, universities and scholarships.",
                },
                {
                  key: "partner" as const,
                  title: "Recruitment Partner",
                  text: "Agencies and counsellors: partner with us to place students at 80+ universities.",
                },
              ].map((o) => (
                <button
                  key={o.key}
                  data-m-in
                  type="button"
                  onClick={() => setPhase(o.key)}
                  className="group relative flex min-h-[11.5rem] overflow-hidden rounded-2xl border border-ink/8 bg-white p-5 text-left shadow-[0_18px_40px_-28px_rgba(14,14,40,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-[#5A4FF0]/40 hover:shadow-[0_30px_60px_-30px_rgba(90,79,240,0.55)]"
                >
                  {/* A fine grid behind the artwork */}
                  <svg
                    aria-hidden
                    className="absolute inset-y-0 right-0 h-full w-1/2"
                    style={{
                      maskImage: "linear-gradient(to left, black, transparent)",
                    }}
                  >
                    <defs>
                      <pattern
                        id={`grid-${o.key}`}
                        width="14"
                        height="14"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M14 0H0V14"
                          fill="none"
                          stroke="#E6E6EE"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill={`url(#grid-${o.key})`}
                    />
                  </svg>
                  <div className="relative z-10 flex max-w-[62%] flex-col">
                    <span className="text-lg font-semibold tracking-tight text-ink">
                      {o.title}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-ink/65">
                      {o.text}
                    </span>
                    <span className="mt-auto grid h-9 w-9 place-items-center rounded-lg border-[1.5px] border-ink text-ink transition-all duration-300 group-hover:border-[#5A4FF0] group-hover:bg-[#5A4FF0] group-hover:text-white">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                  <div
                    data-m-art
                    className="pointer-events-none absolute -right-1 bottom-2 h-32 w-32 transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-hover:scale-105 sm:h-36 sm:w-36"
                  >
                    {o.key === "student" ? (
                      <Image
                        src="/grad-cap.webp"
                        alt=""
                        fill
                        sizes="144px"
                        className="object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.18)]"
                      />
                    ) : (
                      <PartnerArt />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** A briefcase with a globe and a handshake badge, for the partner card. */
function PartnerArt() {
  return (
    <svg
      viewBox="0 0 140 140"
      className="h-full w-full drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="pa-case" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB07A" />
          <stop offset="1" stopColor="#E8661C" />
        </linearGradient>
        <linearGradient id="pa-globe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8D85FF" />
          <stop offset="1" stopColor="#4B40D8" />
        </linearGradient>
        <linearGradient id="pa-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      {/* leaves */}
      <path d="M22 96c-6-14-2-28 8-34 2 12 0 24-8 34Z" fill="#6CCB5F" />
      <path d="M24 98c-12-6-16-18-12-28 8 6 12 16 12 28Z" fill="#4DB04A" />
      {/* globe behind */}
      <circle cx="84" cy="46" r="26" fill="url(#pa-globe)" />
      <path
        d="M58 46h52M84 20c-9 8-9 44 0 52M84 20c9 8 9 44 0 52M62 33h44M62 59h44"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      {/* briefcase */}
      <rect
        x="50"
        y="56"
        width="18"
        height="10"
        rx="3"
        fill="none"
        stroke="#B4500F"
        strokeWidth="4"
      />
      <rect x="30" y="64" width="78" height="54" rx="10" fill="url(#pa-case)" />
      <rect x="30" y="84" width="78" height="6" fill="#C9580F" opacity="0.55" />
      <rect x="62" y="80" width="14" height="14" rx="3" fill="#FFE2CC" />
      {/* badge */}
      <circle
        cx="108"
        cy="108"
        r="17"
        fill="url(#pa-badge)"
        stroke="#fff"
        strokeWidth="3"
      />
      <path
        d="M100 108l5 5 10-11"
        fill="none"
        stroke="#fff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
