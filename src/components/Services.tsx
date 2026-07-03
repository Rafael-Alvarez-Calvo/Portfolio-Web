import { useReveal } from '../hooks/useReveal'
import { useLang } from '../contexts/LanguageContext'

type Service = {
  num: string
  icon: string
  title: string
  tag: string
  desc: string
  img: string
  ai: boolean
}

const ServiceRow = ({ s, index, badge, quoteCta }: { s: Service; index: number; badge: string; quoteCta: string }) => {
  const { ref, visible } = useReveal()
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[340px] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-blue transition-colors duration-300 group`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'} h-56 md:h-auto`}>
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          decoding="async"
          width={800}
          height={533}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/60 via-transparent to-blue/10" />
        {/* Number badge */}
        <div className="absolute top-5 left-5 font-syne font-extrabold text-5xl text-white/10 leading-none select-none">
          {s.num}
        </div>
      </div>

      {/* Content */}
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'} bg-[var(--card)] p-8 md:p-10 flex flex-col justify-center`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{s.icon}</span>
          <span className="font-mono text-[0.72rem] text-cyan uppercase tracking-[0.12em] bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] px-2.5 py-1 rounded-full">
            {s.tag}
          </span>
          {s.ai && (
            <span className="font-mono text-[0.68rem] font-semibold text-purple-300 bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.3)] px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>

        <h3 className="font-syne text-[1.35rem] md:text-[1.5rem] font-bold leading-tight mb-4 text-[var(--text)]">
          {s.title}
        </h3>

        <p className="text-[var(--text-muted)] text-[0.92rem] leading-[1.75] mb-6">
          {s.desc}
        </p>

        <a
          href="#contact"
          className="self-start flex items-center gap-2 text-[0.85rem] font-semibold text-blue hover:text-cyan transition-colors"
        >
          {quoteCta}
          <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
        </a>
      </div>
    </div>
  )
}

export const Services = () => {
  const { t } = useLang()
  const header = useReveal()

  return (
    <section id="services" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''} mb-16`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.services.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            {t.services.title}<br />
            <span className="grad">{t.services.titleGrad}</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] leading-[1.7]">
            {t.services.sub}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {t.services.items.map((s, i) => (
            <ServiceRow key={s.num} s={s} index={i} badge={t.services.badge} quoteCta={t.services.quoteCta} />
          ))}
        </div>
      </div>
    </section>
  )
}
