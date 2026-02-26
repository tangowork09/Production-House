import { useState, useRef, useEffect, useCallback } from 'react'
import './Gallery.css'

// ── Data: 'portrait' = mobile/tall, 'pair' = 2 landscape stacked vertically ──
// Replace src values with your own AVIF/WebP paths, e.g. '/images/gallery/shot-01.avif'
const rawItems = [
  { type: 'portrait', src: '/images/img-1.webp', alt: 'Prince Movie Creation — Frame 1' },
  { type: 'portrait', src: '/images/img-2.webp', alt: 'Prince Movie Creation — Frame 2' },
  { type: 'portrait', src: '/images/img-3.webp', alt: 'Prince Movie Creation — Frame 3' },
  { type: 'portrait', src: 'https://picsum.photos/seed/pmc04/450/800', alt: 'Frame 4' },
  {
    type: 'pair', images: [
      { src: 'https://picsum.photos/seed/pmc05/800/450', alt: 'Frame 5' },
      { src: 'https://picsum.photos/seed/pmc06/800/450', alt: 'Frame 6' },
    ]
  },
  { type: 'portrait', src: 'https://picsum.photos/seed/pmc07/450/800', alt: 'Frame 7' },
  { type: 'portrait', src: 'https://picsum.photos/seed/pmc08/450/800', alt: 'Frame 8' },
  {
    type: 'pair', images: [
      { src: 'https://picsum.photos/seed/pmc09/800/450', alt: 'Frame 9' },
      { src: 'https://picsum.photos/seed/pmc10/800/450', alt: 'Frame 10' },
    ]
  },
  { type: 'portrait', src: 'https://picsum.photos/seed/pmc11/450/800', alt: 'Frame 11' },
  {
    type: 'pair', images: [
      { src: 'https://picsum.photos/seed/pmc12/800/450', alt: 'Frame 12' },
      { src: 'https://picsum.photos/seed/pmc13/800/450', alt: 'Frame 13' },
    ]
  },
  { type: 'portrait', src: 'https://picsum.photos/seed/pmc14/450/800', alt: 'Frame 14' },
]

// Build flat array for lightbox navigation and tag each item with its flat index
const allImages = []
const items = rawItems.map(item => {
  if (item.type === 'portrait') {
    const flatIdx = allImages.length
    allImages.push({ src: item.src, alt: item.alt })
    return { ...item, flatIdx }
  }
  const imagesWithIdx = item.images.map(img => {
    const flatIdx = allImages.length
    allImages.push({ src: img.src, alt: img.alt })
    return { ...img, flatIdx }
  })
  return { ...item, images: imagesWithIdx }
})

const ExpandIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

export default function Gallery() {
  const trackRef = useRef(null)
  const drag = useRef({ startX: 0, scrollLeft: 0, moved: false })
  const [isDragging, setIsDragging] = useState(false)
  const [lightbox, setLightbox] = useState(null) // null | flatIdx

  /* ── Arrow scroll ── */
  function scrollTrack(dir) {
    trackRef.current?.scrollBy({ left: dir * Math.round(window.innerWidth * 0.6), behavior: 'smooth' })
  }

  /* ── Drag-to-scroll ── */
  function onMouseDown(e) {
    const track = trackRef.current
    drag.current = { startX: e.clientX, scrollLeft: track.scrollLeft, moved: false }
    setIsDragging(true)
  }
  function onMouseMove(e) {
    if (!isDragging) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 5) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.scrollLeft - dx
  }
  function onDragEnd() { setIsDragging(false) }

  /* ── Lightbox controls ── */
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevLight = useCallback(() => setLightbox(i => (i - 1 + allImages.length) % allImages.length), [])
  const nextLight = useCallback(() => setLightbox(i => (i + 1) % allImages.length), [])

  function handleImgClick(flatIdx) {
    if (drag.current.moved) return // drag, not click
    setLightbox(flatIdx)
  }

  /* ── Keyboard ── */
  useEffect(() => {
    if (lightbox === null) return
    function onKey(e) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevLight()
      if (e.key === 'ArrowRight') nextLight()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevLight, nextLight])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section className="gallery" id="gallery">
      {/* <div className="gallery__header container">
        <span className="gallery__label">Behind the Lens</span>
        <h2 className="gallery__title">Our Work in Frames</h2>
        <p className="gallery__sub">A glimpse into the sets, stories, and moments we capture.</p>
      </div> */}

      {/* Full-width outer — arrows float over track edges */}
      <div className="gallery__outer">

        <button className="gallery__arrow gallery__arrow--prev" onClick={() => scrollTrack(-1)} aria-label="Scroll left">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className={`gallery__track${isDragging ? ' gallery__track--dragging' : ''}`}
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {items.map((item, si) => {
            if (item.type === 'portrait') {
              return (
                <div
                  key={si}
                  className="gallery__slot gallery__slot--portrait"
                  onClick={() => handleImgClick(item.flatIdx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightbox(item.flatIdx)}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable="false" />
                  <div className="gallery__overlay"><ExpandIcon /></div>
                </div>
              )
            }
            return (
              <div key={si} className="gallery__slot gallery__slot--pair">
                {item.images.map(img => (
                  <div
                    key={img.flatIdx}
                    className="gallery__pair-img"
                    onClick={() => handleImgClick(img.flatIdx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setLightbox(img.flatIdx)}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" draggable="false" />
                    <div className="gallery__overlay"><ExpandIcon /></div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <button className="gallery__arrow gallery__arrow--next" onClick={() => scrollTrack(1)} aria-label="Scroll right">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); prevLight() }} aria-label="Previous">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img src={allImages[lightbox].src} alt={allImages[lightbox].alt} className="lightbox__img" onClick={e => e.stopPropagation()} />
          <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); nextLight() }} aria-label="Next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <span className="lightbox__counter">{lightbox + 1} / {allImages.length}</span>
        </div>
      )}
    </section>
  )
}
