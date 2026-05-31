import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "loadervault",
    name: "LoaderVault",
    tagline: "Animation assets, curated for builders",
    description: "A premium library of loader animations, spinners, and progress indicators. Drag-and-drop ready, framework-agnostic, endlessly customisable.",
    url: "https://loadervault.wildwoodsway.com",
    tags: ["Design", "Animation", "UI"],
    status: "Live",
    accent: "#a8c090",
    year: "2024",
    icon: "◎",
  },
  {
    id: "elementos",
    name: "Elementos",
    tagline: "Component primitives, beautifully raw",
    description: "Unstyled, accessible React component primitives that give you complete creative control. Built on Radix foundations with zero opinion on your aesthetic.",
    url: "https://elementos.wildwoodsway.com",
    tags: ["React", "Components", "Open Source"],
    status: "Beta",
    accent: "#c4a882",
    year: "2025",
    icon: "⬡",
  },
  {
    id: "project-3",
    name: "Coming Soon",
    tagline: "Something new is growing",
    description: "A new project is taking shape in the wildwoods. Stay tuned — it will be worth the wait.",
    url: "#",
    tags: ["TBA"],
    status: "Soon",
    accent: "#8899aa",
    year: "2025",
    icon: "✦",
  },
];

/* ─────────────────────────────────────────────
   SEASONS CONFIG
───────────────────────────────────────────── */
const SEASONS = [
  {
    name: "Spring",
    label: "Spring · Renewal",
    leafFill: "#6dbf3e",
    leafFill2: "#9edd60",
    leafEdge: "#3a7a18",
    leafMid: "#82d048",
    veinColor: "#1e5010",
    veinColor2: "#c8f080",
    veinOpacity: 0.55,
    stemColor: "#4a7828",
    stemHighlight: "#a8e060",
    texture1: "#78cc44",
    texture2: "#b8f070",
    ringColor: "#8ecc60",
    spotColor: "#50a020",
  },
  {
    name: "Summer",
    label: "Summer · Abundance",
    leafFill: "#1e6e22",
    leafFill2: "#2a8830",
    leafEdge: "#0e4414",
    leafMid: "#247828",
    veinColor: "#d8f8b0",
    veinColor2: "#a0e080",
    veinOpacity: 0.45,
    stemColor: "#2a5018",
    stemHighlight: "#50a840",
    texture1: "#268030",
    texture2: "#40a848",
    ringColor: "#3a9840",
    spotColor: "#1a5020",
  },
  {
    name: "Fall",
    label: "Fall · Transformation",
    leafFill: "#c84818",
    leafFill2: "#e86820",
    leafEdge: "#7a1808",
    leafMid: "#d85820",
    veinColor: "#fce090",
    veinColor2: "#f8b840",
    veinOpacity: 0.58,
    stemColor: "#703010",
    stemHighlight: "#e89040",
    texture1: "#d86020",
    texture2: "#f09040",
    ringColor: "#d86828",
    spotColor: "#902010",
  },
  {
    name: "Winter",
    label: "Winter · Stillness",
    leafFill: "#6a4e30",
    leafFill2: "#7e6040",
    leafEdge: "#3e2818",
    leafMid: "#745838",
    veinColor: "#c0a880",
    veinColor2: "#a08868",
    veinOpacity: 0.42,
    stemColor: "#3e2e1c",
    stemHighlight: "#907050",
    texture1: "#5e4428",
    texture2: "#8a6848",
    ringColor: "#7a5e3a",
    spotColor: "#4a3420",
  },
];

/* ─────────────────────────────────────────────
   HOOK: intersection observer
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────────────
   TRUE CANADIAN MAPLE LEAF
   Based on the actual flag geometry — wide, 
   11-point, thick lobes. Fits in a ~170-unit radius.
   viewBox centered at 0,0 with tip at top.
───────────────────────────────────────────── */
function getMapleLeafPath() {
  // This traces the authentic Canadian flag maple leaf shape.
  // Wide body (~±85 at widest), tip at y=-85, base at y=+65, stem junction at y=+65.
  return `
    M 0,-85
    C 3,-76  12,-68  8,-58
    L 24,-66
    C 20,-54  11,-46  16,-38
    L 40,-50
    C 36,-34  20,-22  26,-12
    L 56,-22
    C 52,-10  36,0   40,10
    L 68,2
    C 62,16  44,22  42,32
    L 62,44
    C 52,50  36,48  34,58
    L 44,68
    C 32,68  16,62  10,68
    L 14,80
    C  6,76   2,70   0,66
    C -2,70  -6,76 -14,80
    L -10,68
    C -16,62 -32,68 -44,68
    L -34,58
    C -36,48 -52,50 -62,44
    L -42,32
    C -44,22 -62,16 -68,2
    L -40,10
    C -36,0  -52,-10 -56,-22
    L -26,-12
    C -20,-22 -36,-34 -40,-50
    L -16,-38
    C -11,-46 -20,-54 -24,-66
    L -8,-58
    C -12,-68 -3,-76 0,-85
    Z
  `;
}

/* ─────────────────────────────────────────────
   MAPLE LEAF SVG COMPONENT
───────────────────────────────────────────── */
function MapleLeaf({ season, growPhase }) {
  const s = SEASONS[season];
  const sid = `leaf${season}`;
  const P = getMapleLeafPath();
  const stemPath = `M 0,66 C -1,74 -1.5,82 -1,89 C -0.5,94 0.5,94 1,89 C 1.5,82 1,74 0,66 Z`;

  // Primary veins from stem junction upward
  const veins = [
    // Centre spine
    { d: "M 0,60 L 0,-70", w: 1.8, len: 132 },
    // Main left branch
    { d: "M 0,30 C -12,14 -28,2 -44,8", w: 1.2, len: 60 },
    // Main right branch
    { d: "M 0,30 C 12,14 28,2 44,8", w: 1.2, len: 60 },
    // Upper-left outer
    { d: "M -4,4 C -18,-10 -32,-20 -44,-16", w: 0.9, len: 52 },
    // Upper-right outer
    { d: "M 4,4 C 18,-10 32,-20 44,-16", w: 0.9, len: 52 },
    // Left mid
    { d: "M -2,-16 C -12,-28 -20,-38 -22,-50", w: 0.75, len: 44 },
    // Right mid
    { d: "M 2,-16 C 12,-28 20,-38 22,-50", w: 0.75, len: 44 },
    // Left upper
    { d: "M -1,-34 C -6,-44 -10,-54 -10,-66", w: 0.65, len: 38 },
    // Right upper
    { d: "M 1,-34 C 6,-44 10,-54 10,-66", w: 0.65, len: 38 },
    // Lower-left lobe
    { d: "M -14,42 C -22,38 -32,40 -38,36", w: 0.7, len: 30 },
    // Lower-right lobe
    { d: "M 14,42 C 22,38 32,40 38,36", w: 0.7, len: 30 },
    // Far-left small
    { d: "M -26,-6 C -34,-12 -40,-18 -42,-26", w: 0.6, len: 26 },
    // Far-right small
    { d: "M 26,-6 C 34,-12 40,-18 42,-26", w: 0.6, len: 26 },
  ];

  // Secondary veins — finer detail
  const subVeins = [
    { d: "M -10,18 C -16,10 -22,4 -26,-2", len: 22 },
    { d: "M 10,18 C 16,10 22,4 26,-2", len: 22 },
    { d: "M -6,-4 C -12,-14 -16,-22 -18,-30", len: 28 },
    { d: "M 6,-4 C 12,-14 16,-22 18,-30", len: 28 },
    { d: "M -8,-26 C -12,-34 -14,-42 -14,-50", len: 26 },
    { d: "M 8,-26 C 12,-34 14,-42 14,-50", len: 26 },
    { d: "M -28,4 C -34,0 -38,-6 -38,-14", len: 22 },
    { d: "M 28,4 C 34,0 38,-6 38,-14", len: 22 },
    { d: "M -18,30 C -24,26 -30,24 -34,20", len: 20 },
    { d: "M 18,30 C 24,26 30,24 34,20", len: 20 },
    { d: "M -2,48 C -6,44 -10,40 -14,36", len: 18 },
    { d: "M 2,48 C 6,44 10,40 14,36", len: 18 },
  ];

  // Surface spots — for organic texture
  const spots = [
    { cx: -20, cy: -18, rx: 12, ry: 7, rot: -35 },
    { cx: 22,  cy: -16, rx: 11, ry: 6, rot: 30  },
    { cx: -36, cy: -4,  rx: 9,  ry: 5, rot: -55 },
    { cx: 36,  cy: -6,  rx: 9,  ry: 5, rot: 50  },
    { cx: -8,  cy: 12,  rx: 13, ry: 6, rot: -15 },
    { cx: 10,  cy: 14,  rx: 12, ry: 6, rot: 18  },
    { cx: -2,  cy: -40, rx: 8,  ry: 4, rot: 5   },
    { cx: -18, cy: 36,  rx: 8,  ry: 4, rot: -25 },
    { cx: 20,  cy: 38,  rx: 8,  ry: 4, rot: 22  },
    { cx: -44, cy: -12, rx: 7,  ry: 3.5, rot: -65 },
    { cx: 44,  cy: -14, rx: 7,  ry: 3.5, rot: 58  },
    { cx: 0,   cy: -60, rx: 6,  ry: 3,  rot: 0   },
  ];

  return (
    <g
      width="100%" height="100%"
      viewBox="-90 -98 180 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Main leaf radial gradient — light upper-left to dark edge */}
        <radialGradient id={`lg${sid}`} cx="38%" cy="22%" r="75%">
          <stop offset="0%"  stopColor={s.texture2} />
          <stop offset="30%" stopColor={s.leafFill2} />
          <stop offset="70%" stopColor={s.leafFill} />
          <stop offset="100%" stopColor={s.leafEdge} />
        </radialGradient>
        {/* Secondary overlay — bottom glow for depth */}
        <radialGradient id={`ov${sid}`} cx="55%" cy="70%" r="65%">
          <stop offset="0%"  stopColor={s.leafMid}   stopOpacity="0.45" />
          <stop offset="60%" stopColor={s.leafEdge}  stopOpacity="0.12" />
          <stop offset="100%" stopColor={s.leafEdge} stopOpacity="0" />
        </radialGradient>
        {/* Rim-light — subtle bright edge at top-right */}
        <radialGradient id={`rl${sid}`} cx="75%" cy="15%" r="45%">
          <stop offset="0%"  stopColor={s.texture2} stopOpacity="0.35" />
          <stop offset="100%" stopColor={s.texture2} stopOpacity="0" />
        </radialGradient>
        {/* Stem gradient */}
        <linearGradient id={`sg${sid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={s.leafEdge}      stopOpacity="0.8" />
          <stop offset="40%"  stopColor={s.stemColor}     />
          <stop offset="100%" stopColor={s.stemHighlight} stopOpacity="0.6" />
        </linearGradient>
        {/* Drop shadow filter */}
        <filter id={`sh${sid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor={s.leafEdge} floodOpacity="0.55" />
        </filter>
        {/* Inner glow filter */}
        <filter id={`ig${sid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── OUTER GLOW HALO ── */}
      <path d={P}
        fill={s.leafFill}
        transform="scale(1.22)"
        style={{
          opacity: growPhase >= 7 ? 0.22 : 0,
          filter: "blur(16px)",
          transition: "opacity 1.2s ease, fill 1.8s ease",
        }}
      />

      {/* ── LEAF BODY with drop shadow ── */}
      <path d={P}
        fill={`url(#lg${sid})`}
        filter={`url(#sh${sid})`}
        style={{
          opacity: growPhase >= 2 ? 1 : 0,
          transform: growPhase >= 2 ? "scale(1)" : "scale(0.04)",
          transformOrigin: "0px -85px",
          transition:
            "opacity 1.2s cubic-bezier(0.16,1,0.3,1)," +
            "transform 1.6s cubic-bezier(0.16,1,0.3,1)," +
            "fill 1.8s ease",
        }}
      />

      {/* ── BOTTOM DEPTH OVERLAY ── */}
      <path d={P}
        fill={`url(#ov${sid})`}
        style={{
          opacity: growPhase >= 3 ? 0.7 : 0,
          transition: "opacity 0.9s ease 0.3s",
        }}
      />

      {/* ── RIM LIGHT ── */}
      <path d={P}
        fill={`url(#rl${sid})`}
        style={{
          opacity: growPhase >= 4 ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}
      />

      {/* ── SURFACE TEXTURE SPOTS ── */}
      {spots.map((t, i) => (
        <ellipse key={i}
          cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry}
          fill={s.spotColor}
          transform={`rotate(${t.rot},${t.cx},${t.cy})`}
          style={{
            opacity: growPhase >= 5 ? 0.09 : 0,
            transition: `opacity 0.5s ease ${0.04 * i}s`,
          }}
        />
      ))}

      {/* ── EDGE SERRATION HIGHLIGHT ── */}
      <path d={P}
        stroke={s.texture2}
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.28"
        style={{
          opacity: growPhase >= 4 ? 1 : 0,
          transition: "opacity 0.6s ease 0.25s, stroke 1.8s ease",
        }}
      />
      {/* Inner edge for thickness illusion */}
      <path d={P}
        stroke={s.leafEdge}
        strokeWidth="2.5"
        fill="none"
        strokeOpacity="0.22"
        transform="scale(0.97)"
        style={{
          opacity: growPhase >= 5 ? 1 : 0,
          transition: "opacity 0.5s ease 0.35s",
        }}
      />

      {/* ── PRIMARY VEINS ── */}
      {veins.map((v, i) => (
        <path key={i}
          d={v.d}
          stroke={i < 3 ? s.veinColor : s.veinColor2}
          strokeWidth={v.w}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={v.len}
          style={{
            strokeDashoffset: growPhase >= 4 ? 0 : v.len,
            opacity: i < 3 ? s.veinOpacity : s.veinOpacity * 0.75,
            transition:
              `stroke-dashoffset ${0.55 + i * 0.055}s cubic-bezier(0.16,1,0.3,1) ${0.04 * i}s,` +
              `stroke 1.8s ease`,
          }}
        />
      ))}

      {/* ── SECONDARY / SUB-VEINS ── */}
      {subVeins.map((v, i) => (
        <path key={i}
          d={v.d}
          stroke={s.veinColor2}
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={v.len}
          style={{
            strokeDashoffset: growPhase >= 5 ? 0 : v.len,
            opacity: s.veinOpacity * 0.5,
            transition:
              `stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1) ${0.35 + 0.04 * i}s,` +
              `stroke 1.8s ease`,
          }}
        />
      ))}

      {/* ── STEM ── */}
      <path d={stemPath}
        fill={`url(#sg${sid})`}
        style={{
          opacity: growPhase >= 2 ? 0.95 : 0,
          transform: growPhase >= 2 ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "0px 66px",
          transition:
            "opacity 0.7s ease," +
            "transform 0.9s cubic-bezier(0.16,1,0.3,1)," +
            "fill 1.8s ease",
        }}
      />
      {/* Stem highlight line */}
      <line x1="0.4" y1="68" x2="0" y2="87"
        stroke={s.stemHighlight}
        strokeWidth="0.6"
        strokeOpacity="0.5"
        strokeLinecap="round"
        style={{ opacity: growPhase >= 3 ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}
      />
    </g>
  );
}

/* ─────────────────────────────────────────────
   WILDWOODS EMBLEM
   Click or swipe to flip seasons (vertical-axis flip)
───────────────────────────────────────────── */
function WildwoodsEmblem({ size = 260, animate = false, mini = false }) {
  const [growPhase, setGrowPhase] = useState(0);
  useEffect(() => {
  if (!animate) return;
  const interval = setInterval(() => {
    setHint(false);
    setFlipping(true);
    setTimeout(() => setSeason(s => (s + 1) % 4), 210);
    setTimeout(() => setFlipping(false), 460);
  }, 3000);
  return () => clearInterval(interval);
}, [animate]);
  const [season, setSeason]       = useState(1);
  const [flipping, setFlipping]   = useState(false);
  const [hint, setHint]           = useState(true);
  const [dragState, setDragState] = useState(null);
  const svgRef = useRef(null);

  const s  = SEASONS[season];
  const id = mini ? "mi" : "hd";

  useEffect(() => {
    if (!animate) return;
    const ts = [
      setTimeout(() => setGrowPhase(1), 100),
      setTimeout(() => setGrowPhase(2), 300),
      setTimeout(() => setGrowPhase(3), 700),
      setTimeout(() => setGrowPhase(4), 1000),
      setTimeout(() => setGrowPhase(5), 1400),
      setTimeout(() => setGrowPhase(6), 1800),
      setTimeout(() => setGrowPhase(7), 2400),
    ];
    return () => ts.forEach(clearTimeout);
  }, [animate]);

  const doFlip = useCallback(() => {
    if (flipping || growPhase < 7) return;
    setHint(false);
    setFlipping(true);
    setTimeout(() => setSeason(s => (s + 1) % 4), 210);
    setTimeout(() => setFlipping(false), 460);
  }, [flipping, growPhase]);

  const onPointerDown = useCallback((e) => {
    if (growPhase < 7) return;
    setDragState({ startX: e.clientX });
  }, [growPhase]);

  useEffect(() => {
    if (!dragState) return;
    const onMove = (e) => {
      const dx = Math.abs(e.clientX - dragState.startX);
      if (dx > 26) { setDragState(null); doFlip(); }
    };
    const onUp = () => setDragState(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   onUp);
    };
  }, [dragState, doFlip]);

  // Leaf container: fits inside r=103 circle.
  // Leaf viewBox is -90..-90..180x205, so at scale ~0.92 the leaf spans ~165 units wide, ~188 tall.
  // We shift it up slightly so it centres visually (stem pulls centre of mass down).
  const leafScale = mini ? 0.22 : 0.90;
  const leafOffsetY = mini ? 2 : 55; // nudge up to account for stem

  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <svg
        ref={svgRef}
        width={size} height={size}
        viewBox="-130 -130 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "hidden",
          cursor:      growPhase >= 7 ? "pointer" : "default",
          userSelect:  "none",
          WebkitUserSelect: "none",
          touchAction: "none",
        }}
        onClick={doFlip}
        onPointerDown={onPointerDown}
      >
        <defs>
          <radialGradient id={`bg${id}`} cx="50%" cy="42%" r="55%">
            <stop offset="0%"   stopColor="#1a2218" />
            <stop offset="55%"  stopColor="#0d1210" />
            <stop offset="100%" stopColor="#070908" />
          </radialGradient>
          <radialGradient id={`bggl${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={s.leafFill} stopOpacity="0.18" />
            <stop offset="100%" stopColor={s.leafFill} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`rg${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor={s.ringColor} />
            <stop offset="50%"  stopColor={s.texture2} />
            <stop offset="100%" stopColor={s.ringColor} />
          </linearGradient>
        </defs>

        {/* ── BACKGROUND DISC ── */}
        <circle cx="0" cy="0" r="125"
          fill={`url(#bg${id})`}
          style={{ opacity: growPhase >= 1 ? 1 : 0, transition: "opacity 0.5s" }}
        />
        {/* Season colour glow */}
        <circle cx="0" cy="0" r="125"
          fill={`url(#bggl${id})`}
          style={{ opacity: growPhase >= 7 ? 1 : 0, transition: "opacity 1.6s ease, fill 1.8s ease" }}
        />

        {/* ── RINGS ── */}
        <circle cx="0" cy="0" r="122"
          stroke={`url(#rg${id})`} strokeWidth="0.7" strokeDasharray="2.5 8"
          style={{
            opacity: growPhase >= 1 ? 0.5 : 0,
            transition: "opacity 0.6s, stroke 1.8s ease",
            animation: animate && growPhase >= 7 ? "wwSpin 65s linear infinite" : "none",
            transformOrigin: "0px 0px",
          }}
        />
        <circle cx="0" cy="0" r="113"
          stroke={s.ringColor} strokeWidth="0.4" strokeDasharray="1 7"
          style={{
            opacity: growPhase >= 1 ? 0.22 : 0,
            transition: "opacity 0.6s 0.1s, stroke 1.8s ease",
            animation: animate && growPhase >= 7 ? "wwSpinR 42s linear infinite" : "none",
            transformOrigin: "0px 0px",
          }}
        />
        <circle cx="0" cy="0" r="104"
          stroke={s.ringColor} strokeWidth="1"
          style={{ opacity: growPhase >= 1 ? 0.14 : 0, transition: "opacity 0.5s, stroke 1.8s ease" }}
        />

        {/* ── ORNAMENTAL DOTS at r=104 ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          const isCard = deg % 90 === 0;
          return (
            <circle key={i}
              cx={104 * Math.cos(rad)} cy={104 * Math.sin(rad)}
              r={isCard ? 2.8 : 1.7}
              fill={isCard ? s.texture2 : s.ringColor}
              style={{
                opacity: growPhase >= 1 ? (isCard ? 0.72 : 0.38) : 0,
                transition: `opacity 0.4s ${0.04 * i}s ease, fill 1.8s ease`,
              }}
            />
          );
        })}

        {/* ── CARDINAL TICKS & DIAMOND TIPS ── */}
        {[[0, -104, 0, -120], [0, 104, 0, 120], [-104, 0, -120, 0], [104, 0, 120, 0]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={s.texture2} strokeWidth="0.9"
            style={{ opacity: growPhase >= 2 ? 0.44 : 0, transition: `opacity 0.4s ${0.08 * i}s ease, stroke 1.8s ease` }}
          />
        ))}
        {[[0, -124], [0, 124], [-124, 0], [124, 0]].map(([cx, cy], i) => (
          <polygon key={i}
            points={`${cx},${cy - 4.5} ${cx + 3},${cy} ${cx},${cy + 4.5} ${cx - 3},${cy}`}
            fill={s.texture2}
            style={{ opacity: growPhase >= 2 ? 0.55 : 0, transition: `opacity 0.4s ${0.08 * i}s ease, fill 1.8s ease` }}
          />
        ))}

        {/* ── 12 ORBIT MARKS ── */}
        {Array.from({ length: 12 }, (_, i) => {
          const rad = (i * 30 - 90) * Math.PI / 180;
          const major = i % 3 === 0;
          return (
            <text key={i}
              x={91 * Math.cos(rad)} y={91 * Math.sin(rad)}
              textAnchor="middle" dominantBaseline="central"
              fontFamily="serif"
              fontSize={major ? 8 : 5}
              fill={major ? s.texture2 : s.ringColor}
              style={{
                opacity: growPhase >= 3 ? (major ? 0.65 : 0.3) : 0,
                transition: `opacity 0.4s ${0.04 * i}s ease, fill 1.8s ease`,
              }}
            >{major ? "✦" : "·"}</text>
          );
        })}

        {/* ── MAPLE LEAF — scaled to fit inside circle ── */}
        <g
  style={{
    transform: flipping ? "scaleX(0)" : "scaleX(1)",
    transition: flipping ? "transform 0.21s ease-in" : "transform 0.24s ease-out",
    transformOrigin: "0px 0px",
  }}
>
  <g transform="scale(0.85) translate(0, -9)">
    <MapleLeaf season={season} growPhase={growPhase} />
  </g>
</g>

        {/* ── BOTTOM RULE (non-mini) ── */}
        {!mini && (
          <line x1="-80" y1="108" x2="80" y2="108"
            stroke={s.ringColor} strokeWidth="0.5"
            style={{ opacity: growPhase >= 7 ? 0.28 : 0, transition: "opacity 0.8s ease 0.3s, stroke 1.8s ease" }}
          />
        )}
      </svg>

      {/* ── HINT LABEL ── */}
      {!mini && growPhase >= 7 && hint && (
        <div style={{
          position: "absolute", bottom: -32,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.7rem", letterSpacing: "0.22em",
          color: s.ringColor, textTransform: "uppercase",
          opacity: 0.55, pointerEvents: "none",
          transition: "color 1.8s ease",
          animation: "hintPulse 2s ease-in-out infinite",
          whiteSpace: "nowrap",
        }}>
          ← seasons →
        </div>
      )}

      {/* ── SEASON LABEL ── */}
      {!mini && growPhase >= 7 && !hint && (
        <div style={{
          position: "absolute", bottom: -32,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.7rem", letterSpacing: "0.22em",
          color: s.ringColor, textTransform: "uppercase",
          opacity: 0.6, pointerEvents: "none",
          transition: "color 1.8s ease",
          whiteSpace: "nowrap",
        }}>
          {s.label}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
function Particles() {
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.7 + Math.random() * 2,
      speed: 14 + Math.random() * 28,
      delay: Math.random() * 10,
      opacity: 0.06 + Math.random() * 0.24,
      color: Math.random() > 0.55 ? "#c4a882" : "#a8c090",
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: p.color,
          opacity: p.opacity,
          animation: `float ${p.speed}s ${p.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const [phase, setPhase]   = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => setPhase(3), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.28;
  const fade     = Math.max(0, 1 - scrollY / 440);

  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: 640,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 72% 65% at 50% 35%, #182018 0%, #090b09 72%)",
        zIndex: 0,
      }} />
      <Particles />

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center",
        transform: `translateY(-${parallax}px)`, opacity: fade,
        padding: "0 20px", width: "100%", maxWidth: 560,
      }}>
        {/* Emblem */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.5) translateY(50px)",
          transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: 10,
        }}>
          <WildwoodsEmblem size={220} animate={phase >= 1} />
        </div>

        {/* Typography */}
        <div style={{
          textAlign: "center", marginTop: 36,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {/* WWW monogram */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", lineHeight: 0.9 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300,
              color: "#a8c090", opacity: 0.32,
              letterSpacing: "-0.06em", marginRight: "-0.08em",
            }}>W</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem,7vw,4.4rem)", fontWeight: 500,
              letterSpacing: "-0.06em",
              background: "linear-gradient(155deg, #e8d898 0%, #c4a860 55%, #a88848 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>W</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300,
              color: "#c4a882", opacity: 0.32,
              letterSpacing: "-0.06em", marginLeft: "-0.08em",
            }}>W</span>
          </div>

          {/* Name */}
          <div style={{
            marginTop: 8,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem,3vw,1.6rem)", fontWeight: 300,
            letterSpacing: "0.28em",
            background: "linear-gradient(135deg, #c8dab8 0%, #a0b888 50%, #bca07a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            WILDWOODSWAY
          </div>

          {/* Sub-labels */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(0.8rem,3vw,2rem)", marginTop: 6 }}>
            {["Wild", "Woods", "Way"].map((w, i) => (
              <span key={w} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.58rem,1.2vw,0.72rem)", letterSpacing: "0.32em",
                color: i === 1 ? "#c4a882" : "#7a8a68",
                textTransform: "uppercase", opacity: i === 1 ? 0.8 : 0.5,
              }}>{w}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          width: "min(280px, 75vw)", marginTop: 18,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #a8c09048)" }} />
          <span style={{ color: "#c4a882", fontSize: 8, fontFamily: "'Cormorant Garamond', serif", opacity: 0.6 }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #a8c09048)" }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "clamp(0.72rem,1.6vw,0.88rem)", letterSpacing: "0.24em",
          color: "#6a7860", textTransform: "uppercase",
          margin: "12px 0 0", textAlign: "center",
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}>
          A home for thoughtful digital craft
        </p>

        {/* Credit */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.62rem,1.2vw,0.76rem)", letterSpacing: "0.14em",
          color: "#344428", margin: "6px 0 0", textAlign: "center", fontStyle: "italic",
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.8s ease",
        }}>
          Architected by{" "}
          <span style={{ color: "#5a7a4a", fontStyle: "normal", letterSpacing: "0.1em" }}>
            Akhil Antony Joseph
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        opacity: phase >= 3 ? fade * 0.7 : 0, transition: "opacity 1s 0.5s", zIndex: 2,
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5, letterSpacing: "0.3em", color: "#3d4d38", textTransform: "uppercase" }}>Explore</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #4a5a44, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader() {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 10.5, letterSpacing: "0.4em", color: "#a8c090",
        textTransform: "uppercase", marginBottom: 14,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.7s ease 0.1s",
      }}>The Collection</p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 300,
        letterSpacing: "0.06em", color: "#e8e0d0", margin: "0 0 18px", lineHeight: 1.1,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}>Projects & Experiments</h2>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, justifyContent: "center",
        opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.4s",
      }}>
        <div style={{ width: 50, height: 1, background: "linear-gradient(to right, transparent, #4a5a44)" }} />
        <span style={{ color: "#4a5a44", fontSize: 9 }}>✦</span>
        <div style={{ width: 50, height: 1, background: "linear-gradient(to left, transparent, #4a5a44)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [ref, inView]     = useInView(0.1);
  const [hovered, setHovered]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const statusColors = { Live: "#a8c090", Beta: "#c4a882", Soon: "#8899aa" };

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(50px) scale(0.97)",
      transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        style={{
          position: "relative", borderRadius: 4, overflow: "hidden", cursor: "pointer",
          border: `1px solid ${hovered ? project.accent + "55" : "#1e2a1e"}`,
          background: hovered
            ? "linear-gradient(135deg,#111811,#0d100d)"
            : "linear-gradient(135deg,#0d100d,#090b09)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 55px rgba(0,0,0,0.6), 0 0 0 1px ${project.accent}22`
            : "0 4px 18px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{
          height: 170,
          background: `radial-gradient(ellipse 80% 80% at 50% 60%, ${project.accent}16 0%, transparent 70%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(${project.accent}08 1px, transparent 1px), linear-gradient(90deg, ${project.accent}08 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: hovered ? 1 : 0.4, transition: "opacity 0.5s",
          }} />
          <div style={{
            fontSize: 64, color: project.accent,
            opacity: hovered ? 0.9 : 0.5,
            transform: hovered ? "scale(1.12)" : "scale(1)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            fontFamily: "serif", lineHeight: 1,
            filter: hovered ? `drop-shadow(0 0 18px ${project.accent}88)` : "none",
          }}>{project.icon}</div>
          <div style={{
            position: "absolute", top: 14, right: 14, padding: "3px 10px", borderRadius: 2,
            border: `1px solid ${statusColors[project.status]}44`,
            background: `${statusColors[project.status]}11`,
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: statusColors[project.status],
          }}>{project.status}</div>
          <div style={{
            position: "absolute", top: 14, left: 14,
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5,
            letterSpacing: "0.15em", color: "#3a4a3a",
          }}>{project.year}</div>
        </div>

        <div style={{ padding: "24px 24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem",
              fontWeight: 400, letterSpacing: "0.05em", color: "#e8e0d0", margin: 0, lineHeight: 1,
            }}>{project.name}</h3>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              border: `1px solid ${project.accent}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: project.accent, fontSize: 14,
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              flexShrink: 0, marginLeft: 10,
            }}>+</div>
          </div>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: "0.9rem",
            color: "#6a7860", margin: "0 0 14px", fontStyle: "italic",
          }}>{project.tagline}</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: expanded ? 18 : 0 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: "2px 9px", border: `1px solid ${project.accent}25`, borderRadius: 2,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: project.accent, opacity: 0.8,
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ maxHeight: expanded ? 300 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={{ paddingTop: 18, borderTop: `1px solid ${project.accent}15` }}>
              <p style={{
                fontFamily: "'EB Garamond', serif", fontSize: "0.95rem",
                color: "#8a9a80", lineHeight: 1.7, margin: "0 0 18px",
              }}>{project.description}</p>
              {project.url !== "#" ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    padding: "9px 22px", border: `1px solid ${project.accent}`, borderRadius: 2,
                    background: "transparent", color: project.accent,
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.86rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    textDecoration: "none", transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = project.accent; e.currentTarget.style.color = "#0d100d"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = project.accent; }}
                >Visit Project <span style={{ fontSize: 15 }}>→</span></a>
              ) : (
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
                  letterSpacing: "0.2em", color: "#4a5a44", textTransform: "uppercase",
                }}>In development…</span>
              )}
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(to right, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────── */
function Projects() {
  return (
    <section style={{ padding: "100px 20px", maxWidth: 1060, margin: "0 auto" }}>
      <SectionHeader />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const [ref, inView] = useInView();
  return (
    <footer ref={ref} style={{
      padding: "50px 20px", borderTop: "1px solid #1a2a1a",
      textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease",
    }}>
      <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
        <WildwoodsEmblem size={58} mini animate={inView} />
      </div>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5,
        letterSpacing: "0.3em", color: "#3a4a3a", textTransform: "uppercase", margin: "0 0 7px",
      }}>wildwoodsway.com</p>
      <p style={{
        fontFamily: "'EB Garamond', serif", fontSize: "0.8rem",
        color: "#2a3a2a", margin: "0 0 8px", fontStyle: "italic",
      }}>Crafted with intention · {new Date().getFullYear()}</p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem",
        letterSpacing: "0.14em", color: "#3a4a34", margin: 0, fontStyle: "italic",
      }}>Architected by{" "}
        <span style={{ color: "#5a7a50", fontStyle: "normal" }}>Akhil Antony Joseph</span>
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function Cursor() {
  const dot     = useRef(null);
  const ring    = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.current.x - 15}px, ${ringPos.current.y - 15}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width: 6, height: 6, borderRadius: "50%", background: "#a8c090",
        pointerEvents: "none", willChange: "transform",
      }} />
      <div ref={ring} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9998,
        width: 30, height: 30, borderRadius: "50%",
        border: "1px solid rgba(168,192,144,0.35)",
        pointerEvents: "none", willChange: "transform",
      }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #090b09; color: #e8e0d0; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  ::selection { background: rgba(168,192,144,0.22); color: #e8e0d0; }

  @media (min-width: 768px) {
    html { cursor: none; }
    a    { cursor: none; }
  }

  @keyframes float {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(8px, -28px) scale(0.72); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.9; }
  }
  @keyframes wwSpin  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
  @keyframes wwSpinR { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
  @keyframes hintPulse {
    0%, 100% { opacity: 0.45; }
    50%      { opacity: 0.82; }
  }
    @keyframes fireflyFloat {
  0%   { transform: translate(0px, 0px) scale(1);    opacity: 0.9; }
  25%  { transform: translate(6px, -8px) scale(1.2); opacity: 0.4; }
  50%  { transform: translate(-4px, -14px) scale(0.8); opacity: 1; }
  75%  { transform: translate(8px, -6px) scale(1.1); opacity: 0.5; }
  100% { transform: translate(2px, -18px) scale(0.7); opacity: 0; }
}
`;

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <Cursor />
      <div style={{ minHeight: "100vh" }}>
        <Hero />
        <Projects />
        <Footer />
      </div>
    </>
  );
}