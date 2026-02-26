import { useEffect, useRef } from 'react';
import './TeamPage.css';

/* ─── Helpers ────────────────────────────────────────────────── */
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ─── Data ───────────────────────────────────────────────────── */
const ceos = [
    { name: 'Prince Sagar',       role: 'CEO & Producer', phone: '+91 7982883097' },
    { name: 'Manish Pawar',        role: 'CEO & Producer', phone: '+91 9891996799' },
    { name: 'Surinder Kumar Goel', role: 'CEO & Producer', phone: '+91 9310075702' },
];

const HOLES        = Array.from({ length: 32 });
const REEL_HOLES   = Array.from({ length: 64 });
const TICKER_ITEMS = ['Film Direction', 'Ad Films', 'Production', 'Corporate Films', 'Music Videos', 'Short Films', 'Cinematography', 'Post Production'];
const HERO_WORDS   = [['The', 'Directors'], ['&', 'Producers']];

// Five frames seeked to different moments in the reel
const REEL_FRAMES = [
    { offset: 0  },
    { offset: 7  },
    { offset: 14 },
    { offset: 21 },
    { offset: 28 },
];

const PAGE_TITLE = 'Our Team | Prince Movie Creation';
const PAGE_DESC  = 'Meet the visionary leadership behind Prince Movie Creation — three CEOs and producers driving award-winning films, ad films, and corporate media across India.';

/* ─── Movie Camera SVG ───────────────────────────────────────── */
function MovieCameraIcon() {
    return (
        <svg viewBox="0 0 96 68" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="reel-camera-icon" aria-hidden="true">
            {/* Body */}
            <rect x="10" y="18" width="54" height="34" rx="3"
                stroke="currentColor" strokeWidth="1.8" />
            {/* Lens outer */}
            <circle cx="37" cy="35" r="14" stroke="currentColor" strokeWidth="1.8" />
            {/* Lens middle */}
            <circle cx="37" cy="35" r="9"  stroke="currentColor" strokeWidth="1.4" />
            {/* Lens inner */}
            <circle cx="37" cy="35" r="4"  stroke="currentColor" strokeWidth="1.2" />
            {/* Lens glint */}
            <path d="M31 29 Q33.5 27 37 28" stroke="currentColor" strokeWidth="1"
                strokeLinecap="round" opacity="0.4" />
            {/* Viewfinder tube */}
            <rect x="64" y="22" width="16" height="11" rx="2"
                stroke="currentColor" strokeWidth="1.5" />
            <circle cx="80" cy="27.5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            {/* Film magazines (reels) on top */}
            <circle cx="26" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="26" cy="14" r="4" stroke="currentColor" strokeWidth="1.2" />
            <line x1="26" y1="10" x2="26" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="22.5" y1="11.5" x2="29.5" y2="16.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="22.5" y1="16.5" x2="29.5" y2="11.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="50" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="14" r="4" stroke="currentColor" strokeWidth="1.2" />
            <line x1="50" y1="10" x2="50" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="46.5" y1="11.5" x2="53.5" y2="16.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="46.5" y1="16.5" x2="53.5" y2="11.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Top bridge */}
            <rect x="17" y="5" width="51" height="9" rx="2"
                stroke="currentColor" strokeWidth="1.5" />
            {/* Side control knobs */}
            <rect x="54" y="23" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <rect x="54" y="32" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <rect x="54" y="41" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            {/* Grip handle */}
            <rect x="25" y="52" width="24" height="13" rx="3"
                stroke="currentColor" strokeWidth="1.5" />
            <line x1="29" y1="56" x2="45" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <line x1="29" y1="60" x2="45" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        </svg>
    );
}

/* ══════════════════════════════════════════════════════════════ */
export default function TeamPage() {
    const cardRefs = useRef([]);
    const wrapRefs = useRef([]);

    /* ── SEO ─────────────────────────────────────────────────── */
    useEffect(() => {
        const prevTitle = document.title;
        document.title = PAGE_TITLE;
        const setMeta = (sel, val) => {
            const el = document.querySelector(sel);
            if (el) el.setAttribute('content', val);
        };
        setMeta('meta[name="description"]',        PAGE_DESC);
        setMeta('meta[property="og:title"]',       PAGE_TITLE);
        setMeta('meta[property="og:description"]', PAGE_DESC);
        setMeta('meta[property="og:url"]',         'https://princemoviecreations.pages.dev/team');
        setMeta('meta[name="twitter:title"]',      PAGE_TITLE);
        setMeta('meta[name="twitter:description"]',PAGE_DESC);
        return () => {
            document.title = prevTitle;
            setMeta('meta[name="description"]',        'Prince Movie Creation — Creative production house for film, photography, and media.');
            setMeta('meta[property="og:title"]',       'Prince Movie Creation');
            setMeta('meta[property="og:description"]', 'Prince Movie Creation — Creative production house for film, photography, and media.');
            setMeta('meta[property="og:url"]',         'https://princemoviecreations.pages.dev/home');
            setMeta('meta[name="twitter:title"]',      'Prince Movie Creation');
            setMeta('meta[name="twitter:description"]','Prince Movie Creation — Creative production house for film, photography, and media.');
        };
    }, []);

    /* ── Scroll-triggered card entrance ──────────────────────── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ceo-wrap--visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        wrapRefs.current.forEach((wrap) => { if (wrap) observer.observe(wrap); });
        return () => observer.disconnect();
    }, []);

    /* ── 3D tilt + spotlight ─────────────────────────────────── */
    const handleMouseMove = (e, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top)  / rect.height;
        card.style.setProperty('--rot-x',   `${(y - 0.5) * -14}deg`);
        card.style.setProperty('--rot-y',   `${(x - 0.5) *  14}deg`);
        card.style.setProperty('--mouse-x', `${x * 100}%`);
        card.style.setProperty('--mouse-y', `${y * 100}%`);
        card.style.transition = 'border-color .4s, box-shadow .4s';
    };

    const handleMouseLeave = (i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        card.style.setProperty('--rot-x', '0deg');
        card.style.setProperty('--rot-y', '0deg');
        card.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1), border-color .4s, box-shadow .4s';
    };

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Prince Movie Creation',
        url:  'https://princemoviecreations.pages.dev',
        employee: ceos.map((c) => ({
            '@type': 'Person', name: c.name, jobTitle: c.role, telephone: c.phone,
        })),
    };

    return (
        <div className="team-page-cinematic">
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            {/* Film grain */}
            <div className="film-grain" aria-hidden="true" />

            {/* ════════ HERO ════════ */}
            <section className="team-hero">
                <video className="team-hero-video" src="/videos/showReel.mp4"
                    autoPlay muted loop playsInline aria-hidden="true" />

                <div className="team-hero-overlay" aria-hidden="true" />
                <div className="hero-scanlines"    aria-hidden="true" />
                <div className="hero-flare"        aria-hidden="true" />

                <div className="filmstrip filmstrip--top" aria-hidden="true">
                    {HOLES.map((_, i) => <span key={i} className="filmstrip-hole" />)}
                </div>

                <div className="team-hero-content container">
                    <span className="team-hero-label" aria-hidden="true">The People</span>

                    <h1 className="team-hero-title" aria-label="The Directors & Producers">
                        {HERO_WORDS.map((line, li) => (
                            <span key={li} className="hero-line">
                                {line.map((word, wi) => (
                                    <span key={wi} className={`hero-word${word === '&' ? ' hero-word--amp' : ''}`}>
                                        <span className="hero-word-inner"
                                            style={{ animationDelay: `${0.35 + (li * 2 + wi) * 0.14}s` }}>
                                            {word}
                                        </span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <p className="team-hero-sub" style={{ animationDelay: '0.9s' }}>
                        Three visionaries. One mission.<br />
                        To tell stories that move the world.
                    </p>

                    <div className="team-scroll-cue" aria-hidden="true">
                        <span className="team-scroll-line" />
                        <span className="team-scroll-text">Scroll</span>
                    </div>
                </div>

                <div className="hero-ticker" aria-hidden="true">
                    <div className="hero-ticker-track">
                        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                            <span key={i} className="hero-ticker-item">
                                {item}<span className="hero-ticker-sep">◆</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="filmstrip filmstrip--bottom" aria-hidden="true">
                    {HOLES.map((_, i) => <span key={i} className="filmstrip-hole" />)}
                </div>
            </section>

            {/* ════════ CEO CARDS ════════ */}
            <section className="ceo-section" aria-label="Leadership Team">
                <div className="ceo-bg-grid" aria-hidden="true" />
                <div className="container">
                    <div className="ceo-section-header">
                        <span className="ceo-section-label">Leadership</span>
                        <div className="ceo-section-rule" aria-hidden="true" />
                        <span className="ceo-section-count">{String(ceos.length).padStart(2, '0')}</span>
                    </div>
                    <div className="ceo-grid">
                        {ceos.map((ceo, index) => (
                            <div key={index} className="ceo-wrap"
                                ref={el => { wrapRefs.current[index] = el; }}
                                style={{ '--delay': `${index * 0.13}s` }}>
                                <article className="ceo-card" data-num={`0${index + 1}`}
                                    ref={el => { cardRefs.current[index] = el; }}
                                    onMouseMove={e => handleMouseMove(e, index)}
                                    onMouseLeave={() => handleMouseLeave(index)}>

                                    <div className="ceo-card-spotlight" aria-hidden="true" />
                                    <div className="ceo-card-topglow"   aria-hidden="true" />
                                    <div className="ceo-card-corners"   aria-hidden="true">
                                        <span /><span /><span /><span />
                                    </div>

                                    <div className="ceo-avatar" aria-hidden="true">
                                        <span className="ceo-initials">{getInitials(ceo.name)}</span>
                                        <div className="ceo-avatar-ring"     />
                                        <div className="ceo-avatar-aperture" />
                                        <div className="ceo-avatar-pulse"    />
                                    </div>

                                    <div className="ceo-info">
                                        <h2 className="ceo-name">{ceo.name}</h2>
                                        <p className="ceo-role">{ceo.role}</p>
                                        <div className="ceo-divider" aria-hidden="true" />
                                        <a href={`tel:${ceo.phone.replace(/\s/g, '')}`}
                                            className="ceo-phone"
                                            aria-label={`Call ${ceo.name} at ${ceo.phone}`}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.35 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.26 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.29 6.29l1.27-.68a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                            </svg>
                                            {ceo.phone}
                                        </a>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ FILM REEL STRIP ════════ */}
            <section className="reel-section" aria-label="Showreel archive">
                {/* Intro row */}
                <div className="reel-intro container">
                    <div className="reel-camera-wrap">
                        <MovieCameraIcon />
                    </div>
                    <div className="reel-intro-text">
                        <span className="section-label">From the Archives</span>
                        <h2 className="reel-intro-title">Behind the Camera</h2>
                    </div>
                    <div className="reel-intro-rule" aria-hidden="true" />
                </div>

                {/* Strip */}
                <div className="reel-strip">
                    {/* Top perforations */}
                    <div className="reel-perfs reel-perfs--top" aria-hidden="true">
                        {REEL_HOLES.map((_, i) => <span key={i} className="reel-perf-hole" />)}
                    </div>

                    {/* Scrolling frames — duplicated for seamless loop */}
                    <div className="reel-track-outer">
                        <div className="reel-track">
                            {[...REEL_FRAMES, ...REEL_FRAMES].map((frame, i) => (
                                <div key={i} className="reel-frame">
                                    <video
                                        src="/videos/showReel.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        aria-hidden="true"
                                        onLoadedMetadata={e => {
                                            e.currentTarget.currentTime = frame.offset;
                                        }}
                                    />
                                    <div className="reel-frame-overlay" aria-hidden="true" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom perforations */}
                    <div className="reel-perfs reel-perfs--bottom" aria-hidden="true">
                        {REEL_HOLES.map((_, i) => <span key={i} className="reel-perf-hole" />)}
                    </div>
                </div>

                {/* Bottom label bar */}
                <div className="reel-footer" aria-hidden="true">
                    <span className="reel-footer-text">Prince Movie Creation · Showreel</span>
                    <span className="reel-footer-sep">◆</span>
                    <span className="reel-footer-text">35mm</span>
                    <span className="reel-footer-sep">◆</span>
                    <span className="reel-footer-text">4K</span>
                    <span className="reel-footer-sep">◆</span>
                    <span className="reel-footer-text">India</span>
                </div>
            </section>
        </div>
    );
}
