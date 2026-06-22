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
