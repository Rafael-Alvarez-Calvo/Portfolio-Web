import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    icon: '🦷',
    gradient: 'linear-gradient(135deg,#0a1628,#0f2040,#0d3a6e)',
    url: 'https://www.clinicapaldental.es',
    type: 'Full Stack · React + NodeJS + MySQL',
    title: 'Clínica Pal Dental',
    desc: 'Web completa con blog, catálogo de tratamientos, sistema de reseñas y tienda integrada con Stripe. Proyecto freelance full stack desde cero.',
    label: 'clinicapaldental.es',
  },
  {
    icon: '🚀',
    gradient: 'linear-gradient(135deg,#1a0a2e,#2d1454,#3b1a6e)',
    url: 'https://wondrous-twilight-1dadd8.netlify.app/',
    type: 'Frontend · React + TypeScript',
    title: 'Proyecto Web App #1',
    desc: 'Aplicación web moderna con React y TypeScript. Componentes reutilizables, gestión de estado y arquitectura escalable.',
    label: 'wondrous-twilight.netlify.app',
  },
  {
    icon: '💻',
    gradient: 'linear-gradient(135deg,#071a0e,#0a2e17,#0d4020)',
    url: 'https://aesthetic-elf-8bbc6f.netlify.app/',
    type: 'Frontend · JavaScript',
    title: 'Proyecto Web App #2',
    desc: 'Interfaz con JavaScript moderno y clean code. Arquitectura de componentes bien estructurada.',
    label: 'aesthetic-elf.netlify.app',
  },
  {
    icon: '⚡',
    gradient: 'linear-gradient(135deg,#1a0c06,#2e1a0a,#4a2a0e)',
    url: 'https://remarkable-heliotrope-5c9c97.netlify.app/',
    type: 'Frontend · React',
    title: 'Proyecto Web App #3',
    desc: 'App React con custom hooks, gestión de estado avanzada y testing completo con Jest y React Testing Library.',
    label: 'remarkable-heliotrope.netlify.app',
  },
  {
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#060e1a,#0a1a2e,#0d2444)',
    url: 'https://rococo-cassata-2ac39c.netlify.app/',
    type: 'Full Stack',
    title: 'Proyecto Web App #4',
    desc: 'Solución full stack con frontend React, API backend y despliegue continuo en Netlify con CI/CD configurado.',
    label: 'rococo-cassata.netlify.app',
  },
  {
    icon: '🌟',
    gradient: 'linear-gradient(135deg,#0c0a1a,#18142e,#241a44)',
    url: 'https://capable-sopapillas-5ed03b.netlify.app/',
    type: 'Frontend · TypeScript',
    title: 'Proyecto Web App #5',
    desc: 'Interfaz TypeScript con tipado estricto, testing completo y documentación de componentes en Storybook.',
    label: 'capable-sopapillas.netlify.app',
  },
]

function ProjectCard({ p, delay }: { p: typeof projects[0]; delay: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const delayClass = ['', 'd1', 'd2'][delay] ?? ''

  return (
    <a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={`reveal ${delayClass} ${visible ? 'visible' : ''} block bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-blue hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] transition-all duration-300 text-[var(--text)] no-underline group`}
    >
      <div
        className="h-40 flex items-center justify-center border-b border-[var(--border)]"
        style={{ background: p.gradient }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-3xl">{p.icon}</span>
          <span className="font-mono text-[0.72rem] text-white/40">{p.label}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="font-mono text-[0.72rem] text-cyan uppercase tracking-[0.1em] mb-1.5">{p.type}</div>
        <h3 className="font-syne text-[1.05rem] font-bold mb-2">{p.title}</h3>
        <p className="text-[var(--text-muted)] text-[0.85rem] leading-[1.55] mb-4">{p.desc}</p>
        <span className="inline-flex items-center gap-1 text-[0.85rem] text-blue font-semibold group-hover:gap-2 transition-all">
          Ver proyecto <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  )
}

export default function Projects() {
  const header = useReveal()

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// proyectos</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            Trabajos<br />
            <span className="grad">destacados</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">
            Proyectos reales para clientes reales. Cada uno pensado para resolver un problema concreto de negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} delay={i % 3} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/Rafael-Alvarez-Calvo"
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-6 py-3 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all inline-block"
          >
            Ver más proyectos en GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
