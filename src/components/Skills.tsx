import { useLang } from '../contexts/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const groups = [
  { label:'// Frontend Core', pills:[{n:'React.js',h:true},{n:'TypeScript',h:true},{n:'JavaScript ES6+',h:true},{n:'HTML5'},{n:'CSS3 / Sass'},{n:'TailwindCSS'},{n:'Bootstrap'},{n:'Redux'},{n:'Formik / Yup'}] },
  { label:'// Testing & Calidad', pills:[{n:'Jest',h:true},{n:'React Testing Library',h:true},{n:'Cypress'},{n:'Sinon'},{n:'Clean Code'},{n:'SOLID'},{n:'Design Patterns'}] },
  { label:'// Backend & DB', pills:[{n:'Node.js'},{n:'Express'},{n:'MySQL'},{n:'MongoDB'},{n:'REST APIs'},{n:'.Net C#'},{n:'JWT'},{n:'Stripe'}] },
  { label:'// Arquitectura & DevOps', pills:[{n:'Microfrontends',h:true},{n:'Web Components'},{n:'Storybook'},{n:'Webpack / Babel'},{n:'Git'},{n:'CI/CD (Netlify/GitLab)'},{n:'Docker'},{n:'Azure'}] },
  { label:'// IA & Automatización', pills:[{n:'Chatbots con IA',h:true,ai:true},{n:'Automatizaciones',h:true,ai:true},{n:'APIs de IA (OpenAI)',ai:true},{n:'Agentes IA',ai:true},{n:'RAG / Embeddings',ai:true}] },
  { label:'// Herramientas', pills:[{n:'Figma'},{n:'Lit Element'},{n:'Nanostores'},{n:'EmailJS'},{n:'Agile / Scrum'},{n:'Lean'},{n:'Trello'}] },
]

function Pill({ p }: { p: {n:string;h?:boolean;ai?:boolean} }) {
  if (p.ai) return <span className="border border-[rgba(139,92,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-purple-300 hover:border-purple-400 transition-colors cursor-default">{p.n}</span>
  if (p.h)  return <span className="border border-[rgba(59,130,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-blue-300 hover:border-blue hover:text-cyan transition-colors cursor-default">{p.n}</span>
  return <span className="border border-[var(--border)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-[var(--text)] hover:border-blue hover:text-cyan transition-colors cursor-default">{p.n}</span>
}

function Group({ g, delay }: { g: typeof groups[0]; delay:number }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`reveal ${['','d1','d2'][delay]} ${visible?'visible':''}`}>
      <h4 className="font-mono text-[0.75rem] text-cyan uppercase tracking-[0.1em] mb-3">{g.label}</h4>
      <div className="flex flex-wrap gap-2">{g.pills.map(p => <Pill key={p.n} p={p}/>)}</div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang(); const h = useReveal()
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={h.ref} className={`reveal ${h.visible?'visible':''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{t.skills.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">{t.skills.title} <span className="grad">{t.skills.titleGrad}</span></h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">{t.skills.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{groups.map((g,i) => <Group key={g.label} g={g} delay={i%3}/>)}</div>
      </div>
    </section>
  )
}
