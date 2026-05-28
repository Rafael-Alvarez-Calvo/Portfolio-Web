import { useState, FormEvent } from 'react'
import { useReveal } from '../hooks/useReveal'

const contactLinks = [
  { icon: '✉️', label: 'rafael.alvarez@hotmail.es', href: 'mailto:rafael.alvarez@hotmail.es' },
  { icon: '📱', label: '+34 610 385 927', href: 'tel:+34610385927' },
  { icon: '💼', label: 'linkedin.com/in/rafael-ac', href: 'https://www.linkedin.com/in/rafael-ac/' },
  { icon: '🐙', label: 'github.com/Rafael-Alvarez-Calvo', href: 'https://github.com/Rafael-Alvarez-Calvo' },
]

const services = [
  'Página web profesional',
  'Tienda online (E-commerce)',
  'Solución con Inteligencia Artificial',
  'CRM / Aplicación a medida',
  'Mejora de web existente',
  'Integración con terceros / APIs',
  'Otro / Consulta general',
]

export default function Contact() {
  const header = useReveal()
  const left = useReveal()
  const right = useReveal()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      ;(e.target as HTMLFormElement).reset()
    }, 3500)
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''} text-center mb-14`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// contacto</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            ¿Tienes un proyecto<br />
            <span className="grad">en mente?</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[0.97rem] max-w-[480px] mx-auto leading-[1.7]">
            Si tu negocio no tiene web, necesita una tienda online o quieres integrar IA en tus procesos, escríbeme. Respondo en menos de 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left — links */}
          <div ref={left.ref} className={`reveal ${left.visible ? 'visible' : ''}`}>
            <div className="flex flex-col">
              {contactLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[var(--text)] no-underline text-[0.92rem] py-3 hover:text-cyan transition-colors border-b border-[var(--border)] last:border-0"
                >
                  <div className="w-10 h-10 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {l.icon}
                  </div>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="mt-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="font-mono text-[0.75rem] text-cyan mb-3">// disponibilidad</div>
              <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.8]">
                📍 Madrid, España<br />
                ⏱️ Respondo en menos de 24h<br />
                🤝 Abierto a proyectos freelance<br />
                🌍 Trabajo remoto disponible
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div ref={right.ref} className={`reveal d2 ${right.visible ? 'visible' : ''}`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Nombre">
                  <input type="text" placeholder="Tu nombre" required className="form-input" />
                </FormField>
                <FormField label="Email">
                  <input type="email" placeholder="tu@email.com" required className="form-input" />
                </FormField>
              </div>

              <FormField label="¿Qué necesitas?">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>Selecciona un servicio...</option>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>

              <FormField label="Cuéntame tu proyecto">
                <textarea
                  placeholder="Describe brevemente qué necesitas para tu negocio..."
                  className="form-input min-h-[110px] resize-y"
                />
              </FormField>

              <button
                type="submit"
                className={`mt-1 py-3.5 rounded-lg font-semibold text-[0.95rem] text-white transition-all duration-300 ${
                  submitted
                    ? 'bg-gradient-to-br from-mint to-[#059669] shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                    : 'bg-gradient-to-br from-blue to-[#1d4ed8] shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:opacity-90 hover:-translate-y-0.5'
                }`}
              >
                {submitted ? '✓ ¡Mensaje enviado!' : 'Enviar mensaje →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{label}</label>
      {children}
    </div>
  )
}
