import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import './Projects.css'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cloud-security', label: 'Cloud Security' },
  { id: 'siem', label: 'SIEM' },
  { id: 'ai-security', label: 'AI Security' },
  { id: 'devops', label: 'DevOps' },
]

const featuredProject = projects[0]

function matchesFilter(project, filterId) {
  if (filterId === 'all') return true

  const category = project.category.toLowerCase()

  switch (filterId) {
    case 'cloud-security':
      return category.includes('cloud')
    case 'siem':
      return category.includes('siem')
    case 'ai-security':
      return category.includes('ai')
    case 'devops':
      return category.includes('devops')
    default:
      return true
  }
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <span className="project-category">{project.category}</span>
      <h2 className="project-name">{project.name}</h2>
      <p className="project-desc">{project.description}</p>
      <ul className="project-tech">
        {project.tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {project.github ? (
        <a
          href={project.github}
          className="project-github"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      ) : null}
    </article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [activeFilter],
  )

  const showFeatured = filtered.some((p) => p.name === featuredProject.name)
  const gridProjects = showFeatured
    ? filtered.filter((p) => p.name !== featuredProject.name)
    : filtered

  return (
    <motion.div className="projects-page">
      <header className="section-header">
        <span className="section-number">03</span>
        <div className="section-header-text">
          <h1 className="section-title">Projects</h1>
          <span className="section-line" aria-hidden="true" />
        </div>
      </header>

      <div className="project-filters" role="tablist" aria-label="Filter projects">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeFilter === id}
            className={`project-filter ${activeFilter === id ? 'active' : ''}`}
            onClick={() => setActiveFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="projects-grid-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          {filtered.length === 0 ? (
            <p className="projects-empty">No projects match this filter.</p>
          ) : (
            <div className="projects-grid">
              {showFeatured && (
                <ProjectCard project={featuredProject} featured />
              )}
              {gridProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
