import { useState, FormEvent, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

const contactLinks = [
  { icon:'✉️', label:'rafael.alvarez@hotmail.es', href:'mailto:rafael.alvarez@hotmail.es' },
  { icon:'📱', label:'+34 610 385 927', href:'tel:+34610385927' },
  { icon:'💼', label:'linkedin.com/in/rafael-ac', href:'https://www.linkedin.com/in/rafael-ac/' },
  { icon:'🐙', label:'github.com/Rafael-Alvarez-Calvo', href:'https://github.com/Rafael-Alvarez-Calvo' },
]

type Status = 'idle'|'loading'|'success'|'error'

export const Contact = () => {
  const { t, lang } = useLang()
  const header = useReveal(); const left = useReveal(); const right = useReveal()
  const formRef = useRef<HTMLFormElement>(null)
  const [token, setToken] = useState<string|null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    window.onTurnstileVerify = (tk: string) => setToken(tk)
    window.onTurnstileExpire = () => setToken(null)
    if (document.getElementById('cf-turnstile-script')) return
    const script = document.createElement('script')
    script.id = 'cf-turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true; script.defer = true
    document.head.appendChild(script)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!token) { setErrMsg(t.contact.captcha); return }
    setStatus('loading'); setErrMsg('')
    const data = new FormData(e.currentTarget)
    try {
      await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, {
        from_name: data.get('from_name'), from_email: data.get('from_email'),
        service: data.get('service'), message: data.get('message'),
        time: new Date().toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', { dateStyle:'full', timeStyle:'short' }),
      }, EJ_KEY)
      setStatus('success'); formRef.current?.reset(); setToken(null)
      window.turnstile?.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error'); setErrMsg(t.contact.form.errMsg)
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const btnCfg = {
    idle:    { text: t.contact.form.submit,  bg:'from-blue to-[#1d4ed8]',       sh:'rgba(59,130,246,0.3)' },
    loading: { text: t.contact.form.sending, bg:'from-[#1d4ed8] to-[#1e3a8a]', sh:'rgba(59,130,246,0.2)' },
    success: { text: t.contact.form.sent,    bg:'from-mint to-[#059669]',       sh:'rgba(16,185,129,0.4)' },
    error:   { text: t.contact.form.error,   bg:'from-red-500 to-red-700',      sh:'rgba(239,68,68,0.3)'  },
  }[status]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible?'visible':''} text-center mb-14`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.contact.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{t.contact.title}<br/><span className="grad">{t.contact.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[0.97rem] max-w-[480px] mx-auto leading-[1.7]">{t.contact.sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <div ref={left.ref} className={`reveal ${left.visible?'visible':''}`}>
            <div className="flex flex-col">
              {contactLinks.map(l => (
                <a key={l.href} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                  className="flex items-center gap-3 text-[var(--text)] no-underline text-[0.92rem] py-3 hover:text-cyan transition-colors border-b border-[var(--border)] last:border-0">
                  <div className="w-10 h-10 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">{l.icon}</div>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="font-mono text-[0.75rem] text-cyan mb-3">{t.contact.avail.tag}</div>
              <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.8]">{t.contact.avail.line1}<br/>{t.contact.avail.line2}<br/>{t.contact.avail.line3}<br/>{t.contact.avail.line4}</p>
            </div>
          </div>
          <div ref={right.ref} className={`reveal d2 ${right.visible?'visible':''}`}>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5"><label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{t.contact.form.name}</label><input name="from_name" type="text" placeholder={t.contact.form.namePh} required className="form-input"/></div>
                <div className="flex flex-col gap-1.5"><label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{t.contact.form.email}</label><input name="from_email" type="email" placeholder={t.contact.form.emailPh} required className="form-input"/></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{t.contact.form.service}</label>
                <select name="service" required className="form-input" defaultValue="">
                  <option value="" disabled>{t.contact.form.servicePh}</option>
                  {t.contact.services.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5"><label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{t.contact.form.msg}</label><textarea name="message" placeholder={t.contact.form.msgPh} required className="form-input min-h-[110px] resize-y"/></div>
              <div>
                <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="dark" data-language="es" data-callback="onTurnstileVerify" data-expired-callback="onTurnstileExpire"/>
                {!token && status==='idle' && <p className="text-[0.75rem] text-[var(--text-dim)] mt-1.5 font-mono">{t.contact.captcha}</p>}
                {token && <p className="text-[0.75rem] text-mint mt-1.5 font-mono">{t.contact.captchaOk}</p>}
              </div>
              {errMsg && <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg px-4 py-3 text-red-300 text-[0.85rem]">{errMsg}</div>}
              <button type="submit" disabled={status==='loading'||!token}
                className={`mt-1 py-3.5 rounded-lg font-semibold text-[0.95rem] text-white transition-all duration-300 bg-gradient-to-br ${btnCfg.bg} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ boxShadow:`0 0 30px ${btnCfg.sh}` }}>
                {status==='loading' ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10"/></svg>{btnCfg.text}</span> : btnCfg.text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
