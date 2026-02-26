import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import Intro from '../components/Intro/Intro'
import Work from '../components/Work/Work'
import Services from '../components/Services/Services'
import Clients from '../components/Clients/Clients'
import Gallery from '../components/Gallery/Gallery'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Work />
      <Clients />
      <Gallery />
    </>
  )
}
