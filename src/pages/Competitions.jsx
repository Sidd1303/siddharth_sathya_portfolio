import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { competitions } from '../data/portfolio'
import './Competitions.css'

function badgeClass(badge) {
  return badge === 'National Level' ? 'comp-badge comp-badge--national' : 'comp-badge comp-badge--podium'
}

function PhotoPlaceholder() {
  return (
    <motion.div
      className="comp-photo-placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>PHOTO COMING SOON</span>
    </motion.div>
  )
}

function CompetitionPhotoStrip({ competition, onOpenLightbox }) {
  const scrollRef = useRef(null)
  const images = competition.images ?? []
  const hasMultiple = images.length > 1
  const hasSingle = images.length === 1

  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const item = el.querySelector('.comp-photo-item')
    const gap = 12
    const amount = item ? item.offsetWidth + gap : el.clientWidth * 0.85
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  if (images.length === 0) {
    return <PhotoPlaceholder />
  }

  return (
    <motion.div
      className={`comp-photo-strip ${hasSingle ? 'comp-photo-strip--single' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {hasMultiple && (
        <>
          <button
            type="button"
            className="comp-strip-nav comp-strip-prev"
            onClick={() => scroll(-1)}
            aria-label="Scroll photos left"
          >
            ‹
          </button>
          <button
            type="button"
            className="comp-strip-nav comp-strip-next"
            onClick={() => scroll(1)}
            aria-label="Scroll photos right"
          >
            ›
          </button>
        </>
      )}

      <div ref={scrollRef} className="comp-photo-strip-viewport">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="comp-photo-item"
            onClick={() => onOpenLightbox(index)}
            aria-label={`View ${competition.title} photo ${index + 1}`}
          >
            <img src={src} alt={`${competition.title} — photo ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

function CompetitionLightbox({ competition, imageIndex, onClose, onPrev, onNext }) {
  const images = competition.images
  const current = images[imageIndex]

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${competition.title} photos`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.button
        type="button"
        className="lightbox-backdrop"
        aria-label="Close lightbox"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      {images.length > 1 && (
        <>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous photo">
            ‹
          </button>
          <button type="button" className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next photo">
            ›
          </button>
        </>
      )}

      <figure className="lightbox-content">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={`${competition.title} — photo ${imageIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <figcaption>{competition.title}</figcaption>
      </figure>

      <p className="lightbox-counter">
        {imageIndex + 1} / {images.length}
      </p>
    </motion.div>
  )
}

export default function Competitions() {
  const [lightbox, setLightbox] = useState(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const activeCompetition = lightbox
    ? competitions.find((c) => c.title === lightbox.title)
    : null

  const goNext = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return null
      const comp = competitions.find((c) => c.title === lb.title)
      if (!comp?.images.length) return lb
      return { ...lb, index: (lb.index + 1) % comp.images.length }
    })
  }, [])

  const goPrev = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return null
      const comp = competitions.find((c) => c.title === lb.title)
      if (!comp?.images.length) return lb
      return { ...lb, index: (lb.index - 1 + comp.images.length) % comp.images.length }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox, closeLightbox, goNext, goPrev])

  const openLightbox = (title, index) => setLightbox({ title, index })

  return (
    <motion.div className="competitions-page">
      <header className="section-header">
        <span className="section-number">02</span>
        <div className="section-header-text">
          <h1 className="section-title">Competitions</h1>
          <span className="section-line" aria-hidden="true" />
        </div>
      </header>

      <div className="comp-list">
        {competitions.map((comp, index) => (
          <motion.article
            key={comp.title}
            className="comp-card"
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="comp-card-inner">
              <span className={badgeClass(comp.badge)}>{comp.badge}</span>

              <div className="comp-card-body">
                <h2 className="comp-card-title">{comp.title}</h2>
                <p className="comp-card-desc">{comp.description}</p>
                <p className="comp-card-meta">
                  <span>{comp.date}</span>
                  <span className="comp-meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{comp.location}</span>
                  <span className="comp-card-award">{comp.award}</span>
                </p>

                <CompetitionPhotoStrip
                  competition={comp}
                  onOpenLightbox={(imageIndex) => openLightbox(comp.title, imageIndex)}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && activeCompetition && activeCompetition.images.length > 0 && (
          <CompetitionLightbox
            competition={activeCompetition}
            imageIndex={lightbox.index}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
