"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { WORLD_DOTS } from "./worldDots";

// Land points as [longitude, latitude] in radians. Each map cell becomes four dots, so the
// continents read as a fine dot-matrix. The grid is fitted to London and Dhaka on the same map.
const LAND: [number, number][] = (() => {
  const out: [number, number][] = [];
  const rad = Math.PI / 180;
  WORLD_DOTS.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== "#") continue;
      for (const [dx, dy] of [
        [0.25, 0.25],
        [0.75, 0.25],
        [0.25, 0.75],
        [0.75, 0.75],
      ]) {
        out.push([(x + dx - 44.5) * 3.77 * rad, (83.8 - (y + dy) * 3.26) * rad]);
      }
    }
  });
  return out;
})();

const TILT = (18 * Math.PI) / 180;

/**
 * A dark, dotted planet that turns slowly, with a warm halo, drawn on a canvas.
 * `cx`, `cy` place its centre as fractions of the box; `r` is its radius as a fraction of the box's shorter side.
 */
export default function SpinningGlobe({ cx = 0.56, cy = 0.52, r = 0.41, className = "" }: { cx?: number; cy?: number; r?: number; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let spin = -0.35; // start with Europe and Africa facing us
    let visible = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      draw();
    };

    function draw() {
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * r;
      const X = w * cx;
      const Y = h * cy;

      // Warm halo around the planet.
      const halo = ctx.createRadialGradient(X, Y, R * 0.95, X, Y, R * 1.3);
      halo.addColorStop(0, "rgba(255,236,214,0.75)");
      halo.addColorStop(0.35, "rgba(255,206,160,0.35)");
      halo.addColorStop(1, "rgba(255,180,120,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(X, Y, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // The planet: deep brown, lit from the upper left.
      const body = ctx.createRadialGradient(X - R * 0.35, Y - R * 0.4, R * 0.1, X, Y, R);
      body.addColorStop(0, "#5A2A12");
      body.addColorStop(0.55, "#2E140A");
      body.addColorStop(1, "#1A0B06");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(X, Y, R, 0, Math.PI * 2);
      ctx.fill();

      // Land dots on the near side, brighter towards the centre.
      const sinT = Math.sin(TILT);
      const cosT = Math.cos(TILT);
      const size = Math.max(0.8, R / 200);
      for (const [lon, lat] of LAND) {
        const l = lon + spin;
        const cl = Math.cos(lat);
        const z = sinT * Math.sin(lat) + cosT * cl * Math.cos(l);
        if (z <= 0.02) continue;
        const px = X + R * cl * Math.sin(l);
        const py = Y - R * (cosT * Math.sin(lat) - sinT * cl * Math.cos(l));
        ctx.globalAlpha = 0.2 + 0.75 * z;
        ctx.fillStyle = "#F7A86A";
        ctx.beginPath();
        ctx.arc(px, py, size * (0.6 + 0.55 * z), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // A thin bright rim.
      ctx.strokeStyle = "rgba(255,226,196,0.55)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(X, Y, R, 0, Math.PI * 2);
      ctx.stroke();
    }

    const tick = (_t: number, delta: number) => {
      if (!visible) return;
      spin += delta * 0.00006;
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    resize();
    if (!reduce) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
    };
  }, [cx, cy, r]);

  return <canvas ref={canvas} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
