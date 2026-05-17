import { motion } from 'framer-motion'
import { experience, certifications, education } from '../data/portfolio'
import './Experience.css'

const timelineVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function CertCard({ cert }) {
  const isActive = cert.status === 'Active'
  const isClickable = Boolean(cert.credly)

  const content = (
    <>
      <span className="cert-issuer">{cert.issuer}</span>
      <h3 className="cert-name">{cert.name}</h3>
      <span className={`cert-badge ${isActive ? 'cert-badge--active' : 'cert-badge--progress'}`}>
        {cert.status}
      </span>
      {isClickable && <span className="cert-link-hint">View on Credly →</span>}
    </>
  )

  if (isClickable) {
    return (
      <a
        href={cert.credly}
        className="cert-card cert-card--clickable"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cert.name} on Credly`}
      >
        {content}
      </a>
    )
  }

  return <article className="cert-card">{content}</article>
}

export default function Experience() {
  return (
    <div className="experience-page">
      <header className="section-header">
        <span className="section-number">04</span>
        <div className="section-header-text">
          <h1 className="section-title">Experience</h1>
          <span className="section-line" aria-hidden="true" />
        </div>
      </header>

      <section className="timeline-section" aria-label="Work experience">
        <div className="timeline">
          <div className="timeline-track" aria-hidden="true" />

          {experience.map((entry, index) => (
            <motion.div
              key={entry.company}
              className={`timeline-entry ${index % 2 === 0 ? 'timeline-entry--left' : 'timeline-entry--right'}`}
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <article className="timeline-card">
                <h2 className="timeline-company">{entry.company}</h2>
                <p className="timeline-role">{entry.role}</p>
                <p className="timeline-meta">
                  <span>{entry.period}</span>
                  <span className="timeline-meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{entry.location}</span>
                </p>
                <ul className="timeline-highlights">
                  {entry.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="certs-section" aria-label="Certifications">
        <h2 className="subsection-title">Certifications</h2>
        <div className="certs-grid">
          {certifications.map((cert) => (
            <CertCard key={`${cert.issuer}-${cert.name}`} cert={cert} />
          ))}
        </div>
      </section>

      <section className="education-section" aria-label="Education">
        <h2 className="subsection-title">Education</h2>
        <div className="education-list">
          {education.map((entry) => (
            <article key={entry.institution} className="education-card">
              <h3 className="education-institution">{entry.institution}</h3>
              <p className="education-degree">{entry.degree}</p>
              <p className="education-meta">
                <span>{entry.graduation}</span>
                {entry.gpa && (
                  <>
                    <span className="education-meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <span>GPA {entry.gpa}</span>
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
