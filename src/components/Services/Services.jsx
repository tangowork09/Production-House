import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    slug: 'ad-films',
    title: 'Ad Films',
    desc: 'Creative ads that drive attention and results.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M19 18l12 6-12 6V18z" fill="currentColor"/>
        <path d="M4 16h4M4 32h4M44 16h-4M44 32h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'corporate-documentary',
    title: 'Corporate | Documentary',
    desc: 'Authentic stories that build brand trust.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M30 19l8-5v20l-8-5V19z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M12 14V10M18 14V10M24 14V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'music-videos',
    title: 'Music Videos',
    desc: 'Visuals that elevate sound and emotion.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="36" r="6" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="34" cy="32" r="6" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M20 36V14l20-4v18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20l20-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'short-films',
    title: 'Short Films',
    desc: 'Stories told with cinematic excellence.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="4" y="6" width="40" height="10" rx="1" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M14 6v10M24 6v10M34 6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 26l10 6-10 6V26z" fill="currentColor"/>
      </svg>
    ),
  },
]

const stats = [
  { number: '70+',  label: 'Clients have collaborated with us' },
  { number: '11+',  label: 'Years of work experience in the industry' },
  { number: '400+', label: 'Projects delivered successfully so far' },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">

        {/* Header */}
        <div className="services__header">
          <span className="services__label">What We Do</span>
          <h2 className="services__title">Our Video Production Services</h2>
          <p className="services__sub">Crafting stories that connect, inspire, and convert.</p>
        </div>

        {/* 4 Service Cards */}
        <div className="services__grid">
          {services.map((s) => (
            <div className="service-card" key={s.slug}>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <Link
                to={`/${s.slug}`}
                className="service-card__link"
              >
                Know More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="services__stats">
          {stats.map((s) => (
            <div className="services__stat" key={s.label}>
              <span className="services__stat-num">{s.number}</span>
              <span className="services__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
