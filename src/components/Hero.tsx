import { useEffect, useRef, useState } from 'react'
import rafaelPhoto from '../assets/rafael.png'
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
        if (next === '') {
          setDeleting(false)
          setRoleIdx(i => (i + 1) % ROLES.length)
        }
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
  { text: '<React />', color: 'text-cyan', cls: 'float-0', pos: 'top-[6%] -right-[8%]' },
  { text: 'const dev = "Rafael"', color: 'text-mint', cls: 'float-1', pos: 'bottom-[18%] -left-[8%]' },
  { text: '✨ AI Solutions', color: 'text-purple-400', cls: 'float-2', pos: 'top-[55%] -right-[10%]' },
]

export default function Hero() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(59,130,246,0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(6,182,212,0.06) 0%, transparent 60%), var(--bg)',
          }}
        />
        <div className="absolute inset-0 hero-grid" />
      </div>

      <div className="relative max-width-wrap w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full px-4 py-1.5 font-mono text-[0.75rem] text-cyan mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
            Disponible para proyectos freelance
          </div>

          <h1 className="font-syne text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.05] mb-2">
            Rafael<br />
            <span className="grad">Álvarez Calvo</span>
          </h1>

          <TypeWriter />

          <p className="text-[var(--text-muted)] text-[0.97rem] leading-7 max-w-[460px] mb-8">
            Desarrollo aplicaciones web modernas y soluciones con IA que transforman negocios.
            +4 años creando productos reales para empresas como CaixaBank y Pisos.com.
            <strong className="text-[var(--text)] font-medium"> Código limpio. Resultados reales.</strong>
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="btn-primary bg-gradient-to-br from-blue to-[#1d4ed8] text-white px-8 py-3 rounded-lg font-semibold text-[0.95rem] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] transition-all duration-200"
            >
              Ver proyectos
            </a>
            <a
              href="#contact"
              className="border border-[var(--border)] text-[var(--text)] px-8 py-3 rounded-lg font-semibold text-[0.95rem] hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all duration-200"
            >
              Hablemos →
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)]">
            <StatItem target={4} label="Años exp." suffix="+" />
            <StatItem target={10} label="Proyectos" suffix="+" />
            <StatItem target={5} label="Empresas" />
            <StatItem target={6} label="Certs." />
          </div>
        </div>

        {/* Right — Photo */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-[360px] h-[360px]">
            {/* Spinning ring */}
            <div
              className="absolute inset-[-3px] rounded-full ring-rotate"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
              }}
            />
            {/* Inner mask */}
            <div className="absolute inset-[-1px] rounded-full" style={{ background: 'var(--bg)' }} />

            {/* Photo */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-[var(--card2)] flex items-end justify-center">
              <img
                src={rafaelPhoto}
                alt="Rafael Álvarez Calvo"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating tags */}
            {FLOAT_TAGS.map(tag => (
              <span
                key={tag.text}
                className={`absolute ${tag.pos} ${tag.cls} bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2 font-mono text-[0.72rem] ${tag.color} whitespace-nowrap z-20 backdrop-blur-sm`}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
