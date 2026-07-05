import { LanguageProvider } from './contexts/LanguageContext'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Services } from './components/Services/Services'
import { Skills } from './components/Skills/Skills'
import { Experience } from './components/Experience/Experience'
import { Projects } from './components/Projects/Projects'
import { Certifications } from './components/Certifications/Certifications'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'

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
