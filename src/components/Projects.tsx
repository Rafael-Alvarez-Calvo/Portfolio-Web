import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    screenshot: '/proj-paldental.png',
    url: 'https://www.clinicapaldental.es',
    type: 'Full Stack · React + NodeJS + MySQL',
    title: 'Clínica Pal Dental',
    desc: 'Web completa con blog, catálogo de tratamientos, sistema de reseñas y tienda integrada con Stripe. Proyecto freelance full stack desde cero.',
  },
  {
    screenshot: '/proj-crypto.png',
    url: 'https://wondrous-twilight-1dadd8.netlify.app/',
    type: 'Frontend · React + TypeScript',
    title: 'Cotizador de Criptomonedas',
    desc: 'App para consultar el precio de criptomonedas en tiempo real. Selección de moneda y cripto con datos actualizados vía API.',
  },
  {
    screenshot: '/proj-clima.png',
    url: 'https://aesthetic-elf-8bbc6f.netlify.app/',
    type: 'Frontend · JavaScript',
    title: 'Buscador del Clima',
    desc: 'Buscador de clima por país y ciudad con datos meteorológicos en tiempo real. Interfaz limpia con fondo dinámico.',
  },
  {
    screenshot: '/proj-pacientes.png',
    url: 'https://remarkable-heliotrope-5c9c97.netlify.app/',
    type: 'Frontend · React',
    title: 'Seguimiento de Pacientes',
    desc: 'App para gestión y seguimiento de pacientes médicos. CRUD completo con formulario de alta y listado administrable.',
  },
  {
    screenshot: '/proj-presupuesto.png',
    url: 'https://rococo-cassata-2ac39c.netlify.app/',
    type: 'Frontend · React + TypeScript',
    title: 'Control de Presupuesto',
    desc: 'Gestor de gastos con gráfico circular, filtros por categoría y control visual del presupuesto disponible.',
  },
  {
    screenshot: '/proj-guitarla.png',
    url: 'https://capable-sopapillas-5ed03b.netlify.app/',
    type: 'Frontend · React + TypeScript',
    title: 'GuitarLA — Tienda Online',
    desc: 'Tienda de guitarras con catálogo de productos, carrito de compra y sistema de pedidos. E-commerce completo en React.',
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
      <div className="h-44 overflow-hidden border-b border-[var(--border)] relative">
        <img
          src={p.screenshot}
          alt={p.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/5 transition-all duration-300" />
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
            Trabajos<br/><span className="grad">destacados</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">
            Proyectos reales para clientes reales. Cada uno pensado para resolver un problema concreto de negocio.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} delay={i % 3}/>)}
        </div>
        <div className="text-center mt-10">
          <a href="https://github.com/Rafael-Alvarez-Calvo" target="_blank" rel="noreferrer"
            className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-6 py-3 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all inline-block">
            Ver más proyectos en GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
