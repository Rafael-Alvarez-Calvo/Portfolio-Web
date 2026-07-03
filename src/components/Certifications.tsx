import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const CertCard = ({ cert, delay }: { cert:{icon:string;name:string;meta:string}; delay:number }) => {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`reveal ${['','d1','d2'][delay]} ${visible?'visible':''} bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 flex items-center gap-4 hover:border-blue transition-colors duration-200`}>
      <div className="w-11 h-11 rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center text-xl flex-shrink-0">{cert.icon}</div>
      <div><div className="font-semibold text-[0.88rem] mb-0.5">{cert.name}</div><div className="text-[0.76rem] text-[var(--text-muted)]">{cert.meta}</div></div>
    </div>
  )
}

export const Certifications = () => {
  const { t } = useLang(); const h = useReveal(); const edu = useReveal()
  return (
    <section id="certifications" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={h.ref} className={`reveal ${h.visible?'visible':''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.certifications.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-10">{t.certifications.title}<br/><span className="grad">{t.certifications.titleGrad}</span></h2>
        </div>
        <div ref={edu.ref} className={`reveal d1 ${edu.visible?'visible':''} bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex gap-5 items-center mb-8`}>
          <span className="text-4xl flex-shrink-0">🎓</span>
          <div>
            <div className="font-mono text-[0.76rem] text-cyan mb-1">Sep 2020 — Jan 2021</div>
            <div className="font-syne font-bold text-[1.05rem] mb-1">The Bridge | Digital Talent Accelerator</div>
            <div className="text-[var(--text-muted)] text-[0.88rem]">{t.certifications.bootcamp}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.certifications.certs.map((c, i) => <CertCard key={c.name} cert={c} delay={i%3}/>)}
        </div>
      </div>
    </section>
  )
}
