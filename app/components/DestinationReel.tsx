"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { countries, services, Icon } from "./Header";

gsap.registerPlugin(useGSAP);

type Tile =
  | { kind: "country"; name: string; tagline: string; href: string; flag: string }
  | { kind: "service"; label: string; href: string; icon: string; tone: "peach" | "orange" | "ink" };

const tones = ["peach", "orange", "ink"] as const;

// Countries and services interleaved so neighbouring tiles always contrast.
const tiles: Tile[] = countries.flatMap((c, i) => [
  { kind: "country" as const, ...c },
  { kind: "service" as const, ...services[i], tone: tones[i % tones.length] },
]);

const toneClass = {
  peach: "bg-[linear-gradient(150deg,#FFF0E3_0%,#FFC79E_100%)] text-ink",
  orange: "bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white",
  ink: "bg-[linear-gradient(150deg,#2A2023_0%,#100C0E_100%)] text-white",
};

function TileFace({ tile }: { tile: Tile }) {
  if (tile.kind === "country") {
    return (
      <>
        {/* The flag melts into a glow so every destination gets its own colour field */}
        <span
          className="absolute -right-6 -top-8 h-32 w-40 rounded-full opacity-80 blur-2xl"
          style={{ background: tile.flag }}
          aria-hidden
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(16,12,14,0.85)_100%)]" aria-hidden />
        <span
          className="relative h-5 w-7 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]"
          style={{ background: tile.flag }}
          aria-hidden
        />
        <span className="relative mt-auto">
          <span className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/60">Destination</span>
          <span className="block text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">{tile.name}</span>
        </span>
      </>
    );
  }
  return (
    <>
      <span
        className={`relative grid h-10 w-10 place-items-center rounded-xl ${
          tile.tone === "peach" ? "bg-white/70 text-brand" : "bg-white/15 text-white"
        }`}
      >
        <Icon name={tile.icon} className="h-5 w-5" />
      </span>
      <span className="relative mt-auto">
        <span className={`block text-[0.7rem] font-medium uppercase tracking-[0.2em] ${tile.tone === "peach" ? "text-ink/50" : "text-white/60"}`}>
          Service
        </span>
        <span className="block text-base font-semibold leading-snug sm:text-lg">{tile.label}</span>
      </span>
    </>
  );
}

export default function DestinationReel({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = root.current!;
      const els = gsap.utils.toArray<HTMLElement>("[data-tile]", stage);
      const state = { offset: 0, speed: 45 };
      const base = 45;

      // Tiles ride the inside of a cylinder around the viewer: the centre sits
      // furthest away and flat, the edges swing forward and grow towards you.
      const layout = () => {
        const radius = Math.max(280, stage.offsetWidth * 0.45);
        const tileW = els[0].offsetWidth;
        const spacing = tileW + 8;
        const total = spacing * els.length;
        const wrap = gsap.utils.wrap(-total / 2, total / 2);
        els.forEach((el, i) => {
          const angle = wrap(i * spacing + state.offset) / radius;
          const deg = Math.abs(angle) * (180 / Math.PI);
          gsap.set(el, {
            x: radius * Math.sin(angle) - tileW / 2,
            z: radius * (1 - Math.cos(angle)),
            rotationY: (-angle * 180) / Math.PI,
            autoAlpha: deg > 75 ? 0 : 1 - gsap.utils.clamp(0, 1, (deg - 58) / 17),
          });
        });
      };
      layout();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(stage, { y: 90, autoAlpha: 0, duration: 1.4, ease: "expo.out", delay: 1.6 });

        const tick = (_: number, dt: number) => {
          state.offset -= (state.speed * dt) / 1000;
          layout();
        };
        gsap.ticker.add(tick);

        // Hover eases the reel down; dragging flings it.
        let dragging = false;
        let lastX = 0;
        let velocity = 0;
        let travelled = 0;
        const slow = () => !dragging && gsap.to(state, { speed: 12, duration: 0.8, overwrite: true });
        const resume = () => !dragging && gsap.to(state, { speed: base, duration: 1.2, overwrite: true });
        const down = (e: PointerEvent) => {
          dragging = true;
          lastX = e.clientX;
          velocity = 0;
          travelled = 0;
          gsap.killTweensOf(state);
          state.speed = 0;
          stage.setPointerCapture(e.pointerId);
        };
        const move = (e: PointerEvent) => {
          if (!dragging) return;
          const dx = e.clientX - lastX;
          lastX = e.clientX;
          state.offset += dx;
          travelled += Math.abs(dx);
          velocity = dx;
        };
        const up = () => {
          if (!dragging) return;
          dragging = false;
          state.speed = gsap.utils.clamp(-1600, 1600, -velocity * 60);
          gsap.to(state, { speed: base, duration: 1.8, ease: "power3.out" });
        };
        // A drag shouldn't also count as a click on the tile under the pointer.
        const click = (e: MouseEvent) => {
          if (travelled > 6) e.preventDefault();
        };
        stage.addEventListener("click", click, true);
        stage.addEventListener("pointerenter", slow);
        stage.addEventListener("pointerleave", resume);
        stage.addEventListener("pointerdown", down);
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerup", up);
        stage.addEventListener("pointercancel", up);

        return () => {
          gsap.ticker.remove(tick);
          stage.removeEventListener("click", click, true);
          stage.removeEventListener("pointerenter", slow);
          stage.removeEventListener("pointerleave", resume);
          stage.removeEventListener("pointerdown", down);
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerup", up);
          stage.removeEventListener("pointercancel", up);
        };
      });

      window.addEventListener("resize", layout);
      return () => window.removeEventListener("resize", layout);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`cursor-grab touch-pan-y select-none active:cursor-grabbing ${className}`}
      style={{
        maskImage: "linear-gradient(90deg,transparent 0%,#000 6%,#000 94%,transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 6%,#000 94%,transparent 100%)",
      }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d] [transform:perspective(850px)]">
        {tiles.map((tile, i) => (
          <Link
            key={i}
            href={tile.href}
            data-tile
            draggable={false}
            aria-label={tile.kind === "country" ? tile.tagline : tile.label}
            className="group absolute left-1/2 top-1/2 -mt-[55px] h-[110px] w-[150px] [backface-visibility:hidden] sm:-mt-[78px] sm:h-[156px] sm:w-[250px]"
          >
            <span
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-4 shadow-[0_20px_40px_-18px_rgba(16,12,14,0.7)] ring-1 ring-white/10 transition-[filter] duration-300 group-hover:brightness-110 sm:rounded-[22px] sm:p-5 ${
                tile.kind === "country" ? "bg-[#18120F] text-white" : toneClass[tile.tone]
              }`}
            >
              <TileFace tile={tile} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
