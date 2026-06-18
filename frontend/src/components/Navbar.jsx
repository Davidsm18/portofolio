import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)

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
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#projecten" onClick={() => setOpen(false)}>Projecten</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a className="contact-link" href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar