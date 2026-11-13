"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmbroideryBand, {
  MOTIFS,
  Stitches,
  type MotifName,
} from "./EmbroideryBand";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const r1 = (n: number) => Math.round(n * 10) / 10;

// ---- Window shapes. Each is drawn round (cx, cy) with half-width r; `k` is its height ÷ r. ----
export type ShapeName =
  | "circle"
  | "shield"
  | "onion"
  | "arch"
  | "romanArch"
  | "square"
  | "pill"
  | "hexagon"
  | "steppedGable"
  | "horseshoe"
  | "pediment"
  | "drop"
  | "peak";

const SHAPES: Record<
  ShapeName,
  { k: number; path: (cx: number, cy: number, r: number) => string }
> = {
  circle: {
    k: 2,
    path: (cx, cy, r) =>
      `M${r1(cx - r)} ${r1(cy)}A${r1(r)} ${r1(r)} 0 1 1 ${r1(cx + r)} ${r1(cy)}A${r1(r)} ${r1(r)} 0 1 1 ${r1(cx - r)} ${r1(cy)}Z`,
  },
  shield: {
    k: 2.4,
    path: (cx, cy, r) => {
      const H = 2.4 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        x0 = cx - r,
        x1 = cx + r;
      return `M${r1(x0)} ${r1(y0)}Q${r1(cx)} ${r1(y0 + 0.08 * H)} ${r1(x1)} ${r1(y0)}L${r1(x1)} ${r1(y0 + 0.5 * H)}C${r1(x1)} ${r1(y0 + 0.78 * H)} ${r1(cx + 0.45 * r)} ${r1(y0 + 0.9 * H)} ${r1(cx)} ${r1(y1)}C${r1(cx - 0.45 * r)} ${r1(y0 + 0.9 * H)} ${r1(x0)} ${r1(y0 + 0.78 * H)} ${r1(x0)} ${r1(y0 + 0.5 * H)}Z`;
    },
  },
  onion: {
    k: 2.9,
    path: (cx, cy, r) => {
      const H = 2.9 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        x0 = cx - r,
        x1 = cx + r,
        ys = y0 + 0.44 * H;
      return `M${r1(x0)} ${r1(y1)}L${r1(x0)} ${r1(ys)}C${r1(x0)} ${r1(ys - 0.2 * H)} ${r1(cx - 0.12 * r)} ${r1(y0 + 0.16 * H)} ${r1(cx)} ${r1(y0)}C${r1(cx + 0.12 * r)} ${r1(y0 + 0.16 * H)} ${r1(x1)} ${r1(ys - 0.2 * H)} ${r1(x1)} ${r1(ys)}L${r1(x1)} ${r1(y1)}Z`;
    },
  },
  arch: {
    k: 2.9,
    path: (cx, cy, r) => {
      const H = 2.9 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2;
      return `M${r1(cx - r)} ${r1(y1)}L${r1(cx - r)} ${r1(y0 + r)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx + r)} ${r1(y0 + r)}L${r1(cx + r)} ${r1(y1)}Z`;
    },
  },
  romanArch: {
    k: 2.3,
    path: (cx, cy, r) => {
      const H = 2.3 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2;
      return `M${r1(cx - r)} ${r1(y1)}L${r1(cx - r)} ${r1(y0 + r)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx + r)} ${r1(y0 + r)}L${r1(cx + r)} ${r1(y1)}Z`;
    },
  },
  square: {
    k: 2,
    path: (cx, cy, r) => {
      const c = 0.22 * r,
        x0 = cx - r,
        x1 = cx + r,
        y0 = cy - r,
        y1 = cy + r;
      return `M${r1(x0 + c)} ${r1(y0)}H${r1(x1 - c)}A${r1(c)} ${r1(c)} 0 0 1 ${r1(x1)} ${r1(y0 + c)}V${r1(y1 - c)}A${r1(c)} ${r1(c)} 0 0 1 ${r1(x1 - c)} ${r1(y1)}H${r1(x0 + c)}A${r1(c)} ${r1(c)} 0 0 1 ${r1(x0)} ${r1(y1 - c)}V${r1(y0 + c)}A${r1(c)} ${r1(c)} 0 0 1 ${r1(x0 + c)} ${r1(y0)}Z`;
    },
  },
  pill: {
    k: 2.9,
    path: (cx, cy, r) => {
      const H = 2.9 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2;
      return `M${r1(cx - r)} ${r1(y0 + r)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx + r)} ${r1(y0 + r)}L${r1(cx + r)} ${r1(y1 - r)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx - r)} ${r1(y1 - r)}Z`;
    },
  },
  hexagon: {
    k: 2.31,
    path: (cx, cy, r) => {
      const R = 1.1547 * r;
      return `M${Array.from({ length: 6 }, (_, i) => {
        const a = ((i * 60 - 90) * Math.PI) / 180;
        return `${r1(cx + Math.cos(a) * R)} ${r1(cy + Math.sin(a) * R)}`;
      }).join("L")}Z`;
    },
  },
  steppedGable: {
    k: 2.7,
    path: (cx, cy, r) => {
      const H = 2.7 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        x0 = cx - r,
        ys = y0 + 0.42 * H,
        h = (ys - y0) / 5,
        w = 0.2 * r;
      // The left half, from the eave up the steps to the top; the right half mirrors it.
      const half: [number, number][] = [[x0, ys]];
      for (let i = 0; i < 4; i++)
        half.push(
          [x0 + i * w, ys - (i + 1) * h],
          [x0 + (i + 1) * w, ys - (i + 1) * h],
        );
      half.push([cx - w, y0]);
      const pts = [
        [x0, y1] as [number, number],
        ...half,
        ...half
          .slice()
          .reverse()
          .map(([x, y]) => [2 * cx - x, y] as [number, number]),
        [2 * cx - x0, y1] as [number, number],
      ];
      return `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L")}Z`;
    },
  },
  horseshoe: {
    k: 2.7,
    path: (cx, cy, r) => {
      const H = 2.7 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        leg = 0.84 * r,
        yc = y0 + r,
        ya = yc + Math.sqrt(r * r - leg * leg);
      return `M${r1(cx - leg)} ${r1(y1)}L${r1(cx - leg)} ${r1(ya)}A${r1(r)} ${r1(r)} 0 1 1 ${r1(cx + leg)} ${r1(ya)}L${r1(cx + leg)} ${r1(y1)}Z`;
    },
  },
  pediment: {
    k: 2.4,
    path: (cx, cy, r) => {
      const H = 2.4 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        ye = y0 + 0.3 * H;
      return `M${r1(cx - r)} ${r1(y1)}L${r1(cx - r)} ${r1(ye)}L${r1(cx)} ${r1(y0)}L${r1(cx + r)} ${r1(ye)}L${r1(cx + r)} ${r1(y1)}Z`;
    },
  },
  drop: {
    k: 2.6,
    path: (cx, cy, r) => {
      const H = 2.6 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        yc = y1 - r;
      return `M${r1(cx)} ${r1(y0)}C${r1(cx + 0.35 * r)} ${r1(y0 + 0.35 * H)} ${r1(cx + r)} ${r1(yc - 0.55 * r)} ${r1(cx + r)} ${r1(yc)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx - r)} ${r1(yc)}C${r1(cx - r)} ${r1(yc - 0.55 * r)} ${r1(cx - 0.35 * r)} ${r1(y0 + 0.35 * H)} ${r1(cx)} ${r1(y0)}Z`;
    },
  },
  peak: {
    k: 2.1,
    path: (cx, cy, r) => {
      const H = 2.1 * r,
        y0 = cy - H / 2,
        y1 = cy + H / 2,
        x0 = cx - r,
        x1 = cx + r;
      return `M${r1(x0)} ${r1(y1)}C${r1(x0 + 0.3 * r)} ${r1(y1 - 0.45 * H)} ${r1(cx - 0.18 * r)} ${r1(y0 + 0.08 * H)} ${r1(cx)} ${r1(y0)}C${r1(cx + 0.18 * r)} ${r1(y0 + 0.08 * H)} ${r1(x1 - 0.3 * r)} ${r1(y1 - 0.45 * H)} ${r1(x1)} ${r1(y1)}Z`;
    },
  },
};

export type Particle = {
  path: string;
  colors: string[];
  count: number;
  size: [number, number];
  speed?: number;
  spin?: boolean;
  viewBox?: string;
};

export type DestinationHeroConfig = {
  slug: string;
  country: string;
  theme: "dark" | "light";
  /** Stage background (CSS). */
  background: string;
  eyebrow: string;
  eyebrowLang?: string;
  eyebrowIcon?: ReactNode;
  /** The second line of the heading, after "Study in". */
  name: string;
  intro: string;
  /** Gradient for the coloured heading words. */
  gradient: string;
  accent: string;
  /** Colours of the two drawn outlines round the window. */
  frame: [string, string];
  /** Thread colours and cross-stitch motifs for the embroidered band, frame corners and hem. */
  embroidery?: { colors: [string, string, string]; motifs: MotifName[] };
  shape: ShapeName;
  /** Extra drawing in the window's box (200 wide, 100 × k tall); stroked paths with data-dh-draw are drawn in. */
  ornament?: ReactNode;
  photo: { id: string; aspect: number; focus: [number, number]; alt: string };
  /** Soft coloured lights in the background. */
  glows?: { color: string; className: string }[];
  /** A repeating background pattern, drawn in a `size` tile. */
  pattern?: { size: number; content: ReactNode; opacity: number };
  particles?: Particle;
  /** The land, sea or skyline along the bottom: <g data-dh-land> layers in a 1440 × 220 box. */
  land?: ReactNode;
  /** Decorations placed freely on the stage (they fade out on scroll). */
  decor?: ReactNode;
  final: { line: string; copy: string; cta: string; flag: string[] };
  facts: { label: string; value: string }[];
};

// A seeded scatter, so the server and the browser draw the same particles.
function scatter(seed: number, n: number) {
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: n }, () => ({
    x: Math.round(rnd() * 1000) / 10,
    d: Math.round(rnd() * 100) / 100,
    s: Math.round(rnd() * 100) / 100,
    c: rnd(),
  }));
}

export default function DestinationHero({ c }: { c: DestinationHeroConfig }) {
  const root = useRef<HTMLDivElement>(null);
  const shape = SHAPES[c.shape];
  const BOX_H = 100 * shape.k;
  const boxPath = shape.path(100, BOX_H / 2, 100);
  const dark = c.theme === "dark";
  const dots = c.particles
    ? scatter(c.slug.length * 97 + 13, c.particles.count)
    : [];

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-dh-stage]")!;
      const slot = section.querySelector<HTMLElement>("[data-dh-slot]")!;
      const photo = section.querySelector<HTMLElement>("[data-dh-photo]")!;
      const [fx, fy] = c.photo.focus;
      const A = c.photo.aspect;
      /** Where the focus point lands on a stage of w × h, allowing for how object-cover crops the photo. */
      const focusAt = (w: number, h: number) => {
        const pw = Math.max(w, h * A);
        const ph = Math.max(h, w / A);
        return [(w - pw) / 2 + fx * pw, (h - ph) / 2 + fy * ph];
      };

      const win = { grow: 0, show: 0 };
      const geometry = () => {
        const s = slot.getBoundingClientRect();
        const st = stage.getBoundingClientRect();
        const cx = s.left - st.left + s.width / 2;
        const cy = s.top - st.top + s.height / 2;
        const far = Math.max(st.width, st.height) * 3;
        const peek = Math.min(
          0.62,
          (shape.k * (s.width / 2) * 1.15) / Math.max(st.height, st.width / A),
        );
        return { cx, cy, r0: s.width / 2, far, peek };
      };
      let g = geometry();
      const paint = () => {
        const r = (g.r0 + (g.far - g.r0) * win.grow) * win.show;
        photo.style.clipPath =
          r < 0.5 ? "path('M0 0Z')" : `path('${shape.path(g.cx, g.cy, r)}')`;
      };
      gsap.set("[data-dh-photo-img]", { xPercent: -50, yPercent: -50 });

      // Gentle ambient motion, for everyone.
      gsap.utils.toArray<HTMLElement>("[data-dh-twinkle]").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.2,
          duration: 1.5 + (i % 5) * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: (i % 7) * 0.3,
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");
        g = geometry();
        paint();

        // Falling or drifting particles: leaves, petals, snow.
        const h = stage.offsetHeight;
        gsap.utils.toArray<HTMLElement>("[data-dh-particle]").forEach((el) => {
          const d = Number(el.dataset.d);
          const s = Number(el.dataset.s);
          const dur = (12 + s * 10) / (c.particles?.speed ?? 1);
          gsap.fromTo(
            el,
            { y: -80 },
            {
              y: h + 80,
              duration: dur,
              ease: "none",
              repeat: -1,
              delay: -d * dur,
            },
          );
          gsap.to(el.firstElementChild, {
            x: 30 + s * 40,
            rotation: c.particles?.spin === false ? 0 : 160 + s * 200,
            duration: 3 + s * 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
        gsap.to("[data-dh-drift]", {
          y: -12,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.6,
        });

        // Arrival.
        gsap
          .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
          .fromTo(
            "[data-dh-land]",
            { yPercent: 100 },
            { yPercent: 0, duration: 1.7, stagger: 0.12 },
            0,
          )
          .fromTo(
            "[data-dh-glow]",
            { autoAlpha: 0, scale: 0.6 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 2.4,
              stagger: 0.2,
              ease: "power2.out",
            },
            0,
          )
          .fromTo(
            "[data-dh-pattern]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 2, ease: "power2.out" },
            0.2,
          )
          .fromTo(
            "[data-dh-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.2, stagger: 0.1 },
            0.3,
          )
          .fromTo(
            "[data-dh-fade]",
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.6,
          )
          .fromTo(
            "[data-dh-draw]",
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.7,
              ease: "power2.inOut",
              stagger: 0.1,
            },
            0.4,
          )
          .fromTo(
            "[data-dh-pop]",
            { scale: 0, transformOrigin: "50% 50%" },
            { scale: 1, duration: 0.8, ease: "back.out(2.4)", stagger: 0.05 },
            1.2,
          )
          .fromTo(
            "[data-dh-particles]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.5 },
            0.8,
          )
          .fromTo(
            win,
            { show: 0 },
            { show: 1, duration: 1.5, ease: "expo.out", onUpdate: paint },
            0.8,
          )
          .fromTo(
            "[data-dh-photo-img]",
            { scale: () => g.peek * 1.4 },
            { scale: () => g.peek, duration: 2.4, ease: "power3.out" },
            0.8,
          );

        // Scroll: the window opens out over the stage, the scene falls away, and the story rises over the photo.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: "+=220%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onRefresh: () => {
                g = geometry();
                paint();
              },
            },
          })
          .to("[data-dh-intro]", { y: -50, autoAlpha: 0, duration: 0.15 }, 0)
          .to(
            "[data-dh-landwrap], [data-dh-band]",
            { yPercent: 110, duration: 0.25, ease: "power2.in" },
            0,
          )
          .to(
            "[data-dh-decor], [data-dh-particles]",
            { autoAlpha: 0, duration: 0.2, ease: "power2.in" },
            0,
          )
          .to(
            win,
            { grow: 1, duration: 0.6, ease: "power2.in", onUpdate: paint },
            0.05,
          )
          .to(
            "[data-dh-frame]",
            { scale: 2.6, autoAlpha: 0, duration: 0.3, ease: "power2.in" },
            0.05,
          )
          // The photo settles to full size faster than the window grows, so it always covers the window.
          .fromTo(
            "[data-dh-photo-img]",
            {
              scale: () => g.peek,
              x: () =>
                g.cx -
                stage.offsetWidth / 2 -
                g.peek *
                  (focusAt(stage.offsetWidth, stage.offsetHeight)[0] -
                    stage.offsetWidth / 2),
              y: () =>
                g.cy -
                stage.offsetHeight / 2 -
                g.peek *
                  (focusAt(stage.offsetWidth, stage.offsetHeight)[1] -
                    stage.offsetHeight / 2),
            },
            { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" },
            0.05,
          )
          .fromTo(
            "[data-dh-shade]",
            { opacity: 0 },
            { opacity: 1, duration: 0.2 },
            0.55,
          )
          .set("[data-dh-final]", { autoAlpha: 1 }, 0.62)
          .fromTo(
            "[data-dh-flag]",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" },
            0.64,
          )
          .fromTo(
            "[data-dh-final-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" },
            0.68,
          )
          .fromTo(
            "[data-dh-copy]",
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.15, ease: "power3.out" },
            0.78,
          )
          .fromTo(
            "[data-dh-fact]",
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.15,
              stagger: 0.04,
              ease: "power3.out",
            },
            0.82,
          )
          .to({}, { duration: 0.1 });

        const onResize = () => {
          g = geometry();
          paint();
        };
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          section.classList.remove("pinned");
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        photo.style.clipPath = "none";
        gsap.set(
          "[data-dh-intro], [data-dh-frame], [data-dh-landwrap], [data-dh-band], [data-dh-decor], [data-dh-particles]",
          { autoAlpha: 0 },
        );
        gsap.set("[data-dh-shade]", { opacity: 1 });
        gsap.set("[data-dh-final]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  const patId = `dh-pat-${c.slug}`;
  const thread = c.embroidery ?? {
    colors: [c.frame[1], c.frame[0], c.accent] as [string, string, string],
    motifs: ["rhombus", "star"] as MotifName[],
  };
  const star = MOTIFS.star;

  return (
    <div ref={root} className="overflow-hidden bg-white px-3 pt-3">
      <section
        data-dh-stage
        aria-labelledby={`${c.slug}-title`}
        className={`relative h-[calc(100svh-24px)] min-h-[700px] overflow-hidden rounded-[28px] [container-type:size] ${dark ? "text-white" : "text-ink"}`}
        style={{ background: c.background }}
      >
        {/* A fine linen weave, the cloth everything is stitched onto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 4px)",
          }}
        />

        {/* Lights */}
        {c.glows?.map((gl, i) => (
          <div
            key={i}
            data-dh-glow
            aria-hidden
            className={`pointer-events-none absolute rounded-full blur-3xl ${gl.className}`}
            style={{
              background: `radial-gradient(circle, ${gl.color} 0%, transparent 68%)`,
            }}
          />
        ))}

        {/* Pattern */}
        {c.pattern && (
          /* The fade-in animates the wrapper, so the pattern keeps its own subtle opacity. */
          <div
            data-dh-pattern
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              style={{ opacity: c.pattern.opacity }}
            >
              <defs>
                <pattern
                  id={patId}
                  width={c.pattern.size}
                  height={c.pattern.size}
                  patternUnits="userSpaceOnUse"
                >
                  {c.pattern.content}
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patId})`} />
            </svg>
          </div>
        )}

        {/* Particles */}
        {c.particles && (
          <div
            data-dh-particles
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
          >
            {dots.map((p, i) => {
              const size =
                c.particles!.size[0] +
                (c.particles!.size[1] - c.particles!.size[0]) * p.s;
              const color =
                c.particles!.colors[
                  Math.floor(p.c * c.particles!.colors.length)
                ];
              return (
                <div
                  key={i}
                  data-dh-particle
                  data-d={p.d}
                  data-s={p.s}
                  className="absolute top-0"
                  style={{ left: `${p.x}%`, width: size, height: size }}
                >
                  <svg
                    viewBox={c.particles!.viewBox ?? "0 0 24 24"}
                    className="h-full w-full overflow-visible"
                    style={{ opacity: 0.85 }}
                  >
                    <path d={c.particles!.path} fill={color} />
                  </svg>
                </div>
              );
            })}
          </div>
        )}

        {/* Free decorations */}
        {c.decor && (
          <div
            data-dh-decor
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5]"
          >
            {c.decor}
          </div>
        )}

        {/* The photo, clipped to the window */}
        <div
          data-dh-photo
          className="absolute inset-0 z-10 [clip-path:path('M0_0Z')]"
        >
          <div
            data-dh-photo-img
            className="absolute left-1/2 top-1/2"
            style={{
              width: `max(100cqw, ${r1(100 * c.photo.aspect)}cqh)`,
              height: `max(100cqh, ${r1(100 / c.photo.aspect)}cqw)`,
            }}
          >
            <Image
              src={`https://images.unsplash.com/photo-${c.photo.id}?w=2400&q=80&auto=format&fit=crop`}
              alt={c.photo.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            data-dh-shade
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,16,0.85)_0%,rgba(8,10,16,0.5)_45%,rgba(8,10,16,0.1)_100%)] opacity-0"
          />
        </div>

        {/* Before the dive */}
        <div className="relative z-20 mx-auto grid h-full max-w-6xl content-center items-center gap-14 px-6 pb-44 pt-24 lg:grid-cols-[1fr_0.85fr] lg:gap-10 lg:pb-40">
          <div data-dh-intro className="text-center lg:text-left">
            <p
              data-dh-fade
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm"
              style={{ color: c.accent }}
            >
              {c.eyebrowIcon}
              <span lang={c.eyebrowLang}>{c.eyebrow}</span>
            </p>
            <h1
              id={`${c.slug}-title`}
              className="mt-5 text-[clamp(2.8rem,7vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-dh-line className="block">
                  Study in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-dh-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: c.gradient }}
                >
                  {c.name}
                </span>
              </span>
            </h1>
            <p
              data-dh-fade
              className={`mx-auto mt-5 max-w-md text-sm leading-relaxed sm:text-lg lg:mx-0 ${dark ? "text-white/75" : "text-ink/70"}`}
            >
              {c.intro}
            </p>
          </div>

          <div className="flex justify-center">
            <div
              data-dh-slot
              className="relative"
              style={{
                aspectRatio: `200 / ${BOX_H}`,
                width: `min(${r1(110 / shape.k)}vw, ${r1(96 / shape.k)}svh)`,
              }}
            >
              <svg
                data-dh-frame
                viewBox={`0 0 200 ${BOX_H}`}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden
              >
                {/* Stitched outlines: a running stitch and a fine back stitch, sewn in by animating their masks.
                    Each sits in a scaled group, and its mask is drawn in that group's own coordinates. */}
                {(
                  [
                    [1.07, c.frame[0], "2.6", "7 4"],
                    [1.15, c.frame[1], "1.6", "1.5 4"],
                  ] as const
                ).map(([k, color, w, dash], i) => (
                  <g
                    key={k}
                    transform={`translate(100 ${BOX_H / 2}) scale(${k}) translate(-100 ${-BOX_H / 2})`}
                  >
                    <mask
                      id={`${c.slug}-fm${i}`}
                      maskUnits="userSpaceOnUse"
                      x="-200"
                      y="-200"
                      width="600"
                      height={BOX_H + 400}
                    >
                      <path
                        data-dh-draw
                        d={boxPath}
                        fill="none"
                        stroke="#fff"
                        strokeWidth="8"
                        pathLength={1}
                        strokeDasharray="1"
                      />
                    </mask>
                    <path
                      d={boxPath}
                      fill="none"
                      stroke={color}
                      strokeWidth={w}
                      strokeDasharray={dash}
                      strokeLinecap="round"
                      mask={`url(#${c.slug}-fm${i})`}
                    />
                  </g>
                ))}
                {/* Cross-stitched stars at the lower corners */}
                {[-22, 222].map((x) => (
                  <g
                    key={x}
                    transform={`translate(${x - star.w * 1.5} ${BOX_H - star.h * 1.5})`}
                  >
                    <g data-dh-pop>
                      <Stitches
                        cells={star.cells}
                        colors={thread.colors}
                        size={3}
                      />
                    </g>
                  </g>
                ))}
                {c.ornament}
              </svg>
            </div>
          </div>
        </div>

        {/* The land along the bottom */}
        {c.land && (
          <div
            data-dh-landwrap
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[24%] min-h-[150px]"
          >
            <svg
              viewBox="0 0 1440 220"
              preserveAspectRatio="xMidYMax slice"
              className="absolute inset-0 h-full w-full"
            >
              {c.land}
            </svg>
          </div>
        )}

        {/* The embroidered band, sewn in by a needle */}
        <div
          data-dh-band
          className="pointer-events-none absolute inset-x-0 bottom-5 z-20 sm:bottom-7"
        >
          <EmbroideryBand
            id={c.slug}
            colors={thread.colors}
            motifs={thread.motifs}
          />
        </div>

        {/* After the dive */}
        <div
          data-dh-final
          className="invisible absolute inset-0 z-30 text-white"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 sm:pb-16">
            <div
              aria-hidden
              className="flex h-2 w-28 overflow-hidden rounded-full"
            >
              {c.final.flag.map((col, i) => (
                <span
                  key={i}
                  data-dh-flag
                  className="h-full flex-1 origin-left"
                  style={{ background: col }}
                />
              ))}
            </div>
            <p
              className="mt-5 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
              aria-hidden
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-dh-final-line className="block">
                  Your future,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span
                  data-dh-final-line
                  className="inline-block bg-clip-text pr-[0.04em] text-transparent"
                  style={{ backgroundImage: c.gradient }}
                >
                  {c.final.line}
                </span>
              </span>
            </p>
            <div
              data-dh-copy
              className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                {c.final.copy}
              </p>
              <Link
                href="/consultation"
                className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl bg-white pl-5 pr-2 text-sm font-semibold text-ink"
              >
                {c.final.cta}
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
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
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
              {c.facts.map((f) => (
                <div key={f.label} data-dh-fact>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
