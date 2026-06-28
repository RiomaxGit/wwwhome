import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   THEME PALETTES  (one per season)
───────────────────────────────────────────── */
const THEME_PALETTES = {
  spring: {
    name: "Spring",
    glyph: "◉",
    // backgrounds
    pageBg:        "#070908",
    heroRadial:    "#182018",
    sectionGlow:   "#1a2818",
    cardBg:        "#080a08",
    cardBgHover:   "#0d110d",
    // borders / rings
    border:        "#1e2a1e",
    borderHover:   "#3a5a2a",
    ring:          "#2a3a2a",
    // accent spectrum
    primary:       "#a8c090",   // headers, labels
    secondary:     "#c4d8a8",   // lighter accent
    muted:         "#6a8858",   // subdued
    faint:         "#3a5a2a",   // very dim
    // text
    textBright:    "#e8e4d8",
    textBody:      "#7a8a70",
    textDim:       "#4a5a44",
    textGhost:     "#2a3a2a",
    // cursor
    cursorDot:     "#a8c090",
    cursorRing:    "rgba(168,192,144,0.35)",
    // gradient stops for logo
    logoGrad:      "linear-gradient(135deg, #c8dab8 0%, #a0b888 50%, #bca07a 100%)",
    heroGrad:      "linear-gradient(155deg, #e8d898 0%, #c4a860 55%, #a88848 100%)",
    // footer border
    footerBorder:  "#1a2a1a",
    // selection
    selection:     "rgba(168,192,144,0.22)",
  },
  summer: {
    name: "Summer",
    glyph: "◎",
    pageBg:        "#060808",
    heroRadial:    "#0e1c10",
    sectionGlow:   "#0e1e10",
    cardBg:        "#070908",
    cardBgHover:   "#0b100b",
    border:        "#162216",
    borderHover:   "#245a28",
    ring:          "#1a2e1a",
    primary:       "#4caa5e",
    secondary:     "#80cc88",
    muted:         "#2a7a38",
    faint:         "#1a4a22",
    textBright:    "#ddeedd",
    textBody:      "#5a7a5e",
    textDim:       "#2e4a32",
    textGhost:     "#1a2e1e",
    cursorDot:     "#4caa5e",
    cursorRing:    "rgba(76,170,94,0.32)",
    logoGrad:      "linear-gradient(135deg, #a8ddb0 0%, #70b878 50%, #4a9858 100%)",
    heroGrad:      "linear-gradient(155deg, #c8e8c0 0%, #80c888 55%, #48a860 100%)",
    footerBorder:  "#162216",
    selection:     "rgba(76,170,94,0.2)",
  },
  fall: {
    name: "Fall",
    glyph: "◈",
    pageBg:        "#090806",
    heroRadial:    "#201408",
    sectionGlow:   "#201808",
    cardBg:        "#0a0806",
    cardBgHover:   "#120e08",
    border:        "#2a1e10",
    borderHover:   "#5a3010",
    ring:          "#3a2010",
    primary:       "#c87840",
    secondary:     "#e0a060",
    muted:         "#8a5020",
    faint:         "#4a2c10",
    textBright:    "#edddd0",
    textBody:      "#8a7060",
    textDim:       "#5a4030",
    textGhost:     "#3a2818",
    cursorDot:     "#c87840",
    cursorRing:    "rgba(200,120,64,0.32)",
    logoGrad:      "linear-gradient(135deg, #e8c8a0 0%, #c89060 50%, #a86030 100%)",
    heroGrad:      "linear-gradient(155deg, #f0d898 0%, #d8a060 55%, #b87040 100%)",
    footerBorder:  "#2a1e10",
    selection:     "rgba(200,120,64,0.2)",
  },
  winter: {
    name: "Winter",
    glyph: "◇",
    pageBg:        "#060708",
    heroRadial:    "#101418",
    sectionGlow:   "#101418",
    cardBg:        "#07080a",
    cardBgHover:   "#0c0e12",
    border:        "#1a1e24",
    borderHover:   "#303848",
    ring:          "#20262e",
    primary:       "#8aabcc",
    secondary:     "#a8c4e0",
    muted:         "#506a88",
    faint:         "#283848",
    textBright:    "#d8e0e8",
    textBody:      "#6a7a8a",
    textDim:       "#3a4858",
    textGhost:     "#202830",
    cursorDot:     "#8aabcc",
    cursorRing:    "rgba(138,171,204,0.32)",
    logoGrad:      "linear-gradient(135deg, #c8d8e8 0%, #98b8d0 50%, #6890b0 100%)",
    heroGrad:      "linear-gradient(155deg, #d8e8f8 0%, #a0c0e0 55%, #7098c0 100%)",
    footerBorder:  "#1a1e24",
    selection:     "rgba(138,171,204,0.2)",
  },
};

/* ─────────────────────────────────────────────
   THEME CONTEXT
───────────────────────────────────────────── */
import { createContext, useContext } from "react";
const ThemeContext = createContext(THEME_PALETTES.spring);
const useTheme = () => useContext(ThemeContext);



/* ─────────────────────────────────────────────
   WILD PATHS DATA
───────────────────────────────────────────── */
const WILD_PATHS = [
  {
    id: "technology",
    name: "Technology",
    tagline: "Building the tools of tomorrow",
    description:
      "From AI-native platforms to developer infrastructure — we build software that solves real problems at scale. Our technology ventures span developer tools, enterprise software, and AI integration layers that help teams ship faster and think clearer.",
    accent: "#a8c090",
    icon: "⬡",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    stat: { label: "Active Projects", value: "6" },
    tags: ["AI / ML", "Developer Tools", "Enterprise SaaS"],
    gradient: "linear-gradient(135deg, #1a2818 0%, #0d1210 100%)",
  },
  {
    id: "retail",
    name: "Retail",
    tagline: "Commerce with intention",
    description:
      "Retail concepts built around quality and longevity. We explore brands and products that respect the customer — thoughtfully sourced, purposefully designed, and built for more than a single season.",
    accent: "#c4a882",
    icon: "◈",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80",
    stat: { label: "Brands", value: "3" },
    tags: ["Consumer Goods", "Brand", "Direct-to-Consumer"],
    gradient: "linear-gradient(135deg, #221a0d 0%, #120f08 100%)",
  },
  {
    id: "logistics",
    name: "Logistics",
    tagline: "Moving things that matter",
    description:
      "Supply chain and logistics ventures that remove friction from the movement of goods. We back systems that bring transparency, reliability, and intelligence to how the world ships and receives.",
    accent: "#9ab4c8",
    icon: "◇",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    stat: { label: "Routes", value: "12" },
    tags: ["Supply Chain", "Freight", "Last Mile"],
    gradient: "linear-gradient(135deg, #0d1620 0%, #080d12 100%)",
  },
  {
    id: "education",
    name: "Education",
    tagline: "Knowledge, deeply rooted",
    description:
      "Learning experiences designed for depth over speed. From curriculum design to learning platforms, our education ventures believe that genuine understanding — not credentials — is the real product.",
    accent: "#d4a8c0",
    icon: "△",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
    stat: { label: "Learners", value: "2k+" },
    tags: ["EdTech", "Curriculum", "Skills"],
    gradient: "linear-gradient(135deg, #20121a 0%, #100810 100%)",
  },
  {
    id: "tourism",
    name: "Tourism",
    tagline: "Journeys that leave no trace",
    description:
      "Travel experiences that honour the places they touch. Our tourism ventures pursue a model where the traveller, the host, and the landscape all come out better for the encounter.",
    accent: "#a8c4b8",
    icon: "○",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    stat: { label: "Destinations", value: "8" },
    tags: ["Eco-Tourism", "Experiences", "Hospitality"],
    gradient: "linear-gradient(135deg, #0d1a16 0%, #08100d 100%)",
  },
  {
    id: "architecture",
    name: "Architecture",
    tagline: "Spaces that breathe",
    description:
      "Design and architecture projects grounded in environmental intelligence. We work on structures that respond to their context — in material, climate, and culture — rather than imposing upon it.",
    accent: "#c8b890",
    icon: "□",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80",
    stat: { label: "Projects", value: "4" },
    tags: ["Design", "Sustainable Build", "Urban"],
    gradient: "linear-gradient(135deg, #1a1810 0%, #100f08 100%)",
  },
  {
    id: "realestate",
    name: "Real Estate",
    tagline: "Land held with care",
    description:
      "Property ventures that think in decades, not quarters. We approach real estate as stewardship — acquiring, developing, and managing spaces that contribute to their communities rather than extracting from them.",
    accent: "#b8a8d4",
    icon: "◻",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
    stat: { label: "Properties", value: "9" },
    tags: ["Development", "Management", "Investment"],
    gradient: "linear-gradient(135deg, #14101e 0%, #0c0810 100%)",
  },
  {
    id: "wellness",
    name: "Wellness",
    tagline: "Slow health, deep roots",
    description:
      "Wellness concepts that resist the noise of the optimization industry. Our ventures in this space pursue stillness, resilience, and practices that compound over years — not apps that vanish in weeks.",
    accent: "#a8c4a0",
    icon: "✦",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=80",
    stat: { label: "Ventures", value: "2" },
    tags: ["Mental Health", "Physical", "Lifestyle"],
    gradient: "linear-gradient(135deg, #101a10 0%, #081008 100%)",
  },
];

/* ─────────────────────────────────────────────
   SEASONS CONFIG
───────────────────────────────────────────── */
const SEASONS = [
  {
    name: "Spring", label: "Spring · Renewal",
    leafFill: "#6dbf3e", leafFill2: "#9edd60", leafEdge: "#3a7a18", leafMid: "#82d048",
    veinColor: "#1e5010", veinColor2: "#c8f080", veinOpacity: 0.55,
    stemColor: "#4a7828", stemHighlight: "#a8e060",
    texture1: "#78cc44", texture2: "#b8f070", ringColor: "#8ecc60", spotColor: "#50a020",
  },
  {
    name: "Summer", label: "Summer · Abundance",
    leafFill: "#1e6e22", leafFill2: "#2a8830", leafEdge: "#0e4414", leafMid: "#247828",
    veinColor: "#d8f8b0", veinColor2: "#a0e080", veinOpacity: 0.45,
    stemColor: "#2a5018", stemHighlight: "#50a840",
    texture1: "#268030", texture2: "#40a848", ringColor: "#3a9840", spotColor: "#1a5020",
  },
  {
    name: "Fall", label: "Fall · Transformation",
    leafFill: "#c84818", leafFill2: "#e86820", leafEdge: "#7a1808", leafMid: "#d85820",
    veinColor: "#fce090", veinColor2: "#f8b840", veinOpacity: 0.58,
    stemColor: "#703010", stemHighlight: "#e89040",
    texture1: "#d86020", texture2: "#f09040", ringColor: "#d86828", spotColor: "#902010",
  },
  {
    name: "Winter", label: "Winter · Stillness",
    leafFill: "#6a4e30", leafFill2: "#7e6040", leafEdge: "#3e2818", leafMid: "#745838",
    veinColor: "#c0a880", veinColor2: "#a08868", veinOpacity: 0.42,
    stemColor: "#3e2e1c", stemHighlight: "#907050",
    texture1: "#5e4428", texture2: "#8a6848", ringColor: "#7a5e3a", spotColor: "#4a3420",
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
   MAPLE LEAF PATH
───────────────────────────────────────────── */
function getMapleLeafPath() {
  return `M 0,-85 C 3,-76 12,-68 8,-58 L 24,-66 C 20,-54 11,-46 16,-38 L 40,-50
    C 36,-34 20,-22 26,-12 L 56,-22 C 52,-10 36,0 40,10 L 68,2
    C 62,16 44,22 42,32 L 62,44 C 52,50 36,48 34,58 L 44,68
    C 32,68 16,62 10,68 L 14,80 C 6,76 2,70 0,66
    C -2,70 -6,76 -14,80 L -10,68 C -16,62 -32,68 -44,68 L -34,58
    C -36,48 -52,50 -62,44 L -42,32 C -44,22 -62,16 -68,2 L -40,10
    C -36,0 -52,-10 -56,-22 L -26,-12 C -20,-22 -36,-34 -40,-50 L -16,-38
    C -11,-46 -20,-54 -24,-66 L -8,-58 C -12,-68 -3,-76 0,-85 Z`;
}

/* ─────────────────────────────────────────────
   MAPLE LEAF SVG COMPONENT
───────────────────────────────────────────── */
function MapleLeaf({ season, growPhase }) {
  const s = SEASONS[season];
  const sid = `leaf${season}`;
  const P = getMapleLeafPath();
  const stemPath = `M 0,66 C -1,74 -1.5,82 -1,89 C -0.5,94 0.5,94 1,89 C 1.5,82 1,74 0,66 Z`;
  const veins = [
    { d: "M 0,60 L 0,-70", w: 1.8, len: 132 },
    { d: "M 0,30 C -12,14 -28,2 -44,8", w: 1.2, len: 60 },
    { d: "M 0,30 C 12,14 28,2 44,8", w: 1.2, len: 60 },
    { d: "M -4,4 C -18,-10 -32,-20 -44,-16", w: 0.9, len: 52 },
    { d: "M 4,4 C 18,-10 32,-20 44,-16", w: 0.9, len: 52 },
    { d: "M -2,-16 C -12,-28 -20,-38 -22,-50", w: 0.75, len: 44 },
    { d: "M 2,-16 C 12,-28 20,-38 22,-50", w: 0.75, len: 44 },
    { d: "M -1,-34 C -6,-44 -10,-54 -10,-66", w: 0.65, len: 38 },
    { d: "M 1,-34 C 6,-44 10,-54 10,-66", w: 0.65, len: 38 },
    { d: "M -14,42 C -22,38 -32,40 -38,36", w: 0.7, len: 30 },
    { d: "M 14,42 C 22,38 32,40 38,36", w: 0.7, len: 30 },
    { d: "M -26,-6 C -34,-12 -40,-18 -42,-26", w: 0.6, len: 26 },
    { d: "M 26,-6 C 34,-12 40,-18 42,-26", w: 0.6, len: 26 },
  ];
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
  ];
  const spots = [
    { cx: -20, cy: -18, rx: 12, ry: 7, rot: -35 },
    { cx: 22, cy: -16, rx: 11, ry: 6, rot: 30 },
    { cx: -36, cy: -4, rx: 9, ry: 5, rot: -55 },
    { cx: 36, cy: -6, rx: 9, ry: 5, rot: 50 },
    { cx: -8, cy: 12, rx: 13, ry: 6, rot: -15 },
    { cx: 10, cy: 14, rx: 12, ry: 6, rot: 18 },
    { cx: -2, cy: -40, rx: 8, ry: 4, rot: 5 },
    { cx: -18, cy: 36, rx: 8, ry: 4, rot: -25 },
    { cx: 20, cy: 38, rx: 8, ry: 4, rot: 22 },
  ];
  return (
    <g style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`lg${sid}`} cx="38%" cy="22%" r="75%">
          <stop offset="0%" stopColor={s.texture2} />
          <stop offset="30%" stopColor={s.leafFill2} />
          <stop offset="70%" stopColor={s.leafFill} />
          <stop offset="100%" stopColor={s.leafEdge} />
        </radialGradient>
        <radialGradient id={`ov${sid}`} cx="55%" cy="70%" r="65%">
          <stop offset="0%" stopColor={s.leafMid} stopOpacity="0.45" />
          <stop offset="100%" stopColor={s.leafEdge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`rl${sid}`} cx="75%" cy="15%" r="45%">
          <stop offset="0%" stopColor={s.texture2} stopOpacity="0.35" />
          <stop offset="100%" stopColor={s.texture2} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`sg${sid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={s.leafEdge} stopOpacity="0.8" />
          <stop offset="40%" stopColor={s.stemColor} />
          <stop offset="100%" stopColor={s.stemHighlight} stopOpacity="0.6" />
        </linearGradient>
        <filter id={`sh${sid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor={s.leafEdge} floodOpacity="0.55" />
        </filter>
      </defs>
      <path d={P} fill={s.leafFill} transform="scale(1.22)"
        style={{ opacity: growPhase >= 7 ? 0.22 : 0, filter: "blur(16px)", transition: "opacity 1.2s ease, fill 1.8s ease" }} />
      <path d={P} fill={`url(#lg${sid})`} filter={`url(#sh${sid})`}
        style={{
          opacity: growPhase >= 2 ? 1 : 0,
          transform: growPhase >= 2 ? "scale(1)" : "scale(0.04)",
          transformOrigin: "0px -85px",
          transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1), fill 1.8s ease",
        }} />
      <path d={P} fill={`url(#ov${sid})`}
        style={{ opacity: growPhase >= 3 ? 0.7 : 0, transition: "opacity 0.9s ease 0.3s" }} />
      <path d={P} fill={`url(#rl${sid})`}
        style={{ opacity: growPhase >= 4 ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }} />
      {spots.map((t, i) => (
        <ellipse key={i} cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry} fill={s.spotColor}
          transform={`rotate(${t.rot},${t.cx},${t.cy})`}
          style={{ opacity: growPhase >= 5 ? 0.09 : 0, transition: `opacity 0.5s ease ${0.04 * i}s` }} />
      ))}
      <path d={P} stroke={s.texture2} strokeWidth="1" fill="none" strokeOpacity="0.28"
        style={{ opacity: growPhase >= 4 ? 1 : 0, transition: "opacity 0.6s ease 0.25s" }} />
      <path d={P} stroke={s.leafEdge} strokeWidth="2.5" fill="none" strokeOpacity="0.22" transform="scale(0.97)"
        style={{ opacity: growPhase >= 5 ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }} />
      {veins.map((v, i) => (
        <path key={i} d={v.d} stroke={i < 3 ? s.veinColor : s.veinColor2} strokeWidth={v.w}
          strokeLinecap="round" fill="none" strokeDasharray={v.len}
          style={{
            strokeDashoffset: growPhase >= 4 ? 0 : v.len,
            opacity: i < 3 ? s.veinOpacity : s.veinOpacity * 0.75,
            transition: `stroke-dashoffset ${0.55 + i * 0.055}s cubic-bezier(0.16,1,0.3,1) ${0.04 * i}s, stroke 1.8s ease`,
          }} />
      ))}
      {subVeins.map((v, i) => (
        <path key={i} d={v.d} stroke={s.veinColor2} strokeWidth="0.5" strokeLinecap="round"
          fill="none" strokeDasharray={v.len}
          style={{
            strokeDashoffset: growPhase >= 5 ? 0 : v.len,
            opacity: s.veinOpacity * 0.5,
            transition: `stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1) ${0.35 + 0.04 * i}s`,
          }} />
      ))}
      <path d={stemPath} fill={`url(#sg${sid})`}
        style={{
          opacity: growPhase >= 2 ? 0.95 : 0,
          transform: growPhase >= 2 ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "0px 66px",
          transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1), fill 1.8s ease",
        }} />
    </g>
  );
}

/* ─────────────────────────────────────────────
   WILDWOODS EMBLEM
───────────────────────────────────────────── */
function WildwoodsEmblem({ size = 260, animate = false, mini = false }) {
  const [growPhase, setGrowPhase] = useState(0);
  const [season, setSeason] = useState(1);
  const [hint, setHint] = useState(true);
  const leafRef = useRef(null);
  const rafRef = useRef(null);
  const degRef = useRef(0);
  const firedRef = useRef(false);

  const s = SEASONS[season];
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

  useEffect(() => {
    if (!animate || growPhase < 7) return;
    const speed = 0.5;
    const tick = () => {
      degRef.current = (degRef.current + speed) % 360;
      const rad = (degRef.current * Math.PI) / 180;
      const scaleX = Math.cos(rad);
      if (leafRef.current) {
        leafRef.current.style.transform = `scaleX(${scaleX})`;
      }
      const nearEdge = Math.abs(scaleX) < 0.08;
      if (nearEdge && !firedRef.current) {
        firedRef.current = true;
        setHint(false);
        setSeason(prev => (prev + 1) % 4);
      }
      if (!nearEdge) {
        firedRef.current = false;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, growPhase]);

  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <svg
        width={size} height={size}
        viewBox="-130 -130 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "hidden", userSelect: "none", WebkitUserSelect: "none" }}
      >
        <defs>
          <radialGradient id={`bg${id}`} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#1a2218" />
            <stop offset="55%" stopColor="#0d1210" />
            <stop offset="100%" stopColor="#070908" />
          </radialGradient>
          <radialGradient id={`bggl${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={s.leafFill} stopOpacity="0.18" />
            <stop offset="100%" stopColor={s.leafFill} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`rg${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={s.ringColor} />
            <stop offset="50%" stopColor={s.texture2} />
            <stop offset="100%" stopColor={s.ringColor} />
          </linearGradient>
        </defs>

        <circle cx="0" cy="0" r="125" fill={`url(#bg${id})`}
          style={{ opacity: growPhase >= 1 ? 1 : 0, transition: "opacity 0.5s" }} />
        <circle cx="0" cy="0" r="125" fill={`url(#bggl${id})`}
          style={{ opacity: growPhase >= 7 ? 1 : 0, transition: "opacity 1.6s ease, fill 1.8s ease" }} />

        <circle cx="0" cy="0" r="122" stroke={`url(#rg${id})`} strokeWidth="0.7" strokeDasharray="2.5 8"
          style={{ opacity: growPhase >= 1 ? 0.5 : 0, transition: "opacity 0.6s, stroke 1.8s ease" }} />
        <circle cx="0" cy="0" r="113" stroke={s.ringColor} strokeWidth="0.4" strokeDasharray="1 7"
          style={{ opacity: growPhase >= 1 ? 0.22 : 0, transition: "opacity 0.6s, stroke 1.8s ease" }} />
        <circle cx="0" cy="0" r="104" stroke={s.ringColor} strokeWidth="1"
          style={{ opacity: growPhase >= 1 ? 0.14 : 0, transition: "opacity 0.5s, stroke 1.8s ease" }} />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          const isCard = deg % 90 === 0;
          return (
            <circle key={i} cx={104 * Math.cos(rad)} cy={104 * Math.sin(rad)} r={isCard ? 2.8 : 1.7}
              fill={isCard ? s.texture2 : s.ringColor}
              style={{ opacity: growPhase >= 1 ? (isCard ? 0.72 : 0.38) : 0, transition: `opacity 0.4s ${0.04 * i}s ease, fill 1.8s ease` }} />
          );
        })}

        {[[0, -104, 0, -120], [0, 104, 0, 120], [-104, 0, -120, 0], [104, 0, 120, 0]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.texture2} strokeWidth="0.9"
            style={{ opacity: growPhase >= 2 ? 0.44 : 0, transition: `opacity 0.4s ${0.08 * i}s ease, stroke 1.8s ease` }} />
        ))}
        {[[0, -124], [0, 124], [-124, 0], [124, 0]].map(([cx, cy], i) => (
          <polygon key={i} points={`${cx},${cy - 4.5} ${cx + 3},${cy} ${cx},${cy + 4.5} ${cx - 3},${cy}`}
            fill={s.texture2}
            style={{ opacity: growPhase >= 2 ? 0.55 : 0, transition: `opacity 0.4s ${0.08 * i}s ease, fill 1.8s ease` }} />
        ))}

        {Array.from({ length: 12 }, (_, i) => {
          const rad = (i * 30 - 90) * Math.PI / 180;
          const major = i % 3 === 0;
          return (
            <text key={i} x={91 * Math.cos(rad)} y={91 * Math.sin(rad)}
              textAnchor="middle" dominantBaseline="central" fontFamily="serif"
              fontSize={major ? 8 : 5} fill={major ? s.texture2 : s.ringColor}
              style={{ opacity: growPhase >= 3 ? (major ? 0.65 : 0.3) : 0, transition: `opacity 0.4s ${0.04 * i}s ease, fill 1.8s ease` }}>
              {major ? "✦" : "·"}
            </text>
          );
        })}

        <g ref={leafRef} style={{ transformOrigin: "0px 0px", willChange: "transform" }}>
          <g transform="scale(0.85) translate(0, -9)">
            <MapleLeaf season={season} growPhase={growPhase} />
          </g>
        </g>

        {!mini && (
          <line x1="-80" y1="108" x2="80" y2="108" stroke={s.ringColor} strokeWidth="0.5"
            style={{ opacity: growPhase >= 7 ? 0.28 : 0, transition: "opacity 0.8s ease 0.3s, stroke 1.8s ease" }} />
        )}
      </svg>

      {!mini && growPhase >= 7 && hint && (
        <div style={{
          position: "absolute", bottom: -32,
          fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.22em",
          color: s.ringColor, textTransform: "uppercase", opacity: 0.55, pointerEvents: "none",
          transition: "color 1.8s ease", animation: "hintPulse 2s ease-in-out infinite", whiteSpace: "nowrap",
        }}>rotating · seasons</div>
      )}
      {!mini && growPhase >= 7 && !hint && (
        <div style={{
          position: "absolute", bottom: -32,
          fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.22em",
          color: s.ringColor, textTransform: "uppercase", opacity: 0.6, pointerEvents: "none",
          transition: "color 1.8s ease", whiteSpace: "nowrap",
        }}>{s.label}</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
function Particles() {
  const t = useTheme();
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 0.7 + Math.random() * 2, speed: 14 + Math.random() * 28,
      delay: Math.random() * 10, opacity: 0.06 + Math.random() * 0.24,
      color: Math.random() > 0.55 ? "#c4a882" : "#a8c090",
    }))
  ).current;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: p.id % 2 === 0 ? t.secondary : t.primary, opacity: p.opacity,
          transition: "background 0.8s ease",
          animation: `float ${p.speed}s ${p.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}


/* ─────────────────────────────────────────────
   HOOK: window size
───────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

/* ─────────────────────────────────────────────
   PATH POPUP MODAL
───────────────────────────────────────────── */
function PathPopup({ path, onClose }) {
  const t = useTheme();
  const winWidth = useWindowWidth();
  const isMobile = winWidth < 768;
  const url = `https://${path.id}.wildwoodsway.com`;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div style={{
        position: "relative",
        width: isMobile ? "100%" : "min(520px, 92vw)",
        maxHeight: isMobile ? "88vh" : "90vh",
        borderRadius: isMobile ? "20px 20px 0 0" : 20,
        background: t.cardBg,
        border: `1px solid ${path.accent}30`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        animation: isMobile ? "slideUpModal 0.38s cubic-bezier(0.16,1,0.3,1)" : "popIn 0.38s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px ${path.accent}18`,
      }}>
        {/* Image header */}
        <div style={{ position: "relative", height: isMobile ? 200 : 240, flexShrink: 0 }}>
          <img
            src={path.image}
            alt={path.name}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55) saturate(0.7)",
              display: "block",
            }}
          />
          {/* Gradient scrim */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${t.cardBg} 0%, transparent 55%), linear-gradient(160deg, ${path.accent}22 0%, transparent 50%)`,
          }} />
          {/* Icon */}
          <div style={{
            position: "absolute", top: 16, left: 20,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.2rem", color: path.accent, opacity: 0.7, lineHeight: 1,
          }}>{path.icon}</div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 14, right: 14,
              width: 34, height: 34, borderRadius: "50%",
              border: `1px solid ${path.accent}40`,
              background: `${t.pageBg}cc`,
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: path.accent, fontSize: 16, lineHeight: 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${path.accent}22`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${t.pageBg}cc`; }}
          >×</button>
          {/* Name overlay on image */}
          <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.65rem", letterSpacing: "0.4em",
              color: path.accent, textTransform: "uppercase",
              margin: "0 0 4px", opacity: 0.8,
            }}>WildWoodsWay · {String(path.id)}</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 300, letterSpacing: "0.04em",
              color: t.textBright, margin: 0, lineHeight: 1,
            }}>{path.name}</h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "22px 24px 28px",
        }}>
          {/* Tagline */}
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "1.05rem",
            color: path.accent,
            fontStyle: "italic",
            margin: "0 0 16px",
            lineHeight: 1.4,
            opacity: 0.9,
          }}>{path.tagline}</p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
            {path.tags.map(tag => (
              <span key={tag} style={{
                padding: "3px 11px",
                border: `1px solid ${path.accent}28`,
                borderRadius: 20,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: path.accent,
                background: `${path.accent}0c`,
              }}>{tag}</span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: `linear-gradient(to right, ${path.accent}25, transparent)`, marginBottom: 18 }} />

          {/* Description */}
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "0.97rem",
            color: t.textBody,
            lineHeight: 1.85,
            margin: "0 0 22px",
          }}>{path.description}</p>

          {/* Stat */}
          <div style={{
            display: "inline-flex", alignItems: "baseline", gap: 8,
            padding: "10px 18px",
            borderRadius: 12,
            border: `1px solid ${path.accent}20`,
            background: `${path.accent}08`,
            marginBottom: 24,
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem", fontWeight: 400,
              color: path.accent, lineHeight: 1,
            }}>{path.stat.value}</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 10, letterSpacing: "0.2em",
              color: t.textDim, textTransform: "uppercase",
            }}>{path.stat.label}</span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "13px 20px",
                borderRadius: 14,
                border: `1px solid ${path.accent}`,
                background: `${path.accent}14`,
                color: path.accent,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.85rem", letterSpacing: "0.22em",
                textTransform: "uppercase", textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = path.accent; e.currentTarget.style.color = t.pageBg; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${path.accent}14`; e.currentTarget.style.color = path.accent; }}
            >
              Visit {path.name} <span style={{ fontSize: 14 }}>↗</span>
            </a>
            <button
              onClick={onClose}
              style={{
                padding: "13px 18px",
                borderRadius: 14,
                border: `1px solid ${t.border}`,
                background: "none",
                color: t.textDim,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.85rem", letterSpacing: "0.18em",
                textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.muted; e.currentTarget.style.color = t.textBody; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textDim; }}
            >Close</button>
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{
          height: 2, flexShrink: 0,
          background: `linear-gradient(to right, transparent, ${path.accent}, transparent)`,
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WILD PATH CARD — unified immersive tile
───────────────────────────────────────────── */
function WildPathCard({ path, index, onOpen }) {
  const [ref, inView] = useInView(0.06);
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const winWidth = useWindowWidth();
  const isMobile = winWidth < 768;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const col = index % 4;
  const row = Math.floor(index / 4);
  const delay = col * 0.07 + row * 0.15;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(60px) scale(0.96)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div
        ref={cardRef}
        onClick={() => onOpen(path)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          borderRadius: isMobile ? 14 : 20,
          overflow: "hidden",
          cursor: "pointer",
          aspectRatio: isMobile ? "3/4" : "3/4",
          background: "#080a08",
          border: `1px solid ${hovered ? path.accent + "55" : "#1a241a44"}`,
          transition: "border-color 0.5s ease, box-shadow 0.5s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: hovered
            ? `0 28px 65px rgba(0,0,0,0.75), inset 0 0 0 1px ${path.accent}18`
            : "0 3px 16px rgba(0,0,0,0.4)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Background image */}
        <img
          src={path.image}
          alt={path.name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: `brightness(${hovered ? 0.48 : 0.3}) saturate(${hovered ? 0.75 : 0.5})`,
            transform: hovered ? "scale(1.07)" : "scale(1.02)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Cursor spotlight — desktop only */}
        {!isMobile && (
          <div style={{
            position: "absolute", inset: 0,
            background: hovered
              ? `radial-gradient(circle 200px at ${cursorPos.x}% ${cursorPos.y}%, ${path.accent}20 0%, transparent 70%)`
              : "none",
            pointerEvents: "none",
          }} />
        )}

        {/* Bottom gradient scrim */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, #060808 0%, #060808cc 35%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        {/* Accent top tint */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, ${path.accent}14 0%, transparent 45%)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }} />

        {/* Content — clean & minimal */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: isMobile ? "12px 12px 16px" : "18px 20px 22px",
        }}>
          {/* Top: index + tap hint */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.6rem", letterSpacing: "0.32em",
              color: path.accent, opacity: 0.6, textTransform: "uppercase",
            }}>{String(index + 1).padStart(2, "0")}</span>

            {/* Info icon — always visible, morphs to arrow on hover */}
            <div style={{
              width: isMobile ? 24 : 28,
              height: isMobile ? 24 : 28,
              borderRadius: "50%",
              border: `1px solid ${path.accent}${hovered ? "80" : "35"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: hovered ? `${path.accent}20` : `${path.accent}0a`,
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <span style={{
                color: path.accent,
                fontSize: isMobile ? 11 : 12,
                lineHeight: 1,
                transition: "all 0.35s ease",
                display: "block",
                transform: hovered ? "translateY(-0.5px)" : "none",
              }}>{hovered ? "↗" : "+"}</span>
            </div>
          </div>

          {/* Bottom: name + tagline only */}
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "1.2rem" : "1.65rem",
              fontWeight: 400, letterSpacing: "0.03em",
              color: "#ece4d4",
              margin: "0 0 4px", lineHeight: 1.05,
              transition: "transform 0.4s ease",
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
            }}>{path.name}</h3>

            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: isMobile ? "0.75rem" : "0.85rem",
              color: path.accent,
              margin: 0, fontStyle: "italic",
              opacity: 0.8, lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{path.tagline}</p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(to right, transparent, ${path.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
          transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />

        {/* Desktop cursor dot */}
        {hovered && !isMobile && (
          <div style={{
            position: "absolute",
            left: `${cursorPos.x}%`, top: `${cursorPos.y}%`,
            width: 5, height: 5, borderRadius: "50%",
            background: path.accent,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            boxShadow: `0 0 10px ${path.accent}88`,
          }} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WILD PATHS SECTION
───────────────────────────────────────────── */
function WildPaths() {
  const t = useTheme();
  const [headerRef, headerInView] = useInView(0.05);
  const winWidth = useWindowWidth();
  const isMobile = winWidth < 768;
  const [activePopup, setActivePopup] = useState(null);

  return (
    <section style={{
      position: "relative",
      padding: isMobile ? "80px 14px 80px" : "130px 20px 110px",
      overflow: "hidden",
    }}>
      {/* Ambient hairline top */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "70%", height: 1,
        background: `linear-gradient(to right, transparent, ${t.primary}28, transparent)`,
        pointerEvents: "none",
        transition: "background 0.8s ease",
      }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 44 : 80,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 10,
            letterSpacing: "0.44em",
            color: t.primary,
            textTransform: "uppercase",
            marginBottom: 14,
            opacity: 0.8,
            transition: "color 0.8s ease",
          }}>The Wild Paths</p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? "2.2rem" : "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "#e8e0d0",
            margin: "0 0 16px",
            lineHeight: 1,
          }}>Where We Branch</h2>

          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: isMobile ? "0.92rem" : "1.05rem",
            color: t.textDim,
            maxWidth: 440,
            margin: "0 auto 22px",
            lineHeight: 1.8,
            fontStyle: "italic",
            padding: isMobile ? "0 8px" : 0,
            transition: "color 0.8s ease",
          }}>
            From a single root, many branches reach outward — each carrying the same quiet intention.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <div style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${t.textDim}50)`, transition: "background 0.8s ease" }} />
            <span style={{ color: t.ring, fontSize: 8, transition: "color 0.8s ease" }}>✦</span>
            <div style={{ width: 40, height: 1, background: `linear-gradient(to left, transparent, ${t.textDim}50)`, transition: "background 0.8s ease" }} />
          </div>
        </div>

        {/* Grid */}
        <div className="paths-grid">
          {WILD_PATHS.map((path, i) => (
            <WildPathCard key={path.id} path={path} index={i} onOpen={setActivePopup} />
          ))}
        </div>
        {activePopup && (
          <PathPopup path={activePopup} onClose={() => setActivePopup(null)} />
        )}

        {/* Footer line */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 18, marginTop: isMobile ? 44 : 64, opacity: 0.28,
        }}>
          <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${t.textDim})`, transition: "background 0.8s ease" }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem", letterSpacing: "0.34em",
            color: t.textDim, textTransform: "uppercase", transition: "color 0.8s ease",
          }}>{WILD_PATHS.length} paths · always growing</span>
          <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${t.textDim})`, transition: "background 0.8s ease" }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOUNDER SECTION
───────────────────────────────────────────── */
function Founder() {
  const t = useTheme();
  const [ref, inView] = useInView(0.08);
  const [imgRef, imgInView] = useInView(0.1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ position: "relative", padding: "120px 20px 130px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 60% at 15% 50%, ${t.sectionGlow} 0%, transparent 70%)`,
        transition: "background 0.8s ease",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div ref={ref} style={{
          marginBottom: 64,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s ease",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: "0.4em",
            color: t.primary, textTransform: "uppercase", marginBottom: 14, transition: "color 0.8s ease",
          }}>The Founder</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: t.textBright,
            margin: "0 0 20px",
            lineHeight: 1.05,
            transition: "color 0.8s ease",
          }}>The person<br/>behind the paths.</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 1, background: `linear-gradient(to right, ${t.primary}44, transparent)`, transition: "background 0.8s ease" }} />
            <span style={{ color: t.faint, fontSize: 9, transition: "color 0.8s ease" }}>✦</span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : "clamp(40px,6vw,100px)",
          alignItems: isMobile ? "start" : "center",
        }}>

          <div ref={imgRef} style={{
            position: "relative",
            opacity: imgInView ? 1 : 0,
            transform: imgInView ? "translateX(0)" : isMobile ? "translateY(20px)" : "translateX(-40px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            <div style={{
              position: "absolute", inset: -30,
              background: "radial-gradient(ellipse at center, #3a5a2888 0%, transparent 70%)",
              filter: "blur(24px)", borderRadius: "50%",
            }} />
            <div style={{ position: "relative", borderRadius: isMobile ? 16 : 24, overflow: "hidden" }}>
              <img
                src="./founder.jpg"
                alt="Akhil Antony Joseph"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                  maskImage: isMobile ? "none" : "linear-gradient(to bottom, black 55%, transparent 100%)",
                  WebkitMaskImage: isMobile ? "none" : "linear-gradient(to bottom, black 55%, transparent 100%)",
                  filter: isMobile ? "brightness(0.9)" : "brightness(0.75) saturate(0.7)",
                  mixBlendMode: isMobile ? "normal" : "luminosity",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(160deg, ${t.sectionGlow}88 0%, ${t.pageBg}ee 85%)`,
                mixBlendMode: "multiply",
              }} />
            </div>
          </div>

          <div style={{
            opacity: imgInView ? 1 : 0,
            transform: imgInView ? "translateX(0)" : isMobile ? "translateY(20px)" : "translateX(40px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300,
              letterSpacing: "0.06em", color: "#e8e0d0", margin: "0 0 4px", lineHeight: 1.1,
            }}>Akhil Antony Joseph</h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem",
              letterSpacing: "0.3em", color: t.primary, textTransform: "uppercase", transition: "color 0.8s ease",
              margin: "0 0 28px",
            }}>Founder · Architect · Builder</p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 32, height: 1, background: `${t.primary}33`, transition: "background 0.8s ease" }} />
              <span style={{ color: t.ring, fontSize: 8, transition: "color 0.8s ease" }}>✦</span>
            </div>

            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: "clamp(1rem,1.8vw,1.1rem)",
              color: t.textBody, lineHeight: 1.9, letterSpacing: "0.02em", transition: "color 0.8s ease",
            }}>
              <p style={{ margin: "0 0 18px" }}>
                I've spent my career at the intersection of quality and creation. Starting as a QA engineer across OTT, e-commerce, and POS platforms across Asia, the Middle East, and North America — I trained myself to see failure modes before they happened. That discipline became the foundation of everything I build.
              </p>
              <p style={{ margin: "0 0 18px" }}>
                The move into entrepreneurship wasn't a leap — it was the next logical step. Every bug I filed was a product insight waiting to become a better business. I stopped fixing what others built and started building what the market was missing: ventures in technology, retail, logistics, education, tourism, architecture, real estate, and wellness — each one grounded in the same principle: slow thinking, durable execution.
              </p>
              <p style={{ margin: "0 0 18px" }}>
                WildWoodsWay is the holding force behind all of it — not a conglomerate, but a philosophy made concrete. Every path we take here is built to compound. We don't optimise for the exit. We build for the decade.
              </p>
              <p style={{ margin: 0, fontStyle: "italic", color: t.muted, transition: "color 0.8s ease" }}>
                "Most founders want to move fast. I want to move right. The forest doesn't rush — and neither do we."
              </p>
            </div>

            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Venture Building", "Capital Allocation", "Systems Architecture", "Brand Strategy", "Product Engineering", "Operational Design"].map((sk, i) => (
                <span key={i} style={{
                  padding: "5px 14px", borderRadius: 20,
                  border: `1px solid ${t.ring}`, background: t.cardBg,
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
                  letterSpacing: "0.16em", color: t.muted, textTransform: "uppercase", transition: "color 0.8s ease",
                }}>{sk}</span>
              ))}
            </div>

            <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
              {[
                { label: "GitHub", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter / X", href: "#" },
              ].map((link) => (
                <a key={link.label} href={link.href}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem",
                    letterSpacing: "0.2em", color: t.textDim, textDecoration: "none",
                    textTransform: "uppercase", transition: "color 0.3s",
                    paddingBottom: 2, borderBottom: `1px solid ${t.ring}`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = t.primary; e.currentTarget.style.borderBottomColor = t.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.color = t.textDim; e.currentTarget.style.borderBottomColor = t.ring; }}
                >{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const t = useTheme();
  const [phase, setPhase] = useState(0);
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
  const fade = Math.max(0, 1 - scrollY / 440);

  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: 640,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 72% 65% at 50% 35%, ${t.heroRadial} 0%, ${t.pageBg} 72%)`,
        zIndex: 0,
        transition: "background 0.8s ease",
      }} />
      <Particles />

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center",
        transform: `translateY(-${parallax}px)`, opacity: fade,
        padding: "0 20px", width: "100%", maxWidth: 560,
      }}>
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.5) translateY(50px)",
          transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: 10,
        }}>
          <WildwoodsEmblem size={220} animate={phase >= 1} />
        </div>

        <div style={{
          textAlign: "center", marginTop: 36,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", lineHeight: 0.9 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300,
              color: t.primary, opacity: 0.32, letterSpacing: "-0.06em", marginRight: "-0.08em", transition: "color 0.8s ease",
            }}>W</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem,7vw,4.4rem)", fontWeight: 500, letterSpacing: "-0.06em",
              color: t.secondary,
              transition: "color 0.8s ease",
            }}>W</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300,
              color: t.secondary, opacity: 0.32, letterSpacing: "-0.06em", marginLeft: "-0.08em", transition: "color 0.8s ease",
            }}>W</span>
          </div>
          <div style={{
            marginTop: 8,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem,3vw,1.6rem)", fontWeight: 300, letterSpacing: "0.28em",
            color: t.primary,
            transition: "color 0.8s ease",
            display: "block",
          }}>WILDWOODSWAY</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(0.8rem,3vw,2rem)", marginTop: 6 }}>
            {["Wild", "Woods", "Way"].map((w, i) => (
              <span key={w} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.58rem,1.2vw,0.72rem)", letterSpacing: "0.32em",
                color: i === 1 ? t.secondary : t.muted, textTransform: "uppercase", transition: "color 0.8s ease",
                opacity: i === 1 ? 0.8 : 0.5,
              }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 12, width: "min(280px, 75vw)", marginTop: 18,
          opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${t.primary}48)`, transition: "background 0.8s ease" }} />
          <span style={{ color: t.secondary, fontSize: 8, fontFamily: "'Cormorant Garamond', serif", opacity: 0.6, transition: "color 0.8s ease" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${t.primary}48)`, transition: "background 0.8s ease" }} />
        </div>

        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: "clamp(0.72rem,1.6vw,0.88rem)",
          letterSpacing: "0.24em", color: t.muted, textTransform: "uppercase", transition: "color 0.8s ease",
          margin: "12px 0 0", textAlign: "center",
          opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}>Many paths. One intention. Built to endure.</p>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.62rem,1.2vw,0.76rem)",
          letterSpacing: "0.14em", color: t.faint, margin: "6px 0 0", textAlign: "center", fontStyle: "italic", transition: "color 0.8s ease",
          opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.8s ease",
        }}>
          Architected by{" "}
          <span style={{ color: t.muted, fontStyle: "normal", letterSpacing: "0.1em", transition: "color 0.8s ease" }}>Akhil Antony Joseph</span>
        </p>
      </div>

      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        opacity: phase >= 3 ? fade * 0.7 : 0, transition: "opacity 1s 0.5s", zIndex: 2,
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5, letterSpacing: "0.3em", color: t.textDim, textTransform: "uppercase", transition: "color 0.8s ease" }}>Explore</span>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${t.textDim}, transparent)`, animation: "scrollPulse 2s ease-in-out infinite", transition: "background 0.8s ease" }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const [ref, inView] = useInView();
  const t = useTheme();
  return (
    <footer ref={ref} style={{
      padding: "50px 20px", borderTop: `1px solid ${t.footerBorder}`, textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease",
    }}>
      <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
        <WildwoodsEmblem size={58} mini animate={inView} />
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: "0.3em", color: t.textDim, textTransform: "uppercase", margin: "0 0 7px", transition: "color 0.8s ease" }}>wildwoodsway.com</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.8rem", color: t.textGhost, margin: "0 0 8px", fontStyle: "italic", transition: "color 0.8s ease" }}>Crafted with intention · {new Date().getFullYear()}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.14em", color: t.textGhost, margin: 0, fontStyle: "italic", transition: "color 0.8s ease" }}>
        Architected by{" "}
        <span style={{ color: t.muted, fontStyle: "normal", transition: "color 0.8s ease" }}>Akhil Antony Joseph</span>
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function Cursor() {
  const t = useTheme();
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.current.x - 15}px, ${ringPos.current.y - 15}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, width: 6, height: 6, borderRadius: "50%", background: t.cursorDot, pointerEvents: "none", willChange: "transform", transition: "background 0.8s ease" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, zIndex: 9998, width: 30, height: 30, borderRadius: "50%", border: `1px solid ${t.cursorRing}`, pointerEvents: "none", willChange: "transform", transition: "border-color 0.8s ease" }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   SEASON TOGGLE
───────────────────────────────────────────── */
function SeasonToggle({ current, onChange }) {
  const seasons = Object.keys(THEME_PALETTES);
  const [expanded, setExpanded] = useState(false);
  const t = THEME_PALETTES[current];

  return (
    <div style={{
      position: "fixed",
      bottom: 28,
      right: 24,
      zIndex: 8000,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 10,
    }}>
      {/* Season pills — appear when expanded */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
        opacity: expanded ? 1 : 0,
        transform: expanded ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
        pointerEvents: expanded ? "auto" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {seasons.map((key, i) => {
          const p = THEME_PALETTES[key];
          const active = key === current;
          return (
            <button
              key={key}
              onClick={() => { onChange(key); setExpanded(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px 8px 12px",
                borderRadius: 28,
                border: `1px solid ${active ? p.primary + "cc" : p.primary + "30"}`,
                background: active
                  ? `${p.primary}18`
                  : `${p.pageBg}ee`,
                backdropFilter: "blur(12px)",
                cursor: "pointer",
                opacity: expanded ? 1 : 0,
                transform: expanded ? "translateX(0)" : "translateX(20px)",
                transition: `all 0.35s cubic-bezier(0.16,1,0.3,1) ${(seasons.length - 1 - i) * 0.055}s`,
                boxShadow: active ? `0 0 18px ${p.primary}28` : "none",
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: p.primary,
                boxShadow: active ? `0 0 8px ${p.primary}` : "none",
                flexShrink: 0,
                transition: "box-shadow 0.3s",
              }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.72rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: active ? p.primary : p.muted,
                transition: "color 0.3s",
              }}>{p.name}</span>
              {active && (
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 10,
                  color: p.primary,
                  opacity: 0.7,
                  marginLeft: 2,
                }}>{p.glyph}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(v => !v)}
        title="Change season theme"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: `1px solid ${t.primary}55`,
          background: `${t.pageBg}f0`,
          backdropFilter: "blur(16px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: expanded
            ? `0 0 0 3px ${t.primary}22, 0 8px 32px rgba(0,0,0,0.5)`
            : `0 4px 20px rgba(0,0,0,0.4)`,
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        {/* Leaf icon */}
        <svg width="20" height="20" viewBox="-12 -14 24 24" fill="none">
          <path
            d="M 0,-12 C 1,-10 4,-8 3,-6 L 6,-8 C 5,-5 2,-3 4,-1 L 9,-4 C 8,-1 4,1 5,3 L 10,1 C 9,4 5,5 5,8 L 8,9 C 6,10 4,9 3,11 L 5,12 C 2,12 0,10 0,10 C 0,10 -2,12 -5,12 L -3,11 C -4,9 -6,10 -8,9 L -5,8 C -5,5 -9,4 -10,1 L -5,3 C -4,1 -8,-1 -9,-4 L -4,-1 C -2,-3 -5,-5 -6,-8 L -3,-6 C -4,-8 -1,-10 0,-12 Z"
            fill={t.primary}
            opacity="0.9"
          />
        </svg>
      </button>

      {/* Label beneath button */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.58rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: t.primary,
        opacity: 0.45,
        textAlign: "center",
        transition: "color 0.6s ease",
        pointerEvents: "none",
        marginTop: -4,
      }}>{t.name}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
function buildGlobalStyles(t) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${t.pageBg}; color: ${t.textBright}; -webkit-font-smoothing: antialiased; overflow-x: hidden; transition: background 0.8s ease, color 0.8s ease; }
  ::selection { background: ${t.selection}; color: ${t.textBright}; }
  @media (min-width: 768px) { html { cursor: none; } a { cursor: none; } }
  @keyframes float {
    0%   { transform: translate(0, 0) scale(1); }
    100% { transform: translate(8px, -28px) scale(0.72); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.9; }
  }
  @keyframes hintPulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.9; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUpModal {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.94) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .paths-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  @media (max-width: 1100px) {
    .paths-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  }
  @media (max-width: 767px) {
    .paths-grid { grid-template-columns: repeat(2, 1fr); gap: 11px; }
  }
  @media (max-width: 400px) {
    .paths-grid { grid-template-columns: repeat(2, 1fr); gap: 9px; }
  }
`;}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [themeName, setThemeName] = useState("spring");
  const t = THEME_PALETTES[themeName];
  return (
    <ThemeContext.Provider value={t}>
      <style>{buildGlobalStyles(t)}</style>
      <Cursor />
      <SeasonToggle current={themeName} onChange={setThemeName} />
      <div style={{ minHeight: "100vh", transition: "background 0.8s ease" }}>
        <Hero />
        {/* <WildPaths /> */}
        <Founder />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}