import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const jobs = [
  {
    date: 'Jul 2024 — Actualidad',
    company: 'CaixaBank Tech',
    role: 'Software Engineer',
    desc: 'Desarrollo de microfrontends para la app CaixaBank Now. Construcción de aplicaciones internas que mejoran el workflow de equipos. Implementación de componentes UI siguiendo el sistema de diseño corporativo con Web Components y Storybook.',
    tech: ['React','TypeScript','Microfrontends','Web Components','Storybook','Formik','Nanostores','NodeJS'],
    current: true,
  },
  {
    date: 'Ene 2024 — Feb 2025',
    company: 'MentorUP',
    role: 'Frontend Developer',
    desc: 'Creación de web components para landing page. Implementación de clean code y buenas prácticas con test unitarios aplicando design patterns. CI/CD con GitLab.',
    tech: ['Web Components','Lit Element','TypeScript','Sinon','Storybook','CI/CD GitLab','Rollup'],
    current: false,
  },
  {
    date: 'Sep 2021 — Ene 2024 · 2 años 5 meses',
    company: 'Pisos.com | Habitatsoft S.L. — Grupo Vocento',
    role: 'Frontend Developer',
    desc: 'Gestión de propiedades para agencias inmobiliarias. Migración de código legacy a microservicios con React y TypeScript. Uso de MicroFront para desplegar múltiples apps en una sola aplicación.',
    tech: ['React','TypeScript','Redux','Jest','Sass','Webpack','Lean','Azure','Bootstrap'],
    current: false,
  },
  {
    date: 'May 2023 — Ago 2023',
    company: 'Clínica Paldental',
    role: 'Full Stack Developer (Freelance)',
    desc: 'Desarrollo, implementación y despliegue completo de la web de la clínica dental. Blog, catálogo de tratamientos, sistema de reseñas y tienda integrada con Stripe. Backend NodeJS + MySQL.',
    tech: ['React','TypeScript','NodeJS','MySQL','Stripe','Bootstrap 5','Netlify CI/CD','Figma'],
    current: false,
  },
  {
    date: 'Feb 2021 — Sep 2021',
    company: 'Sidertia Solutions (Izertys)',
    role: 'Frontend Developer',
    desc: 'CRM de gestión de auditorías para profesionales de ciberseguridad. Frontend en React, backend en .Net C#. Implementación de tests y resolución de incidencias.',
    tech: ['React','.Net C#','Sass','jQuery','JWT','Bootstrap'],
    current: false,
  },
]

function TimelineItem({ job, index }: { job: typeof jobs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="timeline-item relative flex gap-8"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Line + dot column */}
      <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: '20px' }}>
        {/* Dot */}
        <div
          className="relative z-10 rounded-full flex-shrink-0"
          style={{
            width: '14px',
            height: '14px',
            marginTop: '4px',
            background: job.current ? '#06b6d4' : '#3b82f6',
            boxShadow: job.current
              ? '0 0 0 3px rgba(6,182,212,0.2), 0 0 16px rgba(6,182,212,0.5)'
              : '0 0 0 3px rgba(59,130,246,0.15), 0 0 10px rgba(59,130,246,0.3)',
            border: '2px solid var(--bg2)',
          }}
        />
        {/* Vertical line segment (hidden on last item) */}
        <div
          className="flex-1 w-px mt-2"
          style={{
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(59,130,246,0.05))',
            minHeight: '32px',
          }}
        />
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        <div className="font-mono text-[0.75rem] text-[var(--text-dim)] mb-1">{job.date}</div>
        <div
          className="text-sm font-semibold mb-1"
          style={{ color: job.current ? '#06b6d4' : '#3b82f6' }}
        >
          {job.company}
        </div>
        <div className="font-syne text-[1.1rem] font-bold mb-2">{job.role}</div>
        {job.current && (
          <span className="inline-flex items-center gap-1.5 bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.25)] rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] text-cyan mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"/>
            Trabajo actual
          </span>
        )}
        <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.65] mb-3">{job.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {job.tech.map(t => (
            <span key={t} className="bg-[rgba(59,130,246,0.07)] border border-[rgba(59,130,246,0.18)] rounded px-2 py-0.5 font-mono text-[0.72rem] text-[var(--text-muted)]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const header = useReveal()

  return (
    <section id="experience" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// experiencia</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-12">
            Trayectoria<br/><span className="grad">profesional</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {jobs.map((job, i) => (
            <TimelineItem key={job.company + job.date} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
