import { useState } from 'react'
import './Navbar.css'
import { useLanguage } from '../context/LanguageContext'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  return (
    <nav className="navbar">
      <div className= "nav-inner">
        <a href="#home" className="nav-brand">
          <span className="brand-prompt">&gt;<span className="brand-cursor">_</span></span>
          David <span className="brand-accent-part">Mateman</span>
        </a>
        
        <button 
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            >
              ☰
            </button>
        <div className={open ? "nav-links open" : "nav-links"}>
          <button className="lang-switch" onClick={toggleLang} aria-label="Taal wisselen / Switch language">
            <span className={lang === 'nl' ? 'lang-active' : ''}>NL</span>
            <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
          </button>

          <a href="#home" onClick={() => setOpen(false)}>{t.nav.home}</a>
          <a href="#projecten" onClick={() => setOpen(false)}>{t.nav.projects}</a>
          <a href="#about" onClick={() => setOpen(false)}>{t.nav.about}</a>
          <a className="contact-link" href="#contact" onClick={() => setOpen(false)}>{t.nav.contact}</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar