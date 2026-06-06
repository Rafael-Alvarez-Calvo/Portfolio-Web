import { useReveal } from '../hooks/useReveal'

const services = [
  {
    num: '01',
    icon: '🌐',
    title: 'Página Web Profesional',
    tag: 'Web · SEO · Diseño',
    desc: 'Landing pages y webs corporativas modernas, rápidas y optimizadas para SEO. Tu negocio visible en Google desde el primer día. Diseño responsive que se adapta a cualquier dispositivo.',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop',
    ai: false,
  },
  {
    num: '02',
    icon: '🛒',
    title: 'Tienda Online (E-commerce)',
    tag: 'E-commerce · Stripe · Pagos',
    desc: 'Vende tus productos 24/7. Integración con pasarelas de pago como Stripe, gestión de inventario, carrito de compra y panel de administración completo.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop',
    ai: false,
  },
  {
    num: '03',
    icon: '🤖',
    title: 'Soluciones con Inteligencia Artificial',
    tag: 'IA · Automatización · Chatbots',
    desc: 'Chatbots inteligentes que atienden a tus clientes 24/7, automatización de procesos repetitivos, análisis de datos y asistentes virtuales personalizados para tu negocio.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop',
    ai: true,
  },
  {
    num: '04',
    icon: '📊',
    title: 'CRM & Aplicaciones a Medida',
    tag: 'CRM · Apps · Dashboard',
    desc: 'Aplicaciones personalizadas para gestionar clientes, leads, inventario o cualquier proceso interno de tu empresa. Olvídate de Excel y gestiona todo desde un panel propio.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    ai: false,
  },
  {
    num: '05',
    icon: '⚡',
    title: 'Mejora y Migración Web',
    tag: 'Performance · Migración · UX',
    desc: '¿Tu web actual es lenta o anticuada? La modernizo con las últimas tecnologías mejorando velocidad, diseño y tasa de conversión. Migración sin pérdida de datos ni posicionamiento.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop',
    ai: false,
  },
  {
    num: '06',
    icon: '🔗',
    title: 'Integraciones y APIs',
    tag: 'APIs · Automatización · SaaS',
    desc: 'Conecta tu negocio con herramientas externas: CRMs, ERPs, pasarelas de pago, plataformas de envío, redes sociales o cualquier servicio que ya uses. Todo integrado y automatizado.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop',
    ai: false,
  },
]

function ServiceRow({ s, index }: { s: typeof services[0]; index: number }) {
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
              ✨ Más demandado
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
          Solicitar presupuesto
          <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const header = useReveal()

  return (
    <section id="services" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''} mb-16`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// servicios</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            ¿Qué puedo hacer<br />
            <span className="grad">por tu negocio?</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] leading-[1.7]">
            Soluciones tecnológicas pensadas para empresas que quieren crecer sin complicarse con la tecnología.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {services.map((s, i) => (
            <ServiceRow key={s.num} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
