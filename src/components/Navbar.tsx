import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#services', label: 'Servicios' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#projects', label: 'Proyectos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'bg-[rgba(4,13,30,0.92)] backdrop-blur-xl border-b border-[#1c2d4f]' : ''
      }`}
    >
      <a href="#hero" className="font-mono text-cyan text-base tracking-wide">
        Rafael<span className="text-blue">.AC</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-text-muted hover:text-[var(--text)] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="hidden md:block bg-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-85 transition-opacity"
      >
        Contacto
      </a>

      {/* Mobile burger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-[var(--text)] block transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--card)] border-b border-[var(--border)] flex flex-col p-4 gap-3 md:hidden">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-[var(--text-muted)] text-sm py-2"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-blue text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  )
}
