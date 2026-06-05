import { useEffect, useRef, useState } from 'react'
import rafaelPhoto from '../assets/rafael-photo.png'
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
    const t = setTimeout(() => {
      if (!deleting) {
        const n = cur.slice(0, text.length + 1); setText(n)
        if (n === cur) setTimeout(() => setDeleting(true), 2200)
      } else {
        const n = text.slice(0, -1); setText(n)
        if (n === '') { setDeleting(false); setRoleIdx(i => (i+1) % ROLES.length) }
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, roleIdx, deleting])
  return (
    <div className="font-mono text-cyan text-base mb-6 min-h-[1.75rem]">
      <span className="text-[var(--text-dim)]">&gt; </span><span>{text}</span>
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

// ── 18 tech icons — safe positions, never on face ───────────────────────────
// Container ~500px wide x 540px tall. Photo centered (~240px wide).
// Face zone to avoid: top 0–38%, center 25–75%
// Left safe: left 0–18% | Right safe: right 0–18% | Bottom: anywhere
const ICONS = [
  // ── LEFT COLUMN (shoulder-height downwards) ──
  { label:'React',      color:'#61dafb', bg:'rgba(97,218,251,0.08)',  border:'rgba(97,218,251,0.28)',  pos:{top:'22%',  left:'2%'},    delay:0,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="#61dafb"><circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="10" ry="3.7" fill="none" stroke="#61dafb" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="3.7" fill="none" stroke="#61dafb" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.7" fill="none" stroke="#61dafb" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg> },
  { label:'TypeScript', color:'#3178c6', bg:'rgba(49,120,198,0.1)',   border:'rgba(49,120,198,0.3)',   pos:{top:'35%',  left:'0%'},    delay:1.2,
    svg:<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="3" fill="#3178c6"/><text x="3" y="18" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">TS</text></svg> },
  { label:'Redux',      color:'#764abc', bg:'rgba(118,74,188,0.1)',   border:'rgba(118,74,188,0.28)',  pos:{top:'48%',  left:'2%'},    delay:2.5,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M16 5.5C18 7 19 9 18.5 12" stroke="#764abc" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 5.5C6 7 5 9 5.5 12" stroke="#764abc" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 17c1 1.5 2.4 2 4 2s3-.5 4-2" stroke="#764abc" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="#764abc" strokeWidth="1.3"/><circle cx="19" cy="12" r="1.3" fill="#764abc"/><circle cx="5" cy="12" r="1.3" fill="#764abc"/><circle cx="12" cy="19.5" r="1.3" fill="#764abc"/></svg> },
  { label:'Formik',     color:'#0ea5e9', bg:'rgba(14,165,233,0.08)',  border:'rgba(14,165,233,0.25)',  pos:{top:'61%',  left:'1%'},    delay:0.8,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#0ea5e9" strokeWidth="1.3"/><path d="M7 10h10M7 14h6" stroke="#0ea5e9" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label:'Node.js',    color:'#68a063', bg:'rgba(104,160,99,0.08)',  border:'rgba(104,160,99,0.25)',  pos:{top:'74%',  left:'3%'},    delay:1.9,
    svg:<svg viewBox="0 0 24 24" width="16" height="16"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="#68a063" strokeWidth="1.3"/><text x="7.5" y="15.5" fontSize="6.5" fontWeight="bold" fill="#68a063" fontFamily="monospace">JS</text></svg> },
  { label:'Bootstrap',  color:'#7952b3', bg:'rgba(121,82,179,0.08)',  border:'rgba(121,82,179,0.25)',  pos:{top:'86%',  left:'2%'},    delay:3.1,
    svg:<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="4" fill="#7952b3"/><text x="5" y="18" fontSize="13" fontWeight="900" fill="white" fontFamily="monospace">B</text></svg> },

  // ── RIGHT COLUMN ──
  { label:'JavaScript', color:'#f7df1e', bg:'rgba(247,223,30,0.08)',  border:'rgba(247,223,30,0.28)',  pos:{top:'18%',  right:'2%'},   delay:0.5,
    svg:<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="3" fill="#f7df1e"/><text x="3" y="18" fontSize="11" fontWeight="bold" fill="#222" fontFamily="monospace">JS</text></svg> },
  { label:'Vite',       color:'#a855f7', bg:'rgba(168,85,247,0.08)',  border:'rgba(168,85,247,0.25)',  pos:{top:'31%',  right:'0%'},   delay:1.7,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#a855f7" strokeWidth="1.2"/><path d="M14 8l-5 8M10 8l5 8" stroke="#f7df1e" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label:'Tailwind',   color:'#38bdf8', bg:'rgba(56,189,248,0.08)',  border:'rgba(56,189,248,0.25)',  pos:{top:'44%',  right:'1%'},   delay:2.8,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M6 10c1-4 3.5-6 6-5s4.5 4 3 6c-1.5 2.5.5 5 3 4" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round"/><path d="M3 16c1-4 3.5-6 6-5s4.5 4 3 6" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label:'Zustand',    color:'#ca8a04', bg:'rgba(202,138,4,0.08)',   border:'rgba(202,138,4,0.25)',   pos:{top:'57%',  right:'2%'},   delay:0.4,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="9" stroke="#ca8a04" strokeWidth="1.3"/><path d="M8 9h8M8 12h6M8 15h8" stroke="#ca8a04" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label:'Jest',       color:'#c21325', bg:'rgba(194,19,37,0.08)',   border:'rgba(194,19,37,0.25)',   pos:{top:'70%',  right:'1%'},   delay:2.1,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="9" stroke="#c21325" strokeWidth="1.3"/><text x="7.5" y="16" fontSize="9" fontWeight="bold" fill="#c21325" fontFamily="monospace">J</text></svg> },
  { label:'Webpack',    color:'#8dd6f9', bg:'rgba(141,214,249,0.07)', border:'rgba(141,214,249,0.22)', pos:{top:'83%',  right:'2%'},   delay:3.4,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke="#8dd6f9" strokeWidth="1.2"/><polygon points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5" stroke="#8dd6f9" strokeWidth="0.9"/></svg> },

  // ── BOTTOM ROW (safe — below body) ──
  { label:'Sass',       color:'#cc6699', bg:'rgba(204,102,153,0.08)', border:'rgba(204,102,153,0.25)', pos:{bottom:'3%', left:'10%'},  delay:2.0,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="9" stroke="#cc6699" strokeWidth="1.3"/><path d="M8 14c0 0 1.5 2 4 2s4-1.5 4-3.5-3-2.5-3-4S14.5 6 16 6" stroke="#cc6699" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label:'Zod',        color:'#3b82f6', bg:'rgba(59,130,246,0.08)',  border:'rgba(59,130,246,0.25)',  pos:{bottom:'3%', left:'28%'},  delay:1.3,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><polygon points="12,3 20,7 20,17 12,21 4,17 4,7" fill="none" stroke="#3b82f6" strokeWidth="1.3"/><text x="8.5" y="15.5" fontSize="8" fontWeight="bold" fill="#3b82f6" fontFamily="monospace">Z</text></svg> },
  { label:'Claude AI',  color:'#d97706', bg:'rgba(217,119,6,0.08)',   border:'rgba(217,119,6,0.25)',   pos:{bottom:'3%', right:'28%'}, delay:2.6,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="9" stroke="#d97706" strokeWidth="1.3"/><path d="M8.5 12c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5" stroke="#d97706" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="14.5" r="1.5" fill="#d97706"/></svg> },
  { label:'Git',        color:'#f05032', bg:'rgba(240,80,50,0.08)',   border:'rgba(240,80,50,0.25)',   pos:{bottom:'3%', right:'10%'}, delay:1.5,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="6" cy="18" r="2" fill="#f05032"/><circle cx="18" cy="6" r="2" fill="#f05032"/><circle cx="18" cy="18" r="2" fill="#f05032"/><path d="M6 16v-5a3 3 0 013-3h5M18 8v8" stroke="#f05032" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label:'n8n',        color:'#ea4b71', bg:'rgba(234,75,113,0.08)',  border:'rgba(234,75,113,0.25)',  pos:{bottom:'10%', left:'5%'},  delay:0.9,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><rect x="2" y="8" width="5" height="8" rx="2" stroke="#ea4b71" strokeWidth="1.2"/><rect x="17" y="8" width="5" height="8" rx="2" stroke="#ea4b71" strokeWidth="1.2"/><circle cx="12" cy="12" r="2.2" fill="#ea4b71"/><line x1="7" y1="12" x2="9.8" y2="12" stroke="#ea4b71" strokeWidth="1.2"/><line x1="14.2" y1="12" x2="17" y2="12" stroke="#ea4b71" strokeWidth="1.2"/></svg> },
  { label:'Figma',      color:'#f24e1e', bg:'rgba(242,78,30,0.08)',   border:'rgba(242,78,30,0.25)',   pos:{bottom:'10%', right:'5%'}, delay:1.1,
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><rect x="7" y="2" width="5" height="5" rx="1" fill="#f24e1e"/><rect x="12" y="2" width="5" height="5" rx="1" fill="#a259ff"/><rect x="7" y="7" width="5" height="5" rx="1" fill="#f24e1e"/><rect x="7" y="12" width="5" height="5" rx="1" fill="#1abcfe"/><circle cx="14.5" cy="14.5" r="2.5" fill="#0acf83"/></svg> },
]


export default function Hero() {
  const { ref, visible } = useReveal()
  const { lang, t } = useLang()

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-16 px-6">
      {/* Bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(59,130,246,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(6,182,212,0.06) 0%, transparent 60%), var(--bg)' }}/>
        <div className="absolute inset-0 hero-grid"/>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT — text */}
        <div ref={ref} className={`reveal ${visible?'visible':''}`}>
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
            <a href="#projects" className="bg-gradient-to-br from-blue to-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold text-[0.95rem] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] transition-all duration-200">{t.hero.cta1}</a>
            <a href="#contact" className="border border-[var(--border)] text-[var(--text)] px-8 py-3 rounded-lg font-semibold text-[0.95rem] hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all duration-200">{t.hero.cta2}</a>
          </div>
          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)]">
            <StatItem target={4}  label={t.hero.stats.exp}       suffix="+"/>
            <StatItem target={10} label={t.hero.stats.projects}  suffix="+"/>
            <StatItem target={5}  label={t.hero.stats.companies}/>
            <StatItem target={6}  label={t.hero.stats.certs}/>
          </div>
        </div>

        {/* RIGHT — photo + floating icons */}
        <div className="hidden md:block relative" style={{ height:'540px' }}>

          {/* Hex grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 500 540" className="opacity-10">
              <defs>
                <pattern id="hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                  <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="#3b82f6" strokeWidth="0.7"/>
                </pattern>
                <radialGradient id="hf" cx="50%" cy="50%" r="45%">
                  <stop offset="0%" stopColor="white" stopOpacity="1"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </radialGradient>
                <mask id="hm"><rect width="500" height="540" fill="url(#hf)"/></mask>
              </defs>
              <rect width="500" height="540" fill="url(#hex)" mask="url(#hm)"/>
            </svg>
          </div>

          {/* Photo — centered */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="relative" style={{ width:'260px', height:'510px' }}>
              {/* Corner brackets */}
              <div className="absolute top-4 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan opacity-40"/>
              <div className="absolute top-4 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan opacity-40"/>
              <div className="absolute bottom-2 left-0 w-5 h-5 border-b-2 border-l-2 border-blue opacity-40"/>
              <div className="absolute bottom-2 right-0 w-5 h-5 border-b-2 border-r-2 border-blue opacity-40"/>
              {/* Floor glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full"
                style={{ background:'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter:'blur(12px)' }}/>
              {/* Ambient glow around figure */}
              <div className="absolute inset-0 z-0 pointer-events-none rounded-full"
                style={{ background:'radial-gradient(ellipse 60% 80% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 70%)' }}/>
              {/* Subtle blue tint overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background:'linear-gradient(160deg, rgba(59,130,246,0.05) 0%, transparent 50%, rgba(6,182,212,0.04) 100%)' }}/>
              {/* Scanline */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ opacity:0.03 }}>
                <div style={{ position:'absolute', left:0, right:0, height:'3px', background:'linear-gradient(to right, transparent, #06b6d4, transparent)', animation:'scanline 5s linear infinite' }}/>
              </div>
              {/* Photo — mix-blend-mode:screen makes black pixels invisible */}
              <img src={rafaelPhoto} alt="Rafael Álvarez Calvo"
                className="relative z-10 w-full h-full object-contain object-bottom"
                style={{ mixBlendMode:'screen', filter:'brightness(1.05) contrast(1.02) drop-shadow(0 0 25px rgba(59,130,246,0.25))' }}/>
              {/* Online */}
              <div className="absolute top-10 left-3 z-30 flex items-center gap-1.5 bg-[rgba(4,13,30,0.85)] border border-[var(--border)] rounded-full px-2.5 py-1 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot"/>
                <span className="font-mono text-[0.65rem] text-mint">online</span>
              </div>
            </div>
          </div>

          {/* Floating icons — organic positions */}
          {ICONS.map(icon => (
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
              <span className="font-mono text-[0.68rem] font-medium whitespace-nowrap" style={{ color:icon.color }}>{icon.label}</span>
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
  )
}
