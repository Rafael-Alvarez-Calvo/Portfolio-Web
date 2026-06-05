import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

function ProjectCard({ p, delay, cta }: { p: { icon:string; gradient:string; url:string; type:string; title:string; desc:string; label:string }; delay:number; cta:string }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  return (
    <a ref={ref} href={p.url} target="_blank" rel="noreferrer"
      className={`reveal ${['','d1','d2'][delay]} ${visible?'visible':''} block bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-blue hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] transition-all duration-300 text-[var(--text)] no-underline group`}>
      <div className="h-40 flex items-center justify-center border-b border-[var(--border)]" style={{background:p.gradient}}>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-3xl">{p.icon}</span>
          <span className="font-mono text-[0.72rem] text-white/40">{p.label}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="font-mono text-[0.72rem] text-cyan uppercase tracking-[0.1em] mb-1.5">{p.type}</div>
        <h3 className="font-syne text-[1.05rem] font-bold mb-2">{p.title}</h3>
        <p className="text-[var(--text-muted)] text-[0.85rem] leading-[1.55] mb-4">{p.desc}</p>
        <span className="inline-flex items-center gap-1 text-[0.85rem] text-blue font-semibold group-hover:gap-2 transition-all">{cta} <span className="transition-transform group-hover:translate-x-1">→</span></span>
      </div>
    </a>
  )
}

export default function Projects() {
  const { t } = useLang(); const h = useReveal()
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={h.ref} className={`reveal ${h.visible?'visible':''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.projects.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{t.projects.title}<br/><span className="grad">{t.projects.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">{t.projects.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((p, i) => <ProjectCard key={p.title} p={p} delay={i%3} cta={t.projects.cta}/>)}
        </div>
        <div className="text-center mt-10">
          <a href="https://github.com/Rafael-Alvarez-Calvo" target="_blank" rel="noreferrer" className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-6 py-3 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all inline-block">{t.projects.github}</a>
        </div>
      </div>
    </section>
  )
}
