import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

const links = [
  { label: "Home", href: "/home", route: "/home" },
  { label: "About Us", href: "/about", route: "/about" },
  { label: "Ad Films", href: "/ad-films", route: "/ad-films" },
  {
    label: "Corporate | Documentary",
    href: "/corporate-documentary",
    route: "/corporate-documentary",
  },
  { label: "Music Videos", href: "/music-videos", route: "/music-videos" },
  { label: "Short Films", href: "/short-films", route: "/short-films" },
  { label: "Gallery", href: "/gallery", route: "/gallery" },
  { label: "Our Team", href: "/team", route: "/team" },
  { label: "Contact Us", href: "/contact", route: "/contact" },
];

const serviceRouteMap = {
  "/ad-films": "Ad Films",
  "/corporate-documentary": "Corporate | Documentary",
  "/music-videos": "Music Videos",
  "/short-films": "Short Films",
  "/gallery": "Gallery",
  "/team": "Our Team",
  "/contact": "Contact Us",
};

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === "/home" || location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isTeam = location.pathname === "/team";

  let activeLabel = "Home";
  if (isAbout) activeLabel = "About Us";
  else if (isTeam) activeLabel = "Our Team";
  else activeLabel = serviceRouteMap[location.pathname] ?? "Home";

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLinkClick(e, link) {
    if (link.label === "Home" && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  const isLight = theme === "light";

  return (
    <header
      className={[
        "navbar",
        scrolled ? "navbar--scrolled" : "",
        isLight ? "navbar--light" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Logo */}
      <Link
        to="/home"
        className="navbar__logo"
        aria-label="Prince Movie Creation home"
      >
        <img
          src="/logo/logo.webp"
          alt="Prince Movie Creation"
          className="navbar__logo-img"
          fetchPriority="high"
          loading="eager"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "inline";
          }}
        />
        <span className="navbar__logo-text" style={{ display: "none" }}>
          Prince Movie Creation
        </span>
      </Link>

      {/* Navigation links */}
      <nav className={`navbar__nav${menuOpen ? " navbar__nav--open" : ""}`}>
        {links.map((link) => {
          const isActive = link.label === activeLabel;
          return (
            <Link
              key={link.label}
              to={link.route ?? link.href}
              className={`navbar__link${isActive ? " navbar__link--active" : ""}`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Theme toggle row — visible inside mobile menu only */}
        <div className="navbar__mobile-toggle-row">
          <span className="navbar__mobile-toggle-label">
            {isLight ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            className={`navbar__theme-toggle${isLight ? " navbar__theme-toggle--light" : ""}`}
            onClick={toggle}
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
          >
            <span className="navbar__toggle-track">
              <span className="navbar__toggle-thumb">
                {isLight ? <SunIcon /> : <MoonIcon />}
              </span>
            </span>
          </button>
        </div>
      </nav>

      {/* Desktop right controls: toggle + burger */}
      <div className="navbar__controls">
        <button
          className={`navbar__theme-toggle${isLight ? " navbar__theme-toggle--light" : ""}`}
          onClick={toggle}
          aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
          title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          <span className="navbar__toggle-track">
            <span className="navbar__toggle-thumb">
              {isLight ? <SunIcon /> : <MoonIcon />}
            </span>
          </span>
        </button>

        <button
          className={`navbar__burger${menuOpen ? " navbar__burger--open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
