import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const COMMUNITY_PROJECTS = [
  {
    id: "loadervault",
    name: "LoaderVault",
    tagline: "Animation assets, curated for builders",
    description:
      "A premium library of loader animations, spinners, and progress indicators — meticulously crafted for modern web apps. Drag-and-drop ready, framework-agnostic, and endlessly customisable. LoaderVault gives your product the polish it deserves without the engineering overhead.",
    url: "https://loadervault.wildwoodsway.com",
    tags: ["Design System", "Animation", "UI Library"],
    status: "Live",
    accent: "#a8c090",
    year: "2024",
    image: "/loadervault.png",
    stats: [
      { label: "Animations", value: "200+" },
      { label: "Frameworks", value: "All" },
      { label: "License", value: "MIT" },
    ],
    features: ["SVG & CSS loaders", "React / Vue / Svelte ready", "Dark mode variants", "Figma kit included"],
    detail: {
      overview: "LoaderVault is the most comprehensive loader animation library available for the modern web. Every animation is hand-crafted with attention to timing, easing, and cross-browser behaviour.",
      design: "Designed with a system-first mindset: consistent sizing scales, token-based colour slots, and precise animation curves derived from Apple's HIG and Material Design principles.",
      howToUse: "Install via npm, import the loader you need, drop it in. Each loader accepts a size, color, and speed prop. CSS variables let you theme the entire library in one line.",
      tech: ["SVG animations", "CSS keyframes", "React wrappers", "Vue 3 wrappers", "Svelte bindings", "Figma component set"],
    },
  },
  {
    id: "hushnotes",
    name: "HushNotes",
    tagline: "Private notes that disappear by design",
    description:
      "A minimalist note-taking app built around ephemerality. Write it, share it once, and it's gone. HushNotes is for thoughts that deserve privacy — end-to-end encrypted, zero-knowledge, no accounts required.",
    url: "https://hushnotes.wildwoodsway.com",
    tags: ["Privacy", "Notes", "Open Source"],
    status: "Live",
    accent: "#9ab4c8",
    year: "2024",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80",
    stats: [
      { label: "Encryption", value: "E2E" },
      { label: "Storage", value: "0kb" },
      { label: "Accounts", value: "None" },
    ],
    features: ["Zero-knowledge design", "Self-destructing notes", "No sign-up required", "Open source & auditable"],
    detail: {
      overview: "HushNotes was born from a simple question: what if notes didn't persist? It strips away every feature that isn't core to the act of writing a private, fleeting thought.",
      design: "The UI is deliberately sparse — a single textarea, a timer selector, and a share button. Nothing else. The design language communicates quiet and trust.",
      howToUse: "Write your note. Choose how long it lives (1 view, 1 hour, 24 hours). Share the generated link. Once read, the note is gone — permanently.",
      tech: ["AES-256-GCM encryption", "Edge functions", "No database", "Vercel KV (TTL-only)", "Zero telemetry"],
    },
  },
  {
    id: "elementos",
    name: "Elementos",
    tagline: "Component primitives, beautifully raw",
    description:
      "Unstyled, accessible React component primitives that hand you complete creative control. Built on Radix UI foundations with zero opinion on your aesthetic. Elementos handles the hard parts — keyboard nav, ARIA, focus management — so you can focus on building beautiful products.",
    url: "https://elementos.wildwoodsway.com",
    tags: ["React", "Open Source", "Accessibility"],
    status: "Beta",
    accent: "#c4a882",
    year: "2025",
    image: "/elementos.png",
    stats: [
      { label: "Components", value: "40+" },
      { label: "Bundle", value: "< 8kb" },
      { label: "Stars", value: "1.2k" },
    ],
    features: ["Fully unstyled", "WAI-ARIA compliant", "TypeScript native", "SSR compatible"],
    detail: {
      overview: "Elementos is a headless component library — it gives you the behaviour, accessibility, and keyboard interactions of complex UI components, without a single line of default styling.",
      design: "Each primitive is designed as a single-responsibility unit. Composition over configuration: combine Dialog + Trigger + Portal freely rather than fighting a monolithic modal.",
      howToUse: "Install via npm. Import the primitive. Style it with Tailwind, CSS modules, styled-components, or anything else. The component handles the rest.",
      tech: ["React 18+", "Radix primitives", "TypeScript", "Rollup bundle", "Storybook docs", "Playwright tests"],
    },
  },
  {
    id: "chromatype",
    name: "ChromaType",
    tagline: "Beautiful syntax themes for every editor",
    description:
      "A curated collection of syntax highlighting themes for VS Code, JetBrains, and Neovim. Each theme is designed as a cohesive visual system — not just colours, but semantic meaning baked into every token.",
    url: "https://chromatype.wildwoodsway.com",
    tags: ["Dev Tools", "Themes", "Open Source"],
    status: "Live",
    accent: "#d4a8c0",
    year: "2025",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    stats: [
      { label: "Themes", value: "18" },
      { label: "Editors", value: "3" },
      { label: "Downloads", value: "40k" },
    ],
    features: ["VS Code extension", "JetBrains plugin", "Neovim lua config", "P3 wide-gamut colours"],
    detail: {
      overview: "ChromaType started as a personal obsession with the aesthetics of code. After years of tweaking existing themes, it became a full design project to build themes from semantic first-principles.",
      design: "Every theme pairs a carefully tuned background luminance with foreground tones that maintain WCAG AA contrast while remaining visually harmonious. Colours carry meaning, not just decoration.",
      howToUse: "Install from the VS Code marketplace, JetBrains plugin repository, or via the Neovim plugin manager of your choice. Toggle light and dark variants with a single setting.",
      tech: ["VS Code extension API", "JetBrains SDK", "Lua / Neovim", "P3 colour space", "Automated contrast checking"],
    },
  },
];

const PREMIUM_PROJECTS = [
  {
    id: "testflow",
    name: "TestFlow",
    tagline: "AI-native test management, start to ship",
    description:
      "TestFlow is a complete test lifecycle platform with a locally-run AI core. From writing test cases to executing them, filing bugs, and generating reports — everything happens in one place, with an AI that understands your codebase and never phones home.",
    url: "#",
    tags: ["Testing", "AI", "Enterprise"],
    status: "Early Access",
    accent: "#b89fd4",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    pricing: "Subscription · from $29/mo",
    stats: [
      { label: "AI Model", value: "Local" },
      { label: "Integrations", value: "20+" },
      { label: "Privacy", value: "100%" },
    ],
    features: [
      "AI test case generation from specs",
      "Automated execution & reporting",
      "Bug creation with context",
      "Local LLM — data never leaves",
      "JIRA / Linear / GitHub sync",
      "Custom test frameworks",
    ],
    detail: {
      overview: "TestFlow was built for teams who are done stitching together spreadsheets, test runners, bug trackers, and AI wrappers. It is a single, coherent environment for the entire quality workflow.",
      design: "The interface is modelled on the mental model of a QA engineer, not a product manager. Test suites, runs, and bugs are first-class objects with clear relationships and no redundant clicks.",
      howToUse: "Connect your repo. Point TestFlow at your spec files or user stories. The local AI generates a test plan. Review, adjust, execute. Bugs are filed automatically with stack traces and repro steps attached.",
      tech: ["Ollama (local LLM)", "Electron desktop app", "REST API", "JIRA / Linear / GitHub", "Playwright runner", "PDF/HTML reports"],
    },
  },
  {
    id: "shipboard",
    name: "ShipBoard",
    tagline: "Release management that thinks like a team",
    description:
      "A release coordination platform that bridges engineering and product. ShipBoard tracks what's shipping, who owns it, and what's blocking it — with automated changelogs and stakeholder digests generated by an on-premise AI.",
    url: "#",
    tags: ["Release", "AI", "Collaboration"],
    status: "Beta",
    accent: "#f0c070",
    year: "2025",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    pricing: "Subscription · from $19/mo",
    stats: [
      { label: "Integrations", value: "15+" },
      { label: "AI", value: "On-prem" },
      { label: "Teams", value: "50+" },
    ],
    features: [
      "Auto-generated changelogs",
      "Stakeholder digest emails",
      "Blocker tracking & alerts",
      "Git / Linear / Notion sync",
      "On-premise AI option",
      "Release health dashboard",
    ],
    detail: {
      overview: "ShipBoard was born out of frustration with the gap between what engineering ships and what stakeholders understand. It closes that gap with automated, readable release communications.",
      design: "Designed around the release manager's daily workflow: a single board showing every active release, its state, its owners, and its blockers — nothing more.",
      howToUse: "Connect your Git repositories and issue tracker. Define your release cadence. ShipBoard automatically builds changelogs from merged PRs and sends digests to the right people at the right time.",
      tech: ["Next.js", "PostgreSQL", "Ollama (on-prem)", "GitHub / GitLab", "Linear API", "Notion API"],
    },
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
   FIX: season changes every 90° crossing (once per spin, not once per 180°)
───────────────────────────────────────────── */
function WildwoodsEmblem({ size = 260, animate = false, mini = false }) {
  const [growPhase, setGrowPhase] = useState(0);
  const [season, setSeason] = useState(1);
  const [hint, setHint] = useState(true);
  const leafRef = useRef(null);
  const rafRef = useRef(null);
  const degRef = useRef(0);
  // Track whether we've already fired the season change for the current 90° crossing
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
      // ── FIX: fire season change at every 90° crossing (edge-on moment) ──
      // cos(90°) = 0, so scaleX passes through zero once per rotation.
      // We detect the moment scaleX is near zero and hasn't fired yet.
      const nearEdge = Math.abs(scaleX) < 0.08; // within ~5° of 90°
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
          background: p.color, opacity: p.opacity,
          animation: `float ${p.speed}s ${p.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT DETAIL PAGE (full-screen overlay)
───────────────────────────────────────────── */
function ProjectDetailPage({ project, onClose, isPremium }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "#060807",
      overflowY: "auto",
      animation: "slideUp 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px",
        background: "rgba(6,8,7,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a2a1a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #2a3a2a", borderRadius: "50%",
            width: 36, height: 36, cursor: "pointer", color: "#6a7860",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a2a"; e.currentTarget.style.color = "#6a7860"; }}
          >←</button>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem",
            letterSpacing: "0.28em", color: "#3a4a3a", textTransform: "uppercase",
          }}>wildwoodsway · {isPremium ? "premium" : "community"}</span>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
          letterSpacing: "0.12em", color: project.accent,
        }}>{project.name}</div>
      </div>

      <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
        <img src={project.image} alt={project.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "none" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, transparent 30%, #060807 100%), linear-gradient(135deg, ${project.accent}18, transparent 60%)`,
        }} />
        <div style={{ position: "absolute", bottom: 48, left: "max(40px, 6vw)" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem",
            letterSpacing: "0.35em", color: project.accent, textTransform: "uppercase", marginBottom: 10,
          }}>{project.year}</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,6vw,4rem)",
            fontWeight: 300, color: "#e8e0d0", letterSpacing: "0.06em", margin: "0 0 8px", lineHeight: 1,
          }}>{project.name}</h1>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: "clamp(1rem,2vw,1.25rem)",
            color: "#6a7860", fontStyle: "italic", margin: 0,
          }}>{project.tagline}</p>
        </div>
        {isPremium && (
          <div style={{
            position: "absolute", top: 24, right: 40,
            padding: "6px 16px", borderRadius: 20,
            background: `${project.accent}18`, border: `1px solid ${project.accent}55`,
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem",
            letterSpacing: "0.22em", color: project.accent, textTransform: "uppercase",
          }}>{project.pricing}</div>
        )}
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px max(24px,4vw) 100px" }}>
        <Section accent={project.accent} label="Overview">
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: "clamp(1.05rem,2vw,1.22rem)",
            color: "#8a9a80", lineHeight: 1.85, margin: 0,
          }}>{project.detail.overview}</p>
        </Section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, borderRadius: 16, overflow: "hidden", margin: "48px 0" }}>
          {project.stats.map((stat, i) => (
            <div key={i} style={{ padding: "20px 24px", background: "#0f130f", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 400, color: project.accent }}>{stat.value}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: "0.22em", color: "#3a4a3a", textTransform: "uppercase", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <Section accent={project.accent} label="Design Philosophy">
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#7a8a70", lineHeight: 1.85, margin: 0 }}>
            {project.detail.design}
          </p>
        </Section>

        <Section accent={project.accent} label="How to Use">
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#7a8a70", lineHeight: 1.85, margin: "0 0 24px" }}>
            {project.detail.howToUse}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
            {project.features.map((f, i) => (
              <div key={i} style={{
                padding: "12px 16px", borderRadius: 12, background: "#0f130f",
                border: `1px solid ${project.accent}18`,
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem",
                letterSpacing: "0.06em", color: "#6a7a60",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ color: project.accent, fontSize: 9 }}>✦</span>{f}
              </div>
            ))}
          </div>
        </Section>

        <Section accent={project.accent} label="Technology">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {project.detail.tech.map((t, i) => (
              <span key={i} style={{
                padding: "6px 14px", borderRadius: 20,
                border: `1px solid ${project.accent}30`, background: `${project.accent}08`,
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
                letterSpacing: "0.12em", color: project.accent,
              }}>{t}</span>
            ))}
          </div>
        </Section>

        <div style={{ marginTop: 64, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {project.url !== "#" ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: 20,
                border: `1px solid ${project.accent}`, color: project.accent,
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem",
                letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = project.accent; e.currentTarget.style.color = "#060807"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = project.accent; }}
            >Visit Project →</a>
          ) : (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px",
              borderRadius: 20, border: "1px solid #1e2a1e", color: "#3a4a3a",
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              <span style={{ animation: "hintPulse 2s ease-in-out infinite" }}>◉</span> Early Access — Coming Soon
            </div>
          )}
          <button onClick={onClose} style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px",
            borderRadius: 20, border: "1px solid #1e2a1e", background: "none", color: "#3a4a3a",
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem",
            letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#3a4a3a"; e.currentTarget.style.color = "#6a7860"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2a1e"; e.currentTarget.style.color = "#3a4a3a"; }}
          >← Back to Projects</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIEW ALL PAGE (full-screen overlay)
───────────────────────────────────────────── */
function ViewAllPage({ projects, categoryLabel, badgeColor, onClose, onOpenDetail }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 900,
      background: "#060807",
      overflowY: "auto",
      animation: "slideUp 0.45s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px",
        background: "rgba(6,8,7,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a2a1a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #2a3a2a", borderRadius: "50%",
            width: 36, height: 36, cursor: "pointer", color: "#6a7860",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = badgeColor; e.currentTarget.style.color = badgeColor; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a2a"; e.currentTarget.style.color = "#6a7860"; }}
          >←</button>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem",
            letterSpacing: "0.28em", color: "#3a4a3a", textTransform: "uppercase",
          }}>wildwoodsway · all {categoryLabel.toLowerCase()}</span>
        </div>
        <span style={{
          padding: "3px 12px", borderRadius: 20, fontSize: 10,
          border: `1px solid ${badgeColor}55`, background: `${badgeColor}12`,
          fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.2em",
          textTransform: "uppercase", color: badgeColor,
        }}>{projects.length} projects</span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px max(20px,4vw) 100px" }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: "0.4em",
            color: badgeColor, textTransform: "uppercase", marginBottom: 10,
          }}>All {categoryLabel}</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem,4.5vw,3rem)",
            fontWeight: 300, letterSpacing: "0.06em", color: "#e8e0d0", margin: 0, lineHeight: 1.1,
          }}>{categoryLabel} Projects</h2>
        </div>

        {/* FIX: equal-height grid with align-items stretch */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 26,
          alignItems: "stretch",
        }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              isPremium={categoryLabel === "Premium"}
              onOpenDetail={(proj) => {
                onClose();
                setTimeout(() => onOpenDetail(proj), 50);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ accent, label, children }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: accent, display: "block", flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "0.68rem",
          letterSpacing: "0.38em", color: accent, textTransform: "uppercase",
        }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}22, transparent)` }} />
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
   FIX: height: 100% so all cards in a row stretch equally
───────────────────────────────────────────── */
function ProjectCard({ project, index, isPremium, onOpenDetail }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const statusColors = { Live: "#a8c090", Beta: "#c4a882", Soon: "#8899aa", "Early Access": "#b89fd4" };

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(50px) scale(0.97)",
      transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.13}s`,
      // FIX: fill the grid cell height
      display: "flex",
      flexDirection: "column",
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        style={{
          position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer",
          border: `1px solid ${hovered ? project.accent + "44" : "#1e2a1e88"}`,
          background: "linear-gradient(160deg,#0f130f,#090b09)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 28px 65px rgba(0,0,0,0.7), 0 0 0 1px ${project.accent}18`
            : "0 4px 24px rgba(0,0,0,0.3)",
          // FIX: stretch to fill available height
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image — fixed height */}
        <div style={{ height: 190, position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <img src={project.image} alt={project.name} style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "none",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, ${project.accent}22 0%, transparent 60%, #090b09cc 100%)`,
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #090b09)" }} />
          <div style={{
            position: "absolute", top: 14, right: 14, padding: "4px 12px", borderRadius: 20,
            border: `1px solid ${statusColors[project.status]}55`,
            background: `${statusColors[project.status]}14`, backdropFilter: "blur(8px)",
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5,
            letterSpacing: "0.2em", textTransform: "uppercase", color: statusColors[project.status],
          }}>{project.status}</div>
          <div style={{
            position: "absolute", top: 14, left: 14,
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5,
            letterSpacing: "0.2em", color: "#ffffff55",
          }}>{project.year}</div>
          {isPremium && project.pricing && (
            <div style={{
              position: "absolute", bottom: 14, left: 14,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
              letterSpacing: "0.15em", color: project.accent, opacity: 0.8,
            }}>{project.pricing}</div>
          )}
        </div>

        {/* Content — grows to fill remaining card height */}
        <div style={{ padding: "20px 22px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem",
              fontWeight: 400, letterSpacing: "0.04em", color: "#e8e0d0", margin: 0, lineHeight: 1,
            }}>{project.name}</h3>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              border: `1px solid ${project.accent}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: project.accent, fontSize: 16, flexShrink: 0, marginLeft: 10,
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>+</div>
          </div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", color: "#6a7860", margin: "0 0 12px", fontStyle: "italic" }}>
            {project.tagline}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: "3px 10px", border: `1px solid ${project.accent}28`, borderRadius: 20,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase", color: project.accent, background: `${project.accent}08`,
              }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, borderRadius: 12, overflow: "hidden", marginBottom: 14, background: "#1a221a" }}>
            {project.stats.map((stat, i) => (
              <div key={i} style={{ padding: "10px 8px", textAlign: "center", background: hovered ? "#1f281f" : "#141c14", transition: "background 0.4s" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 500, color: project.accent }}>{stat.value}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, letterSpacing: "0.16em", color: "#3a4a3a", textTransform: "uppercase", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Expandable */}
          <div style={{ maxHeight: expanded ? 500 : 0, overflow: "hidden", transition: "max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={{ paddingTop: 14, borderTop: `1px solid ${project.accent}14` }}>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", color: "#7a8a70", lineHeight: 1.8, margin: "0 0 14px" }}>
                {project.description}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 10px", marginBottom: 18 }}>
                {project.features.map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem",
                    letterSpacing: "0.05em", color: "#5a6a50",
                  }}>
                    <span style={{ color: project.accent, fontSize: 8, flexShrink: 0 }}>✦</span>{f}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {project.url !== "#" && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "9px 20px", border: `1px solid ${project.accent}`, borderRadius: 20,
                      background: "transparent", color: project.accent,
                      fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
                      letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = project.accent; e.currentTarget.style.color = "#090b09"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = project.accent; }}
                  >Visit →</a>
                )}
                <button
                  onClick={e => { e.stopPropagation(); onOpenDetail(project); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "9px 20px", border: `1px solid ${project.accent}55`, borderRadius: 20,
                    background: `${project.accent}0a`, color: project.accent,
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
                    letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}0a`; }}
                >Full Details ↗</button>
              </div>
            </div>
          </div>
        </div>

        {/* Accent bar */}
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
   SECTION DIVIDER HEADER
───────────────────────────────────────────── */
function CategoryHeader({ label, sublabel, badge, badgeColor, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", gap: 20, marginBottom: 40,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
      transition: `all 0.7s ease ${delay}s`,
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem,3.5vw,2.2rem)",
            fontWeight: 300, letterSpacing: "0.08em", color: "#e8e0d0", margin: 0,
          }}>{label}</h3>
          {badge && (
            <span style={{
              padding: "3px 12px", borderRadius: 20, fontSize: 10,
              border: `1px solid ${badgeColor}55`, background: `${badgeColor}12`,
              fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.2em",
              textTransform: "uppercase", color: badgeColor,
            }}>{badge}</span>
          )}
        </div>
        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: "0.9rem",
          color: "#4a5a44", margin: 0, fontStyle: "italic", letterSpacing: "0.04em",
        }}>{sublabel}</p>
      </div>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #2a3a2a, transparent)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIEW ALL BUTTON
───────────────────────────────────────────── */
function ViewAllButton({ accent, label, count, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 36, marginBottom: 20 }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "12px 32px", borderRadius: 28,
          border: `1px solid ${hovered ? accent : accent + "44"}`,
          background: hovered ? accent + "14" : "transparent",
          color: hovered ? accent : accent + "88",
          fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem",
          letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 22, height: 22, borderRadius: "50%",
          border: `1px solid ${accent}55`,
          fontSize: 10, color: accent,
        }}>{count}</span>
        View All {label}
        <span style={{
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.3s",
        }}>→</span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS SECTION
   FIX: show only 3, "View All" opens overlay
───────────────────────────────────────────── */
const HOME_LIMIT = 3;

function Projects({ onOpenDetail }) {
  const [ref, inView] = useInView(0.05);
  const [viewAllCommunity, setViewAllCommunity] = useState(false);
  const [viewAllPremium, setViewAllPremium] = useState(false);

  return (
    <>
      {viewAllCommunity && (
        <ViewAllPage
          projects={COMMUNITY_PROJECTS}
          categoryLabel="Community"
          badgeColor="#a8c090"
          onClose={() => setViewAllCommunity(false)}
          onOpenDetail={onOpenDetail}
        />
      )}
      {viewAllPremium && (
        <ViewAllPage
          projects={PREMIUM_PROJECTS}
          categoryLabel="Premium"
          badgeColor="#b89fd4"
          onClose={() => setViewAllPremium(false)}
          onOpenDetail={onOpenDetail}
        />
      )}

      <section style={{ padding: "110px 20px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 80,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: "0.4em",
            color: "#a8c090", textTransform: "uppercase", marginBottom: 14,
          }}>The Collection</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem,4.5vw,3.2rem)",
            fontWeight: 300, letterSpacing: "0.06em", color: "#e8e0d0", margin: "0 0 18px", lineHeight: 1.1,
          }}>Projects & Products</h2>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
            color: "#4a5a44", maxWidth: 500, margin: "0 auto 20px", lineHeight: 1.75, fontStyle: "italic",
          }}>
            Two tiers of craft — free tools for the community, and dedicated software for teams who need more.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center" }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right, transparent, #4a5a44)" }} />
            <span style={{ color: "#4a5a44", fontSize: 9 }}>✦</span>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to left, transparent, #4a5a44)" }} />
          </div>
        </div>

        {/* Community — show first 3 */}
        <CategoryHeader
          label="Community"
          sublabel="Free, open-source, and built for everyone"
          badge="Free"
          badgeColor="#a8c090"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 26,
          alignItems: "stretch",
          marginBottom: COMMUNITY_PROJECTS.length > HOME_LIMIT ? 8 : 80,
        }}>
          {COMMUNITY_PROJECTS.slice(0, HOME_LIMIT).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isPremium={false} onOpenDetail={onOpenDetail} />
          ))}
        </div>
        {COMMUNITY_PROJECTS.length > HOME_LIMIT && (
          <div style={{ marginBottom: 80 }}>
            <ViewAllButton
              accent="#a8c090"
              label="Community Projects"
              count={COMMUNITY_PROJECTS.length}
              onClick={() => setViewAllCommunity(true)}
            />
          </div>
        )}

        {/* Premium — show first 3 */}
        <CategoryHeader
          label="Premium"
          sublabel="Professional tools with dedicated support and AI built in"
          badge="Paid"
          badgeColor="#b89fd4"
          delay={0.1}
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 26,
          alignItems: "stretch",
          marginBottom: PREMIUM_PROJECTS.length > HOME_LIMIT ? 8 : 0,
        }}>
          {PREMIUM_PROJECTS.slice(0, HOME_LIMIT).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isPremium={true} onOpenDetail={onOpenDetail} />
          ))}
        </div>
        {PREMIUM_PROJECTS.length > HOME_LIMIT && (
          <ViewAllButton
            accent="#b89fd4"
            label="Premium Products"
            count={PREMIUM_PROJECTS.length}
            onClick={() => setViewAllPremium(true)}
          />
        )}
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FOUNDER SECTION
   FIX: full-width image on mobile, side-by-side on desktop
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
    <section style={{ position: "relative", padding: "120px 20px 130px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 15% 50%, #1a2818 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Section label */}
        <div ref={ref} style={{
          marginBottom: 64,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s ease",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: "0.4em",
            color: "#a8c090", textTransform: "uppercase", marginBottom: 12,
          }}>The Founder</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right, #a8c09044, transparent)" }} />
            <span style={{ color: "#4a5a44", fontSize: 9 }}>✦</span>
          </div>
        </div>

        {/* FIX: mobile = stacked (image full-width on top), desktop = two columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : "clamp(40px,6vw,100px)",
          alignItems: isMobile ? "start" : "center",
        }}>

          {/* Image — always first in DOM so it appears on top on mobile */}
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
                background: "linear-gradient(160deg, #1e3c1888 0%, #090b09ee 85%)",
                mixBlendMode: "multiply",
              }} />
            </div>
          </div>

          {/* Text column */}
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
              letterSpacing: "0.3em", color: "#a8c090", textTransform: "uppercase",
              margin: "0 0 28px",
            }}>Founder · Architect · Builder</p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 32, height: 1, background: "#a8c09033" }} />
              <span style={{ color: "#3a4a3a", fontSize: 8 }}>✦</span>
            </div>

            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: "clamp(1rem,1.8vw,1.1rem)",
              color: "#7a8a70", lineHeight: 1.9, letterSpacing: "0.02em",
            }}>
              <p style={{ margin: "0 0 18px" }}>
  I started my career as a QA engineer — not writing code, but breaking things. Finding the cracks, the edge cases, the quiet moments where a product fails the person using it. Across OTT platforms, e-commerce systems, and point-of-sale products spanning Asia, the Middle East, and North America, I got very good at seeing what was wrong before anyone else did.
</p>
<p style={{ margin: "0 0 18px" }}>
  But after years of filing the same bugs, watching the same corners get cut, something shifted. I didn't just want to find what was broken — I wanted to build what wasn't. That restlessness pushed me from QA into design and architecture, carrying that same instinct with me: not just does it work, but does it hold up? Does it respect the person on the other side of the screen?
</p>
<p style={{ margin: 0, fontStyle: "italic", color: "#5a6a50" }}>
  WildWoodsWay is where that journey found its answer. A place to build things that don't just ship — but last.
</p>
              <p style={{ margin: 0, fontStyle: "italic", color: "#5a6a50" }}>
                "The wildwoodsway is patient. It grows in the dark, and it is never rushed. That's how I try to build."
              </p>
            </div>

            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Frontend Architecture", "Design Systems", "AI/ML Integration", "Product Strategy", "Open Source"].map((sk, i) => (
                <span key={i} style={{
                  padding: "5px 14px", borderRadius: 20,
                  border: "1px solid #2a3a2a", background: "#0f130f",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
                  letterSpacing: "0.16em", color: "#5a6a50", textTransform: "uppercase",
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
                    letterSpacing: "0.2em", color: "#3a4a3a", textDecoration: "none",
                    textTransform: "uppercase", transition: "color 0.3s",
                    paddingBottom: 2, borderBottom: "1px solid #2a3a2a",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#a8c090"; e.currentTarget.style.borderBottomColor = "#a8c090"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#3a4a3a"; e.currentTarget.style.borderBottomColor = "#2a3a2a"; }}
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
              color: "#a8c090", opacity: 0.32, letterSpacing: "-0.06em", marginRight: "-0.08em",
            }}>W</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem,7vw,4.4rem)", fontWeight: 500, letterSpacing: "-0.06em",
              background: "linear-gradient(155deg, #e8d898 0%, #c4a860 55%, #a88848 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>W</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300,
              color: "#c4a882", opacity: 0.32, letterSpacing: "-0.06em", marginLeft: "-0.08em",
            }}>W</span>
          </div>
          <div style={{
            marginTop: 8,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem,3vw,1.6rem)", fontWeight: 300, letterSpacing: "0.28em",
            background: "linear-gradient(135deg, #c8dab8 0%, #a0b888 50%, #bca07a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>WILDWOODSWAY</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(0.8rem,3vw,2rem)", marginTop: 6 }}>
            {["Wild", "Woods", "Way"].map((w, i) => (
              <span key={w} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.58rem,1.2vw,0.72rem)", letterSpacing: "0.32em",
                color: i === 1 ? "#c4a882" : "#7a8a68", textTransform: "uppercase",
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
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #a8c09048)" }} />
          <span style={{ color: "#c4a882", fontSize: 8, fontFamily: "'Cormorant Garamond', serif", opacity: 0.6 }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #a8c09048)" }} />
        </div>

        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: "clamp(0.72rem,1.6vw,0.88rem)",
          letterSpacing: "0.24em", color: "#6a7860", textTransform: "uppercase",
          margin: "12px 0 0", textAlign: "center",
          opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}>Thoughtful digital products, built from the ground up</p>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.62rem,1.2vw,0.76rem)",
          letterSpacing: "0.14em", color: "#344428", margin: "6px 0 0", textAlign: "center", fontStyle: "italic",
          opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.8s ease",
        }}>
          Architected by{" "}
          <span style={{ color: "#5a7a4a", fontStyle: "normal", letterSpacing: "0.1em" }}>Akhil Antony Joseph</span>
        </p>
      </div>

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
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const [ref, inView] = useInView();
  return (
    <footer ref={ref} style={{
      padding: "50px 20px", borderTop: "1px solid #1a2a1a", textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease",
    }}>
      <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
        <WildwoodsEmblem size={58} mini animate={inView} />
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: "0.3em", color: "#3a4a3a", textTransform: "uppercase", margin: "0 0 7px" }}>wildwoodsway.com</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.8rem", color: "#2a3a2a", margin: "0 0 8px", fontStyle: "italic" }}>Crafted with intention · {new Date().getFullYear()}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.14em", color: "#3a4a34", margin: 0, fontStyle: "italic" }}>
        Architected by{" "}
        <span style={{ color: "#5a7a50", fontStyle: "normal" }}>Akhil Antony Joseph</span>
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
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, width: 6, height: 6, borderRadius: "50%", background: "#a8c090", pointerEvents: "none", willChange: "transform" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, zIndex: 9998, width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(168,192,144,0.35)", pointerEvents: "none", willChange: "transform" }} />
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
`;

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [detailProject, setDetailProject] = useState(null);
  const [detailIsPremium, setDetailIsPremium] = useState(false);

  const openDetail = (project) => {
    const isPrem = PREMIUM_PROJECTS.some(p => p.id === project.id);
    setDetailProject(project);
    setDetailIsPremium(isPrem);
    window.scrollTo(0, 0);
  };

  const closeDetail = () => setDetailProject(null);

  return (
    <>
      <style>{globalStyles}</style>
      <Cursor />
      {detailProject && (
        <ProjectDetailPage project={detailProject} isPremium={detailIsPremium} onClose={closeDetail} />
      )}
      <div style={{ minHeight: "100vh" }}>
        <Hero />
        <Projects onOpenDetail={openDetail} />
        <Founder />
        <Footer />
      </div>
    </>
  );
}