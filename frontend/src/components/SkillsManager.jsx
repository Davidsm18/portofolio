import { useState, useEffect } from 'react'
import { authHeaders } from '../auth'

const API = 'http://localhost:3002/api'
const emptyForm = { label: '', items: '' }

function SkillsManager() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  function loadSkills() {
    fetch(`${API}/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
  }

  useEffect(() => {
    loadSkills()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const body = {
      label: form.label,
      items: form.items.split(',').map((s) => s.trim()).filter(Boolean),
    }

    const url = editingId ? `${API}/skills/${editingId}` : `${API}/skills`
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(body),
    }).then(() => {
      setForm(emptyForm)
      setEditingId(null)
      loadSkills()
    })
  }

  function handleEdit(skill) {
    setEditingId(skill.id)
    setForm({ label: skill.label, items: skill.items.join(', ') })
  }

  function handleDelete(id) {
    if (!confirm('Deze skill-groep verwijderen?')) return
    fetch(`${API}/skills/${id}`, { method: 'DELETE', headers: authHeaders() }).then(loadSkills)
  }

  function cancelEdit() {
    setForm(emptyForm)
    setEditingId(null)
  }

  // Het formulier — hergebruikt voor inline-bewerken én voor 'nieuwe skill-groep'
  function renderForm() {
    return (
      <form className="admin-card" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Skill-groep bewerken' : 'Nieuwe skill-groep'}</h3>

        <div className="admin-field">
          <label>Categorie (label)</label>
          <input name="label" value={form.label} onChange={handleChange} required />
        </div>

        <div className="admin-field">
          <label>Items (komma-gescheiden)</label>
          <input name="items" value={form.items} onChange={handleChange} placeholder="React, Node.js" />
        </div>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            {editingId ? 'Opslaan' : 'Toevoegen'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <section className="admin-section">
      <h2>Skills</h2>

      {skills.map((skill) => (
        <div key={skill.id}>
          <div className="admin-card">
            <div className="admin-row">
              <strong>{skill.label}: {skill.items.join(', ')}</strong>
              <div className="admin-actions">
                {editingId === skill.id ? (
                  <button className="admin-btn" onClick={cancelEdit}>Annuleren</button>
                ) : (
                  <button className="admin-btn" onClick={() => handleEdit(skill)}>Bewerk</button>
                )}
                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(skill.id)}>Verwijder</button>
              </div>
            </div>
          </div>

          {/* Inline bewerk-formulier, direct onder deze skill-groep */}
          {editingId === skill.id && renderForm()}
        </div>
      ))}

      {/* 'Nieuwe skill-groep'-formulier onderaan, alleen als je niet aan het bewerken bent */}
      {!editingId && renderForm()}
    </section>
  )
}

export default SkillsManager
