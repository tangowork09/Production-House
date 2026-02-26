import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* Column 1: Logo & Tagline */}
        <div className="footer__col">
          <Link to="/home" className="footer__logo">
            <img src="/logo/logo.svg" alt="Prince Movie Creation" className="footer__logo-img" />
            <span className="footer__logo-text">Prince Movie Creation</span>
          </Link>
          <p className="footer__desc">
            Crafting cinematic experiences that resonate. From ad films to documentaries, we bring your vision to life.
          </p>
        </div>

        {/* Column 2: Quick Navigation */}
        <div className="footer__col">
          <h3 className="footer__title">Quick Navigation</h3>
          <nav className="footer__nav">
            <Link to="/home">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/ad-films">Ad Films</Link>
            <Link to="/corporate-documentary">Corporate | Documentary</Link>
            <Link to="/music-videos">Music Videos</Link>
            <Link to="/short-films">Short Films</Link>
          </nav>
        </div>

        {/* Column 3: Contact Us */}
        <div className="footer__col">
          <h3 className="footer__title">Contact Us</h3>
          <div className="footer__contact">
            <p><a href="tel:+917982883097">+91 7982883097</a></p>
            <p><a href="tel:+919891996799">+91 9891996799</a></p>
            <p><a href="tel:+919310075702">+91 9310075702</a></p>
            <p className="footer__email">
              <a href="mailto:princemoviecreation9771@gmail.com">princemoviecreation9771@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Column 4: Address */}
        {/* <div className="footer__col">
          <h3 className="footer__title">Our Studio</h3>
          <address className="footer__address">
            1st Floor, Galaxy Business Park,<br />
            A-44 & A-45, Block A,<br />
            Sector 62, Noida,<br />
            Uttar Pradesh 201309
          </address>
        </div> */}
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">
          &copy; {year} Prince Movie Creation. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

