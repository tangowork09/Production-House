import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './Intro.css'

const stats = [
  { raw: 800, display: '800+', label: 'Projects Delivered' },
  { raw: 25,  display: '25+',  label: 'Years of Experience' },
  { raw: 15,  display: '15+',  label: 'Countries Served' },
]

const locations = [
  'Delhi', 'Dubai', 'Toronto', 'Los Angeles', 'Azerbaijan',
  'Mumbai', 'Hyderabad', 'Bangalore', 'Chennai', 'Kolkata',
]

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function StatItem({ raw, display, label, active }) {
  const count  = useCountUp(raw, 1800, active)
  const suffix = display.replace(/\d+/, '')
  return (
    <div className="intro__stat">
      <span className="intro__stat-num">{count}{suffix}</span>
      <span className="intro__stat-label">{label}</span>
    </div>
  )
}

export default function Intro() {
  const sectionRef = useRef(null)
  const [statsOn, setStatsOn] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (entry.target.dataset.trigger === 'stats') setStatsOn(true)
          }
        })
      },
      { threshold: 0.15 }
    )
    const targets = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    targets?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="intro" id="intro" ref={sectionRef}>
      {/* Film strip top */}
      <div className="intro__perfs intro__perfs--top" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => <div key={i} className="intro__perf" />)}
      </div>

      <div className="container intro__inner">

        {/* ── Left column ── */}
        <div className="intro__left reveal-left">
          <p className="intro__tagline">Your Global Creative Partner</p>

          <h2 className="intro__title">
            We don't just<br />make videos.<br />
            <span className="intro__title-highlight">We craft legacy.</span>
          </h2>

          <div className="intro__divider" />

          <p className="intro__left-sub">
            From the streets of Delhi to the screens of Dubai, Toronto, Los Angeles,
            and Azerbaijan — Prince Movie Creation has spent 25+ years producing films
            that cross borders and move audiences worldwide.
          </p>

          {/* Location pills */}
          <div className="intro__locations">
            {locations.map((loc) => (
              <span className="intro__loc-pill" key={loc}>{loc}</span>
            ))}
          </div>

          <Link to="/about" className="intro__know-more">
            <span>Discover Our Story</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* ── Right column ── */}
        <div className="intro__right reveal-right">
          <div className="intro__quote-mark" aria-hidden="true">"</div>

          <blockquote className="intro__blockquote">
            From the first frame to the final cut — for over 25 years, we've been
            creating films that don't just tell stories, they build brands, inspire
            nations, and travel the world.
          </blockquote>

          <p className="intro__body-text">
            Prince Movie Creation is a full-service production house established in Delhi,
            with a 25-year legacy of delivering cinematic excellence across ad films,
            corporate documentaries, music videos, and short films. Our productions have
            reached audiences across India — North to South — and internationally across
            the Middle East, North America, and Central Asia.
          </p>

          {/* Animated stats */}
          <div className="intro__stats reveal" data-trigger="stats">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} active={statsOn} />
            ))}
          </div>
        </div>

      </div>

      {/* Film strip bottom */}
      <div className="intro__perfs intro__perfs--bottom" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => <div key={i} className="intro__perf" />)}
      </div>
    </section>
  )
}
