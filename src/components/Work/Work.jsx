import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Work.css";

const categories = [
  {
    slug: "ad-films",
    num: "01",
    title: "Ad Films",
    tagline: "Where ideas become iconic",
    tags: ["TV Commercials", "Digital Ads", "Brand Films"],
    video: "/videos/ads/ad-1.mp4",
  },
  {
    slug: "corporate-documentary",
    num: "02",
    title: "Corporate & Documentary",
    tagline: "Authentic stories, lasting impact",
    tags: ["Corporate Films", "Documentaries", "Event Films"],
    video: "/videos/showReel.mp4",
  },
  {
    slug: "music-videos",
    num: "03",
    title: "Music Videos",
    tagline: "Visuals that amplify sound",
    tags: ["Artist Promos", "Album Visuals", "Live Sessions"],
    video: "/videos/music/music-1.mp4",
  },
  {
    slug: "short-films",
    num: "04",
    title: "Short Films",
    tagline: "Cinematic depth, powerful moments",
    tags: ["Narrative Shorts", "Festival Films", "Web Series"],
    video: "/videos/music/music-6.mp4",
  },
];

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 },
    );
    const targets = sectionRef.current?.querySelectorAll(
      ".reveal, .reveal-d1, .reveal-d2, .reveal-d3, .reveal-d4",
    );
    targets?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="container">
        <div className="work__header reveal">
          <span className="work__label">Our Portfolio</span>
          <h2 className="work__title">Work That Speaks</h2>
          <p className="work__sub">
            800+ productions across India and internationally — from ad films to
            documentaries, music videos to short films. Explore what we've
            built.
          </p>
        </div>
      </div>

      {/* 2×2 card grid — whole card is clickable */}
      <div className="work__grid">
        {categories.map((cat, i) => (
          <Link
            to={`/${cat.slug}`}
            className={`work-tile reveal-d${i + 1}`}
            key={cat.slug}
          >
            {/* ── Video top ── */}
            <div className="work-tile__media">
              <video
                className="work-tile__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={cat.video} type="video/mp4" />
              </video>
              <div className="work-tile__overlay" />
              <span className="work-tile__num" aria-hidden="true">
                {cat.num}
              </span>
              <div className="work-tile__accent" />
            </div>

            {/* ── Content bottom ── */}
            <div className="work-tile__body">
              <p className="work-tile__tagline">{cat.tagline}</p>
              <h3 className="work-tile__title">{cat.title}</h3>
              <ul className="work-tile__tags">
                {cat.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="work-tile__cta">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Films</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
