import { useReveal } from '../hooks/useReveal'

const codeLines = [
  { indent: 0, parts: [{ c: 'dim', t: '// rafael.config.ts' }] },
  { indent: 0, parts: [] },
  { indent: 0, parts: [{ c: 'kw', t: 'const ' }, { c: 'var', t: 'rafael' }, { c: 'text', t: ' = {' }] },
  { indent: 1, parts: [{ c: 'key', t: 'nombre' }, { c: 'text', t: ': ' }, { c: 'str', t: '"Rafael Álvarez Calvo"' }, { c: 'text', t: ',' }] },
  { indent: 1, parts: [{ c: 'key', t: 'rol' }, { c: 'text', t: ': ' }, { c: 'str', t: '"Frontend Developer"' }, { c: 'text', t: ',' }] },
  { indent: 1, parts: [{ c: 'key', t: 'ubicacion' }, { c: 'text', t: ': ' }, { c: 'str', t: '"Madrid, España"' }, { c: 'text', t: ',' }] },
  { indent: 1, parts: [{ c: 'key', t: 'experiencia' }, { c: 'text', t: ': ' }, { c: 'num', t: '4' }, { c: 'dim', t: ' // años' }, { c: 'text', t: ',' }] },
  { indent: 1, parts: [{ c: 'key', t: 'stack' }, { c: 'text', t: ': [' }, { c: 'str', t: '"React"' }, { c: 'text', t: ', ' }, { c: 'str', t: '"TypeScript"' }, { c: 'text', t: ', ' }, { c: 'str', t: '"NodeJS"' }, { c: 'text', t: '],' }] },
  { indent: 1, parts: [{ c: 'key', t: 'especialidades' }, { c: 'text', t: ': [' }] },
  { indent: 2, parts: [{ c: 'str', t: '"Microfrontends"' }, { c: 'text', t: ',' }] },
  { indent: 2, parts: [{ c: 'str', t: '"AI Solutions"' }, { c: 'text', t: ',' }] },
  { indent: 2, parts: [{ c: 'str', t: '"Clean Code + SOLID"' }, { c: 'text', t: ',' }] },
  { indent: 2, parts: [{ c: 'str', t: '"Testing (Jest / RTL)"' }, { c: 'text', t: ',' }] },
  { indent: 1, parts: [{ c: 'text', t: '],' }] },
  { indent: 1, parts: [{ c: 'key', t: 'disponible' }, { c: 'text', t: ': ' }, { c: 'bool', t: 'true' }] },
  { indent: 0, parts: [{ c: 'text', t: '};' }] },
]

const colorMap: Record<string, string> = {
  dim: 'text-[var(--text-dim)]',
  kw: 'text-purple-400',
  var: 'text-cyan',
  key: 'text-amber-400',
  str: 'text-green-300',
  num: 'text-blue-400',
  bool: 'text-emerald-400',
  text: 'text-[var(--text-muted)]',
}

export default function About() {
  const left = useReveal()
  const right = useReveal()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div ref={left.ref} className={`reveal ${left.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// sobre mí</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            Construyo el lado que<br />
            los usuarios <span className="grad">ven y sienten</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-[1.8] mb-4">
            Soy desarrollador Front-End con +4 años construyendo interfaces de alta calidad en empresas como{' '}
            <strong className="text-[var(--text)] font-medium">CaixaBank Tech</strong> y{' '}
            <strong className="text-[var(--text)] font-medium">Pisos.com</strong>.
            Especializado en React, TypeScript, arquitecturas de microfrontends y soluciones con Inteligencia Artificial.
          </p>
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-[1.8] mb-8">
            Ahora aplico toda esa experiencia para ayudar a{' '}
            <strong className="text-[var(--text)] font-medium">negocios como el tuyo</strong> a tener presencia
            digital profesional e integrar las tecnologías de IA más demandadas que automatizan procesos y aumentan ventas.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://github.com/Rafael-Alvarez-Calvo"
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-4 py-2 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all"
            >
              🐙 GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rafael-ac/"
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-4 py-2 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>

        {/* Right — Code block */}
        <div ref={right.ref} className={`reveal d2 ${right.visible ? 'visible' : ''}`}>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 font-mono text-[0.82rem] leading-[1.9]">
            {codeLines.map((line, i) => (
              <div key={i} style={{ marginLeft: `${line.indent * 1.5}rem` }}>
                {line.parts.length === 0 ? (
                  <br />
                ) : (
                  line.parts.map((p, j) => (
                    <span key={j} className={colorMap[p.c]}>
                      {p.t}
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
