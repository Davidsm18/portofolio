import Database from 'better-sqlite3'

// Opent (of maakt) het databasebestand cms.db in de backend-map
const db = new Database('cms.db')

// Tabellen aanmaken als ze nog niet bestaan
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    tech TEXT,                 -- JSON-array opgeslagen als tekst, bv. '["React","Node.js"]'
    link TEXT,
    featured INTEGER DEFAULT 0  -- 0 = nee, 1 = ja (SQLite heeft geen echte boolean)
  );

  CREATE TABLE IF NOT EXISTS about (
    id INTEGER PRIMARY KEY CHECK (id = 1),  -- altijd maar één rij
    heading TEXT,
    intro TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    items TEXT                  -- JSON-array als tekst
  );
`)

// --- Seed: alleen vullen als de tabellen nog leeg zijn ---

const projectCount = db.prepare('SELECT COUNT(*) AS n FROM projects').get().n
if (projectCount === 0) {
  const insert = db.prepare(
    'INSERT INTO projects (title, description, tech, link, featured) VALUES (?, ?, ?, ?, ?)'
  )
  insert.run(
    'Nexus AI Intelligence Hub',
    'Een gecentraliseerd platform voor AI-agent orchestratie. Gebouwd met Next.js en Python om complexe workflows te automatiseren.',
    JSON.stringify(['Next.js', 'Python', 'FastAPI', 'OpenAI API']),
    '#',
    1
  )
  insert.run(
    'Minimalist E-comm',
    'High-performance webshop met headless CMS-integratie en Stripe-betalingen.',
    JSON.stringify(['React', 'Sanity']),
    '#',
    0
  )
  insert.run(
    'CloudOps Automator',
    'Infrastructure-as-code tool voor snelle deployment op AWS en Vercel.',
    JSON.stringify(['AWS', 'Node.js']),
    '#',
    0
  )
  console.log('✔ projects geseed')
}

const aboutRow = db.prepare('SELECT COUNT(*) AS n FROM about').get().n
if (aboutRow === 0) {
  db.prepare('INSERT INTO about (id, heading, intro) VALUES (1, ?, ?)').run(
    'Gedreven door innovatie en AI-gestuurde workflows',
    'Als ICT-student en ondernemer van nature zie ik technologie niet als doel, maar als hefboom. Ik combineer software engineering met moderne AI-tools om sneller, slimmer en met meer precisie te bouwen.\n\nMijn focus ligt op digitale producten die meetbare impact maken — van een complexe SaaS-oplossing tot een gestroomlijnde website. Ik breng een ondernemende mindset naar elke regel code.'
  )
  console.log('✔ about geseed')
}

const skillCount = db.prepare('SELECT COUNT(*) AS n FROM skills').get().n
if (skillCount === 0) {
  const insert = db.prepare('INSERT INTO skills (label, items) VALUES (?, ?)')
  insert.run('Stack', JSON.stringify(['React', 'Next.js']))
  insert.run('Backend', JSON.stringify(['Python', 'PostgreSQL']))
  insert.run('AI Tools', JSON.stringify(['LangChain', 'PyTorch']))
  insert.run('Cloud', JSON.stringify(['AWS', 'Docker']))
  console.log('✔ skills geseed')
}

export default db
