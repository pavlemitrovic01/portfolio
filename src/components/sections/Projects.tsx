import MotionReveal from '../motion/MotionReveal'

interface Project {
  tag: string
  title: string
  description: string
  stack: string[]
  status: string
  statusColor: string
  link?: string
}

const PROJECTS: Project[] = [
  {
    tag: 'Online ordering platform',
    title: 'Padrino Budva',
    description: 'Full-stack ordering system for a pizza restaurant. Custom cart engine, Bankart payment integration, delivery zone detection, real-time admin panel, and Telegram notifications.',
    stack: ['React', 'TypeScript', 'Supabase', 'Bankart', 'Telegram API'],
    status: 'Live',
    statusColor: 'var(--cyan)',
    link: 'https://padrinobudva.com',
  },
  {
    tag: 'Coming soon',
    title: 'Project placeholder',
    description: 'Description of the next project goes here. Custom web product with premium execution and real business logic.',
    stack: ['React', 'TypeScript', 'Supabase'],
    status: 'In progress',
    statusColor: 'var(--gold)',
  },
  {
    tag: 'Coming soon',
    title: 'Project placeholder',
    description: 'Description of another project. Admin dashboard, custom ordering flow, or premium digital product.',
    stack: ['React', 'TypeScript', 'Framer Motion'],
    status: 'Planned',
    statusColor: 'var(--muted)',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">Selected work</div>
            <h2 className="title">Projects that ship.</h2>
          </div>
          <p className="copy">Not mockups. Not demos. Real products with real users, real payments, and real operational logic running behind the interface.</p>
        </MotionReveal>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <MotionReveal key={i} delay={i * 0.1}>
              <article className="project-card">
                <div className="project-card-top">
                  <span className="project-card-tag">{project.tag}</span>
                  <span className="project-card-status" style={{ color: project.statusColor }}>
                    <span className="project-card-dot" style={{ background: project.statusColor }} />
                    {project.status}
                  </span>
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-footer">
                  <div className="project-card-stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="project-card-tech">{tech}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-link"
                    >
                      View ↗
                    </a>
                  )}
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
