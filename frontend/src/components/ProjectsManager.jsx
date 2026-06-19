import { useState, useEffect } from 'react'
import { authHeaders } from '../auth'

const API = 'http://localhost:3001/api'
const emptyForm = { title: '', description: '', tech: '', link: '', featured: false }

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

  // Toevoegen of bewerken (afhankelijk van editingId)
  function handleSubmit(e) {
    e.preventDefault()
    const body = {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      link: form.link,
      featured: form.featured,
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
    })
  }

  function handleDelete(id) {
    if (!confirm('Dit project verwijderen?')) return
    fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: authHeaders() }).then(loadProjects)
  }

  return (
    <section className="admin-section">
      <h2>Projecten</h2>

      {projects.map((project) => (
        <div className="admin-card" key={project.id}>
          <div className="admin-row">
            <strong>{project.title}{project.featured ? ' ⭐' : ''}</strong>
            <div className="admin-actions">
              <button className="admin-btn" onClick={() => handleEdit(project)}>Bewerk</button>
              <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(project.id)}>Verwijder</button>
            </div>
          </div>
        </div>
      ))}

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

        <label className="admin-checkbox">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Uitgelicht (featured)
        </label>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            {editingId ? 'Opslaan' : 'Toevoegen'}
          </button>
          {editingId && (
            <button
              type="button"
              className="admin-btn"
              onClick={() => { setForm(emptyForm); setEditingId(null) }}
            >
              Annuleer
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ProjectsManager
