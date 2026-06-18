import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="#home" className="nav-brand">David Mateman</a>
        
        <button 
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            >
              ☰
            </button>
        <div className={open ? "nav-links open" : "nav-links"}>
          <a href="#projecten" onClick={() => setOpen(false)}>Projecten</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar