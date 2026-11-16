"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { OFFICES, WORLD_DOTS } from "./worldDots";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

// Land cells of the dot-matrix world map (96 × 45 grid, from a public-domain world map).
const LAND: [number, number][] = [];
WORLD_DOTS.forEach((row, y) => {
  for (let x = 0; x < row.length; x++)
    if (row[x] === "#") LAND.push([x + 0.5, y + 0.5]);
});

// Longitude/latitude to the same grid (fitted to London and Dhaka on this map).
const at = (lon: number, lat: number): [number, number] => [
  Math.round((lon / 3.77 + 44.5) * 10) / 10,
  Math.round(((83.8 - lat) / 3.26) * 10) / 10,
];

const LONDON: [number, number] = [OFFICES[0].x, OFFICES[0].y];
const DHAKA: [number, number] = [OFFICES[1].x, OFFICES[1].y];

// Where our students go, linked from London.
const DESTINATIONS = [
  { name: "Toronto", p: at(-79.4, 43.7) },
  { name: "New York", p: at(-74, 40.7) },
  { name: "Kuala Lumpur", p: at(101.7, 3.1) },
  { name: "Seoul", p: at(127, 37.6) },
  { name: "Sydney", p: at(151.2, -33.9) },
];

/** A curved route between two points, bowing upwards. */
const arc = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  lift = 0.28,
) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * lift;
  return `M${x1} ${y1} Q${Math.round(mx * 10) / 10} ${Math.round(my * 10) / 10} ${x2} ${y2}`;
};
const MAIN = arc(LONDON, DHAKA, 0.32);

/**
 * A real world map drawn as fine dots, with our two offices, the route between them
 * and lines out to study destinations. Sits behind a hero as an animated background.
 */
export default function WorldMapBg({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.4 })
          // The continents sweep in from west to east.
          .fromTo(
            "[data-w-sweep]",
            { attr: { width: 0 } },
            { attr: { width: 96 }, duration: 2.4, ease: "power2.inOut" },
          )
          .fromTo(
            "[data-w-route]",
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              stagger: 0.12,
              ease: "power2.inOut",
            },
            1.2,
          )
          .fromTo(
            "[data-w-dest]",
            { attr: { r: 0 } },
            {
              attr: { r: 0.45 },
              duration: 0.6,
              stagger: 0.12,
              ease: "back.out(3)",
            },
            2,
          )
          .fromTo(
            "[data-w-pin]",
            { attr: { r: 0 } },
            {
              attr: { r: 0.75 },
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(3)",
            },
            1,
          )
          .fromTo(
            "[data-w-label]",
            { autoAlpha: 0, y: 1 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2 },
            1.4,
          );

        // Pins pulse, a plane keeps flying London → Dhaka, and a few dots twinkle.
        gsap.fromTo(
          "[data-w-pulse]",
          { attr: { r: 0.75 }, opacity: 0.55 },
          {
            attr: { r: 3.2 },
            opacity: 0,
            duration: 2.2,
            ease: "power1.out",
            repeat: -1,
            stagger: 1.1,
            delay: 1.8,
          },
        );
        gsap.set("[data-w-plane]", { opacity: 1, delay: 2.6 });
        gsap.to("[data-w-plane]", {
          motionPath: {
            path: "[data-w-main]",
            align: "[data-w-main]",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 6,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 0.8,
          delay: 2.6,
        });
        gsap.utils
          .toArray<SVGCircleElement>("[data-w-twinkle]")
          .forEach((d, i) => {
            gsap.to(d, {
              opacity: 0.9,
              duration: 1.2 + (i % 4) * 0.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: (i % 7) * 0.4,
            });
          });
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      aria-hidden
      viewBox="0 0 96 45"
      preserveAspectRatio="xMidYMid meet"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <mask id="w-reveal">
          <rect data-w-sweep x="0" y="0" width="96" height="45" fill="#fff" />
        </mask>
        <radialGradient id="w-glow">
          <stop offset="0" stopColor="#F47A2A" stopOpacity="0.35" />
          <stop offset="1" stopColor="#F47A2A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Continents */}
      <g mask="url(#w-reveal)">
        {LAND.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="0.24"
            fill="#2E1212"
            opacity="0.16"
          />
        ))}
        {LAND.filter((_, i) => i % 23 === 0).map(([x, y], i) => (
          <circle
            key={`t${i}`}
            data-w-twinkle
            cx={x}
            cy={y}
            r="0.3"
            fill="#F47A2A"
            opacity="0.25"
          />
        ))}
      </g>

      {/* Warm glow around both offices */}
      <circle cx={LONDON[0]} cy={LONDON[1]} r="7" fill="url(#w-glow)" />
      <circle cx={DHAKA[0]} cy={DHAKA[1]} r="7" fill="url(#w-glow)" />

      {/* Routes from London to our destinations */}
      <g fill="none" stroke="#F47A2A" strokeWidth="0.12" strokeLinecap="round">
        {DESTINATIONS.map((d) => (
          <path
            key={d.name}
            data-w-route
            d={arc(LONDON, d.p, 0.22)}
            pathLength={1}
            strokeDasharray="1"
            opacity="0.45"
          />
        ))}
      </g>
      {DESTINATIONS.map((d) => (
        <circle
          key={d.name}
          data-w-dest
          cx={d.p[0]}
          cy={d.p[1]}
          r="0.45"
          fill="#F47A2A"
          opacity="0.8"
        />
      ))}

      {/* The main route: London to Dhaka */}
      <path
        d={MAIN}
        fill="none"
        stroke="#2E1212"
        strokeOpacity="0.15"
        strokeWidth="0.14"
        strokeDasharray="0.5 0.5"
      />
      <path
        data-w-route
        data-w-main
        d={MAIN}
        fill="none"
        stroke="#F47A2A"
        strokeWidth="0.22"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
      />

      {/* Offices */}
      {[
        { p: LONDON, name: "London" },
        { p: DHAKA, name: "Dhaka" },
      ].map(({ p, name }) => (
        <g key={name}>
          <circle
            data-w-pulse
            cx={p[0]}
            cy={p[1]}
            r="0.75"
            fill="#F47A2A"
            opacity="0"
          />
          <circle
            data-w-pin
            cx={p[0]}
            cy={p[1]}
            r="0.75"
            fill="#F47A2A"
            stroke="#FFFFFF"
            strokeWidth="0.25"
          />
          <text
            data-w-label
            x={p[0]}
            y={p[1] - 1.5}
            textAnchor="middle"
            fontSize="1.25"
            fontWeight="700"
            fill="#2E1212"
            fillOpacity="0.75"
            letterSpacing="0.05"
          >
            {name.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Plane */}
      <g data-w-plane opacity="0">
        <circle r="1.1" fill="#F47A2A" opacity="0.2" />
        <path d="M0.9 0 -0.6 -0.55 -0.3 0 -0.6 0.55Z" fill="#2E1212" />
      </g>
    </svg>
  );
}
