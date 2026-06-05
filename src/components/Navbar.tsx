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
    <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-[rgba(4,13,30,0.92)] backdrop-blur-xl border-b border-[var(--border)]' : ''}`}>
      <a href="#hero" className="font-mono text-cyan text-base tracking-wide">
        Rafael<span className="text-blue">.AC</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-7 list-none items-center">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className="text-[var(--text-muted)] hover:text-[var(--text)] text-sm font-medium tracking-wide transition-colors duration-200">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div className="hidden md:flex items-center gap-3">

        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="flex items-center gap-1.5 border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm font-mono text-[var(--text-muted)] hover:border-blue hover:text-cyan transition-all"
          title="Switch language"
        >
          <span className="text-base">{lang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
          <span>{lang === 'es' ? 'ES' : 'EN'}</span>
        </button>

        {/* CV dropdown */}
        <div ref={cvRef} className="relative">
          <button
            onClick={() => setCvOpen(!cvOpen)}
            className="flex items-center gap-1.5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-lg px-3 py-1.5 text-sm font-semibold text-cyan hover:bg-[rgba(59,130,246,0.18)] transition-all"
          >
            ⬇ {t.nav.downloadCV}
          </button>
          {cvOpen && (
            <div className="absolute right-0 top-full mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-w-[180px] z-50">
              <a href="/cv-es.pdf" download className="flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--text)] hover:bg-[rgba(59,130,246,0.1)] transition-colors border-b border-[var(--border)]">
                <span>🇪🇸</span> {t.nav.cvEs}
              </a>
              <a href="/cv-en.pdf" download className="flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--text)] hover:bg-[rgba(59,130,246,0.1)] transition-colors">
                <span>🇬🇧</span> {t.nav.cvEn}
              </a>
            </div>
          )}
        </div>

        <a href="#contact" className="bg-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-85 transition-opacity">
          {t.nav.contact}
        </a>
      </div>

      {/* Mobile burger */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
        <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? 'opacity-0' : ''}`}/>
        <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--card)] border-b border-[var(--border)] flex flex-col p-4 gap-2 md:hidden z-40">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[var(--text-muted)] text-sm py-2 border-b border-[var(--border)]" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          {/* Mobile lang + CV */}
          <div className="flex gap-2 mt-2">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex-1 border border-[var(--border)] rounded-lg py-2 text-sm font-mono text-cyan">
              {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
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
