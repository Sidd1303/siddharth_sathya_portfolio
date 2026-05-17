import { useState } from 'react'
import { contact } from '../data/portfolio'
import { submitContactForm } from '../utils/contactForm'
import './Contact.css'

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 6h16v12H4V6z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 4h4l2 5-2 1a11 11 0 005 5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 014 8a2 2 0 012-2z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8v.01M12 16v-5c0-1.5 2-2 2 0v5" />
    </svg>
  )
}

function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="1" />
      <path d="M6 16V6a2 2 0 012-2h10" />
    </svg>
  )
}

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(field)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      await submitContactForm(form)
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong.')
    }
  }

  return (
    <div className="contact-page">
      <header className="section-header">
        <span className="section-number">05</span>
        <div className="section-header-text">
          <h1 className="section-title">Contact</h1>
          <span className="section-line" aria-hidden="true" />
        </div>
      </header>

      <div className="contact-layout">
        <aside className="contact-details">
          <h2 className="contact-details-title">Get in touch</h2>
          <p className="contact-details-sub">
            Open to cybersecurity roles, collaborations, and competition teams.
          </p>

          <ul className="contact-list">
            <li className="contact-item">
              <span className="contact-icon">
                <IconMail />
              </span>
              <div className="contact-item-body">
                <span className="contact-label">Email</span>
                <div className="contact-value-row">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <button
                    type="button"
                    className="contact-copy"
                    onClick={() => copyToClipboard(contact.email, 'email')}
                    aria-label="Copy email"
                  >
                    <IconCopy />
                    {copied === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </li>

            <li className="contact-item">
              <span className="contact-icon">
                <IconPhone />
              </span>
              <div className="contact-item-body">
                <span className="contact-label">Phone</span>
                <div className="contact-value-row">
                  <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a>
                  <button
                    type="button"
                    className="contact-copy"
                    onClick={() => copyToClipboard(contact.phone, 'phone')}
                    aria-label="Copy phone"
                  >
                    <IconCopy />
                    {copied === 'phone' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </li>

            <li className="contact-item">
              <span className="contact-icon">
                <IconLinkedIn />
              </span>
              <div className="contact-item-body">
                <span className="contact-label">LinkedIn</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  /in/siddharth-sathya
                </a>
              </div>
            </li>

            <li className="contact-item">
              <span className="contact-icon">
                <IconLocation />
              </span>
              <div className="contact-item-body">
                <span className="contact-label">Location</span>
                <span className="contact-text">{contact.location}</span>
              </div>
            </li>
          </ul>
        </aside>

        <div className="contact-form-wrap">
          {status === 'success' ? (
            <div className="contact-success" role="status">
              <p>
                Message sent successfully
                <span className="contact-cursor">_</span>
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="your_name"
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                />
              </div>
              <div className="form-row">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="subject_line"
                />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="// your message here..."
                />
              </div>

              {error && (
                <p className="contact-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-filled contact-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {contact.openToWork && (
        <div className="contact-status">
          <span className="status-pulse" aria-hidden="true" />
          <span className="status-badge">Open to Work</span>
        </div>
      )}
    </div>
  )
}
