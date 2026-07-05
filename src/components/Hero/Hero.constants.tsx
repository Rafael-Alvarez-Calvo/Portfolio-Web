import type { HeroIcon } from "./index";

export const HERO_TYPEWRITER_ROLES = [
  "Frontend Developer",
  "React Specialist",
  "AI Solutions Dev",
  "Full Stack Dev",
  "Software Engineer",
] as const;

// ── Tech icons — positions from devtools ────────────────────────────────────
export const HERO_TECH_ICONS: HeroIcon[] = [
  // LEFT COLUMN
  {
    label: "React",
    color: "#61dafb",
    backgroundColor: "rgba(97,218,251,0.08)",
    borderColor: "rgba(97,218,251,0.28)",
    animationDelay: 0,
    position: { top: "18%", left: "14%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#61dafb">
        <circle cx="12" cy="12" r="2.2" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.7"
          fill="none"
          stroke="#61dafb"
          strokeWidth="1.2"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.7"
          fill="none"
          stroke="#61dafb"
          strokeWidth="1.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.7"
          fill="none"
          stroke="#61dafb"
          strokeWidth="1.2"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    color: "#3178c6",
    backgroundColor: "rgba(49,120,198,0.1)",
    borderColor: "rgba(49,120,198,0.3)",
    animationDelay: 1.2,
    position: { top: "30%", left: "4%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <rect width="24" height="24" rx="3" fill="#3178c6" />
        <text
          x="3"
          y="18"
          fontSize="11"
          fontWeight="bold"
          fill="white"
          fontFamily="monospace"
        >
          TS
        </text>
      </svg>
    ),
  },
  {
    label: "Redux",
    color: "#764abc",
    backgroundColor: "rgba(118,74,188,0.1)",
    borderColor: "rgba(118,74,188,0.28)",
    animationDelay: 2.4,
    position: { top: "43%", left: "1%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <path
          d="M16 5.5C18 7 19 9 18.5 12"
          stroke="#764abc"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M8 5.5C6 7 5 9 5.5 12"
          stroke="#764abc"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M8 17c1 1.5 2.4 2 4 2s3-.5 4-2"
          stroke="#764abc"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="2.6"
          fill="none"
          stroke="#764abc"
          strokeWidth="1.3"
        />
        <circle cx="19" cy="12" r="1.3" fill="#764abc" />
        <circle cx="5" cy="12" r="1.3" fill="#764abc" />
        <circle cx="12" cy="19.5" r="1.3" fill="#764abc" />
      </svg>
    ),
  },
  {
    label: "Formik",
    color: "#0ea5e9",
    backgroundColor: "rgba(14,165,233,0.08)",
    borderColor: "rgba(14,165,233,0.25)",
    animationDelay: 0.7,
    position: { top: "57%", left: "2%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke="#0ea5e9"
          strokeWidth="1.3"
        />
        <path
          d="M7 10h10M7 14h6"
          stroke="#0ea5e9"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Node.js",
    color: "#68a063",
    backgroundColor: "rgba(104,160,99,0.08)",
    borderColor: "rgba(104,160,99,0.25)",
    animationDelay: 1.8,
    position: { top: "72%", left: "5%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <polygon
          points="12,2 21,7 21,17 12,22 3,17 3,7"
          fill="none"
          stroke="#68a063"
          strokeWidth="1.3"
        />
        <text
          x="7.5"
          y="15.5"
          fontSize="6.5"
          fontWeight="bold"
          fill="#68a063"
          fontFamily="monospace"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    label: "Bootstrap",
    color: "#7952b3",
    backgroundColor: "rgba(121,82,179,0.08)",
    borderColor: "rgba(121,82,179,0.25)",
    animationDelay: 3.0,
    position: { top: "85%", left: "10%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <rect width="24" height="24" rx="4" fill="#7952b3" />
        <text
          x="5"
          y="18"
          fontSize="13"
          fontWeight="900"
          fill="white"
          fontFamily="monospace"
        >
          B
        </text>
      </svg>
    ),
  },

  // RIGHT COLUMN
  {
    label: "JavaScript",
    color: "#f7df1e",
    backgroundColor: "rgba(247,223,30,0.08)",
    borderColor: "rgba(247,223,30,0.28)",
    animationDelay: 0.4,
    position: { top: "18%", right: "12%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <rect width="24" height="24" rx="3" fill="#f7df1e" />
        <text
          x="3"
          y="18"
          fontSize="11"
          fontWeight="bold"
          fill="#222"
          fontFamily="monospace"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    label: "Vite",
    color: "#a855f7",
    backgroundColor: "rgba(168,85,247,0.08)",
    borderColor: "rgba(168,85,247,0.25)",
    animationDelay: 1.6,
    position: { top: "29%", right: "7%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <polygon
          points="12,2 22,7 22,17 12,22 2,17 2,7"
          stroke="#a855f7"
          strokeWidth="1.2"
        />
        <path
          d="M14 8l-5 8M10 8l5 8"
          stroke="#f7df1e"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Tailwind",
    color: "#38bdf8",
    backgroundColor: "rgba(56,189,248,0.08)",
    borderColor: "rgba(56,189,248,0.25)",
    animationDelay: 2.7,
    position: { top: "43%", right: "1%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <path
          d="M6 10c1-4 3.5-6 6-5s4.5 4 3 6c-1.5 2.5.5 5 3 4"
          stroke="#38bdf8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M3 16c1-4 3.5-6 6-5s4.5 4 3 6"
          stroke="#38bdf8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Zustand",
    color: "#ca8a04",
    backgroundColor: "rgba(202,138,4,0.08)",
    borderColor: "rgba(202,138,4,0.25)",
    animationDelay: 0.3,
    position: { top: "57%", right: "2%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#ca8a04" strokeWidth="1.3" />
        <path
          d="M8 9h8M8 12h6M8 15h8"
          stroke="#ca8a04"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Jest",
    color: "#c21325",
    backgroundColor: "rgba(194,19,37,0.08)",
    borderColor: "rgba(194,19,37,0.25)",
    animationDelay: 2.0,
    position: { top: "72%", right: "5%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#c21325" strokeWidth="1.3" />
        <text
          x="7.5"
          y="16"
          fontSize="9"
          fontWeight="bold"
          fill="#c21325"
          fontFamily="monospace"
        >
          J
        </text>
      </svg>
    ),
  },
  {
    label: "Webpack",
    color: "#8dd6f9",
    backgroundColor: "rgba(141,214,249,0.07)",
    borderColor: "rgba(141,214,249,0.22)",
    animationDelay: 3.3,
    position: { top: "85%", right: "12%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <polygon
          points="12,2 21,7 21,17 12,22 3,17 3,7"
          stroke="#8dd6f9"
          strokeWidth="1.2"
        />
        <polygon
          points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5"
          stroke="#8dd6f9"
          strokeWidth="0.9"
        />
      </svg>
    ),
  },

  // CENTER / FLOATING
  {
    label: "Claude AI",
    color: "#d97706",
    backgroundColor: "rgba(217,119,6,0.08)",
    borderColor: "rgba(217,119,6,0.25)",
    animationDelay: 2.2,
    position: { top: "10%", left: "32%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#d97706" strokeWidth="1.3" />
        <path
          d="M8.5 12c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5"
          stroke="#d97706"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="12" cy="14.5" r="1.5" fill="#d97706" />
      </svg>
    ),
  },
  {
    label: "Git",
    color: "#f05032",
    backgroundColor: "rgba(240,80,50,0.08)",
    borderColor: "rgba(240,80,50,0.25)",
    animationDelay: 1.4,
    position: { top: "10%", right: "33%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <circle cx="6" cy="18" r="2" fill="#f05032" />
        <circle cx="18" cy="6" r="2" fill="#f05032" />
        <circle cx="18" cy="18" r="2" fill="#f05032" />
        <path
          d="M6 16v-5a3 3 0 013-3h5M18 8v8"
          stroke="#f05032"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "n8n",
    color: "#ea4b71",
    backgroundColor: "rgba(234,75,113,0.08)",
    borderColor: "rgba(234,75,113,0.25)",
    animationDelay: 0.9,
    position: { top: "25%", left: "30%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <rect
          x="2"
          y="8"
          width="5"
          height="8"
          rx="2"
          stroke="#ea4b71"
          strokeWidth="1.2"
        />
        <rect
          x="17"
          y="8"
          width="5"
          height="8"
          rx="2"
          stroke="#ea4b71"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="12" r="2.2" fill="#ea4b71" />
        <line
          x1="7"
          y1="12"
          x2="9.8"
          y2="12"
          stroke="#ea4b71"
          strokeWidth="1.2"
        />
        <line
          x1="14.2"
          y1="12"
          x2="17"
          y2="12"
          stroke="#ea4b71"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    label: "Shopify",
    color: "#96bf48",
    backgroundColor: "rgba(150,191,72,0.09)",
    borderColor: "rgba(150,191,72,0.28)",
    animationDelay: 1.5,
    position: { top: "40%", left: "22%" },
    icon: (
      <svg viewBox="0 0 109 124" width="16" height="16">
        <path
          d="M74.7 14.8s-.3 0-.7.2c-.4-1.2-1.1-2.3-2-3.1-1-1-2.2-1.5-3.5-1.5-1 0-2 .3-2.9.8-.8-1-2-1.7-3.3-1.7-5.5 0-8.2 6.9-9 10.4-2.2.7-3.7 1.1-3.8 1.2-1.2.4-1.2.4-1.3 1.5-.1.9-3.4 26.1-3.4 26.1l27.6 4.8V14.8h-.7zm-8.5 2.6c-1.1.3-2.3.7-3.5 1.1.7-2.7 2-4.1 3.1-4.6.3 1.2.4 2.4.4 3.5zm-5.9-2.1c-1.4.5-2.9 1.8-3.8 4.7-.9.3-1.8.5-2.7.8.9-3.4 3-7 6.5-5.5zm2.8-3.8c.5 0 .9.2 1.3.5-2 .9-4.1 3.2-5 7.2l-3.8 1.2c1-3.7 3.4-8.9 7.5-8.9z"
          fill="#96bf48"
        />
        <path
          d="M74 14.8c-.4 0-.7.1-1.1.2L73 16c-.1 0-.5.1-1.1.3.3-1.2.8-2.3 1.5-3.1.6-.7 1.3-1.2 2-1.4.3 1.2.5 2.4.6 3zM45.4 52.2l3.7 1 .7-5.8-4.4 4.8zm27.3-37.4L76 53.3l-20.3-3.6v-2.1l15.5-28.8h1.5z"
          fill="#5e8e3e"
        />
        <path d="M76 53.3l-20.3-3.6V14.8L76 53.3z" fill="#96bf48" />
      </svg>
    ),
  },
  {
    label: "Figma",
    color: "#f24e1e",
    backgroundColor: "rgba(242,78,30,0.08)",
    borderColor: "rgba(242,78,30,0.25)",
    animationDelay: 1.0,
    position: { top: "33%", right: "23%" },
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <rect x="7" y="2" width="5" height="5" rx="1" fill="#f24e1e" />
        <rect x="12" y="2" width="5" height="5" rx="1" fill="#a259ff" />
        <rect x="7" y="7" width="5" height="5" rx="1" fill="#f24e1e" />
        <rect x="7" y="12" width="5" height="5" rx="1" fill="#1abcfe" />
        <circle cx="14.5" cy="14.5" r="2.5" fill="#0acf83" />
      </svg>
    ),
  },
];
