import { useEffect } from 'react'
import About from '../components/About/About'

export default function AboutPage() {
  // Always scroll to top when landing on this page
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return <About />
}
