import { useEffect } from 'react'
import './ServicePage.css'

export default function MusicVideos() {
  useEffect(() => { window.scrollTo({ top: 0 }) }, [])

  return (
    <div className="service-page">
      <div className="service-page__hero">
        <span className="service-page__label">Our Services</span>
        <h1 className="service-page__title">Music Videos</h1>
        <p className="service-page__sub">Visuals that elevate sound and emotion.</p>
      </div>
      <div className="service-page__body container">
        <p className="service-page__coming">Content coming soon. Check back shortly.</p>
      </div>
    </div>
  )
}
