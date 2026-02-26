import { Link } from 'react-router-dom'
import './About.css'

const differentiators = [
  {
    num: '01',
    title: 'Strategy-First Approach',
    body: 'Before we pick up a camera, we ask the right questions. Who is your audience? What\'s your message? What action should viewers take? This strategic foundation helps us deliver videos that don\'t just look cinematic — they drive real business results.',
  },
  {
    num: '02',
    title: 'End-to-End Video Production',
    body: 'As one of the best ad film production houses, we handle everything in-house for creative consistency, faster turnaround, and superior quality.',
    bullets: [
      'Concept & scripting',
      'Storyboarding',
      'Shooting & direction',
      'Editing & post-production',
      'Sound design & colour grading',
    ],
  },
  {
    num: '03',
    title: 'Cinematic Quality, Corporate Precision',
    body: 'Our videos strike the perfect balance between cinematic storytelling and corporate professionalism — ideal for brands that want to stand out while staying credible.',
  },
]

const expertise = [
  {
    icon: '🎬',
    title: 'Corporate Films & Company Profile Videos',
    desc: 'Showcase your brand values, culture, and achievements with clarity and confidence.',
  },
  {
    icon: '📺',
    title: 'Ad Films & Brand Commercials',
    desc: 'High-impact, emotionally driven ad films that connect with your audience and amplify your brand voice.',
  },
  {
    icon: '📱',
    title: 'Promotional & Marketing Videos',
    desc: 'Designed for digital platforms, social media, and campaigns that demand attention.',
  },
  {
    icon: '💡',
    title: 'Explainer & Product Videos',
    desc: 'Simplifying complex ideas into engaging visual narratives.',
  },
  {
    icon: '🎵',
    title: 'Music Videos',
    desc: 'Creative direction, cinematic production, and seamless post-production for artists and labels.',
  },
  {
    icon: '🎞️',
    title: 'Event Coverage & Aftermovies',
    desc: 'Capturing moments, energy, and stories that deserve to be remembered.',
  },
]

const whyUs = [
  'We listen before we create',
  'We deliver on time, every time',
  'We blend creativity with business goals',
  'We treat every project — big or small — with equal passion',
]

export default function About() {
  return (
    <section id="about" className="about">

      {/* ── 1. Header ─────────────────────────────────── */}
      <div className="about-block about-block--white">
        <div className="container about__header">
          <span className="about__label">About Us</span>
          <h2 className="about__heading">
            We Don't Just Create Videos —<br />We Create Impact
          </h2>
          <div className="about__intro-text">
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
        </div>
      </div>

      {/* ── 2. Who We Are ─────────────────────────────── */}
      <div className="about-block about-block--gray">
        <div className="container about__who">
          <div className="about__who-text">
            <span className="about__label">Who We Are</span>
            <h3 className="about__subheading">Built by storytellers,<br />driven by craft</h3>
            <p>
              Prince Movie Creation is recognised as one of the best video production houses
              in Delhi NCR, built by a team of passionate filmmakers, storytellers, strategists,
              and visual artists. We combine creativity with clarity, aesthetics with purpose,
              and storytelling with results.
            </p>
            <p>
              As a modern corporate film maker, we understand that videos are not just about
              looking good — they need to perform. Every frame we produce is backed by insight,
              intent, and innovation.
            </p>
            <p className="about__origin">
              Our journey started with a simple idea:<br />
              <strong>Create videos that move people and brands forward.</strong>
            </p>
          </div>

          <div className="about__stats-grid">
            <div className="about__stat">
              <span className="about__stat-num">120+</span>
              <span className="about__stat-label">Projects Delivered</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">8+</span>
              <span className="about__stat-label">Years in Production</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">40+</span>
              <span className="about__stat-label">Happy Clients</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">Delhi NCR</span>
              <span className="about__stat-label">Based in Noida</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. What Makes Us Different ────────────────── */}
      <div className="about-block about-block--white">
        <div className="container">
          <div className="about__section-header">
            <span className="about__label">Our Edge</span>
            <h3 className="about__subheading">
              What Makes Us a Leading<br />Video Production Company in Noida
            </h3>
            <p className="about__section-sub">
              In a crowded market, what truly sets us apart is how deeply we care about your brand's story.
            </p>
          </div>

          <div className="about__diff-grid">
            {differentiators.map((d) => (
              <div className="about__diff-card" key={d.num}>
                <span className="about__diff-num">{d.num}</span>
                <h4 className="about__diff-title">{d.title}</h4>
                <p className="about__diff-body">{d.body}</p>
                {d.bullets && (
                  <ul className="about__bullets">
                    {d.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Expertise ──────────────────────────────── */}
      <div className="about-block about-block--cream">
        <div className="container">
          <div className="about__section-header">
            <span className="about__label">Our Expertise</span>
            <h3 className="about__subheading">What We Specialise In</h3>
          </div>

          <div className="about__expertise-grid">
            {expertise.map((e) => (
              <div className="about__expertise-card" key={e.title}>
                <span className="about__expertise-icon">{e.icon}</span>
                <h4 className="about__expertise-title">{e.title}</h4>
                <p className="about__expertise-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. Why Choose Us ──────────────────────────── */}
      <div className="about-block about-block--gray">
        <div className="container about__why">
          <div className="about__why-content">
            <span className="about__label">Why Choose Us</span>
            <h3 className="about__subheading">Why Brands Choose<br />Prince Movie Creation</h3>
            <p className="about__why-intro">
              Being called the best video production house in Delhi isn't about claims —
              it's about consistency, creativity, and trust.
            </p>
            <ul className="about__why-list">
              {whyUs.map((item) => (
                <li key={item}>
                  <span className="about__why-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="about__why-quote">
            <blockquote>
              We don't believe in templates. Every video we produce is custom-crafted to reflect
              the unique identity of the brand behind it.
            </blockquote>
          </div>
        </div>
      </div>

      {/* ── 6. Mission & Vision ───────────────────────── */}
      <div className="about-block about-block--white">
        <div className="container">
          <div className="about__section-header">
            <span className="about__label">Our Purpose</span>
            <h3 className="about__subheading">Mission & Vision</h3>
          </div>

          <div className="about__mv-grid">
            <div className="about__mv-card about__mv-card--mission">
              <div className="about__mv-icon">🎯</div>
              <h4>Our Mission</h4>
              <p>To empower brands with powerful video content that:</p>
              <ul>
                <li>Builds trust</li>
                <li>Enhances brand recall</li>
                <li>Drives engagement</li>
                <li>Delivers measurable impact</li>
              </ul>
            </div>

            <div className="about__mv-card about__mv-card--vision">
              <div className="about__mv-icon">🔭</div>
              <h4>Our Vision</h4>
              <p>
                To become the most trusted and innovative video production company in Noida
                and Delhi NCR, known for creating meaningful visual stories that inspire
                action and drive growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 7. CTA ────────────────────────────────────── */}
      <div className="about-block about-block--dark">
        <div className="container about__cta">
          <h3 className="about__cta-title">Let's Create Something Remarkable</h3>
          <p className="about__cta-sub">
            Looking for a best ad film production house, a reliable corporate film maker,
            or a creative video production partner in Delhi NCR?
            Prince Movie Creation is your storytelling partner.
          </p>
          <p className="about__cta-line">
            Let's turn your ideas into visuals that <em>speak, move, and convert.</em>
          </p>
          <Link to="/contact" className="about__cta-btn">
            Start a Project
          </Link>
        </div>
      </div>

    </section>
  )
}
