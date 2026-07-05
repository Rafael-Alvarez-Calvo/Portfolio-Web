import { useState, FormEvent, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../../contexts/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  TURNSTILE_SITE_KEY,
  CONTACT_LINKS,
  CONTACT_BUTTON_STYLE_BY_STATUS,
} from './Contact.constants'
import type { ContactFormStatus } from './index'

export const Contact = () => {
  const { translations, lang } = useLang()
  const header = useReveal(); const left = useReveal(); const right = useReveal()
  const formRef = useRef<HTMLFormElement>(null)
  const [turnstileToken, setTurnstileToken] = useState<string|null>(null)
  const [status, setStatus] = useState<ContactFormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    window.onTurnstileVerify = (token: string) => setTurnstileToken(token)
    window.onTurnstileExpire = () => setTurnstileToken(null)
    if (document.getElementById('cf-turnstile-script')) return
    const script = document.createElement('script')
    script.id = 'cf-turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true; script.defer = true
    document.head.appendChild(script)
  }, [])

  const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()
    if (!turnstileToken) { setErrorMessage(translations.contact.captcha); return }
    setStatus('loading'); setErrorMessage('')
    const formData = new FormData(formEvent.currentTarget)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.get('from_name'), from_email: formData.get('from_email'),
        service: formData.get('service'), message: formData.get('message'),
        time: new Date().toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', { dateStyle:'full', timeStyle:'short' }),
      }, EMAILJS_PUBLIC_KEY)
      setStatus('success'); formRef.current?.reset(); setTurnstileToken(null)
      window.turnstile?.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error'); setErrorMessage(translations.contact.form.errMsg)
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const buttonTextByStatus = {
    idle: translations.contact.form.submit,
    loading: translations.contact.form.sending,
    success: translations.contact.form.sent,
    error: translations.contact.form.error,
  }
  const buttonText = buttonTextByStatus[status]
  const buttonStyle = CONTACT_BUTTON_STYLE_BY_STATUS[status]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible?'visible':''} text-center mb-14`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{translations.contact.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{translations.contact.title}<br/><span className="grad">{translations.contact.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[0.97rem] max-w-[480px] mx-auto leading-[1.7]">{translations.contact.sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <div ref={left.ref} className={`reveal ${left.visible?'visible':''}`}>
            <div className="flex flex-col">
              {CONTACT_LINKS.map(contactLink => (
                <a key={contactLink.href} href={contactLink.href} target={contactLink.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                  className="flex items-center gap-3 text-[var(--text)] no-underline text-[0.92rem] py-3 hover:text-cyan transition-colors border-b border-[var(--border)] last:border-0">
                  <div className="w-10 h-10 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">{contactLink.icon}</div>
                  {contactLink.label}
                </a>
              ))}
            </div>
            <div className="mt-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="font-mono text-[0.75rem] text-cyan mb-3">{translations.contact.avail.tag}</div>
              <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.8]">{translations.contact.avail.line1}<br/>{translations.contact.avail.line2}<br/>{translations.contact.avail.line3}<br/>{translations.contact.avail.line4}</p>
            </div>
          </div>
          <div ref={right.ref} className={`reveal d2 ${right.visible?'visible':''}`}>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5"><label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{translations.contact.form.name}</label><input name="from_name" type="text" placeholder={translations.contact.form.namePh} required className="form-input"/></div>
                <div className="flex flex-col gap-1.5"><label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{translations.contact.form.email}</label><input name="from_email" type="email" placeholder={translations.contact.form.emailPh} required className="form-input"/></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{translations.contact.form.service}</label>
                <select name="service" required className="form-input" defaultValue="">
                  <option value="" disabled>{translations.contact.form.servicePh}</option>
                  {translations.contact.services.map(service => <option key={service}>{service}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5"><label className="text-[0.82rem] text-[var(--text-muted)] font-medium">{translations.contact.form.msg}</label><textarea name="message" placeholder={translations.contact.form.msgPh} required className="form-input min-h-[110px] resize-y"/></div>
              <div>
                <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" data-language="es" data-callback="onTurnstileVerify" data-expired-callback="onTurnstileExpire"/>
                {!turnstileToken && status==='idle' && <p className="text-[0.75rem] text-[var(--text-dim)] mt-1.5 font-mono">{translations.contact.captcha}</p>}
                {turnstileToken && <p className="text-[0.75rem] text-mint mt-1.5 font-mono">{translations.contact.captchaOk}</p>}
              </div>
              {errorMessage && <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg px-4 py-3 text-red-300 text-[0.85rem]">{errorMessage}</div>}
              <button type="submit" disabled={status==='loading'||!turnstileToken}
                className={`mt-1 py-3.5 rounded-lg font-semibold text-[0.95rem] text-white transition-all duration-300 bg-gradient-to-br ${buttonStyle.gradientClassName} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ boxShadow:`0 0 30px ${buttonStyle.shadowColor}` }}>
                {status==='loading' ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10"/></svg>{buttonText}</span> : buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
