"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */

import * as React from "react";

/*
 * Duotone roster: a heavy display headline sits bottom-left on a burning colour field; beside it,
 * people hang in tall columns of portraits that drift slowly in opposite directions. Every photo is
 * pushed through one tritone built from the palette, so a set of different photos reads as one.
 * Point at, tab to or tap a portrait and it lifts out, colour bleeds back, and its chip unfolds
 * into a card. Below ~700px the columns become one drifting strip. Reduced motion keeps it still.
 * Adapted from the "Duotone Team Roster" component for this project (no shadcn needed).
 */

export type RosterPalette = {
  ground: string;
  deep: string;
  hot: string;
  glow: string;
  ink: string;
  shadow: string;
  highlight: string;
  mid?: string;
};

export type RosterPerson = {
  name: string;
  role: string;
  craft?: string;
  bio?: string;
  photo?: string;
  focus?: string;
  href?: string;
  linkLabel?: string;
  exposure?: number;
};

export type RosterLink = { label: string; href: string };

type Labels = { pause: string; play: string; team: string; memberLink: string };
const LABELS: Labels = {
  pause: "Pause",
  play: "Play",
  team: "Students",
  memberLink: "Read the story",
};

export type DuotoneRosterProps = {
  people: RosterPerson[];
  palette: RosterPalette;
  eyebrow?: string;
  /** Use "\n" to break lines; each line is fitted to the column. */
  title: string;
  intro?: string;
  cta?: RosterLink | null;
  secondaryCta?: RosterLink | null;
  columns?: number;
  driftSeconds?: number;
  height?: string;
  fontFamily?: string;
  stretch?: number;
  uppercase?: boolean;
  grain?: boolean;
  labels?: Partial<Labels>;
  className?: string;
};

function hexToUnit(hex: string) {
  let h = String(hex || "")
    .trim()
    .replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return [0, 0, 0];
  return [0, 2, 4].map(
    (i) => Math.round((parseInt(h.slice(i, i + 2), 16) / 255) * 1000) / 1000,
  );
}

function mixHex(a: string, b: string, t: number) {
  const x = hexToUnit(a);
  const y = hexToUnit(b);
  return (
    "#" +
    [0, 1, 2]
      .map((i) =>
        Math.round((x[i] + (y[i] - x[i]) * t) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function tritoneTables(shadow: string, mid: string, highlight: string) {
  const s = hexToUnit(shadow);
  const m = hexToUnit(mid);
  const h = hexToUnit(highlight);
  return [0, 1, 2].map((c) => s[c] + " " + m[c] + " " + h[c]);
}

function initials(name: string) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "?";
  return (
    parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

/** Deals people into columns round-robin, then pads short columns with repeats (flagged dup) so a loop never shows a gap. */
function dealColumns(count: number, columns: number, minPerColumn: number) {
  const cols = Math.max(1, Math.floor(columns) || 1);
  const deck = Array.from({ length: count }, (_, i) => i);
  const out: { index: number; dup: boolean }[][] = Array.from(
    { length: cols },
    () => [],
  );
  deck.forEach((d, i) => out[i % cols].push({ index: d, dup: false }));
  if (!deck.length) return out;
  for (let c = 0; c < cols; c++) {
    const from =
      cols === 1 ? 0 : (c + Math.floor(cols / 2) + (cols % 2 ? 1 : 0)) % cols;
    const pool = out[from]
      .filter((e) => !e.dup)
      .map((e) => e.index)
      .reverse();
    const candidates = pool.concat(deck.slice().reverse());
    let k = 0;
    let guard = 0;
    while (out[c].length < minPerColumn && guard < candidates.length * 3) {
      const d = candidates[k % candidates.length];
      k++;
      guard++;
      const clash = out[c].some((e) => e.index === d);
      if (clash && guard < candidates.length) continue;
      out[c].push({ index: d, dup: true });
    }
  }
  return out;
}

function fitTitleSize(
  available: number,
  widestAt100: number,
  stretch: number,
  min: number,
  max: number,
) {
  if (!(available > 0) || !(widestAt100 > 0)) return min;
  const size = (available / (widestAt100 * (stretch > 0 ? stretch : 1))) * 100;
  return Math.max(min, Math.min(max, Math.floor(size * 10) / 10));
}

function layoutFor(width: number, columns: number) {
  if (width > 0 && width < 700) return 0;
  const wanted = Math.max(2, Math.min(4, Math.round(columns) || 3));
  if (width > 0 && width < 1000) return 2;
  return wanted;
}

const splitLines = (title: string) =>
  String(title || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const css = `
.dtr{position:relative;isolation:isolate;overflow:hidden;width:100%;container-type:inline-size;color:var(--dtr-ink);background:var(--dtr-ground);-webkit-font-smoothing:antialiased;--dtr-ease:cubic-bezier(.23,1,.32,1);--dtr-gap:14px;--dtr-pad:clamp(20px,3.2cqw,48px)}
.dtr *,.dtr *::before,.dtr *::after{box-sizing:border-box}
.dtr-field{position:absolute;inset:0;z-index:-2;background:radial-gradient(38cqw 46cqw at 0% 100%,var(--dtr-ground) 0%,color-mix(in srgb,var(--dtr-ground) 55%,var(--dtr-deep)) 72%,transparent 100%),radial-gradient(70% 62% at 34% 36%,var(--dtr-glow) 0%,var(--dtr-hot) 26%,color-mix(in srgb,var(--dtr-hot) 55%,var(--dtr-deep)) 48%,transparent 78%),radial-gradient(60% 90% at 78% 30%,color-mix(in srgb,var(--dtr-hot) 70%,var(--dtr-deep)) 0%,transparent 70%),linear-gradient(98deg,var(--dtr-ground) 0%,var(--dtr-deep) 16%,transparent 42%),linear-gradient(0deg,var(--dtr-ground) 0%,color-mix(in srgb,var(--dtr-deep) 85%,transparent) 30%,transparent 62%),var(--dtr-deep)}
.dtr-grain{position:absolute;inset:-50%;z-index:-1;pointer-events:none;opacity:.2;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.6 -.35'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");background-size:220px 220px}
.dtr-defs{position:absolute;width:0;height:0;overflow:hidden;pointer-events:none}
.dtr-in{position:relative;display:grid;grid-template-columns:minmax(0,42fr) minmax(0,58fr);height:100%}
.dtr[data-cols="2"] .dtr-in{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.dtr-copy{position:relative;z-index:5;isolation:isolate;grid-row:1;grid-column:1;pointer-events:none;display:flex;flex-direction:column;justify-content:flex-end;padding:var(--dtr-pad);padding-right:clamp(16px,2cqw,32px);min-width:0}
.dtr-title{position:relative;margin:0;text-shadow:0 .02em .14em color-mix(in srgb,var(--dtr-ground) 30%,transparent);font-family:var(--dtr-display);font-weight:900;font-synthesis:none;line-height:.84;letter-spacing:-.035em;color:var(--dtr-ink);font-size:var(--dtr-ts,clamp(56px,9cqw,200px));text-transform:var(--dtr-case)}
.dtr-eyebrow{display:block;font-size:.36em;line-height:1;letter-spacing:-.01em;margin:0 0 .16em .02em;transform:scaleX(var(--dtr-stretch));transform-origin:0 50%;white-space:nowrap}
.dtr-line{display:block;clip-path:inset(-30% -400% 0 -10%);padding-bottom:.04em;margin-bottom:-.04em}
.dtr-line>span{display:inline-block;white-space:nowrap;transform:scaleX(var(--dtr-stretch));transform-origin:0 50%}
.dtr-line>span>span{display:inline-block;animation:dtr-line-in 900ms var(--dtr-ease) both;animation-delay:calc(120ms + var(--i,0) * 50ms)}
.dtr-intro,.dtr-actions{pointer-events:auto}
.dtr-intro{margin:clamp(18px,2.2cqw,28px) 0 0;max-width:38ch;font-size:clamp(15px,1.15cqw,17px);line-height:1.55;color:color-mix(in srgb,var(--dtr-ink) 86%,transparent);text-wrap:pretty}
.dtr-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin-top:clamp(20px,2.4cqw,30px)}
.dtr-cta{position:relative;display:inline-flex;align-items:center;gap:12px;height:50px;padding:0 22px 0 24px;border-radius:999px;background:var(--dtr-ink);color:var(--dtr-ground);font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;overflow:hidden;transition:transform 160ms var(--dtr-ease);outline:none}
.dtr-cta::before{content:"";position:absolute;inset:0;background:var(--dtr-glow);clip-path:inset(0 100% 0 0);transition:clip-path 280ms var(--dtr-ease)}
.dtr-cta>span{position:relative;z-index:1}
.dtr-cta-label{position:relative;display:inline-block;overflow:hidden;height:1.2em;line-height:1.2em}
.dtr-cta-label>span{display:block;transition:transform 260ms var(--dtr-ease)}
.dtr-cta-arrow{display:inline-block;transition:transform 260ms var(--dtr-ease)}
.dtr-cta:active{transform:scale(.97)}
.dtr-cta:focus-visible::before{clip-path:inset(0 0 0 0)}
.dtr-cta:focus-visible,.dtr-link:focus-visible,.dtr-pause:focus-visible,.dtr-panel a:focus-visible{outline:2px solid var(--dtr-ink);outline-offset:3px}
.dtr-link{color:var(--dtr-ink);font-size:14px;font-weight:600;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px;transition:text-underline-offset 220ms var(--dtr-ease);outline:none}
.dtr-wall{position:relative;z-index:1;grid-row:1;grid-column:2;display:grid;grid-template-columns:repeat(var(--dtr-cols),minmax(0,1fr));gap:var(--dtr-gap);padding:0 var(--dtr-pad) 0 clamp(8px,1cqw,16px);height:100%;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 5%,#000 95%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 5%,#000 95%,transparent 100%)}
.dtr-col{position:relative;min-width:0;animation:dtr-rise 1100ms var(--dtr-ease) both;animation-delay:calc(var(--ci) * 90ms)}
.dtr-track{display:flex;flex-direction:column;will-change:transform;transition:translate 280ms var(--dtr-ease);animation:dtr-up var(--dtr-dur) linear infinite;animation-delay:var(--dtr-phase)}
.dtr-col[data-dir="down"] .dtr-track{animation-name:dtr-down}
.dtr[data-paused] .dtr-track,.dtr[data-active] .dtr-track,.dtr[data-offscreen] .dtr-track,.dtr-wall:focus-within .dtr-track,.dtr[data-paused] .dtr-strip-track,.dtr[data-active] .dtr-strip-track,.dtr[data-offscreen] .dtr-strip-track,.dtr-strip:focus-within .dtr-strip-track{animation-play-state:paused}
.dtr-card{position:relative;container:dtrcard/inline-size;margin:0 0 var(--dtr-gap);aspect-ratio:3/4;border-radius:18px;transition:transform 260ms var(--dtr-ease);-webkit-tap-highlight-color:transparent}
.dtr-card::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;box-shadow:0 2px 6px color-mix(in srgb,var(--dtr-ground) 40%,transparent),0 18px 44px -12px color-mix(in srgb,var(--dtr-ground) 85%,transparent);opacity:0;transition:opacity 260ms ease;pointer-events:none}
.dtr-photo{position:absolute;inset:0;overflow:hidden;border-radius:18px;background:var(--dtr-deep);transition:opacity 260ms ease,filter 260ms ease}
.dtr-photo img{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;object-fit:cover;transition:transform 300ms var(--dtr-ease);transform-origin:50% 22%}
.dtr-card[data-on] .dtr-photo img{transform:scale(1.05)}
.dtr-hit{position:absolute;inset:0;z-index:1;margin:0;padding:0;border:0;border-radius:18px;background:transparent;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}
.dtr-hit:focus-visible{box-shadow:0 0 0 2px var(--dtr-ground),0 0 0 4px var(--dtr-ink)}
.dtr-true{opacity:0;transition:opacity 300ms ease}
.dtr-plate{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(90% 70% at 50% 35%,var(--dtr-hot),var(--dtr-deep) 70%,var(--dtr-ground));font-family:var(--dtr-display);font-weight:900;color:var(--dtr-ink);font-size:clamp(40px,7cqw,96px);letter-spacing:-.04em}
.dtr-card{--dtr-ct:calc(100% - 26px);--dtr-cr:calc(100% - var(--dtr-cw));--dtr-cb:0px;--dtr-cl:0px}
.dtr-chip,.dtr-panel{position:absolute;left:12px;bottom:12px;background:color-mix(in srgb,var(--dtr-ground) 92%,transparent);color:var(--dtr-ink);border-radius:999px}
.dtr-chip{padding:8px 12px 7px;font-size:11px;font-weight:700;line-height:1;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;max-width:calc(100% - 24px);overflow:hidden;text-overflow:ellipsis;transition:opacity 160ms ease}
.dtr-panel{z-index:2;right:12px;border-radius:14px;max-height:calc(100% - 24px);overflow:hidden;padding:12px 14px 13px;clip-path:inset(var(--dtr-ct) var(--dtr-cr) var(--dtr-cb) var(--dtr-cl) round 14px);opacity:0;visibility:hidden;transition:clip-path 200ms var(--dtr-ease),opacity 100ms ease 120ms,visibility 0s linear 220ms;pointer-events:none}
.dtr-col:first-child .dtr-chip{left:auto;right:12px}
.dtr-col:first-child .dtr-card{--dtr-cr:0px;--dtr-cl:calc(100% - var(--dtr-cw))}
.dtr-name{margin:0;font-size:clamp(15px,7cqw,19px);font-weight:800;line-height:1.15;letter-spacing:-.01em}
.dtr-roleline{margin:3px 0 0;font-size:13px;line-height:1.35;color:color-mix(in srgb,var(--dtr-ink) 78%,transparent)}
.dtr-bio{margin:6px 0 0;font-size:13px;line-height:1.4;font-style:italic;color:color-mix(in srgb,var(--dtr-ink) 92%,transparent)}
.dtr-panel a{display:inline-flex;align-items:center;gap:6px;margin-top:8px;color:var(--dtr-glow);font-size:13px;font-weight:700;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px;outline:none}
.dtr-panel a span{display:inline-block;transition:transform 260ms var(--dtr-ease)}
.dtr-card[data-on]{z-index:3;transform:translateY(-6px) scale(1.02)}
.dtr-card[data-on]::after{opacity:1}
.dtr-card[data-on] .dtr-true{opacity:.78}
.dtr-card[data-on] .dtr-chip{opacity:0;transition-duration:90ms}
.dtr-card[data-on] .dtr-panel{clip-path:inset(0 0 0 0 round 14px);opacity:1;visibility:visible;pointer-events:auto;transition:clip-path 300ms var(--dtr-ease),opacity 60ms ease,visibility 0s}
.dtr-title{transform-origin:0 100%;transition:transform 300ms var(--dtr-ease)}
.dtr[data-active-col="0"] .dtr-title{transform:scale(.84)}
.dtr[data-active] .dtr-card:not([data-on]) .dtr-photo{opacity:.42;filter:saturate(.7)}
.dtr[data-active] .dtr-card:not([data-on]) .dtr-chip{opacity:.5}
.dtr-pause{position:absolute;right:var(--dtr-pad);bottom:14px;z-index:6;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dtr-ink) 32%,transparent);display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 12px;border:0;border-radius:999px;background:color-mix(in srgb,var(--dtr-ground) 88%,transparent);color:var(--dtr-ink);font:700 11px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:transform 160ms var(--dtr-ease);outline:none}
.dtr-pause:active{transform:scale(.96)}
.dtr-pause i{display:inline-block;width:8px;height:9px;border-left:3px solid currentColor;border-right:3px solid currentColor}
.dtr[data-paused] .dtr-pause i{border-right:0;border-left:8px solid currentColor;border-top:4.5px solid transparent;border-bottom:4.5px solid transparent;width:0;height:0}
.dtr-strip{display:none}
.dtr[data-mode="strip"] .dtr-in{display:flex;flex-direction:column;height:auto}
.dtr[data-mode="strip"] .dtr-wall{display:none}
.dtr[data-mode="strip"] .dtr-strip{display:block;position:relative;order:-1;overflow:hidden;padding:20px 0 4px;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 6%,#000 94%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 6%,#000 94%,transparent 100%)}
.dtr-strip-track{display:flex;width:max-content;padding-left:20px;will-change:transform;transition:translate 280ms var(--dtr-ease);animation:dtr-left var(--dtr-sdur) linear infinite}
.dtr-strip .dtr-card{width:clamp(170px,56cqw,250px);margin:0 10px 0 0;flex:none}
.dtr[data-mode="strip"] .dtr-copy{padding:18px 20px 28px}
.dtr[data-mode="strip"] .dtr-pause{position:static;margin-left:auto}
@container dtrcard (max-width:229px){.dtr-bio{display:none}.dtr-panel{padding:9px 10px 10px}}
@keyframes dtr-up{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-50%,0)}}
@keyframes dtr-down{from{transform:translate3d(0,-50%,0)}to{transform:translate3d(0,0,0)}}
@keyframes dtr-left{from{transform:translate3d(0,0,0)}to{transform:translate3d(calc(-50% + 10px),0,0)}}
@keyframes dtr-rise{from{opacity:0;transform:translate3d(0,56px,0)}to{opacity:1;transform:none}}
@keyframes dtr-line-in{from{transform:translate3d(0,104%,0)}to{transform:none}}
@media (hover:hover) and (pointer:fine){
.dtr-cta:hover::before{clip-path:inset(0 0 0 0)}
.dtr-cta:hover .dtr-cta-label>span{transform:translateY(-100%)}
.dtr-cta:hover .dtr-cta-arrow{transform:translateX(4px)}
.dtr-link:hover{text-underline-offset:8px}
.dtr-panel a:hover span{transform:translate(2px,-2px)}
}
@media (prefers-reduced-motion:reduce){
.dtr-track,.dtr-strip-track{animation:none;transform:translate3d(0,calc(-50% * var(--dtr-rest,0)),0)}
.dtr-strip-track{transform:none}
.dtr-col,.dtr-line>span>span{animation:none}
.dtr-card,.dtr-panel,.dtr-cta-label>span,.dtr-cta-arrow{transition-duration:1ms}
.dtr-card[data-on],.dtr-card[data-on] .dtr-photo img{transform:none}
.dtr-title{transition-duration:1ms}
.dtr-pause{display:none}
}
`;

type Slot = { key: string; person: RosterPerson; dup: boolean };

/** Nudges a drifting column (or the strip) so a focused card is fully visible. */
function bringIntoView(card: HTMLElement) {
  const frame = card.closest(".dtr-wall, .dtr-strip") as HTMLElement | null;
  const track = card.closest(
    ".dtr-track, .dtr-strip-track",
  ) as HTMLElement | null;
  if (!frame || !track) return;
  const f = frame.getBoundingClientRect();
  const r = card.getBoundingClientRect();
  const vertical = track.classList.contains("dtr-track");
  const now = getComputedStyle(track).translate;
  const parts = !now || now === "none" ? ["0", "0"] : now.split(" ");
  let x = parseFloat(parts[0]) || 0;
  let y = parseFloat(parts[1] || "0") || 0;
  const m = 24;
  if (vertical) {
    if (r.top < f.top + m) y += f.top + m - r.top;
    else if (r.bottom > f.bottom - m) y -= r.bottom - (f.bottom - m);
  } else {
    if (r.left < f.left + m) x += f.left + m - r.left;
    else if (r.right > f.right - m) x -= r.right - (f.right - m);
  }
  track.style.translate = Math.round(x) + "px " + Math.round(y) + "px";
}

function releaseNudge(card: HTMLElement) {
  const track = card.closest(
    ".dtr-track, .dtr-strip-track",
  ) as HTMLElement | null;
  if (track) track.style.translate = "";
}

function Portrait({
  slot,
  on,
  filterId,
  labels,
  onEnter,
  onLeave,
  onToggle,
}: {
  slot: Slot;
  on: boolean;
  filterId: string;
  labels: Labels;
  onEnter: (key: string) => void;
  onLeave: (key: string) => void;
  onToggle: (key: string) => void;
}) {
  const [failed, setFailed] = React.useState(false);
  const pointer = React.useRef("mouse");
  const panelId = "p" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = slot.person;
  const hidden = slot.dup;
  const craft = p.craft || p.role;
  const photo = p.photo && !failed ? p.photo : "";
  const exposure = p.exposure && p.exposure > 0 ? p.exposure : 1;
  const focus = p.focus || "50% 22%";

  return (
    <div
      className="dtr-card"
      data-on={on ? "" : undefined}
      aria-hidden={hidden ? true : undefined}
      style={{
        ["--dtr-cw" as any]: Math.min(26, craft.length) * 0.74 + 2.6 + "em",
      }}
      onPointerDown={(e) => {
        pointer.current = e.pointerType;
      }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        bringIntoView(e.currentTarget);
        onEnter(slot.key);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        onLeave(slot.key);
        if (!e.currentTarget.contains(document.activeElement))
          releaseNudge(e.currentTarget);
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        onLeave(slot.key);
        releaseNudge(e.currentTarget);
      }}
    >
      <div className="dtr-photo">
        {photo ? (
          <>
            <img
              src={photo}
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{
                filter:
                  (exposure !== 1 ? "brightness(" + exposure + ") " : "") +
                  "url(#" +
                  filterId +
                  ")",
                objectPosition: focus,
              }}
              onError={() => setFailed(true)}
            />
            <img
              className="dtr-true"
              src={photo}
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{ objectPosition: focus }}
            />
          </>
        ) : (
          <div className="dtr-plate" aria-hidden="true">
            <span>{initials(p.name)}</span>
          </div>
        )}
      </div>
      <span className="dtr-chip" aria-hidden="true">
        {craft}
      </span>
      <button
        type="button"
        className="dtr-hit"
        tabIndex={hidden ? -1 : 0}
        aria-label={p.name + ", " + p.role}
        aria-expanded={hidden ? undefined : on}
        aria-controls={panelId}
        onFocus={(e) => {
          if (!e.currentTarget.matches(":focus-visible")) return;
          onEnter(slot.key);
          bringIntoView(e.currentTarget.parentElement as HTMLElement);
        }}
        onClick={(e) => {
          const card = e.currentTarget.parentElement as HTMLElement;
          if (e.detail === 0) {
            if (!on) {
              onEnter(slot.key);
              bringIntoView(card);
            } else {
              (
                card.querySelector(".dtr-panel a") as HTMLElement | null
              )?.focus();
            }
            return;
          }
          if (pointer.current === "mouse") {
            (
              card.querySelector(".dtr-panel a") as HTMLAnchorElement | null
            )?.click();
            return;
          }
          if (!on) bringIntoView(card);
          onToggle(slot.key);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") onLeave(slot.key);
        }}
      />
      <div
        className="dtr-panel"
        id={panelId}
        aria-hidden={on ? undefined : true}
        onKeyDown={(e) => {
          if (e.key !== "Escape") return;
          (
            e.currentTarget.parentElement?.querySelector(
              ".dtr-hit",
            ) as HTMLElement | null
          )?.focus();
          onLeave(slot.key);
        }}
      >
        <p className="dtr-name">{p.name}</p>
        <p className="dtr-roleline">{p.role}</p>
        {p.bio ? <p className="dtr-bio">{p.bio}</p> : null}
        {p.href ? (
          <a href={p.href} tabIndex={hidden || !on ? -1 : 0}>
            {p.linkLabel || labels.memberLink} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function DuotoneRoster({
  people,
  palette: pal,
  eyebrow,
  title,
  intro,
  cta = null,
  secondaryCta = null,
  columns = 3,
  driftSeconds = 9,
  height = "100svh",
  fontFamily = "var(--font-geist-sans), system-ui, sans-serif",
  stretch = 1,
  uppercase = true,
  grain = true,
  labels,
  className = "",
}: DuotoneRosterProps) {
  const text: Labels = { ...LABELS, ...(labels || {}) };
  const uid = "dtr" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = uid + "-tone";
  const titleId = uid + "-title";
  const rootRef = React.useRef<HTMLElement | null>(null);
  const copyRef = React.useRef<HTMLDivElement | null>(null);
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const [cols, setCols] = React.useState(layoutFor(0, columns));
  const [titleSize, setTitleSize] = React.useState(0);
  const [active, setActive] = React.useState<string | null>(null);
  const [paused, setPaused] = React.useState(false);
  const [outOfView, setOutOfView] = React.useState(false);
  const [tabHidden, setTabHidden] = React.useState(false);
  const [minPer, setMinPer] = React.useState(4);

  const lines = splitLines(title);
  const mid = pal.mid || mixHex(pal.hot, pal.highlight, 0.35);
  const tables = tritoneTables(
    mixHex(pal.shadow, pal.deep, 0.4),
    mid,
    mixHex(pal.highlight, pal.ink, 0.5),
  );
  const plan = React.useMemo(
    () => dealColumns(people.length, cols || 1, cols ? minPer : 0),
    [people.length, cols, minPer],
  );

  // Measure: choose the layout and fit the headline to its column.
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const copy = copyRef.current;
    const head = titleRef.current;
    if (!root || !copy || !head) return;
    const fit = () => {
      const w = root.getBoundingClientRect().width;
      const next = layoutFor(w, columns);
      setCols((c) => (c === next ? c : next));
      let widest = 0;
      const cur = parseFloat(getComputedStyle(head).fontSize) || 100;
      head.querySelectorAll(".dtr-line > span").forEach((s) => {
        widest = Math.max(widest, (s as HTMLElement).offsetWidth);
      });
      const cs = getComputedStyle(copy);
      const avail =
        copy.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight);
      const h = root.getBoundingClientRect().height;
      const strip = next === 0;
      if (next > 0) {
        const wallW = w * (next === 2 ? 0.5 : 0.58);
        const cardH = ((wallW - 14 * (next + 1)) / next) * (4 / 3) + 14;
        const need = Math.max(3, Math.ceil(h / Math.max(80, cardH)));
        setMinPer((m) => (m === need ? m : need));
      }
      const maxByHeight = strip
        ? 200
        : Math.max(56, (h * 0.52) / Math.max(1, lines.length + 0.45));
      setTitleSize(
        fitTitleSize(
          avail * (strip ? 1 : 1.12),
          (widest / cur) * 100,
          stretch,
          40,
          Math.min(240, maxByHeight),
        ),
      );
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    return () => ro.disconnect();
  }, [columns, stretch, title, fontFamily, uppercase, lines.length]);

  // Stop drifting while nobody can see it.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setOutOfView(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(root);
    const vis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const onEnter = React.useCallback((key: string) => setActive(key), []);
  const onLeave = React.useCallback(
    (key: string) => setActive((a) => (a === key ? null : a)),
    [],
  );
  const onToggle = React.useCallback(
    (key: string) => setActive((a) => (a === key ? null : key)),
    [],
  );

  // Tapping outside an unfolded card folds it.
  React.useEffect(() => {
    if (!active) return;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const t = e.target as HTMLElement | null;
      if (!t?.closest?.(".dtr-card")) setActive(null);
    };
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [active]);

  const rootStyle = {
    ["--dtr-ground" as any]: pal.ground,
    ["--dtr-deep" as any]: pal.deep,
    ["--dtr-hot" as any]: pal.hot,
    ["--dtr-glow" as any]: pal.glow,
    ["--dtr-ink" as any]: pal.ink,
    ["--dtr-display" as any]: fontFamily,
    ["--dtr-stretch" as any]: String(stretch),
    ["--dtr-case" as any]: uppercase ? "uppercase" : "none",
    ["--dtr-cols" as any]: String(cols || 1),
    ["--dtr-ts" as any]: titleSize ? titleSize + "px" : undefined,
    ["--dtr-sdur" as any]:
      Math.max(8, people.length * Math.max(1, driftSeconds) * 0.55) + "s",
    height: cols === 0 ? "auto" : height,
    minHeight: cols === 0 ? undefined : "640px",
  } as React.CSSProperties;

  const pauseButton = (
    <button
      type="button"
      className="dtr-pause"
      aria-pressed={paused}
      onClick={() => setPaused((p) => !p)}
    >
      <i aria-hidden="true" />
      {paused ? text.play : text.pause}
    </button>
  );
  const phases = [0, 0.38, 0.71, 0.18];
  const slotFor = (e: { index: number; dup: boolean }, key: string): Slot => ({
    key,
    person: people[e.index],
    dup: e.dup,
  });

  return (
    <section
      ref={rootRef}
      className={"dtr " + className}
      style={rootStyle}
      aria-labelledby={titleId}
      data-mode={cols === 0 ? "strip" : "columns"}
      data-cols={cols || undefined}
      data-active={active ? "" : undefined}
      data-active-col={active && cols !== 0 ? active.split("-")[0] : undefined}
      data-paused={paused ? "" : undefined}
      data-offscreen={outOfView || tabHidden ? "" : undefined}
    >
      <style>{css}</style>
      <svg className="dtr-defs" aria-hidden="true" focusable="false">
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 0.13 0.5 0.9 1" />
            <feFuncG type="table" tableValues="0 0.13 0.5 0.9 1" />
            <feFuncB type="table" tableValues="0 0.13 0.5 0.9 1" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="table" tableValues={tables[0]} />
            <feFuncG type="table" tableValues={tables[1]} />
            <feFuncB type="table" tableValues={tables[2]} />
          </feComponentTransfer>
        </filter>
      </svg>
      <div className="dtr-field" aria-hidden="true" />
      {grain ? <div className="dtr-grain" aria-hidden="true" /> : null}
      {cols !== 0 ? pauseButton : null}

      <div className="dtr-in">
        <div className="dtr-copy" ref={copyRef}>
          <h1 className="dtr-title" id={titleId} ref={titleRef}>
            {eyebrow ? <span className="dtr-eyebrow">{eyebrow} </span> : null}
            {lines.map((l, i) => (
              <span className="dtr-line" key={i} style={{ ["--i" as any]: i }}>
                <span>
                  <span>{l}</span>
                </span>
                {i < lines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          {intro ? <p className="dtr-intro">{intro}</p> : null}
          {cta || secondaryCta ? (
            <div className="dtr-actions">
              {cta ? (
                <a className="dtr-cta" href={cta.href}>
                  <span className="dtr-cta-label">
                    <span>{cta.label}</span>
                    <span aria-hidden="true">{cta.label}</span>
                  </span>
                  <span className="dtr-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ) : null}
              {secondaryCta ? (
                <a className="dtr-link" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              ) : null}
              {cols === 0 ? pauseButton : null}
            </div>
          ) : null}
        </div>

        {cols === 0 ? (
          <div className="dtr-strip" role="group" aria-label={text.team}>
            <div className="dtr-strip-track">
              {[0, 1].map((copy) =>
                plan[0].map((e, i) => {
                  const slot = slotFor(
                    { ...e, dup: e.dup || copy === 1 },
                    "s" + copy + "-" + i,
                  );
                  return (
                    <Portrait
                      key={slot.key}
                      slot={slot}
                      on={active === slot.key}
                      filterId={filterId}
                      labels={text}
                      onEnter={onEnter}
                      onLeave={onLeave}
                      onToggle={onToggle}
                    />
                  );
                }),
              )}
            </div>
          </div>
        ) : (
          <div className="dtr-wall" role="group" aria-label={text.team}>
            {plan.map((col, c) => {
              const dur = Math.max(6, col.length * Math.max(1, driftSeconds));
              const phase = phases[c % phases.length];
              return (
                <div
                  className="dtr-col"
                  key={c}
                  data-dir={c % 2 ? "down" : "up"}
                  style={{
                    ["--ci" as any]: c,
                    ["--dtr-dur" as any]: dur + "s",
                    ["--dtr-phase" as any]: -(dur * phase) + "s",
                    ["--dtr-rest" as any]: c % 2 ? 1 - phase : phase,
                  }}
                >
                  <div className="dtr-track">
                    {[0, 1].map((copy) =>
                      col.map((e, i) => {
                        const slot = slotFor(
                          { ...e, dup: e.dup || copy === 1 },
                          c + "-" + copy + "-" + i,
                        );
                        return (
                          <div key={slot.key}>
                            <Portrait
                              slot={slot}
                              on={active === slot.key}
                              filterId={filterId}
                              labels={text}
                              onEnter={onEnter}
                              onLeave={onLeave}
                              onToggle={onToggle}
                            />
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
