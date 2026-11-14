"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OFFICES, WORLD_DOTS } from "./worldDots";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LEAD =
  "Every student starts with a dream, but not everyone knows how to take it global.";
const CLOSE = ["Root", "Education", "opens", "that", "door."];
const UNDERLINE = new Set(["Education", "opens"]);

function Card({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  // Tilts towards the pointer, with a soft light following it.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
    e.currentTarget.style.setProperty("--rx", `${(y - 0.5) * -8}deg`);
    e.currentTarget.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    // The outer element is what GSAP animates in; the inner one keeps its own tilt.
    <li data-stat className="[perspective:1000px]">
      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`group relative isolate h-[23rem] overflow-hidden rounded-[22px] p-6 text-white transition-[transform,box-shadow] duration-500 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:shadow-[0_40px_70px_-35px_rgba(11,11,12,0.55)] sm:h-[22rem] ${className}`}
        style={style}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx) var(--my), rgba(255,255,255,0.22), transparent 60%)",
          }}
        />
        {children}
      </div>
    </li>
  );
}

function Figure({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="relative z-10">
      <p className="text-[clamp(2.6rem,4.4vw,3.4rem)] font-semibold leading-none tracking-[-0.03em]">
        <span data-count={value}>{value.toLocaleString("en-GB")}</span>
        {suffix}
      </p>
      <p className="mt-2 text-lg font-medium leading-snug text-white/90">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The sentence rises word by word, then the hand-drawn underline is sketched in.
        gsap
          .timeline({
            scrollTrigger: { trigger: "[data-impact-head]", start: "top 80%" },
          })
          .fromTo(
            "[data-w]",
            { y: 24, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: 0.035,
              ease: "expo.out",
            },
          )
          .fromTo(
            "[data-squiggle]",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
            "-=0.4",
          );

        // Cards rise and unfold one after another, each with its own illustration.
        const cards = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: "[data-stats-grid]", start: "top 78%" },
        });
        cards
          .fromTo(
            "[data-stat]",
            { y: 90, rotateX: -18, autoAlpha: 0 },
            {
              y: 0,
              rotateX: 0,
              autoAlpha: 1,
              duration: 1.2,
              stagger: 0.12,
              transformOrigin: "50% 100%",
            },
          )
          .fromTo(
            "[data-student]",
            { yPercent: 60 },
            { yPercent: 0, duration: 1.3 },
            0.35,
          )
          .fromTo(
            "[data-bar]",
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.9,
              stagger: 0.05,
              ease: "back.out(1.6)",
              transformOrigin: "50% 100%",
            },
            0.5,
          )
          .fromTo(
            "[data-dots] circle",
            { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(2)",
              stagger: { each: 0.0012, from: "center", grid: "auto" },
            },
            0.55,
          )
          .fromTo(
            "[data-route]",
            { strokeDashoffset: 0, opacity: 0 },
            { opacity: 0.9, duration: 0.6 },
            1.5,
          )
          .fromTo(
            "[data-pin]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, stagger: 0.25 },
            1.1,
          )
          .fromTo(
            "[data-pin-dot]",
            { attr: { r: 0 } },
            {
              attr: { r: 1.1 },
              duration: 0.7,
              stagger: 0.25,
              ease: "back.out(3)",
            },
            1.1,
          )
          .fromTo(
            "[data-cap]",
            { y: -160, rotation: -40, autoAlpha: 0 },
            {
              y: 0,
              rotation: 0,
              autoAlpha: 1,
              duration: 1.2,
              ease: "back.out(1.4)",
            },
            0.7,
          )
          .fromTo(
            "[data-cta]",
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
            0.9,
          );

        // Numbers count up as the cards arrive.
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el, i) => {
          const end = Number(el.dataset.count);
          const v = { n: 0 };
          cards.to(
            v,
            {
              n: end,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () =>
                (el.textContent = Math.round(v.n).toLocaleString("en-GB")),
            },
            0.3 + i * 0.12,
          );
        });

        // Gentle life once they're in view.
        gsap.to("[data-cap-float]", {
          y: -8,
          rotation: -3,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.fromTo(
          "[data-spark]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.4,
            delay: 2,
          },
        );
        gsap.to("[data-route]", {
          strokeDashoffset: -2.2,
          duration: 1.6,
          ease: "none",
          repeat: -1,
        });
        gsap.fromTo(
          "[data-pin-pulse]",
          { attr: { r: 1.2 }, opacity: 0.9 },
          {
            attr: { r: 4.5 },
            opacity: 0,
            duration: 1.8,
            ease: "power1.out",
            repeat: -1,
            stagger: 0.4,
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="impact-title"
      className="overflow-hidden bg-white px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div data-impact-head className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Our impact
            <span className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="impact-title"
            className="mt-6 text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-[#2E1212]"
          >
            {[...LEAD.split(" "), ...CLOSE].map((w, i) => (
              <span key={i} className="inline-block">
                <span data-w className="relative inline-block">
                  {w}
                  {UNDERLINE.has(w) && w === "Education" && (
                    // A hand-drawn squiggle under "Education opens"
                    <svg
                      aria-hidden
                      viewBox="0 0 240 22"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-[0.32em] left-[-4%] h-[0.5em] w-[205%] overflow-visible"
                    >
                      <path
                        data-squiggle
                        d="M3 14C40 6 80 18 112 12 128 9 118 4 130 6 160 10 200 4 237 6"
                        fill="none"
                        stroke="#F47A2A"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength={1}
                        strokeDasharray="1"
                      />
                    </svg>
                  )}
                </span>
                {" "}
              </span>
            ))}
          </h2>
        </div>

        {/* Cards */}
        <ul
          data-stats-grid
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {/* Students */}
          <Card
            style={{
              background: "linear-gradient(160deg, #7C7CFF 0%, #5D5DF5 100%)",
            }}
          >
            <Figure value={1000} suffix="+" label="Students enrolled" />
            <div
              data-student
              className="absolute -bottom-2 left-6 h-[62%] w-[70%]"
            >
              <Image
                src="/hero-student.webp"
                alt=""
                fill
                loading="eager"
                sizes="(min-width:1024px) 16rem, 60vw"
                className="object-contain object-left-bottom transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Card>

          {/* Years */}
          <Card
            style={{
              background: "linear-gradient(160deg, #FF8B3D 0%, #F26B1D 100%)",
            }}
          >
            <Figure value={13} suffix="" label="Years of experience" />
            {/* One bar per year, growing like a chart */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-6 flex h-[48%] items-end gap-[5%]"
            >
              {Array.from({ length: 13 }, (_, i) => (
                <span
                  key={i}
                  data-bar
                  className="flex-1 rounded-t-md transition-transform duration-500 group-hover:-translate-y-1"
                  style={{
                    height: `${18 + i * 6.4}%`,
                    background:
                      i === 12
                        ? "#FFFFFF"
                        : `rgba(255,255,255,${0.22 + i * 0.04})`,
                    transitionDelay: `${i * 20}ms`,
                  }}
                />
              ))}
            </div>
          </Card>

          {/* Branches */}
          <Card
            style={{
              background: "linear-gradient(160deg, #A9C2FF 0%, #86A7FA 100%)",
            }}
          >
            <Figure value={6} suffix="" label="Branches worldwide" />
            {/* A dot-matrix world map with our offices and the route between them */}
            <div className="absolute inset-x-0 bottom-0 h-[64%]">
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(70%_60%_at_60%_60%,rgba(255,255,255,0.35),transparent_70%)]"
              />
              <svg
                data-map
                aria-hidden
                viewBox="34 0 46 34"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-x-3 bottom-4 h-[85%] w-[calc(100%-1.5rem)] overflow-visible"
              >
                <defs>
                  <radialGradient id="impact-glow">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g data-dots>
                  {WORLD_DOTS.flatMap((row, r) =>
                    [...row].map((ch, c) =>
                      ch === "#" ? (
                        <circle
                          key={`${r}-${c}`}
                          cx={c + 0.5}
                          cy={r + 0.5}
                          r={0.36}
                          fill="#FFFFFF"
                          fillOpacity={0.55}
                        />
                      ) : null,
                    ),
                  )}
                </g>
                {/* The route, drawn in; a bright spark keeps travelling along it */}
                <path
                  data-route
                  d="M44.5 9.9 Q56.45 -2.0999999999999996 68.4 18.4"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.45"
                  strokeDasharray="1.2 1"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  data-spark
                  d="M44.5 9.9 Q56.45 -2.0999999999999996 68.4 18.4"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0.08 0.92"
                />
                {OFFICES.map((o, i) => (
                  <g key={o.city} data-pin>
                    <circle
                      data-pin-pulse
                      cx={o.x}
                      cy={o.y}
                      r="2"
                      fill="url(#impact-glow)"
                    />
                    <circle
                      data-pin-dot
                      cx={o.x}
                      cy={o.y}
                      r="1.1"
                      fill="#3B4BDB"
                      stroke="#FFFFFF"
                      strokeWidth="0.45"
                    />
                    <rect
                      x={i === 0 ? o.x - 11 : o.x - 4.5}
                      y={o.y - 6.4}
                      width="9"
                      height="3.8"
                      rx="1.9"
                      fill="#FFFFFF"
                    />
                    <text
                      x={i === 0 ? o.x - 6.5 : o.x}
                      y={o.y - 3.75}
                      textAnchor="middle"
                      fontSize="2.1"
                      fontWeight="600"
                      fill="#3B4BDB"
                    >
                      {o.city}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </Card>

          {/* Universities */}
          <Card
            style={{
              background: "linear-gradient(160deg, #FFB627 0%, #FFD27A 100%)",
            }}
          >
            <Figure value={36} suffix="+" label="Partner universities" />
            <div className="absolute bottom-[12%] left-1/2 w-[78%] -translate-x-1/2">
              <div data-cap>
                <div data-cap-float>
                  <Image
                    src="/grad-cap.webp"
                    alt=""
                    width={431}
                    height={388}
                    loading="eager"
                    className="h-auto w-full drop-shadow-[0_22px_22px_rgba(120,70,0,0.35)] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </Card>
        </ul>

        <div className="mt-14 flex justify-center">
          <Link
            data-cta
            href="/consultation"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-[#0B0B0C] pl-8 pr-2 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start Your Journey
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
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
          </Link>
        </div>
      </div>
    </section>
  );
}
