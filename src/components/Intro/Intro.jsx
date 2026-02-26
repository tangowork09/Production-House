import { Link } from 'react-router-dom'
import './Intro.css'

export default function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="container intro__inner">
        <h2 className="intro__title">
          Welcome to Prince Movie Creation
        </h2>
        <p className="intro__tagline">Your Creative Media Partner</p>

        <div className="intro__divider" />

        <div className="intro__body">
          <p>
            At Prince Movie Creation, we believe that every brand has a story worth
            telling — and the right video can turn that story into a powerful experience.
            We are a full-service video production company in Noida, trusted by brands,
            startups, and enterprises to deliver visually compelling, strategically driven,
            and emotionally engaging video content.
          </p>
          <p>
            From concept to final cut, we help businesses communicate better, sell smarter,
            and connect deeper with their audience. Whether it's a corporate film, brand video,
            ad film, or digital content, our work is designed to leave a lasting impression.
          </p>
        </div>

        <Link to="/about" className="intro__know-more">
          Know More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
