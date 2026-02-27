import { useState, useEffect, useRef } from 'react'
import './Hero.css'
const WEB3FORMS_KEY = '5bdceb13-584a-4c8e-aaa8-aeec3b193ac8'

const serviceOptions = [
  'Ad Films',
  'Corporate Film',
  'Documentary',
  'Music Video',
  'Short Film',
  'Brand Video',
  'Other',
]

const budgetOptions = [
  'Below ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹5,00,000',
  '₹5,00,000 & above',
  "Let's Discuss",
]

const validators = {
  name(v) {
    if (!v.trim()) return 'Full name is required'
    if (v.trim().length < 2) return 'Name must be at least 2 characters'
    if (!/^[a-zA-Z\s.'-]+$/.test(v.trim())) return 'Enter a valid name'
    return ''
  },
  email(v) {
    if (!v.trim()) return 'Email address is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address'
    return ''
  },
  phone(v) {
    const digits = v.replace(/[\s\-().+]/g, '')
    if (!digits) return 'Phone number is required'
    const cleaned = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits
    if (!/^[6-9]\d{9}$/.test(cleaned)) return 'Enter a valid 10-digit mobile number'
    return ''
  },
  service(v) { return v ? '' : 'Please select a service' },
  budget(v) { return v ? '' : 'Please select a budget range' },
}

const initialValues = { name: '', email: '', phone: '', service: '', budget: '' }
const initialErrors = { name: '', email: '', phone: '', service: '', budget: '' }
const initialTouched = { name: false, email: false, phone: false, service: false, budget: false }

export default function Hero() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [touched, setTouched] = useState(initialTouched)
  const [status, setStatus] = useState('idle')
  const [videoLoaded, setVideoLoaded] = useState(false)

  // ── Form logic ──────────────────────────────────────────────
  function validate(name, value) {
    return validators[name] ? validators[name](value) : ''
  }

  function handleChange(e) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  function validateAll() {
    const newErrors = {}
    let valid = true
    for (const f of Object.keys(initialValues)) {
      const err = validate(f, values[f])
      newErrors[f] = err
      if (err) valid = false
    }
    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true, service: true, budget: true })
    return valid
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateAll()) return
    setStatus('sending')
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', 'New Callback Request — Prince Movie Creation')
    Object.entries(values).forEach(([k, v]) => formData.append(k, v))
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setValues(initialValues)
        setTouched(initialTouched)
        setErrors(initialErrors)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: `hero__form-field${touched[name] && errors[name] ? ' hero__form-field--error' : ''}`,
  })

  return (
    <section className="hero" id="hero">

      {/* ── Left: video ── */}
      <div className={`hero__media ${videoLoaded ? 'hero__media--loaded' : ''}`}>
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/video_poster.png"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/showReel.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Right: callback form ── */}
      <div className="hero__panel">
        <div className="hero__panel-inner">
          <h2 className="hero__panel-title">Let's Connect<br />for Ideas Now</h2>
          <p className="hero__panel-sub">
            Share your requirements and our team will connect with you.
          </p>

          <form className="hero__form" onSubmit={handleSubmit} noValidate>

            <div className="hero__form-group">
              <input {...field('name')} type="text" placeholder="Enter your full name" />
              {touched.name && errors.name && <span className="hero__form-error">{errors.name}</span>}
            </div>

            <div className="hero__form-group">
              <input {...field('email')} type="email" placeholder="Enter your email" />
              {touched.email && errors.email && <span className="hero__form-error">{errors.email}</span>}
            </div>

            <div className="hero__form-group">
              <input {...field('phone')} type="tel" placeholder="Enter your phone number" maxLength={13} />
              {touched.phone && errors.phone && <span className="hero__form-error">{errors.phone}</span>}
            </div>

            <div className="hero__form-group">
              <select {...field('service')}>
                <option value="" disabled>Select Service</option>
                {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {touched.service && errors.service && <span className="hero__form-error">{errors.service}</span>}
            </div>

            <div className="hero__form-group">
              <select {...field('budget')}>
                <option value="" disabled>Budget</option>
                {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {touched.budget && errors.budget && <span className="hero__form-error">{errors.budget}</span>}
            </div>

            <button className="hero__form-btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Request A Callback'}
            </button>

            {status === 'sent' && (
              <p className="hero__form-feedback hero__form-feedback--success">
                ✓ Thank you! We'll contact you shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="hero__form-feedback hero__form-feedback--error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>

    </section>
  )
}
