import './Footer.css'
import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">David Mateman</span>
          <p className="footer-copy">{t.footer.copy}</p>
        </div>

        <div className="footer-nav">
          <a href="#home">{t.nav.home}</a>
          <a href="#projecten">{t.nav.projects}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer