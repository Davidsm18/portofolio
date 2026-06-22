import { useState, useEffect } from 'react'
import { authHeaders } from '../auth'

const API = 'http://localhost:3002/api'

function AboutManager() {
  const [form, setForm] = useState({ heading: '', intro: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch(`${API}/about`)
      .then((res) => res.json())
      .then((data) => setForm(data))
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`${API}/about`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(form),
    }).then(() => setSaved(true))
  }

  return (
    <section className="admin-section">
      <h2>Over mij</h2>
      <form className="admin-card" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label>Kop</label>
          <input name="heading" value={form.heading} onChange={handleChange} />
        </div>
        <div className="admin-field">
          <label>Tekst (twee enters = nieuwe alinea)</label>
          <textarea name="intro" rows="6" value={form.intro} onChange={handleChange} />
        </div>
        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary">Opslaan</button>
          {saved && <span style={{ color: 'var(--accent)' }}>Opgeslagen ✓</span>}
        </div>
      </form>
    </section>
  )
}

export default AboutManager
