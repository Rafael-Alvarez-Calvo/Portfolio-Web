import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

type Pill = { n: string; h?: boolean; ai?: boolean }
type SkillGroup = { label: string; pills: readonly Pill[] }

const Pill = ({ p }: { p: Pill }) => {
  if (p.ai) return <span className="border border-[rgba(139,92,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-purple-300 hover:border-purple-400 transition-colors cursor-default">{p.n}</span>
  if (p.h)  return <span className="border border-[rgba(59,130,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-blue-300 hover:border-blue hover:text-cyan transition-colors cursor-default">{p.n}</span>
  return <span className="border border-[var(--border)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-[var(--text)] hover:border-blue hover:text-cyan transition-colors cursor-default">{p.n}</span>
}

const Group = ({ g, delay }: { g: SkillGroup; delay:number }) => {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`reveal ${['','d1','d2'][delay]} ${visible?'visible':''}`}>
      <h4 className="font-mono text-[0.75rem] text-cyan uppercase tracking-[0.1em] mb-3">{g.label}</h4>
      <div className="flex flex-wrap gap-2">{g.pills.map(p => <Pill key={p.n} p={p}/>)}</div>
    </div>
  )
}

export const Skills = () => {
  const { t } = useLang(); const h = useReveal()
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={h.ref} className={`reveal ${h.visible?'visible':''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.skills.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{t.skills.title} <span className="grad">{t.skills.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">{t.skills.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{t.skills.groups.map((g,i) => <Group key={g.label} g={g} delay={i%3}/>)}</div>
      </div>
    </section>
  )
}
