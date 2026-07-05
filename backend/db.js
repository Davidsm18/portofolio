import mysql from 'mysql2/promise'

// Verbindingspool naar de MySQL-container (draait via Docker op poort 3307)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,   // host-poort uit docker-compose.yml (3307 -> 3306 in de container)
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'portfolio_cms',
  waitForConnections: true,
  connectionLimit: 10,
})

export default pool
