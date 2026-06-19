import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()
const PORT = 3001

// ⚠️ Verander deze twee waarden naar iets eigens
const ADMIN_PASSWORD = 'admin123'
const TOKEN = 'geheim-token-verander-mij'

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend draait!' })
})

// --- LOGIN ---

app.post('/api/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.json({ token: TOKEN })
  } else {
    res.status(401).json({ error: 'Onjuist wachtwoord' })
  }
})

// Slot: laat alleen verzoeken met het juiste token door
function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (auth === `Bearer ${TOKEN}`) {
    next() // toegang verleend, ga door naar de route
  } else {
    res.status(401).json({ error: 'Niet ingelogd' })
  }
}

// --- PROJECTS ---

app.get('/api/projects', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM projects')
  const projects = rows.map((row) => ({
    ...row,
    tech: JSON.parse(row.tech),
    featured: Boolean(row.featured),
  }))
  res.json(projects)
})

app.post('/api/projects', requireAuth, async (req, res) => {
  const { title, description, tech, link, featured } = req.body
  const [result] = await pool.query(
    'INSERT INTO projects (title, description, tech, link, featured) VALUES (?, ?, ?, ?, ?)',
    [title, description, JSON.stringify(tech || []), link || '#', featured ? 1 : 0]
  )
  res.status(201).json({ id: result.insertId })
})

app.put('/api/projects/:id', requireAuth, async (req, res) => {
  const { title, description, tech, link, featured } = req.body
  await pool.query(
    'UPDATE projects SET title = ?, description = ?, tech = ?, link = ?, featured = ? WHERE id = ?',
    [title, description, JSON.stringify(tech || []), link || '#', featured ? 1 : 0, req.params.id]
  )
  res.json({ ok: true })
})

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id])
  res.json({ ok: true })
})

// --- ABOUT (altijd één rij, id = 1) ---

app.get('/api/about', async (req, res) => {
  const [rows] = await pool.query('SELECT heading, intro FROM about WHERE id = 1')
  res.json(rows[0] || { heading: '', intro: '' })
})

app.put('/api/about', requireAuth, async (req, res) => {
  const { heading, intro } = req.body
  await pool.query('UPDATE about SET heading = ?, intro = ? WHERE id = 1', [heading, intro])
  res.json({ ok: true })
})

// --- SKILLS (volledige CRUD) ---

app.get('/api/skills', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM skills')
  const skills = rows.map((row) => ({ ...row, items: JSON.parse(row.items) }))
  res.json(skills)
})

app.post('/api/skills', requireAuth, async (req, res) => {
  const { label, items } = req.body
  const [result] = await pool.query(
    'INSERT INTO skills (label, items) VALUES (?, ?)',
    [label, JSON.stringify(items || [])]
  )
  res.status(201).json({ id: result.insertId })
})

app.put('/api/skills/:id', requireAuth, async (req, res) => {
  const { label, items } = req.body
  await pool.query(
    'UPDATE skills SET label = ?, items = ? WHERE id = ?',
    [label, JSON.stringify(items || []), req.params.id]
  )
  res.json({ ok: true })
})

app.delete('/api/skills/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM skills WHERE id = ?', [req.params.id])
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Backend luistert op http://localhost:${PORT}`)
})
