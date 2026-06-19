import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend draait!' })
})

// 👇 NIEUW: hier tussen plakken
app.get('/api/projects', (req, res) => {
    const rows = db.prepare('SELECT * FROM projects').all()
    const projects = rows.map((row) => ({
        ...row,
        tech: JSON.parse(row.tech),
        featured: Boolean(row.featured),
    }))
    res.json(projects)
})

// Nieuw project toevoegen
app.post('/api/projects', (req, res) => {
  const { title, description, tech, link, featured } = req.body
  const result = db.prepare(
    'INSERT INTO projects (title, description, tech, link, featured) VALUES (?, ?, ?, ?, ?)'
  ).run(title, description, JSON.stringify(tech || []), link || '#', featured ? 1 : 0)
  res.status(201).json({ id: result.lastInsertRowid })
})

// Bestaand project bewerken
app.put('/api/projects/:id', (req, res) => {
  const { title, description, tech, link, featured } = req.body
  db.prepare(
    'UPDATE projects SET title = ?, description = ?, tech = ?, link = ?, featured = ? WHERE id = ?'
  ).run(title, description, JSON.stringify(tech || []), link || '#', featured ? 1 : 0, req.params.id)
  res.json({ ok: true })
})

// Project verwijderen
app.delete('/api/projects/:id', (req, res) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// --- ABOUT (altijd één rij, id = 1) ---

app.get('/api/about', (req, res) => {
  const about = db.prepare('SELECT heading, intro FROM about WHERE id = 1').get()
  res.json(about)
})

app.put('/api/about', (req, res) => {
  const { heading, intro } = req.body
  db.prepare('UPDATE about SET heading = ?, intro = ? WHERE id = 1').run(heading, intro)
  res.json({ ok: true })
})

// --- SKILLS (volledige CRUD) ---

app.get('/api/skills', (req, res) => {
  const rows = db.prepare('SELECT * FROM skills').all()
  const skills = rows.map((row) => ({ ...row, items: JSON.parse(row.items) }))
  res.json(skills)
})

app.post('/api/skills', (req, res) => {
  const { label, items } = req.body
  const result = db.prepare('INSERT INTO skills (label, items) VALUES (?, ?)')
    .run(label, JSON.stringify(items || []))
  res.status(201).json({ id: result.lastInsertRowid })
})

app.put('/api/skills/:id', (req, res) => {
  const { label, items } = req.body
  db.prepare('UPDATE skills SET label = ?, items = ? WHERE id = ?')
    .run(label, JSON.stringify(items || []), req.params.id)
  res.json({ ok: true })
})

app.delete('/api/skills/:id', (req, res) => {
  db.prepare('DELETE FROM skills WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

app.listen(PORT, () => {
    console.log(`Backend luistert op http://localhost:${PORT}`)
})