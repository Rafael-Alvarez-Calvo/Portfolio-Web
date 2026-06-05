import { useEffect, useRef, useState } from 'react'
import rafaelPhoto from '../assets/rafael-photo.webp'
import { useReveal, useCounter } from '../hooks/useReveal'
import { useLang } from '../contexts/LanguageContext'

const ROLES = ['Frontend Developer','React Specialist','AI Solutions Dev','Full Stack Dev','Software Engineer']

function TypeWriter({ lang }: { lang: string }) {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { setText(''); setRoleIdx(0); setDeleting(false) }, [lang])

  useEffect(() => {
    const cur = ROLES[roleIdx], delay = deleting ? 45 : 100
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = cur.slice(0, text.length + 1); setText(next)
        if (next === cur) setTimeout(() => setDeleting(true), 2200)
      } else {
        const next = text.slice(0, -1); setText(next)
        if (next === '') { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length) }
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [text, roleIdx, deleting])

  return (
    <div className="font-mono text-cyan text-base mb-6 min-h-[1.75rem]">
      <span className="text-[var(--text-dim)]">&gt; </span>
      <span>{text}</span>
      <span className="inline-block w-0.5 h-[1em] bg-cyan ml-0.5 animate-blink align-middle" />
    </div>
  )
}

function StatItem({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(target, ref)
  return (
    <div ref={ref} className="text-left">
      <div className="font-syne text-3xl font-extrabold">{count}<span className="text-cyan">{suffix}</span></div>
      <div className="text-[0.72rem] text-[var(--text-dim)] uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  )
}

// ── Icon definitions ─────────────────────────────────────────────────────────
type Icon = { label: string; color: string; bg: string; border: string; svg: React.ReactNode }

const LEFT_ICONS: Icon[] = [
  { label: 'React',     color: '#61dafb', bg: 'rgba(97,218,251,0.08)',  border: 'rgba(97,218,251,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="#61dafb"><circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="10" ry="3.7" fill="none" stroke="#61dafb" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="3.7" fill="none" stroke="#61dafb" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.7" fill="none" stroke="#61dafb" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg> },
  { label: 'TypeScript',color: '#3178c6', bg: 'rgba(49,120,198,0.1)',   border: 'rgba(49,120,198,0.3)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="3" fill="#3178c6"/><text x="3" y="18" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">TS</text></svg> },
  { label: 'Redux',     color: '#764abc', bg: 'rgba(118,74,188,0.1)',   border: 'rgba(118,74,188,0.28)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M16 5.5C18.2 7 19 9 18.5 12" stroke="#764abc" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 5.5C5.8 7 5 9 5.5 12" stroke="#764abc" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 17c1 1.5 2.4 2 4 2s3-.5 4-2" stroke="#764abc" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="#764abc" strokeWidth="1.3"/><circle cx="19" cy="12" r="1.3" fill="#764abc"/><circle cx="5" cy="12" r="1.3" fill="#764abc"/><circle cx="12" cy="19.5" r="1.3" fill="#764abc"/></svg> },
  { label: 'Node.js',   color: '#68a063', bg: 'rgba(104,160,99,0.08)',  border: 'rgba(104,160,99,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="#68a063" strokeWidth="1.3"/><text x="7.5" y="15.5" fontSize="6.5" fontWeight="bold" fill="#68a063" fontFamily="monospace">JS</text></svg> },
  { label: 'Jest',      color: '#c21325', bg: 'rgba(194,19,37,0.08)',   border: 'rgba(194,19,37,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="9" stroke="#c21325" strokeWidth="1.3"/><text x="6.5" y="16" fontSize="9" fontWeight="bold" fill="#c21325" fontFamily="monospace">J</text></svg> },
  { label: 'Claude AI', color: '#d97706', bg: 'rgba(217,119,6,0.08)',   border: 'rgba(217,119,6,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="9" stroke="#d97706" strokeWidth="1.3"/><path d="M8.5 12c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5" stroke="#d97706" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="14.5" r="1.5" fill="#d97706"/></svg> },
]

const RIGHT_ICONS: Icon[] = [
  { label: 'JavaScript',   color: '#f7df1e', bg: 'rgba(247,223,30,0.08)',  border: 'rgba(247,223,30,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="3" fill="#f7df1e"/><text x="3" y="18" fontSize="11" fontWeight="bold" fill="#222" fontFamily="monospace">JS</text></svg> },
  { label: 'Vite',         color: '#a855f7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#a855f7" strokeWidth="1.2"/><path d="M14 8l-5 8M10 8l5 8" stroke="#f7df1e" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: 'Tailwind',     color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M6 10c1-4 3.5-6 6-5s4.5 4 3 6c-1.5 2.5.5 5 3 4" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round"/><path d="M3 16c1-4 3.5-6 6-5s4.5 4 3 6" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: 'Webpack',      color: '#8dd6f9', bg: 'rgba(141,214,249,0.07)', border: 'rgba(141,214,249,0.22)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke="#8dd6f9" strokeWidth="1.2"/><polygon points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5" stroke="#8dd6f9" strokeWidth="0.9"/></svg> },
  { label: 'Git',          color: '#f05032', bg: 'rgba(240,80,50,0.08)',   border: 'rgba(240,80,50,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="6" cy="18" r="2" fill="#f05032"/><circle cx="18" cy="6" r="2" fill="#f05032"/><circle cx="18" cy="18" r="2" fill="#f05032"/><path d="M6 16v-5a3 3 0 013-3h5M18 8v8" stroke="#f05032" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: 'n8n',          color: '#ea4b71', bg: 'rgba(234,75,113,0.08)',  border: 'rgba(234,75,113,0.25)',
    svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><rect x="2" y="8" width="5" height="8" rx="2" stroke="#ea4b71" strokeWidth="1.2"/><rect x="17" y="8" width="5" height="8" rx="2" stroke="#ea4b71" strokeWidth="1.2"/><circle cx="12" cy="12" r="2.2" fill="#ea4b71"/><line x1="7" y1="12" x2="9.8" y2="12" stroke="#ea4b71" strokeWidth="1.2"/><line x1="14.2" y1="12" x2="17" y2="12" stroke="#ea4b71" strokeWidth="1.2"/></svg> },
]

function IconBadge({ icon, delay }: { icon: Icon; delay: number }) {
  const floatClass = ['float-0', 'float-1', 'float-2'][delay % 3]
  return (
    <div
      className={`${floatClass} flex items-center gap-2 px-2.5 py-1.5 rounded-xl backdrop-blur-sm cursor-default w-full`}
      style={{ background: icon.bg, border: `1px solid ${icon.border}` }}
    >
      <div className="flex-shrink-0">{icon.svg}</div>
      <span className="font-mono text-[0.68rem] font-medium whitespace-nowrap" style={{ color: icon.color }}>
        {icon.label}
      </span>
    </div>
  )
}

export default function Hero() {
  const { ref, visible } = useReveal()
  const { lang, t } = useLang()

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16 px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(59,130,246,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(6,182,212,0.06) 0%, transparent 60%), var(--bg)' }} />
        <div className="absolute inset-0 hero-grid" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: text ── */}
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full px-4 py-1.5 font-mono text-[0.75rem] text-cyan mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
            {t.hero.badge}
          </div>
          <h1 className="font-syne text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.05] mb-2">
            Rafael<br /><span className="grad">Álvarez Calvo</span>
          </h1>
          <TypeWriter lang={lang} />
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-7 max-w-[460px] mb-8">
            {t.hero.desc} <strong className="text-[var(--text)] font-medium">{t.hero.strong}</strong>
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#projects" className="bg-gradient-to-br from-blue to-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold text-[0.95rem] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] transition-all duration-200">
              {t.hero.cta1}
            </a>
            <a href="#contact" className="border border-[var(--border)] text-[var(--text)] px-8 py-3 rounded-lg font-semibold text-[0.95rem] hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all duration-200">
              {t.hero.cta2}
            </a>
          </div>
          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)]">
            <StatItem target={4}  label={t.hero.stats.exp}      suffix="+" />
            <StatItem target={10} label={t.hero.stats.projects} suffix="+" />
            <StatItem target={5}  label={t.hero.stats.companies} />
            <StatItem target={6}  label={t.hero.stats.certs} />
          </div>
        </div>

        {/* ── RIGHT: [icons | photo | icons] ── */}
        <div className="hidden md:grid items-center gap-3" style={{ gridTemplateColumns: '108px 1fr 108px', height: '520px' }}>

          {/* Left icon column */}
          <div className="flex flex-col justify-center gap-2.5 items-end">
            {LEFT_ICONS.map((icon, i) => (
              <IconBadge key={icon.label} icon={icon} delay={i} />
            ))}
          </div>

          {/* Photo — center column */}
          <div className="relative h-full flex items-end justify-center">

            {/* Hex grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 220 520" className="opacity-15">
                <defs>
                  <pattern id="hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                    <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="#3b82f6" strokeWidth="0.7" />
                  </pattern>
                  <radialGradient id="hf" cx="50%" cy="55%" r="42%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                  <mask id="hm"><rect width="220" height="520" fill="url(#hf)" /></mask>
                </defs>
                <rect width="220" height="520" fill="url(#hex)" mask="url(#hm)" />
              </svg>
            </div>

            {/* Corner brackets */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan opacity-50" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan opacity-50" />
              <div className="absolute bottom-6 left-3 w-5 h-5 border-b-2 border-l-2 border-blue opacity-50" />
              <div className="absolute bottom-6 right-3 w-5 h-5 border-b-2 border-r-2 border-blue opacity-50" />
            </div>

            {/* Photo */}
            <div className="relative z-10 w-full h-full">
              {/* Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.55) 0%, transparent 70%)', filter: 'blur(8px)' }} />
              {/* Fades */}
              <div className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--bg) 15%, transparent 100%)' }} />
              <div className="absolute inset-y-0 left-0 w-3 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
              <div className="absolute inset-y-0 right-0 w-3 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />
              <div className="absolute top-0 left-0 right-0 h-6 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }} />
              {/* Blue tint */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(160deg, rgba(59,130,246,0.06) 0%, transparent 50%, rgba(6,182,212,0.04) 100%)' }} />
              {/* Scanline */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ opacity: 0.03 }}>
                <div style={{ position: 'absolute', left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #06b6d4, transparent)', animation: 'scanline 5s linear infinite' }} />
              </div>

              <img src={rafaelPhoto} alt="Rafael Álvarez Calvo"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'contrast(1.04) brightness(0.95) saturate(0.88)' }} />

              {/* Online badge */}
              <div className="absolute top-8 left-4 z-30 flex items-center gap-1.5 bg-[rgba(4,13,30,0.85)] border border-[var(--border)] rounded-full px-2.5 py-1 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
                <span className="font-mono text-[0.65rem] text-mint">online</span>
              </div>
            </div>
          </div>

          {/* Right icon column */}
          <div className="flex flex-col justify-center gap-2.5 items-start">
            {RIGHT_ICONS.map((icon, i) => (
              <IconBadge key={icon.label} icon={icon} delay={i + 1} />
            ))}
          </div>

        </div>
      </div>

      <style>{`@keyframes scanline { 0% { top: -3px; } 100% { top: 100%; } }`}</style>
    </section>
  )
}
