import { useEffect, useRef, useState } from "react";
import "./ServicePage.css";
import "./ShortFilms.css";

const SHORTS_COUNT = 6;

export default function ShortFilms() {
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handlePlay = (id) => {
    Object.keys(videoRefs.current).forEach((key) => {
      if (key !== id.toString() && videoRefs.current[key]) {
        videoRefs.current[key].pause();
      }
    });
    setPlayingId(id);
  };

  const handleSkip = (id, seconds) => {
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = Math.max(
        0,
        Math.min(video.duration, video.currentTime + seconds),
      );
    }
  };

  const handleMaximize = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="service-page">
      <div className="service-page__hero">
        <span className="service-page__label">Cinematic Narratives</span>
        <h1 className="service-page__title">Short Films</h1>
        <p className="service-page__sub">
          Stories told with cinematic excellence — from concept to final frame.
        </p>
      </div>

      <div className="service-page__body container">
        <div className="shorts-gallery">
          {Array.from({ length: SHORTS_COUNT }).map((_, idx) => {
            const id = idx + 1;
            return (
              <div
                key={id}
                className={`short-card ${playingId === id ? "is-playing" : ""}`}
                id={`short-card-${id}`}
              >
                <div className="short-card__video-wrapper">
                  <video
                    ref={(el) => (videoRefs.current[id] = el)}
                    className="short-card__video"
                    src={`/videos/shorts/short-${id}.mp4`}
                    controls
                    onPlay={() => handlePlay(id)}
                    playsInline
                  />

                  <div className="short-card__controls">
                    {/* Maximize */}
                    <button
                      className="short-control-btn"
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
