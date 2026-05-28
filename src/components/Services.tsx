import { useReveal } from '../hooks/useReveal'

const services = [
  {
    icon: '🌐',
    color: 'rgba(59,130,246,0.1)',
    title: 'Página Web Profesional',
    desc: 'Landing pages y webs corporativas modernas, rápidas y optimizadas para SEO. Tu negocio visible en Google desde el primer día.',
    badge: null,
  },
  {
    icon: '🛒',
    color: 'rgba(16,185,129,0.1)',
    title: 'Tienda Online (E-commerce)',
    desc: 'Vende tus productos 24/7. Integración con pasarelas de pago como Stripe, gestión de inventario y panel de administración.',
    badge: null,
  },
  {
    icon: '🤖',
    color: 'rgba(139,92,246,0.1)',
    title: 'Soluciones con IA',
    desc: 'Chatbots inteligentes, automatización de procesos, análisis de datos y asistentes virtuales. La IA más demandada adaptada a tu negocio.',
    badge: '✨ Más demandado en 2025',
  },
  {
    icon: '📊',
    color: 'rgba(6,182,212,0.1)',
    title: 'CRM & Apps a Medida',
    desc: 'Aplicaciones personalizadas para gestionar clientes, leads, inventario o cualquier proceso interno de forma eficiente.',
    badge: null,
  },
  {
    icon: '⚡',
    color: 'rgba(245,158,11,0.1)',
    title: 'Mejora y Migración Web',
    desc: '¿Tu web actual es lenta o anticuada? La modernizo con las últimas tecnologías mejorando velocidad, diseño y conversión.',
    badge: null,
  },
  {
    icon: '🔗',
    color: 'rgba(239,68,68,0.1)',
    title: 'Integraciones y APIs',
    desc: 'Conecta tu negocio con terceros: CRMs, ERPs, pasarelas de pago, plataformas de envío, redes sociales o cualquier servicio externo.',
    badge: null,
  },
]

export default function Services() {
  const header = useReveal()

  return (
    <section id="services" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// servicios</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            ¿Qué puedo hacer<br />
            <span className="grad">por tu negocio?</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">
            Soluciones tecnológicas pensadas para empresas que quieren crecer sin complicarse con la tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, color, title, desc, badge, delay }: {
  icon: string; color: string; title: string; desc: string; badge: string | null; delay: number
}) {
  const { ref, visible } = useReveal()
  const delayClass = ['', 'd1', 'd2'][delay] ?? ''

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${visible ? 'visible' : ''} bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:border-blue hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default`}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5" style={{ background: color }}>
        {icon}
      </div>
      <h3 className="font-syne text-[1.05rem] font-bold mb-3">{title}</h3>
      <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.65]">{desc}</p>
      {badge && (
        <div className="inline-flex items-center gap-1.5 mt-3 bg-[linear-gradient(135deg,rgba(139,92,246,0.15),rgba(59,130,246,0.15))] border border-[rgba(139,92,246,0.4)] rounded-full px-3 py-1 text-[0.72rem] font-semibold text-purple-300">
          {badge}
        </div>
      )}
    </div>
  )
}
