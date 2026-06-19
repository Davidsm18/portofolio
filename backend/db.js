import mysql from 'mysql2/promise'

// Verbindingspool naar de MySQL-container (draait via Docker op poort 3307)
const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,            // host-poort uit docker-compose.yml (3307 -> 3306 in de container)
  user: 'root',
  password: 'root',
  database: 'portfolio_cms',
  waitForConnections: true,
  connectionLimit: 10,
})

export default pool
