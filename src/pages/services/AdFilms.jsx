import { useEffect, useRef, useState } from "react";
import "./ServicePage.css";
import "./AdFilms.css";

const ADS_COUNT = 10;

export default function AdFilms() {
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handlePlay = (id) => {
    // Pause any other video that might be playing
    Object.keys(videoRefs.current).forEach((key) => {
      if (key !== id.toString() && videoRefs.current[key]) {
        videoRefs.current[key].pause();
      }
    });
    setPlayingId(id);
  };

  const handleMaximize = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE11 */
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="service-page">
      <div className="service-page__hero">
        <span className="service-page__label">Premium Commercials</span>
        <h1 className="service-page__title">Ad Films</h1>
        <p className="service-page__sub">
          Dynamic visual storytelling that transforms brands into cinematic
          experiences.
        </p>
      </div>

      <div className="service-page__body container">
        <div className="ads-grid">
          {Array.from({ length: ADS_COUNT }).map((_, idx) => {
            const id = idx + 1;
            return (
              <div
                key={id}
                className={`ad-card ${playingId === id ? "is-playing" : ""}`}
                id={`ad-card-${id}`}
              >
                <div className="ad-card__video-wrapper">
                  <video
                    ref={(el) => (videoRefs.current[id] = el)}
                    className="ad-card__video"
                    src={`/videos/ads/ad-${id}.mp4`}
                    controls
                    onPlay={() => handlePlay(id)}
                    playsInline
                  />

                  <div className="ad-card__controls">
                    <button
                      className="ad-control-btn"
                      onClick={() => handleMaximize(id)}
                      title="Maximize"
                      aria-label="Maximize Screen"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
