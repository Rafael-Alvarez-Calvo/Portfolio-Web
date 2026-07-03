import { useEffect, useRef, useState } from "react";
import rafaelPhoto from "../assets/Rafael.webp";
import { useReveal, useCounter } from "../hooks/useReveal";
import { useLang } from "../contexts/LanguageContext";
import { ICONS } from "./Hero.data";

const ROLES = [
  "Frontend Developer",
  "React Specialist",
  "AI Solutions Dev",
  "Full Stack Dev",
  "Software Engineer",
];

const TypeWriter = ({ lang }: { lang: string }) => {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    setText("");
    setRoleIdx(0);
    setDeleting(false);
  }, [lang]);
  useEffect(() => {
    const cur = ROLES[roleIdx],
      delay = deleting ? 45 : 100;
    const t = setTimeout(() => {
      if (!deleting) {
        const n = cur.slice(0, text.length + 1);
        setText(n);
        if (n === cur) setTimeout(() => setDeleting(true), 2200);
      } else {
        const n = text.slice(0, -1);
        setText(n);
        if (n === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, roleIdx, deleting]);
  return (
    <div className="font-mono text-cyan text-base mb-6 min-h-[1.75rem]">
      <span className="text-[var(--text-dim)]">&gt; </span>
      <span>{text}</span>
      <span className="inline-block w-0.5 h-[1em] bg-cyan ml-0.5 animate-blink align-middle" />
    </div>
  );
};

const StatItem = ({
  target,
  label,
  suffix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(target, ref);
  return (
    <div ref={ref} className="text-left">
      <div className="font-syne text-3xl font-extrabold">
        {count}
        <span className="text-cyan">{suffix}</span>
      </div>
      <div className="text-[0.72rem] text-[var(--text-dim)] uppercase tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  );
};

export const Hero = () => {
  const { ref, visible } = useReveal();
  const { lang, t } = useLang();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-16 px-6"
    >
      {/* Bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(59,130,246,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(6,182,212,0.06) 0%, transparent 60%), var(--bg)",
          }}
        />
        <div className="absolute inset-0 hero-grid" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT — text */}
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full px-4 py-1.5 font-mono text-[0.75rem] text-cyan mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
            {t.hero.badge}
          </div>
          <h1 className="font-syne text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.05] mb-2">
            Rafael
            <br />
            <span className="grad">Álvarez Calvo</span>
          </h1>
          <TypeWriter lang={lang} />
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-7 max-w-[460px] mb-8">
            {t.hero.desc}{" "}
            <strong className="text-[var(--text)] font-medium">
              {t.hero.strong}
            </strong>
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="bg-gradient-to-br from-blue to-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold text-[0.95rem] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] transition-all duration-200"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#contact"
              className="border border-[var(--border)] text-[var(--text)] px-8 py-3 rounded-lg font-semibold text-[0.95rem] hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all duration-200"
            >
              {t.hero.cta2}
            </a>
          </div>
          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)]">
            <StatItem target={4} label={t.hero.stats.exp} suffix="+" />
            <StatItem target={10} label={t.hero.stats.projects} suffix="+" />
            <StatItem target={5} label={t.hero.stats.companies} />
            <StatItem target={6} label={t.hero.stats.certs} />
          </div>
        </div>

        {/* RIGHT — photo + floating icons */}
        <div
          className="hidden md:block relative"
          style={{ height: "540px", top: "-43px" }}
        >
          {/* Hex grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 540"
              className="opacity-10"
            >
              <defs>
                <pattern
                  id="hex"
                  x="0"
                  y="0"
                  width="40"
                  height="46"
                  patternUnits="userSpaceOnUse"
                >
                  <polygon
                    points="20,2 38,12 38,34 20,44 2,34 2,12"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="0.7"
                  />
                </pattern>
                <radialGradient id="hf" cx="50%" cy="50%" r="45%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="hm">
                  <rect width="500" height="540" fill="url(#hf)" />
                </mask>
              </defs>
              <rect width="500" height="540" fill="url(#hex)" mask="url(#hm)" />
            </svg>
          </div>

          {/* Photo — centered */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div
              className="relative"
              style={{ width: "600px", height: "530px" }}
            >
              {/* Floor glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 50%)",
                  filter: "blur(12px)",
                }}
              />
              {/* Ambient glow around figure */}
              <div
                className="absolute inset-0 z-0 pointer-events-none rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 50%)",
                }}
              />
              {/* Subtle blue tint overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none" />
              {/* Scanline */}
              <div
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                style={{ opacity: 0.08 }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      "linear-gradient(to right, transparent, #06b6d4, transparent)",
                    animation: "scanline 5s linear infinite",
                  }}
                />
              </div>
              {/* Photo — mix-blend-mode:screen makes black pixels invisible */}
              <img
                src={rafaelPhoto}
                alt="Rafael Álvarez Calvo"
                width={600}
                height={530}
                fetchPriority="high"
                decoding="async"
                className="relative z-10 w-full h-full object-contain object-bottom"
                style={{
                  filter:
                    "brightness(1.02) contrast(1.03) drop-shadow(0 0 20px rgba(59,130,246,0.2))",
                }}
              />
              {/* Online */}
              <div className="absolute top-10 left-3 z-30 flex items-center gap-1.5 bg-[rgba(4,13,30,0.85)] border border-[var(--border)] rounded-full px-2.5 py-1 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
                <span className="font-mono text-[0.65rem] text-mint">
                  online
                </span>
              </div>
            </div>
          </div>

          {/* Floating icons — organic positions */}
          {ICONS.map((icon) => (
            <div
              key={icon.label}
              className="absolute z-30 flex items-center gap-2 px-2.5 py-1.5 rounded-xl backdrop-blur-sm cursor-default"
              style={{
                ...icon.pos,
                background: icon.bg,
                border: `1px solid ${icon.border}`,
                animation: `floatOrg 4s ease-in-out ${icon.delay}s infinite`,
              }}
            >
              <div className="flex-shrink-0">{icon.svg}</div>
              <span
                className="font-mono text-[0.68rem] font-medium whitespace-nowrap"
                style={{ color: icon.color }}
              >
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scanline { 0% { top:-3px } 100% { top:100% } }
        @keyframes floatOrg {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-8px) rotate(0.5deg); }
          66%      { transform: translateY(-4px) rotate(-0.5deg); }
        }
      `}</style>
    </section>
  );
};
