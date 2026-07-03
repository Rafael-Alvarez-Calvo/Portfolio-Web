import { LanguageProvider } from './contexts/LanguageContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export const App = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  )
}
