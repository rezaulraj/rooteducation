"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GLOBE_ROWS } from "./globeDots";

const RAD = Math.PI / 180;
const STEP = 1.2; // degrees between rows in GLOBE_ROWS

// Land dots as [longitude, latitude] in radians, laid out in offset rows for a fine hex pattern.
const LAND: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (const [lat, n, off, runs] of GLOBE_ROWS) {
    const dl = 360 / n;
    let k = 0;
    runs.forEach((count, i) => {
      if (i % 2)
        for (let j = 0; j < count; j++)
          out.push([(-180 + off + (k + j) * dl) * RAD, lat * RAD]);
      k += count;
    });
  }
  return out;
})();

const TILT = 20 * RAD;
// Light from the upper left, slightly in front (view space: x right, y up, z towards the viewer).
const L = (() => {
  const v = [-0.55, 0.6, 0.58];
  const m = Math.hypot(...v);
  return v.map((x) => x / m);
})();
const BANDS = 7;

/**
 * A dark planet covered in a fine hex pattern of land dots, lit from the upper left, turning slowly.
 * Drawn on a canvas. `cx`, `cy` place its centre as fractions of the box; `r` is its radius
 * as a fraction of the box's shorter side.
 */
export default function SpinningGlobe({
  cx = 0.58,
  cy = 0.53,
  r = 0.46,
  className = "",
}: {
  cx?: number;
  cy?: number;
  r?: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let spin = -0.3; // start with Europe and Africa facing us
    let visible = true;
    const bands: number[][] = Array.from({ length: BANDS }, () => []);

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

      // Atmosphere: a soft cream glow, brightest on the lit upper-left side.
      const halo = ctx.createRadialGradient(
        X - R * 0.12,
        Y - R * 0.12,
        R * 0.9,
        X,
        Y,
        R * 1.38,
      );
      halo.addColorStop(0, "rgba(255,244,230,0.95)");
      halo.addColorStop(0.3, "rgba(255,214,170,0.55)");
      halo.addColorStop(1, "rgba(255,170,110,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(X, Y, R * 1.38, 0, Math.PI * 2);
      ctx.fill();

      // The planet: deep brown, lit from the upper left, darker towards the lower right.
      const body = ctx.createRadialGradient(
        X - R * 0.45,
        Y - R * 0.5,
        R * 0.05,
        X + R * 0.1,
        Y + R * 0.1,
        R * 1.15,
      );
      body.addColorStop(0, "#5C3220");
      body.addColorStop(0.45, "#3A1D10");
      body.addColorStop(0.85, "#24110A");
      body.addColorStop(1, "#1A0C07");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(X, Y, R, 0, Math.PI * 2);
      ctx.fill();

      // Land dots, grouped into brightness bands so each band is one fill.
      bands.forEach((b) => (b.length = 0));
      const sinT = Math.sin(TILT);
      const cosT = Math.cos(TILT);
      for (const [lon, lat] of LAND) {
        const l = lon + spin;
        const cl = Math.cos(lat);
        const sl = Math.sin(lat);
        const nz = sinT * sl + cosT * cl * Math.cos(l);
        if (nz <= 0) continue;
        const nx = cl * Math.sin(l);
        const ny = cosT * sl - sinT * cl * Math.cos(l);
        const lit = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
        const band = Math.min(
          BANDS - 1,
          Math.floor((0.25 * nz + 0.75 * lit) * BANDS),
        );
        bands[band].push(X + R * nx, Y - R * ny, nz);
      }
      const dot = R * STEP * RAD * 0.36;
      bands.forEach((pts, i) => {
        if (!pts.length) return;
        const t = i / (BANDS - 1);
        // From shadowed bronze to sunlit sand.
        ctx.fillStyle = `rgb(${Math.round(120 + 105 * t)},${Math.round(68 + 82 * t)},${Math.round(40 + 60 * t)})`;
        ctx.globalAlpha = 0.55 + 0.45 * t;
        ctx.beginPath();
        for (let k = 0; k < pts.length; k += 3) {
          const s = dot * (0.45 + 0.55 * Math.sqrt(pts[k + 2]));
          ctx.moveTo(pts[k] + s, pts[k + 1]);
          ctx.arc(pts[k], pts[k + 1], s, 0, Math.PI * 2);
        }
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Edge shading: the limb darkens, then a thin bright rim of atmosphere on the lit side.
      const limb = ctx.createRadialGradient(X, Y, R * 0.7, X, Y, R);
      limb.addColorStop(0, "rgba(20,8,4,0)");
      limb.addColorStop(1, "rgba(20,8,4,0.55)");
      ctx.fillStyle = limb;
      ctx.beginPath();
      ctx.arc(X, Y, R, 0, Math.PI * 2);
      ctx.fill();

      const rim = ctx.createLinearGradient(X - R, Y - R, X + R, Y + R);
      rim.addColorStop(0, "rgba(255,236,214,0.9)");
      rim.addColorStop(0.5, "rgba(255,190,140,0.25)");
      rim.addColorStop(1, "rgba(255,160,100,0)");
      ctx.strokeStyle = rim;
      ctx.lineWidth = Math.max(1.5, R * 0.012);
      ctx.beginPath();
      ctx.arc(X, Y, R - ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    const tick = (_t: number, delta: number) => {
      if (!visible) return;
      spin += delta * 0.00005;
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

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
