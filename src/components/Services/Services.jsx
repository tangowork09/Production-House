import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Services.css'

const services = [
  {
    slug: 'ad-films',
    num: '01',
    title: 'Ad Films',
    tagline: 'Stories that sell',
    tags: ['TV Commercials', 'Digital Ads', 'Brand Films', 'Social Media'],
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
    num: '02',
    title: 'Corporate & Documentary',
    tagline: 'Truth through lens',
    tags: ['Corporate Films', 'Documentaries', 'Event Coverage', 'Brand Stories'],
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
    num: '03',
    title: 'Music Videos',
    tagline: 'Sound made visual',
    tags: ['Artist Videos', 'Album Visuals', 'Lyric Videos', 'Live Sessions'],
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
    num: '04',
    title: 'Short Films',
    tagline: 'Cinema in every frame',
    tags: ['Narrative Films', 'Festival Shorts', 'Web Series', 'Art Films'],
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
  { number: '800+', label: 'Projects Delivered' },
  { number: '25+',  label: 'Years of Excellence' },
  { number: '15+',  label: 'Countries Served' },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    const targets = sectionRef.current?.querySelectorAll('.reveal, .reveal-d1, .reveal-d2, .reveal-d3, .reveal-d4')
    targets?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services__header reveal">
          <span className="services__label">What We Do</span>
          <h2 className="services__title">Our Production Services</h2>
          <p className="services__sub">
            From Delhi to Dubai, Toronto to Los Angeles — 25+ years of cinematic excellence, delivered globally.
          </p>
        </div>
      </div>

      {/* 2×2 compact card grid — full bleed */}
      <div className="services__grid">
        {services.map((s, i) => (
          <Link to={`/${s.slug}`} className={`svc-card reveal-d${i + 1}`} key={s.slug}>

            {/* Ghost number */}
            <span className="svc-card__ghost" aria-hidden="true">{s.num}</span>

            {/* Icon */}
            <div className="svc-card__icon">{s.icon}</div>

            {/* Content */}
            <div className="svc-card__body">
              <p className="svc-card__tagline">{s.tagline}</p>
              <h3 className="svc-card__title">{s.title}</h3>
              <ul className="svc-card__tags">
                {s.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="svc-card__footer">
              <span>View All</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

          </Link>
        ))}
      </div>

      {/* Stats Banner */}
      <div className="container">
        <div className="services__stats reveal">
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
