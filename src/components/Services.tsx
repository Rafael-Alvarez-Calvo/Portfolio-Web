import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const COLORS = ['rgba(59,130,246,0.1)','rgba(16,185,129,0.1)','rgba(139,92,246,0.1)','rgba(6,182,212,0.1)','rgba(245,158,11,0.1)','rgba(239,68,68,0.1)']

function ServiceCard({ item, color, delay, badge }: { item: { icon:string; title:string; desc:string; ai?:boolean }; color:string; delay:number; badge:string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`reveal ${['','d1','d2'][delay]} ${visible?'visible':''} bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:border-blue hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default`}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5" style={{background:color}}>{item.icon}</div>
      <h3 className="font-syne text-[1.05rem] font-bold mb-3">{item.title}</h3>
      <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.65]">{item.desc}</p>
      {item.ai && <div className="inline-flex items-center gap-1.5 mt-3 bg-[linear-gradient(135deg,rgba(139,92,246,0.15),rgba(59,130,246,0.15))] border border-[rgba(139,92,246,0.4)] rounded-full px-3 py-1 text-[0.72rem] font-semibold text-purple-300">{badge}</div>}
    </div>
  )
}

export default function Services() {
  const { t } = useLang(); const h = useReveal()
  return (
    <section id="services" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={h.ref} className={`reveal ${h.visible?'visible':''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.services.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{t.services.title}<br/><span className="grad">{t.services.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">{t.services.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((item, i) => <ServiceCard key={item.title} item={item} color={COLORS[i]} delay={i%3} badge={t.services.aiBadge}/>)}
        </div>
      </div>
    </section>
  )
}
