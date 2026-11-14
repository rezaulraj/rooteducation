"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const PURPLE = "#5A4FF0";

/** Country codes offered on the phone step. Bangladesh first, since most of our students apply from there. */
export const DIAL = [
  { code: "bd", dial: "+880", name: "Bangladesh" },
  { code: "gb", dial: "+44", name: "United Kingdom" },
  { code: "in", dial: "+91", name: "India" },
  { code: "pk", dial: "+92", name: "Pakistan" },
  { code: "np", dial: "+977", name: "Nepal" },
  { code: "lk", dial: "+94", name: "Sri Lanka" },
  { code: "ng", dial: "+234", name: "Nigeria" },
  { code: "ae", dial: "+971", name: "UAE" },
  { code: "us", dial: "+1", name: "USA / Canada" },
] as const;
export type Dial = (typeof DIAL)[number];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Flag({
  code,
  className = "h-5 w-5",
}: {
  code: string;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 ${className}`}
    >
      <Image
        src={`/flags/${code}.svg`}
        alt=""
        fill
        sizes="24px"
        className="object-cover"
        unoptimized
      />
    </span>
  );
}

export function Globe({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#3B82F6" />
      <path
        d="M7 5.5c2 .5 3 2 2.5 3.5S7 10 7.5 12s3 1.5 3.5 3.5-1 3-1 5M15 4c-.5 1.5.5 3 2 3.5s2 2 1.5 3.5-2 1.5-2 3 1.5 2 2.5 2.5"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Check({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[#22C55E] text-white ${className}`}
    >
      <svg
        viewBox="0 0 12 12"
        className="h-[60%] w-[60%]"
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
  );
}

export function Close({
  onClick,
  label = "Close",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full text-ink/60 transition-all duration-300 hover:rotate-90 hover:bg-ink/5 hover:text-ink"
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
  );
}

export function Spinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
      aria-hidden
    />
  );
}

/** A selectable tile: flags, intakes, options. */
export function Choice({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`relative flex items-center gap-2.5 rounded-xl border px-3.5 text-left text-sm font-medium text-ink transition-all duration-300 active:scale-[0.97] ${
        selected
          ? "border-[#5A4FF0] bg-[#EEEDFF] shadow-[0_0_0_3px_rgba(90,79,240,0.12)]"
          : "border-ink/12 bg-white hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_10px_24px_-14px_rgba(14,14,40,0.35)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        {label}
        {hint && (
          <span className="text-xs font-normal text-ink/45">{hint}</span>
        )}
      </span>
      <span className="mt-2 block">{children}</span>
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-[#D93636]">
          {error}
        </span>
      )}
    </label>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/35 focus:border-[#5A4FF0] focus:shadow-[0_0_0_4px_rgba(90,79,240,0.12)] disabled:bg-[#EDEDED] disabled:text-ink/50";

export function PrimaryButton({
  children,
  disabled,
  busy,
  onClick,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  busy?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled || busy}
      onClick={onClick}
      className={`group relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-[0.95rem] font-semibold transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed bg-[#E3E3E3] text-ink/35"
          : "bg-[#5A4FF0] text-white shadow-[0_14px_30px_-14px_rgba(90,79,240,0.9)] hover:-translate-y-0.5 hover:bg-[#4A3FE0] active:translate-y-0"
      } ${className}`}
    >
      {busy ? <Spinner /> : children}
    </button>
  );
}

/** The segmented progress bar at the top of each journey step. */
export function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="flex gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={step}
      aria-label={`Step ${step} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="relative h-1.5 w-16 overflow-hidden rounded-full bg-ink/10"
        >
          <span
            className="absolute inset-0 origin-left rounded-full bg-ink transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
            style={{ transform: `scaleX(${i < step ? 1 : 0})` }}
          />
        </span>
      ))}
    </div>
  );
}

/**
 * The full-window journey: the logo and a close button on top, a title column on the left,
 * and the questions on the right with the main action pinned at the bottom.
 */
export function Journey({
  stepKey,
  onClose,
  left,
  right,
  action,
  wide = false,
}: {
  stepKey: string;
  onClose: () => void;
  left: React.ReactNode;
  right: React.ReactNode;
  action?: React.ReactNode;
  wide?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  // Opening: the window grows out of the centre of the screen.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        root.current,
        { clipPath: "inset(12% 12% 12% 12% round 32px)", autoAlpha: 0 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.inOut",
        },
      );
    },
    { scope: root },
  );

  // Every step: the title rises in, then the questions follow one by one.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          "[data-j-left] > *",
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.07 },
          0.15,
        )
        .fromTo(
          "[data-j-right] > *",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08 },
          0.25,
        )
        .fromTo(
          "[data-j-action]",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          0.45,
        );
    },
    { scope: root, dependencies: [stepKey] },
  );

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Sign up"
      className="fixed inset-0 z-[120] flex flex-col bg-white"
    >
      {/* Soft colour in the corners */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#5A4FF0]/[0.07] blur-3xl" />
        <div className="absolute -bottom-48 -right-40 h-[34rem] w-[34rem] rounded-full bg-brand/[0.08] blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between px-5 py-4 sm:px-10">
        <Image
          src="/logo.svg"
          alt="Root Education"
          width={92}
          height={36}
          className="h-9 w-auto"
        />
        <Close onClick={onClose} />
      </div>

      <div
        className="relative flex-1 overflow-y-auto overscroll-contain"
        data-lenis-prevent
      >
        <div
          className={`mx-auto grid min-h-full max-w-6xl items-start gap-10 px-5 pb-36 pt-4 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:pt-14 ${wide ? "lg:items-center" : ""}`}
        >
          <div data-j-left key={`l-${stepKey}`} className="lg:sticky lg:top-6">
            {left}
          </div>
          <div data-j-right key={`r-${stepKey}`} className="min-w-0">
            {right}
          </div>
        </div>
      </div>

      {action && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pb-5 pt-10">
          <div className="mx-auto grid max-w-6xl px-5 sm:px-10 lg:grid-cols-2 lg:gap-20">
            <div className="hidden lg:block" />
            <div
              data-j-action
              key={`a-${stepKey}`}
              className="pointer-events-auto"
            >
              {action}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** "Back" arrow next to the progress bar. */
export function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="-ml-2 grid h-9 w-9 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M13 8H3M7 4 3 8l4 4" />
      </svg>
    </button>
  );
}

/** The closing screen: a colourful panel on the left, next steps on the right. */
export function DoneScreen({
  panel,
  children,
  onClose,
}: {
  panel: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          "[data-done-bg]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.inOut" },
        )
        .fromTo(
          "[data-done-panel] > *",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
          0.55,
        )
        .fromTo(
          "[data-done-side] > *",
          { x: 40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
          0.7,
        );
    },
    { scope: root },
  );
  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Sign up complete"
      className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain bg-[#F7F7F8]"
      data-lenis-prevent
    >
      <div className="absolute right-4 top-4 z-10 rounded-full bg-white/80 backdrop-blur">
        <Close onClick={onClose} />
      </div>
      <DoneLayout panel={panel}>{children}</DoneLayout>
    </div>
  );
}

function DoneLayout({
  panel,
  children,
}: {
  panel: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-full lg:grid-cols-2">
      <div
        data-done-bg
        className="relative flex items-center overflow-hidden bg-[linear-gradient(160deg,#6A5CF0_0%,#8B82F8_60%,#A29BFF_100%)] px-6 py-16 sm:px-12 lg:py-0"
      >
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-[0.12]"
        >
          <defs>
            <pattern
              id="done-grid"
              width="34"
              height="34"
              patternUnits="userSpaceOnUse"
            >
              <path d="M34 0H0V34" fill="none" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#done-grid)" />
        </svg>
        <div data-done-panel className="relative w-full">
          {panel}
        </div>
      </div>
      <div className="flex items-center justify-center bg-[#F7F7F8] px-5 py-12 sm:px-10">
        <div data-done-side className="w-full max-w-md space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export function NextSteps({
  title = "Your next steps:",
  steps,
}: {
  title?: string;
  steps: string[];
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_20px_50px_-30px_rgba(14,14,40,0.3)]">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ol className="mt-4 space-y-3.5">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(140deg,#EEEDFF,#DCD9FF)] text-sm font-semibold text-ink">
              {i + 1}
            </span>
            <span className="text-sm leading-snug text-ink/80">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
