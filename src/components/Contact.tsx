import { useState, FormEvent, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useReveal } from '../hooks/useReveal'

// ─── EmailJS config ───────────────────────────────────────────────────────────
const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

// ─── Turnstile config ─────────────────────────────────────────────────────────
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

const contactLinks = [
  { icon: '✉️', label: 'rafael.alvarez@hotmail.es',        href: 'mailto:rafael.alvarez@hotmail.es' },
  { icon: '📱', label: '+34 610 385 927',                   href: 'tel:+34610385927' },
  { icon: '💼', label: 'linkedin.com/in/rafael-ac',         href: 'https://www.linkedin.com/in/rafael-ac/' },
  { icon: '🐙', label: 'github.com/Rafael-Alvarez-Calvo',   href: 'https://github.com/Rafael-Alvarez-Calvo' },
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

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const header = useReveal()
  const left   = useReveal()
  const right  = useReveal()

  const formRef            = useRef<HTMLFormElement>(null)
  const turnstileRef       = useRef<HTMLDivElement>(null)
  const [token, setToken]  = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  // ── Load Turnstile script once ──────────────────────────────────────────────
  useEffect(() => {
    // Expose callbacks before the script loads
    window.onTurnstileVerify = (t: string) => setToken(t)
    window.onTurnstileExpire = () => setToken(null)

    if (document.getElementById('cf-turnstile-script')) return

    const script = document.createElement('script')
    script.id    = 'cf-turnstile-script'
    script.src   = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [])

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!token) {
      setErrMsg('Por favor, completa la verificación de seguridad.')
      return
    }

    setStatus('loading')
    setErrMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    const templateParams = {
      from_name:  data.get('from_name')  as string,
      from_email: data.get('from_email') as string,
      service:    data.get('service')    as string,
      message:    data.get('message')    as string,
      time:       new Date().toLocaleString('es-ES', {
        dateStyle: 'full', timeStyle: 'short',
      }),
    }

    try {
      await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, templateParams, EJ_KEY)
      setStatus('success')
      form.reset()
      setToken(null)
      // Reset Turnstile widget
      window.turnstile?.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setErrMsg('Algo salió mal. Escríbeme directamente a rafael.alvarez@hotmail.es')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  // ── Button state ────────────────────────────────────────────────────────────
  const btnConfig = {
    idle:    { text: 'Enviar mensaje →',    bg: 'from-blue to-[#1d4ed8]',       shadow: 'rgba(59,130,246,0.3)' },
    loading: { text: 'Enviando...',          bg: 'from-[#1d4ed8] to-[#1e3a8a]', shadow: 'rgba(59,130,246,0.2)' },
    success: { text: '✓ ¡Mensaje enviado!', bg: 'from-mint to-[#059669]',       shadow: 'rgba(16,185,129,0.4)' },
    error:   { text: '✗ Reintentar',        bg: 'from-red-500 to-red-700',      shadow: 'rgba(239,68,68,0.3)'  },
  }[status]

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
            Si tu negocio no tiene web, necesita una tienda online o quieres integrar
            IA en tus procesos, escríbeme. Respondo en menos de 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — links + availability */}
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
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Nombre">
                  <input
                    name="from_name"
                    type="text"
                    placeholder="Tu nombre"
                    required
                    className="form-input"
                  />
                </FormField>
                <FormField label="Email">
                  <input
                    name="from_email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="form-input"
                  />
                </FormField>
              </div>

              <FormField label="¿Qué necesitas?">
                <select name="service" required className="form-input" defaultValue="">
                  <option value="" disabled>Selecciona un servicio...</option>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>

              <FormField label="Cuéntame tu proyecto">
                <textarea
                  name="message"
                  placeholder="Describe brevemente qué necesitas para tu negocio..."
                  required
                  className="form-input min-h-[110px] resize-y"
                />
              </FormField>

              {/* ── Cloudflare Turnstile ─────────────────────────────────── */}
              <div>
                <div
                  ref={turnstileRef}
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_KEY}
                  data-theme="dark"
                  data-language="es"
                  data-callback="onTurnstileVerify"
                  data-expired-callback="onTurnstileExpire"
                />
                {/* Turnstile not verified yet */}
                {!token && status === 'idle' && (
                  <p className="text-[0.75rem] text-[var(--text-dim)] mt-1.5 font-mono">
                    // verificación requerida antes de enviar
                  </p>
                )}
                {token && (
                  <p className="text-[0.75rem] text-mint mt-1.5 font-mono">
                    ✓ verificación completada
                  </p>
                )}
              </div>

              {/* Error message */}
              {errMsg && (
                <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg px-4 py-3 text-red-300 text-[0.85rem]">
                  {errMsg}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading' || !token}
                className={`mt-1 py-3.5 rounded-lg font-semibold text-[0.95rem] text-white transition-all duration-300 bg-gradient-to-br ${btnConfig.bg} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ boxShadow: `0 0 30px ${btnConfig.shadow}` }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
                    </svg>
                    Enviando...
                  </span>
                ) : btnConfig.text}
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
