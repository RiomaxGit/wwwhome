import { useState, useEffect, useRef } from "react";

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
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=80",
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
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
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
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="10"
            floodColor={s.leafEdge}
            floodOpacity="0.55"
          />
        </filter>
      </defs>
      <path
        d={P}
        fill={s.leafFill}
        transform="scale(1.22)"
        style={{
          opacity: growPhase >= 7 ? 0.22 : 0,
          filter: "blur(16px)",
          transition: "opacity 1.2s ease, fill 1.8s ease",
        }}
      />
      <path
        d={P}
        fill={`url(#lg${sid})`}
        filter={`url(#sh${sid})`}
        style={{
          opacity: growPhase >= 2 ? 1 : 0,
          transform: growPhase >= 2 ? "scale(1)" : "scale(0.04)",
          transformOrigin: "0px -85px",
          transition:
            "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1), fill 1.8s ease",
        }}
      />
      <path
        d={P}
        fill={`url(#ov${sid})`}
        style={{
          opacity: growPhase >= 3 ? 0.7 : 0,
          transition: "opacity 0.9s ease 0.3s",
        }}
      />
      <path
        d={P}
        fill={`url(#rl${sid})`}
        style={{
          opacity: growPhase >= 4 ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}
      />
      {spots.map((t, i) => (
        <ellipse
          key={i}
          cx={t.cx}
          cy={t.cy}
          rx={t.rx}
          ry={t.ry}
          fill={s.spotColor}
          transform={`rotate(${t.rot},${t.cx},${t.cy})`}
          style={{
            opacity: growPhase >= 5 ? 0.09 : 0,
            transition: `opacity 0.5s ease ${0.04 * i}s`,
          }}
        />
      ))}
      <path
        d={P}
        stroke={s.texture2}
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.28"
        style={{
          opacity: growPhase >= 4 ? 1 : 0,
          transition: "opacity 0.6s ease 0.25s",
        }}
      />
      <path
        d={P}
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
      {veins.map((v, i) => (
        <path
          key={i}
          d={v.d}
          stroke={i < 3 ? s.veinColor : s.veinColor2}
          strokeWidth={v.w}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={v.len}
          style={{
            strokeDashoffset: growPhase >= 4 ? 0 : v.len,
            opacity: i < 3 ? s.veinOpacity : s.veinOpacity * 0.75,
            transition: `stroke-dashoffset ${
              0.55 + i * 0.055
            }s cubic-bezier(0.16,1,0.3,1) ${0.04 * i}s, stroke 1.8s ease`,
          }}
        />
      ))}
      {subVeins.map((v, i) => (
        <path
          key={i}
          d={v.d}
          stroke={s.veinColor2}
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={v.len}
          style={{
            strokeDashoffset: growPhase >= 5 ? 0 : v.len,
            opacity: s.veinOpacity * 0.5,
            transition: `stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1) ${
              0.35 + 0.04 * i
            }s`,
          }}
        />
      ))}
      <path
        d={stemPath}
        fill={`url(#sg${sid})`}
        style={{
          opacity: growPhase >= 2 ? 0.95 : 0,
          transform: growPhase >= 2 ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "0px 66px",
          transition:
            "opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1), fill 1.8s ease",
        }}
      />
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
        setSeason((prev) => (prev + 1) % 4);
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
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-130 -130 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "hidden",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
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

        <circle
          cx="0"
          cy="0"
          r="125"
          fill={`url(#bg${id})`}
          style={{
            opacity: growPhase >= 1 ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />
        <circle
          cx="0"
          cy="0"
          r="125"
          fill={`url(#bggl${id})`}
          style={{
            opacity: growPhase >= 7 ? 1 : 0,
            transition: "opacity 1.6s ease, fill 1.8s ease",
          }}
        />

        <circle
          cx="0"
          cy="0"
          r="122"
          stroke={`url(#rg${id})`}
          strokeWidth="0.7"
          strokeDasharray="2.5 8"
          style={{
            opacity: growPhase >= 1 ? 0.5 : 0,
            transition: "opacity 0.6s, stroke 1.8s ease",
          }}
        />
        <circle
          cx="0"
          cy="0"
          r="113"
          stroke={s.ringColor}
          strokeWidth="0.4"
          strokeDasharray="1 7"
          style={{
            opacity: growPhase >= 1 ? 0.22 : 0,
            transition: "opacity 0.6s, stroke 1.8s ease",
          }}
        />
        <circle
          cx="0"
          cy="0"
          r="104"
          stroke={s.ringColor}
          strokeWidth="1"
          style={{
            opacity: growPhase >= 1 ? 0.14 : 0,
            transition: "opacity 0.5s, stroke 1.8s ease",
          }}
        />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const isCard = deg % 90 === 0;
          return (
            <circle
              key={i}
              cx={104 * Math.cos(rad)}
              cy={104 * Math.sin(rad)}
              r={isCard ? 2.8 : 1.7}
              fill={isCard ? s.texture2 : s.ringColor}
              style={{
                opacity: growPhase >= 1 ? (isCard ? 0.72 : 0.38) : 0,
                transition: `opacity 0.4s ${0.04 * i}s ease, fill 1.8s ease`,
              }}
            />
          );
        })}

        {[
          [0, -104, 0, -120],
          [0, 104, 0, 120],
          [-104, 0, -120, 0],
          [104, 0, 120, 0],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={s.texture2}
            strokeWidth="0.9"
            style={{
              opacity: growPhase >= 2 ? 0.44 : 0,
              transition: `opacity 0.4s ${0.08 * i}s ease, stroke 1.8s ease`,
            }}
          />
        ))}
        {[
          [0, -124],
          [0, 124],
          [-124, 0],
          [124, 0],
        ].map(([cx, cy], i) => (
          <polygon
            key={i}
            points={`${cx},${cy - 4.5} ${cx + 3},${cy} ${cx},${cy + 4.5} ${
              cx - 3
            },${cy}`}
            fill={s.texture2}
            style={{
              opacity: growPhase >= 2 ? 0.55 : 0,
              transition: `opacity 0.4s ${0.08 * i}s ease, fill 1.8s ease`,
            }}
          />
        ))}

        {Array.from({ length: 12 }, (_, i) => {
          const rad = ((i * 30 - 90) * Math.PI) / 180;
          const major = i % 3 === 0;
          return (
            <text
              key={i}
              x={91 * Math.cos(rad)}
              y={91 * Math.sin(rad)}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="serif"
              fontSize={major ? 8 : 5}
              fill={major ? s.texture2 : s.ringColor}
              style={{
                opacity: growPhase >= 3 ? (major ? 0.65 : 0.3) : 0,
                transition: `opacity 0.4s ${0.04 * i}s ease, fill 1.8s ease`,
              }}
            >
              {major ? "✦" : "·"}
            </text>
          );
        })}

        <g
          ref={leafRef}
          style={{ transformOrigin: "0px 0px", willChange: "transform" }}
        >
          <g transform="scale(0.85) translate(0, -9)">
            <MapleLeaf season={season} growPhase={growPhase} />
          </g>
        </g>

        {!mini && (
          <line
            x1="-80"
            y1="108"
            x2="80"
            y2="108"
            stroke={s.ringColor}
            strokeWidth="0.5"
            style={{
              opacity: growPhase >= 7 ? 0.28 : 0,
              transition: "opacity 0.8s ease 0.3s, stroke 1.8s ease",
            }}
          />
        )}
      </svg>

      {!mini && growPhase >= 7 && hint && (
        <div
          style={{
            position: "absolute",
            bottom: -32,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            color: s.ringColor,
            textTransform: "uppercase",
            opacity: 0.55,
            pointerEvents: "none",
            transition: "color 1.8s ease",
            animation: "hintPulse 2s ease-in-out infinite",
            whiteSpace: "nowrap",
          }}
        >
          rotating · seasons
        </div>
      )}
      {!mini && growPhase >= 7 && !hint && (
        <div
          style={{
            position: "absolute",
            bottom: -32,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            color: s.ringColor,
            textTransform: "uppercase",
            opacity: 0.6,
            pointerEvents: "none",
            transition: "color 1.8s ease",
            whiteSpace: "nowrap",
          }}
        >
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
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            animation: `float ${p.speed}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   WILD PATH CARD — unified immersive tile
───────────────────────────────────────────── */
function WildPathCard({ path, index }) {
  const [ref, inView] = useInView(0.06);
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const url = `https://${path.id}.wildwoodsway.com`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleClick = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  // Stagger: first row enters from below, second row from below with more delay
  const col = index % 4;
  const row = Math.floor(index / 4);
  const delay = col * 0.08 + row * 0.18;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(70px) scale(0.95)",
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div
        ref={cardRef}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          cursor: "none",
          aspectRatio: "3/4",
          background: "#080a08",
          border: `1px solid ${hovered ? path.accent + "55" : "#1a241a44"}`,
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
          boxShadow: hovered
            ? `0 30px 70px rgba(0,0,0,0.75), inset 0 0 0 1px ${path.accent}18`
            : "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Background image */}
        <img
          src={path.image}
          alt={path.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: `brightness(${hovered ? 0.45 : 0.3}) saturate(${
              hovered ? 0.7 : 0.5
            })`,
            transform: hovered ? "scale(1.08)" : "scale(1.02)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Radial spotlight that follows cursor */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? `radial-gradient(circle 220px at ${cursorPos.x}% ${cursorPos.y}%, ${path.accent}22 0%, transparent 70%)`
              : "none",
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Bottom gradient always present */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, #060808 0%, #060808aa 35%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />

        {/* Top vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, ${path.accent}0a 0%, transparent 40%)`,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "22px 24px 26px",
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.38em",
                color: path.accent,
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Arrow appears on hover */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: `1px solid ${path.accent}${hovered ? "88" : "33"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered
                  ? "scale(1) rotate(0deg)"
                  : "scale(0.7) rotate(-45deg)",
                opacity: hovered ? 1 : 0,
              }}
            >
              <span
                style={{
                  color: path.accent,
                  fontSize: 14,
                  lineHeight: 1,
                  display: "block",
                  transform: "translateY(-1px)",
                }}
              >
                ↗
              </span>
            </div>
          </div>

          {/* Bottom content */}
          <div>
            {/* Tags */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 14,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s",
              }}
            >
              {path.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "2px 9px",
                    border: `1px solid ${path.accent}30`,
                    borderRadius: 20,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 9.5,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: path.accent,
                    background: `${path.accent}0c`,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "#e8e0d0",
                margin: "0 0 5px",
                lineHeight: 1,
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {path.name}
            </h3>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "0.88rem",
                color: path.accent,
                margin: "0 0 14px",
                fontStyle: "italic",
                opacity: 0.8,
                transition: "opacity 0.4s ease",
              }}
            >
              {path.tagline}
            </p>

            {/* Stat + URL row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `1px solid ${path.accent}18`,
                paddingTop: 12,
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: path.accent,
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {path.stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#3a4a3a",
                    textTransform: "uppercase",
                    marginTop: 2,
                    display: "block",
                  }}
                >
                  {path.stat.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  color: path.accent,
                  opacity: hovered ? 0.55 : 0.25,
                  transition: "opacity 0.4s ease",
                  textTransform: "lowercase",
                }}
              >
                {path.id}.wildwoodsway.com
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(to right, transparent, ${path.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
            transition:
              "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Custom cursor dot inside card */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              left: `${cursorPos.x}%`,
              top: `${cursorPos.y}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: path.accent,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              boxShadow: `0 0 12px ${path.accent}88`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WILD PATHS SECTION
───────────────────────────────────────────── */
function WildPaths() {
  const [headerRef, headerInView] = useInView(0.05);

  return (
    <section
      style={{
        position: "relative",
        padding: "130px 20px 110px",
        overflow: "hidden",
      }}
    >
      {/* Ambient top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, #a8c09030, transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 30% at 50% 0%, #141e1200 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: 80,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 10.5,
              letterSpacing: "0.48em",
              color: "#a8c090",
              textTransform: "uppercase",
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            The Wild Paths
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "#e8e0d0",
              margin: "0 0 20px",
              lineHeight: 1,
            }}
          >
            Where We Branch
          </h2>

          <p
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "#4a5a44",
              maxWidth: 480,
              margin: "0 auto 28px",
              lineHeight: 1.85,
              fontStyle: "italic",
            }}
          >
            From a single root, many branches reach outward — each in its own
            direction, each carrying the same quiet intention.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 50,
                height: 1,
                background: "linear-gradient(to right, transparent, #4a5a4455)",
              }}
            />
            <span style={{ color: "#3a4a3a", fontSize: 9 }}>✦</span>
            <div
              style={{
                width: 50,
                height: 1,
                background: "linear-gradient(to left, transparent, #4a5a4455)",
              }}
            />
          </div>
        </div>

        {/* Unified 4-column grid — all paths same card */}
        <div className="paths-grid">
          {WILD_PATHS.map((path, i) => (
            <WildPathCard key={path.id} path={path} index={i} />
          ))}
        </div>

        {/* Bottom count */}
        <div
          style={{
            textAlign: "center",
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            opacity: 0.3,
          }}
        >
          <div
            style={{
              width: 80,
              height: 1,
              background: "linear-gradient(to right, transparent, #4a5a44)",
            }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.68rem",
              letterSpacing: "0.36em",
              color: "#4a5a44",
              textTransform: "uppercase",
            }}
          >
            {WILD_PATHS.length} paths · always growing
          </span>
          <div
            style={{
              width: 80,
              height: 1,
              background: "linear-gradient(to left, transparent, #4a5a44)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOUNDER SECTION
───────────────────────────────────────────── */
function Founder() {
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
    <section
      style={{
        position: "relative",
        padding: "120px 20px 130px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 60% at 15% 50%, #1a2818 0%, transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div
          ref={ref}
          style={{
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 10.5,
              letterSpacing: "0.4em",
              color: "#a8c090",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            The Founder
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 50,
                height: 1,
                background: "linear-gradient(to right, #a8c09044, transparent)",
              }}
            />
            <span style={{ color: "#4a5a44", fontSize: 9 }}>✦</span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : "clamp(40px,6vw,100px)",
            alignItems: isMobile ? "start" : "center",
          }}
        >
          <div
            ref={imgRef}
            style={{
              position: "relative",
              opacity: imgInView ? 1 : 0,
              transform: imgInView
                ? "translateX(0)"
                : isMobile
                ? "translateY(20px)"
                : "translateX(-40px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -30,
                background:
                  "radial-gradient(ellipse at center, #3a5a2888 0%, transparent 70%)",
                filter: "blur(24px)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "relative",
                borderRadius: isMobile ? 16 : 24,
                overflow: "hidden",
              }}
            >
              <img
                src="./founder.jpg"
                alt="Akhil Antony Joseph"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                  maskImage: isMobile
                    ? "none"
                    : "linear-gradient(to bottom, black 55%, transparent 100%)",
                  WebkitMaskImage: isMobile
                    ? "none"
                    : "linear-gradient(to bottom, black 55%, transparent 100%)",
                  filter: isMobile
                    ? "brightness(0.9)"
                    : "brightness(0.75) saturate(0.7)",
                  mixBlendMode: isMobile ? "normal" : "luminosity",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(160deg, #1e3c1888 0%, #090b09ee 85%)",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>

          <div
            style={{
              opacity: imgInView ? 1 : 0,
              transform: imgInView
                ? "translateX(0)"
                : isMobile
                ? "translateY(20px)"
                : "translateX(40px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 300,
                letterSpacing: "0.06em",
                color: "#e8e0d0",
                margin: "0 0 4px",
                lineHeight: 1.1,
              }}
            >
              Akhil Antony Joseph
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                color: "#a8c090",
                textTransform: "uppercase",
                margin: "0 0 28px",
              }}
            >
              Founder · Architect · Builder
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div style={{ width: 32, height: 1, background: "#a8c09033" }} />
              <span style={{ color: "#3a4a3a", fontSize: 8 }}>✦</span>
            </div>

            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(1rem,1.8vw,1.1rem)",
                color: "#7a8a70",
                lineHeight: 1.9,
                letterSpacing: "0.02em",
              }}
            >
              <p style={{ margin: "0 0 18px" }}>
                I started my career as a QA engineer — not writing code, but
                breaking things. Finding the cracks, the edge cases, the quiet
                moments where a product fails the person using it. Across OTT
                platforms, e-commerce systems, and point-of-sale products
                spanning Asia, the Middle East, and North America, I got very
                good at seeing what was wrong before anyone else did.
              </p>
              <p style={{ margin: "0 0 18px" }}>
                But after years of filing the same bugs, watching the same
                corners get cut, something shifted. I didn't just want to find
                what was broken — I wanted to build what wasn't. That
                restlessness pushed me from QA into design and architecture,
                carrying that same instinct with me: not just does it work, but
                does it hold up? Does it respect the person on the other side of
                the screen?
              </p>
              <p style={{ margin: 0, fontStyle: "italic", color: "#5a6a50" }}>
                WildWoodsWay is where that journey found its answer. A place to
                build things that don't just ship — but last.
              </p>
              <p style={{ margin: 0, fontStyle: "italic", color: "#5a6a50" }}>
                "The wildwoodsway is patient. It grows in the dark, and it is
                never rushed. That's how I try to build."
              </p>
            </div>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {[
                "Frontend Architecture",
                "Design Systems",
                "AI/ML Integration",
                "Product Strategy",
                "Open Source",
              ].map((sk, i) => (
                <span
                  key={i}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 20,
                    border: "1px solid #2a3a2a",
                    background: "#0f130f",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "#5a6a50",
                    textTransform: "uppercase",
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
              {[
                { label: "GitHub", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter / X", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.78rem",
                    letterSpacing: "0.2em",
                    color: "#3a4a3a",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                    paddingBottom: 2,
                    borderBottom: "1px solid #2a3a2a",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#a8c090";
                    e.currentTarget.style.borderBottomColor = "#a8c090";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3a4a3a";
                    e.currentTarget.style.borderBottomColor = "#2a3a2a";
                  }}
                >
                  {link.label}
                </a>
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
  const [phase, setPhase] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => setPhase(3), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.28;
  const fade = Math.max(0, 1 - scrollY / 440);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 72% 65% at 50% 35%, #182018 0%, #090b09 72%)",
          zIndex: 0,
        }}
      />
      <Particles />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(-${parallax}px)`,
          opacity: fade,
          padding: "0 20px",
          width: "100%",
          maxWidth: 560,
        }}
      >
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform:
              phase >= 1
                ? "scale(1) translateY(0)"
                : "scale(0.5) translateY(50px)",
            transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            marginBottom: 10,
          }}
        >
          <WildwoodsEmblem size={220} animate={phase >= 1} />
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 36,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(24px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              lineHeight: 0.9,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem,5vw,3.2rem)",
                fontWeight: 300,
                color: "#a8c090",
                opacity: 0.32,
                letterSpacing: "-0.06em",
                marginRight: "-0.08em",
              }}
            >
              W
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem,7vw,4.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.06em",
                background:
                  "linear-gradient(155deg, #e8d898 0%, #c4a860 55%, #a88848 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              W
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem,5vw,3.2rem)",
                fontWeight: 300,
                color: "#c4a882",
                opacity: 0.32,
                letterSpacing: "-0.06em",
                marginLeft: "-0.08em",
              }}
            >
              W
            </span>
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem,3vw,1.6rem)",
              fontWeight: 300,
              letterSpacing: "0.28em",
              background:
                "linear-gradient(135deg, #c8dab8 0%, #a0b888 50%, #bca07a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WILDWOODSWAY
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(0.8rem,3vw,2rem)",
              marginTop: 6,
            }}
          >
            {["Wild", "Woods", "Way"].map((w, i) => (
              <span
                key={w}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(0.58rem,1.2vw,0.72rem)",
                  letterSpacing: "0.32em",
                  color: i === 1 ? "#c4a882" : "#7a8a68",
                  textTransform: "uppercase",
                  opacity: i === 1 ? 0.8 : 0.5,
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "min(280px, 75vw)",
            marginTop: 18,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, #a8c09048)",
            }}
          />
          <span
            style={{
              color: "#c4a882",
              fontSize: 8,
              fontFamily: "'Cormorant Garamond', serif",
              opacity: 0.6,
            }}
          >
            ✦
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to left, transparent, #a8c09048)",
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(0.72rem,1.6vw,0.88rem)",
            letterSpacing: "0.24em",
            color: "#6a7860",
            textTransform: "uppercase",
            margin: "12px 0 0",
            textAlign: "center",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          Many paths. One intention. Built to endure.
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.62rem,1.2vw,0.76rem)",
            letterSpacing: "0.14em",
            color: "#344428",
            margin: "6px 0 0",
            textAlign: "center",
            fontStyle: "italic",
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.8s ease",
          }}
        >
          Architected by{" "}
          <span
            style={{
              color: "#5a7a4a",
              fontStyle: "normal",
              letterSpacing: "0.1em",
            }}
          >
            Akhil Antony Joseph
          </span>
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 7,
          opacity: phase >= 3 ? fade * 0.7 : 0,
          transition: "opacity 1s 0.5s",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 9.5,
            letterSpacing: "0.3em",
            color: "#3d4d38",
            textTransform: "uppercase",
          }}
        >
          Explore
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, #4a5a44, transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
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
    <footer
      ref={ref}
      style={{
        padding: "50px 20px",
        borderTop: "1px solid #1a2a1a",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
      }}
    >
      <div
        style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}
      >
        <WildwoodsEmblem size={58} mini animate={inView} />
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 10.5,
          letterSpacing: "0.3em",
          color: "#3a4a3a",
          textTransform: "uppercase",
          margin: "0 0 7px",
        }}
      >
        wildwoodsway.com
      </p>
      <p
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "0.8rem",
          color: "#2a3a2a",
          margin: "0 0 8px",
          fontStyle: "italic",
        }}
      >
        Crafted with intention · {new Date().getFullYear()}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.72rem",
          letterSpacing: "0.14em",
          color: "#3a4a34",
          margin: 0,
          fontStyle: "italic",
        }}
      >
        Architected by{" "}
        <span style={{ color: "#5a7a50", fontStyle: "normal" }}>
          Akhil Antony Joseph
        </span>
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (dot.current)
        dot.current.style.transform = `translate(${pos.current.x - 3}px, ${
          pos.current.y - 3
        }px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${
          ringPos.current.x - 15
        }px, ${ringPos.current.y - 15}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#a8c090",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1px solid rgba(168,192,144,0.35)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
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
  .paths-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  @media (max-width: 1100px) { .paths-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 760px)  { .paths-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px)  { .paths-grid { grid-template-columns: 1fr 1fr; gap: 12px; } }
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
        <WildPaths />
        <Founder />
        <Footer />
      </div>
    </>
  );
}
