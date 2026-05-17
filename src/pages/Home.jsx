import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  profile,
  competitions,
  experience,
  certifications,
} from '../data/portfolio'
import './Home.css'

const fadeContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const fadeItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const [firstName, lastName] = profile.name.split(' ')

const stats = [
  { value: competitions.length, label: 'Competitions' },
  {
    value: competitions.filter((c) => /1st|Place/i.test(c.award)).length,
    label: 'Podiums',
  },
  {
    value: competitions.filter((c) => /National Record/i.test(c.award)).length,
    label: 'National Record',
  },
  { value: certifications.length, label: 'Certifications' },
]

const latestCompetition = competitions[0]
const latestRole = experience[0]
const topCert = certifications.find((c) =>
  c.name.includes('DevOps Engineer Professional'),
) ?? certifications[0]

const highlights = [
  {
    label: 'Latest Competition',
    title: latestCompetition.title,
    meta: `${latestCompetition.award} · ${latestCompetition.date}`,
    to: '/competitions',
  },
  {
    label: 'Most Recent Role',
    title: latestRole.role,
    meta: `${latestRole.company} · ${latestRole.period}`,
    to: '/experience',
  },
  {
    label: 'Top Certification',
    title: topCert.name,
    meta: `${topCert.issuer} · ${topCert.status}`,
    to: '/skills',
  },
]

export default function Home() {
  return (
    <motion.div className="home" initial="hidden" animate="show" variants={fadeContainer}>
      <section className="hero">
        <motion.div className="hero-content" variants={fadeItem}>
          <div className="hero-label">
            <span className="hero-line" aria-hidden="true" />
            <span>{profile.title}</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-name-first">{firstName}</span>
            <span className="hero-name-last">
              {lastName}
              <span className="hero-cursor" aria-hidden="true">
                _
              </span>
            </span>
          </h1>

          <p className="hero-summary">{profile.summary}</p>

          <ul className="hero-stats">
            {stats.map(({ value, label }) => (
              <li key={label} className="hero-stat">
                <span className="hero-stat-value">{value}</span>
                <span className="hero-stat-label">{label}</span>
              </li>
            ))}
          </ul>

          <div className="hero-cta">
            <Link to="/contact" className="btn btn-filled">
              Contact Me
            </Link>
            <Link to="/projects" className="btn btn-ghost">
              View Projects
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="highlights">
        <motion.div className="highlights-inner" variants={fadeItem}>
          {highlights.map(({ label, title, meta, to }) => (
            <Link key={label} to={to} className="highlight-card">
              <span className="highlight-label">{label}</span>
              <h2 className="highlight-title">{title}</h2>
              <p className="highlight-meta">{meta}</p>
              <span className="highlight-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
