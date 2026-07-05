import { useLang } from '../../contexts/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import type { SkillPill, SkillGroup } from './index'

const Pill = ({ pill }: { pill: SkillPill }) => {
  if (pill.isAiRelated) return <span className="border border-[rgba(139,92,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-purple-300 hover:border-purple-400 transition-colors cursor-default">{pill.name}</span>
  if (pill.isHighlighted)  return <span className="border border-[rgba(59,130,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-blue-300 hover:border-blue hover:text-cyan transition-colors cursor-default">{pill.name}</span>
  return <span className="border border-[var(--border)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-[var(--text)] hover:border-blue hover:text-cyan transition-colors cursor-default">{pill.name}</span>
}

const Group = ({ group, delay }: { group: SkillGroup; delay:number }) => {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`reveal ${['','d1','d2'][delay]} ${visible?'visible':''}`}>
      <h4 className="font-mono text-[0.75rem] text-cyan uppercase tracking-[0.1em] mb-3">{group.label}</h4>
      <div className="flex flex-wrap gap-2">{group.pills.map(pill => <Pill key={pill.name} pill={pill}/>)}</div>
    </div>
  )
}

export const Skills = () => {
  const { translations } = useLang();
  const header = useReveal()
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible?'visible':''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{translations.skills.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{translations.skills.title} <span className="grad">{translations.skills.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">{translations.skills.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{translations.skills.groups.map((group, groupIndex) => <Group key={group.label} group={group} delay={groupIndex%3}/>)}</div>
      </div>
    </section>
  )
}
