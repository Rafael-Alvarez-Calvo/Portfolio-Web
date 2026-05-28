import { useReveal } from '../hooks/useReveal'

const groups = [
  {
    label: '// Frontend Core',
    pills: [
      { name: 'React.js', hot: true },
      { name: 'TypeScript', hot: true },
      { name: 'JavaScript ES6+', hot: true },
      { name: 'HTML5', hot: false },
      { name: 'CSS3 / Sass', hot: false },
      { name: 'TailwindCSS', hot: false },
      { name: 'Bootstrap', hot: false },
      { name: 'Redux', hot: false },
      { name: 'Formik / Yup', hot: false },
    ],
  },
  {
    label: '// Testing & Calidad',
    pills: [
      { name: 'Jest', hot: true },
      { name: 'React Testing Library', hot: true },
      { name: 'Cypress', hot: false },
      { name: 'Sinon', hot: false },
      { name: 'Clean Code', hot: false },
      { name: 'SOLID', hot: false },
      { name: 'Design Patterns', hot: false },
    ],
  },
  {
    label: '// Backend & DB',
    pills: [
      { name: 'Node.js', hot: false },
      { name: 'Express', hot: false },
      { name: 'MySQL', hot: false },
      { name: 'MongoDB', hot: false },
      { name: 'REST APIs', hot: false },
      { name: '.Net C#', hot: false },
      { name: 'JWT', hot: false },
      { name: 'Stripe', hot: false },
    ],
  },
  {
    label: '// Arquitectura & DevOps',
    pills: [
      { name: 'Microfrontends', hot: true },
      { name: 'Web Components', hot: false },
      { name: 'Storybook', hot: false },
      { name: 'Webpack / Babel', hot: false },
      { name: 'Git', hot: false },
      { name: 'CI/CD (Netlify/GitLab)', hot: false },
      { name: 'Docker', hot: false },
      { name: 'Azure', hot: false },
    ],
  },
  {
    label: '// IA & Automatización',
    pills: [
      { name: 'Chatbots con IA', hot: true, ai: true },
      { name: 'Automatizaciones', hot: true, ai: true },
      { name: 'APIs de IA (OpenAI)', hot: false, ai: true },
      { name: 'Agentes IA', hot: false, ai: true },
      { name: 'RAG / Embeddings', hot: false, ai: true },
    ],
  },
  {
    label: '// Herramientas',
    pills: [
      { name: 'Figma', hot: false },
      { name: 'Lit Element', hot: false },
      { name: 'Nanostores', hot: false },
      { name: 'EmailJS', hot: false },
      { name: 'Agile / Scrum', hot: false },
      { name: 'Lean', hot: false },
      { name: 'Trello', hot: false },
    ],
  },
]

type Pill = { name: string; hot: boolean; ai?: boolean }

function PillBadge({ pill }: { pill: Pill }) {
  if (pill.ai) {
    return (
      <span className="border border-[rgba(139,92,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-purple-300 hover:border-purple-400 hover:text-purple-200 transition-colors cursor-default">
        {pill.name}
      </span>
    )
  }
  if (pill.hot) {
    return (
      <span className="border border-[rgba(59,130,246,0.4)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-blue-300 hover:border-blue hover:text-cyan transition-colors cursor-default">
        {pill.name}
      </span>
    )
  }
  return (
    <span className="border border-[var(--border)] bg-[var(--card2)] rounded-md px-3 py-1 font-mono text-[0.82rem] text-[var(--text)] hover:border-blue hover:text-cyan transition-colors cursor-default">
      {pill.name}
    </span>
  )
}

export default function Skills() {
  const header = useReveal()

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">// tecnologías</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            Mi <span className="grad">stack técnico</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[1rem] max-w-[540px] mb-12 leading-[1.7]">
            Más de 4 años trabajando con estas tecnologías en proyectos reales de producción.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((g, i) => (
            <SkillGroup key={g.label} label={g.label} pills={g.pills} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillGroup({ label, pills, delay }: { label: string; pills: Pill[]; delay: number }) {
  const { ref, visible } = useReveal()
  const delayClass = ['', 'd1', 'd2'][delay] ?? ''

  return (
    <div ref={ref} className={`reveal ${delayClass} ${visible ? 'visible' : ''}`}>
      <h4 className="font-mono text-[0.75rem] text-cyan uppercase tracking-[0.1em] mb-3">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {pills.map(p => <PillBadge key={p.name} pill={p} />)}
      </div>
    </div>
  )
}
