import { Link } from 'react-router-dom'
import './Work.css'

// Replace YOUTUBE_ID_HERE with your actual unlisted YouTube video IDs
const categories = [
  {
    slug: 'ad-films',
    title: 'Ad Films',
    desc: 'Creative ads that drive attention and results.',
    video: '/videos/showReel.mp4',
  },
  {
    slug: 'corporate-documentary',
    title: 'Corporate | Documentary',
    desc: 'Authentic stories that build brand trust.',
    video: '/videos/showReel.mp4',
  },
  {
    slug: 'music-videos',
    title: 'Music Videos',
    desc: 'Visuals that elevate sound and emotion.',
    video: '/videos/showReel.mp4',
  },
  {
    slug: 'short-films',
    title: 'Short Films',
    desc: 'Stories told with cinematic excellence.',
    video: '/videos/showReel.mp4',
  },
]

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="container">
        <div className="work__header">
          <span className="work__label">Our Portfolio</span>
          <h2 className="work__title">Our Work Showcase</h2>
          <p className="work__sub">
            From brand stories to cinematic visuals — explore the projects we've crafted across formats.
          </p>
        </div>
      </div>

      <div className="work__rows">
        {categories.map((cat) => (
          <div className="work-row" key={cat.slug}>

            {/* Video half — autoplay, muted, looped, no controls, no interaction */}
            <div className="work-row__video">
              <video
                className="work-row__video-element"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={cat.video} type="video/mp4" />
              </video>
            </div>

            {/* Content half */}
            <div className="work-row__content">
              <h3 className="work-row__cat-title">{cat.title}</h3>
              <p className="work-row__cat-desc">{cat.desc}</p>
              <Link to={`/${cat.slug}`} className="work-row__cta">
                Watch All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
