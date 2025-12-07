import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { DottedSurface } from './components/ui/dotted-surface'
import { GlassFilter } from './components/ui/liquid-glass'

function App() {
  return (
    <div className="min-h-screen relative">
      {/* SVG filter for glass effect */}
      <GlassFilter />
      
      {/* Animated dotted background */}
      <DottedSurface />
      
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Publications />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}

export default App
