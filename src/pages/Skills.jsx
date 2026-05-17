import { motion } from 'framer-motion'
import { skills, certifications } from '../data/portfolio'
import './Skills.css'

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function SkillTag({ name, highlighted }) {
  return (
    <li>
      <span className={`skill-tag ${highlighted ? 'skill-tag--core' : ''}`}>{name}</span>
    </li>
  )
}

export default function Skills() {
  return (
    <motion.div
      className="skills-page"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      <motion.header className="section-header" variants={itemVariants}>
        <span className="section-number">01</span>
        <div className="section-header-text">
          <h1 className="section-title">Skills</h1>
          <span className="section-line" aria-hidden="true" />
        </div>
      </motion.header>

      <motion.div className="skills-grid" variants={itemVariants}>
        {skills.map((group) => (
          <article key={group.category} className="skill-card">
            <div className="skill-card-header">
              <h2 className="skill-category">{group.category}</h2>
              <span className="skill-category-line" aria-hidden="true" />
            </div>
            <ul className="skill-tags">
              {group.items.map((name) => (
                <SkillTag
                  key={name}
                  name={name}
                  highlighted={group.highlighted?.includes(name)}
                />
              ))}
            </ul>
          </article>
        ))}
      </motion.div>

      <motion.section className="skills-certs" variants={itemVariants} aria-label="Certifications">
        <h2 className="skills-certs-title">Certifications</h2>
        <div className="skills-certs-strip">
          {certifications.map((cert) => {
            const isActive = cert.status === 'Active'
            return (
              <article key={`${cert.issuer}-${cert.name}`} className="skills-cert-item">
                <span className="skills-cert-issuer">{cert.issuer}</span>
                <span className="skills-cert-name">{cert.name}</span>
                <span
                  className={`skills-cert-badge ${isActive ? 'skills-cert-badge--active' : 'skills-cert-badge--progress'}`}
                >
                  {cert.status}
                </span>
              </article>
            )
          })}
        </div>
      </motion.section>
    </motion.div>
  )
}
