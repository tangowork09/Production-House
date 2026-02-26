import { useEffect } from 'react';
import './TeamPageLight.css';

function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ceos = [
    {
        name: 'Prince Sagar',
        role: 'CEO & Producer',
        phone: '+91 7982883097',
    },
    {
        name: 'Manish Pawar',
        role: 'CEO & Producer',
        phone: '+91 9891996799',
    },
    {
        name: 'Surinder Kumar Goel',
        role: 'CEO & Producer',
        phone: '+91 9310075702',
    },
];

const PAGE_TITLE = 'Our Team | Prince Movie Creation';
const PAGE_DESC = 'Meet the visionary leadership behind Prince Movie Creation — three CEOs and producers driving award-winning films, ad films, and corporate media across India.';

export default function TeamPageLight() {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = PAGE_TITLE;

        const setMeta = (sel, val) => {
            const el = document.querySelector(sel);
            if (el) el.setAttribute('content', val);
        };

        setMeta('meta[name="description"]', PAGE_DESC);
        setMeta('meta[property="og:title"]', PAGE_TITLE);
        setMeta('meta[property="og:description"]', PAGE_DESC);
        setMeta('meta[property="og:url"]', 'https://princemoviecreations.pages.dev/team');
        setMeta('meta[name="twitter:title"]', PAGE_TITLE);
        setMeta('meta[name="twitter:description"]', PAGE_DESC);

        return () => {
            document.title = prevTitle;
            setMeta('meta[name="description"]', 'Prince Movie Creation — Creative production house for film, photography, and media.');
            setMeta('meta[property="og:title"]', 'Prince Movie Creation');
            setMeta('meta[property="og:description"]', 'Prince Movie Creation — Creative production house for film, photography, and media.');
            setMeta('meta[property="og:url"]', 'https://princemoviecreations.pages.dev/home');
            setMeta('meta[name="twitter:title"]', 'Prince Movie Creation');
            setMeta('meta[name="twitter:description"]', 'Prince Movie Creation — Creative production house for film, photography, and media.');
        };
    }, []);

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Prince Movie Creation',
        url: 'https://princemoviecreations.pages.dev',
        employee: ceos.map((c) => ({
            '@type': 'Person',
            name: c.name,
            jobTitle: c.role,
            telephone: c.phone,
        })),
    };

    return (
        <div className="team-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <header className="team-header">
                <div className="container">
                    <span className="section-label">The People</span>
                    <h1 className="team-page-title">
                        Minds Behind the Magic
                    </h1>
                    <p className="team-subtitle">
                        Visionary producers and storytellers driving every frame, every film,
                        and every moment of Prince Movie Creation.
                    </p>
                </div>
            </header>

            <section className="ceo-section" aria-label="Leadership Team">
                <div className="container">
                    <div className="ceo-grid">
                        {ceos.map((ceo, index) => (
                            <article key={index} className="ceo-card" data-num={`0${index + 1}`}>
                                <div className="ceo-avatar" aria-hidden="true">
                                    <span className="ceo-initials">{getInitials(ceo.name)}</span>
                                    <div className="ceo-avatar-ring" />
                                </div>
                                <div className="ceo-info">
                                    <h2 className="ceo-name">{ceo.name}</h2>
                                    <p className="ceo-role">{ceo.role}</p>
                                    <div className="ceo-divider" aria-hidden="true" />
                                    <a
                                        href={`tel:${ceo.phone.replace(/\s/g, '')}`}
                                        className="ceo-phone"
                                        aria-label={`Call ${ceo.name} at ${ceo.phone}`}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.35 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.26 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.29 6.29l1.27-.68a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                        {ceo.phone}
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
