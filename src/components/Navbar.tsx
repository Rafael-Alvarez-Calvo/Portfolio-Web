import { useEffect, useState, useRef } from 'react'
import { useLang } from '../contexts/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) setCvOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const links = [
    { href: '#about',      label: t.nav.about },
    { href: '#services',   label: t.nav.services },
    { href: '#skills',     label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#projects',   label: t.nav.projects },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 h-16 transition-all duration-300 ${scrolled ? 'bg-[rgba(4,13,30,0.92)] backdrop-blur-xl border-b border-[var(--border)]' : ''}`}>
      {/* 3-column grid: logo | links (centered) | actions */}
      <div className="hidden md:grid h-full px-8 items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        {/* Logo — left */}
        <a href="#hero" className="font-mono text-cyan text-base tracking-wide justify-self-start">
          Rafael<span className="text-blue">.AC</span>
        </a>

        {/* Links — true center */}
        <ul className="flex gap-8 list-none items-center">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[var(--text-muted)] hover:text-[var(--text)] text-sm font-medium tracking-wide transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions — right */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* Language: shows CURRENT language, click to toggle */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="h-9 px-3.5 flex items-center border border-[var(--border)] rounded-lg font-mono text-xs font-bold text-[var(--text-muted)] hover:border-blue hover:text-cyan transition-all"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {lang.toUpperCase()}
          </button>

          {/* CV dropdown */}
          <div ref={cvRef} className="relative">
            <button
              onClick={() => setCvOpen(!cvOpen)}
              className="h-9 px-3 flex items-center gap-1.5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-lg text-xs font-semibold text-cyan hover:bg-[rgba(59,130,246,0.18)] transition-all whitespace-nowrap"
            >
              ⬇ {t.nav.downloadCV}
            </button>
            {cvOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-w-[178px] z-50">
                <a href="/cv-es.pdf" download className="flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--text)] hover:bg-[rgba(59,130,246,0.1)] transition-colors border-b border-[var(--border)]">
                  🇪🇸 {t.nav.cvEs}
                </a>
                <a href="/cv-en.pdf" download className="flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--text)] hover:bg-[rgba(59,130,246,0.1)] transition-colors">
                  🇬🇧 {t.nav.cvEn}
                </a>
              </div>
            )}
          </div>

          <a href="#contact" className="h-9 px-4 flex items-center bg-blue text-white text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity whitespace-nowrap">
            {t.nav.contact}
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between h-full px-5">
        <a href="#hero" className="font-mono text-cyan text-base">Rafael<span className="text-blue">.AC</span></a>
        <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--card)] border-b border-[var(--border)] flex flex-col p-4 gap-2 md:hidden z-40">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[var(--text-muted)] text-sm py-2 border-b border-[var(--border)]" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <div className="flex gap-2 mt-2">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex-1 border border-[var(--border)] rounded-lg py-2 text-sm font-mono font-bold text-cyan">
              {lang.toUpperCase()}
            </button>
          </div>
          <a href="/cv-es.pdf" download className="text-center bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] text-cyan text-sm font-semibold py-2 rounded-lg">🇪🇸 {t.nav.cvEs}</a>
          <a href="/cv-en.pdf" download className="text-center bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] text-cyan text-sm font-semibold py-2 rounded-lg">🇬🇧 {t.nav.cvEn}</a>
          <a href="#contact" className="text-center bg-blue text-white text-sm font-semibold py-2 rounded-lg mt-1" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </div>
      )}
    </nav>
  )
}
