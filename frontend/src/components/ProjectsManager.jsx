import { useState, useEffect } from 'react'
import { authHeaders } from '../auth'

const API = '/api'
const emptyForm = { title: '', description: '', tech: '', link: '', featured: false, image: '' }

function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  // Projecten (her)laden uit de API
  function loadProjects() {
    fetch(`${API}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // Eén handler voor alle velden (op basis van de 'name' van het veld)
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // Afbeelding uploaden naar de backend → krijg een URL terug, zet die in het formulier
  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const data = new FormData()
    data.append('image', file)
    fetch(`${API}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('cms_token') || ''}` },
      body: data, // FormData: GEEN Content-Type zelf zetten, de browser doet dat
    })
      .then((res) => res.json())
      .then((result) => setForm((f) => ({ ...f, image: result.url })))
  }

  // Toevoegen of bewerken (afhankelijk van editingId)
  function handleSubmit(e) {
    e.preventDefault()
    const body = {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      link: form.link,
      featured: form.featured,
      image: form.image,
    }

    const url = editingId ? `${API}/projects/${editingId}` : `${API}/projects`
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(body),
    }).then(() => {
      setForm(emptyForm)
      setEditingId(null)
      loadProjects()
    })
  }

  // Een bestaand project in het formulier laden om te bewerken
  function handleEdit(project) {
    setEditingId(project.id)
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      link: project.link,
      featured: project.featured,
      image: project.image || '',
    })
  }

  function handleDelete(id) {
    if (!confirm('Dit project verwijderen?')) return
    fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: authHeaders() }).then(loadProjects)
  }

  function cancelEdit() {
    setForm(emptyForm)
    setEditingId(null)
  }

  // Het formulier — hergebruikt voor inline-bewerken én voor 'nieuw project'
  function renderForm() {
    return (
      <form className="admin-card" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Project bewerken' : 'Nieuw project'}</h3>

        <div className="admin-field">
          <label>Titel</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="admin-field">
          <label>Beschrijving</label>
          <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
        </div>

        <div className="admin-field">
          <label>Tech (komma-gescheiden)</label>
          <input name="tech" value={form.tech} onChange={handleChange} placeholder="React, Node.js" />
        </div>

        <div className="admin-field">
          <label>Link</label>
          <input name="link" value={form.link} onChange={handleChange} placeholder="#" />
        </div>

        <div className="admin-field">
          <label>Afbeelding</label>
          <input type="file" accept="image/*" onChange={handleFile} />
          {form.image && (
            <img src={form.image} alt="Voorbeeld van de gekozen projectafbeelding" className="admin-image-preview" />
          )}
        </div>

        <label className="admin-checkbox">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Uitgelicht (featured)
        </label>

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
      <h2>Projecten</h2>

      {projects.map((project) => (
        <div key={project.id}>
          <div className="admin-card">
            <div className="admin-row">
              <strong>{project.title}{project.featured ? ' ⭐' : ''}</strong>
              <div className="admin-actions">
                {editingId === project.id ? (
                  <button className="admin-btn" onClick={cancelEdit}>Annuleren</button>
                ) : (
                  <button className="admin-btn" onClick={() => handleEdit(project)}>Bewerk</button>
                )}
                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(project.id)}>Verwijder</button>
              </div>
            </div>
          </div>

          {/* Inline bewerk-formulier, direct onder dit project */}
          {editingId === project.id && renderForm()}
        </div>
      ))}

      {/* 'Nieuw project'-formulier onderaan, alleen als je niet aan het bewerken bent */}
      {!editingId && renderForm()}
    </section>
  )
}

export default ProjectsManager
