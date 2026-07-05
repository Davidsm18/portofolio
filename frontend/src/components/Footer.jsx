import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">David Mateman</span>
          <p className="footer-copy">© 2026 David Mateman. Gebouwd met technische precisie.</p>
        </div>

        <div className="footer-nav">
          <a href="#home">Home</a>
          <a href="#projecten">Projecten</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer