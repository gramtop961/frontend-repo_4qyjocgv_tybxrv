import Hero from './components/Hero'
import Skills from './components/Skills'
import Project from './components/Project'
import Quotes from './components/Quotes'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      <Hero />
      <Skills />
      <Project />
      <Quotes />
      <Contact />
    </div>
  )
}

export default App
