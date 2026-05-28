import { useEffect, useRef, useState } from 'react'
import rafaelPhoto from '../assets/rafael-photo.webp'
import { useReveal, useCounter } from '../hooks/useReveal'

const ROLES = [
  'Frontend Developer',
  'React Specialist',
  'AI Solutions Dev',
  'Full Stack Dev',
  'Software Engineer',
]

function TypeWriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    const delay = deleting ? 45 : 100
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) setTimeout(() => setDeleting(true), 2200)
      } else {
        const next = text.slice(0, -1)
        setText(next)
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
      <div className="font-syne text-3xl font-extrabold">
        {count}<span className="text-cyan">{suffix}</span>
      </div>
      <div className="text-[0.72rem] text-[var(--text-dim)] uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  )
}

const FLOAT_TAGS = [
  { text: '<React />', color: 'text-cyan',      cls: 'float-0', pos: 'top-[8%]  right-[-2%]' },
  { text: 'const dev = "Rafael"', color: 'text-mint',  cls: 'float-1', pos: 'top-[42%] right-[-4%]' },
  { text: '✨ AI Solutions',       color: 'text-purple-400', cls: 'float-2', pos: 'bottom-[22%] right-[2%]' },
]

export default function Hero() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16 px-6"
    >
      {/* Background grid + radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(59,130,246,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(6,182,212,0.06) 0%, transparent 60%), var(--bg)',
        }} />
        <div className="absolute inset-0 hero-grid" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: text ── */}
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full px-4 py-1.5 font-mono text-[0.75rem] text-cyan mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
            Disponible para proyectos freelance
          </div>

          <h1 className="font-syne text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.05] mb-2">
            Rafael<br /><span className="grad">Álvarez Calvo</span>
          </h1>

          <TypeWriter />

          <p className="text-[var(--text-muted)] text-[0.97rem] leading-7 max-w-[460px] mb-8">
            Desarrollo aplicaciones web modernas y soluciones con IA que transforman negocios.
            +4 años creando productos reales para empresas como CaixaBank y Pisos.com.
            <strong className="text-[var(--text)] font-medium"> Código limpio. Resultados reales.</strong>
          </p>

          <div className="flex gap-3 flex-wrap">
            <a href="#projects" className="bg-gradient-to-br from-blue to-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold text-[0.95rem] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] transition-all duration-200">
              Ver proyectos
            </a>
            <a href="#contact" className="border border-[var(--border)] text-[var(--text)] px-8 py-3 rounded-lg font-semibold text-[0.95rem] hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all duration-200">
              Hablemos →
            </a>
          </div>

          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)]">
            <StatItem target={4}  label="Años exp."  suffix="+" />
            <StatItem target={10} label="Proyectos"  suffix="+" />
            <StatItem target={5}  label="Empresas" />
            <StatItem target={6}  label="Certs." />
          </div>
        </div>

        {/* ── RIGHT: futuristic photo ── */}
        <div className="hidden md:flex justify-center items-end relative" style={{ height: '520px' }}>

          {/* Hex grid background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="420" height="520" viewBox="0 0 420 520" className="opacity-20">
              <defs>
                <pattern id="hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                  <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="#3b82f6" strokeWidth="0.6"/>
                </pattern>
                <radialGradient id="hexFade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </radialGradient>
                <mask id="hexMask">
                  <rect width="420" height="520" fill="url(#hexFade)"/>
                </mask>
              </defs>
              <rect width="420" height="520" fill="url(#hex)" mask="url(#hexMask)"/>
            </svg>
          </div>

          {/* Scan line animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl" style={{ opacity: 0.04 }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '2px',
              background: 'linear-gradient(to right, transparent, #06b6d4, transparent)',
              animation: 'scanline 4s linear infinite',
            }}/>
          </div>

          {/* Corner brackets — futuristic frame */}
          <div className="absolute inset-0 pointer-events-none">
            {/* TL */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan opacity-70" />
            {/* TR */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan opacity-70" />
            {/* BL */}
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue opacity-70" />
            {/* BR */}
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue opacity-70" />
          </div>

          {/* Side measurement lines */}
          <div className="absolute left-2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-cyan to-transparent opacity-40" />
          <div className="absolute right-2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-blue to-transparent opacity-40" />

          {/* The photo — full upper body, no circle crop */}
          <div className="relative z-10 h-full flex items-end justify-center" style={{ width: '340px' }}>

            {/* Blue glow under feet */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(8px)' }}
            />

            {/* Photo with holographic effect */}
            <div className="relative" style={{ width: '300px', height: '480px' }}>
              {/* Blue tint overlay — holographic */}
              <div className="absolute inset-0 z-20 pointer-events-none rounded-t-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(59,130,246,0.08) 0%, transparent 40%, rgba(6,182,212,0.05) 100%)',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Bottom fade — blends photo into bg */}
              <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--bg) 20%, transparent 100%)' }}
              />

              {/* Left/right edge fade */}
              <div className="absolute inset-y-0 left-0 w-8 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
              />
              <div className="absolute inset-y-0 right-0 w-8 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
              />

              {/* Actual photo */}
              <img
                src={rafaelPhoto}
                alt="Rafael Álvarez Calvo"
                className="w-full h-full object-cover object-top"
                style={{
                  filter: 'contrast(1.05) brightness(0.97) saturate(0.9)',
                }}
              />
            </div>

            {/* Floating code tags */}
            {FLOAT_TAGS.map(tag => (
              <span
                key={tag.text}
                className={`absolute ${tag.pos} ${tag.cls} bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2 font-mono text-[0.72rem] ${tag.color} whitespace-nowrap z-30 backdrop-blur-sm shadow-lg`}
              >
                {tag.text}
              </span>
            ))}

            {/* Status dot */}
            <div className="absolute top-6 left-6 z-30 flex items-center gap-1.5 bg-[rgba(4,13,30,0.8)] border border-[var(--border)] rounded-full px-2.5 py-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
              <span className="font-mono text-[0.65rem] text-mint">online</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scanline keyframe */}
      <style>{`
        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  )
}
