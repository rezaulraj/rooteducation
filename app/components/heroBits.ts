// Small generators for hero scenery, all in a 1440 × 220 box and rounded so the server and browser agree.

const r1 = (n: number) => Math.round(n * 10) / 10;

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

/** A row of pine trees standing on y, roughly h tall, one every `step`. */
export function pines(y: number, h: number, step: number, seed = 1) {
  const rnd = seeded(seed);
  let d = `M0 220V${y}`;
  for (let x = 0; x < 1440 + step; x += step) {
    const th = h * (0.65 + rnd() * 0.5);
    const w = step * (0.45 + rnd() * 0.2);
    d += `L${r1(x)} ${y}L${r1(x + w * 0.15)} ${r1(y - th * 0.35)}L${r1(x + w * 0.05)} ${r1(y - th * 0.35)}L${r1(x + w * 0.3)} ${r1(y - th * 0.7)}L${r1(x + w * 0.22)} ${r1(y - th * 0.7)}L${r1(x + w * 0.5)} ${r1(y - th)}L${r1(x + w * 0.78)} ${r1(y - th * 0.7)}L${r1(x + w * 0.7)} ${r1(y - th * 0.7)}L${r1(x + w * 0.95)} ${r1(y - th * 0.35)}L${r1(x + w * 0.85)} ${r1(y - th * 0.35)}L${r1(x + w)} ${y}`;
  }
  return `${d}L1440 ${y}V220Z`;
}

/** Gently rolling hills along y, with amplitude amp. */
export function hills(y: number, amp: number, phase = 0, waves = 3) {
  let d = `M0 220V${r1(y + Math.sin(phase) * amp)}`;
  for (let x = 0; x <= 1440; x += 40) d += `L${x} ${r1(y + Math.sin(phase + (x / 1440) * Math.PI * 2 * waves) * amp)}`;
  return `${d}V220Z`;
}

/** A mountain range through the given peaks, closed along the bottom. */
export function range(points: [number, number][]) {
  return `M0 220L${points.map(([x, y]) => `${x} ${y}`).join("L")}L1440 220Z`;
}

/** A city skyline of blocks and towers standing on y. */
export function skyline(y: number, maxH: number, seed = 3, step = 34) {
  const rnd = seeded(seed);
  let d = `M0 220V${y}`;
  for (let x = 0; x < 1440; ) {
    const w = step * (0.6 + rnd() * 0.9);
    const h = maxH * (0.25 + rnd() * rnd() * 0.85);
    d += `L${r1(x)} ${r1(y - h)}L${r1(x + w)} ${r1(y - h)}`;
    if (rnd() > 0.8) d += `L${r1(x + w / 2)} ${r1(y - h - 18)}L${r1(x + w)} ${r1(y - h)}`;
    x += w + 2;
  }
  return `${d}L1440 ${y}V220Z`;
}

/** Waves along y. */
export function waves(y: number, amp: number, len = 120, phase = 0) {
  let d = `M0 220V${y}`;
  for (let x = 0; x <= 1440; x += len) d += `Q${r1(x + len / 4)} ${r1(y - amp + phase)} ${r1(x + len / 2)} ${y}T${r1(x + len)} ${y}`;
  return `${d}V220Z`;
}

/** An n-pointed star centred on (cx, cy). */
export function star(cx: number, cy: number, R: number, n = 5, inner = 0.45) {
  return `M${Array.from({ length: n * 2 }, (_, i) => {
    const a = (i * Math.PI) / n - Math.PI / 2;
    const rad = i % 2 ? R * inner : R;
    return `${r1(cx + Math.cos(a) * rad)} ${r1(cy + Math.sin(a) * rad)}`;
  }).join("L")}Z`;
}

// Particle shapes, drawn in a 24 × 24 box.
export const PARTICLE = {
  maple:
    "M12 1l1.7 3.5 2.4-1.3-.7 4.5 3.2-2 .5 2.2 3.1-.5-1.3 3.3 1.7 1-4.8 3.9.5 2-4.7-.6-.3 4.5h-1.2l-.3-4.5-4.7.6.5-2-4.8-3.9 1.7-1-1.3-3.3 3.1.5.5-2.2 3.2 2-.7-4.5 2.4 1.3z",
  petal: "M12 2C17 6 18 13 12 22C6 13 7 6 12 2Z",
  dot: "M12 7a5 5 0 1 0 .01 0Z",
  flower:
    "M12 9.2a2.8 2.8 0 1 0 .01 0ZM12 1.5a3 3 0 0 1 3 3c0 1.7-1.6 3.6-3 4.7-1.4-1.1-3-3-3-4.7a3 3 0 0 1 3-3ZM12 22.5a3 3 0 0 1-3-3c0-1.7 1.6-3.6 3-4.7 1.4 1.1 3 3 3 4.7a3 3 0 0 1-3 3ZM1.5 12a3 3 0 0 1 3-3c1.7 0 3.6 1.6 4.7 3-1.1 1.4-3 3-4.7 3a3 3 0 0 1-3-3ZM22.5 12a3 3 0 0 1-3 3c-1.7 0-3.6-1.6-4.7-3 1.1-1.4 3-3 4.7-3a3 3 0 0 1 3 3Z",
};
