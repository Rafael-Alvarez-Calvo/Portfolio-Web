import { useReveal } from '../hooks/useReveal'

const certs = [
  { icon: '🧪', name: 'React Testing Library & Jest', meta: 'Udemy · Abr 2025' },
  { icon: '⚛️', name: 'Microfrontends with React', meta: 'Udemy · May 2025' },
  { icon: '🏗️', name: 'Principios SOLID y Clean Code', meta: 'Udemy · Abr 2025' },
  { icon: '🚀', name: 'Advanced React for Enterprise', meta: 'Udemy · Ago 2024' },
  { icon: '📘', name: 'React y TypeScript — Guía Completa', meta: 'Udemy · Sep 2024' },
  { icon: '✅', name: 'React Testing', meta: 'Udemy · Sep 2024' },
]

export default function Certifications() {
  const header = useReveal()
  const edu = useReveal()

  return (
    <section id="certifications" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// formación</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-10">
            Educación y<br />
            <span className="grad">certificaciones</span>
          </h2>
        </div>

        {/* Bootcamp */}
        <div ref={edu.ref} className={`reveal d1 ${edu.visible ? 'visible' : ''} bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex gap-5 items-center mb-8`}>
          <span className="text-4xl flex-shrink-0">🎓</span>
          <div>
            <div className="font-mono text-[0.76rem] text-cyan mb-1">Sep 2020 — Ene 2021</div>
            <div className="font-syne font-bold text-[1.05rem] mb-1">The Bridge | Digital Talent Accelerator</div>
            <div className="text-[var(--text-muted)] text-[0.88rem]">
              Bootcamp Full Stack Web Development — 500 horas intensivas. React, TypeScript, Redux, NextJS, NodeJS, Cypress, Jest, Firebase, MongoDB, SQL, Docker, Kubernetes.
            </div>
          </div>
        </div>

        {/* Certs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c, i) => (
            <CertCard key={c.name} cert={c} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({ cert, delay }: { cert: typeof certs[0]; delay: number }) {
  const { ref, visible } = useReveal()
  const delayClass = ['', 'd1', 'd2'][delay] ?? ''

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${visible ? 'visible' : ''} bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 flex items-center gap-4 hover:border-blue transition-colors duration-200`}
    >
      <div className="w-11 h-11 rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center text-xl flex-shrink-0">
        {cert.icon}
      </div>
      <div>
        <div className="font-semibold text-[0.88rem] mb-0.5">{cert.name}</div>
        <div className="text-[0.76rem] text-[var(--text-muted)]">{cert.meta}</div>
      </div>
    </div>
  )
}
