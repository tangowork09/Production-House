import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
// ── TEAM DESIGN SWITCH ──────────────────────────────────────────
// Cinematic (video hero + glassmorphism) — current:
// import TeamPage from './pages/TeamPage'
// Light (clean editorial, warm cards) — saved:
import TeamPage from './pages/TeamPageLight'
// ────────────────────────────────────────────────────────────────
import AboutPage from './pages/AboutPage'
import AdFilms from './pages/services/AdFilms'
import CorporateDocumentary from './pages/services/CorporateDocumentary'
import MusicVideos from './pages/services/MusicVideos'
import ShortFilms from './pages/services/ShortFilms'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ad-films" element={<AdFilms />} />
          <Route path="/corporate-documentary" element={<CorporateDocumentary />} />
          <Route path="/music-videos" element={<MusicVideos />} />
          <Route path="/short-films" element={<ShortFilms />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

