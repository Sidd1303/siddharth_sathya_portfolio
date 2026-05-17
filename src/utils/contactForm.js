/**
 * Reads Formspree form ID from Vite env (must be prefixed with VITE_).
 * Accepts bare ID (xojbagqb) or full URL (https://formspree.io/f/xojbagqb).
 */
export function getFormspreeFormId() {
  const raw = import.meta.env.VITE_FORMSPREE_FORM_ID

  if (raw == null || typeof raw !== 'string') return null

  const trimmed = raw.trim()
  if (!trimmed) return null

  const placeholder = /^enter your formspree/i
  if (placeholder.test(trimmed)) return null

  const fromUrl = trimmed.match(/formspree\.io\/f\/([^/?#\s]+)/i)
  if (fromUrl) return fromUrl[1]

  return trimmed.replace(/^\/+|\/+$/g, '')
}

export function getFormspreeEndpoint() {
  const formId = getFormspreeFormId()
  return formId ? `https://formspree.io/f/${formId}` : null
}

export async function submitContactForm({ name, email, subject, message }) {
  const endpoint = getFormspreeEndpoint()

  if (!endpoint) {
    throw new Error(
      'Formspree is not configured. Add VITE_FORMSPREE_FORM_ID to a .env file in the project root and restart the dev server.',
    )
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      _replyto: email,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to send message. Please try again.')
  }

  return response.json()
}
