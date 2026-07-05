import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [naam, setNaam] = useState("")
  const [email, setEmail] = useState("")
  const [bericht, setBericht] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const onderwerp = `Bericht van ${naam}`
    const body = `${bericht}\n\nVan: ${naam} (${email})`
    window.location.href =
      `mailto:d.mateman18@gmail.com?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="container contact-grid">
      <div className="contact-info">
        <h2 className="section-title">Laten we samenwerken</h2>
        <p className="contact-intro">
          Heb je een project in gedachten of wil je gewoon sparren? Stuur me een
          berichtje en ik kom zo snel mogelijk bij je terug.
        </p>

        <div className="contact-details">
          <a href="mailto:d.mateman18@gmail.com" className="contact-item">
            <span className="contact-icon">✉</span>
            d.mateman18@gmail.com
          </a>
          <span className="contact-item">
            <span className="contact-icon">📍</span>
            Nederland
          </span>
          <a href="https://github.com/Davidsm18" target="_blank" rel="noreferrer" className="contact-item">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>
            </span>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/david-mateman-94386b409/" target="https://www.linkedin.com/feed/" rel="noreferrer" className="contact-item">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </span>
            LinkedIn
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="naam">Naam</label>
          <input id="naam" type="text" placeholder="Je naam"
            value={naam} onChange={(e) => setNaam(e.target.value)} required />
        </div>

        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="je@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="field">
          <label htmlFor="bericht">Bericht</label>
          <textarea id="bericht" rows="4" placeholder="Vertel me over je plannen..."
            value={bericht} onChange={(e) => setBericht(e.target.value)} required></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Verzend bericht</button>
      </form>
    </div>
  )
}

export default Contact
