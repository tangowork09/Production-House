import { useEffect } from "react";
import "./GalleryPage.css";

const IMAGE_COUNT = 60;

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    // Reveal animation logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <span className="gallery-label">Live moments</span>
        <h1 className="gallery-title">Gallery</h1>
        <p className="gallery-sub">
          Capturing the essence of production — behind the scenes and final
          results.
        </p>
      </div>

      <div className="gallery-container container">
        <div className="gallery-masonry">
          {Array.from({ length: IMAGE_COUNT }).map((_, i) => (
            <div key={i} className="gallery-item reveal">
              <div className="gallery-item__inner">
                <img
                  src={`/images/gallery/g-${i + 1}.jpeg`}
                  alt={`Gallery piece ${i + 1}`}
                  loading="lazy"
                />
                <div className="gallery-item__overlay">
                  <div className="gallery-item__accent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
