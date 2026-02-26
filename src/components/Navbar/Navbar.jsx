import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

// route: '/about'  → navigate to that page
// route: null      → scroll to href on home, or navigate to /#href from /about
const links = [
  { label: 'Home', href: '/home', route: '/home' },
  { label: 'About Us', href: '/about', route: '/about' },
  { label: 'Ad Films', href: '/ad-films', route: '/ad-films' },
  { label: 'Corporate | Documentary', href: '/corporate-documentary', route: '/corporate-documentary' },
  { label: 'Music Videos', href: '/music-videos', route: '/music-videos' },
  { label: 'Short Films', href: '/short-films', route: '/short-films' },
  { label: 'Our Team', href: '/team', route: '/team' },
  { label: 'Contact Us', href: '/contact', route: '/contact' },
]

const serviceRouteMap = {
  '/ad-films': 'Ad Films',
  '/corporate-documentary': 'Corporate | Documentary',
  '/music-videos': 'Music Videos',
  '/short-films': 'Short Films',
  '/team': 'Our Team',
  '/contact': 'Contact Us',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/home' || location.pathname === '/'
  const isAbout = location.pathname === '/about'
  const isTeam = location.pathname === '/team'

  // Derive active link from current route
  let activeLabel = 'Home'
  if (isAbout) activeLabel = 'About Us'
  else if (isTeam) activeLabel = 'Our Team'
  else activeLabel = serviceRouteMap[location.pathname] ?? 'Home'

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleLinkClick(e, link) {
    if (link.label === 'Home' && isHome) {
      e.preventDefault()
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setMenuOpen(false)
    // For normal route navigation, we let the Link-like behavior happen if we used Link, 
    // but here we are using <a> and handleLinkClick.
    if (link.route) {
      // e.preventDefault() // Let the href handle it or navigate manually
      // navigate(link.route)
    }
  }

  return (
    <header className="navbar">
      <Link to="/home" className="navbar__logo" aria-label="Prince Movie Creation home">

        <img
          src="/logo/logo.svg"
          alt="Prince Movie Creation"
          className="navbar__logo-img"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'inline'
          }}
        />
        <span className="navbar__logo-text" style={{ display: 'none' }}>
          Prince Movie Creation
        </span>
      </Link>

      <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}>
        {links.map((link) => {
          const isActive = link.label === activeLabel
          return (
            <a
              key={link.label}
              href={link.route ?? link.href}
              className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.label}
            </a>
          )
        })}
      </nav>

      <button
        className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
