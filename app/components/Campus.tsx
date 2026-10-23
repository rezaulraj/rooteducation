// The institute that rises into the sunset behind the graduate.
// Pure SVG: wobbly "paint" edges come from a displacement filter, haze from heavy blurs,
// and the windows carry a separate glow layer that switches on as the building settles.

const bays = Array.from({ length: 6 }, (_, i) => 70 + i * 128);
const balusters = Array.from({ length: 44 }, (_, i) => 6 + i * 16);
const attic = Array.from({ length: 9 }, (_, i) => 150 + i * 72);

export default function Campus() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      overflow="visible"
      aria-hidden
    >
      <defs>
        <filter id="paint" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
        <filter id="haze" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4BE8C" />
          <stop offset="0.6" stopColor="#E09A66" />
          <stop offset="1" stopColor="#C97B4C" />
        </linearGradient>
        <linearGradient id="wall-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A65F3B" />
          <stop offset="1" stopColor="#C77D4C" />
        </linearGradient>
        {/* Sunset rim light from the left, haze rising from the base */}
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFE2B8" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#FFE2B8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="base-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#F7A774" stopOpacity="0" />
          <stop offset="1" stopColor="#F28A52" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2B48C" />
          <stop offset="1" stopColor="#F6C39E" />
        </linearGradient>
      </defs>

      {/* Distant tower, lost in the haze: sells the depth */}
      <g data-institute-far filter="url(#paint)" opacity="0.7">
        <g transform="translate(250 360) scale(0.75)">
          <rect x="0" y="60" width="70" height="320" fill="url(#far)" />
          <path d="M-8 60 L 35 0 L 78 60 Z" fill="#EFAE86" />
          <rect x="22" y="110" width="26" height="40" rx="13" fill="#E39A72" />
          <circle cx="35" cy="200" r="16" fill="#F8D2B2" />
          <rect x="-150" y="230" width="170" height="150" fill="url(#far)" />
          <path d="M-160 230 L -65 180 L 30 230 Z" fill="#EFAE86" />
          <rect x="90" y="250" width="200" height="130" fill="url(#far)" />
          <path d="M90 250 a100 70 0 0 1 200 0 Z" fill="#EFAE86" />
        </g>
      </g>

      {/* The institute */}
      <g data-institute>
        <g transform="translate(905 425) scale(0.9)">
          <g filter="url(#paint)">
            <polygon points="-80,70 0,40 0,420 -80,410" fill="url(#wall-side)" />
            <rect x="0" y="-6" width="720" height="46" fill="#E9AE74" />
            {attic.map((x) => (
              <path key={x} d={`M${x} 34 v-18 a12 12 0 0 1 24 0 v18 Z`} fill="#8E4F31" />
            ))}
            {/* tower */}
            <rect x="70" y="-120" width="120" height="118" fill="#EDB67E" />
            <rect x="70" y="-120" width="22" height="118" fill="#CC8552" />
            <path d="M58 -120 L 130 -176 L 202 -120 Z" fill="#E1A068" />
            <path d="M84 -132 L 130 -170 L 176 -132 Z" fill="#F3C892" opacity="0.7" />
            <rect x="58" y="-124" width="144" height="10" fill="#C08049" />
            <path d="M104 -20 v-46 a14 14 0 0 1 28 0 v46 Z" fill="#7E4228" />
            <path d="M146 -20 v-46 a14 14 0 0 1 28 0 v46 Z" fill="#7E4228" />
            {/* balustrade */}
            <rect x="-6" y="40" width="732" height="10" fill="#F6CF9E" />
            {balusters.map((x) => (
              <rect key={x} x={x} y="50" width="6" height="22" rx="2" fill="#D08B54" />
            ))}
            <rect x="-6" y="72" width="732" height="12" fill="#C9834E" />
            {/* main wall */}
            <rect x="0" y="84" width="720" height="336" fill="url(#wall)" />
            {bays.map((x) => (
              <g key={x}>
                <rect x={x - 40} y="84" width="16" height="336" fill="#F4C995" opacity="0.75" />
                <rect x={x - 26} y="84" width="5" height="336" fill="#B8733F" opacity="0.6" />
                <path d={`M${x} 360 v-150 a40 40 0 0 1 80 0 v150 Z`} fill="#6E3A22" />
                <path
                  d={`M${x + 40} 360 V170 M${x} 250 h80 M${x} 300 h80 M${x + 8} 205 a32 32 0 0 1 64 0`}
                  stroke="#F6D2A6"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.8"
                />
              </g>
            ))}
            {/* steps */}
            <rect x="-20" y="380" width="760" height="14" fill="#D9945F" />
            <rect x="-40" y="394" width="800" height="14" fill="#C9844F" />
            <rect x="0" y="-6" width="720" height="426" fill="url(#rim)" />
          </g>

          {/* Window light: blooms on as the building settles into place */}
          <g data-institute-glow opacity="0">
            <g filter="url(#glow)">
              {bays.map((x) => (
                <path key={x} d={`M${x} 360 v-150 a40 40 0 0 1 80 0 v150 Z`} fill="#FFB65C" />
              ))}
              <path d="M104 -20 v-46 a14 14 0 0 1 28 0 v46 Z M146 -20 v-46 a14 14 0 0 1 28 0 v46 Z" fill="#FFB65C" />
            </g>
            {bays.map((x) => (
              <path key={x} d={`M${x + 6} 356 v-146 a34 34 0 0 1 68 0 v146 Z`} fill="#FFD48F" opacity="0.85" />
            ))}
            {bays.map((x) => (
              <path
                key={`m${x}`}
                d={`M${x + 40} 360 V170 M${x} 250 h80 M${x} 300 h80`}
                stroke="#B4683A"
                strokeWidth="3"
                fill="none"
              />
            ))}
          </g>

          <rect x="-90" y="150" width="820" height="280" fill="url(#base-haze)" />
        </g>
      </g>

      {/* Warm haze pooling around the base, drifting slowly */}
      <g data-institute-mist filter="url(#haze)" opacity="0.85">
        <ellipse cx="1080" cy="760" rx="420" ry="70" fill="#F7A06A" />
        <ellipse cx="1260" cy="710" rx="220" ry="50" fill="#FFC596" />
        <ellipse cx="300" cy="700" rx="260" ry="50" fill="#FFC596" />
      </g>
    </svg>
  );
}
