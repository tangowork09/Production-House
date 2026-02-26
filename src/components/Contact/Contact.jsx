import { useState } from 'react'
import './Contact.css'

// Using Cloudflare Pages Functions or a free form service like Formspree
// Replace the action URL with your Formspree endpoint or custom API
const FORM_ACTION = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)

    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <div className="section-header">
          <p className="section-label">Let's talk</p>
          <h2 className="section-title">Start a project with us</h2>
          <p className="contact__sub">
            Got an idea? We'd love to hear it.{' '}
            <a href="mailto:hello@skproduction.com">hello@skproduction.com</a>
          </p>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">What are you looking for?</label>
            <select id="subject" name="subject" required>
              <option value="">Select a service</option>
              <option value="film">Film & Commercial</option>
              <option value="photo">Photography</option>
              <option value="music-video">Music Video</option>
              <option value="post">Post Production</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your project..." />
          </div>

          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'sent' && (
            <p className="form-feedback form-feedback--success">
              Message sent! We'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="form-feedback form-feedback--error">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
