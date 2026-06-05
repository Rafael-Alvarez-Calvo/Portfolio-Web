import { useEffect, useRef, useState } from 'react'
import rafaelPhoto from '../assets/rafael-photo.webp'
import { useReveal, useCounter } from '../hooks/useReveal'
import { useLang } from '../contexts/LanguageContext'

const ROLES_ES = ['Frontend Developer','React Specialist','AI Solutions Dev','Full Stack Dev','Software Engineer']
const ROLES_EN = ['Frontend Developer','React Specialist','AI Solutions Dev','Full Stack Dev','Software Engineer']

function TypeWriter({ lang }: { lang: string }) {
  const roles = lang === 'es' ? ROLES_ES : ROLES_EN
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    setText(''); setRoleIdx(0); setDeleting(false)
  }, [lang])
  useEffect(() => {
    const cur = roles[roleIdx], delay = deleting ? 45 : 100
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = cur.slice(0, text.length + 1); setText(next)
        if (next === cur) setTimeout(() => setDeleting(true), 2200)
      } else {
        const next = text.slice(0, -1); setText(next)
        if (next === '') { setDeleting(false); setRoleIdx(i => (i+1) % roles.length) }
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [text, roleIdx, deleting, roles])
  return (
    <div className="font-mono text-cyan text-base mb-6 min-h-[1.75rem]">
      <span className="text-[var(--text-dim)]">&gt; </span>
      <span>{text}</span>
      <span className="inline-block w-0.5 h-[1em] bg-cyan ml-0.5 animate-blink align-middle"/>
    </div>
  )
}

function StatItem({ target, label, suffix='' }: { target:number; label:string; suffix?:string }) {
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(target, ref)
  return (
    <div ref={ref} className="text-left">
      <div className="font-syne text-3xl font-extrabold">{count}<span className="text-cyan">{suffix}</span></div>
      <div className="text-[0.72rem] text-[var(--text-dim)] uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  )
}

// ─── 14 Tech icons — left col (7) + right col (7) ───────────────────────────
const LEFT_ICONS = [
  { label:'React',      color:'#61dafb', bg:'rgba(97,218,251,0.08)',  border:'rgba(97,218,251,0.28)',  top:'6%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="#61dafb"><circle cx="12" cy="12" r="2.3"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61dafb" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61dafb" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61dafb" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg> },
  { label:'TypeScript', color:'#3178c6', bg:'rgba(49,120,198,0.1)',   border:'rgba(49,120,198,0.35)',  top:'21%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="3" fill="#3178c6"/><text x="3" y="18" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">TS</text></svg> },
  { label:'Redux',      color:'#764abc', bg:'rgba(118,74,188,0.1)',   border:'rgba(118,74,188,0.32)',  top:'37%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M16 5.5C18.2 7 19.2 9.2 18.7 12" stroke="#764abc" strokeWidth="1.4" strokeLinecap="round"/><path d="M8 5.5C5.8 7 4.8 9.2 5.3 12" stroke="#764abc" strokeWidth="1.4" strokeLinecap="round"/><path d="M8 17c1 1.5 2.4 2 4 2s3-.5 4-2" stroke="#764abc" strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="12" r="2.8" fill="none" stroke="#764abc" strokeWidth="1.4"/><circle cx="19" cy="12" r="1.4" fill="#764abc"/><circle cx="5" cy="12" r="1.4" fill="#764abc"/><circle cx="12" cy="19.5" r="1.4" fill="#764abc"/></svg> },
  { label:'Node.js',    color:'#68a063', bg:'rgba(104,160,99,0.08)',  border:'rgba(104,160,99,0.28)',  top:'53%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="#68a063" strokeWidth="1.4"/><text x="7" y="15.5" fontSize="7" fontWeight="bold" fill="#68a063" fontFamily="monospace">JS</text></svg> },
  { label:'Jest',       color:'#c21325', bg:'rgba(194,19,37,0.08)',   border:'rgba(194,19,37,0.28)',   top:'69%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="12" cy="12" r="9" stroke="#c21325" strokeWidth="1.4"/><path d="M9 10v5c0 1.1.9 2 2 2h.5" stroke="#c21325" strokeWidth="1.4" strokeLinecap="round"/><circle cx="15.5" cy="16.5" r="1.8" fill="none" stroke="#c21325" strokeWidth="1.2"/></svg> },
  { label:'Claude AI',  color:'#d97706', bg:'rgba(217,119,6,0.08)',   border:'rgba(217,119,6,0.28)',   top:'83%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="12" cy="12" r="9" stroke="#d97706" strokeWidth="1.3"/><path d="M8.5 12c0-2 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5" stroke="#d97706" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="14.5" r="1.5" fill="#d97706"/></svg> },
]

const RIGHT_ICONS = [
  { label:'JavaScript', color:'#f7df1e', bg:'rgba(247,223,30,0.08)',  border:'rgba(247,223,30,0.28)',  top:'4%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="3" fill="#f7df1e"/><text x="3" y="18" fontSize="11" fontWeight="bold" fill="#222" fontFamily="monospace">JS</text></svg> },
  { label:'Vite',       color:'#a855f7', bg:'rgba(168,85,247,0.08)',  border:'rgba(168,85,247,0.28)',  top:'19%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="#a855f7" strokeWidth="1.3"/><path d="M14 8l-5 8M10 8l5 8" stroke="#f7df1e" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label:'TailwindCSS',color:'#38bdf8', bg:'rgba(56,189,248,0.08)',  border:'rgba(56,189,248,0.28)',  top:'35%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M6 10c1-4 3.5-6 6-5s4.5 4 3 6c-1.5 2.5 .5 5 3 4" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round"/><path d="M3 16c1-4 3.5-6 6-5s4.5 4 3 6" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label:'Webpack',    color:'#8dd6f9', bg:'rgba(141,214,249,0.07)', border:'rgba(141,214,249,0.25)', top:'51%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="#8dd6f9" strokeWidth="1.3"/><polygon points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5" fill="none" stroke="#8dd6f9" strokeWidth="1"/></svg> },
  { label:'Git',        color:'#f05032', bg:'rgba(240,80,50,0.08)',   border:'rgba(240,80,50,0.28)',   top:'67%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="6" cy="18" r="2.2" fill="#f05032"/><circle cx="18" cy="6" r="2.2" fill="#f05032"/><circle cx="18" cy="18" r="2.2" fill="#f05032"/><path d="M6 16v-5a3 3 0 013-3h5M18 8.2V16" stroke="#f05032" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label:'n8n',        color:'#ea4b71', bg:'rgba(234,75,113,0.08)',  border:'rgba(234,75,113,0.28)',  top:'83%',
    svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="2" y="8" width="5" height="8" rx="2" fill="none" stroke="#ea4b71" strokeWidth="1.3"/><rect x="17" y="8" width="5" height="8" rx="2" fill="none" stroke="#ea4b71" strokeWidth="1.3"/><circle cx="12" cy="12" r="2.3" fill="#ea4b71"/><line x1="7" y1="12" x2="9.7" y2="12" stroke="#ea4b71" strokeWidth="1.3"/><line x1="14.3" y1="12" x2="17" y2="12" stroke="#ea4b71" strokeWidth="1.3"/></svg> },
]

function TechBadge({ icon, side }: { icon: typeof LEFT_ICONS[0]; side: 'left' | 'right' }) {
  const pos = side === 'left'
    ? { top: icon.top, left: '-2px', transform: 'translateX(-100%)' }
    : { top: icon.top, right: '-2px', transform: 'translateX(100%)' }
  return (
    <div
      className="absolute z-30 flex items-center gap-2 px-2.5 py-1.5 rounded-xl backdrop-blur-sm cursor-default float-0"
      style={{ ...pos, background: icon.bg, border: `1px solid ${icon.border}`, boxShadow: `0 2px 16px ${icon.bg}`, animationDelay: `${Math.random()*3}s` }}
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(59,130,246,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(6,182,212,0.06) 0%, transparent 60%), var(--bg)' }}/>
        <div className="absolute inset-0 hero-grid"/>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full px-4 py-1.5 font-mono text-[0.75rem] text-cyan mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot"/>
            {t.hero.badge}
          </div>
          <h1 className="font-syne text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.05] mb-2">
            Rafael<br/><span className="grad">Álvarez Calvo</span>
          </h1>
          <TypeWriter lang={lang}/>
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
            <StatItem target={4}  label={t.hero.stats.exp}       suffix="+"/>
            <StatItem target={10} label={t.hero.stats.projects}  suffix="+"/>
            <StatItem target={5}  label={t.hero.stats.companies}/>
            <StatItem target={6}  label={t.hero.stats.certs}/>
          </div>
        </div>

        {/* RIGHT — Photo + icons */}
        <div className="hidden md:flex justify-center items-center" style={{ minHeight: '560px' }}>
          {/* Outer wrapper with space for icons */}
          <div className="relative flex items-center justify-center" style={{ width: '420px', height: '560px' }}>

            {/* Hex grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="420" height="560" viewBox="0 0 420 560" className="opacity-12">
                <defs>
                  <pattern id="hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                    <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="#3b82f6" strokeWidth="0.7"/>
                  </pattern>
                  <radialGradient id="hf" cx="50%" cy="55%" r="42%">
                    <stop offset="0%" stopColor="white" stopOpacity="1"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                  </radialGradient>
                  <mask id="hm"><rect width="420" height="560" fill="url(#hf)"/></mask>
                </defs>
                <rect width="420" height="560" fill="url(#hex)" mask="url(#hm)"/>
              </svg>
            </div>

            {/* Corner brackets */}
            <div className="absolute pointer-events-none" style={{ top:'4%', left:'22%', right:'22%', bottom:'2%' }}>
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan opacity-50"/>
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan opacity-50"/>
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue opacity-50"/>
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue opacity-50"/>
            </div>

            {/* Photo */}
            <div className="relative z-10" style={{ width: '240px', height: '520px' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-4 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.55) 0%, transparent 70%)', filter:'blur(10px)' }}/>
              <div className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--bg) 15%, transparent 100%)' }}/>
              <div className="absolute inset-y-0 left-0 w-4 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}/>
              <div className="absolute inset-y-0 right-0 w-4 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}/>
              <div className="absolute top-0 left-0 right-0 h-8 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }}/>
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(160deg, rgba(59,130,246,0.06) 0%, transparent 50%, rgba(6,182,212,0.04) 100%)' }}/>
              <img src={rafaelPhoto} alt="Rafael Álvarez Calvo" className="w-full h-full object-cover object-top"
                style={{ filter:'contrast(1.04) brightness(0.95) saturate(0.88)' }}/>
              {/* Scanline */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ opacity:0.03 }}>
                <div style={{ position:'absolute', left:0, right:0, height:'3px', background:'linear-gradient(to right, transparent, #06b6d4, transparent)', animation:'scanline 5s linear infinite' }}/>
              </div>
              {/* Online dot */}
              <div className="absolute top-10 left-3 z-30 flex items-center gap-1.5 bg-[rgba(4,13,30,0.85)] border border-[var(--border)] rounded-full px-2.5 py-1 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot"/>
                <span className="font-mono text-[0.65rem] text-mint">online</span>
              </div>
            </div>

            {/* ── Left icon column ── */}
            <div className="absolute inset-y-0" style={{ left: '22%', width: 0 }}>
              {LEFT_ICONS.map((icon, i) => (
                <TechBadge key={icon.label} icon={{ ...icon, top: `${8 + i * 15}%` }} side="left"/>
              ))}
            </div>

            {/* ── Right icon column ── */}
            <div className="absolute inset-y-0" style={{ right: '22%', width: 0 }}>
              {RIGHT_ICONS.map((icon, i) => (
                <TechBadge key={icon.label} icon={{ ...icon, top: `${4 + i * 15}%` }} side="right"/>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`@keyframes scanline { 0% { top: -3px; } 100% { top: 100%; } }`}</style>
    </section>
  )
}
