const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`
  : null

export async function submitContactForm({ name, email, subject, message }) {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error(
      'Formspree is not configured. Add VITE_FORMSPREE_FORM_ID to your .env file.',
    )
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
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
