import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const colorMap: Record<string, string> = {
  dim:'text-[var(--text-dim)]', kw:'text-purple-400', var:'text-cyan',
  key:'text-amber-400', str:'text-green-300', num:'text-blue-400',
  bool:'text-emerald-400', text:'text-[var(--text-muted)]',
}

export default function About() {
  const { t } = useLang()
  const c = t.about.code
  const left = useReveal(); const right = useReveal()
  const codeLines = [
    [{ c:'dim', v: c.comment }],
    [],
    [{ c:'kw', v:'const ' }, { c:'var', v:'rafael' }, { c:'text', v:' = {' }],
    [{ c:'key', v: c.nombre }, { c:'text', v:': ' }, { c:'str', v:'"Rafael Álvarez Calvo"' }, { c:'text', v:',' }],
    [{ c:'key', v: c.rol }, { c:'text', v:': ' }, { c:'str', v:`"${c.rolVal}"` }, { c:'text', v:',' }],
    [{ c:'key', v: c.ubicacion }, { c:'text', v:': ' }, { c:'str', v:`"${c.ubicVal}"` }, { c:'text', v:',' }],
    [{ c:'key', v: c.experiencia }, { c:'text', v:': ' }, { c:'num', v:'4' }, { c:'dim', v:` ${c.years}` }, { c:'text', v:',' }],
    [{ c:'key', v: c.especialidades }, { c:'text', v:': [' }],
    [{ c:'str', v:`"${c.e1}"` }, { c:'text', v:',' }],
    [{ c:'str', v:`"${c.e2}"` }, { c:'text', v:',' }],
    [{ c:'str', v:`"${c.e3}"` }, { c:'text', v:',' }],
    [{ c:'str', v:`"${c.e4}"` }, { c:'text', v:',' }],
    [{ c:'text', v:'],' }],
    [{ c:'key', v: c.disponible }, { c:'text', v:': ' }, { c:'bool', v:'true' }],
    [{ c:'text', v:'};' }],
  ]

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={left.ref} className={`reveal ${left.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.about.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            {t.about.title}<br/><span className="grad">{t.about.titleGrad}</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-[1.8] mb-4">
            {t.about.p1} <strong className="text-[var(--text)] font-medium">{t.about.p1b}</strong> {t.about.p1c} <strong className="text-[var(--text)] font-medium">{t.about.p1d}</strong>{t.about.p1e}
          </p>
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-[1.8] mb-8">
            {t.about.p2} <strong className="text-[var(--text)] font-medium">{t.about.p2b}</strong>{t.about.p2c}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="https://github.com/Rafael-Alvarez-Calvo" target="_blank" rel="noreferrer" className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-4 py-2 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/rafael-ac/" target="_blank" rel="noreferrer" className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-4 py-2 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all">💼 LinkedIn</a>
          </div>
        </div>
        <div ref={right.ref} className={`reveal d2 ${right.visible ? 'visible' : ''}`}>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 font-mono text-[0.82rem] leading-[1.9]">
            {codeLines.map((line, i) => (
              <div key={i} style={{ marginLeft: i >= 8 && i <= 11 ? '3rem' : (i >= 7 && i <= 12 ? '1.5rem' : i >= 3 && i <= 14 ? '1.5rem' : '0') }}>
                {line.length === 0 ? <br/> : line.map((p, j) => <span key={j} className={colorMap[p.c]}>{p.v}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
