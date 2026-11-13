"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** One cross-stitch: column, row, and which of the three thread colours. */
export type Stitch = [x: number, y: number, color: 0 | 1 | 2];
export type MotifName = "rhombus" | "star" | "flower" | "tree" | "cross";

type Motif = { w: number; h: number; cells: Stitch[] };

function grid(w: number, h: number, pick: (dx: number, dy: number) => 0 | 1 | 2 | null): Motif {
  const cells: Stitch[] = [];
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const c = pick(x - cx, y - cy);
      if (c !== null) cells.push([x, y, c]);
    }
  return { w, h, cells };
}

export const MOTIFS: Record<MotifName, Motif> = {
  // Nested diamonds.
  rhombus: grid(13, 13, (dx, dy) => {
    const d = Math.abs(dx) + Math.abs(dy);
    return d === 6 || d === 2 ? 0 : d === 4 ? 1 : d === 0 ? 2 : null;
  }),
  // The eight-pointed star.
  star: grid(9, 9, (dx, dy) => {
    if (dx === 0 && dy === 0) return 2;
    if (dx === 0 || dy === 0) return 1;
    if (Math.abs(dx) === Math.abs(dy) && Math.abs(dx) <= 3) return 0;
    return null;
  }),
  // A four-petal flower with leaves.
  flower: grid(11, 11, (dx, dy) => {
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    if (ax + ay === 0) return 2;
    if (ax + ay === 1) return 2;
    if ((ax === 0 && ay >= 2 && ay <= 4) || (ay === 0 && ax >= 2 && ax <= 4)) return 0;
    if ((ax === 1 && ay === 3) || (ay === 1 && ax === 3)) return 0;
    if (ax === ay && ax >= 2 && ax <= 3) return 1;
    return null;
  }),
  // A stylised tree of life.
  tree: grid(11, 13, (dx, dy) => {
    const row = dy + 6;
    if (row === 0 && dx === 0) return 2;
    if (row >= 1 && row <= 9 && Math.abs(dx) <= Math.floor((row + 1) / 2) && (row + dx) % 2 === 0) return row % 4 < 2 ? 1 : 0;
    if (row >= 10 && dx === 0) return 2;
    return null;
  }),
  // A filled cross.
  cross: grid(9, 9, (dx, dy) => {
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    if (ax === 0 && ay === 0) return 2;
    if ((ax <= 1 && ay <= 4) || (ay <= 1 && ax <= 4)) return ax + ay <= 1 ? 1 : 0;
    return null;
  }),
};

/** Draws stitches as small X crosses, in a cell of `size` px. */
export function Stitches({ cells, colors, size }: { cells: Stitch[]; colors: [string, string, string]; size: number }) {
  const p = size * 0.2;
  return cells.map(([x, y, c], i) => (
    <path
      key={i}
      d={`M${x * size + p} ${y * size + p}L${(x + 1) * size - p} ${(y + 1) * size - p}M${(x + 1) * size - p} ${y * size + p}L${x * size + p} ${(y + 1) * size - p}`}
      stroke={colors[c]}
      strokeWidth={size * 0.24}
      strokeLinecap="round"
    />
  ));
}

const ROWS = 19;

/** One repeat of the band: borders top and bottom and the motifs between them. */
function buildTile(motifs: MotifName[]) {
  const gap = 3;
  let x = 2;
  const cells: Stitch[] = [];
  for (const name of motifs) {
    const m = MOTIFS[name];
    const oy = 3 + Math.floor((13 - m.h) / 2);
    for (const [cx, cy, c] of m.cells) cells.push([x + cx, oy + cy, c]);
    x += m.w + gap;
  }
  const w = x + (x % 2);
  for (let i = 0; i < w; i++) {
    cells.push([i, 0, 0], [i, ROWS - 1, 0]);
    if (i % 2 === 0) cells.push([i, 1, 1]);
    else cells.push([i, ROWS - 2, 1]);
  }
  return { w, cells };
}

/** A full-width cross-stitch band, sewn in from left to right by a needle when it first appears. */
export default function EmbroideryBand({
  id,
  colors,
  motifs,
  size = 6,
  delay = 0.3,
}: {
  id: string;
  colors: [string, string, string];
  motifs: MotifName[];
  size?: number;
  delay?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tile = buildTile(motifs);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ delay })
          .fromTo("[data-eb-sew]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2.6, ease: "power1.inOut" }, 0)
          .fromTo("[data-eb-needle]", { left: "0%", autoAlpha: 1 }, { left: "100%", duration: 2.6, ease: "power1.inOut" }, 0)
          .to("[data-eb-needle]", { autoAlpha: 0, duration: 0.3 }, 2.6);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-eb-needle]", { autoAlpha: 0 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="relative">
      <div data-eb-sew>
        <svg className="block w-full" height={ROWS * size}>
          <defs>
            <pattern id={`eb-${id}`} width={tile.w * size} height={ROWS * size} patternUnits="userSpaceOnUse">
              <Stitches cells={tile.cells} colors={colors} size={size} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#eb-${id})`} />
        </svg>
      </div>
      <div data-eb-needle className="invisible absolute top-1/2 -ml-1 -mt-10 h-20 w-3">
        <svg viewBox="0 0 12 80" className="h-full w-full overflow-visible">
          <path d="M6 2 L8 70 L6 78 L4 70 Z" fill="#D8D2C8" />
          <ellipse cx="6" cy="9" rx="1.2" ry="3.5" fill="#1A1416" />
          <path d="M6 9 C 0 30, -40 40, -900 42" fill="none" stroke={colors[0]} strokeWidth="1.2" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
