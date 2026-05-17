import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { competitions } from '../data/portfolio'
import './Competitions.css'

function badgeClass(badge) {
  return badge === 'National Level' ? 'comp-badge comp-badge--national' : 'comp-badge comp-badge--podium'
}

export default function Competitions() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const galleryImages = useMemo(
    () =>
      competitions.flatMap((comp) =>
        comp.images.map((src, i) => ({
          src,
          alt: `${comp.title} — photo ${i + 1}`,
          title: comp.title,
        })),
      ),
    [],
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length))
  }, [galleryImages.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
    )
  }, [galleryImages.length])

  useEffect(() => {
    if (lightboxIndex === null) return undefined

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
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  return (
    <div className="competitions-page">
      <header className="section-header">
        <span className="section-number">02</span>
        <div className="section-header-text">
          <h1 className="section-title">Competitions</h1>
          <span className="section-line" aria-hidden="true" />
        </div>
      </header>

      <div className="comp-list">
        {competitions.map((comp, index) => {
          const coverImage = comp.images[0] ?? null

          return (
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
                </div>

                <div className="comp-card-photo">
                  {coverImage ? (
                    <img src={coverImage} alt={`${comp.title} highlight`} loading="lazy" />
                  ) : (
                    <div className="comp-photo-placeholder" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span>Photo coming soon</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      <section className="comp-gallery-section">
        <h2 className="comp-gallery-heading">Gallery</h2>
        {galleryImages.length > 0 ? (
          <div className="comp-gallery-grid">
            {galleryImages.map((img, index) => (
              <button
                key={`${img.src}-${index}`}
                type="button"
                className="comp-gallery-item"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        ) : (
          <p className="comp-gallery-empty">
            Add images to each competition&apos;s <code>images</code> array in{' '}
            <code>portfolio.js</code> to populate the gallery.
          </p>
        )}
      </section>

      {lightboxIndex !== null && galleryImages.length > 0 && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Competition photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Close lightbox"
            onClick={closeLightbox}
          />
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            ×
          </button>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Previous photo">
            ‹
          </button>
          <figure className="lightbox-content">
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
            />
            <figcaption>{galleryImages[lightboxIndex].title}</figcaption>
          </figure>
          <button type="button" className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Next photo">
            ›
          </button>
          <p className="lightbox-counter">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </motion.div>
      )}
    </div>
  )
}
