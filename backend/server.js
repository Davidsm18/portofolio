import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import pool from './db.js'

const app = express()
const PORT = 3002

// ⚠️ Verander deze twee waarden naar iets eigens
const ADMIN_PASSWORD = 'MijnP0rtfolio!2026'
const TOKEN = 'dwon392nkc32njHN3nsKS38dhjIDWJ13si'

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

// --- AFBEELDINGEN UPLOADEN ---

// Waar en onder welke naam de bestanden opgeslagen worden
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`)
  },
})
const upload = multer({ storage })

// Geüploade bestanden openbaar beschikbaar maken op /uploads/...
app.use('/uploads', express.static('uploads'))

// Eén afbeelding ontvangen ('image') en de openbare URL teruggeven
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  const url = `http://localhost:${PORT}/uploads/${req.file.filename}`
  res.json({ url })
})

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
  const { title, description, tech, link, featured, image } = req.body
  const [result] = await pool.query(
    'INSERT INTO projects (title, description, tech, link, featured, image) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, JSON.stringify(tech || []), link || '#', featured ? 1 : 0, image || null]
  )
  res.status(201).json({ id: result.insertId })
})

app.put('/api/projects/:id', requireAuth, async (req, res) => {
  const { title, description, tech, link, featured, image } = req.body
  await pool.query(
    'UPDATE projects SET title = ?, description = ?, tech = ?, link = ?, featured = ?, image = ? WHERE id = ?',
    [title, description, JSON.stringify(tech || []), link || '#', featured ? 1 : 0, image || null, req.params.id]
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
