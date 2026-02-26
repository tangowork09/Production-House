import { useState, useEffect, useRef } from 'react'
import './ContactPage.css'

const ACCESS_KEY = '5bdceb13-584a-4c8e-aaa8-aeec3b193ac8'

const COUNTRIES = [
  { name: 'International', dial: '',     flag: '🌐' },
  { name: 'Australia',     dial: '+61',  flag: '🇦🇺' },
  { name: 'Bangladesh',    dial: '+880', flag: '🇧🇩' },
  { name: 'Brazil',        dial: '+55',  flag: '🇧🇷' },
  { name: 'Canada',        dial: '+1',   flag: '🇨🇦' },
  { name: 'China',         dial: '+86',  flag: '🇨🇳' },
  { name: 'Egypt',         dial: '+20',  flag: '🇪🇬' },
  { name: 'France',        dial: '+33',  flag: '🇫🇷' },
  { name: 'Germany',       dial: '+49',  flag: '🇩🇪' },
  { name: 'India',         dial: '+91',  flag: '🇮🇳' },
  { name: 'Indonesia',     dial: '+62',  flag: '🇮🇩' },
  { name: 'Italy',         dial: '+39',  flag: '🇮🇹' },
  { name: 'Japan',         dial: '+81',  flag: '🇯🇵' },
  { name: 'Kenya',         dial: '+254', flag: '🇰🇪' },
  { name: 'Malaysia',      dial: '+60',  flag: '🇲🇾' },
  { name: 'Mexico',        dial: '+52',  flag: '🇲🇽' },
  { name: 'Nepal',         dial: '+977', flag: '🇳🇵' },
  { name: 'Netherlands',   dial: '+31',  flag: '🇳🇱' },
  { name: 'Nigeria',       dial: '+234', flag: '🇳🇬' },
  { name: 'Pakistan',      dial: '+92',  flag: '🇵🇰' },
  { name: 'Philippines',   dial: '+63',  flag: '🇵🇭' },
  { name: 'Russia',        dial: '+7',   flag: '🇷🇺' },
  { name: 'Saudi Arabia',  dial: '+966', flag: '🇸🇦' },
  { name: 'Singapore',     dial: '+65',  flag: '🇸🇬' },
  { name: 'South Africa',  dial: '+27',  flag: '🇿🇦' },
  { name: 'South Korea',   dial: '+82',  flag: '🇰🇷' },
  { name: 'Spain',         dial: '+34',  flag: '🇪🇸' },
  { name: 'Sri Lanka',     dial: '+94',  flag: '🇱🇰' },
  { name: 'Sweden',        dial: '+46',  flag: '🇸🇪' },
  { name: 'Thailand',      dial: '+66',  flag: '🇹🇭' },
  { name: 'Turkey',        dial: '+90',  flag: '🇹🇷' },
  { name: 'UAE',           dial: '+971', flag: '🇦🇪' },
  { name: 'UK',            dial: '+44',  flag: '🇬🇧' },
  { name: 'USA',           dial: '+1',   flag: '🇺🇸' },
  { name: 'Vietnam',       dial: '+84',  flag: '🇻🇳' },
]

/* ── Searchable country-code picker ── */
function DialSelect({ value, onChange, hasError }) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const wrapRef  = useRef(null)
  const inputRef = useRef(null)

  const selected = COUNTRIES.find(c => c.dial === value) ?? COUNTRIES[0]
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  )

  // Close on outside click
  useEffect(() => {
    function onDown(e) {
      if (!wrapRef.current?.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Auto-focus search when dropdown opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function select(dial) {
    onChange(dial)
    setOpen(false)
    setSearch('')
  }

  return (
    <div className="cp-dial" ref={wrapRef}>
      <button
        type="button"
        className={`cp-dial__trigger${hasError ? ' cp-dial__trigger--error' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="cp-dial__flag">{selected.flag}</span>
        <span className="cp-dial__code">{selected.dial || 'Intl'}</span>
        <svg className={`cp-dial__chevron${open ? ' cp-dial__chevron--open' : ''}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="cp-dial__dropdown" role="listbox">
          <div className="cp-dial__search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="cp-dial__search"
              placeholder="Search country…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <ul className="cp-dial__list">
            {filtered.length > 0 ? filtered.map(c => (
              <li
                key={c.name}
                role="option"
                aria-selected={c.dial === value}
                className={`cp-dial__option${c.dial === value ? ' cp-dial__option--active' : ''}`}
                onClick={() => select(c.dial)}
              >
                <span className="cp-dial__opt-flag">{c.flag}</span>
                <span className="cp-dial__opt-name">{c.name}</span>
                <span className="cp-dial__opt-code">{c.dial || '—'}</span>
              </li>
            )) : (
              <li className="cp-dial__empty">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ── Default India ── */
const INIT = { firstName: '', lastName: '', dialCode: '+91', phone: '', company: '', requirement: '' }

function validate(v) {
  const e = {}
  if (!v.firstName.trim() || v.firstName.trim().length < 2)
    e.firstName = 'Enter a valid first name (min 2 chars).'
  if (v.firstName.trim() && !/^[a-zA-Z\s]+$/.test(v.firstName.trim()))
    e.firstName = 'First name should contain only letters.'
  if (!v.lastName.trim() || v.lastName.trim().length < 2)
    e.lastName = 'Enter a valid last name (min 2 chars).'
  if (v.lastName.trim() && !/^[a-zA-Z\s]+$/.test(v.lastName.trim()))
    e.lastName = 'Last name should contain only letters.'
  const digits = v.phone.replace(/[\s\-().+]/g, '')
  if (!digits || !/^\d{7,15}$/.test(digits))
    e.phone = 'Enter a valid phone number (7–15 digits).'
  return e
}

export default function ContactPage() {
  const [values,  setValues]  = useState(INIT)
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [status,  setStatus]  = useState('idle')

  useEffect(() => { window.scrollTo({ top: 0 }) }, [])

  function handleChange(field, val) {
    const next = { ...values, [field]: val }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }

  function handleBlur(field) {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(INIT).map(k => [k, true]))
    setTouched(allTouched)
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('sending')
    const fullPhone = values.dialCode ? `${values.dialCode} ${values.phone}` : values.phone
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New Contact Enquiry — Prince Movie Creation',
          'First Name': values.firstName,
          'Last Name':  values.lastName,
          Phone:        fullPhone,
          'Brand / Company / Agency': values.company || '—',
          'Requirement': values.requirement || '—',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setValues(INIT)
        setTouched({})
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function field(id, label, required) {
    const err = touched[id] && errors[id]
    return (
      <div className={`cp-field${err ? ' cp-field--error' : ''}`}>
        <label htmlFor={id} className="cp-label">
          {label}{required && <span className="cp-required"> *</span>}
        </label>
        <input
          id={id}
          type="text"
          placeholder={
            id === 'firstName' ? 'Enter your first name' :
            id === 'lastName'  ? 'Enter your last name'  :
                                 'Enter a company name'
          }
          value={values[id]}
          onChange={e => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id)}
          autoComplete="off"
        />
        {err && <span className="cp-error">{errors[id]}</span>}
      </div>
    )
  }

  const phoneErr = touched.phone && errors.phone

  return (
    <div className="contact-page">
      <div className="contact-page__body container">
        <div className="contact-page__card">

          {status === 'sent' ? (
            <div className="cp-success">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. We'll connect with you shortly.</p>
              <button className="cp-btn" onClick={() => setStatus('idle')}>Send another</button>
            </div>
          ) : (
            <form className="cp-form" onSubmit={handleSubmit} noValidate>

              <div className="cp-row">
                {field('firstName', 'First name', true)}
                {field('lastName',  'Last name',  true)}
              </div>

              {/* Phone */}
              <div className={`cp-field${phoneErr ? ' cp-field--error' : ''}`}>
                <label className="cp-label">
                  Phone<span className="cp-required"> *</span>
                </label>
                <div className="cp-phone-row">
                  <DialSelect
                    value={values.dialCode}
                    onChange={v => handleChange('dialCode', v)}
                    hasError={!!phoneErr}
                  />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={values.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    autoComplete="off"
                  />
                </div>
                {phoneErr && <span className="cp-error">{errors.phone}</span>}
              </div>

              {field('company', 'Your Brand / Company / Agency', false)}

              <div className={`cp-field${touched.requirement && errors.requirement ? ' cp-field--error' : ''}`}>
                <label htmlFor="requirement" className="cp-label">Your Requirement</label>
                <textarea
                  id="requirement"
                  rows={5}
                  placeholder="Share your requirement in detail"
                  value={values.requirement}
                  onChange={e => handleChange('requirement', e.target.value)}
                  onBlur={() => handleBlur('requirement')}
                />
              </div>

              {status === 'error' && (
                <p className="cp-feedback cp-feedback--error">
                  Something went wrong. Please try again.
                </p>
              )}

              <button className="cp-btn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}
